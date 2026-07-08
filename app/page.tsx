"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/home" : "/login");
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-coral border-t-transparent animate-spin" />
        <p className="font-display text-inksoft">Loading KidQuest…</p>
      </div>
    </div>
  );
}
