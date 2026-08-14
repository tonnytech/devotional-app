import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcommingSubscriptionCard from "@/components/UpcommingSubscriptionCard";
import {
    HOME_BALANCE,
    HOME_SUBSCRIPTIONS,
    HOME_USER,
    UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import { formatCurrency } from "@/lib/utils";
import { posthog } from "@/lib/posthog";
import dayjs from "dayjs";
import { styled } from "nativewind";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className='home-header'>
              <View className='home-user'>
                <Image source={images.avartar} className='home-avatar' />
                <Text className='home-user-name'>{HOME_USER.name}</Text>
              </View>
              <Image source={icons.add} className='home-add-icon' />
            </View>
            <View className='home-balance-card'>
              <Text className='home-balance-label'>Balance</Text>
              <View className='home-balance-row'>
                <Text className='home-balance-amount'>
                  {" "}
                  {formatCurrency(HOME_BALANCE.amount)}
                </Text>
                <Text className='home-balance-date'>
                  {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                </Text>
              </View>
            </View>

            <View>
              <ListHeading title='Upcoming' />
              <FlatList
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({ item }: { item: any }) => (
                  <UpcommingSubscriptionCard {...item} />
                )}
                keyExtractor={(item: any) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                  <Text className='home-empty-state'>
                    No upcoming renewals yet...
                  </Text>
                }
              />
            </View>

            <ListHeading title='All subscriptions' />
          </>
        )}
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() => {
              const isExpanded = expandedSubscriptionId === item.id;
              posthog?.capture("subscription_details_toggled", {
                subscription_id: item.id,
                is_expanded: !isExpanded,
              });
              setExpandedSubscriptionId(isExpanded ? null : item.id);
            }}
          />
        )}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className='h-4' />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className='home-empty-state'>No subscription yet</Text>
        }
        contentContainerClassName="pb-30"
      />
    </SafeAreaView>
  );
}
