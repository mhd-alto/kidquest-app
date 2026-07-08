"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import QuestTrail from "@/components/QuestTrail";
import CourseCard from "@/components/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { getCourses } from "@/lib/api/courses";
import { getVideos } from "@/lib/api/videos";
import { getEnrollments } from "@/lib/api/enrollments";
import { getAchievements, getUserAchievements } from "@/lib/api/gamification";

interface Course {
  id: number;
  title: string;
  description?: string;
}
interface Video {
  id: number;
  courseId: number;
}
interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const [coursesRes, videosRes, enrollRes] = await Promise.all([
          getCourses(),
          getVideos(),
          getEnrollments(),
        ]);
        setCourses(coursesRes.data ?? []);
        setVideos(videosRes.data ?? []);
        setEnrollments(
          (enrollRes.data ?? []).filter((e: Enrollment) => e.userId === user!.id)
        );

        // XP = sum of points for achievements this user has actually earned
        try {
          const [achRes, userAchRes] = await Promise.all([
            getAchievements(),
            getUserAchievements(),
          ]);
          const achievements = achRes.data ?? [];
          const mine = (userAchRes.data ?? []).filter(
            (ua: any) => ua.userId === user!.id
          );
          const total = mine.reduce((sum: number, ua: any) => {
            const def = achievements.find((a: any) => a.id === ua.achievementId);
            return sum + (def?.points ?? 0);
          }, 0);
          setXp(total);
        } catch {
          // gamification endpoints are optional for the dashboard to render
        }
      } catch (err) {
        setLoadError(
          "Couldn't reach the KidQuest server. Make sure the API is running."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  const streakCompleted = Math.min(enrollments.length, 7); // placeholder signal until a streak endpoint exists

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 md:hidden">
          <span className="text-2xl">🚀</span>
          <span className="font-display text-xl font-700 text-coraldeep">
            KidQuest
          </span>
        </div>
        <div />
        <div className="flex items-center gap-1.5 bg-gold/20 rounded-full px-4 py-1.5 font-display font-700 text-sm text-[#8A6400]">
          <span>⚡</span>
          {xp} XP
        </div>
      </div>

      {/* Hero greeting */}
      <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-coral to-sunset px-6 py-6 md:px-8 md:py-7 shadow-card mb-6">
        <div className="relative z-10 max-w-[70%]">
          <h1 className="font-display text-2xl md:text-3xl font-700 text-white mb-1.5">
            Hey, {user?.username ?? "Explorer"}!
          </h1>
          <p className="text-white/90 font-body">
            Ready to learn something amazing today?
          </p>
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl md:text-6xl animate-float">
          🧑‍🚀
        </div>
        <div aria-hidden className="absolute -right-6 -bottom-8 text-8xl opacity-10">
          ✦
        </div>
      </div>

      {/* Streak / quest trail */}
      <div className="bg-white rounded-xl2 border border-creamdeep p-5 mb-8">
        <QuestTrail completedCount={streakCompleted} />
      </div>

      {/* Course grid */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🛰️</span>
        <h2 className="font-display text-lg font-700 text-ink">
          Choose a Course
        </h2>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-xl2 bg-creamdeep/60 animate-pulse"
            />
          ))}
        </div>
      )}

      {loadError && !loading && (
        <p className="text-sm font-body text-berrydeep bg-berry/10 rounded-xl px-4 py-3">
          {loadError}
        </p>
      )}

      {!loading && !loadError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => {
            const lessonCount = videos.filter(
              (v) => v.courseId === course._id
            ).length;
            const enrollment = enrollments.find(
              (e) => e.courseId === course._id
            );
            const progress =
              enrollment?.status === "completed"
                ? 100
                : enrollment?.status === "active"
                ? 45
                : 0;
            return (
              <CourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                lessonCount={lessonCount}
                progress={progress}
                index={i}
              />
            );
          })}
          {courses.length === 0 && (
            <p className="text-sm font-body text-inksoft col-span-full">
              No courses yet — check back soon for your next quest!
            </p>
          )}
        </div>
      )}
    </AppShell>
  );
}
