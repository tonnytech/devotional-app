import PageHeader from "@/components/PageHeader";
import { useBlogs } from "@/lib/hooks/useBlogs";
import { useTestimonies } from "@/lib/hooks/useTestimonies";
import { BlogItem, TestimonyItem } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type ActiveTab = "blogs" | "testimonies";

const ArticlesScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("blogs");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch dynamic API data
  const { blogs, loading: loadingBlogs, refresh: refreshBlogs } = useBlogs();
  const {
    testimonies,
    loading: loadingTestimonies,
    refresh: refreshTestimonies,
  } = useTestimonies();

  const isLoading = activeTab === "blogs" ? loadingBlogs : loadingTestimonies;
  const currentRefresh =
    activeTab === "blogs" ? refreshBlogs : refreshTestimonies;

  // Filter based on search query
  const filteredData = useMemo(() => {
    const list = activeTab === "blogs" ? blogs : testimonies;
    if (!searchQuery.trim()) return list;

    return list.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [activeTab, blogs, testimonies, searchQuery]);

  const handleCardPress = (id: number) => {
    if (activeTab === "blogs") {
      router.push(`/blog/${id}`);
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

      {/* Segmented Switcher Menu (Blogs vs Testimonies) */}
      <View className='flex-row bg-card border border-border p-1 rounded-2xl mb-5'>
        <TouchableOpacity
          onPress={() => setActiveTab("blogs")}
          activeOpacity={0.8}
          className={`flex-1 py-2.5 rounded-xl items-center ${
            activeTab === "blogs" ? "bg-primary" : "bg-transparent"
          }`}>
          <Text
            className={`font-sans-bold text-sm ${
              activeTab === "blogs" ? "text-white" : "text-foreground/70"
            }`}>
            Blogs
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

      {/* Articles / Testimonies List */}
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
            const isBlog = activeTab === "blogs";
            const blogItem = item as BlogItem;
            const testimonyItem = item as TestimonyItem;

            const author = isBlog
              ? blogItem.author
              : testimonyItem.testifier_name;
            const date = isBlog
              ? blogItem.publishedAt
              : testimonyItem.testimonyDate;
            const readTime = isBlog
              ? blogItem.readTime
              : testimonyItem.readTime;
            const snippet = isBlog
              ? blogItem.snippet || blogItem.content
              : testimonyItem.content;

            return (
              <TouchableOpacity
                onPress={() => handleCardPress(item.id)}
                activeOpacity={0.8}
                className='mb-4 bg-card border border-border p-4 rounded-2xl'>
                <View className='flex-row justify-between items-center mb-1.5'>
                  <Text className='text-xs font-sans-bold text-primary uppercase'>
                    {author}
                  </Text>
                  <Text className='text-xs font-sans text-foreground/50'>
                    {date ? String(date).split("T")[0] : ""}{" "}
                    {readTime ? `• ${readTime}` : ""}
                  </Text>
                </View>

                <Text className='text-base font-sans-bold text-foreground mb-1'>
                  {item.title}
                </Text>

                <Text
                  className='text-xs font-sans text-foreground/70 leading-4'
                  numberOfLines={2}>
                  {snippet}
                </Text>
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
