"use client";

import { useState, FormEvent } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/context/AuthContext";
import { updateUser } from "@/lib/api/users";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaved(false);
    try {
      await updateUser(user.id, { username });
      const stored = JSON.parse(localStorage.getItem("kq_user") || "{}");
      localStorage.setItem(
        "kq_user",
        JSON.stringify({ ...stored, username })
      );
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">👤</span>
        <h1 className="font-display text-2xl font-700 text-ink">Your Profile</h1>
      </div>

      <div className="bg-white rounded-xl3 border border-creamdeep p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-coral to-sunset flex items-center justify-center text-2xl">
            🧑‍🚀
          </div>
          <div>
            <p className="font-display font-700 text-lg text-ink">
              {user?.username}
            </p>
            <p className="text-sm font-body text-inksoft">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-display font-700 text-inksoft uppercase tracking-wide">
              Explorer name
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-xl border border-creamdeep bg-cream/50 px-4 py-2.5 font-body text-ink outline-none focus:border-coral"
            />
          </label>

          {saved && (
            <p className="text-sm font-body text-mintdeep bg-mint/10 rounded-xl px-3 py-2">
              Profile updated!
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="font-display font-700 text-white bg-gradient-to-r from-coral to-sunset rounded-2xl py-3 shadow-card disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>

      <button
        onClick={logout}
        className="mt-6 text-sm font-display font-700 text-berry hover:text-berrydeep"
      >
        Log out
      </button>
    </AppShell>
  );
}
