import React from "react";
import { Text, View } from "react-native";
import { EventItem } from "@/types/api";

// Helper function to calculate days remaining until the event date
const getDaysLeft = (dateString: string): number | null => {
  if (!dateString) return null;
  const eventDate = new Date(dateString);
  const today = new Date();

  // Reset time portions for accurate day comparison
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

interface UpcomingEventCardProps {
  event: EventItem;
}

const UpcomingEventCard = ({ event }: UpcomingEventCardProps) => {
  const { name, eventDate, eventTime, location, description } = event;
  const daysLeft = getDaysLeft(eventDate);

  return (
    <View className='w-64 bg-slate-800 rounded-2xl p-4 mr-4 shadow-sm border border-slate-700/50 justify-between'>
      {/* Top Row: Date Badge & Calculated Days Left Tag */}
      <View className='flex-row justify-between items-start mb-3'>
        <View className='flex-row items-center bg-slate-700/60 px-3 py-1.5 rounded-xl'>
          <Text className='text-slate-200 text-xs font-semibold'>
            {eventDate} {eventTime ? `• ${eventTime}` : ""}
          </Text>
        </View>

        {daysLeft !== null && daysLeft >= 0 && (
          <View
            className={`px-2.5 py-1 rounded-full ${
              daysLeft <= 2 ? "bg-amber-500/20" : "bg-indigo-500/20"
            }`}>
            <Text
              className={`text-xs font-bold ${
                daysLeft <= 2 ? "text-amber-400" : "text-indigo-300"
              }`}>
              {daysLeft === 0
                ? "Today"
                : daysLeft === 1
                  ? "Tomorrow"
                  : `${daysLeft} dys left`}
            </Text>
          </View>
        )}
      </View>

      {/* Event Details */}
      <View className='mb-2'>
        <Text className='text-white font-bold text-base mb-1' numberOfLines={1}>
          {name}
        </Text>

        {description ? (
          <Text className='text-slate-400 text-xs mb-2' numberOfLines={2}>
            {description}
          </Text>
        ) : null}

        <View className='flex-row items-center'>
          <Text
            className='text-slate-400 text-xs font-medium'
            numberOfLines={1}>
            📍 {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingEventCard;
