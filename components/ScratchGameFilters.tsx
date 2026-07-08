'use client';

import { ScratchGameFilters } from '@/types/scratch-game';
import { useState } from 'react';

interface GameFiltersProps {
  filters: ScratchGameFilters;
  onFilterChange: (filters: Partial<ScratchGameFilters>) => void;
  onClearFilters: () => void;
  totalGames: number;
  totalAllGames: number;
}

export function ScratchGameFilters({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  totalGames,
  totalAllGames 
}: GameFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'game', label: '🎮 Games' },
    { value: 'animation', label: '🎬 Animation' },
    { value: 'art', label: '🎨 Art' },
    { value: 'music', label: '🎵 Music' },
    { value: 'story', label: '📖 Story' },
    { value: 'tutorial', label: '📚 Tutorial' },
    { value: 'other', label: '📁 Other' },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 mb-6 border border-gray-200 dark:border-gray-700">
      <button
        className="lg:hidden w-full flex items-center justify-between text-gray-700 dark:text-gray-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold flex items-center gap-2">
          <span>🔍</span> Filters & Sorting
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {totalGames} results
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-0">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Search Projects
            </label>
            <input
              type="text"
              value={filters.searchQuery || ''}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search by title, author, or tags..."
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Category
            </label>
            <select
              value={filters.category || 'all'}
              onChange={(e) => onFilterChange({ category: e.target.value === 'all' ? undefined : e.target.value as any })}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Sort By
            </label>
            <div className="flex gap-2">
              <select
                value={filters.sortBy || 'createdDate'}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdDate">Date Created</option>
                <option value="views">Most Viewed</option>
                <option value="loves">Most Loved</option>
                <option value="title">Alphabetical</option>
              </select>
              <button
                onClick={() => onFilterChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {filters.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Featured Toggle & Clear */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Options
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.showFeatured || false}
                  onChange={(e) => onFilterChange({ showFeatured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ⭐ Featured only
                </span>
              </label>
              <button
                onClick={onClearFilters}
                className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        {/* Results counter */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{totalGames}</span> projects
            {totalGames !== totalAllGames && (
              <span className="text-gray-400 dark:text-gray-500">
                {' '}(out of {totalAllGames} total)
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}