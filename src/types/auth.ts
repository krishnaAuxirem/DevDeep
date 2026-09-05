import type { LucideIcon } from "lucide-react";
import { Rocket, Zap, GraduationCap, Users, BookOpen, Building2, ShieldCheck } from "lucide-react";

export type UserRole =
  | "beginner"
  | "professional"
  | "student"
  | "mentor"
  | "instructor"
  | "employer"
  | "admin";

export const ROLE_LABELS: Record<UserRole, string> = {
  beginner: "Beginner Developer",
  professional: "Professional Developer",
  student: "Student",
  mentor: "Mentor",
  instructor: "Instructor / Content Creator",
  employer: "Employer / Company",
  admin: "Admin",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  beginner: "Just starting out — follow guided learning paths and build your first projects.",
  professional: "Sharpen advanced skills, tackle expert challenges, and accelerate your career.",
  student: "Follow structured curricula, earn certifications, and land your first role.",
  mentor: "Guide learners with 1:1 sessions, share expertise, and build your reputation.",
  instructor: "Create and publish courses, manage learners, and earn revenue.",
  employer: "Search verified developer talent, assess candidates, and hire confidently.",
  admin: "Manage the entire platform — users, content, mentors, and analytics.",
};

export const ROLE_ICONS: Record<UserRole, LucideIcon> = {
  beginner: Rocket,
  professional: Zap,
  student: GraduationCap,
  mentor: Users,
  instructor: BookOpen,
  employer: Building2,
  admin: ShieldCheck,
};

export const DEVELOPER_ROLES: UserRole[] = ["beginner", "professional", "student"];

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

export interface RegisteredUser extends AuthUser {
  password: string;
}

export const DEMO_ACCOUNTS: RegisteredUser[] = [
  {
    id: "demo-dev-001",
    email: "developer@demo.com",
    name: "Alex Volkov",
    role: "professional",
    avatar: "AV",
    password: "demo123",
    createdAt: "2024-01-15",
  },
  {
    id: "demo-admin-001",
    email: "admin@demo.com",
    name: "Sarah Admin",
    role: "admin",
    avatar: "SA",
    password: "demo123",
    createdAt: "2024-01-01",
  },
  {
    id: "demo-mentor-001",
    email: "mentor@demo.com",
    name: "James Chen",
    role: "mentor",
    avatar: "JC",
    password: "demo123",
    createdAt: "2024-02-10",
  },
  {
    id: "demo-employer-001",
    email: "employer@demo.com",
    name: "Stripe Recruiting",
    role: "employer",
    avatar: "SR",
    password: "demo123",
    createdAt: "2024-03-05",
  },
  {
    id: "demo-instructor-001",
    email: "instructor@demo.com",
    name: "Dr. Marcus Vance",
    role: "instructor",
    avatar: "MV",
    password: "demo123",
    createdAt: "2024-02-01",
  },
  {
    id: "demo-student-001",
    email: "student@demo.com",
    name: "Elena Rostova",
    role: "student",
    avatar: "ER",
    password: "demo123",
    createdAt: "2024-03-01",
  },
];
