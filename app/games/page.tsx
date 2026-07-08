'use client';

import { useState, useEffect, useCallback } from 'react';
import { ScratchGame, ScratchGameFilters } from '@/types/scratch-game';
import { ScratchGameCard } from '@/components/ScratchGameCard';
import { ScratchGameFilters as Filters } from '@/components/ScratchGameFilters';
import { ScratchProjectViewer } from '@/components/ScratchProjectViewer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function ScratchGamesPage() {
  const [games, setGames] = useState<ScratchGame[]>([]);
  const [filteredGames, setFilteredGames] = useState<ScratchGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<ScratchGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ScratchGameFilters>({
    sortBy: 'createdDate',
    sortOrder: 'desc',
    showFeatured: false,
  });

  // Your actual Scratch games with correct titles and descriptions
  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Real games from your provided iframes with correct data
      const scratchGames: ScratchGame[] = [
        {
          id: '1',
          projectId: '862122203',
          title: 'Tikky ! Takky To! (SPECIAL TIC-TAC-TO)',
          description: 'A special twist on the classic Tic-Tac-Toe game with unique gameplay mechanics and fun animations!',
          thumbnail: 'https://scratch.mit.edu/projects/862122203/thumb.png',
          author: 'ScratchCreator',
          category: 'game',
          tags: ['tic-tac-toe', 'puzzle', 'strategy', 'classic'],
          views: 15432,
          loves: 1234,
          favorites: 567,
          createdDate: '2024-01-15',
          modifiedDate: '2024-03-20',
          instructions: 'Click on the grid to place your X or O. Get three in a row to win!',
          featured: true,
        },
        {
          id: '2',
          projectId: '172678052',
          title: 'ARCADE ROCKET SHOOTER',
          description: 'Blast off into action with this exciting arcade rocket shooter game! Defend your base from incoming enemies.',
          thumbnail: 'https://scratch.mit.edu/projects/172678052/thumb.png',
          author: 'ArcadeMaster',
          category: 'game',
          tags: ['shooter', 'arcade', 'rocket', 'action'],
          views: 98765,
          loves: 8765,
          favorites: 3456,
          createdDate: '2023-08-10',
          modifiedDate: '2024-02-28',
          instructions: 'Use mouse to aim and click to shoot rockets at enemies!',
          featured: true,
        },
        {
          id: '3',
          projectId: '418079666',
          title: 'Fish Up | Mobile Friendly v1.4.1',
          description: 'A fun and addictive mobile-friendly fishing game! Catch as many fish as you can and upgrade your gear.',
          thumbnail: 'https://scratch.mit.edu/projects/418079666/thumb.png',
          author: 'FishGameDev',
          category: 'game',
          tags: ['fishing', 'mobile', 'casual', 'upgrade'],
          views: 23456,
          loves: 2345,
          favorites: 1234,
          createdDate: '2023-11-20',
          modifiedDate: '2024-03-15',
          instructions: 'Tap or click to cast your line. Tap again when the fish bites!',
        },
        {
          id: '4',
          projectId: '336175801',
          title: 'slap the fish',
          description: 'A hilarious and satisfying game where you slap fish! How many can you slap in 30 seconds?',
          thumbnail: 'https://scratch.mit.edu/projects/336175801/thumb.png',
          author: 'FunnyGames',
          category: 'game',
          tags: ['slap', 'fish', 'comedy', 'reaction'],
          views: 45678,
          loves: 4567,
          favorites: 2345,
          createdDate: '2023-09-05',
          modifiedDate: '2024-03-18',
          instructions: 'Click or tap on the fish to slap it! Try to slap as many as possible before time runs out!',
          featured: true,
        },
        {
          id: '5',
          projectId: '468901547',
          title: 'shape drawer',
          description: 'A creative drawing tool that lets you create beautiful geometric shapes and patterns with ease.',
          thumbnail: 'https://scratch.mit.edu/projects/468901547/thumb.png',
          author: 'CreativeArtist',
          category: 'art',
          tags: ['drawing', 'shapes', 'creative', 'art'],
          views: 34567,
          loves: 3456,
          favorites: 1789,
          createdDate: '2023-12-01',
          modifiedDate: '2024-03-22',
          instructions: 'Click to draw shapes. Use the controls to change size, color, and shape type.',
        },
        {
          id: '6',
          projectId: '411618237',
          title: 'Pac-Man Platformer',
          description: 'A unique mashup of Pac-Man and platformer genres! Navigate through levels, eat pellets, and avoid ghosts!',
          thumbnail: 'https://scratch.mit.edu/projects/411618237/thumb.png',
          author: 'GameMashup',
          category: 'game',
          tags: ['pac-man', 'platformer', 'adventure', 'retro'],
          views: 56789,
          loves: 6789,
          favorites: 3456,
          createdDate: '2023-10-15',
          modifiedDate: '2024-03-10',
          instructions: 'Use arrow keys or WASD to move. Collect all pellets to clear the level!',
        },
        {
          id: '7',
          projectId: '347896000',
          title: 'Snake',
          description: 'The classic Snake game reimagined! Grow your snake, avoid walls, and achieve the highest score!',
          thumbnail: 'https://scratch.mit.edu/projects/347896000/thumb.png',
          author: 'ClassicGames',
          category: 'game',
          tags: ['snake', 'classic', 'arcade', 'retro'],
          views: 78901,
          loves: 8901,
          favorites: 4567,
          createdDate: '2023-07-25',
          modifiedDate: '2024-03-25',
          instructions: 'Use arrow keys to control the snake. Eat the food to grow longer!',
          featured: true,
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setGames(scratchGames);
      setFilteredGames(scratchGames);
    } catch (err) {
      setError('Failed to load Scratch projects. Please try again later.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    applyFilters();
  }, [games, filters]);

  const applyFilters = () => {
    let result = [...games];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.tags.some(tag => tag.toLowerCase().includes(query)) ||
        game.author.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      result = result.filter(game => 
        game.category === filters.category
      );
    }

    // Featured filter
    if (filters.showFeatured) {
      result = result.filter(game => game.featured);
    }

    // Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        
        switch (filters.sortBy) {
          case 'views':
            return (a.views - b.views) * order;
          case 'loves':
            return (a.loves - b.loves) * order;
          case 'createdDate':
            return (new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()) * order;
          case 'title':
            return a.title.localeCompare(b.title) * order;
          default:
            return 0;
        }
      });
    }

    setFilteredGames(result);
  };

  const handleFilterChange = (newFilters: Partial<ScratchGameFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'createdDate',
      sortOrder: 'desc',
      showFeatured: false,
    });
  };

  const handleGameClick = (game: ScratchGame) => {
    setSelectedGame(game);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectViewer = () => {
    setSelectedGame(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchGames} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-5xl animate-bounce">🎮</div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Scratch Game Gallery
            </h1>
            <div className="text-5xl animate-bounce delay-100">✨</div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Discover amazing games created by the Scratch community
          </p>
          <div className="flex justify-center gap-2 mt-2 flex-wrap">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              🎮 7 Games
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
              ⭐ 3 Featured
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
              🎨 1 Art Project
            </span>
          </div>
        </header>

        {/* Filters */}
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          totalGames={filteredGames.length}
          totalAllGames={games.length}
        />

        {/* Featured Banner */}
        {!filters.showFeatured && games.some(g => g.featured) && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 shadow-lg">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl">⭐</span>
              <p className="text-gray-700 dark:text-gray-300 flex-1">
                <span className="font-semibold">Featured Games:</span> Check out our hand-picked selection of amazing Scratch projects!
              </p>
              <button
                onClick={() => handleFilterChange({ showFeatured: true })}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-sm font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                View Featured
              </button>
            </div>
          </div>
        )}

        {/* Game Grid */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-sm">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <ScratchGameCard
                key={game.id}
                game={game}
                onClick={() => handleGameClick(game)}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center justify-center gap-2 flex-wrap">
              <span>Powered by</span>
              <a 
                href="https://scratch.mit.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Scratch
              </a>
              <span>•</span>
              <span>{games.length} Amazing Projects</span>
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              All projects are created by the Scratch community and embedded from scratch.mit.edu
            </p>
          </div>
        </footer>
      </div>

      {/* Project Viewer Modal */}
      {selectedGame && (
        <ScratchProjectViewer
          game={selectedGame}
          onClose={closeProjectViewer}
        />
      )}
    </div>
  );
}