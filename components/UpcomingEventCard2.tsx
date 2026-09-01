import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EventItem } from "@/types/api";
import { formatDateTime } from "@/lib/utils";

// Helper function to calculate days remaining until the event date
const getDaysLeft = (dateInput: string | Date): number | null => {
  if (!dateInput) return null;

  const rawString =
    typeof dateInput === "string" ? dateInput.trim() : dateInput.toISOString();
  const datePart = rawString.split("T")[0];

  const parts = datePart.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;

  const [year, month, day] = parts;

  // Construct pure local midnight dates
  const eventDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = eventDate.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

interface UpcomingEventCardProps {
  event: EventItem;
}

const UpcomingEventCard = ({ event }: UpcomingEventCardProps) => {
  const { title, eventDate, eventTime, location, description } = event;
  const daysLeft = getDaysLeft(eventDate);

  // Status configuration for the pill badge
  // Adjusted for better contrast in both light and dark themes
  const getBadgeStyle = () => {
    if (daysLeft === null) return null;
    if (daysLeft < 0) {
      return {
        bg: "bg-rose-500/10 border-rose-500/20",
        text: "text-rose-500",
        label: "Ended",
      };
    }
    if (daysLeft === 0) {
      return {
        bg: "bg-emerald-500/10 border-emerald-500/20",
        text: "text-emerald-500",
        label: "Today",
      };
    }
    if (daysLeft === 1) {
      return {
        bg: "bg-amber-500/10 border-amber-500/20",
        text: "text-amber-600 dark:text-amber-400",
        label: "Tomorrow",
      };
    }
    if (daysLeft <= 3) {
      return {
        bg: "bg-amber-500/10 border-amber-500/20",
        text: "text-amber-600 dark:text-amber-400",
        label: `${daysLeft} days left`,
      };
    }
    return {
      bg: "bg-primary/10 border-primary/20",
      text: "text-primary",
      label: `${daysLeft} days left`,
    };
  };

  const badge = getBadgeStyle();

  return (
    <View className='w-72 bg-card rounded-2xl p-4 border border-border justify-between shadow-sm'>
      {/* Top Header: Date/Time Info & Countdown Badge */}
      <View className='flex-row justify-between gap-0.5 items-start mb-3.5'>
        {/* Date & Time Container */}
        <View className='flex-row items-center bg-background px-3 py-2 rounded-xl border border-border gap-x-2'>
          <Ionicons
            name='calendar-outline'
            size={14}
            color='currentColor'
            className='text-foreground/70'
          />
          <View>
            <Text className='text-foreground text-xs font-sans-bold leading-4'>
              {formatDateTime(eventDate)}
            </Text>
            {eventTime ? (
              <Text className='text-foreground/60 text-[10px] font-sans leading-3 mt-0.5'>
                {eventTime}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Days Left Status Badge */}
        {badge && (
          <View
            className={`flex-row items-center bg-background px-2.5 py-2.5 rounded-xl border border-border ${badge.bg}`}>
            <Text className={`text-[11px] font-sans-bold ${badge.text}`}>
              {badge.label}
            </Text>
          </View>
        )}
      </View>

      {/* Main Body Details */}
      <View className='mb-1'>
        <Text
          className='text-foreground font-sans-bold text-base mb-1.5 tracking-tight'
          numberOfLines={1}>
          {title}
        </Text>

        {description ? (
          <Text
            className='text-foreground/70 text-xs font-sans leading-4 mb-3'
            numberOfLines={2}>
            {description}
          </Text>
        ) : null}

        {/* Location Footer */}
        {location ? (
          <View className='flex-row items-center mt-1 bg-background py-1.5 px-2.5 rounded-lg border border-border self-start'>
            <Ionicons
              name='location-sharp'
              size={12}
              color='currentColor'
              className='text-primary'
            />
            <Text
              className='text-foreground/80 text-[11px] font-sans-bold ml-1.5'
              numberOfLines={1}>
              {location}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default UpcomingEventCard;
