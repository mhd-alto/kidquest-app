"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/context/AuthContext";
import { getBadges, getUserBadges } from "@/lib/api/gamification";

interface Badge {
  id: number;
  name: string;
  description?: string;
  rarity?: string;
}
interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
}

const RARITY_STYLES: Record<string, string> = {
  common: "bg-sky/15 text-skydeep",
  rare: "bg-mint/15 text-mintdeep",
  epic: "bg-berry/15 text-berrydeep",
  legendary: "bg-gold/25 text-[#8A6400]",
};

export default function BadgesPage() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedIds, setEarnedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [badgesRes, userBadgesRes] = await Promise.all([
        getBadges(),
        getUserBadges(),
      ]);
      setBadges(badgesRes.data ?? []);
      const mine: UserBadge[] = (userBadgesRes.data ?? []).filter(
        (ub: UserBadge) => ub.userId === user!.id
      );
      setEarnedIds(new Set(mine.map((ub) => ub.badgeId)));
      setLoading(false);
    }
    load();
  }, [user]);

  return (
    <AppShell>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🏅</span>
        <h1 className="font-display text-2xl font-700 text-ink">Your Badges</h1>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl2 bg-creamdeep/60 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const earned = earnedIds.has(badge.id);
            const rarityClass =
              RARITY_STYLES[badge.rarity ?? "common"] ?? RARITY_STYLES.common;
            return (
              <div
                key={badge.id}
                className={`rounded-xl2 border border-creamdeep bg-white p-4 flex flex-col items-center text-center gap-2 ${
                  earned ? "" : "opacity-50"
                }`}
              >
                <div
                  className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl ${rarityClass}`}
                >
                  {earned ? "🏆" : "🔒"}
                </div>
                <p className="font-display font-700 text-sm text-ink">
                  {badge.name}
                </p>
                {badge.description && (
                  <p className="text-xs font-body text-inksoft">
                    {badge.description}
                  </p>
                )}
              </div>
            );
          })}
          {badges.length === 0 && (
            <p className="text-sm font-body text-inksoft col-span-full">
              No badges published yet — keep questing!
            </p>
          )}
        </div>
      )}
    </AppShell>
  );
}
