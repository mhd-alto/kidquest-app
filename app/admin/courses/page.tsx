'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm from '@/components/admin/AdminForm';
import { adminApi } from '@/lib/api/admin';

interface Course {
  id: number;
  title: string;
  description?: string;
  instructor?: string;
  createdBy?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddNew = () => {
    setEditingCourse(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = (course: Course) => {
    setDeleteConfirm(course);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteCourse(deleteConfirm._id);
      setCourses(courses.filter((c) => c._id !== deleteConfirm._id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setIsSaving(true);
      if (editingCourse) {
        const payload = {
            title: formData.title,
            description: formData.description,
            instructor: formData.instructor,
        }
        await adminApi.updateCourse(editingCourse._id, payload);
        setCourses(
          courses.map((c) => (c._id === editingCourse._id ? { ...c, ...formData } : c))
        );
      } else {
        const response = await adminApi.createCourse(formData);
        setCourses([...courses, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save course:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Course Title' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'description', label: 'Description' },
  ];

  const formFields = [
    {
      name: 'title',
      label: 'Course Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter course title',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Course description',
    },
    {
      name: 'instructor',
      label: 'Instructor',
      type: 'text' as const,
      placeholder: 'Instructor name',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">Manage Courses</h1>
        <p className="text-inksoft font-body">Create and manage courses</p>
      </div>

      <AdminTable
        columns={columns}
        data={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
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
            Are you sure you want to delete course <strong>{deleteConfirm?.title}</strong>? This action cannot be undone.
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
