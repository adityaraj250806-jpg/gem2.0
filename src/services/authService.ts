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

export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "gem_sentinel_jwt";

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

  saveSession(user: User | null, token?: string): void {
    this.currentUser = user;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        if (token) localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (e) {
      console.warn("Failed to persist session:", e);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  async login(email?: string, password?: string, role: UserRole = ROLES.BIDDER): Promise<{ success: boolean; user: User }> {
    // If credentials are provided, attempt real database authentication
    if (email && password && password !== "DemoPass") {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Invalid credentials. Please check your username and password.");
        }

        const user: User = {
          id: data.user.id || data.user._id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          roleTitle: data.user.roleTitle || (data.user.role === ROLES.OFFICER ? "Chief Procurement Officer" : "Registered Bidder"),
          orgName: data.user.orgName || (data.user.role === ROLES.OFFICER ? "CPCL / Ministry of Petroleum" : "ABC Engineering Ltd"),
          avatarInitial: data.user.avatarInitial || data.user.name.charAt(0).toUpperCase()
        };

        this.saveSession(user, data.token);
        return { success: true, user };
      } catch (err: any) {
        // If it's a 401/403 credentials error, propagate it directly to the user
        if (err.message && !err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
          throw err;
        }
        console.warn("Backend API unreachable, falling back to local session:", err.message);
      }
    }

    // Demo shortcut fallback
    const user: User = {
      ...(DEFAULT_USERS[role] || DEFAULT_USERS[ROLES.BIDDER]),
      email: email || DEFAULT_USERS[role]?.email
    };
    this.saveSession(user);
    return { success: true, user };
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    orgName?: string;
    gstin?: string;
    officerCode?: string;
    officerKey?: string;
    designation?: string;
  }): Promise<{ success: boolean; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    if (!response.ok || !resData.success) {
      throw new Error(resData.message || "Registration failed.");
    }

    const user: User = {
      id: resData.user.id || resData.user._id,
      email: resData.user.email,
      name: resData.user.name,
      role: resData.user.role,
      roleTitle: resData.user.roleTitle,
      orgName: resData.user.orgName,
      avatarInitial: resData.user.avatarInitial
    };

    this.saveSession(user, resData.token);
    return { success: true, user };
  }

  async logout(): Promise<{ success: boolean }> {
    this.saveSession(null);
    return { success: true };
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
