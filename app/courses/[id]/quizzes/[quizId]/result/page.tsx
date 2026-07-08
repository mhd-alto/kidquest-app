"use client";

import { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/AppShell";
import QuizResult from "@/components/quiz/QuizResult";

function safeNumber(v: string | null, fallback: number) {
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export default function QuizResultPage() {
  const params = useParams<{ id: string; quizId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const courseId = String(params.id);
  const quizId = String(params.quizId);

  const score = safeNumber(searchParams.get("score"), 0);
  const percentage = safeNumber(searchParams.get("percentage"), 0);
  const correctCount = safeNumber(searchParams.get("correct"), 0);
  const wrongCount = safeNumber(searchParams.get("wrong"), 0);
  const passed = searchParams.get("passed") === "true";

  // Keep passing threshold consistent with mock; UI-only.
  const passingScorePercent = useMemo(() => {
    // mock currently uses 60 as passing threshold
    // if you later change mock data, keep this value aligned or read it from mock.
    return 60;
  }, []);

  return (
    <AppShell>
      <button
        onClick={() => router.push(`/courses/${courseId}`)}
        className="text-sm font-display font-700 text-inksoft hover:text-coral mb-4 inline-flex items-center gap-1">
        ← Back to course
      </button>

      <div className="flex flex-col gap-6">
        <QuizResult
          score={score}
          percentage={percentage}
          correctCount={correctCount}
          wrongCount={wrongCount}
          passed={passed}
          passingScorePercent={passingScorePercent}
          onBackToCourse={() => router.push(`/courses/${courseId}`)}
        />

        <p className="text-sm font-body text-inksoft">
          Quiz: <span className="font-700 text-ink">{quizId}</span>
        </p>
      </div>
    </AppShell>
  );
}
