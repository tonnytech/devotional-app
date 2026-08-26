import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export interface ListHeadingProps {
  title: string;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

const ListHeading: React.FC<ListHeadingProps> = ({
  title,
  onViewAll,
  showViewAll = true,
}) => {
  return (
    <View className='flex-row items-center justify-between my-5 px-1'>
      {/* Styled Heading Title */}
      <Text className='text-lg font-sans-bold text-foreground tracking-tight'>
        {title}
      </Text>

      {/* Styled Action Button */}
      {showViewAll && (
        <TouchableOpacity
          onPress={onViewAll}
          activeOpacity={0.7}
          className='px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20'>
          <Text className='text-xs font-sans-bold text-primary'>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListHeading;
