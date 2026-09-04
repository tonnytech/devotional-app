// app/(tabs)/calendar.tsx
import PageHeader from "@/components/PageHeader";
import { useCalendarEvents } from "@/lib/hooks/useCalendarEvents";
import { CalendarEventItem } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

function formatEventDate(item: CalendarEventItem) {
  const start = new Date(item.startDate);
  const startLabel = start.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!item.endDate) return startLabel;

  const end = new Date(item.endDate);
  const endLabel = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${startLabel} – ${endLabel}`;
}

const CalendarScreen = () => {
  const { events, loading, error, refresh } = useCalendarEvents();

  console.log(events);

  // The API already returns only "still relevant" events — non-recurring
  // ones that haven't ended, and recurring ones that haven't hit their
  // recurrence end date. We don't re-filter by startDate here, since a
  // recurring event's original startDate can be far in the past while
  // still being active every week.
  const upcoming = useMemo(() => {
    return [...events].sort((a, b) => {
      if (a.isRecurring !== b.isRecurring) {
        return a.isRecurring ? 1 : -1; // one-off events first, recurring after
      }
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  }, [events]);

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <PageHeader title='Calendar' />

      {loading && events.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' className='text-primary' />
        </View>
      ) : (
        <FlatList
          data={upcoming}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          renderItem={({ item }: { item: CalendarEventItem }) => (
            <View className='mb-4 bg-card border border-border rounded-2xl overflow-hidden'>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  className='w-full h-36'
                  resizeMode='cover'
                />
              )}
              <View className='p-4'>
                <View className='flex-row items-center justify-between mb-1.5'>
                  <Text className='text-xs font-sans-bold text-primary uppercase'>
                    {formatEventDate(item)}
                  </Text>
                  <View className='flex-row gap-1.5'>
                    {item.isRecurring && (
                      <View className='bg-foreground/10 px-2 py-0.5 rounded-full'>
                        <Text className='text-xs font-sans-bold text-foreground/70'>
                          Recurring
                        </Text>
                      </View>
                    )}
                    {item.isFeatured && (
                      <View className='bg-primary/10 px-2 py-0.5 rounded-full'>
                        <Text className='text-xs font-sans-bold text-primary'>
                          Featured
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <Text className='text-base font-sans-bold text-foreground mb-1'>
                  {item.title}
                </Text>

                <View className='flex-row items-center gap-1 mb-1'>
                  <Ionicons name='time-outline' size={13} color='gray' />
                  <Text className='text-xs font-sans text-foreground/60'>
                    {item.allDay ? "All day" : item.eventTime || "Time TBA"}
                  </Text>
                </View>

                {item.location && (
                  <View className='flex-row items-center gap-1'>
                    <Ionicons name='location-outline' size={13} color='gray' />
                    <Text className='text-xs font-sans text-foreground/60'>
                      {item.location}
                    </Text>
                  </View>
                )}

                {item.description && (
                  <Text
                    className='text-xs font-sans text-foreground/70 leading-4 mt-2'
                    numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className='items-center justify-center py-12'>
              <Ionicons name='calendar-outline' size={40} color='gray' />
              <Text className='text-foreground/60 font-sans text-sm mt-2'>
                No upcoming events.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CalendarScreen;
