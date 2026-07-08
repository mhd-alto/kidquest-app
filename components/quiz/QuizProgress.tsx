"use client";

export default function QuizProgress({
  currentIndex,
  total,
}: {
  currentIndex: number; // 1-based for display
  total: number;
}) {
  return (
    <div className="rounded-xl2 bg-white border border-creamdeep p-4">
      <p className="font-display font-700 text-ink">
        Progress: Question {currentIndex} of {total}
      </p>
      <div className="mt-3 h-2 rounded-full bg-creamdeep overflow-hidden">
        <div
          className="h-full rounded-full bg-sky"
          style={{ width: `${Math.round((currentIndex / total) * 100)}%` }}
        />
      </div>
    </div>
  );
}
