export interface User {
  id: string;
  name: string;
  avatar: string;
  virtuePoints: number;
  coins: number;
  knowledge: number;
  level: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Building {
  id: string;
  type: 'mosque' | 'school' | 'home' | 'market' | 'garden' | 'library' | 'charity_center' | 'community_hall';
  level: number;
  position: { x: number; y: number };
  resources: {
    coinsPerHour: number;
    knowledgePerHour: number;
    virtuePerHour: number;
  };
  capacity: number;
  residents?: number;
  specialEffect?: string;
  constructionTime: number;
  constructionStarted?: Date;
  constructionPhase: 'foundation' | 'structure' | 'finishing' | 'complete';
  constructionProgress: number;
  happiness?: number;
  influence?: number;
  events?: BuildingEvent[];
  workers: number;
  maxWorkers: number;
}

export interface BuildingEvent {
  id: string;
  type: 'community' | 'education' | 'charity' | 'celebration';
  title: string;
  description: string;
  duration: number;
  rewards: {
    coins?: number;
    knowledge?: number;
    virtuePoints?: number;
    happiness?: number;
  };
  requirements?: {
    level?: number;
    resources?: {
      coins?: number;
      knowledge?: number;
      virtuePoints?: number;
    };
  };
}

export interface BuildingType {
  type: Building['type'];
  name: string;
  description: string;
  baseCost: {
    coins: number;
    knowledge: number;
    virtuePoints: number;
  };
  baseResources: {
    coinsPerHour: number;
    knowledgePerHour: number;
    virtuePerHour: number;
  };
  baseCapacity: number;
  specialEffect?: string;
  constructionTime: number;
  requirements?: {
    level?: number;
    buildings?: { type: Building['type']; count: number }[];
  };
  events?: BuildingEvent[];
  influenceRadius?: number;
  maxLevel?: number;
  maxWorkers: number;
  phases: {
    foundation: number;
    structure: number;
    finishing: number;
  };
}

export interface Village {
  id: string;
  name: string;
  buildings: Building[];
  resources: {
    coins: number;
    knowledge: number;
    virtuePoints: number;
  };
  lastUpdated: Date;
  happiness: number;
  population: number;
  level: number;
  events: BuildingEvent[];
  availableWorkers: number;
  maxWorkers: number;
}

export interface Prayer {
  name: string;
  time: string;
  completed: boolean;
}

export interface DailyPrayers {
  date: string;
  prayers: Prayer[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'quran' | 'hadith' | 'fiqh' | 'history';
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar: string;
  virtuePoints: number;
  level: number;
}