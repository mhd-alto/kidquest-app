'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import AdminForm from '@/components/admin/AdminForm';
import { adminApi } from '@/lib/api/admin';

interface Video {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  orderNumber?: number;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<Partial<Video>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Video | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddNew = () => {
    setEditingVideo(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData(video);
    setIsModalOpen(true);
  };

  const handleDelete = (video: Video) => {
    setDeleteConfirm(video);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await adminApi.deleteVideo(deleteConfirm.id);
      setVideos(videos.filter((v) => v.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.courseId || !formData.title) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setIsSaving(true);
      if (editingVideo) {
        await adminApi.updateVideo(editingVideo.id, formData);
        setVideos(
          videos.map((v) => (v.id === editingVideo.id ? { ...v, ...formData } : v))
        );
      } else {
        const response = await adminApi.createVideo(formData);
        setVideos([...videos, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save video:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Video Title' },
    { key: 'courseId', label: 'Course ID' },
    { key: 'duration', label: 'Duration (min)' },
    { key: 'orderNumber', label: 'Order' },
  ];

  const formFields = [
    {
      name: 'courseId',
      label: 'Course ID',
      type: 'number' as const,
      required: true,
      placeholder: 'Enter course ID',
    },
    {
      name: 'title',
      label: 'Video Title',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter video title',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Video description',
    },
    {
      name: 'videoUrl',
      label: 'Video URL',
      type: 'text' as const,
      placeholder: 'https://example.com/video.mp4',
    },
    {
      name: 'duration',
      label: 'Duration (seconds)',
      type: 'number' as const,
      placeholder: 'e.g., 600',
    },
    {
      name: 'orderNumber',
      label: 'Order Number',
      type: 'number' as const,
      placeholder: 'e.g., 1',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-700 text-ink mb-2">Manage Videos</h1>
        <p className="text-inksoft font-body">Create and manage course videos</p>
      </div>

      <AdminTable
        columns={columns}
        data={videos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        isLoading={loading}
      />

      <AdminModal
        isOpen={isModalOpen}
        title={editingVideo ? 'Edit Video' : 'Add New Video'}
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
            Are you sure you want to delete video <strong>{deleteConfirm?.title}</strong>? This action cannot be undone.
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
