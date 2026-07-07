"use client";

import Link from "next/link";

const PALETTE = [
  { bg: "bg-berry", tint: "bg-berry/10", icon: "🐾" },
  { bg: "bg-sky", tint: "bg-sky/10", icon: "🚀" },
  { bg: "bg-mint", tint: "bg-mint/10", icon: "🧮" },
  { bg: "bg-sunset", tint: "bg-sunset/10", icon: "🌱" },
  { bg: "bg-coral", tint: "bg-coral/10", icon: "🎨" },
  { bg: "bg-skydeep", tint: "bg-skydeep/10", icon: "📚" },
];

export default function CourseCard({
  id,
  title,
  lessonCount,
  progress,
  index,
  locked = false,
}: {
  id: number | string;
  title: string;
  lessonCount: number;
  progress: number; // 0-100
  index: number;
  locked?: boolean;
}) {
  const theme = PALETTE[index % PALETTE.length];

  const content = (
    <div
      className={`group relative rounded-xl2 border border-creamdeep bg-white p-5 transition-all ${
        locked
          ? "opacity-60"
          : "hover:-translate-y-1 hover:shadow-card cursor-pointer"
      }`}
    >
      <div
        className={`h-14 w-14 rounded-2xl ${theme.bg} flex items-center justify-center text-2xl shadow-soft mb-4`}
      >
        {locked ? "🔒" : theme.icon}
      </div>
      <h3 className="font-display font-700 text-lg text-ink mb-1">{title}</h3>
      <p className="text-sm text-inksoft font-body mb-4">
        {lessonCount} lesson{lessonCount === 1 ? "" : "s"}
      </p>
      <div className="h-2 rounded-full bg-creamdeep overflow-hidden">
        <div
          className={`h-full rounded-full ${theme.bg}`}
          style={{ width: `${locked ? 0 : progress}%` }}
        />
      </div>
    </div>
  );

  if (locked) return <div>{content}</div>;
  return <Link href={`/courses/${id}`}>{content}</Link>;
}
