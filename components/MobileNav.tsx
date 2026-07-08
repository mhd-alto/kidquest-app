"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/home", label: "Home", emoji: "🏠" },
  { href: "/badges", label: "Badges", emoji: "🏅" },
  { href: "/profile", label: "Profile", emoji: "👤" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-creamdeep px-6 py-2 flex items-center justify-around shadow-[0_-4px_16px_-8px_rgba(42,36,56,0.15)]">
      {NAV.map(({ href, label, emoji }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 py-1 px-3"
          >
            <span className="text-xl">{emoji}</span>
            <span
              className={`text-[11px] font-display font-600 ${
                active ? "text-coral" : "text-inksoft"
              }`}
            >
              {label}
            </span>
            {active && (
              <span className="h-1 w-1 rounded-full bg-coral mt-0.5" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
