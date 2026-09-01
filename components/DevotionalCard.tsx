import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import images from "@/constants/images";
import { Devotional } from "@/types/api";

interface DevotionalCardProps {
  devotional: Devotional;
  onPress?: () => void;
}

const DevotionalCard: React.FC<DevotionalCardProps> = ({
  devotional,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/devotional/${devotional.id}`);
    }
  };

  const formattedDate = [devotional.month, devotional.year]
    .filter(Boolean)
    .join(" ");

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className='mb-4 bg-card rounded-2xl border border-border overflow-hidden flex-row p-3 items-center'>
      {/* Devotional Cover Image */}
      <View className='relative'>
        <Image
          source={
            devotional.imageUrl
              ? { uri: devotional.imageUrl }
              : images.splashPattern || undefined
          }
          className='w-20 h-24 rounded-xl bg-border'
          resizeMode='cover'
        />

        {/* Lock Icon for Paid / Locked Devotionals */}
        {devotional.isPaid ? (
          <View className='absolute top-2 left-2 bg-black/60 p-1.5 rounded-full'>
            <Ionicons name='lock-closed' size={14} color='#FFFFFF' />
          </View>
        ) : null}
      </View>

      {/* Devotional Details */}
      <View className='flex-1 ml-3 justify-center'>
        {formattedDate ? (
          <View className='flex-row justify-between items-center mb-1'>
            <Text className='text-xs text-primary font-sans-bold uppercase'>
              {formattedDate}
            </Text>
          </View>
        ) : null}

        <Text
          className='text-base font-sans-bold text-foreground mb-1'
          numberOfLines={1}>
          {devotional.title}
        </Text>

        <Text
          className='text-xs text-foreground/60 font-sans leading-4'
          numberOfLines={2}>
          {devotional.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DevotionalCard;
