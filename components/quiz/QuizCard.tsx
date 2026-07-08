"use client";

import React from "react";
import type { QuizStatus } from "@/lib/mock/quizzes";

export function QuizStatusBadge({ status }: { status: QuizStatus }) {
  const styles =
    status === "NOT_STARTED"
      ? "bg-creamdeep text-inksoft border-creamdeep"
      : status === "IN_PROGRESS"
        ? "bg-sky/15 text-skydeep border-sky/30"
        : "bg-mint/15 text-mintdeep border-mint/30";

  const label =
    status === "NOT_STARTED"
      ? "Not Started"
      : status === "IN_PROGRESS"
        ? "In Progress"
        : "Completed";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 border text-xs font-body font-700 ${styles}`}>
      {label}
    </span>
  );
}

export default function QuizCard({
  index,
  quizNumber,
  title,
  description,
  questionCount,
  estimatedDurationMinutes,
  status,
  onStart,
}: {
  index: number;
  quizNumber: number;
  title: string;
  description?: string;
  questionCount: number;
  estimatedDurationMinutes: number;
  status: QuizStatus;
  onStart: () => void;
}) {
  return (
    <div className="bg-white border border-creamdeep rounded-xl2 p-4">
      <div className="flex items-start gap-4">
        <div className="h-9 w-9 rounded-full bg-sky/15 text-skydeep font-display font-700 flex items-center justify-center shrink-0">
          {quizNumber}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-display font-700 text-ink">{title}</p>
          <p className="text-sm font-body text-inksoft mt-1">
            {description ?? ""}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-body text-inksoft">
              {questionCount} questions
            </span>
            <span className="text-xs font-body text-inksoft">•</span>
            <span className="text-xs font-body text-inksoft">
              {estimatedDurationMinutes} min
            </span>
            <div className="w-full" />
            <QuizStatusBadge status={status} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={onStart}
          className="font-display font-700 rounded-2xl px-5 py-2 whitespace-nowrap bg-white border border-creamdeep hover:border-coral/50 transition-colors">
          Start Quiz
        </button>
      </div>
    </div>
  );
}
