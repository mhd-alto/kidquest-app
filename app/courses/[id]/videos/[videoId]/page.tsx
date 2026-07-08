"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/context/AuthContext";
import { getCourse } from "@/lib/api/courses";
import { getVideos, getVideo } from "@/lib/api/videos";
import { adminApi } from "@/lib/api/admin";

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
  videoUrl: string;
  duration?: number;
  orderNumber?: number;
}

interface Answer {
  _id: string;
  questionId: string;
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  quizId: string;
  questionText: string;
  points: number;
  answers: Answer[];
}

interface Quiz {
  _id: string;
  videoId: string;
  questions: Question[];
}

interface Grade {
  _id: string;
  userId: string;
  videoId: string;
  quizId: string;
  score: number;
  totalPoints: number;
  completed: boolean;
}

export default function VideoPlayerPage() {
  const params = useParams<{ id: string; videoId: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [grade, setGrade] = useState<Grade | null>(null);
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function load() {
      try {
        const [courseRes, videosRes, videoRes] = await Promise.all([
          getCourse(params.id),
          getVideos(),
          getVideo(params.videoId),
        ]);

        setCourse(courseRes.data);
        setCurrentVideo(videoRes.data);

        const courseVideos = (videosRes.data ?? [])
          .filter((v: Video) => String(v.courseId) === String(params.id))
          .sort(
            (a: Video, b: Video) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0),
          );
        setVideos(courseVideos);

        // Load quiz for this video
        const quizzesRes = await adminApi.getQuizzes();
        const videoQuiz = (quizzesRes.data ?? []).find(
          (q: Quiz) => String(q.videoId) === String(params.videoId),
        );
        if (videoQuiz) {
          setQuiz(videoQuiz);
        }

        // Load existing grade
        const gradesRes = await adminApi.getGrades();
        const existingGrade = (gradesRes.data ?? []).find(
          (g: Grade) =>
            String(g.userId) === String(user!.id) &&
            String(g.videoId) === String(params.videoId),
        );
        if (existingGrade) {
          setGrade(existingGrade);
          setQuizSubmitted(existingGrade.completed);
          setQuizScore(existingGrade.score);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading video page:", error);
        setLoading(false);
      }
    }
    load();
  }, [params.id, params.videoId, user]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);

      // Mark as completed when 90% watched
      if (progress >= 90 && !videoCompleted) {
        setVideoCompleted(true);
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setVideoCompleted(true);
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleQuizSubmit = async () => {
    if (!quiz || !user || !currentVideo) return;

    // Calculate score
    let totalScore = 0;
    let totalPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const selectedAnswerId = selectedAnswers[question._id];
      if (selectedAnswerId) {
        const selectedAnswer = question.answers.find(
          (a) => a._id === selectedAnswerId,
        );
        if (selectedAnswer?.isCorrect) {
          totalScore += question.points;
        }
      }
    });

    setQuizScore(totalScore);
    setQuizSubmitted(true);

    // Save grade
    try {
      if (grade) {
        await adminApi.updateGrade(Number(grade._id), {
          score: totalScore,
          totalPoints,
          completed: true,
        });
      } else {
        const newGrade = await adminApi.createGrade({
          userId: user.id,
          videoId: currentVideo._id,
          quizId: quiz._id,
          score: totalScore,
          totalPoints,
          completed: true,
        });
        setGrade(newGrade.data);
      }
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex((v) => v._id === params.videoId);
    if (currentIndex < videos.length - 1) {
      const nextVideo = videos[currentIndex + 1];
      router.push(`/courses/${params.id}/videos/${nextVideo._id}`);
    }
  };

  const getVideoStatus = (video: Video) => {
    if (video._id === params.videoId) return "current";
    if (videoCompleted && video._id === currentVideo?._id) return "completed";
    return "locked";
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-96">
          <div className="h-12 w-12 rounded-full border-4 border-coral border-t-transparent animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!course || !currentVideo) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <p className="font-body text-inksoft">Video not found</p>
        </div>
      </AppShell>
    );
  }

  const currentIndex = videos.findIndex((v) => v._id === params.videoId);
  const isLastVideo = currentIndex === videos.length - 1;

  return (
    <AppShell>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Video List (30%) */}
        <div className="lg:w-[30%] space-y-4">
          <div className="bg-white border border-creamdeep rounded-xl2 p-4">
            <h2 className="font-display font-700 text-lg text-ink mb-3">
              Course Videos
            </h2>
            <div className="space-y-2">
              {videos.map((video: Video, index: number) => {
                const status = getVideoStatus(video);
                const isCurrent = status === "current";

                return (
                  <button
                    key={video._id}
                    onClick={() =>
                      router.push(
                        `/courses/${params.id}/videos/${video._id}`,
                      )
                    }
                    className={`w-full text-left p-3 rounded-xl2 transition-all ${
                      isCurrent
                        ? "bg-coral/10 border-2 border-coral"
                        : "bg-cream/50 border-2 border-transparent hover:border-creamdeep"
                    }`}>
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 font-display font-700 text-sm ${
                          status === "completed"
                            ? "bg-mint/15 text-mintdeep"
                            : isCurrent
                              ? "bg-coral/15 text-coral"
                              : "bg-creamdeep text-inksoft"
                        }`}>
                        {status === "completed" ? "✓" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-display font-700 text-sm truncate ${
                            isCurrent ? "text-coral" : "text-ink"
                          }`}>
                          {video.title}
                        </p>
                        {video.duration && (
                          <p className="text-xs text-inksoft font-body mt-0.5">
                            {formatDuration(video.duration)}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area (70%) */}
        <div className="lg:w-[70%] space-y-6">
          {/* Video Player */}
          <div className="bg-white border border-creamdeep rounded-xl2 overflow-hidden">
            <div className="relative bg-ink aspect-video">
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleVideoEnded}
                controls
              />
            </div>

            {/* Video Controls & Progress */}
            <div className="p-4 border-t border-creamdeep">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handlePlayPause}
                  className="h-10 w-10 rounded-full bg-coral text-white flex items-center justify-center hover:bg-coraldeep transition-colors">
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-creamdeep overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-coral to-sunset transition-all"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-body text-inksoft min-w-[3rem] text-right">
                  {Math.round(videoProgress)}%
                </span>
              </div>

              <h1 className="font-display font-700 text-xl text-ink mb-2">
                {currentVideo.title}
              </h1>
              {currentVideo.description && (
                <p className="font-body text-inksoft text-sm">
                  {currentVideo.description}
                </p>
              )}
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white border border-creamdeep rounded-xl2 p-4">
            <h3 className="font-display font-700 text-ink mb-3">Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-inksoft font-body mb-1">
                  Video Watched
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-creamdeep overflow-hidden">
                    <div
                      className="h-full rounded-full bg-mint"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-body font-700 text-ink min-w-[3rem]">
                    {Math.round(videoProgress)}%
                  </span>
                </div>
              </div>
              {quiz && (
                <div>
                  <p className="text-sm text-inksoft font-body mb-1">
                    Quiz Score
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-creamdeep overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky"
                        style={{
                          width:
                            quizSubmitted && quizScore !== null
                              ? `${(quizScore / 8) * 100}%`
                              : "0%",
                        }}
                      />
                    </div>
                    <span className="text-sm font-body font-700 text-ink min-w-[3rem]">
                      {quizSubmitted && quizScore !== null
                        ? `${quizScore}/8`
                        : "-"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quiz Section */}
          {quiz && (
            <div className="bg-white border border-creamdeep rounded-xl2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-700 text-xl text-ink">
                  Quiz Time! 🎯
                </h3>
                {quizSubmitted && quizScore !== null && (
                  <div
                    className={`px-4 py-2 rounded-full font-display font-700 ${
                      quizScore >= 6
                        ? "bg-mint/15 text-mintdeep"
                        : quizScore >= 4
                          ? "bg-sunset/15 text-sunset"
                          : "bg-berry/15 text-berrydeep"
                    }`}>
                    Score: {quizScore}/8
                  </div>
                )}
              </div>

              {!quizSubmitted ? (
                <>
                  <p className="font-body text-inksoft mb-6">
                    Test your knowledge! Answer all {quiz.questions.length}{" "}
                    questions to complete the quiz.
                  </p>

                  <div className="space-y-6">
                    {quiz.questions.map((question: Question, qIndex: number) => (
                      <div
                        key={question._id}
                        className="border border-creamdeep rounded-xl2 p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="h-8 w-8 rounded-full bg-sky/15 text-skydeep font-display font-700 flex items-center justify-center shrink-0 text-sm">
                            {qIndex + 1}
                          </div>
                          <p className="font-display font-700 text-ink flex-1">
                            {question.questionText}
                          </p>
                          <span className="text-xs text-inksoft font-body">
                            {question.points} pts
                          </span>
                        </div>

                        <div className="space-y-2 ml-11">
                          {question.answers.map((answer: Answer) => (
                            <button
                              key={answer._id}
                              onClick={() =>
                                handleAnswerSelect(question._id, answer._id)
                              }
                              className={`w-full text-left p-3 rounded-xl2 border-2 transition-all ${
                                selectedAnswers[question._id] === answer._id
                                  ? "border-coral bg-coral/10"
                                  : "border-creamdeep hover:border-coral/50"
                              }`}>
                              <p className="font-body text-sm text-ink">
                                {answer.answerText}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleQuizSubmit}
                    disabled={
                      !quiz.questions.every((q) => selectedAnswers[q._id])
                    }
                    className="mt-6 w-full bg-gradient-to-r from-coral to-sunset text-white font-display font-700 rounded-2xl px-6 py-3 hover:shadow-card transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    Submit Quiz
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">
                    {quizScore! >= 6 ? "🎉" : quizScore! >= 4 ? "👍" : "💪"}
                  </div>
                  <h4 className="font-display font-700 text-xl text-ink mb-2">
                    {quizScore! >= 6
                      ? "Great Job!"
                      : quizScore! >= 4
                        ? "Good Effort!"
                        : "Keep Practicing!"}
                  </h4>
                  <p className="font-body text-inksoft mb-6">
                    You scored {quizScore} out of 8 points
                  </p>

                  {!isLastVideo && (
                    <button
                      onClick={handleNextVideo}
                      className="bg-gradient-to-r from-mint to-sky text-white font-display font-700 rounded-2xl px-6 py-3 hover:shadow-card transition-all">
                      Next Video →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}