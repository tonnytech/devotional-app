// components/BookReviewForm.tsx
import { useSubmitBookReview } from "@/lib/hooks/useBooks";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function StarInput({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (n: number) => void;
}) {
  return (
    <View className='flex-row'>
      {[1, 2, 3, 4, 5].map((n) => (
        <TouchableOpacity key={n} onPress={() => onChange(n)} className='mr-1'>
          <Ionicons
            name={n <= rating ? "star" : "star-outline"}
            size={28}
            color='#C9922F'
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function BookReviewForm({
  bookId,
  onCancel,
  onSubmitted,
}: {
  bookId: number | string;
  onCancel: () => void;
  onSubmitted: () => void;
}) {
  const { submitReview, submitting } = useSubmitBookReview();

  const [reviewerName, setReviewerName] = useState("");
  const [reviewerLocation, setReviewerLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState<string | null>(null);


  async function handleSubmit() {
    setFormError(null);

    if (!reviewerName.trim() || !content.trim() || rating === 0) {
      setFormError("Please add your name, a rating, and a review.");
      return;
    }

    try {
      await submitReview(bookId, {
        reviewerName: reviewerName.trim(),
        reviewerLocation: reviewerLocation.trim() || undefined,
        rating,
        title: reviewTitle.trim() || undefined,
        content: content.trim(),
      });
      setReviewerName("");
      setReviewerLocation("");
      setRating(0);
      setReviewTitle("");
      setContent("");
      onSubmitted();
    } catch (err) {
      setFormError("Something went wrong submitting your review. Try again.");
    }
  }

  return (
    <View className='bg-card border border-border rounded-2xl p-4 mb-6'>
      <Text className='text-sm font-sans-bold text-foreground mb-3'>
        Your Review
      </Text>

      <Text className='text-xs font-sans text-foreground/60 mb-1'>Rating</Text>
      <StarInput rating={rating} onChange={setRating} />

      <TextInput
        placeholder='Your name'
        placeholderTextColor='#9CA3AF'
        value={reviewerName}
        onChangeText={setReviewerName}
        className='bg-background border border-border rounded-xl px-3 py-2.5 text-sm font-sans text-foreground mt-4'
      />

      <TextInput
        placeholder='Location (optional)'
        placeholderTextColor='#9CA3AF'
        value={reviewerLocation}
        onChangeText={setReviewerLocation}
        className='bg-background border border-border rounded-xl px-3 py-2.5 text-sm font-sans text-foreground mt-3'
      />

      <TextInput
        placeholder='Review title (optional)'
        placeholderTextColor='#9CA3AF'
        value={reviewTitle}
        onChangeText={setReviewTitle}
        className='bg-background border border-border rounded-xl px-3 py-2.5 text-sm font-sans text-foreground mt-3'
      />

      <TextInput
        placeholder='What did you think of this book?'
        placeholderTextColor='#9CA3AF'
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        textAlignVertical='top'
        className='bg-background border border-border rounded-xl px-3 py-2.5 text-sm font-sans text-foreground mt-3 h-24'
      />

      {formError && (
        <Text className='text-xs font-sans text-red-600 mt-2'>{formError}</Text>
      )}

      <View className='flex-row gap-3 mt-4'>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.8}
          className='flex-1 bg-primary rounded-xl py-2.5 items-center'>
          <Text className='text-white font-sans-bold text-sm'>
            {submitting ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel}
          activeOpacity={0.8}
          className='px-4 py-2.5 rounded-xl border border-border items-center justify-center'>
          <Text className='text-foreground/70 font-sans text-sm'>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
