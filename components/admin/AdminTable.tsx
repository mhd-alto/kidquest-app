'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2, Plus } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onAddNew: () => void;
  isLoading?: boolean;
}

export default function AdminTable({
  columns,
  data,
  onEdit,
  onDelete,
  onAddNew,
  isLoading = false,
}: AdminTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (typeof aVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="h-8 w-8 rounded-full border-4 border-coral border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-xl font-display font-600 hover:bg-coraldeep transition-colors shadow-card"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-creamdeep bg-white/50 backdrop-blur-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-creamdeep bg-creamdeep/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left font-display font-600 text-inksoft cursor-pointer hover:bg-creamdeep/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key && (
                      sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left font-display font-600 text-inksoft">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-inksoft font-body"
                >
                  No data available
                </td>
              </tr>
            ) : (
              sortedData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-creamdeep hover:bg-creamdeep/20 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 font-body text-ink text-sm">
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key] || '-')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-berry hover:bg-berry/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
