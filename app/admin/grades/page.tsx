'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm from '@/components/admin/AdminForm';
import { adminApi } from '@/lib/api/admin';

interface Grade {
  id: number;
  enrollmentId: number;
  score: number;
  letterGrade?: string;
  feedback?: string;
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [formData, setFormData] = useState<Partial<Grade>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Grade | null>(null);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getGrades();
      setGrades(response.data);
    } catch (error) {
      console.error('Failed to fetch grades:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleAddNew = () => {
    setEditingGrade(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setFormData(grade);
    setIsModalOpen(true);
  };

  const handleDelete = (grade: Grade) => {
    setDeleteConfirm(grade);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteGrade(deleteConfirm.id);
      setGrades(grades.filter((g) => g.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete grade:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.enrollmentId || formData.score === undefined) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setIsSaving(true);
      if (editingGrade) {
        await adminApi.updateGrade(editingGrade.id, formData);
        setGrades(
          grades.map((g) => (g.id === editingGrade.id ? { ...g, ...formData } : g))
        );
      } else {
        const response = await adminApi.createGrade(formData);
        setGrades([...grades, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save grade:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'enrollmentId', label: 'Enrollment ID' },
    {
      key: 'score',
      label: 'Score',
      render: (value: any) => `${value}%`,
    },
    { key: 'letterGrade', label: 'Letter Grade' },
  ];

  const formFields = [
    {
      name: 'enrollmentId',
      label: 'Enrollment ID',
      type: 'number' as const,
      required: true,
      placeholder: 'Enter enrollment ID',
    },
    {
      name: 'score',
      label: 'Score (%)',
      type: 'number' as const,
      required: true,
      placeholder: 'e.g., 92.5',
    },
    {
      name: 'letterGrade',
      label: 'Letter Grade',
      type: 'select' as const,
      options: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'F', label: 'F' },
      ],
    },
    {
      name: 'feedback',
      label: 'Feedback',
      type: 'textarea' as const,
      placeholder: 'Enter feedback for the student',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">Manage Grades</h1>
        <p className="text-inksoft font-body">Create and manage student grades</p>
      </div>

      <AdminTable
        columns={columns}
        data={grades}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingGrade ? 'Edit Grade' : 'Add New Grade'}
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
            Are you sure you want to delete this grade? This action cannot be undone.
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
