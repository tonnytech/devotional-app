import DevotionalCard from "@/components/DevotionalCard";
import PageHeader from "@/components/PageHeader";
import { DEVOTIONALS } from "@/constants/data";
import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type FilterTab = "all" | "paid" | "unpaid";

const Devotionals = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredDevotionals = useMemo(() => {
    const q = query.trim().toLowerCase();

    return DEVOTIONALS.filter((item) => {
      // 1. Filter by Active Tab (all, paid, unpaid)
      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "paid"
            ? item.isPaid
            : !item.isPaid;

      // 2. Filter by Search Query
      const matchesQuery =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.month?.toLowerCase().includes(q) ||
        item.year?.toString().includes(q);

      return matchesTab && matchesQuery;
    });
  }, [query, activeTab]);

  const tabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
  ];

  return (
    <SafeAreaView className='p-5 bg-background flex-1'>
      {/* Header Component */}

      <PageHeader title='Devotionals' />

      {/* Search Bar */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder='Search devotionals by title, month, or year...'
        placeholderTextColor='rgba(0,0,0,0.4)'
        className='rounded-xl border border-border p-3 my-4 bg-card text-foreground'
      />

      {/* Segmented Filter Menu (All / Paid / Unpaid) */}
      <View className='flex-row bg-card p-1 rounded-xl mb-4 border border-border'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <TouchableOpacity
              key={tab.value}
              onPress={() => setActiveTab(tab.value)}
              className={`flex-1 py-2 rounded-lg items-center justify-center ${
                isActive ? "bg-primary" : "bg-transparent"
              }`}>
              <Text
                className={`font-sans-bold text-sm ${
                  isActive ? "text-white" : "text-foreground opacity-70"
                }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Devotionals List */}
      <FlatList
        data={filteredDevotionals}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <DevotionalCard devotional={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <View className='py-10 items-center'>
            <Text className='text-foreground/50 font-sans'>
              No devotionals found.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Devotionals;
