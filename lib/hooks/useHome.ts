// lib/hooks/useHome.ts
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { AnnouncementItem, EventItem, ThemeVerseItem } from "../../types/api";

export function useHomeData() {
  const [themeVerse, setThemeVerse] = useState<ThemeVerseItem | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const [verseRes, eventsRes, announcementsRes] = await Promise.all([
        api.getThemeVerse().catch(() => null),
        api.getEvents().catch(() => ({ data: [] })),
        api.getAnnouncements().catch(() => ({ data: [] })),
      ]);

      if (verseRes) setThemeVerse(verseRes.data);
      if (eventsRes) setEvents(eventsRes.data);
      if (announcementsRes) setAnnouncements(announcementsRes.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return {
    themeVerse,
    events,
    announcements,
    loading,
    refresh: fetchHomeData,
  };
}
