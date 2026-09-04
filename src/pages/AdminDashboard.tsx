import { useState } from "react";
import {
  Users, BookOpen, Shield, BarChart3, AlertTriangle, CheckCircle2,
  Search, Trash2, Flag, TrendingUp, Activity, Clock, Eye,
  UserCheck, ChevronRight, Bell, Settings, Lock
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useAuth } from "@/lib/auth";

const ADMIN_STATS = [
  { label: "Total Users", value: "38,421", sub: "+842 this week", icon: <Users size={14} />, color: "text-indigo-900" },
  { label: "Active Courses", value: "214", sub: "18 pending review", icon: <BookOpen size={14} />, color: "text-eblue-600" },
  { label: "Mentor Verifications", value: "7 pending", sub: "3 flagged", icon: <UserCheck size={14} />, color: "text-warning" },
  { label: "Community Flags", value: "14", sub: "4 high priority", icon: <Flag size={14} />, color: "text-danger" },
];

const PENDING_VERIFICATIONS = [
  { name: "Priya Sharma", role: "Mentor", specialties: "Edge Computing, Rust", submitted: "2h ago", docs: true },
  { name: "Tech Corp Inc.", role: "Employer", specialties: "Hiring — 3 roles posted", submitted: "5h ago", docs: true },
  { name: "Marco Silva", role: "Instructor", specialties: "Database Internals Course", submitted: "1d ago", docs: false },
];

const RECENT_USERS = [
  { name: "Alex Volkov", role: "Professional Developer", email: "alex@example.com", joined: "2h ago", status: "Active" },
  { name: "Ryo Tanaka", role: "Student", email: "ryo@example.com", joined: "5h ago", status: "Active" },
  { name: "Sarah Kim", role: "Beginner Developer", email: "sarah@example.com", joined: "1d ago", status: "Active" },
  { name: "Marco Silva", role: "Instructor", email: "marco@example.com", joined: "2d ago", status: "Pending" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "verifications" | "content">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5 max-w-[1400px] mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
                    Admin Control Panel
                  </h1>
                  <span className="dd-chip bg-rose-50 text-rose-700 border border-rose-200 text-[10px]">🛡️ ADMIN</span>
                </div>
                <p className="text-slate-500 text-sm">Manage platform users, verify mentors/companies, moderate content, and monitor analytics.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost text-xs relative">
                  <Bell size={13} />
                  Alerts
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">4</span>
                </button>
                <button className="btn-ghost text-xs">
                  <Settings size={13} /> Platform Settings
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {ADMIN_STATS.map(stat => (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">{stat.label}</p>
                    <span className="text-slate-400">{stat.icon}</span>
                  </div>
                  <p className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
                  <p className="text-slate-400 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="dd-card overflow-hidden">
              <div className="flex border-b border-slate-100 px-4">
                {(["overview", "users", "verifications", "content"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                  >
                    {tab === "verifications" ? "Verifications (7)" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === "overview" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Platform health */}
                    <div className="dd-surface p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity size={14} className="text-success" />
                        <p className="text-slate-900 font-bold text-sm">Platform Health</p>
                        <span className="dd-chip-completed text-[10px] ml-auto">All Systems Operational</span>
                      </div>
                      {[
                        { label: "API Response Time", value: "42ms avg", ok: true },
                        { label: "Database Queries", value: "0 errors", ok: true },
                        { label: "Active Sessions", value: "4,821", ok: true },
                        { label: "Failed Logins (24h)", value: "12 attempts", ok: true },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
                          <span className="text-slate-600">{item.label}</span>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${item.ok ? "bg-success" : "bg-danger"}`} />
                            <span className="text-slate-900 font-semibold">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent signups graph placeholder */}
                    <div className="dd-surface p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={14} className="text-eblue-600" />
                        <p className="text-slate-900 font-bold text-sm">New Registrations (7 days)</p>
                      </div>
                      <div className="flex items-end gap-1.5 h-24">
                        {[38, 52, 41, 67, 55, 73, 84].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-indigo-200 hover:bg-indigo-400 rounded-sm transition-colors" style={{ height: `${h}%` }} />
                            <span className="text-[9px] text-slate-400">{["M","T","W","T","F","S","S"][i]}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-slate-500 text-xs mt-3">Total this week: <span className="text-indigo-900 font-bold">410 new users</span></p>
                    </div>

                    {/* Flags */}
                    <div className="dd-surface p-4 rounded-md md:col-span-2">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={14} className="text-warning" />
                        <p className="text-slate-900 font-bold text-sm">Moderation Queue</p>
                        <span className="dd-chip-pending text-[10px] ml-auto">14 items</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { type: "Comment", content: "Spam detected in community forum — Go module discussion", severity: "Medium", time: "1h ago" },
                          { type: "Profile", content: "Suspicious employer account — bulk messaging developers", severity: "High", time: "3h ago" },
                          { type: "Course", content: "Plagiarized content reported in 'Python Basics' course", severity: "High", time: "5h ago" },
                        ].map((f, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-md">
                            <span className={`dd-chip text-[10px] shrink-0 ${f.severity === "High" ? "dd-chip-error" : "dd-chip-pending"}`}>{f.severity}</span>
                            <span className="dd-chip-slate text-[10px] shrink-0">{f.type}</span>
                            <p className="text-slate-700 text-sm flex-1 min-w-0 truncate">{f.content}</p>
                            <span className="text-slate-400 text-xs shrink-0">{f.time}</span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button className="btn-ghost text-xs py-1"><Eye size={11} /> Review</button>
                              <button className="btn-danger text-xs py-1"><Trash2 size={11} /> Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "users" && (
                  <>
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search users by name, email, or role..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="dd-input pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {RECENT_USERS.filter(u =>
                        !searchQuery ||
                        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((u, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 border border-slate-200 rounded-md hover:border-slate-300 transition-colors">
                          <div className="w-9 h-9 rounded-full bg-indigo-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {u.name.split(" ").map(w => w[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 font-semibold text-sm">{u.name}</p>
                            <p className="text-slate-400 text-xs">{u.email} · {u.role}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-slate-400 text-xs">{u.joined}</span>
                            <span className={`dd-chip text-[10px] ${u.status === "Active" ? "dd-chip-completed" : "dd-chip-pending"}`}>{u.status}</span>
                            <button className="btn-ghost text-xs py-1">View</button>
                            <button className="text-xs text-danger hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors">Suspend</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "verifications" && (
                  <div className="space-y-3">
                    {PENDING_VERIFICATIONS.map((v, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border border-amber-200 bg-amber-50/40 rounded-md">
                        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                          <UserCheck size={16} className="text-warning" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-slate-900 font-semibold">{v.name}</p>
                            <span className="dd-chip-pending text-[10px]">{v.role} Verification</span>
                            {!v.docs && <span className="dd-chip-error text-[10px]">Docs Missing</span>}
                          </div>
                          <p className="text-slate-500 text-sm">{v.specialties}</p>
                          <p className="text-slate-400 text-xs mt-0.5">Submitted {v.submitted}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button className="btn-ghost text-xs"><Eye size={11} /> Review Docs</button>
                          <button className="btn-ghost text-xs text-danger border-red-200 hover:bg-red-50">Reject</button>
                          <button className="btn-primary text-xs bg-success hover:bg-emerald-600">
                            <CheckCircle2 size={11} /> Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="space-y-3">
                    <p className="text-slate-500 text-sm mb-3">Review submitted courses and challenges before publishing to the platform.</p>
                    {[
                      { title: "Database Internals: LSM Trees & B-Trees", author: "Marco Silva", type: "Course", submitted: "1 day ago", status: "Pending Review" },
                      { title: "ZK Proof Circuit Verifier — Expert Challenge", author: "Admin Team", type: "Challenge", submitted: "3 hours ago", status: "Pending Review" },
                      { title: "Advanced eBPF Tracing in Linux", author: "Priya Sharma", type: "Course", submitted: "2 days ago", status: "Needs Changes" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-md">
                        <div className="w-10 h-10 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                          <BookOpen size={15} className="text-indigo-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-slate-900 font-semibold truncate">{c.title}</p>
                            <span className="dd-chip-slate text-[10px] shrink-0">{c.type}</span>
                          </div>
                          <p className="text-slate-500 text-xs">by {c.author} · {c.submitted}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`dd-chip text-[10px] ${c.status === "Pending Review" ? "dd-chip-pending" : "dd-chip-error"}`}>{c.status}</span>
                          <button className="btn-ghost text-xs"><Eye size={11} /> Preview</button>
                          <button className="btn-primary text-xs bg-success hover:bg-emerald-600">Publish</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
