import { useAuth } from "@clerk/expo";
import clsx from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";

const tabBar = components.tabBar;

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
}

// Extracted TabIcon outside the component to prevent re-creation on every render cycle
const TabIcon: React.FC<TabIconProps> = ({ focused, icon }) => {
  return (
    <View className='tabs-icon items-center justify-center'>
      <View
        className={clsx(
          "tabs-pill p-2 rounded-full",
          focused && "tabs-active bg-white/20",
        )}>
        <Image
          source={icon}
          resizeMode='contain'
          className='tabs-glyph w-6 h-6'
          style={{
            tintColor: focused ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
          }}
        />
      </View>
    </View>
  );
};

const TabLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const insets = useSafeAreaInsets();

  // Show centered loader while Clerk checks auth state
  if (!isLoaded) {
    return (
      <View className='flex-1 bg-background justify-center items-center'>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  // Redirect to Sign-in if unauthorized
  if (!isSignedIn) {
    return <Redirect href='/(auth)/sign-in' />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: "center",
          justifyContent: "center",
        },
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            // Hides screen from tab bar if marked hidden in constants
            href: tab.hidden ? null : undefined,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
