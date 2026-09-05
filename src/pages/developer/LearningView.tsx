import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen, GraduationCap, TrendingUp, Play, CheckCircle2,
  Clock, Award, Search, ArrowRight, Filter
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { LEARNING_PATHS } from "@/constants/data";
import { toast } from "sonner";

interface LearningViewProps {
  initialTab?: "paths" | "courses" | "progress";
}

const ENROLLED_COURSES = [
  {
    id: "c-dist-go",
    title: "Distributed Systems Engineering in Go 1.22",
    instructor: "Alexei Volkov",
    progress: 68,
    totalModules: 12,
    currentModule: 8,
    lastCheckpoint: "Raft Consensus Protocol & Leader Election",
    timeRemaining: "42 min remaining",
    category: "Systems",
  },
  {
    id: "c-fullstack-ts",
    title: "Full-Stack TypeScript & Distributed Edge",
    instructor: "Sarah Chen",
    progress: 45,
    totalModules: 10,
    currentModule: 5,
    lastCheckpoint: "Server Actions & Optimistic Cache Invalidation",
    timeRemaining: "1h 15m remaining",
    category: "Web & Edge",
  },
  {
    id: "c-lockfree-rust",
    title: "Lock-Free Concurrency & Atomics in Rust",
    instructor: "Marcus Thorne",
    progress: 25,
    totalModules: 8,
    currentModule: 2,
    lastCheckpoint: "CAS Loop Atomic Pointer Swap",
    timeRemaining: "2h remaining",
    category: "Concurrency",
  },
];

export default function LearningView({ initialTab }: LearningViewProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from route or prop
  const currentPath = location.pathname;
  const defaultTab = initialTab ?? (currentPath.includes("courses") ? "courses" : currentPath.includes("progress") ? "progress" : "paths");
  const [activeTab, setActiveTab] = useState<"paths" | "courses" | "progress">(defaultTab);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPaths = LEARNING_PATHS.filter((lp) =>
    lp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Learning Center</h1>
                <span className="dd-chip-indigo text-[10px]">3 ACTIVE PATHS</span>
              </div>
              <p className="text-slate-500 text-sm">
                Production engineering curriculum with AST-validated assertions and active recall.
              </p>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab("paths")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === "paths" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Learning Paths
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === "courses" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                My Courses (3)
              </button>
              <button
                onClick={() => setActiveTab("progress")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === "progress" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Progress & Metrics
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter tracks, tags, or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="dd-input pl-9 text-xs"
              />
            </div>
          </div>

          {/* Tab 1: Learning Paths */}
          {activeTab === "paths" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPaths.map((lp) => (
                <div key={lp.id} className="dd-card p-5 flex flex-col justify-between hover:border-indigo-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`dd-chip text-[10px] ${lp.difficulty === "Expert" ? "dd-chip-purple" : "dd-chip-pending"}`}>
                        {lp.difficulty}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{lp.duration} · {lp.totalModules} modules</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{lp.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{lp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {lp.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Completion</span>
                        <span className="font-bold text-indigo-950 font-mono">{lp.progress}%</span>
                      </div>
                      <div className="progress-track h-2">
                        <div className="progress-fill" style={{ width: `${lp.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-slate-500">Module {lp.currentModule} of {lp.totalModules}</span>
                      <button
                        onClick={() => {
                          toast.success(`Resuming module in ${lp.title}`);
                          navigate("/challenge/c1");
                        }}
                        className="btn-primary text-xs py-1.5"
                      >
                        <Play size={12} /> Continue Path
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Enrolled Courses */}
          {activeTab === "courses" && (
            <div className="space-y-4">
              {ENROLLED_COURSES.map((course) => (
                <div key={course.id} className="dd-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-indigo-300 transition-colors">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="dd-chip-indigo text-[10px]">{course.category}</span>
                      <span className="text-xs text-slate-400">Instructor: {course.instructor}</span>
                      <span className="text-xs text-slate-400">• {course.timeRemaining}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 truncate">{course.title}</h3>
                    <p className="text-xs text-slate-600">
                      Checkpoint: <span className="font-medium text-indigo-900">{course.lastCheckpoint}</span>
                    </p>
                    <div className="w-full max-w-md flex items-center gap-3 pt-1">
                      <div className="flex-1 progress-track h-1.5">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-700">{course.progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => {
                        toast.success(`Opening sandbox for ${course.title}`);
                        navigate("/challenge/c1");
                      }}
                      className="btn-primary text-xs py-2 w-full md:w-auto justify-center"
                    >
                      <Play size={12} /> Resume Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Progress & Metrics */}
          {activeTab === "progress" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="dd-card p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Total Curriculum Hours</h3>
                <p className="text-3xl font-bold text-slate-900 font-mono">112.5 hrs</p>
                <p className="text-xs text-emerald-600">+14.2 hrs logged this month</p>
              </div>
              <div className="dd-card p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Modules Mastered</h3>
                <p className="text-3xl font-bold text-indigo-900 font-mono">34 / 48</p>
                <p className="text-xs text-slate-500">70.8% aggregate completion rate</p>
              </div>
              <div className="dd-card p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">AST Review Pass Rate</h3>
                <p className="text-3xl font-bold text-cyan-700 font-mono">92.4%</p>
                <p className="text-xs text-cyan-600">Zero unpatched critical hazards</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
