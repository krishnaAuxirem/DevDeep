import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, GraduationCap, TrendingUp,
  Code2, Trophy, FlaskConical, FolderOpen, Boxes,
  Brain, GitPullRequest, ClipboardList, Award,
  User, Globe, Briefcase, Send, Target, Zap, ChevronRight,
  Flame, Settings, LogOut
} from "lucide-react";
import { CURRENT_USER } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { ROLE_LABELS } from "@/types/auth";
import { toast } from "sonner";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  badge?: string;
  badgeType?: "ai" | "indigo" | "new";
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      { icon: <LayoutDashboard size={15} />, label: "Overview", path: "/dashboard" },
    ],
  },
  {
    title: "Learning",
    items: [
      { icon: <BookOpen size={15} />, label: "Learning Paths", path: "/learning" },
      { icon: <GraduationCap size={15} />, label: "My Courses", path: "/courses" },
      { icon: <TrendingUp size={15} />, label: "Progress", path: "/progress" },
    ],
  },
  {
    title: "Practice",
    items: [
      { icon: <Code2 size={15} />, label: "Coding Academy", path: "/challenge/c1" },
      { icon: <Trophy size={15} />, label: "Challenges", path: "/challenges" },
      { icon: <FlaskConical size={15} />, label: "Debugging Lab", path: "/lab" },
    ],
  },
  {
    title: "Build",
    items: [
      { icon: <FolderOpen size={15} />, label: "Projects", path: "/projects" },
      { icon: <Boxes size={15} />, label: "Workspace", path: "/workspace" },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { icon: <Brain size={15} />, label: "AI Mentor", path: "/mentor", badge: "AI", badgeType: "ai" },
      { icon: <GitPullRequest size={15} />, label: "AI Code Review", path: "/code-review", badge: "AI", badgeType: "ai" },
    ],
  },
  {
    title: "Assessments",
    items: [
      { icon: <ClipboardList size={15} />, label: "Assessments", path: "/assessments" },
      { icon: <Award size={15} />, label: "Certificates", path: "/certificates" },
    ],
  },
  {
    title: "Portfolio",
    items: [
      { icon: <User size={15} />, label: "My Portfolio", path: "/profile" },
      { icon: <Globe size={15} />, label: "Public Profile", path: "/profile" },
    ],
  },
  {
    title: "Career",
    items: [
      { icon: <Briefcase size={15} />, label: "Jobs & Internships", path: "/jobs" },
      { icon: <Send size={15} />, label: "Applications", path: "/applications" },
      { icon: <Target size={15} />, label: "Goals & Planner", path: "/goals" },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully.");
    navigate("/");
  };

  const displayName = user?.name ?? CURRENT_USER.name;
  const displayAvatar = user?.avatar ?? CURRENT_USER.avatar;

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <aside className="w-[210px] min-w-[210px] h-screen bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-slate-200">
        <div className="w-8 h-8 rounded-md bg-indigo-900 flex items-center justify-center shrink-0">
          <Zap size={15} className="text-white" />
        </div>
        <div>
          <span className="text-indigo-900 font-bold text-base tracking-tight">DevDeep</span>
        </div>
      </div>

      {/* User quick info */}
      <div className="px-3 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {displayAvatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{displayName.split(" ")[0]}</p>
            <p className="text-[11px] text-slate-500 font-mono truncate">{user?.role ? ROLE_LABELS[user.role] : `Lv.${CURRENT_USER.level} ${CURRENT_USER.levelLabel}`}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 shrink-0">
            <Flame size={13} className="text-orange-500" />
            <span className="text-xs font-bold text-slate-700">{CURRENT_USER.streak}</span>
          </div>
        </div>
        {/* XP progress */}
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 font-mono">{CURRENT_USER.xp} XP</span>
            <span className="text-[10px] text-slate-400 font-mono">1000</span>
          </div>
          <div className="progress-track h-1">
            <div className="progress-fill" style={{ width: `${CURRENT_USER.xp / 10}%` }} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="sidebar-section">{section.title}</p>
            {section.items.map((item) => (
              <button
                key={item.label}
                onClick={() => item.path && navigate(item.path)}
                className={isActive(item.path) ? "sidebar-link-active w-full text-left" : "sidebar-link w-full text-left"}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className={`dd-chip text-[9px] py-0 px-1.5 h-[18px] ${
                    item.badgeType === "ai"
                      ? (isActive(item.path) ? "bg-cyan-200 text-cyan-800 border-cyan-300" : "bg-cyan-50 text-cyan-700 border-cyan-200")
                      : "bg-indigo-50 text-indigo-700 border-indigo-200"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Settings + Logout */}
      <div className="px-2 pb-1 border-t border-slate-100 pt-2">
        <button
          onClick={() => navigate("/settings")}
          className="sidebar-link w-full text-left"
        >
          <Settings size={15} className="shrink-0" />
          <span className="flex-1">Settings & Security</span>
        </button>
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-left text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        >
          <LogOut size={15} className="shrink-0" />
          <span className="flex-1">Sign Out</span>
        </button>
      </div>

      {/* Bottom upgrade nudge */}
      <div className="px-3 py-3 border-t border-slate-100">
        <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap size={12} className="text-indigo-700" />
            <span className="text-indigo-800 text-xs font-semibold">Staff Plan</span>
          </div>
          <p className="text-[11px] text-indigo-600 leading-snug">Unlock unlimited AI Mentor sessions + credential proofs.</p>
          <button
            onClick={() => {}}
            className="mt-2 w-full text-center text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-950 py-1.5 rounded-sm transition-colors"
          >
            Upgrade <ChevronRight size={11} className="inline" />
          </button>
        </div>
      </div>
    </aside>
  );
}
