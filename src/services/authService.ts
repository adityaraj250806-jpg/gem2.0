export const ROLES = {
  BIDDER: "BIDDER",
  OFFICER: "OFFICER"
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  orgName: string;
  avatarInitial: string;
}

const STORAGE_KEY = "gem_sentinel_auth";

export const DEFAULT_USERS: Record<UserRole, User> = {
  [ROLES.BIDDER]: {
    id: "user-bidder-01",
    email: "tenders@abcengineering.com",
    name: "ABC Engineering Ltd",
    role: ROLES.BIDDER,
    roleTitle: "Registered Bidder",
    orgName: "ABC Engineering Ltd (Chennai)",
    avatarInitial: "A"
  },
  [ROLES.OFFICER]: {
    id: "user-officer-01",
    email: "procurement.officer@cpcl.gov.in",
    name: "Dr. K. S. Ramanathan",
    role: ROLES.OFFICER,
    roleTitle: "Chief Procurement Officer",
    orgName: "CPCL / Ministry of Petroleum & Natural Gas",
    avatarInitial: "O"
  }
};

export class AuthService {
  private currentUser: User | null;

  constructor() {
    this.currentUser = this.loadSession();
  }

  loadSession(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to read session from localStorage:", e);
    }
    return DEFAULT_USERS[ROLES.BIDDER];
  }

  saveSession(user: User | null): void {
    this.currentUser = user;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Failed to persist session:", e);
    }
  }

  login(email?: string, _password?: string, role: UserRole = ROLES.BIDDER): Promise<{ success: boolean; user: User }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          ...(DEFAULT_USERS[role] || DEFAULT_USERS[ROLES.BIDDER]),
          email: email || DEFAULT_USERS[role]?.email
        };
        this.saveSession(user);
        resolve({ success: true, user });
      }, 200);
    });
  }

  logout(): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      this.saveSession(null);
      resolve({ success: true });
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isOfficer(): boolean {
    return this.currentUser?.role === ROLES.OFFICER;
  }

  isBidder(): boolean {
    return this.currentUser?.role === ROLES.BIDDER;
  }

  switchRole(targetRole: UserRole): User | null {
    if (DEFAULT_USERS[targetRole]) {
      this.saveSession(DEFAULT_USERS[targetRole]);
    }
    return this.currentUser;
  }
}

export const authService = new AuthService();
