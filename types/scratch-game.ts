// types/scratch-game.ts
export interface ScratchGame {
  id: string;
  projectId: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  category: 'game' | 'animation' | 'art' | 'music' | 'story' | 'tutorial' | 'other';
  tags: string[];
  views: number;
  loves: number;
  favorites: number;
  createdDate: string;
  modifiedDate: string;
  instructions?: string;
  featured?: boolean;
}

export interface ScratchGameFilters {
  category?: string;
  searchQuery?: string;
  sortBy?: 'views' | 'loves' | 'createdDate' | 'title';
  sortOrder?: 'asc' | 'desc';
  showFeatured?: boolean;
}