import type { ImageSourcePropType } from "react-native";

declare global {
  interface AppTab {
    name: string;
    title: string;
    icon: ImageSourcePropType;
  }

  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
  }

  // interface Subscription {
  //   id: string;
  //   icon: ImageSourcePropType;
  //   name: string;
  //   plan?: string;
  //   category?: string;
  //   paymentMethod?: string;
  //   status?: string;
  //   startDate?: string;
  //   price: number;
  //   currency?: string;
  //   billing: string;
  //   frequency?: string;
  //   renewalDate?: string;
  //   color?: string;
  // }

  // interface SubscriptionCardProps extends Omit<Subscription, "id"> {
  //   expanded: boolean;
  //   onPress: () => void;
  //   onCancelPress?: () => void;
  //   isCancelling?: boolean;
  // }

  // interface UpcomingSubscription {
  //   id: string;
  //   icon: ImageSourcePropType;
  //   name: string;
  //   price: number;
  //   currency?: string;
  //   daysLeft: number;
  // }

  // interface UpcomingSubscriptionCardProps extends Omit<
  //   UpcomingSubscription,
  //   "id"
  // > {}

  interface ListHeadingProps {
    title: string;
  }

  // interface UpcomingEvent {
  //   id: string;
  //   name: string;
  //   date: string;
  //   time: string;
  //   location: string;
  //   daysLeft: number;
  //   icon?: any; 
  // }

  interface FeaturedBlogCardProps {
    blog: BlogItem;
    onPress?: () => void;
  }
  export type EventCategory =
    | "Weddings"
    | "Evangelism"
    | "Community Service"
    | string; // Allows future custom admin categories

  // export interface Announcement {
  //   id: string;
  //   title: string;
  //   location?: string;
  //   date?: string;
  //   time?: string;
  //   description?: string;
  //   category?: EventCategory;
  // }

  export interface AnnouncementCardProps extends AnnouncementFormData {
    expanded?: boolean;
    onPress?: () => void;
  }

  // export interface DailyReading {
  //   day: number;
  //   title: string;
  //   scriptureRef: string;
  //   scriptureText: string;
  //   reflection: string;
  //   prayer?: string;
  // }

  // export interface Devotional {
  //   id: string;
  //   title: string;
  //   month: string;
  //   year: number;
  //   description: string;
  //   imageUrl: string;
  //   isPaid: boolean;
  //   readings?: DailyReading[];
  // }

  export interface DevotionalCardProps extends Devotional {
    onPress?: () => void;
  }

  // export interface BlogItem {
  //   id: string;
  //   title: string;
  //   snippet: string;
  //   author: string;
  //   authorRole: string;
  //   date: string;
  //   readTime: string;
  //   category: string;
  //   imageUrl: string;
  //   takeaways: string[];
  //   content: string;
  //   coverImage?: string;
  //   publishedAt?: string;
  // }

  // export interface TestimonyItem {
  //   id: string;
  //   title: string;
  //   snippet?: string;
  //   author: string;
  //   date: string;
  //   readTime: string;
  //   category?: string;
  //   fullStory?: string;
  //   location?: string;
  //   keyVerse?: string;
  //   content: string;
  //   likesCount: number;
  // }

  export interface TestimonyCardProps extends TestimonyItem {
    onPress?: () => void;
  }

 export type TabItem = {
   name: string;
   title: string;
   icon: React.FC<SvgProps>;
   hidden?: boolean;
 };

  // ================from the api==================

  // types/index.ts

  export interface Devotional {
    id: number;
    title: string;
    month: string;
    year: number;
    description: string | null;
    imageUrl: string | "";
    isPaid: boolean;
    readings?: DevotionalReading[];
  }

  export interface DevotionalReading {
    day: number;
    title: string;
    scriptureRef: string;
    scriptureText: string;
    reflection: string;
    prayer: string;
  }

  export type BlogFormData = {
    [x: string]: string;
    title: string;
    snippet?: string | null;
    author: string;
    authorRole?: string | null;
    blogDate: string; // As [date] "YYYY-MM-DD" string for HTML date inputs
    readTime?: string | null;
    category?: string | null;
    imageUrl?: string | null;
    takeaways?: string[]; // Parsed array for form handling
    content: string;
    isPublished?: boolean;
  };

  //++++++++++++++++++++++++++++++
  // export interface BlogItem {
  //   id: string;
  //   title: string;
  //   snippet: string;
  //   author: string;
  //   authorRole: string;
  //   date: string;
  //   readTime: string;
  //   category: string;
  //   imageUrl: string;
  //   takeaways: string[];
  //   content: string;
  //   coverImage?: string; // not added
  //   publishedAt?: string; // not added
  // }
  //++++++++++++++++++++++++++++++++

  export interface TestimonyItem {
    id: number;
    title: string;
    testifier_name: string;
    testifier_location: string | null;
    isApproved: boolean; // added
    testimonyDate: Date | string; // as date
    readTime: string | null;
    category: string | null;
    keyVerse: string | null;
    content: string;
    likesCount?: number;
    createdAt: Date | string;
  }

  // ++++++++++++++++++++++++++++++++
  // export interface TestimonyItem {
  //   id: string;-
  //   title: string;-
  //   snippet?: string; // not added
  //   author: string; // as testifier name
  //   date: string; // as testimony date
  //   readTime: string;
  //   category?: string;
  //   fullStory?: string;
  //   location?: string; // as testifier location
  //   keyVerse?: string;
  //   content: string;
  //   likesCount: number;
  // }

  // ++++++++++++++++++++++++++++++++

  // export interface AnnouncementItem {
  //   id: number;
  //   title: string;
  //   location: string | null;
  //   announcementDate: Date | string;
  //   time: string | null;
  //   category: string | null;
  //   isImportant?: boolean | null;
  //   description: string | null;
  //   link: string | null;
  //   createdAt: Date | string;
  // }

  export type AnnouncementFormData = {
    title: string;
    location?: string | null;
    announcementDate: string; // Used for HTML date input (YYYY-MM-DD)
    time?: string | null;
    category?: string | null;
    isImportant?: boolean | null;
    description?: string | null;
    link?: string | null;
  };

  // +++++++++++++++++++++++++++
  // export interface Announcement {
  //   id: string;
  //   title: string;
  //   location?: string;
  //   date?: string;
  //   time?: string;
  //   description?: string;
  //   category?: EventCategory;
  // }
// +++++++++++++++++++++++++++++++

  export interface UpcomingEvent {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    location: string;
    eventDate: Date | string;
    imageUrl: string | null;
    registrationUrl: string | null;
    isFeatured: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

// ++++++++++++++++++++++++++++++
  //  interface UpcomingEvent {
  //    id: string;
  //    name: string;
  //    date: string;
  //    time: string;
  //    location: string;
  //    daysLeft: number;
  //    icon?: any;
  //  }

  // ++++++++++++++++++++++++++++

  export interface ThemeVerseItem {
    id: number;
    verse: string;
    content: string;
    version: string;
    isActive: boolean;
    createdAt: Date | string;
  }

  export type ThemeVerseFormData = Omit<ThemeVerseItem, "id" | "createdAt">;

  declare module "*.svg" {
    import type { SvgProps } from "react-native-svg";

    const content: React.FC<SvgProps>;

    export default content;
  }
}

export {};
