import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className='mb-4 bg-card rounded-2xl border border-border overflow-hidden flex-row p-3 items-center'>
      {/* Devotional Image */}
      <View className='relative'>
        <Image
          source={{ uri: devotional.imageUrl }}
          className='w-20 h-24 rounded-xl bg-border'
          resizeMode='cover'
        />

        {/* Padlock Icon for Unpaid / Locked Devotionals */}
        {!devotional.isPaid && (
          <View className='absolute top-2 left-2 bg-black/60 p-1.5 rounded-full'>
            <Ionicons name='lock-closed' size={14} color='#FFFFFF' />
          </View>
        )}
      </View>

      {/* Devotional Information */}
      <View className='flex-1 ml-3 justify-center'>
        <View className='flex-row justify-between items-center mb-1'>
          <Text className='text-xs text-primary font-sans-bold uppercase'>
            {devotional.month} {devotional.year}
          </Text>
        </View>

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
