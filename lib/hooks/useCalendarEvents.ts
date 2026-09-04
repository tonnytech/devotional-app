// lib/hooks/useCalendarEvents.ts
import { useCallback, useEffect, useState } from "react";
import { CalendarEventItem } from "../../types/api";
import { api } from "../api";

export function useCalendarEvents(category?: string, featured?: boolean) {
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getCalendarEvents({ category, featured });
      setEvents(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, featured]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refresh: fetchEvents };
}
