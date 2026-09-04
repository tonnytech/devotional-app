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
  scriptureRef: string;
  scriptureText: string;
  bibleReadings?: DailyReadingRef[];
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

export interface BookReviewItem {
  id: number;
  reviewerName: string;
  reviewerLocation: string | null;
  rating: number;
  title: string | null;
  content: string;
  likesCount: number;
  createdAt: string;
}

export interface BookItem {
  id: number;
  title: string;
  author: string;
  description: string | null;
  coverImageUrl: string | null;
  category: string | null;
  isbn: string | null;
  purchaseUrl: string | null;
  howToBuy: string | null;
  createdAt: string;
  reviewCount?: number;
  avgRating?: number;
  reviews?: BookReviewItem[];
}

export interface NewBookReviewPayload {
  reviewerName: string;
  reviewerLocation?: string;
  rating: number;
  title?: string;
  content: string;
}

export interface BlogItem {
  id: number;
  title: string;
  snippet: string | null;
  author: string;
  authorRole: string | null;
  category: string | null;
  readTime?: string | null;
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
  location: string | null;
  link: string | null;
  createdAt: string;
  time: string | null;
  category: string | null;
  description: string | null;
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
  readTime?: string | null;
  category: string | null;
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
  eventDate: string;
  eventTime: string;
  location: string;
  description?: string | null;
  title: string;
  slug: string;
  imageUrl: string | null;
  registrationUrl: string | null;
  isFeatured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CalendarEventItem {
  id: number;
  title: string;
  slug: string | null;
  description: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  eventTime: string | null;
  category: string | null;
  color: string | null;
  imageUrl: string | null;
  registrationUrl: string | null;
  isFeatured: boolean;
  isRecurring: boolean;
  recurrenceRule: string | null;
  recurrenceEndDate: string | null;
  createdAt: string;
  updatedAt: string;
}
