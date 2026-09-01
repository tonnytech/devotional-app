import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";

import { useDevotional } from "@/lib/hooks/useDevotionals";

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
  const { devotional, loading, error } = useDevotional(id || "");

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedRefs, setCompletedRefs] = useState<Record<number, boolean>>(
    {},
  );

  // Generate days array for the month dynamically
  const daysInMonth = useMemo(() => {
    if (!devotional?.month || !devotional?.year) return [];
    const monthIndex = MONTH_NAMES[devotional.month.toLowerCase()] ?? 0;
    const year = Number(devotional.year);
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, i) => i + 1);
  }, [devotional]);

  // Find daily reading for selected day
  const activeReading = useMemo(() => {
    if (!devotional?.readings) return null;
    return devotional.readings.find((r) => Number(r.day) === selectedDay);
  }, [devotional, selectedDay]);

  const toggleReference = (refId: number, currentStatus: boolean) => {
    setCompletedRefs((prev) => ({
      ...prev,
      [refId]: !currentStatus,
    }));
  };

  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-5'>
        <ActivityIndicator size='large' className='text-primary' />
      </SafeAreaView>
    );
  }

  if (error || !devotional) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-5'>
        <Ionicons name='book-outline' size={48} color='gray' />
        <Text className='text-foreground/70 font-sans text-base my-3 text-center'>
          {error || "Devotional not found."}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className='bg-primary px-4 py-2.5 rounded-xl'>
          <Text className='text-white font-sans-bold'>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Paywall guard for locked content
  if (devotional.isPaid) {
    return (
      <SafeAreaView className='flex-1 bg-background p-5 justify-between'>
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

        <View className='bg-card border border-border p-6 rounded-2xl items-center my-auto'>
          <View className='w-16 h-16 rounded-full bg-primary/20 items-center justify-center mb-4'>
            <Ionicons name='lock-closed' size={32} color='#0284C7' />
          </View>
          <Text className='text-xl font-sans-bold text-foreground mb-2 text-center'>
            {devotional.title}
          </Text>
          <Text className='text-sm font-sans text-foreground/70 text-center mb-6 leading-5'>
            {devotional.description ||
              "This devotional is part of our premium content subscription. Unlock access to continue reading."}
          </Text>
          <TouchableOpacity
            onPress={() => {
              /* Handle purchase or subscription navigation */
            }}
            className='bg-primary w-full py-3.5 rounded-xl items-center'>
            <Text className='text-white font-sans-bold text-base'>
              Unlock Devotional
            </Text>
          </TouchableOpacity>
        </View>
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
        {daysInMonth.length > 0 && (
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
        )}

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
            {activeReading.scriptureRef || activeReading.scriptureText ? (
              <View className='bg-background/80 border-l-4 border-primary p-4 rounded-r-xl mb-5'>
                {activeReading.scriptureRef ? (
                  <Text className='text-sm font-sans-bold text-primary mb-1'>
                    {activeReading.scriptureRef}
                  </Text>
                ) : null}
                {activeReading.scriptureText ? (
                  <Text className='text-sm font-sans italic text-foreground/80 leading-5'>
                    &quot;{activeReading.scriptureText}&quot;
                  </Text>
                ) : null}
              </View>
            ) : null}

            {/* Reflection Body */}
            {activeReading.reflection ? (
              <View className='mb-5'>
                <Text className='text-sm font-sans-bold text-foreground/50 uppercase mb-2'>
                  Reflection
                </Text>
                <Text className='text-base font-sans text-foreground/90 leading-7'>
                  {activeReading.reflection}
                </Text>
              </View>
            ) : null}

            {/* Prayer */}
            {activeReading.prayer ? (
              <View className='bg-primary/10 p-4 rounded-xl border border-primary/20 mb-5'>
                <Text className='text-sm font-sans-bold text-primary uppercase mb-1.5'>
                  Prayer
                </Text>
                <Text className='text-base font-sans italic text-foreground/90 leading-6'>
                  {activeReading.prayer}
                </Text>
              </View>
            ) : null}

            {/* Daily Scripture References with Checkboxes */}
            {activeReading.bibleReadings &&
              activeReading.bibleReadings.length > 0 && (
                <View className='bg-background/50 border border-border p-4 rounded-xl'>
                  <Text className='text-xs font-sans-bold text-foreground/60 uppercase mb-3'>
                    Further Scripture Reading
                  </Text>
                  {activeReading.bibleReadings.map((item, index) => {
                    const isChecked =
                      completedRefs[item.id] ?? item.isCompleted ?? false;
                    const isLast =
                      index === (activeReading.bibleReadings?.length ?? 0) - 1;

                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => toggleReference(item.id, isChecked)}
                        activeOpacity={0.7}
                        className={`flex-row items-center py-2 ${
                          !isLast ? "border-b border-border/40" : ""
                        }`}>
                        <View
                          className={`w-5 h-5 rounded-md border items-center justify-center mr-3 ${
                            isChecked
                              ? "bg-primary border-primary"
                              : "border-foreground/30 bg-card"
                          }`}>
                          {isChecked && (
                            <Ionicons
                              name='checkmark'
                              size={14}
                              color='#FFFFFF'
                            />
                          )}
                        </View>
                        <Text
                          className={`text-sm font-sans flex-1 ${
                            isChecked
                              ? "line-through text-foreground/40"
                              : "text-foreground/90"
                          }`}>
                          {item.reference}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
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
