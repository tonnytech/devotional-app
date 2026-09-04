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
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View className='flex-row gap-0.5'>
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons
          key={n}
          name={n <= rating ? "star" : "star-outline"}
          size={size}
          color={n <= rating ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </View>
  );
}

function WhereToBuy({
  purchaseUrl,
  howToBuy,
}: {
  purchaseUrl: string | null;
  howToBuy: string | null;
}) {
  const hasPurchaseUrl = !!purchaseUrl;
  const hasHowToBuy = !!howToBuy;

  if (!hasPurchaseUrl && !hasHowToBuy) return null;

  return (
    <View className='bg-card border border-border/80 rounded-2xl p-4 mb-6 shadow-sm'>
      <View className='flex-row items-center gap-2 mb-3'>
        <Ionicons
          name='bag-handle-outline'
          size={18}
          className='text-foreground'
        />
        <Text className='text-sm font-sans-bold text-foreground'>
          Where to Buy
        </Text>
      </View>

      {hasPurchaseUrl && (
        <TouchableOpacity
          onPress={() => Linking.openURL(purchaseUrl!)}
          activeOpacity={0.85}
          className='bg-primary rounded-xl py-3 px-4 items-center flex-row justify-center gap-2 shadow-sm'>
          <Ionicons name='cart-outline' size={18} color='white' />
          <Text className='text-white font-sans-bold text-sm'>Buy Now</Text>
        </TouchableOpacity>
      )}

      {hasHowToBuy && (
        <View
          className={
            hasPurchaseUrl ? "mt-3 pt-3 border-t border-border/60" : ""
          }>
          {hasPurchaseUrl && (
            <Text className='text-[10px] font-sans-bold text-foreground/40 mb-1 uppercase tracking-wider'>
              Alternative Options
            </Text>
          )}
          <Text className='text-xs font-sans text-foreground/70 leading-relaxed'>
            {howToBuy}
          </Text>
        </View>
      )}
    </View>
  );
}

const BookDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { book, loading, error, refresh } = useBook(id);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

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
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-6'>
        <Ionicons name='alert-circle-outline' size={48} color='#9CA3AF' />
        <Text className='text-foreground/80 font-sans-bold text-base mt-3 text-center'>
          Unable to Load Book
        </Text>
        <Text className='text-foreground/60 font-sans text-xs mt-1 text-center mb-6'>
          Check your connection and try again.
        </Text>
        <TouchableOpacity
          onPress={refresh}
          className='bg-card border border-border px-5 py-2.5 rounded-xl'>
          <Text className='text-xs font-sans-bold text-foreground'>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const approvedReviews = book.reviews ?? [];

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='px-5 pt-2 border-b border-border/40 pb-2'>
        <PageHeader title='Book Details' />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className='flex-1'>
        <ScrollView
          className='flex-1 px-5'
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}>
          {/* Header Hero Section */}
          <View className='items-center mb-6'>
            <View className='shadow-lg shadow-black/20 elevation-5 mb-4'>
              {book.coverImageUrl ? (
                <Image
                  source={{ uri: book.coverImageUrl }}
                  className='w-40 h-56 rounded-xl'
                  resizeMode='cover'
                />
              ) : (
                <View className='w-40 h-56 rounded-xl bg-card border border-border items-center justify-center'>
                  <Ionicons name='book-outline' size={40} color='#9CA3AF' />
                </View>
              )}
            </View>

            <Text className='text-xl font-sans-bold text-foreground text-center leading-tight'>
              {book.title}
            </Text>
            <Text className='text-sm font-sans text-foreground/60 mt-1'>
              {book.author}
            </Text>

            {/* Quick Stats Bar */}
            <View className='flex-row items-center justify-center gap-4 mt-4 py-2 px-4 bg-card/60 border border-border/50 rounded-2xl'>
              {book.avgRating ? (
                <View className='flex-row items-center gap-1.5'>
                  <StarRow rating={Math.round(book.avgRating)} size={12} />
                  <Text className='text-xs font-sans-bold text-foreground'>
                    {book.avgRating.toFixed(1)}
                  </Text>
                </View>
              ) : (
                <Text className='text-xs font-sans text-foreground/50'>
                  Unrated
                </Text>
              )}

              <View className='w-px h-3 bg-border' />

              <Text className='text-xs font-sans text-foreground/60'>
                {book.reviewCount ?? approvedReviews.length}{" "}
                {approvedReviews.length === 1 ? "review" : "reviews"}
              </Text>

              {book.category && (
                <>
                  <View className='w-px h-3 bg-border' />
                  <Text className='text-xs font-sans-bold text-primary'>
                    {book.category}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Description Section */}
          {book.description && (
            <View className='mb-6 bg-card/30 p-4 rounded-2xl border border-border/40'>
              <Text className='text-xs font-sans-bold text-foreground/50 uppercase tracking-wider mb-2'>
                Overview
              </Text>
              <Text className='text-sm font-sans text-foreground/80 leading-relaxed'>
                {book.description}
              </Text>
            </View>
          )}

          {/* Where to Buy Component */}
          <WhereToBuy purchaseUrl={book.purchaseUrl} howToBuy={book.howToBuy} />

          {/* Review Submission Status */}
          {submitted && (
            <View className='bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mb-6 flex-row items-center gap-3'>
              <Ionicons name='checkmark-circle' size={20} color='#10B981' />
              <View className='flex-1'>
                <Text className='text-sm font-sans-bold text-emerald-600'>
                  Thanks for your review!
                </Text>
                <Text className='text-xs font-sans text-emerald-600/80 mt-0.5'>
                  It will appear here soon
                </Text>
              </View>
            </View>
          )}

          {/* Write Review CTA / Form */}
          {!showForm ? (
            <TouchableOpacity
              onPress={() => setShowForm(true)}
              activeOpacity={0.8}
              className='border border-primary/30 bg-primary/5 rounded-2xl py-3.5 items-center flex-row justify-center gap-2 mb-8'>
              <Ionicons
                name='create-outline'
                size={18}
                className='text-primary'
              />
              <Text className='text-primary font-sans-bold text-sm'>
                Write a Review
              </Text>
            </TouchableOpacity>
          ) : (
            <View className='mb-8 bg-card border border-border rounded-2xl p-4'>
              <BookReviewForm
                bookId={id}
                onCancel={() => setShowForm(false)}
                onSubmitted={handleSubmitted}
              />
            </View>
          )}

          {/* Reviews List Header */}
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-base font-sans-bold text-foreground'>
              Customer Reviews
            </Text>
            <Text className='text-xs font-sans text-foreground/50'>
              ({approvedReviews.length})
            </Text>
          </View>

          {/* Reviews Cards */}
          {approvedReviews.length === 0 ? (
            <View className='bg-card/40 border border-border/50 rounded-2xl p-6 items-center'>
              <Ionicons name='chatbubbles-outline' size={28} color='#9CA3AF' />
              <Text className='text-xs font-sans text-foreground/60 mt-2 text-center'>
                No reviews yet. Be the first to share your thoughts!
              </Text>
            </View>
          ) : (
            approvedReviews.map((review) => (
              <View
                key={review.id}
                className='bg-card border border-border/70 rounded-2xl p-4 mb-3 shadow-sm'>
                <View className='flex-row items-center justify-between mb-2'>
                  <View className='flex-row items-center gap-2'>
                    <View className='w-7 h-7 rounded-full bg-primary/10 items-center justify-center'>
                      <Text className='text-xs font-sans-bold text-primary'>
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text className='text-xs font-sans-bold text-foreground'>
                        {review.reviewerName}
                      </Text>
                      {review.reviewerLocation && (
                        <Text className='text-[10px] font-sans text-foreground/50'>
                          {review.reviewerLocation}
                        </Text>
                      )}
                    </View>
                  </View>
                  <StarRow rating={review.rating} size={12} />
                </View>

                {review.title && (
                  <Text className='text-sm font-sans-bold text-foreground mt-1 mb-1'>
                    {review.title}
                  </Text>
                )}
                <Text className='text-xs font-sans text-foreground/70 leading-relaxed'>
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
