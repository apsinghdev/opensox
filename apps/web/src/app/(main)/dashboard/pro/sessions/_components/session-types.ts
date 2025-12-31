export interface SessionTopic {
  id: string;
  timestamp: string;
  topic: string;
  order: number;
}

export interface WeeklySession {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  sessionDate: Date;
  topics: SessionTopic[];
}


