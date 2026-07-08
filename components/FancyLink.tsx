"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type FancyLinkProps = LinkProps & {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
};

export function FancyLink({ icon, title, subtitle, className, ...props }: FancyLinkProps) {
  return (
    <Link
      {...props}
      className={
        "group flex items-center gap-3 rounded-2xl border border-creamdeep/60 bg-white/70 dark:bg-gray-800/60 p-4 shadow-card/40 hover:shadow-card transition-all duration-300 " +
        "hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-coral/40 " +
        (className ?? "")
      }
    >
      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-coral to-sunset text-white flex items-center justify-center shadow-card">
        {icon ?? <span className="text-lg">🎮</span>}
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-display font-700 text-ink dark:text-white truncate">{title}</div>
        {subtitle ? (
          <div className="text-xs text-inksoft mt-0.5 line-clamp-1">{subtitle}</div>
        ) : null}
      </div>

      <div className="text-coraldeep group-hover:translate-x-0.5 transition-transform">→</div>
    </Link>
  );
}

