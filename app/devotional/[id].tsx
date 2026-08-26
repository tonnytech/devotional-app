import { DEVOTIONALS } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const MONTH_NAMES: { [key: string]: number } = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const DevotionalDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const devotional = useMemo(() => {
    return DEVOTIONALS.find((d) => String(d.id) === id);
  }, [id]);

  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Generate days array for the month
  const daysInMonth = useMemo(() => {
    if (!devotional) return [];
    const monthIndex = MONTH_NAMES[devotional.month.toLowerCase()] ?? 0;
    const year = devotional.year;
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, i) => i + 1);
  }, [devotional]);

  // Find daily reading for selected day
  const activeReading = useMemo(() => {
    if (!devotional?.readings) return null;
    return devotional.readings.find((r) => r.day === selectedDay);
  }, [devotional, selectedDay]);

  if (!devotional) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-5'>
        <Text className='text-foreground/70 font-sans text-base mb-4'>
          Devotional not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className='bg-primary px-4 py-2 rounded-xl'>
          <Text className='text-white font-sans-bold'>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      {/* Header */}
      <View className='flex-row items-center justify-between mb-4'>
        <TouchableOpacity
          onPress={() => router.back()}
          className='p-2 rounded-full bg-card border border-border'>
          <Ionicons
            name='chevron-back'
            size={20}
            color='currentColor'
            className='text-foreground'
          />
        </TouchableOpacity>

        <Text className='text-xl font-sans-bold text-primary capitalize'>
          {devotional.month} {devotional.year}
        </Text>

        <View className='w-9' />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Horizontal Calendar Strip */}
        <View className='mb-6'>
          <FlatList
            data={daysInMonth}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(day) => day.toString()}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item: day }) => {
              const isSelected = selectedDay === day;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedDay(day)}
                  className={`w-12 h-14 rounded-2xl items-center justify-center border ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "bg-card border-border"
                  }`}>
                  <Text
                    className={`text-xs font-sans uppercase mb-0.5 ${
                      isSelected ? "text-white/80" : "text-foreground/60"
                    }`}>
                    Day
                  </Text>
                  <Text
                    className={`text-base font-sans-bold ${
                      isSelected ? "text-white" : "text-foreground"
                    }`}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Selected Day Content */}
        {activeReading ? (
          <View className='bg-card border border-border p-5 rounded-2xl mb-8'>
            <Text className='text-xs text-primary font-sans-bold uppercase tracking-wider mb-1'>
              Day {activeReading.day} • {devotional.month} {activeReading.day},{" "}
              {devotional.year}
            </Text>

            <Text className='text-2xl font-sans-bold text-foreground mb-4'>
              {activeReading.title}
            </Text>

            {/* Scripture Anchor */}
            <View className='bg-background/80 border-l-4 border-primary p-4 rounded-r-xl mb-5'>
              <Text className='text-sm font-sans-bold text-primary mb-1'>
                {activeReading.scriptureRef}
              </Text>
              <Text className='text-sm font-sans italic text-foreground/80 leading-5'>
                &quot;{activeReading.scriptureText}&quot;
              </Text>
            </View>

            {/* Reflection Body */}
            <View className='mb-5'>
              <Text className='text-xs font-sans-bold text-foreground/50 uppercase mb-2'>
                Reflection
              </Text>
              <Text className='text-sm font-sans text-foreground/90 leading-6'>
                {activeReading.reflection}
              </Text>
            </View>

            {/* Prayer */}
            {activeReading.prayer && (
              <View className='bg-primary/10 p-4 rounded-xl border border-primary/20'>
                <Text className='text-xs font-sans-bold text-primary uppercase mb-1'>
                  Prayer
                </Text>
                <Text className='text-sm font-sans italic text-foreground/90 leading-5'>
                  {activeReading.prayer}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View className='bg-card border border-border p-8 rounded-2xl items-center my-4'>
            <Ionicons name='book-outline' size={32} color='gray' />
            <Text className='text-foreground/60 font-sans mt-3 text-center'>
              No reading uploaded for Day {selectedDay} yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DevotionalDetail;
