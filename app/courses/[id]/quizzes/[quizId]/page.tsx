"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizQuestionView from "@/components/quiz/QuizQuestion";
import { getQuizzesForCourse } from "@/lib/mock/quizzes";

type StoredQuizState = {
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  // submission result
  result?: {
    score: number;
    percentage: number;
    correctCount: number;
    wrongCount: number;
    passed: boolean;
  };
};

function getStorageKey(courseId: string, quizId: string) {
  return `kidquest.quiz.state:${courseId}:${quizId}`;
}

function readStoredQuizState(
  courseId: string,
  quizId: string,
): StoredQuizState {
  try {
    if (typeof window === "undefined") {
      return { status: "NOT_STARTED" };
    }
    const raw = window.localStorage.getItem(getStorageKey(courseId, quizId));
    if (!raw) return { status: "NOT_STARTED" };
    return JSON.parse(raw) as StoredQuizState;
  } catch {
    return { status: "NOT_STARTED" };
  }
}

function writeStoredQuizState(
  courseId: string,
  quizId: string,
  state: StoredQuizState,
) {
  try {
    window.localStorage.setItem(
      getStorageKey(courseId, quizId),
      JSON.stringify(state),
    );
  } catch {
    // ignore
  }
}

export default function QuizPage() {
  const params = useParams<{ id: string; quizId: string }>();
  const router = useRouter();

  const courseId = String(params.id);
  const quizId = String(params.quizId);

  const quizzes = useMemo(() => getQuizzesForCourse(courseId), [courseId]);
  const quiz = quizzes.find((q) => q.id === quizId) ?? quizzes[0];

  const [selectedByQuestionIndex, setSelectedByQuestionIndex] = useState<
    Record<number, string>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const total = quiz.questions.length;
  const currentIndex = submitted
    ? total - 1
    : Math.min(
        total - 1,
        Math.max(0, Object.keys(selectedByQuestionIndex).length - 1),
      );

  const allAnswered = quiz.questions.every(
    (_, idx) => selectedByQuestionIndex[idx] !== undefined,
  );
  const [stepIndex, setStepIndex] = useState(0);

  const stepQuestion = quiz.questions[stepIndex];
  const selectedChoiceId = selectedByQuestionIndex[stepIndex] ?? null;

  const statusFromStorage = useMemo(() => {
    if (typeof window === "undefined") return "NOT_STARTED";
    const s = readStoredQuizState(courseId, quizId);
    return s.status;
  }, [courseId, quizId]);

  const startIfNeeded = () => {
    const existing = readStoredQuizState(courseId, quizId);
    if (existing.status === "NOT_STARTED") {
      writeStoredQuizState(courseId, quizId, {
        ...existing,
        status: "IN_PROGRESS",
      });
    }
  };

  const handleSelectChoice = (choiceId: string) => {
    startIfNeeded();
    setSelectedByQuestionIndex((prev) => ({ ...prev, [stepIndex]: choiceId }));
  };

  const handlePrev = () => setStepIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setStepIndex((i) => Math.min(total - 1, i + 1));

  const computeResult = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      const selectedId = selectedByQuestionIndex[idx];
      if (selectedId && selectedId === q.correctChoiceId) correctCount += 1;
    });
    const wrongCount = total - correctCount;
    const percentage = total === 0 ? 0 : (correctCount / total) * 100;
    const passed = percentage >= quiz.passingScorePercent;
    return {
      correctCount,
      wrongCount,
      percentage,
      passed,
      score: correctCount,
    };
  };

  const handleSubmit = () => {
    if (!allAnswered || submitted) return;
    const result = computeResult();
    setSubmitted(true);

    const existing = readStoredQuizState(courseId, quizId);
    writeStoredQuizState(courseId, quizId, {
      ...existing,
      status: "COMPLETED",
      result,
    });

    router.push(
      `/courses/${courseId}/quizzes/${quizId}/result?score=${encodeURIComponent(
        String(result.score),
      )}&percentage=${encodeURIComponent(String(result.percentage))}&correct=${encodeURIComponent(
        String(result.correctCount),
      )}&wrong=${encodeURIComponent(String(result.wrongCount))}&passed=${encodeURIComponent(
        String(result.passed),
      )}`,
    );
  };

  return (
    <AppShell>
      <button
        onClick={() => router.push(`/courses/${courseId}`)}
        className="text-sm font-display font-700 text-inksoft hover:text-coral mb-4 inline-flex items-center gap-1">
        ← Back to course
      </button>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl3 bg-white border border-creamdeep p-6">
          <h1 className="font-display text-2xl font-700 text-ink mb-1">
            {quiz.title}
          </h1>
          <p className="text-sm font-body text-inksoft">{quiz.description}</p>
        </div>

        <QuizProgress currentIndex={stepIndex + 1} total={total} />

        <QuizQuestionView
          question={stepQuestion}
          selectedChoiceId={selectedChoiceId}
          onSelectChoice={handleSelectChoice}
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="font-display font-700 rounded-2xl px-5 py-3 whitespace-nowrap bg-white border border-creamdeep hover:border-coral/50 transition-colors disabled:opacity-50 disabled:hover:border-creamdeep">
            Previous
          </button>

          <div className="flex gap-3">
            {stepIndex < total - 1 && (
              <button
                onClick={handleNext}
                disabled={!selectedChoiceId}
                className="font-display font-700 rounded-2xl px-5 py-3 whitespace-nowrap bg-white border border-creamdeep hover:border-coral/50 transition-colors disabled:opacity-50 disabled:hover:border-creamdeep">
                Next
              </button>
            )}

            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitted}
              className="font-display font-700 rounded-2xl px-5 py-3 whitespace-nowrap bg-gradient-to-r from-coral to-sunset text-white shadow-card disabled:opacity-50 disabled:shadow-none">
              Submit Quiz
            </button>
          </div>
        </div>

        {statusFromStorage === "COMPLETED" && (
          <p className="text-sm font-body text-inksoft">
            This quiz has been completed. You can review questions, but
            submission is locked.
          </p>
        )}
      </div>
    </AppShell>
  );
}
