"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="h-10 w-10 rounded-full border-4 border-coral border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex bg-cream min-h-screen bg-stars">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-8 px-4 md:px-10 py-6 md:py-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
