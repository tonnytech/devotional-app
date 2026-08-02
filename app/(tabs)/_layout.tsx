import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import clsx from "clsx";

import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";

const ACTIVE_COLOR = "#4F46E5";
const INACTIVE_COLOR = "#94A3B8";

const tabBar = components.tabBar
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const TabIcon = ({
    focused,
    icon,
  }: {
    focused: boolean;
    icon: any;
  }) => (
    <View className='items-center justify-center'>
      <View
        className={clsx(
          "items-center justify-center rounded-full",
          focused && "bg-indigo-100",
        )}
        style={{
          width: 48,
          height: 48,
        }}>
        <Image
          source={icon}
          resizeMode='contain'
          style={{
            width: 24,
            height: 24,
            tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
          }}
        />
      </View>

      {/* <Text
        style={{
          marginTop: 2,
          fontSize: 11,
          fontWeight: focused ? "700" : "500",
          color: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
        }}>
        {title}
      </Text> */}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: Math.max(insets.bottom, 16),
          height: 74,
          borderRadius: 22,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: 'center'
        }
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,

            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
