import PageHeader from "@/components/PageHeader";
import { useBooks } from "@/lib/hooks/useBooks";
import { useTestimonies } from "@/lib/hooks/useTestimonies";
import { BookItem, TestimonyItem } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type ActiveTab = "books" | "testimonies";

const ArticlesScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("books");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch dynamic API data
  const { books, loading: loadingBooks, refresh: refreshBooks } = useBooks();
  const {
    testimonies,
    loading: loadingTestimonies,
    refresh: refreshTestimonies,
  } = useTestimonies();

  console.log(books);

  const isLoading = activeTab === "books" ? loadingBooks : loadingTestimonies;
  const currentRefresh =
    activeTab === "books" ? refreshBooks : refreshTestimonies;

  // Filter based on search query
  const filteredData = useMemo(() => {
    const list = activeTab === "books" ? books : testimonies;
    if (!searchQuery.trim()) return list;

    return list.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [activeTab, books, testimonies, searchQuery]);

  const handleCardPress = (id: number) => {
    if (activeTab === "books") {
      router.push(`/book/${id}`);
    } else {
      router.push(`/testimony/${id}`);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      {/* Header Title */}
      <PageHeader title='Articles' />

      {/* Search Bar */}
      <View className='flex-row items-center bg-card border border-border px-3 py-2.5 rounded-2xl mb-4'>
        <Ionicons
          name='search-outline'
          size={20}
          color='gray'
          className='mr-2'
        />
        <TextInput
          placeholder={`Search ${activeTab}...`}
          placeholderTextColor='#9CA3AF'
          value={searchQuery}
          onChangeText={setSearchQuery}
          className='flex-1 font-sans text-foreground text-sm p-0'
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name='close-circle' size={18} color='gray' />
          </TouchableOpacity>
        )}
      </View>

      {/* Segmented Switcher Menu (Books vs Testimonies) */}
      <View className='flex-row bg-card border border-border p-1 rounded-2xl mb-5'>
        <TouchableOpacity
          onPress={() => setActiveTab("books")}
          activeOpacity={0.8}
          className={`flex-1 py-2.5 rounded-xl items-center ${
            activeTab === "books" ? "bg-primary" : "bg-transparent"
          }`}>
          <Text
            className={`font-sans-bold text-sm ${
              activeTab === "books" ? "text-white" : "text-foreground/70"
            }`}>
            Books
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("testimonies")}
          activeOpacity={0.8}
          className={`flex-1 py-2.5 rounded-xl items-center ${
            activeTab === "testimonies" ? "bg-primary" : "bg-transparent"
          }`}>
          <Text
            className={`font-sans-bold text-sm ${
              activeTab === "testimonies" ? "text-white" : "text-foreground/70"
            }`}>
            Testimonies
          </Text>
        </TouchableOpacity>
      </View>

      {/* Books / Testimonies List */}
      {isLoading && filteredData.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' className='text-primary' />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={currentRefresh} />
          }
          renderItem={({ item }) => {
            const isBook = activeTab === "books";
            const bookItem = item as BookItem;
            const testimonyItem = item as TestimonyItem;

            const author = isBook
              ? bookItem.author
              : testimonyItem.testifier_name;
            const meta = isBook ? bookItem.category : testimonyItem.readTime;
            const snippet = isBook
              ? (bookItem.description ?? "")
              : testimonyItem.content;
            const rating = isBook ? bookItem.avgRating : undefined;

            return (
              <TouchableOpacity
                onPress={() => handleCardPress(item.id)}
                activeOpacity={0.8}
                className='mb-4 bg-card border border-border p-4 rounded-2xl flex-row'>
                {isBook && (
                  <View className='mr-3'>
                    {bookItem.coverImageUrl ? (
                      <Image
                        source={{ uri: bookItem.coverImageUrl }}
                        className='w-14 h-20 rounded-lg'
                        resizeMode='cover'
                      />
                    ) : (
                      <View className='w-14 h-20 rounded-lg bg-background border border-border items-center justify-center'>
                        <Ionicons name='book-outline' size={18} color='gray' />
                      </View>
                    )}
                  </View>
                )}

                <View className='flex-1'>
                  <View className='flex-row justify-between items-center mb-1.5'>
                    <Text className='text-xs font-sans-bold text-primary uppercase'>
                      {author}
                    </Text>
                    {isBook ? (
                      rating ? (
                        <View className='flex-row items-center'>
                          <Ionicons name='star' size={12} color='#C9922F' />
                          <Text className='text-xs font-sans text-foreground/50 ml-1'>
                            {rating.toFixed(1)}
                          </Text>
                        </View>
                      ) : null
                    ) : (
                      <Text className='text-xs font-sans text-foreground/50'>
                        {meta ? `• ${meta}` : ""}
                      </Text>
                    )}
                  </View>

                  <Text className='text-base font-sans-bold text-foreground mb-1'>
                    {item.title}
                  </Text>

                  <Text
                    className='text-xs font-sans text-foreground/70 leading-4'
                    numberOfLines={2}>
                    {snippet}
                  </Text>

                  {isBook && bookItem.reviewCount !== undefined && (
                    <Text className='text-xs font-sans text-foreground/40 mt-2'>
                      {bookItem.reviewCount} review
                      {bookItem.reviewCount === 1 ? "" : "s"}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View className='items-center justify-center py-12'>
              <Ionicons name='document-text-outline' size={40} color='gray' />
              <Text className='text-foreground/60 font-sans text-sm mt-2'>
                No {activeTab} found{" "}
                {searchQuery ? `matching "${searchQuery}"` : "yet"}.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ArticlesScreen;
