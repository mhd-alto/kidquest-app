'use client';

import { ScratchGame } from '@/types/scratch-game';
import { useEffect, useState } from 'react';
import { XMarkIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';

interface ScratchProjectViewerProps {
  game: ScratchGame;
  onClose: () => void;
}

export function ScratchProjectViewer({ game, onClose }: ScratchProjectViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const embedUrl = `https://scratch.mit.edu/projects/${game.projectId}/embed`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-[95%] max-w-6xl max-h-[95vh]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-t-2xl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-2xl">🎮</div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {game.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                by {game.author}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Close"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Description */}
        {game.description && (
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {game.description}
            </p>
            {game.instructions && (
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                💡 {game.instructions}
              </p>
            )}
          </div>
        )}

        {/* iFrame Container */}
        <div className={`relative ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[60vh] min-h-[450px]'}`}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading project...</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Getting the game ready</p>
            </div>
          )}
          
          <iframe
            src={embedUrl}
            allowTransparency={true}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={() => setIsLoading(false)}
            title={`Scratch Project: ${game.title}`}
          />
        </div>

        {/* Footer with Stats */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              👁️ {game.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              ❤️ {game.loves.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              ⭐ {game.favorites.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href={`https://scratch.mit.edu/projects/${game.projectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-1"
            >
              View on Scratch ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}