'use client';

import { ScratchGame } from '@/types/scratch-game';
import Image from 'next/image';
import { useState } from 'react';

interface ScratchGameCardProps {
  game: ScratchGame;
  onClick: () => void;
}

export function ScratchGameCard({ game, onClick }: ScratchGameCardProps) {
  const [imageError, setImageError] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      game: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      animation: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      art: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
      music: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      story: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      tutorial: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      other: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    };
    return colors[category] || colors.other;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-52 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
            <span className="text-6xl mb-2">🎮</span>
            <span className="text-sm font-medium text-center line-clamp-2">{game.title}</span>
          </div>
        ) : (
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}

        {/* Featured Badge */}
        {game.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            <span>⭐</span> Featured
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/95 dark:bg-gray-800/95 rounded-full p-5 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 flex-1">
            {game.title}
          </h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(game.category)}`}>
            {game.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {game.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
            {game.author.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            by {game.author}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              👁️ {formatNumber(game.views)}
            </span>
            <span className="flex items-center gap-1">
              ❤️ {formatNumber(game.loves)}
            </span>
            <span className="flex items-center gap-1">
              ⭐ {formatNumber(game.favorites)}
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(game.createdDate).toLocaleDateString()}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {game.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
              #{tag}
            </span>
          ))}
          {game.tags.length > 3 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              +{game.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}