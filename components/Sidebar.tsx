"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/badges", label: "Badges", icon: BadgeIcon },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/users", label: "Users", icon: ProfileIcon },
  { href: "/admin/groups", label: "Groups", icon: BadgeIcon },
  { href: "/admin/courses", label: "Courses", icon: BookIcon },
  { href: "/admin/videos", label: "Videos", icon: VideoIcon },
  { href: "/admin/enrollments", label: "Enrollments", icon: EnrollIcon },
  { href: "/admin/grades", label: "Grades", icon: GradeIcon },
  { href: "/admin/quizzes", label: "Quizzes", icon: QuizIcon },
  { href: "/admin/achievements", label: "Achievements", icon: TrophyIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isAdmin = pathname.startsWith('/admin');
  const navItems = isAdmin ? ADMIN_NAV : NAV;

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 h-screen sticky top-0 border-r border-creamdeep bg-white/60 backdrop-blur-sm px-5 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <span className="text-2xl">{isAdmin ? '⚙️' : '🚀'}</span>
        <span className="font-display text-xl font-700 text-coraldeep">
          {isAdmin ? 'Admin' : 'KidQuest'}
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 font-display text-[15px] font-600 transition-colors ${
                active
                  ? "bg-coral text-white shadow-card"
                  : "text-inksoft hover:bg-creamdeep hover:text-ink"
              }`}
            >
              <Icon
                className={active ? "text-white" : "text-inksoft group-hover:text-coral"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 px-2">
        <div className="rounded-2xl bg-creamdeep/70 p-3 text-xs text-inksoft font-body leading-relaxed">
          {isAdmin ? '👨‍💼 Admin Dashboard' : '⭐ Keep your streak alive — a little quest time every day adds up!'}
        </div>
        <button
          onClick={logout}
          className="text-left text-sm font-display font-600 text-berry hover:text-berrydeep px-2 py-2"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3 14.5 8.2 20 9l-4 4.2L17 19l-5-2.8L7 19l1-5.8L4 9l5.5-.8L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 7v10M9 7H7v10h2M15 7v10h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12l4-3v6l-4-3Z" fill="currentColor" />
    </svg>
  );
}

function EnrollIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GradeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L3 7v5c0 7 9 11 9 11s9-4 9-11V7l-9-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text x="8" y="15" className="text-xs font-bold" fill="currentColor">A</text>
    </svg>
  );
}

function QuizIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 9h10M7 13h10M7 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9c0-1 1-2 2-2h8c1 0 2 1 2 2v2h3v2h-1v5c0 1-1 2-2 2h-2v2H9v-2H7c-1 0-2-1-2-2v-5H4v-2h2v-2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
