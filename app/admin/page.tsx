'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/admin';

interface Stats {
  users: number;
  groups: number;
  courses: number;
  videos: number;
  enrollments: number;
  grades: number;
  quizzes: number;
  answers: number;
  achievements: number;
}

export default function Adminhome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, groups, courses, videos, enrollments, grades, quizzes, answers, achievements] =
          await Promise.all([
            adminApi.getUsers(),
            adminApi.getGroups(),
            adminApi.getCourses(),
            adminApi.getVideos(),
            adminApi.getEnrollments(),
            adminApi.getGrades(),
            adminApi.getQuizzes(),
            adminApi.getAnswers(),
            adminApi.getAchievements(),
          ]);

        setStats({
          users: users.data?.length || 0,
          groups: groups.data?.length || 0,
          courses: courses.data?.length || 0,
          videos: videos.data?.length || 0,
          enrollments: enrollments.data?.length || 0,
          grades: grades.data?.length || 0,
          quizzes: quizzes.data?.length || 0,
          answers: answers.data?.length || 0,
          achievements: achievements.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const resources = [
    { href: '/admin/users', label: 'Users', count: stats?.users, icon: '👥' },
    { href: '/admin/groups', label: 'Groups', count: stats?.groups, icon: '👨‍👩‍👧‍👦' },
    { href: '/admin/courses', label: 'Courses', count: stats?.courses, icon: '📚' },
    { href: '/admin/videos', label: 'Videos', count: stats?.videos, icon: '🎥' },
    { href: '/admin/enrollments', label: 'Enrollments', count: stats?.enrollments, icon: '📝' },
    { href: '/admin/grades', label: 'Grades', count: stats?.grades, icon: '📊' },
    { href: '/admin/quizzes', label: 'Quizzes', count: stats?.quizzes, icon: '❓' },
    { href: '/admin/answers', label: 'Q&A / Answers', count: stats?.answers, icon: '✅' },
    { href: '/admin/achievements', label: 'Achievements', count: stats?.achievements, icon: '🏆' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-700 text-ink mb-2">Admin home</h1>
        <p className="text-inksoft font-body">Manage all resources in your LMS</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="h-8 w-8 rounded-full border-4 border-coral border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-creamdeep hover:border-coral hover:shadow-card transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{resource.icon}</div>
              <h3 className="font-display font-600 text-ink mb-1 group-hover:text-coral transition-colors">
                {resource.label}
              </h3>
              <p className="text-2xl font-700 text-coral">
                {resource.count !== undefined ? resource.count : '-'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
