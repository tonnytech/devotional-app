import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

import UpcomingEventCard from "@/components/UpcomingEventCard2";
import { useHomeData } from "@/lib/hooks/useHome";
import { EventItem } from "@/types/api";

export default function EventsScreen() {
  const router = useRouter();
  const { events, loading, refresh } = useHomeData();

  return (
    <SafeAreaView className='flex-1 bg-background' edges={["top"]}>
      {/* Hide standard navigation header to use custom header */}
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
            Upcoming Services
          </Text>
          <Text className='text-xs font-sans text-foreground/50'>
            {events.length} {events.length === 1 ? "service" : "services"}{" "}
            scheduled
          </Text>
        </View>

        {/* Spacer to keep title centered */}
        <View className='w-10' />
      </View>

      {/* Screen Body */}
      {loading && !events.length ? (
        <View className='flex-1 justify-center items-center p-5'>
          <ActivityIndicator size='large' className='text-primary' />
          <Text className='text-xs font-sans text-foreground/50 mt-3'>
            Fetching upcoming services...
          </Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item: EventItem) => String(item.id)}
          contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          renderItem={({ item }: { item: EventItem }) => (
            <UpcomingEventCard event={item} />
          )}
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className='py-16 items-center justify-center px-6'>
              <View className='w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4 border border-primary/20'>
                <Ionicons
                  name='calendar-outline'
                  size={28}
                  className='text-primary'
                  color='currentColor'
                />
              </View>
              <Text className='text-base font-sans-bold text-foreground text-center mb-1'>
                No services scheduled
              </Text>
              <Text className='text-xs font-sans text-foreground/50 text-center leading-5'>
                There are no upcoming services or events on the schedule right
                now. Check back soon!
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
