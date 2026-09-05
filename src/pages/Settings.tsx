import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, Lock, Smartphone, Key, Eye, EyeOff, CheckCircle2,
  AlertTriangle, LogOut, User, Bell, Globe, ChevronRight, Zap
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useAuth } from "@/lib/auth";
import { ROLE_LABELS, ROLE_ICONS } from "@/types/auth";
import { toast } from "sonner";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("security");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("You've been signed out.");
    navigate("/");
  };

  const TABS = [
    { id: "profile" as const, label: "Profile", icon: <User size={14} /> },
    { id: "security" as const, label: "Security", icon: <Shield size={14} /> },
    { id: "notifications" as const, label: "Notifications", icon: <Bell size={14} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Account Settings</h1>
              <p className="text-slate-500 text-sm">Manage your profile, security preferences, and notifications.</p>
            </div>

            {/* Tab nav */}
            <div className="flex items-center gap-1 border-b border-slate-200 mb-6">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.id ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "profile" && (
              <div className="space-y-5">
                <div className="dd-card p-5">
                  <h2 className="text-slate-900 font-bold mb-4">Personal Information</h2>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-indigo-900 flex items-center justify-center text-white text-xl font-bold">
                      {user?.avatar}
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold">{user?.name}</p>
                      <p className="text-slate-500 text-sm">{user?.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {user?.role && (() => {
                          const RoleIcon = ROLE_ICONS[user.role];
                          return (
                            <span className="w-5 h-5 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center">
                              <RoleIcon size={12} />
                            </span>
                          );
                        })()}
                        <span className="dd-chip-indigo text-[10px]">{user?.role ? ROLE_LABELS[user.role] : ""}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <input defaultValue={user?.name} className="dd-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input defaultValue={user?.email} className="dd-input" readOnly />
                    </div>
                  </div>
                  <button onClick={() => toast.success("Profile updated.")} className="btn-primary mt-4 text-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                {/* Secure by Design Banner */}
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Shield size={18} className="text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-emerald-900 font-bold text-sm">Secure by Design</p>
                      <span className="dd-chip-completed text-[10px]">Active</span>
                    </div>
                    <p className="text-emerald-800 text-xs leading-relaxed">
                      Your session is protected with end-to-end encryption. All credentials are hashed and never stored in plain text. DevDeep enforces secure session tokens, XSS protection, and CSRF policies by default.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        { icon: <Lock size={10} />, label: "Encrypted Session" },
                        { icon: <CheckCircle2 size={10} />, label: "CSRF Protected" },
                        { icon: <Zap size={10} />, label: "Secure Cookies" },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-1 px-2 py-1 bg-white border border-emerald-200 rounded-full text-[10px] text-emerald-700 font-medium">
                          {item.icon} {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="dd-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Key size={15} className="text-indigo-700" />
                    <h2 className="text-slate-900 font-bold">Change Password</h2>
                  </div>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                      <div className="relative">
                        <input type={showCurrentPw ? "text" : "password"} placeholder="••••••••" className="dd-input pr-10" />
                        <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                          {showCurrentPw ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                      <input type="password" placeholder="Minimum 8 characters" className="dd-input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                      <input type="password" placeholder="Repeat new password" className="dd-input" />
                    </div>
                  </div>
                  <button onClick={() => toast.success("Password updated successfully.")} className="btn-primary mt-4 text-sm">
                    Update Password
                  </button>
                </div>

                {/* Two-Step Verification */}
                <div className="dd-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                        <Smartphone size={15} className="text-indigo-700" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-sm">Two-Step Verification</p>
                        <p className="text-slate-500 text-xs">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setTwoFaEnabled(!twoFaEnabled); toast.success(twoFaEnabled ? "2FA disabled." : "2FA enabled for your account."); }}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${twoFaEnabled ? "bg-indigo-900" : "bg-slate-300"}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${twoFaEnabled ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                  {twoFaEnabled && (
                    <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-md text-xs text-indigo-800">
                      Two-step verification is <strong>enabled</strong>. You'll be asked for a code when signing in on a new device.
                    </div>
                  )}
                </div>

                {/* Active Sessions */}
                <div className="dd-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe size={15} className="text-slate-600" />
                    <h2 className="text-slate-900 font-bold">Active Sessions</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { device: "Current Browser", os: "macOS · Chrome 124", location: "San Francisco, CA", time: "Active now", current: true },
                      { device: "Mobile App", os: "iOS 17 · Safari", location: "San Francisco, CA", time: "2 hours ago", current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-md">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${session.current ? "bg-success animate-pulse" : "bg-slate-300"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-slate-900 text-sm font-semibold">{session.device}</p>
                            {session.current && <span className="dd-chip-completed text-[10px]">Current</span>}
                          </div>
                          <p className="text-slate-400 text-xs">{session.os} · {session.location} · {session.time}</p>
                        </div>
                        {!session.current && (
                          <button className="text-xs text-danger hover:text-red-700 transition-colors">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="dd-card p-5 border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={15} className="text-danger" />
                    <h2 className="text-slate-900 font-bold">Danger Zone</h2>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">Sign out of DevDeep</p>
                      <p className="text-slate-500 text-xs">This will clear your session and return you to the landing page.</p>
                    </div>
                    <button onClick={handleLogout} className="btn-danger text-xs">
                      <LogOut size={12} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="dd-card p-5">
                <h2 className="text-slate-900 font-bold mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: "Challenge Results & Scores", desc: "Get notified when your challenge submissions are evaluated.", enabled: true },
                    { label: "AI Mentor Insights", desc: "Receive weekly AI-generated skill gap reports.", enabled: true },
                    { label: "New Courses & Paths", desc: "Updates when new learning content is published.", enabled: false },
                    { label: "Job & Opportunity Matches", desc: "Employers viewing or reaching out to your profile.", enabled: true },
                    { label: "Community & Forum Replies", desc: "When someone replies to your posts or comments.", enabled: false },
                  ].map((pref, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                      <div className="flex-1">
                        <p className="text-slate-900 text-sm font-semibold">{pref.label}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{pref.desc}</p>
                      </div>
                      <button
                        onClick={() => toast.success("Preference updated.")}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${pref.enabled ? "bg-indigo-900" : "bg-slate-300"}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${pref.enabled ? "translate-x-5" : "translate-x-0"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
