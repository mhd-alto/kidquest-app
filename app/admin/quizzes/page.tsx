"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminForm from "@/components/admin/AdminForm";
import { adminApi } from "@/lib/api/admin";

interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  timeLimit?: number;
  passingScore?: number;
}

interface Course {
  _id?: string;
  id?: number;
  title: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [formData, setFormData] = useState<Partial<Quiz>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Quiz | null>(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const [quizzesRes, coursesRes] = await Promise.all([
        adminApi.getQuizzes(),
        adminApi.getCourses(),
      ]);
      setQuizzes(quizzesRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const courseTitle = (courseId: string) =>
    courses.find((c) => (c._id || String(c.id)) === courseId)?.title ||
    `Course #${courseId}`;

  const handleAddNew = () => {
    setEditingQuiz(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setFormData(quiz);
    setIsModalOpen(true);
  };

  const handleDelete = (quiz: Quiz) => {
    setDeleteConfirm(quiz);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteQuiz(deleteConfirm.id);
      setQuizzes(quizzes.filter((q) => q.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.courseId || !formData.title) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      ...formData,
      courseId: String(formData.courseId),
      timeLimit:
        formData.timeLimit !== undefined && formData.timeLimit !== ""
          ? Number(formData.timeLimit)
          : undefined,
      passingScore:
        formData.passingScore !== undefined && formData.passingScore !== ""
          ? Number(formData.passingScore)
          : undefined,
    };

    try {
      setIsSaving(true);
      if (editingQuiz) {
        await adminApi.updateQuiz(editingQuiz.id, payload);
        setQuizzes(
          quizzes.map((q) =>
            q.id === editingQuiz.id ? { ...q, ...payload } : q,
          ),
        );
      } else {
        const response = await adminApi.createQuiz(payload);
        setQuizzes([...quizzes, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save quiz:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Quiz Title" },
    {
      key: "courseId",
      label: "Course",
      render: (value: string) => courseTitle(value),
    },
    { key: "timeLimit", label: "Time Limit (min)" },
    { key: "passingScore", label: "Passing Score" },
  ];

  const formFields = [
    {
      name: "courseId",
      label: "Course",
      type: "select" as const,
      required: true,
      options: courses.map((c) => ({
        value: c._id || String(c.id),
        label: c.title,
      })),
    },
    {
      name: "title",
      label: "Quiz Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter quiz title",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Quiz description",
    },
    {
      name: "timeLimit",
      label: "Time Limit (minutes)",
      type: "number" as const,
      placeholder: "e.g., 30",
    },
    {
      name: "passingScore",
      label: "Passing Score",
      type: "number" as const,
      placeholder: "e.g., 70",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">
          Manage Quizzes
        </h1>
        <p className="text-inksoft font-body">
          Create and manage course quizzes
        </p>
      </div>

      <AdminTable
        columns={columns}
        data={quizzes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingQuiz ? "Edit Quiz" : "Add New Quiz"}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={isSaving}
      >
        <AdminForm
          fields={formFields}
          values={formData}
          onFieldChange={(name, value) =>
            setFormData({ ...formData, [name]: value })
          }
        />
      </AdminModal>

      <AdminModal
        isOpen={Boolean(deleteConfirm)}
        title="Confirm Delete"
        onClose={() => setDeleteConfirm(null)}
      >
        <div className="space-y-4">
          <p className="text-ink font-body">
            Are you sure you want to delete quiz{" "}
            <strong>{deleteConfirm?.title}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex gap-3 justify-end pt-4 border-t border-creamdeep">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 rounded-xl font-display font-600 text-inksoft hover:bg-creamdeep transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-xl font-display font-600 hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
