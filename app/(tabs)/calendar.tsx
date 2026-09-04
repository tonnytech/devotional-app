// app/(tabs)/calendar.tsx
import PageHeader from "@/components/PageHeader";
import { useCalendarEvents } from "@/lib/hooks/useCalendarEvents";
import { CalendarEventItem } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { RRule } from "rrule";

const SafeAreaView = styled(RNSafeAreaView);

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const DEFAULT_DOT_COLOR = "#9CA3AF";

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Every calendar day an event touches within [rangeStart, rangeEnd]
 * (both inclusive, both normalized to midnight). Handles three cases:
 * - a single-day event: just its startDate
 * - a multi-day span: every day from startDate through endDate
 * - a recurring event: every RRULE occurrence, falling back to its plain
 *   span if the rule fails to parse (so a bad rule doesn't disappear the
 *   event entirely, it just stops repeating)
 */
function getOccurrenceDatesInRange(
  event: CalendarEventItem,
  rangeStart: Date,
  rangeEnd: Date,
): Date[] {
  const start = startOfDay(new Date(event.startDate));
  const end = event.endDate ? startOfDay(new Date(event.endDate)) : start;

  if (event.isRecurring && event.recurrenceRule) {
    try {
      const options = RRule.parseString(event.recurrenceRule);
      options.dtstart = start;
      if (event.recurrenceEndDate) {
        options.until = startOfDay(new Date(event.recurrenceEndDate));
      }
      const rule = new RRule(options);
      const occurrences = rule.between(rangeStart, rangeEnd, true);
      if (occurrences.length > 0) {
        return occurrences.map(startOfDay);
      }
    } catch {
      // Malformed recurrence rule — fall through to the plain span below.
    }
  }

  const dates: Date[] = [];
  let cursor = start;
  while (cursor <= end) {
    if (cursor >= rangeStart && cursor <= rangeEnd) dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

type DayCell = {
  date: Date;
  inCurrentMonth: boolean;
  events: CalendarEventItem[];
};

function buildMonthGrid(
  monthAnchor: Date,
  events: CalendarEventItem[],
): DayCell[] {
  const firstOfMonth = new Date(
    monthAnchor.getFullYear(),
    monthAnchor.getMonth(),
    1,
  );
  const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());
  const gridEnd = addDays(gridStart, 41); // 6 weeks, inclusive

  const eventsByDay = new Map<string, CalendarEventItem[]>();
  for (const event of events) {
    const occurrences = getOccurrenceDatesInRange(event, gridStart, gridEnd);
    for (const date of occurrences) {
      const key = date.toDateString();
      const list = eventsByDay.get(key) ?? [];
      list.push(event);
      eventsByDay.set(key, list);
    }
  }

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = addDays(gridStart, i);
    cells.push({
      date,
      inCurrentMonth: date.getMonth() === monthAnchor.getMonth(),
      events: eventsByDay.get(date.toDateString()) ?? [],
    });
  }
  return cells;
}

function formatSelectedDayHeading(date: Date) {
  const today = startOfDay(new Date());
  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, addDays(today, 1))) return "Tomorrow";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const CalendarScreen = () => {
  const router = useRouter();
  const { events, loading, error, refresh } = useCalendarEvents();
  const [monthAnchor, setMonthAnchor] = useState(() => startOfDay(new Date()));
  const [selectedDate, setSelectedDate] = useState(() =>
    startOfDay(new Date()),
  );

  const grid = useMemo(
    () => buildMonthGrid(monthAnchor, events),
    [monthAnchor, events],
  );

  const selectedDayEvents = useMemo(() => {
    const dayStart = startOfDay(selectedDate);
    return events
      .filter(
        (event) =>
          getOccurrenceDatesInRange(event, dayStart, dayStart).length > 0,
      )
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }, [events, selectedDate]);

  function goToMonth(offset: number) {
    setMonthAnchor(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  }

  const monthLabel = monthAnchor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='px-5 pt-2'>
        <PageHeader title='Calendar' />
      </View>

      {loading && events.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' className='text-primary' />
        </View>
      ) : (
        <FlatList
          data={selectedDayEvents}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          ListHeaderComponent={
            <View className='mb-2'>
              {/* Month navigation */}
              <View className='flex-row items-center justify-between mb-4'>
                <Pressable
                  onPress={() => goToMonth(-1)}
                  hitSlop={8}
                  className='w-8 h-8 items-center justify-center rounded-full bg-card border border-border'>
                  <Ionicons name='chevron-back' size={16} color='#21262B' />
                </Pressable>
                <Text className='text-base font-sans-bold text-foreground'>
                  {monthLabel}
                </Text>
                <Pressable
                  onPress={() => goToMonth(1)}
                  hitSlop={8}
                  className='w-8 h-8 items-center justify-center rounded-full bg-card border border-border'>
                  <Ionicons name='chevron-forward' size={16} color='#21262B' />
                </Pressable>
              </View>

              {/* Weekday labels */}
              <View className='flex-row mb-2'>
                {WEEKDAY_LABELS.map((label, i) => (
                  <View key={i} className='flex-1 items-center'>
                    <Text className='text-xs font-sans-bold text-foreground/40'>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Month grid */}
              <View className='flex-row flex-wrap'>
                {grid.map((cell, i) => {
                  const isSelected = isSameDay(cell.date, selectedDate);
                  const isToday = isSameDay(cell.date, startOfDay(new Date()));
                  const visibleDots = cell.events.slice(0, 3);

                  return (
                    <Pressable
                      key={i}
                      onPress={() => setSelectedDate(cell.date)}
                      className='items-center justify-start py-1'
                      style={{ width: `${100 / 7}%` }}>
                      <View
                        className={`w-8 h-8 items-center justify-center rounded-full ${
                          isSelected
                            ? "bg-primary"
                            : isToday
                              ? "border border-primary"
                              : ""
                        }`}>
                        <Text
                          className={`text-sm ${
                            isSelected
                              ? "text-white font-sans-bold"
                              : cell.inCurrentMonth
                                ? "font-sans text-foreground"
                                : "font-sans text-foreground/25"
                          }`}>
                          {cell.date.getDate()}
                        </Text>
                      </View>
                      <View className='flex-row gap-0.5 h-1.5 mt-1'>
                        {visibleDots.map((event, di) => (
                          <View
                            key={di}
                            className='w-1 h-1 rounded-full'
                            style={{
                              backgroundColor: event.color || DEFAULT_DOT_COLOR,
                            }}
                          />
                        ))}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <View className='h-px bg-border my-5' />

              <Text className='text-lg font-sans-bold text-foreground mb-3'>
                {formatSelectedDayHeading(selectedDate)}
              </Text>
            </View>
          }
          renderItem={({ item }: { item: CalendarEventItem }) => (
            <Pressable
              onPress={() => router.push(`/calendar/${item.id}`)}
              className='mb-3 bg-card border border-border rounded-2xl overflow-hidden flex-row active:opacity-70'
              style={{
                borderLeftWidth: 4,
                borderLeftColor: item.color || DEFAULT_DOT_COLOR,
              }}>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  className='w-20 h-20'
                  resizeMode='cover'
                />
              )}
              <View className='flex-1 p-3.5'>
                <View className='flex-row items-center justify-between mb-1'>
                  <Text
                    className='text-sm font-sans-bold text-foreground flex-1 pr-2'
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                  {item.isFeatured && (
                    <View className='bg-primary/10 px-2 py-0.5 rounded-full'>
                      <Text className='text-[10px] font-sans-bold text-primary'>
                        Featured
                      </Text>
                    </View>
                  )}
                </View>

                <View className='flex-row items-center gap-1 mb-0.5'>
                  <Ionicons name='time-outline' size={12} color='gray' />
                  <Text className='text-xs font-sans text-foreground/60'>
                    {item.allDay ? "All day" : item.eventTime || "Time TBA"}
                  </Text>
                  {item.isRecurring && (
                    <Text className='text-xs font-sans text-foreground/40'>
                      {" "}
                      · Repeats
                    </Text>
                  )}
                </View>

                {item.location && (
                  <View className='flex-row items-center gap-1'>
                    <Ionicons name='location-outline' size={12} color='gray' />
                    <Text
                      className='text-xs font-sans text-foreground/60 flex-1'
                      numberOfLines={1}>
                      {item.location}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View className='items-center justify-center py-12'>
              <Ionicons name='calendar-outline' size={36} color='gray' />
              <Text className='text-foreground/60 font-sans text-sm mt-2'>
                Nothing on the calendar for this day.
              </Text>
            </View>
          }
        />
      )}

      {error && (
        <View className='px-5 pb-3'>
          <Text className='text-xs font-sans text-red-600'>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CalendarScreen;
