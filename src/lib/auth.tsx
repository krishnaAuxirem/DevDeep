import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthUser, RegisteredUser, UserRole } from "@/types/auth";
import { DEMO_ACCOUNTS, DEVELOPER_ROLES } from "@/types/auth";

const STORAGE_KEY = "devdeep_session";
const USERS_KEY = "devdeep_users";

function loadUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const stored: RegisteredUser[] = raw ? JSON.parse(raw) : [];
    // Merge demo accounts (by id, don't duplicate)
    const ids = new Set(stored.map(u => u.id));
    const merged = [...stored];
    for (const demo of DEMO_ACCOUNTS) {
      if (!ids.has(demo.id)) merged.push(demo);
    }
    return merged;
  } catch {
    return [...DEMO_ACCOUNTS];
  }
}

function saveUsers(users: RegisteredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user: AuthUser | null) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
}

export function getDashboardPath(role: UserRole): string {
  if (DEVELOPER_ROLES.includes(role)) return "/dashboard";
  if (role === "mentor") return "/mentor-dashboard";
  if (role === "instructor") return "/instructor-dashboard";
  if (role === "employer") return "/employer-dashboard";
  if (role === "admin") return "/admin-dashboard";
  return "/dashboard";
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }) => { success: boolean; error?: string };
  logout: () => void;
  isEmailRegistered: (email: string) => boolean;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadSession());

  useEffect(() => {
    saveSession(user);
  }, [user]);

  const isEmailRegistered = (email: string): boolean => {
    const users = loadUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    saveSession(updated);
    const users = loadUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], role: newRole };
      saveUsers(users);
    }
  };

  const register = (data: { email: string; password: string; name: string; role: UserRole }) => {
    const users = loadUsers();
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists. Please log in." };
    }
    const initials = data.name
      .split(" ")
      .map(w => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const newUser: RegisteredUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      avatar: initials,
      password: data.password,
      createdAt: new Date().toISOString().split("T")[0],
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const users = loadUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return {
        success: false,
        error: "No account found with this email. Please register first.",
      };
    }
    if (found.password !== password) {
      return { success: false, error: "Incorrect password. Please try again." };
    }
    const { password: _pw, ...authUser } = found;
    setUser(authUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    saveSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isEmailRegistered, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
