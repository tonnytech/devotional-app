import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  rightElement,
}) => {
  const router = useRouter();

  return (
    <View className='mb-4'>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center flex-1'>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              className='mr-3 p-2 rounded-full bg-card border border-border'
              activeOpacity={0.7}>
              <Ionicons
                name='chevron-back'
                size={20}
                color='currentColor'
                className='text-foreground'
              />
            </TouchableOpacity>
          )}

          <Text className='text-2xl font-sans-bold text-primary tracking-tight'>
            {title}
          </Text>
        </View>

        {rightElement && <View>{rightElement}</View>}
      </View>

      {subtitle && (
        <Text className='text-sm font-sans text-foreground/60 mt-1'>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default PageHeader;
