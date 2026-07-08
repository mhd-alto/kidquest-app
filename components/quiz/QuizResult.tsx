"use client";

import React from "react";

export default function QuizResult({
  score,
  percentage,
  correctCount,
  wrongCount,
  passed,
  passingScorePercent,
  onBackToCourse,
}: {
  score: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  passed: boolean;
  passingScorePercent: number;
  onBackToCourse: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl3 bg-white border border-creamdeep p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display font-700 text-ink text-lg">
              {passed ? "🎉 Passed!" : "❌ Not quite!"}
            </p>
            <p className="text-sm font-body text-inksoft mt-1">
              Score: {score} / {correctCount + wrongCount} •{" "}
              {percentage.toFixed(0)}% (Pass at {passingScorePercent}%)
            </p>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-body font-700 border ${
              passed
                ? "bg-mint/15 text-mintdeep border-mint/30"
                : "bg-berry/10 text-berrydeep border-berry/30"
            }`}>
            {passed ? "Completed" : "Needs Retry"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[140px] rounded-2xl border border-creamdeep bg-creamdeep/30 p-4">
            <p className="text-sm font-body text-inksoft">Correct</p>
            <p className="font-display font-700 text-ink text-xl">
              {correctCount}
            </p>
          </div>

          <div className="flex-1 min-w-[140px] rounded-2xl border border-creamdeep bg-creamdeep/30 p-4">
            <p className="text-sm font-body text-inksoft">Wrong</p>
            <p className="font-display font-700 text-ink text-xl">
              {wrongCount}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 rounded-full bg-creamdeep overflow-hidden">
          <div
            className={`h-full rounded-full ${passed ? "bg-mint" : "bg-coral"}`}
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>
      </div>

      <button
        onClick={onBackToCourse}
        className="font-display font-700 rounded-2xl px-5 py-3 whitespace-nowrap bg-white border border-creamdeep hover:border-coral/50 transition-colors">
        Back to Course
      </button>
    </div>
  );
}
