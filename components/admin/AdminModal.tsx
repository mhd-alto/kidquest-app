'use client';

import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export default function AdminModal({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  isLoading = false,
}: AdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-creamdeep flex items-center justify-between px-6 py-4 rounded-t-2xl">
          <h2 className="font-display text-xl font-700 text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-creamdeep rounded-lg transition-colors"
          >
            <X size={20} className="text-inksoft" />
          </button>
        </div>

        <div className="p-6">{children}</div>

        {onSubmit && (
          <div className="border-t border-creamdeep px-6 py-4 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-display font-600 text-inksoft hover:bg-creamdeep transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-coral text-white rounded-xl font-display font-600 hover:bg-coraldeep transition-colors disabled:opacity-50 shadow-card"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
