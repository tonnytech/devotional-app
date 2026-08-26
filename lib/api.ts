// lib/api.ts
import {
  ApiItemResponse,
  ApiListResponse,
  AnnouncementItem,
  BlogItem,
  Devotional,
  EventItem,
  NewTestimonyPayload,
  TestimonyItem,
  ThemeVerseItem,
} from "../types/api";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://devotionals-api.tonnytei.dpdns.org/api/v1";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Devotionals
  getDevotionals: () => fetcher<ApiListResponse<Devotional>>("/devotionals"),
  getDevotionalById: (id: number | string) =>
    fetcher<ApiItemResponse<Devotional>>(`/devotionals/${id}`),
  toggleReadingRef: (referenceId: number | string) =>
    fetcher<ApiItemResponse<{ isCompleted: boolean }>>(
      `/devotionals/readings/${referenceId}/toggle`,
      { method: "POST" },
    ),

  // Blogs
  getBlogs: (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return fetcher<ApiListResponse<BlogItem>>(`/blogs${query}`);
  },
  getBlogById: (id: number | string) =>
    fetcher<ApiItemResponse<BlogItem>>(`/blogs/${id}`),

  // Announcements
  getAnnouncements: () =>
    fetcher<ApiListResponse<AnnouncementItem>>("/announcements"),

  // Testimonies
  getTestimonies: () => fetcher<ApiListResponse<TestimonyItem>>("/testimonies"),
  submitTestimony: (data: NewTestimonyPayload) =>
    fetcher<ApiItemResponse<TestimonyItem>>("/testimonies", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  likeTestimony: (id: number | string) =>
    fetcher<ApiItemResponse<{ likesCount: number }>>(
      `/testimonies/${id}/like`,
      {
        method: "POST",
      },
    ),

  // Home Screen Feeds
  getThemeVerse: () => fetcher<ApiItemResponse<ThemeVerseItem>>("/themeverse"),
  getEvents: () => fetcher<ApiListResponse<EventItem>>("/events"),
};
