export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  level: number;
  levelLabel: string;
  streak: number;
  xp: number;
  rank: number;
  rankTotal: number;
  marketReadiness: number;
  submissions: number;
  productionDeploys: number;
  location: string;
  joinedDate: string;
  bio: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  points: number;
  acceptance: number;
  tags: string[];
  description: string;
  category: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PullRequest {
  id: string;
  title: string;
  language: string;
  qualityScore: number;
  securityScore: number;
  benchmarkScore: number;
  maintainability: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalModules: number;
  currentModule: number;
  category: string;
  difficulty: string;
  duration: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  score: number;
  description: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  verified: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  available: boolean;
  specialties: string[];
  nextSession?: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  priceINR: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}
