import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { BLOGS_DATA } from "@/constants/data";

const SafeAreaView = styled(RNSafeAreaView);


const BlogDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const blog = useMemo(() => {
    return BLOGS_DATA.find((item) => item.id === id);
  }, [id]);

  const handleShare = async () => {
    if (!blog) return;
    try {
      await Share.share({
        message: `Check out this article: "${blog.title}" by ${blog.author}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!blog) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-5'>
        <Ionicons name='document-text-outline' size={48} color='gray' />
        <Text className='text-foreground/70 font-sans text-base my-3'>
          Blog article not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className='bg-primary px-4 py-2.5 rounded-xl'>
          <Text className='text-white font-sans-bold'>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      {/* Top Header Navigation */}
      <View className='flex-row items-center justify-between mb-4'>
        <TouchableOpacity
          onPress={() => router.back()}
          className='p-2 rounded-full bg-card border border-border'>
          <Ionicons
            name='chevron-back'
            size={20}
            color='currentColor'
            className='text-foreground'
          />
        </TouchableOpacity>

        <Text className='text-base font-sans-bold text-foreground'>
          Blog Post
        </Text>

        <TouchableOpacity
          onPress={handleShare}
          className='p-2 rounded-full bg-card border border-border'>
          <Ionicons
            name='share-social-outline'
            size={20}
            color='currentColor'
            className='text-foreground'
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View className='relative rounded-2xl overflow-hidden mb-4 h-52 bg-border'>
          <Image
            source={{ uri: blog.imageUrl ?? undefined }}
            className='w-full h-full'
            resizeMode='cover'
          />
          <View className='absolute top-3 left-3 bg-primary px-3 py-1 rounded-full'>
            <Text className='text-xs font-sans-bold text-white uppercase'>
              {blog.category}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text className='text-2xl font-sans-bold text-foreground mb-4 leading-8'>
          {blog.title}
        </Text>

        {/* Author & Meta Banner */}
        <View className='flex-row items-center bg-card border border-border p-3 rounded-2xl mb-6'>
          <View className='w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3'>
            <Ionicons
              name='person'
              size={20}
              color='currentColor'
              className='text-primary'
            />
          </View>
          <View className='flex-1'>
            <Text className='text-sm font-sans-bold text-foreground'>
              {blog.author}
            </Text>
            {blog.authorRole && (
              <Text className='text-xs font-sans text-foreground/60'>
                {blog.authorRole}
              </Text>
            )}
          </View>
          <Text className='text-xs font-sans text-foreground/50'>
            {blog.date} • {blog.readTime}
          </Text>
        </View>

        {/* Article Body */}
        <View className='mb-6'>
          {blog.content.split("\n\n").map((paragraph, index) => (
            <Text
              key={index}
              className='text-base font-sans text-foreground/90 leading-6 mb-4'>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Key Takeaways Card */}
        {blog.takeaways && blog.takeaways.length > 0 && (
          <View className='bg-card border border-border p-5 rounded-2xl mb-8'>
            <View className='flex-row items-center mb-3'>
              <Ionicons
                name='bulb-outline'
                size={20}
                color='currentColor'
                className='text-primary mr-2'
              />
              <Text className='text-sm font-sans-bold text-primary uppercase'>
                Key Takeaways
              </Text>
            </View>

            {blog.takeaways.map((item, idx) => (
              <View key={idx} className='flex-row items-start mb-2 last:mb-0'>
                <Text className='text-primary font-sans-bold mr-2'>•</Text>
                <Text className='text-sm font-sans text-foreground/80 flex-1 leading-5'>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogDetail;
