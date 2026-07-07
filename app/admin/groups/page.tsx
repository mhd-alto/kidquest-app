'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm from '@/components/admin/AdminForm';
import { adminApi } from '@/lib/api/admin';

interface Group {
  id: number;
  name: string;
  description?: string;
  permissions?: Record<string, boolean>;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [formData, setFormData] = useState<Partial<Group>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Group | null>(null);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getGroups();
      setGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleAddNew = () => {
    setEditingGroup(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setFormData(group);
    setIsModalOpen(true);
  };

  const handleDelete = (group: Group) => {
    setDeleteConfirm(group);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteGroup(deleteConfirm.id);
      setGroups(groups.filter((g) => g.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setIsSaving(true);
      if (editingGroup) {
        await adminApi.updateGroup(editingGroup.id, formData);
        setGroups(
          groups.map((g) => (g.id === editingGroup.id ? { ...g, ...formData } : g))
        );
      } else {
        const response = await adminApi.createGroup(formData);
        setGroups([...groups, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save group:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Group Name' },
    { key: 'description', label: 'Description' },
  ];

  const formFields = [
    {
      name: 'name',
      label: 'Group Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Instructors, Students',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Describe the purpose of this group',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">Manage Groups</h1>
        <p className="text-inksoft font-body">Create and manage user groups with permissions</p>
      </div>

      <AdminTable
        columns={columns}
        data={groups}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingGroup ? 'Edit Group' : 'Add New Group'}
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
            Are you sure you want to delete group <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.
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
