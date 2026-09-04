import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

import AnnouncementCard from "@/components/AnnouncementCard";
import { useHomeData } from "@/lib/hooks/useHome";
import { posthog } from "@/lib/posthog";
import { AnnouncementItem } from "@/types/api";

export default function AnnouncementsScreen() {
  const router = useRouter();
  const { announcements, loading, refresh } = useHomeData();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Dynamically extract categories from incoming items
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        announcements
          .map((item) => item.category)
          .filter((cat): cat is string => Boolean(cat)),
      ),
    );
    return ["All", ...unique];
  }, [announcements]);

  // Filter announcements based on active chip
  const filteredAnnouncements = useMemo(() => {
    if (selectedCategory === "All") return announcements;
    return announcements.filter((item) => item.category === selectedCategory);
  }, [announcements, selectedCategory]);

  return (
    <SafeAreaView className='flex-1 bg-background' edges={["top"]}>
      {/* Configure Stack navigation bar to hide default header in favor of custom top bar */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Top Navigation Header */}
      <View className='flex-row items-center justify-between px-5 py-3 border-b border-border/40 bg-background/80'>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className='w-10 h-10 rounded-full bg-card border border-border items-center justify-center shadow-sm'>
          <Ionicons
            name='chevron-back'
            size={22}
            className='text-foreground'
            color='currentColor'
          />
        </TouchableOpacity>

        <View className='items-center'>
          <Text className='text-lg font-sans-bold text-foreground tracking-tight'>
            Announcements
          </Text>
          <Text className='text-xs font-sans text-foreground/50'>
            {announcements.length}{" "}
            {announcements.length === 1 ? "update" : "updates"}
          </Text>
        </View>

        {/* Spacer to balance the flex row centering */}
        <View className='w-10' />
      </View>

      {/* Category Filter Chips */}
      {categories.length > 1 && (
        <View className='border-b border-border/20 py-3'>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setExpandedIndex(null);
                  }}
                  activeOpacity={0.8}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    isActive
                      ? "bg-primary border-primary"
                      : "bg-card border-border/60"
                  }`}>
                  <Text
                    className={`text-xs font-sans-bold ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-foreground/70"
                    }`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Body Content */}
      {loading && !announcements.length ? (
        <View className='flex-1 justify-center items-center p-5'>
          <ActivityIndicator size='large' className='text-primary' />
          <Text className='text-xs font-sans text-foreground/50 mt-3'>
            Loading updates...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAnnouncements}
          keyExtractor={(item: AnnouncementItem) => String(item.id)}
          contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          renderItem={({
            item,
            index,
          }: {
            item: AnnouncementItem;
            index: number;
          }) => (
            <AnnouncementCard
              title={item.title}
              announcementDate={item.announcementDate}
              isImportant={item.isImportant}
              link={item.link}
              category={item.category}
              location={item.location}
              time={item.time}
              description={item.description}
              expanded={expandedIndex === index}
              onPress={() => {
                const isExpanded = expandedIndex === index;
                posthog?.capture("announcement_details_toggled", {
                  announcement_id: item.id,
                  is_expanded: !isExpanded,
                });
                setExpandedIndex(isExpanded ? null : index);
              }}
            />
          )}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className='py-16 items-center justify-center px-6'>
              <View className='w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4 border border-primary/20'>
                <Ionicons
                  name='megaphone-outline'
                  size={28}
                  className='text-primary'
                  color='currentColor'
                />
              </View>
              <Text className='text-base font-sans-bold text-foreground text-center mb-1'>
                No announcements found
              </Text>
              <Text className='text-xs font-sans text-foreground/50 text-center leading-5'>
                {selectedCategory !== "All"
                  ? `There are currently no announcements under the "${selectedCategory}" category.`
                  : "Check back later for important updates and community announcements."}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
