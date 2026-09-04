import { icons } from "./icons";
import type { SvgProps } from "react-native-svg";
import HomeIcon from "@/assets/icons/home.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import BookIcon from "@/assets/icons/book.svg";
import ChatIcon from "@/assets/icons/chat.svg";
import SettingIcon from "@/assets/icons/setting.svg";

export const tabs: TabItem[] = [
  { name: "index", title: "Home", icon: HomeIcon },
  { name: "calendar", title: "Calendar", icon: CalendarIcon },
  { name: "subscriptions", title: "Subscriptions", icon: BookIcon },
  { name: "insights", title: "Insights", icon: ChatIcon },
  { name: "settings", title: "Settings", icon: SettingIcon },
];

// export const tabs: TabItem[] = [
//   { name: "index", title: "Home", icon: icons.home },
//   { name: "calendar", title: "Calendar", icon: icons.add },
//   { name: "subscriptions", title: "Subscriptions", icon: icons.book },
//   { name: "insights", title: "Insights", icon: icons.chat },
//   { name: "settings", title: "Settings", icon: icons.setting },
// ];
// {
// id: "1",
// title: "Healed from Chronic Illness",
// snippet:
// "A powerful story of divine healing after years of struggling with continuous pain.",
// author: "Michael K.",
// date: "Jul 28, 2026",
// readTime: "6 min read",
// },
// {
// id: "2",
// title: "Restoration of My Family",
// snippet:
// "How faith and patience brought reconciliation to our broken marriage.",
// author: "Grace M.",
// date: "Jul 15, 2026",
// readTime: "7 min read",
// },
// ];

// export const UPCOMING_SUBSCRIPTIONS: UpcomingSubscription[] = [
//   {
//     id: "spotify",
//     icon: icons.spotify,
//     name: "Spotify",
//     price: 5.99,
//     currency: "USD",
//     daysLeft: 2,
//   },
//   {
//     id: "notion",
//     icon: icons.notion,
//     name: "Notion",
//     price: 12.0,
//     currency: "USD",
//     daysLeft: 4,
//   },
//   {
//     id: "figma",
//     icon: icons.figma,
//     name: "Figma",
//     price: 15.0,
//     currency: "USD",
//     daysLeft: 6,
//   },
// ];

// export const HOME_SUBSCRIPTIONS: Subscription[] = [
// {
// id: "adobe-creative-cloud",
// icon: icons.adobe,
// name: "Adobe Creative Cloud",
// plan: "Teams Plan",
// category: "Design",
// paymentMethod: "Visa ending in 8530",
// status: "active",
// startDate: "2025-03-20T10:00:00.000Z",
// price: 77.49,
// currency: "USD",
// billing: "Monthly",
// renewalDate: "2026-03-20T10:00:00.000Z",
// color: "#f5c542",
// },
// {
// id: "github-pro",
// icon: icons.github,
// name: "GitHub Pro",
// plan: "Developer",
// category: "Developer Tools",
// paymentMethod: "Mastercard ending in 2408",
// status: "active",
// startDate: "2024-11-24T10:00:00.000Z",
// price: 9.99,
// currency: "USD",
// billing: "Monthly",
// renewalDate: "2026-03-24T10:00:00.000Z",
// color: "#e8def8",
// },
// {
// id: "claude-pro",
// icon: icons.claude,
// name: "Claude Pro",
// plan: "Pro Plan",
// category: "AI Tools",
// paymentMethod: "Amex ending in 1010",
// status: "paused",
// startDate: "2025-06-27T10:00:00.000Z",
// price: 20.0,
// currency: "USD",
// billing: "Monthly",
// renewalDate: "2026-03-27T10:00:00.000Z",
// color: "#b8d4e3",
// },
// {
// id: "canva-pro",
// icon: icons.canva,
// name: "Canva Pro",
// plan: "Yearly Access",
// category: "Design",
// paymentMethod: "Visa ending in 7784",
// status: "cancelled",
// startDate: "2024-04-02T10:00:00.000Z",
// price: 119.99,
// currency: "USD",
// billing: "Yearly",
// renewalDate: "2026-04-02T10:00:00.000Z",
// color: "#b8e8d0",
// },
// ];
