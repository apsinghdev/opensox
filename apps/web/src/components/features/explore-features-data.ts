import {
  BellIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
  MapIcon,
  PhoneIcon,
  ShareIcon,
  ShieldExclamationIcon,
  SparklesIcon,
  TrophyIcon,
  TvIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

export type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type FeatureIconName =
  | "PhoneCall"
  | "Compass"
  | "Users"
  | "Tv"
  | "MessageSquare"
  | "Trophy"
  | "Lock"
  | "Sparkles"
  | "Video"
  | "ShieldAlert"
  | "Bell"
  | "Calendar"
  | "BookOpen";

export type FeatureData = {
  id: number;
  title: string;
  description: string;
  icon: FeatureIconName;
  image: string;
};

export const FEATURE_ICON_MAP: Record<FeatureIconName, HeroIcon> = {
  PhoneCall: PhoneIcon,
  Compass: MapIcon,
  Users: UserGroupIcon,
  Tv: TvIcon,
  MessageSquare: ChatBubbleLeftRightIcon,
  Trophy: TrophyIcon,
  Lock: LockClosedIcon,
  Sparkles: SparklesIcon,
  Video: VideoCameraIcon,
  ShieldAlert: ShieldExclamationIcon,
  Bell: BellIcon,
  Calendar: CalendarDaysIcon,
  BookOpen: BookOpenIcon,
};

const FEATURE_IMAGES = {
  onboarding: "/assets/features/1onboardingcall.webp",
  community: "/assets/features/2community.webp",
  weeklySessions: "/assets/features/3weeklysessions.webp",
  unlimitedQna: "/assets/features/4unlimitedqna.webp",
  proModules: "/assets/features/5promodules.webp",
  weeklyContests: "/assets/features/6weeklycontests.webp",
  handPickedProjects: "/assets/features/7hand-pickedossprojects.webp",
  proRecordings: "/assets/features/8prorecordings.webp",
  privateThreads: "/assets/features/9pvtthreads.webp",
  updates: "/assets/features/10updates-n-opportunities.webp",
  prorefs: "/assets/features/11prorefs.webp",
} as const;

export const FEATURES_DATA: FeatureData[] = [
  {
    id: 1,
    title: "Onboarding Call",
    description:
      "An onboarding call directly with me to set up the precise direction for your goals in open source.",
    icon: "PhoneCall",
    image: FEATURE_IMAGES.onboarding,
  },
  {
    id: 2,
    title: "Pro Community",
    description:
      "A highly active, small-token, limited community full of cracked engineers where you get personal attention from me 24/7/365.",
    icon: "Users",
    image: FEATURE_IMAGES.community,
  },
  {
    id: 3,
    title: "Weekly Live Sessions",
    description:
      "Interactive weekly live sessions covering the exact technical and career topics of your choice.",
    icon: "Tv",
    image: FEATURE_IMAGES.weeklySessions,
  },
  {
    id: 4,
    title: "Unlimited Q&As",
    description:
      "Ask anything, anytime, directly to me. Get your answers straight from the source with no TAs in the middle.",
    icon: "MessageSquare",
    image: FEATURE_IMAGES.unlimitedQna,
  },
  {
    id: 5,
    title: "Weekly Contests",
    description:
      "Participate in weekly contests designed around open-source, building in public and mastering first principles.",
    icon: "Trophy",
    image: FEATURE_IMAGES.weeklyContests,
  },
  {
    id: 6,
    title: "Dedicated Pro Content",
    description:
      "Access dedicated content on open source, building in public, and first principles that you can't find anywhere else on the internet. Exclusive to Opensox Pro members.",
    icon: "Lock",
    image: FEATURE_IMAGES.proModules,
  },
  {
    id: 7,
    title: "Hand-Picked Projects",
    description:
      "Cut through the BS with hand-picked open-source projects so you can start contributing from day one.",
    icon: "Sparkles",
    image: FEATURE_IMAGES.handPickedProjects,
  },
  {
    id: 8,
    title: "Timestamped Recordings",
    description:
      "Access recordings of all previous weekly sessions, organized by topics and precise timestamps.",
    icon: "Video",
    image: FEATURE_IMAGES.proRecordings,
  },
  {
    id: 9,
    title: "Private Threads",
    description:
      "Wanna ask something personal? Open a secure, private thread with me anytime.",
    icon: "ShieldAlert",
    image: FEATURE_IMAGES.privateThreads,
  },
  {
    id: 10,
    title: "Latest Updates",
    description:
      "Stay ahead with the latest updates on anything related to open source, remote job openings, emerging tech, and more.",
    icon: "Bell",
    image: FEATURE_IMAGES.updates,
  },
  {
    id: 11,
    title: "Pro References",
    description:
      "A consolidated place of the best hand-picked resources and references on the internet.",
    icon: "BookOpen",
    image: FEATURE_IMAGES.prorefs,
  },
];
