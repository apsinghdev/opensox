export type SavedRepo = {
  id: string;
  name: string;
  url: string;
  language?: string;
  popularity?: 'low' | 'medium' | 'high';
  competitionScore?: number;
  savedAt: string; // ISO timestamp
  meta?: Record<string, unknown>; // Extensible metadata
};

export type SavedReposAction = 'add' | 'remove' | 'replace';

export type SavedReposUpdateInput = {
  action: SavedReposAction;
  repos: SavedRepo[];
};
