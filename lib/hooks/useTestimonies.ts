import { useEffect, useState } from "react";
import { api } from "../api";
import { NewTestimonyPayload, TestimonyItem } from "../../types/api";

export function useTestimonies() {
  const [testimonies, setTestimonies] = useState<TestimonyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonies = () => {
    setLoading(true);
    api
      .getTestimonies()
      .then((res) => setTestimonies(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const submitTestimony = async (payload: NewTestimonyPayload) => {
    const res = await api.submitTestimony(payload);
    return res.data;
  };

  const likeTestimony = async (id: number) => {
    // Optimistic UI update
    setTestimonies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likesCount: item.likesCount + 1 } : item,
      ),
    );
    try {
      await api.likeTestimony(id);
    } catch (err) {
      // Rollback on failure
      setTestimonies((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, likesCount: item.likesCount - 1 } : item,
        ),
      );
    }
  };

  return {
    testimonies,
    loading,
    error,
    refresh: fetchTestimonies,
    submitTestimony,
    likeTestimony,
  };
}
