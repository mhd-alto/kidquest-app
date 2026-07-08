"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, fetchProfile } from "@/lib/api/auth";

export interface KQUser {
  id: number;
  username: string;
  email: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: KQUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// The backend may name the JWT field differently depending on how
// AuthService signs it (access_token / token / accessToken).
function extractToken(payload: Record<string, unknown>): string | null {
  return (
    (payload.access_token as string) ||
    (payload.token as string) ||
    (payload.accessToken as string) ||
    null
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<KQUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("kq_user");
    const token = localStorage.getItem("kq_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    setError(null);
    try {
      const { data } = await loginUser({ email, password });
      const token = extractToken(data);
      if (token) localStorage.setItem("kq_token", token);

      let profile = data.user as KQUser | undefined;
      if (!profile) {
        try {
          const res = await fetchProfile();
          profile = res.data;
        } catch {
          profile = { id: 0, username: email.split("@")[0], email };
        }
      }
      localStorage.setItem("kq_user", JSON.stringify(profile));
      setUser(profile ?? null);
      router.push("/home");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Couldn't sign you in. Check your email and password."
      );
      throw err;
    }
  }

  async function register(username: string, email: string, password: string) {
    setError(null);
    try {
      await registerUser({ username, email, password });
      await login(email, password);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Couldn't create your account. Try a different email."
      );
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem("kq_token");
    localStorage.removeItem("kq_user");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
