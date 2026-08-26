// types/api.ts

// --- Generic API Envelopes ---
export interface ApiListResponse<T> {
  data: T[];
  total?: number;
  page?: number;
}

export interface ApiItemResponse<T> {
  data: T;
  message?: string;
}

// --- Entity Types ---

export interface DailyReadingRef {
  id: number;
  reference: string;
  isCompleted: boolean;
}

export interface DevotionalReading {
  id: number;
  day: number;
  title: string;
  reflection: string;
  prayer: string | null;
  references?: DailyReadingRef[];
}

export interface Devotional {
  id: number;
  title: string;
  month: string;
  year: number;
  description: string | null;
  imageUrl: string | null;
  isPaid: boolean;
  isPublished: boolean;
  readings?: DevotionalReading[];
}

export interface BlogItem {
  id: number;
  title: string;
  snippet: string | null;
  author: string;
  authorRole: string | null;
  category: string | null;
  imageUrl: string | null;
  takeaways: string[];
  content: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  announcementDate: string;
  isImportant: boolean;
  link: string | null;
  createdAt: string;
}

export interface TestimonyItem {
  id: number;
  title: string;
  testifier_name: string;
  testifier_location: string | null;
  content: string;
  keyVerse: string | null;
  likesCount: number;
  isApproved: boolean;
  testimonyDate: string;
  createdAt: string;
}

export interface NewTestimonyPayload {
  title: string;
  testifier_name: string;
  testifier_location?: string;
  content: string;
  keyVerse?: string;
}

export interface ThemeVerseItem {
  id: number;
  verse: string;
  content: string;
  version: string;
  isActive: boolean;
  createdAt: string;
}

export interface EventItem {
  id: number;
  name: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description?: string | null;
}
