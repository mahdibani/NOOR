export type Language = 'EN' | 'AR';

export enum Screen {
  Splash = 'splash',
  SignUp = 'signup',
  Verify = 'verify',
  Dashboard = 'dashboard',
  Pods = 'pods',
  PodChat = 'podchat',
  AIChat = 'aichat',
  Activities = 'activities',
  Experts = 'experts',
  Profile = 'profile'
}

export interface User {
  nickname: string;
  phone: string;
  isVerified: boolean;
  avatar: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
  isAI?: boolean;
}

export interface Pod {
  id: string;
  name: string;
  category: string;
  onlineCount: number;
  image: string;
  isVerified?: boolean;
}

export interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
  isVerified: boolean;
  description: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  location: string;
  time: string;
  date: string;
  attendingCount: number;
  image: string;
  isVerified?: boolean;
}
