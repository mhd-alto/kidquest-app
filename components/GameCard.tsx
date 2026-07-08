// components/GameCard.tsx
'use client';

import { Game } from '@/types/game';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [imageError, setImageError] = useState(false);

  const getPlatformEmoji = (platform: string) => {
    const emojis: Record<string, string> = {
      'PC': '💻',
      'PS5': '🎮',
      'PS4': '🎮',
      'Xbox Series X': '🎮',
      'Nintendo Switch': '🎮',
      'Mobile': '📱',
    };
    return emojis[platform] || '🎮';
  };

  return (
    <Link href={`/games/${game.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <span className="text-4xl">🎮</span>
            </div>
          ) : (
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          )}
          
          {/* Free badge */}
          {game.isFree && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              FREE
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {game.title}
            </h3>
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {game.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {game.description}
          </p>

          {/* Category Tag */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
              {game.category}
            </span>
            {game.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Platforms */}
          <div className="flex gap-1 mb-3">
            {game.platforms.slice(0, 4).map(platform => (
              <span key={platform} className="text-sm" title={platform}>
                {getPlatformEmoji(platform)}
              </span>
            ))}
            {game.platforms.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{game.platforms.length - 4}
              </span>
            )}
          </div>

          {/* Price and Release Date */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {game.isFree ? 'Free' : `$${game.price.toFixed(2)}`}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(game.releaseDate).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}