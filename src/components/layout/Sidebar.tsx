import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, GraduationCap, TrendingUp,
  Code2, Trophy, FlaskConical, FolderOpen, Boxes,
  Brain, GitPullRequest, ClipboardList, Award,
  User, Globe, Briefcase, Send, Target, Zap, ChevronRight,
  Flame, Settings, LogOut, MessageSquare, Users, Calendar,
  UserCheck, Compass, Laptop, CheckSquare, FileText, CalendarDays,
  BarChart3, Star, DollarSign, Building2, ShieldCheck, CheckCircle2,
  Clock, Shield, Eye, Plus, Sparkles, AlertCircle, FileCheck
} from "lucide-react";
import { CURRENT_USER } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { ROLE_LABELS, UserRole, DEVELOPER_ROLES } from "@/types/auth";
import { toast } from "sonner";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  badge?: string;
  badgeType?: "ai" | "indigo" | "new" | "warning";
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  roleOverride?: UserRole;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export default function Sidebar({ roleOverride, onTabChange, activeTab }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully.");
    navigate("/");
  };

  const currentRole: UserRole = roleOverride || user?.role || "professional";
  const isDeveloper = DEVELOPER_ROLES.includes(currentRole);

  const displayName = user?.name ?? CURRENT_USER.name;
  const displayAvatar = user?.avatar ?? CURRENT_USER.avatar;

  // 1. Developer Sidebar sections
  const DEVELOPER_SECTIONS: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <LayoutDashboard size={15} />, label: "Overview", path: "/dashboard/developer" },
      ],
    },
    {
      title: "Learning",
      items: [
        { icon: <BookOpen size={15} />, label: "Learning Paths", path: "/learning" },
        { icon: <GraduationCap size={15} />, label: "My Courses", path: "/my-courses" },
        { icon: <TrendingUp size={15} />, label: "Progress", path: "/progress" },
      ],
    },
    {
      title: "Practice",
      items: [
        { icon: <Code2 size={15} />, label: "Coding Academy", path: "/challenge/c1" },
        { icon: <Trophy size={15} />, label: "Challenges", path: "/challenges" },
        { icon: <FlaskConical size={15} />, label: "Debugging Lab", path: "/debugging-lab" },
      ],
    },
    {
      title: "Build",
      items: [
        { icon: <FolderOpen size={15} />, label: "Projects", path: "/my-projects" },
        { icon: <Boxes size={15} />, label: "Project Workspace", path: "/project-workspace" },
      ],
    },
    {
      title: "AI",
      items: [
        { icon: <Brain size={15} />, label: "AI Mentor", path: "/mentor", badge: "v3.8", badgeType: "ai" },
        { icon: <GitPullRequest size={15} />, label: "AI Code Review", path: "/code-review", badge: "AI", badgeType: "ai" },
      ],
    },
    {
      title: "Assessments",
      items: [
        { icon: <ClipboardList size={15} />, label: "Assessments & Scores", path: "/assessments" },
        { icon: <Award size={15} />, label: "Certificates", path: "/certificates" },
      ],
    },
    {
      title: "Portfolio",
      items: [
        { icon: <User size={15} />, label: "Profile", path: "/profile" },
        { icon: <Globe size={15} />, label: "Portfolio", path: "/public-profile" },
      ],
    },
    {
      title: "Community",
      items: [
        { icon: <MessageSquare size={15} />, label: "Discussions", path: "/community" },
        { icon: <Users size={15} />, label: "Groups", path: "/study-groups" },
        { icon: <Calendar size={15} />, label: "Events", path: "/events" },
        { icon: <UserCheck size={15} />, label: "Following", path: "/following" },
      ],
    },
    {
      title: "Career",
      items: [
        { icon: <Briefcase size={15} />, label: "Jobs", path: "/jobs" },
        { icon: <Compass size={15} />, label: "Internships", path: "/internships" },
        { icon: <Laptop size={15} />, label: "Freelance", path: "/freelance" },
        { icon: <Send size={15} />, label: "Applications", path: "/applications" },
      ],
    },
    {
      title: "Productivity",
      items: [
        { icon: <Target size={15} />, label: "Goals & Planner", path: "/goals" },
        { icon: <CheckSquare size={15} />, label: "Tasks", path: "/tasks" },
        { icon: <FileText size={15} />, label: "Notes", path: "/notes" },
        { icon: <CalendarDays size={15} />, label: "Calendar", path: "/calendar" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { icon: <BarChart3 size={15} />, label: "Skills & Coding Analytics", path: "/analytics" },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: <Settings size={15} />, label: "Settings", path: "/settings" },
      ],
    },
  ];

  // 2. Mentor Sidebar sections
  const MENTOR_SECTIONS: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <LayoutDashboard size={15} />, label: "Overview", path: "/dashboard/mentor" },
      ],
    },
    {
      title: "Profile",
      items: [
        { icon: <User size={15} />, label: "Profile & Bio", path: "/dashboard/mentor?tab=profile" },
        { icon: <Award size={15} />, label: "Expertise & Skills", path: "/dashboard/mentor?tab=profile" },
        { icon: <Clock size={15} />, label: "Availability Slots", path: "/dashboard/mentor?tab=profile" },
      ],
    },
    {
      title: "Learners",
      items: [
        { icon: <Users size={15} />, label: "Learner Requests", path: "/dashboard/mentor?tab=requests", badge: "3 New", badgeType: "indigo" },
        { icon: <UserCheck size={15} />, label: "Matched Learners", path: "/dashboard/mentor?tab=learners" },
        { icon: <TrendingUp size={15} />, label: "Learner Progress", path: "/dashboard/mentor?tab=learners" },
      ],
    },
    {
      title: "Sessions",
      items: [
        { icon: <Calendar size={15} />, label: "Upcoming Sessions", path: "/dashboard/mentor?tab=sessions" },
        { icon: <CalendarDays size={15} />, label: "1:1 Sessions & Schedule", path: "/dashboard/mentor?tab=sessions" },
        { icon: <Users size={15} />, label: "Group Sessions", path: "/dashboard/mentor?tab=sessions" },
      ],
    },
    {
      title: "Reviews",
      items: [
        { icon: <GitPullRequest size={15} />, label: "Code Reviews & PRs", path: "/dashboard/mentor?tab=code-review" },
        { icon: <MessageSquare size={15} />, label: "Review Feedback", path: "/dashboard/mentor?tab=code-review" },
      ],
    },
    {
      title: "Mentoring",
      items: [
        { icon: <Compass size={15} />, label: "Career Mentoring", path: "/dashboard/mentor?tab=career-prep" },
        { icon: <Target size={15} />, label: "Interview Prep", path: "/dashboard/mentor?tab=career-prep" },
      ],
    },
    {
      title: "Reputation",
      items: [
        { icon: <Star size={15} />, label: "Ratings & Reviews", path: "/dashboard/mentor?tab=reviews", badge: "4.98", badgeType: "new" },
      ],
    },
    {
      title: "Earnings",
      items: [
        { icon: <DollarSign size={15} />, label: "Earnings & Payouts", path: "/dashboard/mentor?tab=sessions" },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: <Settings size={15} />, label: "Settings", path: "/settings" },
      ],
    },
  ];

  // 3. Instructor Sidebar sections
  const INSTRUCTOR_SECTIONS: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <LayoutDashboard size={15} />, label: "Overview", path: "/dashboard/instructor" },
      ],
    },
    {
      title: "Courses",
      items: [
        { icon: <BookOpen size={15} />, label: "My Courses", path: "/dashboard/instructor?tab=courses" },
        { icon: <Plus size={15} />, label: "Create Course", path: "/dashboard/instructor?tab=create" },
        { icon: <FileText size={15} />, label: "Drafts & Reviews", path: "/dashboard/instructor?tab=courses" },
        { icon: <CheckCircle2 size={15} />, label: "Published Courses", path: "/dashboard/instructor?tab=courses" },
      ],
    },
    {
      title: "Learners",
      items: [
        { icon: <Users size={15} />, label: "Enrolled Learners", path: "/dashboard/instructor?tab=learners" },
        { icon: <TrendingUp size={15} />, label: "Learner Progress", path: "/dashboard/instructor?tab=learners" },
      ],
    },
    {
      title: "Reviews",
      items: [
        { icon: <Star size={15} />, label: "Student Reviews", path: "/dashboard/instructor?tab=reviews", badge: "4.94", badgeType: "new" },
      ],
    },
    {
      title: "Revenue",
      items: [
        { icon: <DollarSign size={15} />, label: "Revenue & Payouts", path: "/dashboard/instructor?tab=revenue" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { icon: <BarChart3 size={15} />, label: "Enrollment Analytics", path: "/dashboard/instructor?tab=analytics" },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: <Settings size={15} />, label: "Settings", path: "/settings" },
      ],
    },
  ];

  // 4. Employer Sidebar sections
  const EMPLOYER_SECTIONS: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <LayoutDashboard size={15} />, label: "Overview", path: "/dashboard/employer" },
      ],
    },
    {
      title: "Company",
      items: [
        { icon: <Building2 size={15} />, label: "Company Profile", path: "/dashboard/employer?tab=profile" },
      ],
    },
    {
      title: "Hiring",
      items: [
        { icon: <Briefcase size={15} />, label: "Active Jobs", path: "/dashboard/employer?tab=jobs" },
        { icon: <Plus size={15} />, label: "Create Job", path: "/dashboard/employer?tab=jobs" },
        { icon: <Users size={15} />, label: "Candidates & Radar", path: "/dashboard/employer?tab=candidates" },
        { icon: <Star size={15} />, label: "Shortlisted Talent", path: "/dashboard/employer?tab=candidates" },
      ],
    },
    {
      title: "Hiring Pipeline",
      items: [
        { icon: <GitPullRequest size={15} />, label: "Hiring Pipeline", path: "/dashboard/employer?tab=pipeline", badge: "18 Active", badgeType: "indigo" },
        { icon: <ClipboardList size={15} />, label: "Assessment Results", path: "/dashboard/employer?tab=pipeline" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { icon: <BarChart3 size={15} />, label: "Talent Analytics", path: "/dashboard/employer?tab=analytics" },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: <Settings size={15} />, label: "Settings", path: "/settings" },
      ],
    },
  ];

  // 5. Admin Sidebar sections
  const ADMIN_SECTIONS: NavSection[] = [
    {
      title: "Dashboard",
      items: [
        { icon: <LayoutDashboard size={15} />, label: "Overview", path: "/dashboard/admin" },
      ],
    },
    {
      title: "Users",
      items: [
        { icon: <Users size={15} />, label: "All Users", path: "/dashboard/admin?tab=users" },
        { icon: <Code2 size={15} />, label: "Developers & Students", path: "/dashboard/admin?tab=users" },
        { icon: <Award size={15} />, label: "Mentors & Instructors", path: "/dashboard/admin?tab=users" },
        { icon: <Building2 size={15} />, label: "Partner Companies", path: "/dashboard/admin?tab=users" },
      ],
    },
    {
      title: "Verification",
      items: [
        { icon: <ShieldCheck size={15} />, label: "Mentor Verification", path: "/dashboard/admin?tab=verification", badge: "4 Pending", badgeType: "warning" },
        { icon: <FileCheck size={15} />, label: "Company Verification", path: "/dashboard/admin?tab=verification" },
        { icon: <CheckCircle2 size={15} />, label: "Professional Verification", path: "/dashboard/admin?tab=verification" },
      ],
    },
    {
      title: "Content",
      items: [
        { icon: <BookOpen size={15} />, label: "Courses & Curricula", path: "/dashboard/admin?tab=content" },
        { icon: <Trophy size={15} />, label: "Challenges & Projects", path: "/dashboard/admin?tab=content" },
        { icon: <ClipboardList size={15} />, label: "Assessments & Proofs", path: "/dashboard/admin?tab=content" },
      ],
    },
    {
      title: "Community",
      items: [
        { icon: <MessageSquare size={15} />, label: "Discussions & Posts", path: "/dashboard/admin?tab=community" },
        { icon: <AlertCircle size={15} />, label: "Moderation & Reports", path: "/dashboard/admin?tab=community", badge: "2 Flags", badgeType: "warning" },
      ],
    },
    {
      title: "Career",
      items: [
        { icon: <Briefcase size={15} />, label: "Job Postings", path: "/dashboard/admin?tab=career" },
        { icon: <Building2 size={15} />, label: "Verified Employers", path: "/dashboard/admin?tab=career" },
      ],
    },
    {
      title: "Subscriptions",
      items: [
        { icon: <DollarSign size={15} />, label: "Plans & Transactions", path: "/dashboard/admin?tab=subscriptions" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { icon: <BarChart3 size={15} />, label: "Platform Telemetry", path: "/dashboard/admin?tab=analytics" },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: <Settings size={15} />, label: "Platform Settings", path: "/settings" },
      ],
    },
  ];

  // Select appropriate section list based on role
  let navSections: NavSection[] = DEVELOPER_SECTIONS;
  if (currentRole === "mentor") navSections = MENTOR_SECTIONS;
  else if (currentRole === "instructor") navSections = INSTRUCTOR_SECTIONS;
  else if (currentRole === "employer") navSections = EMPLOYER_SECTIONS;
  else if (currentRole === "admin") navSections = ADMIN_SECTIONS;

  const isActive = (itemPath?: string) => {
    if (!itemPath) return false;
    const currentFull = location.pathname + location.search;

    if (itemPath.includes("?tab=")) {
      return currentFull === itemPath || (location.search.includes(itemPath.split("?")[1]));
    }

    if (activeTab && itemPath.includes(activeTab)) {
      return true;
    }

    return location.pathname === itemPath || (itemPath !== "/" && itemPath !== "/dashboard" && location.pathname.startsWith(itemPath));
  };

  const handleItemClick = (item: NavItem) => {
    if (!item.path) return;

    if (item.path.includes("?tab=") && onTabChange) {
      const tabName = new URLSearchParams(item.path.split("?")[1]).get("tab");
      if (tabName) onTabChange(tabName);
    }

    navigate(item.path);
  };

  return (
    <aside className="w-[220px] min-w-[220px] h-screen bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 select-none">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-200 hover:bg-slate-50/80 transition-colors group cursor-pointer"
        title="Go to DevDeep Home"
      >
        <div className="w-8 h-8 rounded-md bg-indigo-900 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
          <Zap size={15} className="text-white" />
        </div>
        <div className="min-w-0">
          <span className="text-indigo-900 font-bold text-base tracking-tight block">DevDeep</span>
        </div>
        <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
          v2.4
        </span>
      </Link>

      {/* User quick info */}
      <div className="px-3 py-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {displayAvatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-900 truncate">{displayName.split(" ")[0]}</p>
            <p className="text-[10px] text-slate-500 font-mono truncate">{ROLE_LABELS[currentRole] || currentRole}</p>
          </div>
          {isDeveloper && (
            <div className="flex items-center gap-0.5 shrink-0 px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200 text-[10px] font-bold font-mono">
              <Flame size={11} className="text-orange-500" />
              <span>{CURRENT_USER.streak}d</span>
            </div>
          )}
        </div>

        {/* Role switch pill or Developer XP Progress */}
        {isDeveloper ? (
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-slate-400 font-mono">{CURRENT_USER.xp} XP</span>
              <span className="text-[9px] text-slate-400 font-mono">Lv.{CURRENT_USER.level}</span>
            </div>
            <div className="progress-track h-1">
              <div className="progress-fill" style={{ width: `${CURRENT_USER.xp / 10}%` }} />
            </div>
          </div>
        ) : (
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 font-mono">
              <ShieldCheck size={12} className="text-emerald-600" /> Verified {currentRole}
            </span>
            <button
              onClick={() => navigate("/select-role")}
              className="text-[10px] text-indigo-700 hover:text-indigo-900 hover:underline font-medium"
            >
              Switch Role
            </button>
          </div>
        )}
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto space-y-3">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-0.5">
            <p className="px-2 py-1 text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
              {section.title}
            </p>
            {section.items.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "bg-indigo-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <span className={`shrink-0 ${active ? "text-cyan-300" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        active
                          ? "bg-indigo-800 text-white border border-indigo-700"
                          : item.badgeType === "warning"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : item.badgeType === "ai"
                          ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Settings + Logout Footer */}
      <div className="p-2 border-t border-slate-100 space-y-1">
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Settings size={15} className="text-slate-400" />
          <span className="flex-1 text-left">Settings & Security</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={15} className="text-rose-500" />
          <span className="flex-1 text-left">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
