import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";


const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({
  blog,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/(blogs)/${blog.id}` as any); // Navigates to [id].tsx
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className='bg-prev-card border border-prev-card-border rounded-2xl p-4 shadow-md active:opacity-90'>
      {/* Optional Cover Image */}
      {blog.coverImage && (
        <View className='w-full h-40 rounded-xl overflow-hidden mb-3.5 bg-prev-chip'>
          <Image
            source={
              typeof blog.coverImage === "string"
                ? { uri: blog.coverImage }
                : blog.coverImage
            }
            className='w-full h-full'
            resizeMode='cover'
          />
        </View>
      )}

      {/* Meta Header: Category Badge + Read Time */}
      <View className='flex-row items-center justify-between mb-2'>
        <View className='bg-prev-chip px-2.5 py-1 rounded-lg'>
          <Text className='text-prev-accent text-xs font-sans-semibold'>
            {blog.category}
          </Text>
        </View>
        <Text className='text-prev-subtext text-xs font-sans-medium'>
          {blog.readTime}
        </Text>
      </View>

      {/* Title */}
      <Text
        numberOfLines={2}
        className='font-sans-bold text-lg text-prev-text mb-1.5 leading-6'>
        {blog.title}
      </Text>

      {/* Excerpt / Snippet */}
      <Text
        numberOfLines={2}
        className='font-sans-regular text-xs text-prev-subtext leading-5'>
        {blog.snippet}
      </Text>

      {/* Footer: Read More Arrow CTA */}
      <View className='flex-row items-center justify-between mt-3 pt-3 border-t border-prev-card-border/50'>
        <Text className='text-prev-subtext text-xs font-sans-medium'>
          {blog.publishedAt || blog.author || "Featured Article"}
        </Text>
        <Text className='text-prev-accent text-xs font-sans-bold'>
          Read Article →
        </Text>
      </View>
    </Pressable>
  );
};

export default FeaturedBlogCard;
