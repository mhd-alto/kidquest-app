'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm from '@/components/admin/AdminForm';
import { adminApi } from '@/lib/api/admin';

interface Achievement {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  requirement?: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Achievement | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAchievements();
      setAchievements(response.data);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleAddNew = () => {
    setEditingAchievement(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setFormData(achievement);
    setIsModalOpen(true);
  };

  const handleDelete = (achievement: Achievement) => {
    setDeleteConfirm(achievement);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteAchievement(deleteConfirm.id);
      setAchievements(achievements.filter((a) => a.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete achievement:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setIsSaving(true);
      if (editingAchievement) {
        await adminApi.updateAchievement(editingAchievement.id, formData);
        setAchievements(
          achievements.map((a) => (a.id === editingAchievement.id ? { ...a, ...formData } : a))
        );
      } else {
        const response = await adminApi.createAchievement(formData);
        setAchievements([...achievements, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save achievement:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'icon',
      label: 'Icon',
      render: (value: any) => <span className="text-2xl">{value || '🏆'}</span>,
    },
    { key: 'name', label: 'Achievement Name' },
    { key: 'requirement', label: 'Requirement' },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Achievement Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., First Steps, Course Master',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Describe this achievement',
    },
    {
      name: 'icon',
      label: 'Icon/Emoji',
      type: 'text' as const,
      placeholder: 'e.g., 🏆, ⭐, 🎖️',
    },
    {
      name: 'requirement',
      label: 'Requirement',
      type: 'text' as const,
      placeholder: 'e.g., Complete 5 courses',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">Manage Achievements</h1>
        <p className="text-inksoft font-body">Create and manage achievement badges</p>
      </div>

      <AdminTable
        columns={columns}
        data={achievements}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
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
            Are you sure you want to delete achievement <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.
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
