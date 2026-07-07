"use client";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function QuestTrail({
  completedCount,
}: {
  /** how many days this week are already completed (0-7), today is the next open node */
  completedCount: number;
}) {
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <div className="relative mt-1 mb-2">
      {/* dashed path connecting each day, the "trail" the explorer walks */}
      <div
        aria-hidden
        className="absolute left-6 right-6 top-[19px] h-0.5 border-t-2 border-dashed border-creamdeep"
      />
      <ol className="relative flex items-center justify-between">
        {DAYS.map((label, i) => {
          const done = i < completedCount;
          const isToday = i === todayIndex;
          return (
            <li key={i} className="flex flex-col items-center gap-1.5 w-10">
              <div
                className={`relative flex items-center justify-center h-10 w-10 rounded-full border-2 font-display font-700 text-sm transition-transform ${
                  done
                    ? "bg-mint border-mint text-white animate-pop"
                    : isToday
                    ? "bg-white border-coral text-coral"
                    : "bg-white border-creamdeep text-inksoft/50"
                }`}
              >
                {done ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  label
                )}
                {isToday && !done && (
                  <span className="absolute -top-2 -right-1 text-xs animate-twinkle">
                    ⭐
                  </span>
                )}
              </div>
              <span className="text-[11px] font-body font-700 text-inksoft/70">
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
