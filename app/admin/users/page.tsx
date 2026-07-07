'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm from '@/components/admin/AdminForm';
import { adminApi } from '@/lib/api/admin';

interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    // Only send editable fields to the backend (avoid _id/createdAt/updatedAt/__v)
    setFormData({ username: user.username, email: user.email });
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setDeleteConfirm(user);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteUser(deleteConfirm._id);
      console.log(deleteConfirm._id);
      setUsers(users.filter((u) => u._id !== deleteConfirm._id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setIsSaving(true);
      if (editingUser) {
        const payload = {
          username: formData.username,
          email: formData.email,
        };

        await adminApi.updateUser(editingUser._id, payload);
        setUsers(users.map((u) => (u._id === editingUser._id ? { ...u, ...payload } : u)));
      } else {
        const response = await adminApi.createUser(formData);
        setUsers([...users, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: '_id', label: 'ID' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
  ];

  const formFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter username',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      required: true,
      placeholder: 'Enter email',
    },
    ...(editingUser
      ? []
      : [
          {
            name: 'password',
            label: 'Password',
            type: 'password' as const,
            required: !editingUser,
            placeholder: 'Enter password',
          },
        ]),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">Manage Users</h1>
        <p className="text-inksoft font-body">Create, edit, and delete user accounts</p>
      </div>

      <AdminTable
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingUser ? 'Edit User' : 'Add New User'}
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
            Are you sure you want to delete user <strong>{deleteConfirm?.username}</strong>? This action cannot be undone.
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
