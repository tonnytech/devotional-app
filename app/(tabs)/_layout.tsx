import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import clsx from "clsx";
import {components} from "@/constants/theme"
import { tabs } from "@/constants/data";

const ACTIVE_COLOR = "#4F46E5";
const INACTIVE_COLOR = "#94A3B8";

const tabBar = components.tabBar;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const TabIcon = ({
    focused,
    icon,
  }: {
    focused: boolean;
    icon: any;
  }) => (
    <View className='items-center justify-center pt-1'>
      {/* Active Pill Accent */}
      <View
        className={clsx(
          "items-center justify-center rounded-xl transition-all",
          focused ? "bg-indigo-50" : "bg-transparent",
        )}
        style={{
          width: 44,
          height: 28,
        }}>
        <Image
          source={icon}
          resizeMode='contain'
          style={{
            width: 22,
            height: 22,
            tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
          }}
        />
      </View>

      {/* Label Text */}
      <Text
        style={{
          marginTop: 2,
          fontSize: 11,
          fontWeight: focused ? "600" : "500",
          color: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
        }}>
      </Text>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // Standard docked positioning at the bottom edge
          position: "relative",
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          elevation: 8,
          shadowColor: "#000000",
          shadowOpacity: 0.04,
          shadowRadius: 6,
          shadowOffset: {
            width: 0,
            height: -2,
          },
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          marginTop: tabBar.itemPaddingVertical
        },
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon}  />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
