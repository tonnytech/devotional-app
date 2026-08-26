import PageHeader from "@/components/PageHeader";
import { BLOGS_DATA, TESTIMONIES_DATA } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import {
  FlatList,
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

  const dataList = activeTab === "blogs" ? BLOGS_DATA : TESTIMONIES_DATA;

  // Filter based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return dataList;
    return dataList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [dataList, searchQuery]);

  const handleCardPress = (id: string) => {
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
      <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCardPress(String(item.id))}
            activeOpacity={0.8}
            className='mb-4 bg-card border border-border p-4 rounded-2xl'>
            <View className='flex-row justify-between items-center mb-1.5'>
              <Text className='text-xs font-sans-bold text-primary uppercase'>
                {activeTab === "blogs" ? item.testifier_name : "Testimony"}
              </Text>
              <Text className='text-xs font-sans text-foreground/50'>
                {String(item.createdAt)} • {String(item.readTime)}
              </Text>
            </View>

            <Text className='text-base font-sans-bold text-foreground mb-1'>
              {item.title}
            </Text>

            <Text
              className='text-xs font-sans text-foreground/70 leading-4'
              numberOfLines={2}>
              {item.content.split(/\s+/).slice(0, 50).join(" ")}
              {item.content.split(/\s+/).length > 50 ? "..." : ""}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className='items-center justify-center py-12'>
            <Ionicons name='document-text-outline' size={40} color='gray' />
            <Text className='text-foreground/60 font-sans text-sm mt-2'>
              No {activeTab} found matching &quot;{searchQuery}&quot;
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ArticlesScreen;
