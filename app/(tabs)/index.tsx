import { useHomeData } from "@/lib/hooks/useHome";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import AnnouncementCard from "@/components/AnnouncementCard";
import ListHeading from "@/components/ListHeading";
import UpcomingEventCard from "@/components/UpcomingEventCard2";
import images from "@/constants/images";
import { posthog } from "@/lib/posthog";
import { AnnouncementItem, EventItem } from "@/types/api";

const SafeAreaView = styled(RNSafeAreaView);

export default function HomeScreen() {
  const { user } = useUser();
  const { themeVerse, events, announcements, loading, refresh } = useHomeData();
  const [expandedAnnouncementIndex, setExpandedAnnouncementIndex] = useState<
    number | null
  >(null);
  // User details with fallback
  // const userName = user?.firstName || "Guest";
  const userName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Guest";
  const userAvatar = user?.imageUrl ? { uri: user.imageUrl } : images.avartar;
  // ✅ Compute the image source directly without state
  // const userAvatar = useMemo(() => {
  //   if (user?.imageUrl) {
  //     return { uri: user.imageUrl };
  //   }
  //   return require("@/assets/images/default-avatar.png"); // or fallback object
  // }, [user?.imageUrl]);
  // Render initial loading state
  if (loading && !events.length && !announcements.length) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center'>
        <ActivityIndicator size='large' className='text-primary' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListHeaderComponent={() => (
          <>
            {/* Top User Greeting Bar */}
            <View className='flex-row items-center justify-between mb-6'>
              <View className='flex-row items-center'>
                <Image
                  source={userAvatar}
                  className='w-12 h-12 rounded-full border border-border bg-card'
                  resizeMode='cover'
                />
                <View className='ml-3'>
                  <Text className='text-xs font-sans text-foreground/60'>
                    Welcome back,
                  </Text>
                  <Text className='text-xl font-sans-bold text-foreground'>
                    {userName}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                className='p-2.5 rounded-full bg-card border border-border'
                activeOpacity={0.8}>
                <Ionicons
                  name='notifications-outline'
                  size={22}
                  color='currentColor'
                  className='text-foreground'
                />
              </TouchableOpacity>
            </View>

            {/* Verse of the Day Card */}
            {themeVerse ? (
              <View className='bg-primary rounded-3xl p-6 shadow-md relative overflow-hidden mb-6'>
                <View className='absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10' />
                <View className='absolute -left-10 -top-10 w-32 h-32 rounded-full bg-white/5' />

                <View className='flex-row justify-between items-center mb-3'>
                  <View className='bg-white/20 px-3 py-1 rounded-full'>
                    <Text className='text-white text-xs font-sans-bold uppercase tracking-wider'>
                      Verse of the Day
                    </Text>
                  </View>
                  <Ionicons
                    name='book-outline'
                    size={18}
                    color='#FFFFFF'
                    className='opacity-80'
                  />
                </View>

                <Text className='text-white text-lg font-serif italic leading-7 mb-4'>
                  &quot;{themeVerse.content}&quot;
                </Text>

                <Text className='text-white/80 font-sans-bold text-right text-sm'>
                  {themeVerse.verse} ({themeVerse.version})
                </Text>
              </View>
            ) : null}

            {/* Upcoming Events Section */}
            <View className='mb-6'>
              <ListHeading title='Upcoming services' />
              <FlatList
                data={events}
                renderItem={({ item }: { item: EventItem }) => (
                  <UpcomingEventCard event={item} />
                )}
                keyExtractor={(item: EventItem) => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
                ListEmptyComponent={
                  <View className='py-6 items-center'>
                    <Text className='text-foreground/50 font-sans text-sm'>
                      No upcoming events scheduled.
                    </Text>
                  </View>
                }
              />
            </View>

            {/* Announcements Section Header */}
            <ListHeading title='Announcements' />
          </>
        )}
        data={announcements}
        keyExtractor={(item) => String(item.id)}
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
            expanded={expandedAnnouncementIndex === index}
            onPress={() => {
              const isExpanded = expandedAnnouncementIndex === index;
              posthog?.capture("announcement_details_toggled", {
                announcement_id: item.id,
                is_expanded: !isExpanded,
              });
              setExpandedAnnouncementIndex(isExpanded ? null : index);
            }}
          />
        )}
        extraData={expandedAnnouncementIndex}
        ItemSeparatorComponent={() => <View className='h-4' />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className='py-8 items-center'>
            <Text className='text-foreground/50 font-sans text-sm'>
              No announcements right now.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
