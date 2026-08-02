import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample Reading Plans Data
const FEATURED_PLANS = [
  {
    id: "1",
    title: "Finding Peace in Anxious Times",
    days: "7 Days",
    category: "Peace & Comfort",
  },
  {
    id: "2",
    title: "Walking by Faith, Not Sight",
    days: "14 Days",
    category: "Faith",
  },
  {
    id: "3",
    title: "The Power of Morning Prayer",
    days: "5 Days",
    category: "Prayer",
  },
];

export default function HomeScreen() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <SafeAreaView className='flex-1 bg-slate-50' edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className='px-5 pt-4'>
        {/* Header Section */}
        <View className='flex-row items-center justify-between mb-6'>
          <View>
            <Text className='text-xs font-semibold tracking-wider text-indigo-600 uppercase'>
              {getGreeting()}
            </Text>
            <Text className='text-2xl font-bold text-slate-800'>
              Daily Devotional
            </Text>
          </View>
          {/* Profile Quick Link */}
          <TouchableOpacity className='w-10 h-10 rounded-full bg-indigo-100 items-center justify-center border border-indigo-200'>
            <Text className='text-indigo-700 font-bold text-base'>J</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Verse of the Day Card */}
        <View className='bg-indigo-900 rounded-3xl p-6 mb-6 shadow-lg shadow-indigo-900/20 relative overflow-hidden'>
          {/* Background Decorative Element */}
          <View className='absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-indigo-800/40' />

          <View className='flex-row justify-between items-center mb-3'>
            <View className='bg-white/10 px-3 py-1 rounded-full'>
              <Text className='text-indigo-200 text-xs font-medium'>
                Verse of the Day
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsBookmarked(!isBookmarked)}
              className='p-1'>
              <Text className='text-lg'>{isBookmarked ? "🔖" : "🏷️"}</Text>
            </TouchableOpacity>
          </View>

          <Text className='text-white text-lg font-serif italic leading-7 mb-4'>
            &quot;The Lord is my shepherd; I shall not want. He makes me lie down in
            green pastures. He leads me beside still waters.&quot;
          </Text>

          <Text className='text-indigo-200 font-semibold text-right text-sm'>
            Psalm 23:1-2
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
