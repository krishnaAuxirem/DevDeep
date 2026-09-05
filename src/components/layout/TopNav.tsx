import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Bell, Flame, Zap, Check, CheckCheck,
  User, Settings, LogOut, ShieldCheck, Sparkles,
  ChevronDown, ExternalLink, RefreshCw, Eye
} from "lucide-react";
import { CURRENT_USER } from "@/constants/data";
import { useAuth, getDashboardPath } from "@/lib/auth";
import { ROLE_LABELS, UserRole } from "@/types/auth";
import { toast } from "sonner";
import CommandSearch from "./CommandSearch";

interface TopNavProps {
  showSearch?: boolean;
  showTelemetry?: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  path?: string;
  type: "ai" | "challenge" | "career" | "streak";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "AI Review: AST Analysis Patched",
    message: "PR #42: Context-aware channel select generated and verified with 0 races.",
    time: "5m ago",
    read: false,
    path: "/code-review",
    type: "ai",
  },
  {
    id: "n2",
    title: "New Daily Challenge Live",
    message: "Concurrent Worker Pool with Graceful Shutdown (Hard • 300 pts).",
    time: "2h ago",
    read: false,
    path: "/challenge/c1",
    type: "challenge",
  },
  {
    id: "n3",
    title: "Talent Scout Inquiries (2)",
    message: "Staff Engineering recruiters from Stripe and Datadog reviewed your profile.",
    time: "5h ago",
    read: false,
    path: "/profile",
    type: "career",
  },
  {
    id: "n4",
    title: "84-Day Streak Milestone",
    message: "Top 0.4% consistency globally. Streak freeze shield is active.",
    time: "1d ago",
    read: true,
    path: "/dashboard",
    type: "streak",
  },
];

export default function TopNav({ showSearch = true }: TopNavProps) {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [streakOpen, setStreakOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
      if (streakRef.current && !streakRef.current.contains(e.target as Node)) {
        setStreakOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotifOpen(false);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    setRoleModalOpen(false);
    setAvatarOpen(false);
    toast.success(`Role switched to ${ROLE_LABELS[newRole]}`);
    navigate(getDashboardPath(newRole));
  };

  const displayName = user?.name ?? CURRENT_USER.name;
  const displayAvatar = user?.avatar ?? CURRENT_USER.avatar;
  const currentRole = user?.role ?? "professional";

  const adminPreviewData = typeof window !== "undefined" ? sessionStorage.getItem("devdeep_admin_preview") : null;
  const adminPreview = adminPreviewData ? JSON.parse(adminPreviewData) : null;

  const handleExitPreview = () => {
    sessionStorage.removeItem("devdeep_admin_preview");
    switchRole("admin");
    toast.success("Exited preview mode. Returned to Admin Control Panel.");
    navigate("/admin-dashboard");
  };

  return (
    <>
      {adminPreview && (
        <div className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-between z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-2">
            <Eye size={14} className="animate-pulse shrink-0" />
            <span>
              Viewing as <strong>{adminPreview.userName}</strong> ({ROLE_LABELS[adminPreview.role as UserRole] || adminPreview.role}) — Read-Only Admin Preview Mode
            </span>
          </div>
          <button
            onClick={handleExitPreview}
            className="bg-amber-900 hover:bg-amber-950 text-white px-3 py-1 rounded text-xs font-bold transition-all shadow-xs"
          >
            Exit Preview & Return to Admin
          </button>
        </div>
      )}
      <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200 flex items-center px-4 sm:px-6 gap-3 shrink-0 z-30 sticky top-0 transition-all shadow-2xs">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group focus:outline-none mr-2" title="Go to DevDeep Home">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1XQfxUn56ONqpIjvIQrr1hWXoabnxBi-eW8T1lhgF-Th5Qbl5yxD5GIwvXSv_9PKHGIJmIC4CG7OZqGxCCMaq95UcOJZ8rrBEcGQkhrdUDaXIBHvTGOLlR6uORTQyJQ47iifBSq25W7Gt0paxl4NsukFUVHmewsCN187ywLUmuNDlLLs_iiv_K3Le7z5bXDIzoUrzbDaCEvkKwnE3uDFkCz2PrLDg7Lc87Loc6_V31kP1AU13wlv48fTA"
            alt="DevDeep Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
              const fallback = document.getElementById("logged-in-brand-fallback");
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div id="logged-in-brand-fallback" className="hidden w-8 h-8 rounded-lg bg-indigo-900 items-center justify-center text-white">
            <Zap size={16} className="text-cyan-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">DevDeep</span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              v2.4
            </span>
          </div>
        </Link>

        {/* Global Search (⌘K style) */}
        {showSearch && (
          <div className="flex-1 max-w-md">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg pl-3 pr-2.5 h-9 text-xs sm:text-sm text-slate-400 flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-900/10"
            >
              <div className="flex items-center gap-2 truncate">
                <Search size={14} className="text-slate-400 shrink-0" />
                <span className="truncate">Search resources, code, problems...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        <div className="flex-1" />

        {/* Right Section: Streak, AI Chip, Notifications, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Streak Indicator */}
          <div className="relative" ref={streakRef}>
            <button
              onClick={() => setStreakOpen(!streakOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50/80 hover:bg-orange-100 border border-orange-200 rounded-full transition-colors cursor-pointer"
              title="View Streak Telemetry"
            >
              <Flame size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-xs font-bold text-orange-800 font-mono">{CURRENT_USER.streak}d</span>
            </button>

            {/* Streak Popover */}
            {streakOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-4 animate-fade-in z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Flame size={16} className="text-orange-500 fill-orange-500" />
                    <span className="font-bold text-sm text-slate-900">Active Streak</span>
                  </div>
                  <span className="text-xs font-bold text-orange-600 font-mono">{CURRENT_USER.streak} Days</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Longest Streak:</span>
                    <strong className="text-slate-900 font-mono">102 days</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Commits / Tests:</span>
                    <strong className="text-slate-900 font-mono">312 total</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-100">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-emerald-600" /> Streak Freeze
                    </span>
                    <span className="font-semibold">Protected</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setStreakOpen(false);
                    navigate("/challenges");
                  }}
                  className="w-full mt-3 py-1.5 bg-indigo-900 text-white rounded-lg font-semibold text-xs hover:bg-indigo-950 transition-colors"
                >
                  Solve Today's Challenge →
                </button>
              </div>
            )}
          </div>

          {/* AI Mentor Quick-Access Chip */}
          <button
            onClick={() => navigate("/mentor")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 hover:bg-cyan-100 text-xs font-semibold transition-all shadow-2xs group"
          >
            <Zap size={13} className="text-cyan-600 fill-cyan-600 transition-transform group-hover:scale-110" />
            <span>AI Mentor</span>
            <span className="text-[10px] font-mono text-cyan-600 bg-cyan-100/80 px-1 rounded">v3.8</span>
          </button>

          {/* Notifications Bell with Unread Dot & Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1"
                    >
                      <CheckCheck size={13} /> Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 items-start ${
                        !item.read ? "bg-indigo-50/30" : ""
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.type === "ai" && <Sparkles size={15} className="text-cyan-600" />}
                        {item.type === "challenge" && <Zap size={15} className="text-indigo-600" />}
                        {item.type === "career" && <User size={15} className="text-emerald-600" />}
                        {item.type === "streak" && <Flame size={15} className="text-orange-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`font-semibold truncate ${!item.read ? "text-slate-900" : "text-slate-700"}`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item.time}</span>
                        </div>
                        <p className="text-slate-500 line-clamp-2 leading-relaxed">{item.message}</p>
                      </div>
                      {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />}
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                      navigate("/dashboard");
                    }}
                    className="text-xs font-semibold text-indigo-900 hover:underline"
                  >
                    View Activity Stream →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar Menu (Profile, Settings, Switch Role, Logout) */}
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-indigo-300 transition-all focus:outline-none"
              aria-label="User Account Menu"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                {displayAvatar}
              </div>
              <span className="sr-only">Open Profile Menu</span>
            </button>

            {/* Avatar Dropdown Menu */}
            {avatarOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-fade-in divide-y divide-slate-100">
                {/* User Info Header */}
                <div className="px-4 py-3">
                  <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email ?? "developer@demo.com"}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-semibold text-indigo-800">
                    <span>{ROLE_LABELS[currentRole]}</span>
                  </div>
                </div>

                {/* Main Menu Links */}
                <div className="py-1 text-sm">
                  <button
                    onClick={() => {
                      setAvatarOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:text-indigo-900 hover:bg-slate-50 transition-colors text-left"
                  >
                    <User size={15} className="text-slate-400" />
                    <span>Profile & Dossier</span>
                  </button>

                  <button
                    onClick={() => {
                      setAvatarOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:text-indigo-900 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Settings size={15} className="text-slate-400" />
                    <span>Settings & Preferences</span>
                  </button>

                  {/* Switch Role Trigger */}
                  <button
                    onClick={() => {
                      setAvatarOpen(false);
                      setRoleModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-slate-700 hover:text-indigo-900 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <RefreshCw size={15} className="text-indigo-600" />
                      <span>Switch Role</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">7 roles →</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-sm font-medium text-left"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Switch Role Modal Dialog */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Switch Workspace Role</h3>
                <p className="text-xs text-slate-500 mt-0.5">Choose your perspective to experience role-specific dashboards & workflows.</p>
              </div>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => {
                const isSelected = r === currentRole;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900">{ROLE_LABELS[r]}</span>
                      {isSelected && <Check size={15} className="text-indigo-600" />}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {r === "beginner" && "Guided tutorials & fundamentals"}
                      {r === "professional" && "High-scale systems & architecture"}
                      {r === "student" && "Curriculum tracks & certifications"}
                      {r === "mentor" && "1:1 Reviews, student queue & booking"}
                      {r === "instructor" && "Curriculum editor & analytics"}
                      {r === "employer" && "Talent search & candidate screening"}
                      {r === "admin" && "Platform telemetry, users & security"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Command Palette */}
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
