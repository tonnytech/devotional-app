import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import React from "react";
import { Pressable, Text, View } from "react-native";

// AnnouncementCardProps
// Category Icon & Accent Color Config
const CATEGORY_CONFIG: Record<
  string,
  {
    icon: keyof typeof Ionicons.glyphMap;
    bg: string;
    text: string;
    border: string;
  }
> = {
  Weddings: {
    icon: "heart-outline",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
  },
  Evangelism: {
    icon: "megaphone-outline",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  "Community Service": {
    icon: "people-outline",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  default: {
    icon: "notifications-outline",
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
  },
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  location,
  announcementDate,
  time,
  description,
  category = "General",
  expanded = false,
  onPress,
}) => {
  const config = CATEGORY_CONFIG[category ?? "General"] || CATEGORY_CONFIG.default;

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "p-4 rounded-2xl border bg-card transition-all",
        expanded ? "border-primary/50 shadow-sm" : "border-border",
      )}>
      {/* --- UNCOLLAPSED / SUMMARY VIEW --- */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-1 pr-3'>
          {/* Category Pill Tag */}
          <View className='flex-row items-center mb-1.5 self-start'>
            <View
              className={clsx(
                "flex-row items-center px-2.5 py-0.5 rounded-full border",
                config.bg,
                config.border,
              )}>
              <Ionicons
                name={config.icon}
                size={12}
                className={clsx("mr-1", config.text)}
                color='currentColor'
              />
              <Text className={clsx("text-xs font-sans-bold", config.text)}>
                {category}
              </Text>
            </View>
          </View>

          {/* Event Name / Title */}
          <Text
            numberOfLines={expanded ? undefined : 1}
            className='text-base font-sans-bold text-foreground mb-1'>
            {title}
          </Text>

          {/* Date & Time Row (Visible when uncollapsed) */}
          <View className='flex-row items-center'>
            <Ionicons
              name='calendar-outline'
              size={13}
              color='gray'
              className='mr-1 text-foreground/50'
            />
            <Text className='text-xs font-sans text-foreground/60'>
              {[announcementDate, time].filter(Boolean).join(" • ")}
            </Text>
          </View>
        </View>

        {/* Chevron Expand/Collapse Indicator */}
        <View className='p-2 rounded-full bg-background border border-border'>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color='currentColor'
            className='text-foreground/70'
          />
        </View>
      </View>

      {/* --- EXPANDED DETAILS VIEW --- */}
      {expanded && (
        <View className='mt-4 pt-3 border-t border-border'>
          {/* Detailed Description */}
          {description ? (
            <Text className='text-sm font-sans text-foreground/80 leading-5 mb-4'>
              {description}
            </Text>
          ) : null}

          {/* Location & Time Breakdown Box */}
          <View className='bg-background/80 p-3 rounded-xl border border-border/60 gap-y-2'>
            {location ? (
              <View className='flex-row justify-between items-center'>
                <Text className='text-xs font-sans text-foreground/50'>
                  Location:
                </Text>
                <Text className='text-xs font-sans-bold text-foreground'>
                  {location}
                </Text>
              </View>
            ) : null}

            {announcementDate ? (
              <View className='flex-row justify-between items-center'>
                <Text className='text-xs font-sans text-foreground/50'>
                  Date:
                </Text>
                <Text className='text-xs font-sans-bold text-foreground'>
                  {announcementDate}
                </Text>
              </View>
            ) : null}

            {time ? (
              <View className='flex-row justify-between items-center'>
                <Text className='text-xs font-sans text-foreground/50'>
                  Time:
                </Text>
                <Text className='text-xs font-sans-bold text-foreground'>
                  {time}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default AnnouncementCard;
