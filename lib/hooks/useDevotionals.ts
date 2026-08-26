import { useEffect, useState } from "react";
import { api } from "../api";
import { Devotional } from "../../types/api";

export function useDevotionals() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getDevotionals()
      .then((res) => setDevotionals(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { devotionals, loading, error };
}

export function useDevotional(id: number | string) {
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .getDevotionalById(id)
      .then((res) => setDevotional(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleReference = async (referenceId: number) => {
    try {
      const res = await api.toggleReadingRef(referenceId);
      // Optimistically update reading status locally if needed
      return res.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return { devotional, loading, error, toggleReference };
}
