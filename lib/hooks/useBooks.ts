// lib/hooks/useBooks.ts
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { BookItem, NewBookReviewPayload } from "../../types/api";

export function useBooks(category?: string) {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getBooks(category);
      setBooks(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, error, refresh: fetchBooks };
}

export function useBook(id: number | string) {
  const [book, setBook] = useState<BookItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBook = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api.getBookById(id);
      setBook(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return { book, loading, error, refresh: fetchBook };
}

export function useSubmitBookReview() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = useCallback(
    async (bookId: number | string, data: NewBookReviewPayload) => {
      setSubmitting(true);
      setError(null);
      try {
        const res = await api.submitBookReview(bookId, data);
        return res.data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );

  return { submitReview, submitting, error };
}
