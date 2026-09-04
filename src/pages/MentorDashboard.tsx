import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Calendar, Star, MessageSquare, Clock, TrendingUp,
  CheckCircle2, Brain, Award, BarChart3, Zap, ChevronRight,
  Video, BookOpen, Bell
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useAuth } from "@/lib/auth";

const LEARNER_REQUESTS = [
  { id: "l1", name: "Priya Nair", goal: "Distributed Systems Path", level: "Intermediate", time: "Today, 2:00 PM", avatar: "PN", urgent: true },
  { id: "l2", name: "Ryo Tanaka", goal: "Go Concurrency Patterns", level: "Advanced", time: "Tomorrow, 10:00 AM", avatar: "RT", urgent: false },
  { id: "l3", name: "Marco Silva", goal: "Raft Consensus Deep-Dive", level: "Expert", time: "Thu, 6:00 PM", avatar: "MS", urgent: false },
];

const UPCOMING_SESSIONS = [
  { learner: "Priya Nair", topic: "Distributed Rate Limiting & Token Buckets", date: "Today 2:00 PM", duration: "60 min", paid: true },
  { learner: "Ryo Tanaka", topic: "Lock-Free Data Structures in Go", date: "Tomorrow 10:00 AM", duration: "45 min", paid: true },
];

const MENTOR_STATS = [
  { label: "Total Sessions", value: "142", sub: "+8 this month", icon: <Video size={14} /> },
  { label: "Avg. Rating", value: "4.94", sub: "from 118 reviews", icon: <Star size={14} /> },
  { label: "Active Learners", value: "23", sub: "7 new this month", icon: <Users size={14} /> },
  { label: "Revenue (month)", value: "$2,840", sub: "+$340 vs last", icon: <TrendingUp size={14} /> },
];

export default function MentorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"sessions" | "learners" | "reviews">("sessions");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5 max-w-[1200px] mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
                    Mentor Hub — {user?.name?.split(" ")[0]}
                  </h1>
                  <span className="dd-chip-ai text-[10px]">🧠 MENTOR</span>
                </div>
                <p className="text-slate-500 text-sm">Manage your sessions, learners, and reputation — all in one place.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost text-xs relative">
                  <Bell size={13} />
                  Requests
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">3</span>
                </button>
                <button className="btn-primary text-sm">
                  <Video size={14} /> Start Session
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {MENTOR_STATS.map(stat => (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">{stat.label}</p>
                    <span className="text-slate-400">{stat.icon}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
                  <p className="text-slate-400 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-5">
              {/* Main */}
              <div className="flex-1 min-w-0 space-y-4">
                {/* Tabs */}
                <div className="dd-card overflow-hidden">
                  <div className="flex border-b border-slate-100 px-4">
                    {(["sessions", "learners", "reviews"] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                      >
                        {tab === "sessions" ? "Upcoming Sessions" : tab === "learners" ? "Learner Requests" : "Reviews"}
                      </button>
                    ))}
                  </div>

                  <div className="p-4">
                    {activeTab === "sessions" && (
                      <div className="space-y-3">
                        {UPCOMING_SESSIONS.map((s, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-md hover:border-slate-300 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                              {s.learner.split(" ").map(w => w[0]).join("")}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-slate-900 font-semibold">{s.learner}</p>
                              <p className="text-slate-500 text-sm">{s.topic}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                <Calendar size={11} />
                                <span>{s.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="dd-chip-slate text-[10px]">{s.duration}</span>
                                {s.paid && <span className="dd-chip-completed text-[10px]">Paid</span>}
                              </div>
                            </div>
                            <button className="btn-primary text-xs shrink-0">
                              <Video size={12} /> Join
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "learners" && (
                      <div className="space-y-3">
                        {LEARNER_REQUESTS.map(req => (
                          <div key={req.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-md">
                            <div className="w-10 h-10 rounded-full bg-ai-dark flex items-center justify-center text-white text-sm font-bold shrink-0">
                              {req.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-slate-900 font-semibold">{req.name}</p>
                                {req.urgent && <span className="dd-chip-error text-[10px]">Urgent</span>}
                              </div>
                              <p className="text-slate-500 text-sm">{req.goal}</p>
                              <p className="text-slate-400 text-xs mt-0.5">{req.time} · {req.level}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button className="btn-ghost text-xs">Decline</button>
                              <button className="btn-primary text-xs">Accept</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "reviews" && (
                      <div className="space-y-3">
                        {[
                          { name: "Priya Nair", rating: 5, text: "James helped me understand Raft consensus in a way no documentation ever could. Absolute legend.", date: "2 days ago" },
                          { name: "Ryo Tanaka", rating: 5, text: "Incredible depth of knowledge on lock-free patterns. Every session is worth 10x the cost.", date: "1 week ago" },
                          { name: "Marco Silva", rating: 4, text: "Super knowledgeable. Session could have gone slightly deeper on failure scenarios.", date: "2 weeks ago" },
                        ].map((r, i) => (
                          <div key={i} className="p-4 border border-slate-200 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center text-xs font-bold">
                                  {r.name.split(" ").map(w => w[0]).join("")}
                                </div>
                                <span className="text-slate-900 font-semibold text-sm">{r.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, si) => (
                                  <Star key={si} size={12} className={si < r.rating ? "text-warning fill-current" : "text-slate-200"} />
                                ))}
                                <span className="text-slate-400 text-xs ml-1">{r.date}</span>
                              </div>
                            </div>
                            <p className="text-slate-600 text-sm italic">"{r.text}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Rail */}
              <div className="w-72 shrink-0 space-y-4">
                {/* Mentor Profile Card */}
                <div className="dd-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold">
                      {user?.avatar}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">{user?.name}</p>
                      <p className="text-slate-500 text-xs">Mentor · DevDeep Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className="text-warning fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-900 text-sm font-bold">4.94</span>
                    <span className="text-slate-400 text-xs">(118 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    Available for new learners
                  </div>
                  <button className="btn-ghost w-full justify-center mt-3 text-xs">Edit Mentor Profile</button>
                </div>

                {/* Reputation */}
                <div className="dd-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={14} className="text-indigo-700" />
                    <p className="text-slate-900 font-bold text-sm">Reputation & Badges</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Expert Mentor", color: "dd-chip-ai" },
                      { label: "Top 5% Rating", color: "dd-chip-completed" },
                      { label: "100+ Sessions", color: "dd-chip-indigo" },
                    ].map(b => (
                      <div key={b.label} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-success" />
                        <span className={`dd-chip ${b.color} text-[10px]`}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="dd-card p-4">
                  <p className="text-slate-900 font-bold text-sm mb-3">Quick Actions</p>
                  <div className="space-y-2">
                    {[
                      { label: "Set Availability", icon: <Calendar size={13} /> },
                      { label: "Add Expertise Areas", icon: <Brain size={13} /> },
                      { label: "View Earnings Report", icon: <BarChart3 size={13} /> },
                      { label: "Message a Learner", icon: <MessageSquare size={13} /> },
                    ].map(a => (
                      <button key={a.label} className="w-full flex items-center gap-2.5 p-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors text-left">
                        <span className="text-slate-400">{a.icon}</span>
                        {a.label}
                        <ChevronRight size={12} className="ml-auto text-slate-300" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
