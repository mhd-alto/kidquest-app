"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/context/AuthContext";
import { getCourse } from "@/lib/api/courses";
import { getVideos } from "@/lib/api/videos";
import { getEnrollments, createEnrollment } from "@/lib/api/enrollments";

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

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    console.log(user,'____________________________________________________')
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
          .sort((a: Video, b: Video) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0))
      );
      setEnrolled(
        (enrollRes.data ?? []).some(
          (e: any) =>
            e.userId === user!.id && String(e.courseId) === String(params.id)
        )
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

  return (
    <AppShell>
      <button
        onClick={() => router.push("/home")}
        className="text-sm font-display font-700 text-inksoft hover:text-coral mb-4 inline-flex items-center gap-1"
      >
        ← Back to courses
      </button>

      {loading && (
        <div className="h-40 rounded-xl2 bg-creamdeep/60 animate-pulse" />
      )}

      {!loading && course && (
        <>
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
              }`}
            >
              {enrolled ? "✓ Enrolled" : enrolling ? "Enrolling…" : "Start Course"}
            </button>
          </div>

          <h2 className="font-display text-lg font-700 text-ink mb-3">
            Lessons
          </h2>
          <ol className="flex flex-col gap-3">
            {videos.map((v, i) => (
              <li
                key={v._id}
                className="flex items-center gap-4 bg-white border border-creamdeep rounded-xl2 p-4"
              >
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
              </li>
            ))}
            {videos.length === 0 && (
              <p className="text-sm font-body text-inksoft">
                No lessons published for this course yet.
              </p>
            )}
          </ol>
        </>
      )}
    </AppShell>
  );
}
