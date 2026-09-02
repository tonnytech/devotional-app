// app/book/[id].tsx
import BookReviewForm from "@/components/BookReviewForm";
import PageHeader from "@/components/PageHeader";
import { useBook } from "@/lib/hooks/useBooks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View className='flex-row'>
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons
          key={n}
          name={n <= rating ? "star" : "star-outline"}
          size={size}
          color='#C9922F'
        />
      ))}
    </View>
  );
}

const BookDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { book, loading, error, refresh } = useBook(id);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmitted() {
    setSubmitted(true);
    setShowForm(false);
    refresh();
  }

  if (loading && !book) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center'>
        <ActivityIndicator size='large' className='text-primary' />
      </SafeAreaView>
    );
  }

  if (error || !book) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-5'>
        <Ionicons name='alert-circle-outline' size={40} color='gray' />
        <Text className='text-foreground/60 font-sans text-sm mt-2 text-center'>
          Couldn&apos;t load this book. Pull to refresh or try again later.
        </Text>
      </SafeAreaView>
    );
  }

  const approvedReviews = book.reviews ?? [];

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='px-5 pt-2'>
        <PageHeader title='Book' />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className='flex-1'>
        <ScrollView
          className='flex-1 px-5'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Cover + Info */}
          <View className='items-center mb-6 mt-2'>
            {book.coverImageUrl ? (
              <Image
                source={{ uri: book.coverImageUrl }}
                className='w-36 h-52 rounded-xl mb-4'
                resizeMode='cover'
              />
            ) : (
              <View className='w-36 h-52 rounded-xl mb-4 bg-card border border-border items-center justify-center'>
                <Ionicons name='book-outline' size={32} color='gray' />
              </View>
            )}

            <Text className='text-lg font-sans-bold text-foreground text-center'>
              {book.title}
            </Text>
            <Text className='text-sm font-sans text-foreground/60 mt-1'>
              By {book.author}
            </Text>

            {book.category && (
              <View className='bg-card border border-border px-2.5 py-1 rounded-full mt-2'>
                <Text className='text-xs font-sans text-foreground/70'>
                  {book.category}
                </Text>
              </View>
            )}

            {book.avgRating ? (
              <View className='flex-row items-center mt-3'>
                <StarRow rating={Math.round(book.avgRating)} />
                <Text className='text-xs font-sans text-foreground/50 ml-2'>
                  {book.avgRating.toFixed(1)} ·{" "}
                  {book.reviewCount ?? approvedReviews.length} review
                  {(book.reviewCount ?? approvedReviews.length) === 1
                    ? ""
                    : "s"}
                </Text>
              </View>
            ) : (
              <Text className='text-xs font-sans text-foreground/40 mt-3'>
                No reviews yet
              </Text>
            )}
          </View>

          {/* Description */}
          {book.description && (
            <View className='mb-6'>
              <Text className='text-sm font-sans text-foreground/80 leading-5'>
                {book.description}
              </Text>
            </View>
          )}

          {/* Write a review CTA */}
          {submitted && (
            <View className='bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5'>
              <Text className='text-sm font-sans-bold text-emerald-800'>
                Thanks for your review!
              </Text>
              <Text className='text-xs font-sans text-emerald-700 mt-1'>
                It&apos;ll appear here soon.
              </Text>
            </View>
          )}

          {!showForm ? (
            <TouchableOpacity
              onPress={() => setShowForm(true)}
              activeOpacity={0.8}
              className='bg-primary rounded-2xl py-3 items-center mb-6'>
              <Text className='text-white font-sans-bold text-sm'>
                Write a Review
              </Text>
            </TouchableOpacity>
          ) : (
            <BookReviewForm
              bookId={id}
              onCancel={() => setShowForm(false)}
              onSubmitted={handleSubmitted}
            />
          )}

          {/* Reviews list */}
          <Text className='text-sm font-sans-bold text-foreground mb-3'>
            Reviews ({approvedReviews.length})
          </Text>

          {approvedReviews.length === 0 ? (
            <Text className='text-xs font-sans text-foreground/50 mb-4'>
              Be the first to review this book.
            </Text>
          ) : (
            approvedReviews.map((review) => (
              <View
                key={review.id}
                className='bg-card border border-border rounded-2xl p-4 mb-3'>
                <View className='flex-row justify-between items-start mb-1'>
                  <Text className='text-sm font-sans-bold text-foreground'>
                    {review.reviewerName}
                    {review.reviewerLocation
                      ? ` · ${review.reviewerLocation}`
                      : ""}
                  </Text>
                </View>
                <StarRow rating={review.rating} />
                {review.title && (
                  <Text className='text-sm font-sans-bold text-foreground mt-2'>
                    {review.title}
                  </Text>
                )}
                <Text className='text-xs font-sans text-foreground/70 leading-4 mt-1'>
                  {review.content}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BookDetailScreen;
