"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/context/AuthContext";
import { getCourse } from "@/lib/api/courses";
import { getVideos } from "@/lib/api/videos";
import { getEnrollments, createEnrollment } from "@/lib/api/enrollments";
import { getQuizzesForCourse, type QuizStatus } from "@/lib/mock/quizzes";
import QuizCard from "@/components/quiz/QuizCard";

interface Course {
  _id: string;
  title: string;
  description?: string;
  instructor?: string;
}
interface Video {
  _id: string;
  courseId: string;
  title: string;
  description?: string;
  duration?: number;
  orderNumber?: number;
}

type QuizStoredState = {
  status: QuizStatus;
};

function getQuizStorageKey(courseId: string, quizId: string) {
  return `kidquest.quiz.state:${courseId}:${quizId}`;
}

function readQuizStatus(courseId: string, quizId: string): QuizStatus {
  try {
    const raw = window.localStorage.getItem(
      getQuizStorageKey(courseId, quizId),
    );
    if (!raw) return "NOT_STARTED";
    const parsed = JSON.parse(raw) as QuizStoredState;
    if (!parsed?.status) return "NOT_STARTED";
    return parsed.status;
  } catch {
    return "NOT_STARTED";
  }
}

function readAllQuizStatuses(
  courseId: string,
  quizIds: string[],
): Record<string, QuizStatus> {
  const out: Record<string, QuizStatus> = {};
  quizIds.forEach((id) => {
    out[id] = readQuizStatus(courseId, id);
  });
  return out;
}

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  const courseId = String(params.id);

  const quizzes = useMemo(() => getQuizzesForCourse(courseId), [courseId]);
  const quizIds = useMemo(() => quizzes.map((q) => q.id), [quizzes]);

  const [quizStatuses, setQuizStatuses] = useState<Record<string, QuizStatus>>(
    {},
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    setQuizStatuses(readAllQuizStatuses(courseId, quizIds));
  }, [courseId, quizIds]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [courseRes, videosRes, enrollRes] = await Promise.all([
        getCourse(params.id),
        getVideos(),
        getEnrollments(),
      ]);
      setCourse(courseRes.data);
      setVideos(
        (videosRes.data ?? [])
          .filter((v: Video) => String(v.courseId) === String(params.id))
          .sort(
            (a: Video, b: Video) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0),
          ),
      );
      setEnrolled(
        (enrollRes.data ?? []).some(
          (e: any) =>
            e.userId === user!.id && String(e.courseId) === String(params.id),
        ),
      );
      setLoading(false);
    }
    load();
  }, [params.id, user]);

  async function handleEnroll() {
    if (!user || !course) return;
    setEnrolling(true);
    try {
      await createEnrollment({
        userId: user.id,
        courseId: course._id,
        status: "active",
      });
      setEnrolled(true);
    } finally {
      setEnrolling(false);
    }
  }

  const lessonCompletionCount =
    videos.length === 0 ? 0 : Math.min(1, videos.length);
  // UI-only: assume first lesson as completed if enrolled; quizzes are based on localStorage status.
  const lessonCompleted = enrolled ? lessonCompletionCount : 0;

  const quizCompletedCount = Object.values(quizStatuses).filter(
    (s) => s === "COMPLETED",
  ).length;
  const quizInProgressCount = Object.values(quizStatuses).filter(
    (s) => s === "IN_PROGRESS",
  ).length;

  const totalUnits = videos.length + quizzes.length;
  const completedUnits = lessonCompleted + quizCompletedCount;
  const progressPercent =
    totalUnits === 0 ? 0 : Math.round((completedUnits / totalUnits) * 100);

  const refreshQuizStatuses = () => {
    if (typeof window === "undefined") return;
    setQuizStatuses(readAllQuizStatuses(courseId, quizIds));
  };

  useEffect(() => {
    // refresh when returning from quiz result page
    if (typeof window === "undefined") return;
    const t = setTimeout(refreshQuizStatuses, 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, enrolled]);

  return (
    <AppShell>
      <button
        onClick={() => router.push("/home")}
        className="text-sm font-display font-700 text-inksoft hover:text-coral mb-4 inline-flex items-center gap-1">
        ← Back to courses
      </button>

      {loading && (
        <div className="h-40 rounded-xl2 bg-creamdeep/60 animate-pulse" />
      )}

      {!loading && course && (
        <>
          <div className="mb-6">
            <div className="rounded-xl3 bg-white border border-creamdeep p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-700 text-ink text-lg">
                    Overall Progress
                  </h3>
                  <p className="text-sm font-body text-inksoft mt-1">
                    {progressPercent}% complete
                  </p>
                </div>
                <div className="text-xs font-body text-inksoft shrink-0">
                  {quizCompletedCount} quizzes completed
                  {quizInProgressCount
                    ? ` • ${quizInProgressCount} in progress`
                    : ""}
                </div>
              </div>

              <div className="mt-4 h-2 rounded-full bg-creamdeep overflow-hidden">
                <div
                  className="h-full rounded-full bg-mint"
                  style={{
                    width: `${Math.min(100, Math.max(0, progressPercent))}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl3 bg-white border border-creamdeep p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-700 text-ink mb-1">
                {course.title}
              </h1>
              {course.instructor && (
                <p className="text-sm font-body text-inksoft mb-2">
                  Guide: {course.instructor}
                </p>
              )}
              {course.description && (
                <p className="font-body text-inksoft max-w-xl">
                  {course.description}
                </p>
              )}
            </div>
            <button
              onClick={handleEnroll}
              disabled={enrolled || enrolling}
              className={`font-display font-700 rounded-2xl px-5 py-3 whitespace-nowrap ${
                enrolled
                  ? "bg-mint/15 text-mintdeep"
                  : "bg-gradient-to-r from-coral to-sunset text-white shadow-card"
              }`}>
              {enrolled
                ? "✓ Enrolled"
                : enrolling
                  ? "Enrolling…"
                  : "Start Course"}
            </button>
          </div>

          <h2 className="font-display text-lg font-700 text-ink mb-3">
            Lessons
          </h2>
          <div className="flex flex-col gap-3">
            {videos.map((v, i) => (
              <button
                key={v._id}
                onClick={() =>
                  router.push(`/courses/${params.id}/videos/${v._id}`)
                }
                className="flex items-center gap-4 bg-white border border-creamdeep rounded-xl2 p-4 text-left hover:border-coral/50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-sky/15 text-skydeep font-display font-700 flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-display font-700 text-ink">{v.title}</p>
                  {v.description && (
                    <p className="text-sm font-body text-inksoft">
                      {v.description}
                    </p>
                  )}
                </div>
                {v.duration && (
                  <span className="text-xs font-body text-inksoft shrink-0">
                    {Math.round(v.duration / 60)} min
                  </span>
                )}
              </button>
            ))}
          </div>

          {videos.length === 0 && (
            <p className="text-sm font-body text-inksoft">
              No lessons published for this course yet.
            </p>
          )}

          <h2 className="font-display text-lg font-700 text-ink mt-6 mb-3">
            Quizzes
          </h2>
          <div className="flex flex-col gap-3">
            {quizzes.map((q, idx) => (
              <QuizCard
                key={q.id}
                index={Number(idx)}
                quizNumber={Number(q.quizNumber)}
                title={q.title}
                description={q.description}
                questionCount={Number(q.questionCount)}
                estimatedDurationMinutes={Number(q.estimatedDurationMinutes)}
                status={(quizStatuses[q.id] ?? "NOT_STARTED") as QuizStatus}
                onStart={() =>
                  router.push(`/courses/${courseId}/quizzes/${q.id}`)
                }
              />
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
