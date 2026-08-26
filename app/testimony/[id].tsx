import { TESTIMONIES_DATA } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const TestimonyDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [hasPraised, setHasPraised] = useState(false);

  const testimony = useMemo(() => {
    return TESTIMONIES_DATA.find((item) => item.id === Number(id));
  }, [id]);

  const handleShare = async () => {
    if (!testimony) return;
    try {
      await Share.share({
        message: `Read this encouraging testimony: "${testimony.title}" by ${testimony.testifier_name}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!testimony) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center p-5'>
        <Ionicons name='alert-circle-outline' size={48} color='gray' />
        <Text className='text-foreground/70 font-sans text-base my-3'>
          Testimony not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className='bg-primary px-4 py-2.5 rounded-xl'>
          <Text className='text-white font-sans-bold'>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentLikes = hasPraised
    ? (testimony.likesCount ?? 0) + 1
    : (testimony.likesCount ?? 0);

  return (
    <SafeAreaView className='flex-1 bg-background p-5'>
      {/* Header Bar */}
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
          Testimony
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
        {/* Category & Date */}
        <View className='flex-row justify-between items-center mb-2'>
          <View className='bg-primary/10 px-3 py-1 rounded-full border border-primary/20'>
            <Text className='text-xs font-sans-bold text-primary'>
              {testimony.category}
            </Text>
          </View>

          <Text className='text-xs font-sans text-foreground/50'>
            {`${testimony.createdAt} • ${testimony.readTime}`}
          </Text>
        </View>

        {/* Title */}
        <Text className='text-2xl font-sans-bold text-foreground mb-4 leading-8'>
          {testimony.title}
        </Text>

        {/* Author Details Card */}
        <View className='flex-row items-center bg-card border border-border p-3 rounded-2xl mb-5'>
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
              {testimony.testifier_name}
            </Text>
            {testimony.testifier_location && (
              <Text className='text-xs font-sans text-foreground/60'>
                {testimony.testifier_location}
              </Text>
            )}
          </View>
        </View>

        {/* Scripture Anchor / Key Verse */}
        {testimony.keyVerse && (
          <View className='bg-card border-l-4 border-primary p-4 rounded-r-2xl border border-border mb-6'>
            <Text className='text-xs font-sans-bold text-primary uppercase mb-1'>
              Anchor Scripture
            </Text>
            <Text className='text-sm font-sans italic text-foreground/80 leading-5'>
              &quot;{testimony.keyVerse}&quot;
            </Text>
          </View>
        )}

        {/* Narrative Body */}
        <View className='mb-8'>
          {testimony.content.split("\n\n").map((paragraph, index) => (
            <Text
              key={index}
              className='text-base font-sans text-foreground/90 leading-6 mb-4'>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Praise God / Reaction Button */}
        <View className='bg-card border border-border p-5 rounded-2xl items-center mb-8'>
          <Text className='text-xs font-sans text-foreground/60 mb-3 text-center'>
            Inspired by this testimony? Give thanks to God together!
          </Text>

          <TouchableOpacity
            onPress={() => setHasPraised(!hasPraised)}
            activeOpacity={0.8}
            className={`flex-row items-center px-5 py-3 rounded-xl ${
              hasPraised
                ? "bg-primary"
                : "bg-primary/10 border border-primary/30"
            }`}>
            <Ionicons
              name={hasPraised ? "heart" : "heart-outline"}
              size={20}
              color={hasPraised ? "#FFFFFF" : "#0284C7"}
              className='mr-2'
            />
            <Text
              className={`font-sans-bold text-sm ${
                hasPraised ? "text-white" : "text-primary"
              }`}>
              Praise God! ({currentLikes})
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestimonyDetail;
