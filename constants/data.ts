import { icons } from "./icons";

export interface TabItem {
  name: string;
  title: string;
  icon: any; // Or ImageSourcePropType from 'react-native'
}

export const tabs: TabItem[] = [
  {
    name: "index",
    title: "Daily",
    icon: icons.home,
  },
  {
    name: "plans",
    title: "Plans",
    icon: icons.wallet,
  },
  {
    name: "journal",
    title: "Journal",
    icon: icons.activity,
  },
  {
    name: "profile",
    title: "Profile",
    icon: icons.setting,
  },
];
