"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminForm from "@/components/admin/AdminForm";
import { adminApi } from "@/lib/api/admin";

interface Course {
  id: number;
  title: string;
}

interface Quiz {
  _id?: string;
  id?: number;
  courseId: number;
  title: string;
}

interface Question {
  _id?: string;
  id?: number;
  quizId: string;
  questionText: string;
  questionType?: string;
  points?: number;
}

interface Answer {
  id: number;
  questionId: string;
  answerText: string;
  isCorrect?: boolean;
}

const QUESTION_TYPES = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "true_false", label: "True / False" },
  { value: "short_answer", label: "Short Answer" },
];

export default function AnswersPage() {
  const [tab, setTab] = useState<"answers" | "questions">("answers");

  const [courses, setCourses] = useState<Course[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  // Question modal state
  const [isQModalOpen, setIsQModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [qFormData, setQFormData] = useState<Partial<Question>>({});
  const [isQSaving, setIsQSaving] = useState(false);
  const [qDeleteConfirm, setQDeleteConfirm] = useState<Question | null>(null);

  // Answer modal state
  const [isAModalOpen, setIsAModalOpen] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState<Answer | null>(null);
  // aFormData carries a helper `quizId` field (UI-only, used to filter the
  // question dropdown) in addition to the real Answer fields.
  const [aFormData, setAFormData] = useState<
    Partial<Answer> & { quizId?: number | string }
  >({});
  const [isASaving, setIsASaving] = useState(false);
  const [aDeleteConfirm, setADeleteConfirm] = useState<Answer | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [coursesRes, quizzesRes, questionsRes, answersRes] =
        await Promise.all([
          adminApi.getCourses(),
          adminApi.getQuizzes(),
          adminApi.getQuestions(),
          adminApi.getAnswers(),
        ]);
      setCourses(coursesRes.data);
      setQuizzes(quizzesRes.data);
      setQuestions(questionsRes.data);
      setAnswers(answersRes.data);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ---------- Lookups ----------
  const courseTitle = (courseId: number) =>
    courses.find((c) => c.id === Number(courseId))?.title ||
    `Course #${courseId}`;

  const quizTitle = (quizId: string) =>
    quizzes.find((q) => (q._id || String(q.id)) === quizId)?.title ||
    `Quiz #${quizId}`;

  const quizCourseTitle = (quizId: string) => {
    const quiz = quizzes.find((q) => (q._id || String(q.id)) === quizId);
    return quiz ? courseTitle(quiz.courseId) : "-";
  };

  const questionText = (questionId: string) =>
    questions.find((q) => (q._id || String(q.id)) === questionId)
      ?.questionText || `Question #${questionId}`;

  const quizIdForQuestion = (questionId: string) =>
    questions.find((q) => (q._id || String(q.id)) === questionId)?.quizId;

  const quizOptions = useMemo(
    () =>
      quizzes.map((q) => ({
        value: q._id || String(q.id),
        label: `${q.title} (${courseTitle(q.courseId)})`,
      })),
    [quizzes, courses],
  );

  // ============================================================
  // QUESTIONS CRUD
  // ============================================================
  const handleAddNewQuestion = () => {
    setEditingQuestion(null);
    setQFormData({});
    setIsQModalOpen(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQFormData(question);
    setIsQModalOpen(true);
  };

  const handleDeleteQuestion = (question: Question) =>
    setQDeleteConfirm(question);

  const confirmDeleteQuestion = async () => {
    if (!qDeleteConfirm) return;
    try {
      await adminApi.deleteQuestion(qDeleteConfirm.id);
      setQuestions(questions.filter((q) => q.id !== qDeleteConfirm.id));
      setQDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!qFormData.quizId || !qFormData.questionText) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      ...qFormData,
      quizId: String(qFormData.quizId),
      points: qFormData.points ? Number(qFormData.points) : undefined,
    };

    try {
      setIsQSaving(true);
      if (editingQuestion) {
        await adminApi.updateQuestion(editingQuestion.id, payload);
        setQuestions(
          questions.map((q) =>
            q.id === editingQuestion.id ? { ...q, ...payload } : q,
          ),
        );
      } else {
        const response = await adminApi.createQuestion(payload);
        setQuestions([...questions, response.data]);
      }
      setIsQModalOpen(false);
    } catch (error) {
      console.error("Failed to save question:", error);
    } finally {
      setIsQSaving(false);
    }
  };

  const questionColumns = [
    { key: "id", label: "ID" },
    { key: "questionText", label: "Question" },
    {
      key: "quizId",
      label: "Quiz",
      render: (value: number) => quizTitle(value),
    },
    {
      key: "quizId2",
      label: "Course",
      render: (_: any, item: Question) => quizCourseTitle(item.quizId),
    },
    { key: "questionType", label: "Type" },
    { key: "points", label: "Points" },
  ];

  const questionFormFields = [
    {
      name: "quizId",
      label: "Quiz",
      type: "select" as const,
      required: true,
      options: quizOptions,
    },
    {
      name: "questionText",
      label: "Question Text",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter the question",
    },
    {
      name: "questionType",
      label: "Question Type",
      type: "select" as const,
      options: QUESTION_TYPES,
    },
    {
      name: "points",
      label: "Points",
      type: "number" as const,
      placeholder: "e.g., 10",
    },
  ];

  // ============================================================
  // ANSWERS CRUD
  // ============================================================
  const handleAddNewAnswer = () => {
    setEditingAnswer(null);
    setAFormData({});
    setIsAModalOpen(true);
  };

  const handleEditAnswer = (answer: Answer) => {
    setEditingAnswer(answer);
    setAFormData({ ...answer, quizId: quizIdForQuestion(answer.questionId) });
    setIsAModalOpen(true);
  };

  const handleDeleteAnswer = (answer: Answer) => setADeleteConfirm(answer);

  const confirmDeleteAnswer = async () => {
    if (!aDeleteConfirm) return;
    try {
      await adminApi.deleteAnswer(aDeleteConfirm.id);
      setAnswers(answers.filter((a) => a.id !== aDeleteConfirm.id));
      setADeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete answer:", error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!aFormData.questionId || !aFormData.answerText) {
      alert("Please fill all required fields (pick a quiz, then a question)");
      return;
    }

    // Only send the fields the Answers API actually expects.
    const payload = {
      questionId: String(aFormData.questionId),
      answerText: aFormData.answerText,
      isCorrect: Boolean(aFormData.isCorrect),
    };

    try {
      setIsASaving(true);
      if (editingAnswer) {
        await adminApi.updateAnswer(editingAnswer.id, payload);
        setAnswers(
          answers.map((a) =>
            a.id === editingAnswer.id ? { ...a, ...payload } : a,
          ),
        );
      } else {
        const response = await adminApi.createAnswer(payload);
        setAnswers([...answers, response.data]);
      }
      setIsAModalOpen(false);
    } catch (error) {
      console.error("Failed to save answer:", error);
    } finally {
      setIsASaving(false);
    }
  };

  const answerColumns = [
    { key: "id", label: "ID" },
    { key: "answerText", label: "Answer" },
    {
      key: "isCorrect",
      label: "Correct",
      render: (value: boolean) =>
        value ? (
          <span className="inline-flex items-center gap-1 text-green-600 font-600">
            ✔ Correct
          </span>
        ) : (
          <span className="text-inksoft">—</span>
        ),
    },
    {
      key: "questionId",
      label: "Question",
      render: (value: number) => questionText(value),
    },
    {
      key: "questionId2",
      label: "Quiz",
      render: (_: any, item: Answer) => {
        const quizId = quizIdForQuestion(item.questionId);
        return quizId ? quizTitle(quizId) : "-";
      },
    },
    {
      key: "questionId3",
      label: "Course",
      render: (_: any, item: Answer) => {
        const quizId = quizIdForQuestion(item.questionId);
        return quizId ? quizCourseTitle(quizId) : "-";
      },
    },
  ];

  // Questions available for the quiz currently selected in the Answer form.
  const questionOptionsForSelectedQuiz = useMemo(() => {
    if (!aFormData.quizId) return [];
    return questions
      .filter((q) => String(q.quizId) === String(aFormData.quizId))
      .map((q) => ({
        value: q._id || String(q.id),
        label: q.questionText,
      }));
  }, [questions, aFormData.quizId]);

  const answerFormFields = [
    {
      name: "quizId",
      label: "Quiz",
      type: "select" as const,
      required: true,
      options: quizOptions,
    },
    {
      name: "questionId",
      label: "Question",
      type: "select" as const,
      required: true,
      options: questionOptionsForSelectedQuiz,
    },
    {
      name: "answerText",
      label: "Answer Text",
      type: "text" as const,
      required: true,
      placeholder: "Enter the answer option",
    },
    {
      name: "isCorrect",
      label: "This is the correct answer",
      type: "checkbox" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">
          Quiz Questions &amp; Answers
        </h1>
        <p className="text-inksoft font-body">
          Manage quiz answers and the questions behind them. Every answer is
          linked to a question, every question to a quiz, and every quiz to a
          course.
        </p>
      </div>

      <div className="flex gap-2 border-b border-creamdeep">
        <button
          onClick={() => setTab("answers")}
          className={`px-4 py-2 font-display font-600 text-sm rounded-t-xl transition-colors ${
            tab === "answers"
              ? "bg-coral text-white"
              : "text-inksoft hover:bg-creamdeep/50"
          }`}
        >
          Answers
        </button>
        <button
          onClick={() => setTab("questions")}
          className={`px-4 py-2 font-display font-600 text-sm rounded-t-xl transition-colors ${
            tab === "questions"
              ? "bg-coral text-white"
              : "text-inksoft hover:bg-creamdeep/50"
          }`}
        >
          Questions
        </button>
      </div>

      {tab === "answers" ? (
        <>
          <AdminTable
            columns={answerColumns}
            data={answers}
            onEdit={handleEditAnswer}
            onDelete={handleDeleteAnswer}
            onAddNew={handleAddNewAnswer}
            isLoading={loading}
          />

          <AdminModal
            isOpen={isAModalOpen}
            title={editingAnswer ? "Edit Answer" : "Add New Answer"}
            onClose={() => setIsAModalOpen(false)}
            onSubmit={handleSubmitAnswer}
            isLoading={isASaving}
          >
            {questions.length === 0 ? (
              <p className="text-inksoft font-body text-sm">
                No questions exist yet. Switch to the <strong>Questions</strong>{" "}
                tab and add a question first, then come back to add its answers.
              </p>
            ) : (
              <AdminForm
                fields={answerFormFields}
                values={aFormData}
                onFieldChange={(name, value) => {
                  if (name === "quizId") {
                    // Changing the quiz resets the question choice since the
                    // question list is scoped to the selected quiz.
                    setAFormData({
                      ...aFormData,
                      quizId: value,
                      questionId: undefined,
                    });
                  } else {
                    setAFormData({ ...aFormData, [name]: value });
                  }
                }}
              />
            )}
          </AdminModal>

          <AdminModal
            isOpen={Boolean(aDeleteConfirm)}
            title="Confirm Delete"
            onClose={() => setADeleteConfirm(null)}
          >
            <div className="space-y-4">
              <p className="text-ink font-body">
                Are you sure you want to delete the answer{" "}
                <strong>{aDeleteConfirm?.answerText}</strong>? This action
                cannot be undone.
              </p>
              <div className="flex gap-3 justify-end pt-4 border-t border-creamdeep">
                <button
                  onClick={() => setADeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl font-display font-600 text-inksoft hover:bg-creamdeep transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAnswer}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl font-display font-600 hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </AdminModal>
        </>
      ) : (
        <>
          <AdminTable
            columns={questionColumns}
            data={questions}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
            onAddNew={handleAddNewQuestion}
            isLoading={loading}
          />

          <AdminModal
            isOpen={isQModalOpen}
            title={editingQuestion ? "Edit Question" : "Add New Question"}
            onClose={() => setIsQModalOpen(false)}
            onSubmit={handleSubmitQuestion}
            isLoading={isQSaving}
          >
            {quizzes.length === 0 ? (
              <p className="text-inksoft font-body text-sm">
                No quizzes exist yet. Go to <strong>Manage Quizzes</strong> and
                create a quiz first, then come back to add its questions.
              </p>
            ) : (
              <AdminForm
                fields={questionFormFields}
                values={qFormData}
                onFieldChange={(name, value) =>
                  setQFormData({ ...qFormData, [name]: value })
                }
              />
            )}
          </AdminModal>

          <AdminModal
            isOpen={Boolean(qDeleteConfirm)}
            title="Confirm Delete"
            onClose={() => setQDeleteConfirm(null)}
          >
            <div className="space-y-4">
              <p className="text-ink font-body">
                Are you sure you want to delete the question{" "}
                <strong>{qDeleteConfirm?.questionText}</strong>? This will also
                remove any answers linked to it. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end pt-4 border-t border-creamdeep">
                <button
                  onClick={() => setQDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl font-display font-600 text-inksoft hover:bg-creamdeep transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteQuestion}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl font-display font-600 hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </AdminModal>
        </>
      )}
    </div>
  );
}
