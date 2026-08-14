import "@/global.css";
import { tokenCache } from "@clerk/expo/token-cache";
import {ClerkProvider} from '@clerk/expo';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Text, View } from "react-native";
import { PostHogErrorBoundary, PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";

import { posthog } from "@/lib/posthog";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const routes = (
    <Stack initialRouteName='(tabs)' screenOptions={{ headerShown: false }} />
  );

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {posthog ? (
        <PostHogProvider client={posthog}>
          <PostHogErrorBoundary fallback={RootErrorFallback}>
            {routes}
          </PostHogErrorBoundary>
        </PostHogProvider>
      ) : (
        routes
      )}
    </ClerkProvider>
  );
}

function RootErrorFallback() {
  return (
    <View>
      <Text>Something went wrong. Please restart the app.</Text>
    </View>
  );
}
