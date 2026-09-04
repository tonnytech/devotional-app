// app/calendar/[id].tsx
import { api } from "@/lib/api";
import { CalendarEventItem } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { RRule } from "rrule";

const SafeAreaView = styled(RNSafeAreaView);

function formatDateRange(event: CalendarEventItem) {
  const start = new Date(event.startDate);
  const startLabel = start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!event.endDate) return startLabel;

  const end = new Date(event.endDate);
  if (end.toDateString() === start.toDateString()) return startLabel;

  const endLabel = end.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${startLabel} – ${endLabel}`;
}

function formatRecurrence(event: CalendarEventItem): string | null {
  if (!event.isRecurring || !event.recurrenceRule) return null;

  try {
    const options = RRule.parseString(event.recurrenceRule);
    options.dtstart = new Date(event.startDate);
    if (event.recurrenceEndDate) {
      options.until = new Date(event.recurrenceEndDate);
    }
    const rule = new RRule(options);
    const text = rule.toText();
    return text.charAt(0).toUpperCase() + text.slice(1);
  } catch {
    return "Repeats";
  }
}

export default function CalendarEventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [event, setEvent] = useState<CalendarEventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getCalendarEventById(id);
        if (!cancelled) setEvent(res.data);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Couldn't load this event.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const recurrenceText = event ? formatRecurrence(event) : null;

  return (
    <SafeAreaView className='flex-1 bg-background' edges={["bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />

      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' className='text-primary' />
        </View>
      ) : error || !event ? (
        <View className='flex-1 justify-center items-center px-8'>
          <Ionicons name='alert-circle-outline' size={36} color='gray' />
          <Text className='text-foreground/60 font-sans text-sm mt-2 text-center'>
            {error || "This event couldn't be found."}
          </Text>
          <Pressable
            onPress={() => router.back()}
            className='mt-4 px-4 py-2 rounded-full bg-card border border-border'>
            <Text className='text-sm font-sans-bold text-foreground'>
              Go back
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='relative'>
            {event.imageUrl ? (
              <Image
                source={{ uri: event.imageUrl }}
                className='w-full h-64'
                resizeMode='cover'
              />
            ) : (
              <View
                className='w-full h-40 items-center justify-center'
                style={{ backgroundColor: event.color || "#21262B" }}>
                <Ionicons name='calendar-outline' size={40} color='#ffffff' />
              </View>
            )}

            <SafeAreaView
              edges={["top"]}
              className='absolute top-0 left-0 right-0'>
              <Pressable
                onPress={() => router.back()}
                hitSlop={8}
                className='w-9 h-9 m-4 items-center justify-center rounded-full bg-black/40'>
                <Ionicons name='chevron-back' size={20} color='#ffffff' />
              </Pressable>
            </SafeAreaView>
          </View>

          <View className='p-5'>
            <View className='flex-row flex-wrap gap-1.5 mb-3'>
              {event.isFeatured && (
                <View className='bg-primary/10 px-2.5 py-1 rounded-full'>
                  <Text className='text-xs font-sans-bold text-primary'>
                    Featured
                  </Text>
                </View>
              )}
              {event.category && (
                <View className='bg-foreground/10 px-2.5 py-1 rounded-full'>
                  <Text className='text-xs font-sans-bold text-foreground/70'>
                    {event.category}
                  </Text>
                </View>
              )}
            </View>

            <Text className='text-2xl font-sans-bold text-foreground mb-4'>
              {event.title}
            </Text>

            <View className='gap-3 mb-5'>
              <View className='flex-row items-start gap-3'>
                <Ionicons
                  name='calendar-outline'
                  size={18}
                  color='gray'
                  style={{ marginTop: 1 }}
                />
                <View className='flex-1'>
                  <Text className='text-sm font-sans text-foreground'>
                    {formatDateRange(event)}
                  </Text>
                  {recurrenceText && (
                    <Text className='text-xs font-sans text-foreground/50 mt-0.5'>
                      {recurrenceText}
                    </Text>
                  )}
                </View>
              </View>

              <View className='flex-row items-start gap-3'>
                <Ionicons
                  name='time-outline'
                  size={18}
                  color='gray'
                  style={{ marginTop: 1 }}
                />
                <Text className='text-sm font-sans text-foreground flex-1'>
                  {event.allDay ? "All day" : event.eventTime || "Time TBA"}
                </Text>
              </View>

              {event.location && (
                <View className='flex-row items-start gap-3'>
                  <Ionicons
                    name='location-outline'
                    size={18}
                    color='gray'
                    style={{ marginTop: 1 }}
                  />
                  <Text className='text-sm font-sans text-foreground flex-1'>
                    {event.location}
                  </Text>
                </View>
              )}
            </View>

            {event.description && (
              <View className='mb-5'>
                <Text className='text-sm font-sans text-foreground/80 leading-5'>
                  {event.description}
                </Text>
              </View>
            )}

            {event.registrationUrl && (
              <Pressable
                onPress={() => Linking.openURL(event.registrationUrl!)}
                className='items-center justify-center rounded-full bg-primary py-3.5 mt-2'>
                <Text className='text-sm font-sans-bold text-white'>
                  Register
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
