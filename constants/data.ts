import { icons } from "./icons";

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "1",
    name: "Sunday Celebration Service",
    date: "Sun, Aug 16",
    time: "09:00 AM",
    location: "Main Sanctuary",
    daysLeft: 2,
    title: "",
    slug: "",
    description: null,
    eventDate: "",
    imageUrl: null,
    registrationUrl: null,
    isFeatured: false,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "3",
    name: "Fitness in the word",
    date: "Mon, Aug 22",
    time: "07:00 PM",
    location: "NAIROBI CENEMA",
    daysLeft: 8,
    title: "",
    slug: "",
    description: null,
    eventDate: "",
    imageUrl: null,
    registrationUrl: null,
    isFeatured: false,
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "2",
    name: "Prayer Service",
    date: "Wed, Aug 19",
    time: "06:00 PM",
    location: "Main Sanctuary",
    daysLeft: 5,
    title: "",
    slug: "",
    description: null,
    eventDate: "",
    imageUrl: null,
    registrationUrl: null,
    isFeatured: false,
    createdAt: "",
    updatedAt: ""
  },
];

export const THEME_VERSE = {
  verse: "Deutronoly 15: 4",
  content:
    "However, there need be no poor people among you, for in the land the LORD your God is giving you to possess as your inheritance, he will richly bless you",
  Version: "kjv",
};

export const DEVOTIONALS: Devotional[] = [
  {
    id: "1",
    title: "Walking in Divine Wisdom",
    month: "August",
    year: 2026,
    description:
      "Daily insights on practical Christian living and spiritual growth.",
    imageUrl: "https://via.placeholder.com/150",
    isPaid: true,
    readings: [
      {
        day: 1,
        title: "The Source of True Wisdom",
        scriptureRef: "Proverbs 2:6",
        scriptureText:
          "For the LORD gives wisdom; from his mouth come knowledge and understanding.",
        reflection:
          "True wisdom does not originate from human intellect or worldly experience alone, but from seeking God's counsel in every area of life.",
        prayer: "Lord, grant me wisdom for every decision I make today.",
      },
      {
        day: 2,
        title: "Walking in Peace",
        scriptureRef: "Philippians 4:6-7",
        scriptureText:
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        reflection:
          "Peace is not the absence of trouble, but the abiding presence of God in the midst of life's daily challenges.",
        prayer: "Father, fill my heart with Your surpassing peace today.",
      },
    ],
  },
  {
    id: "2",
    title: "Anchored in Hope",
    month: "September",
    year: 2026,
    description:
      "Strengthening your faith through steadfast trust in God's promises.",
    imageUrl: "https://via.placeholder.com/150",
    isPaid: true,
    readings: [
      {
        day: 1,
        title: "An Unshakable Foundation",
        scriptureRef: "Hebrews 6:19",
        scriptureText:
          "We have this hope as an anchor for the soul, firm and secure.",
        reflection:
          "When storms arise, an anchor keeps a vessel from drifting. God's promises anchor our souls when life becomes unpredictable.",
        prayer:
          "Lord, help me remain steadfast in hope regardless of my surroundings.",
      },
      {
        day: 2,
        title: "Renewed Day by Day",
        scriptureRef: "2 Corinthians 4:16",
        scriptureText:
          "Therefore we do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day.",
        reflection:
          "Daily communion with God replenishes our spiritual strength, giving us fresh energy to run the race set before us.",
        prayer: "Father, renew my spirit today and clear away every weariness.",
      },
    ],
  },
  {
    id: "3",
    title: "Overcoming by Faith",
    month: "October",
    year: 2026,
    description:
      "Developing a triumphant mindset to defeat doubt and spiritual inertia.",
    imageUrl: "https://via.placeholder.com/150",
    isPaid: false,
    readings: [
      {
        day: 1,
        title: "Victorious Living",
        scriptureRef: "1 John 5:4",
        scriptureText:
          "For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.",
        reflection:
          "Victory is not something we fight for, but something we fight from—standing firm in the finished work of Christ.",
        prayer:
          "Jesus, thank You for giving me victory over every spiritual hurdle.",
      },
      {
        day: 2,
        title: "The Armor of Light",
        scriptureRef: "Ephesians 6:11",
        scriptureText:
          "Put on the full armor of God, so that you can take your stand against the devil’s schemes.",
        reflection:
          "Spiritual battle requires spiritual armor. Put on truth, righteousness, and peace every morning.",
        prayer: "Lord, clothe me in Your righteousness and truth today.",
      },
    ],
  },
  {
    id: "4",
    title: "The Heart of Gratitude",
    month: "November",
    year: 2026,
    description:
      "Cultivating a lifestyle of praise and thanksgiving in all circumstances.",
    imageUrl: "https://via.placeholder.com/150",
    isPaid: true,
    readings: [
      {
        day: 1,
        title: "Giving Thanks Always",
        scriptureRef: "1 Thessalonians 5:18",
        scriptureText:
          "Give thanks in all circumstances; for this is God’s will for you in Christ Jesus.",
        reflection:
          "Gratitude shifts our focus from what we lack to the abundance of God's blessings already present in our lives.",
        prayer:
          "Father, give me a heart that naturally overflows with thanksgiving.",
      },
      {
        day: 2,
        title: "Praise in the Wilderness",
        scriptureRef: "Psalm 103:2",
        scriptureText:
          "Praise the LORD, my soul, and forget not all his benefits.",
        reflection:
          "Intentionally recalling God's past faithfulness empowers us to trust Him with our immediate future.",
        prayer:
          "Lord, I choose to bless Your holy name today for all You have done.",
      },
    ],
  },
  {
    id: "5",
    title: "Light of the World",
    month: "December",
    year: 2026,
    description:
      "Celebrating the arrival of Christ and sharing His light with others.",
    imageUrl: "https://via.placeholder.com/150",
    isPaid: false,
    readings: [
      {
        day: 1,
        title: "The Light Shines in Darkness",
        scriptureRef: "John 1:5",
        scriptureText:
          "The light shines in the darkness, and the darkness has not overcome it.",
        reflection:
          "No matter how deep the darkness in the world appears, a single beam of God's truth illuminates everything.",
        prayer:
          "Jesus, let Your divine light shine brightly through my words and actions today.",
      },
      {
        day: 2,
        title: "Joy to the World",
        scriptureRef: "Luke 2:10-11",
        scriptureText:
          "But the angel said to them, 'Do not be afraid. I bring you good news that will cause great joy for all the people.'",
        reflection:
          "True joy is found in the gift of salvation, giving us reason to rejoice in all seasons.",
        prayer:
          "Lord, fill my home and heart with the genuine joy of Your presence.",
      },
    ],
  },
];

export const TESTIMONIES_DATA: TestimonyItem[] = [
  {
    id: "1",
    title: "Healed from Chronic Illness",
    author: "Michael K.",
    location: "Nairobi, Kenya",
    date: "Jul 28, 2026",
    readTime: "6 min read",
    category: "Divine Healing",
    keyVerse:
      "Jeremiah 30:17 - 'For I will restore health to you and heal you of your wounds, says the LORD.'",
    content:
      "For over three years, I struggled with severe chronic abdominal pain that doctors could not definitively diagnose. It affected my ability to work, my family life, and at times, tested my spiritual endurance.\n\nDuring a weekend revival service in June, prayer was offered for those suffering long-term sickness. As the hands were laid on me, I felt an intense warmth spread through my chest and stomach. That very evening, for the first time in years, the pain completely subsided.\n\nSubsequent medical checkups confirmed that all physical markers had returned to normal. I give all glory and honor to God for His unfailing mercy and healing power!",
    likesCount: 142,
  },
  {
    id: "2",
    title: "Restoration of My Family",
    author: "Grace M.",
    location: "Mombasa, Kenya",
    date: "Jul 15, 2026",
    readTime: "7 min read",
    category: "Family & Marriage",
    keyVerse:
      "Joel 2:25 - 'I will restore to you the years that the swarming locust has eaten.'",
    content:
      "My marriage was on the verge of divorce after months of severe financial stress and emotional estrangement. We had reached a point where communication had entirely broken down.\n\nThrough consistent intercessory prayer and guidance from our pastoral team, God began softening our hearts. Step by step, forgiveness replaced resentment. Today, our marriage is stronger, filled with peace, and grounded in Christ.",
    likesCount: 98,
  },
];

export const BLOGS_DATA: BlogFormData[] = [
  {
    id: "1",
    title: "Understanding Grace in Daily Life",
    snippet: "Exploring how divine grace transforms our everyday interactions and relationships.",
    author: "Pastor Marumo",
    authorRole: "Senior Pastor",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    category: "Spiritual Growth",
    imageUrl: "https://images.unsplash.com/photo-1509021436468-d51039746b4b?w=800&auto=format&fit=crop&q=80",
    takeaways: [
      "Grace is an unearned gift, not a reward for performance.",
      "Extending grace to others starts with recognizing God's grace toward you.",
      "Daily reflection helps shift our mindset from obligation to gratitude.",
    ],
    content: "Grace is often described as unmerited favor, but in the rhythm of daily life, it is much more than a theological concept—it is the very breath of our spiritual journey.\n\nWhen we wake up each morning, we are immediately met with choices. We can rely on our own strength and strive for perfection, or we can rest in the knowledge that God's grace is sufficient for every challenge ahead.\n\nLiving in grace means accepting that failure is not final. When we fall short, grace invites us to repent and stand back up without carrying the weight of guilt. Furthermore, as recipients of divine grace, we are called to extend that same forgiveness and kindness to those around us—in our workplaces, homes, and communities.",
    blogDate: ""
  },
  {
    id: "2",
    title: "The Power of Persistent Prayer",
    snippet: "How sticking to a consistent prayer routine deepens your spiritual walk.",
    author: "Sarah Jenkins",
    authorRole: "Prayer Ministry Lead",
    date: "Aug 04, 2026",
    readTime: "4 min read",
    category: "Prayer",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    takeaways: [
      "Consistency in prayer builds spiritual stamina.",
      "God answers in His timing, which deepens our trust.",
      "Prayer changes our alignment with God's heart.",
    ],
    content: "Persistence in prayer is not about convincing a reluctant God to act; it is about aligning our hearts with His sovereign will over time.\n\nIn Luke 18, Jesus taught the parable of the persistent widow to show us that we should always pray and not give up. Prayer transforms us while we wait. It refines our desires, strengthens our faith, and builds unwavering endurance.\n\nMake prayer a daily sanctuary rather than an emergency exit. Set aside dedicated time each morning to bring your petitions, worries, and thanksgivings before the Lord.",
    blogDate: ""
  },
];

export const ANNOUNCEMENTS: AnnouncementFormData[] = [
  {
    id: "1",
    title: "Rongai Campus Church Evangelism",
    location: "Kiserian Town",
    date: "Saturday, Sep 5, 2026",
    time: "4:00 PM",
    category: "Evangelism",
    description:
      "Rongai campus church will be meeting for outreach and evangelism in Kiserian.",
  },
  {
    id: "2",
    title: "John & Jane's Wedding Ceremony",
    location: "KCC Ongata Rongai",
    date: "Saturday, Sep 12, 2026",
    time: "10:00 AM",
    category: "Weddings",
    description:
      "You are cordially invited to celebrate the holy matrimony of John and Jane at KCC Ongata Rongai, followed by a reception at the grounds.",
  },
  {
    id: "3",
    title: "Community Clean-up & Food Drive",
    location: "Rongai Town Center",
    date: "Saturday, Sep 19, 2026",
    time: "8:00 AM",
    category: "Community Service",
    description:
      "Join us as we serve our local neighborhood through a community clean-up drive and food package distribution.",
  },
];

export const tabs: TabItem[] = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "subscriptions", title: "Subscriptions", icon: icons.book },
  { name: "insights", title: "Insights", icon: icons.chat },
  { name: "settings", title: "Settings", icon: icons.setting },
];

// export const TESTIMONIES: TestimonyItem[] = [
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
