"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { FancyLink } from "@/components/FancyLink";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      // error already surfaced via context
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream bg-stars flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-3xl">🚀</span>
          <span className="font-display text-2xl font-700 text-coraldeep">
            KidQuest
          </span>
        </div>

        <div className="bg-white rounded-xl3 shadow-soft border border-creamdeep p-7">
          <h1 className="font-display text-xl font-700 text-ink mb-1">
            Welcome back, Explorer!
          </h1>
          <p className="text-sm text-inksoft font-body mb-6">
            Sign in to continue your quest.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />

            {error && (
              <p className="text-sm font-body text-berrydeep bg-berry/10 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 font-display font-700 text-white bg-gradient-to-r from-coral to-sunset rounded-2xl py-3 shadow-card disabled:opacity-60 transition-opacity"
            >
              {submitting ? "Signing in…" : "Start questing"}
            </button>
          </form>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <FancyLink
            href="/games"
            title="Browse games"
            subtitle="Play Scratch projects right away"
            icon={<span>🎮</span>}
          />
          <p className="text-center text-sm font-body text-inksoft">
            New here?{" "}
            <Link href="/register" className="text-coraldeep font-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-display font-700 text-inksoft uppercase tracking-wide">
        {label}
      </span>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-creamdeep bg-cream/50 px-4 py-2.5 font-body text-ink outline-none focus:border-coral"
      />
    </label>
  );
}
