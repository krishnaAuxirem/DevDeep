import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Users, DollarSign, BarChart3, Plus, ChevronRight,
  CheckCircle2, Eye, Edit3, Upload, Star, TrendingUp, Play, Award,
  FileText, Bell
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useAuth } from "@/lib/auth";

const COURSES = [
  { id: "c1", title: "Distributed Systems Engineering in Go", learners: 1240, rating: 4.8, revenue: "$18,420", status: "Published", progress: 100 },
  { id: "c2", title: "Lock-Free Data Structures & Atomics", learners: 842, rating: 4.9, revenue: "$11,870", status: "Published", progress: 100 },
  { id: "c3", title: "Database Internals: LSM Trees & B-Trees", learners: 0, rating: 0, revenue: "$0", status: "In Review", progress: 75 },
  { id: "c4", title: "eBPF Performance Tracing in Linux", learners: 0, rating: 0, revenue: "$0", status: "Draft", progress: 30 },
];

const INSTRUCTOR_STATS = [
  { label: "Total Learners", value: "2,082", sub: "+124 this month", icon: <Users size={14} />, color: "text-indigo-900" },
  { label: "Published Courses", value: "2", sub: "2 in pipeline", icon: <BookOpen size={14} />, color: "text-eblue-600" },
  { label: "Monthly Revenue", value: "$1,860", sub: "+$340 vs last month", icon: <DollarSign size={14} />, color: "text-success" },
  { label: "Avg. Course Rating", value: "4.85", sub: "from 492 reviews", icon: <Star size={14} />, color: "text-warning" },
];

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"courses" | "learners" | "revenue">("courses");

  const statusChip = (status: string) => {
    if (status === "Published") return "dd-chip-completed";
    if (status === "In Review") return "dd-chip-pending";
    return "dd-chip-slate";
  };

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
                    Instructor Studio — {user?.name?.split(" ")[0]}
                  </h1>
                  <span className="dd-chip bg-purple-50 text-purple-700 border border-purple-200 text-[10px]">📚 INSTRUCTOR</span>
                </div>
                <p className="text-slate-500 text-sm">Create, publish, and manage your courses. Track learners and revenue.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost text-xs">
                  <Bell size={13} /> Notifications
                </button>
                <button className="btn-primary text-sm">
                  <Plus size={14} /> New Course
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {INSTRUCTOR_STATS.map(stat => (
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

            {/* Tabs + Courses */}
            <div className="dd-card overflow-hidden">
              <div className="flex border-b border-slate-100 px-4">
                {(["courses", "learners", "revenue"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                  >
                    {tab === "courses" ? "My Courses" : tab === "learners" ? "Learner Progress" : "Revenue"}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === "courses" && (
                  <div className="space-y-3">
                    {COURSES.map(course => (
                      <div key={course.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-md hover:border-slate-300 transition-all">
                        <div className="w-10 h-10 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                          <BookOpen size={16} className="text-indigo-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-slate-900 font-semibold truncate">{course.title}</p>
                            <span className={`dd-chip ${statusChip(course.status)} text-[10px] shrink-0`}>{course.status}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Users size={11} />{course.learners.toLocaleString()} learners</span>
                            {course.rating > 0 && <span className="flex items-center gap-1"><Star size={11} className="text-warning" />{course.rating}</span>}
                            <span className="text-success font-semibold">{course.revenue}</span>
                          </div>
                          {course.status !== "Published" && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex-1 progress-track h-1.5">
                                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                              </div>
                              <span className="text-xs text-slate-400">{course.progress}%</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="btn-ghost text-xs py-1.5">
                            <Eye size={11} /> Preview
                          </button>
                          {course.status === "Published" ? (
                            <button className="btn-ghost text-xs py-1.5 text-eblue-600 border-blue-200">
                              <BarChart3 size={11} /> Analytics
                            </button>
                          ) : (
                            <button className="btn-primary text-xs">
                              {course.status === "Draft" ? <><Edit3 size={11} /> Edit</> : <><Upload size={11} /> Submit</>}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Create new CTA */}
                    <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-md text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors">
                      <Plus size={16} />
                      <span className="text-sm font-medium">Start a new course</span>
                    </button>
                  </div>
                )}

                {activeTab === "learners" && (
                  <div className="space-y-3">
                    {[
                      { name: "Priya Nair", course: "Distributed Systems Engineering in Go", progress: 68, lastActive: "2 hrs ago" },
                      { name: "Ryo Tanaka", course: "Lock-Free Data Structures & Atomics", progress: 91, lastActive: "1 day ago" },
                      { name: "Marco Silva", course: "Distributed Systems Engineering in Go", progress: 45, lastActive: "3 days ago" },
                      { name: "Aisha Johnson", course: "Lock-Free Data Structures & Atomics", progress: 100, lastActive: "1 week ago" },
                    ].map((l, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-md">
                        <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {l.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 text-sm font-semibold">{l.name}</p>
                          <p className="text-slate-400 text-xs truncate">{l.course}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="w-24">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-slate-500">{l.progress}%</span>
                            </div>
                            <div className="progress-track h-1.5">
                              <div className={l.progress === 100 ? "progress-fill-cyan h-full rounded-full" : "progress-fill"} style={{ width: `${l.progress}%` }} />
                            </div>
                          </div>
                          <span className="text-slate-400 text-xs">{l.lastActive}</span>
                          {l.progress === 100 && <CheckCircle2 size={13} className="text-success" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "revenue" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "This Month", value: "$1,860", change: "+22%" },
                        { label: "Last Month", value: "$1,520", change: "" },
                        { label: "All Time", value: "$30,290", change: "" },
                      ].map(r => (
                        <div key={r.label} className="dd-surface p-4 rounded-md text-center">
                          <p className="text-slate-400 text-xs mb-1">{r.label}</p>
                          <p className="text-slate-900 text-2xl font-bold">{r.value}</p>
                          {r.change && <p className="text-success text-xs font-semibold mt-0.5">{r.change}</p>}
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-md text-sm text-slate-700">
                      Next payout: <span className="font-bold text-indigo-900">$1,860</span> on the 1st of next month. Minimum payout: $100.
                    </div>
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
