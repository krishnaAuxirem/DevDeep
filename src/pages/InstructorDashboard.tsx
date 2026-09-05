import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Users, DollarSign, BarChart3, Plus, ChevronRight,
  CheckCircle2, Eye, Edit3, Upload, Star, TrendingUp, Play, Award,
  FileText, Bell, IndianRupee, Trash2, X, MessageSquare, CornerDownRight,
  Sparkles, Layers, Clock, ShieldCheck, Check, Search, Filter, Archive
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import LiveActivityStream from "@/components/features/LiveActivityStream";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "lab" | "quiz";
  duration: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseItem {
  id: string;
  title: string;
  track: string;
  difficulty: string;
  price: number;
  learners: number;
  rating: number;
  revenue: number;
  status: "Published" | "Draft" | "In Review";
  progress: number;
  modulesCount: number;
}

interface ReviewItem {
  id: string;
  courseTitle: string;
  student: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
}

interface LearnerProgressItem {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActive: string;
  certIssued: boolean;
}

const INITIAL_COURSES: CourseItem[] = [
  {
    id: "c1",
    title: "Distributed Systems Engineering in Go 1.22",
    track: "Distributed Systems",
    difficulty: "Advanced",
    price: 4999,
    learners: 1240,
    rating: 4.8,
    revenue: 6198760,
    status: "Published",
    progress: 100,
    modulesCount: 12,
  },
  {
    id: "c2",
    title: "Lock-Free Concurrency & Atomics in Rust",
    track: "Concurrency",
    difficulty: "Expert",
    price: 3999,
    learners: 842,
    rating: 4.9,
    revenue: 3367158,
    status: "Published",
    progress: 100,
    modulesCount: 9,
  },
  {
    id: "c3",
    title: "Database Internals: LSM Trees, WAL & B-Trees",
    track: "Storage Engines",
    difficulty: "Staff",
    price: 5499,
    learners: 0,
    rating: 0,
    revenue: 0,
    status: "In Review",
    progress: 85,
    modulesCount: 14,
  },
  {
    id: "c4",
    title: "eBPF Kernel Tracing & Observability in Linux",
    track: "Systems & Linux",
    difficulty: "Advanced",
    price: 3499,
    learners: 0,
    rating: 0,
    revenue: 0,
    status: "Draft",
    progress: 40,
    modulesCount: 6,
  },
];

const REVENUE_CHART_DATA = [
  { month: "Sep 2025", revenue: 420000, learners: 110 },
  { month: "Oct 2025", revenue: 580000, learners: 154 },
  { month: "Nov 2025", revenue: 790000, learners: 210 },
  { month: "Dec 2025", revenue: 940000, learners: 245 },
  { month: "Jan 2026", revenue: 1260000, learners: 320 },
  { month: "Feb 2026", revenue: 1540000, learners: 395 },
];

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    courseTitle: "Distributed Systems Engineering in Go 1.22",
    student: "Alexei Volkov",
    avatar: "AV",
    rating: 5,
    date: "2 days ago",
    comment: "The Raft protocol consensus implementation lab is world-class. It helped me pass my Staff Engineer interview at Uber!",
    reply: "Thanks Alexei! Delighted the RPC partition simulation was helpful in your prep.",
  },
  {
    id: "rev-2",
    courseTitle: "Lock-Free Concurrency & Atomics in Rust",
    student: "Priya Sharma",
    avatar: "PS",
    rating: 5,
    date: "4 days ago",
    comment: "Clear visual breakdown of memory fences, acquire-release semantics, and atomic compare-and-swap loops.",
  },
  {
    id: "rev-3",
    courseTitle: "Distributed Systems Engineering in Go 1.22",
    student: "Kenji Sato",
    avatar: "KS",
    rating: 4,
    date: "1 week ago",
    comment: "Excellent course content. Would appreciate an extra lab on multi-raft linearizable reads.",
  },
];

const INITIAL_LEARNERS: LearnerProgressItem[] = [
  { id: "l1", name: "Priya Nair", email: "priya.nair@example.com", course: "Distributed Systems Engineering in Go 1.22", progress: 68, lastActive: "2 hrs ago", certIssued: false },
  { id: "l2", name: "Ryo Tanaka", email: "ryo.tanaka@example.com", course: "Lock-Free Concurrency & Atomics in Rust", progress: 91, lastActive: "1 day ago", certIssued: false },
  { id: "l3", name: "Marco Silva", email: "marco.silva@example.com", course: "Distributed Systems Engineering in Go 1.22", progress: 45, lastActive: "3 days ago", certIssued: false },
  { id: "l4", name: "Aisha Johnson", email: "aisha.j@example.com", course: "Lock-Free Concurrency & Atomics in Rust", progress: 100, lastActive: "1 week ago", certIssued: true },
  { id: "l5", name: "Vikram Mehta", email: "vikram.m@example.com", course: "Distributed Systems Engineering in Go 1.22", progress: 100, lastActive: "Yesterday", certIssued: false },
];

export default function InstructorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [activeTab, setActiveTab] = useState<"courses" | "learners" | "reviews" | "revenue">("courses");
  const [courseFilter, setCourseFilter] = useState<"all" | "Published" | "Draft" | "In Review">("all");
  const [learnerSearch, setLearnerSearch] = useState("");
  const [learnersList, setLearnersList] = useState<LearnerProgressItem[]>(INITIAL_LEARNERS);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  // Modal Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);

  // Wizard form data
  const [wizardTitle, setWizardTitle] = useState("");
  const [wizardTrack, setWizardTrack] = useState("Distributed Systems");
  const [wizardDifficulty, setWizardDifficulty] = useState("Advanced");
  const [wizardPrice, setWizardPrice] = useState("4999");
  const [wizardDesc, setWizardDesc] = useState("");
  const [wizardModules, setWizardModules] = useState<Module[]>([
    {
      id: "m-1",
      title: "Module 1: Foundations & Architecture Spec",
      lessons: [
        { id: "l-1-1", title: "RPC Protocol & Wire Formats", type: "video", duration: "18m" },
        { id: "l-1-2", title: "State Machine Replication Benchmark", type: "lab", duration: "45m" },
      ],
    },
    {
      id: "m-2",
      title: "Module 2: Core Algorithm Implementation",
      lessons: [
        { id: "l-2-1", title: "Consensus Election Loop", type: "video", duration: "25m" },
        { id: "l-2-2", title: "Fuzzing & Network Partition Injection", type: "lab", duration: "60m" },
      ],
    },
  ]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("m-1");

  // Format currency helper
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statusChip = (status: string) => {
    if (status === "Published") return "dd-chip-completed";
    if (status === "In Review") return "dd-chip-pending";
    return "dd-chip-slate";
  };

  // Add module
  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: Module = {
      id: `m-${Date.now()}`,
      title: newModuleTitle.trim(),
      lessons: [],
    };
    setWizardModules(prev => [...prev, newMod]);
    setNewModuleTitle("");
    setSelectedModuleId(newMod.id);
    toast.success("Module added to curriculum.");
  };

  // Add lesson
  const handleAddLesson = () => {
    if (!newLessonTitle.trim()) return;
    setWizardModules(prev =>
      prev.map(mod => {
        if (mod.id === selectedModuleId) {
          return {
            ...mod,
            lessons: [
              ...mod.lessons,
              {
                id: `l-${Date.now()}`,
                title: newLessonTitle.trim(),
                type: "lab",
                duration: "30m",
              },
            ],
          };
        }
        return mod;
      })
    );
    setNewLessonTitle("");
    toast.success("Lesson added.");
  };

  // Remove module
  const handleRemoveModule = (id: string) => {
    setWizardModules(prev => prev.filter(m => m.id !== id));
    if (selectedModuleId === id && wizardModules.length > 1) {
      setSelectedModuleId(wizardModules.find(m => m.id !== id)?.id || "");
    }
  };

  // Submit wizard
  const handleCreateCourseSubmit = (publishImmediately: boolean) => {
    if (!wizardTitle.trim()) {
      toast.error("Please enter a course title.");
      return;
    }

    const newCourse: CourseItem = {
      id: `c-${Date.now()}`,
      title: wizardTitle.trim(),
      track: wizardTrack,
      difficulty: wizardDifficulty,
      price: parseInt(wizardPrice, 10) || 4999,
      learners: 0,
      rating: 0,
      revenue: 0,
      status: publishImmediately ? "In Review" : "Draft",
      progress: publishImmediately ? 90 : 30,
      modulesCount: wizardModules.length,
    };

    setCourses(prev => [newCourse, ...prev]);
    setIsWizardOpen(false);
    // Reset form
    setWizardStep(1);
    setWizardTitle("");
    setWizardDesc("");
    toast.success(
      publishImmediately
        ? `Course submitted for review! Our engineering council will verify within 24h.`
        : `Course saved as Draft.`
    );
  };

  // Grant certificate action
  const handleGrantCertificate = (id: string, name: string) => {
    setLearnersList(prev =>
      prev.map(l => (l.id === id ? { ...l, certIssued: true, progress: 100 } : l))
    );
    toast.success(`Cryptographic certificate verified & issued to ${name}!`);
  };

  // Reply to review
  const handlePostReply = (reviewId: string) => {
    const text = replyInput[reviewId];
    if (!text || !text.trim()) return;

    setReviewsList(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, reply: text.trim() } : r))
    );
    setReplyInput(prev => ({ ...prev, [reviewId]: "" }));
    setActiveReplyId(null);
    toast.success("Your reply was posted.");
  };

  // Filtered courses
  const filteredCourses = courses.filter(c => {
    if (courseFilter === "all") return true;
    return c.status === courseFilter;
  });

  // Filtered learners
  const filteredLearners = learnersList.filter(l =>
    !learnerSearch ||
    l.name.toLowerCase().includes(learnerSearch.toLowerCase()) ||
    l.course.toLowerCase().includes(learnerSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-[1300px] mx-auto">

            {/* Header & Author Bio */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-md border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-md bg-indigo-900 flex items-center justify-center text-white text-xl font-bold font-mono shrink-0 shadow-inner">
                  {user?.name ? user.name.split(" ").map(w => w[0]).join("") : "IS"}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
                      Instructor Studio — {user?.name || "Dr. Rajeshwar Rao"}
                    </h1>
                    <span className="dd-chip bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-mono inline-flex items-center gap-1">
                      <BookOpen size={11} /> VERIFIED INSTRUCTOR
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Staff Distributed Systems Specialist · Author of 2 Published Curriculums · Avg Course Rating 4.85 / 5
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => toast.info("Instructor notifications: 3 new enrollments and 1 review pending.")}
                  className="btn-ghost text-xs"
                >
                  <Bell size={13} /> Alerts
                </button>
                <button
                  onClick={() => {
                    setIsWizardOpen(true);
                    setWizardStep(1);
                  }}
                  className="btn-primary text-sm shadow-sm"
                >
                  <Plus size={15} /> Create Course
                </button>
              </div>
            </div>

            {/* Live Telemetry Ticker */}
            <LiveActivityStream />

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Total Enrolled Learners</p>
                  <Users size={14} className="text-indigo-900" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">2,082</p>
                <p className="text-success text-xs font-semibold mt-0.5">+124 this month</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Published Courses</p>
                  <BookOpen size={14} className="text-eblue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">2</p>
                <p className="text-slate-400 text-xs">2 in creation pipeline</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Monthly Revenue (INR)</p>
                  <IndianRupee size={14} className="text-success" />
                </div>
                <p className="text-2xl font-bold text-success font-mono">₹1,54,000</p>
                <p className="text-slate-400 text-xs">+₹28,000 vs last month</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Avg. Course Rating</p>
                  <Star size={14} className="text-warning" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">4.85</p>
                <p className="text-slate-400 text-xs">from 492 verified reviews</p>
              </div>
            </div>

            {/* Main Tabs Container */}
            <div className="dd-card overflow-hidden bg-white">
              <div className="flex border-b border-slate-100 px-4 bg-slate-50/50 overflow-x-auto">
                {[
                  { id: "courses", label: `My Courses (${courses.length})` },
                  { id: "learners", label: `Learners & Progress (${learnersList.length})` },
                  { id: "reviews", label: `Reviews (${reviewsList.length})` },
                  { id: "revenue", label: "Revenue & Analytics" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                      activeTab === tab.id
                        ? "text-indigo-900 border-indigo-900 bg-white"
                        : "text-slate-500 border-transparent hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* TAB 1: COURSES */}
                {activeTab === "courses" && (
                  <div className="space-y-4">
                    {/* Filter buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md">
                        {(["all", "Published", "In Review", "Draft"] as const).map(status => (
                          <button
                            key={status}
                            onClick={() => setCourseFilter(status)}
                            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                              courseFilter === status
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {status === "all" ? "All Courses" : status}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setIsWizardOpen(true);
                          setWizardStep(1);
                        }}
                        className="btn-primary text-xs"
                      >
                        <Plus size={13} /> Add New Course
                      </button>
                    </div>

                    {/* Course List */}
                    <div className="space-y-3">
                      {filteredCourses.map(course => (
                        <div
                          key={course.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-200 rounded-md hover:border-slate-300 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                              <BookOpen size={20} className="text-indigo-700" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-slate-900 font-bold text-base">{course.title}</h3>
                                <span className={`dd-chip ${statusChip(course.status)} text-[10px]`}>
                                  {course.status}
                                </span>
                                <span className="dd-chip-slate text-[10px]">{course.track}</span>
                                <span className="dd-chip-indigo text-[10px]">{course.difficulty}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                                <span className="flex items-center gap-1 font-mono font-semibold text-slate-700">
                                  <IndianRupee size={12} /> {formatINR(course.price)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users size={12} /> {course.learners.toLocaleString()} learners
                                </span>
                                {course.rating > 0 && (
                                  <span className="flex items-center gap-1 text-warning font-semibold">
                                    <Star size={12} className="fill-amber-400" /> {course.rating}
                                  </span>
                                )}
                                <span>{course.modulesCount} modules</span>
                                {course.revenue > 0 && (
                                  <span className="text-success font-semibold font-mono">
                                    Gross: {formatINR(course.revenue)}
                                  </span>
                                )}
                              </div>
                              {course.status !== "Published" && (
                                <div className="mt-2.5 flex items-center gap-2 max-w-xs">
                                  <div className="flex-1 progress-track h-1.5">
                                    <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                                  </div>
                                  <span className="text-xs font-mono text-slate-400">{course.progress}% build</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                            <button
                              onClick={() => toast.info(`Previewing syllabus & test environment for: ${course.title}`)}
                              className="btn-ghost text-xs py-1.5"
                            >
                              <Eye size={12} /> Preview
                            </button>
                            {course.status === "Published" ? (
                              <button
                                onClick={() => setActiveTab("revenue")}
                                className="btn-ghost text-xs py-1.5 text-eblue-600 border-blue-200"
                              >
                                <BarChart3 size={12} /> Analytics
                              </button>
                            ) : course.status === "Draft" ? (
                              <button
                                onClick={() => {
                                  setCourses(prev =>
                                    prev.map(c => (c.id === course.id ? { ...c, status: "In Review" } : c))
                                  );
                                  toast.success(`Submitted "${course.title}" for review!`);
                                }}
                                className="btn-primary text-xs py-1.5"
                              >
                                <Upload size={12} /> Submit Review
                              </button>
                            ) : (
                              <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 font-medium">
                                In Review
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setCourses(prev => prev.filter(c => c.id !== course.id));
                                toast.success(`Course archived: ${course.title}`);
                              }}
                              className="btn-ghost text-xs py-1.5 text-slate-400 hover:text-rose-600"
                              title="Archive"
                            >
                              <Archive size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: LEARNERS & PROGRESS */}
                {activeTab === "learners" && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="relative flex-1 max-w-md">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search learner by name or enrolled course..."
                          value={learnerSearch}
                          onChange={e => setLearnerSearch(e.target.value)}
                          className="dd-input pl-9 text-xs"
                        />
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        Showing {filteredLearners.length} active students
                      </span>
                    </div>

                    <div className="border border-slate-200 rounded-md overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="p-3 font-semibold">Student</th>
                            <th className="p-3 font-semibold">Enrolled Course</th>
                            <th className="p-3 font-semibold">Progress</th>
                            <th className="p-3 font-semibold">Last Active</th>
                            <th className="p-3 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredLearners.map(learner => (
                            <tr key={learner.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="p-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    {learner.name.split(" ").map(w => w[0]).join("")}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900">{learner.name}</p>
                                    <p className="text-slate-400 text-[11px]">{learner.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-slate-700 font-medium">{learner.course}</td>
                              <td className="p-3">
                                <div className="w-32">
                                  <div className="flex items-center justify-between mb-1 text-[11px]">
                                    <span className="font-semibold text-slate-700">{learner.progress}%</span>
                                    {learner.certIssued && (
                                      <span className="text-success font-bold">Certified</span>
                                    )}
                                  </div>
                                  <div className="progress-track h-1.5">
                                    <div
                                      className={learner.progress === 100 ? "progress-fill-cyan h-full rounded-full" : "progress-fill"}
                                      style={{ width: `${learner.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-slate-500">{learner.lastActive}</td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => toast.info(`Direct message window opened with ${learner.name}`)}
                                    className="btn-ghost text-xs py-1 px-2.5"
                                  >
                                    <MessageSquare size={11} /> Message
                                  </button>
                                  {learner.certIssued ? (
                                    <span className="dd-chip-completed text-[10px] py-1 px-2 flex items-center gap-1">
                                      <CheckCircle2 size={11} /> Issued
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleGrantCertificate(learner.id, learner.name)}
                                      className="btn-primary text-xs py-1 px-2.5"
                                    >
                                      <Award size={11} /> Issue Cert
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: REVIEWS */}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-md flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-indigo-900">Student Satisfaction & Feedback</p>
                        <p className="text-xs text-indigo-700">98.2% positive rating across 492 student reviews.</p>
                      </div>
                      <div className="flex items-center gap-1 text-warning font-bold text-lg font-mono">
                        <Star size={16} className="fill-amber-400" /> 4.85 / 5.0
                      </div>
                    </div>

                    <div className="space-y-3">
                      {reviewsList.map(review => (
                        <div key={review.id} className="p-4 border border-slate-200 rounded-md space-y-2.5">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                                {review.avatar}
                              </div>
                              <div>
                                <p className="text-slate-900 font-bold text-sm">{review.student}</p>
                                <p className="text-slate-400 text-xs">{review.courseTitle} · {review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} size={13} className="fill-amber-400" />
                              ))}
                            </div>
                          </div>

                          <p className="text-slate-700 text-xs leading-relaxed">{review.comment}</p>

                          {/* Existing reply */}
                          {review.reply && (
                            <div className="ml-6 p-3 bg-slate-50 border-l-2 border-indigo-700 rounded-r text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                                <CornerDownRight size={12} /> Instructor Response:
                              </div>
                              <p className="text-slate-600">{review.reply}</p>
                            </div>
                          )}

                          {/* Reply input */}
                          {!review.reply && (
                            <div className="pt-2">
                              {activeReplyId === review.id ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={replyInput[review.id] || ""}
                                    onChange={e =>
                                      setReplyInput({ ...replyInput, [review.id]: e.target.value })
                                    }
                                    placeholder="Write a helpful response to the student..."
                                    className="dd-input text-xs w-full h-20 p-2.5"
                                  />
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => setActiveReplyId(null)}
                                      className="btn-ghost text-xs"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handlePostReply(review.id)}
                                      className="btn-primary text-xs"
                                    >
                                      Post Response
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setActiveReplyId(review.id)}
                                  className="text-xs text-indigo-700 font-semibold hover:underline flex items-center gap-1"
                                >
                                  <CornerDownRight size={12} /> Reply to Student
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: REVENUE & ANALYTICS */}
                {activeTab === "revenue" && (
                  <div className="space-y-5">
                    {/* Quick KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="dd-surface p-4 rounded-md">
                        <p className="text-slate-400 text-xs font-semibold uppercase">Net Earnings (This Month)</p>
                        <p className="text-2xl font-bold font-mono text-slate-900 mt-1">₹1,54,000</p>
                        <p className="text-success text-xs font-medium mt-0.5">85% instructor revenue share</p>
                      </div>
                      <div className="dd-surface p-4 rounded-md">
                        <p className="text-slate-400 text-xs font-semibold uppercase">Refund Rate</p>
                        <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">0.4%</p>
                        <p className="text-slate-400 text-xs mt-0.5">Platform avg: 2.1% (Superb quality)</p>
                      </div>
                      <div className="dd-surface p-4 rounded-md">
                        <p className="text-slate-400 text-xs font-semibold uppercase">Avg. Completion Rate</p>
                        <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">68.4%</p>
                        <p className="text-slate-400 text-xs mt-0.5">High industry benchmark</p>
                      </div>
                    </div>

                    {/* Dynamic Recharts Monthly Earnings */}
                    <div className="dd-card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Monthly Revenue Telemetry (₹ INR)</h4>
                          <p className="text-xs text-slate-500">Trailing 6-month payout and enrollment trajectory</p>
                        </div>
                        <span className="dd-chip-ai text-[10px]">RECHARTS ENGINE</span>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={REVENUE_CHART_DATA} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="instructorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1e1b4b" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#1e1b4b" stopOpacity={0.0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                            <YAxis
                              stroke="#94a3b8"
                              fontSize={11}
                              tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`}
                            />
                            <Tooltip
                              formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Gross Earnings"]}
                              labelStyle={{ fontWeight: "bold" }}
                            />
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              stroke="#1e1b4b"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#instructorRev)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Top-performing courses */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
                      <h4 className="font-bold text-slate-900 text-xs mb-2 uppercase tracking-wide">
                        Direct Payout Schedule
                      </h4>
                      <p className="text-xs text-slate-600">
                        Payouts are disbursed automatically on the 1st of every month via Razorpay / Direct NEFT into your designated Indian bank account. Minimum threshold: ₹8,000 INR.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MULTI-STEP COURSE CREATION WIZARD MODAL */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-indigo-900 text-white flex items-center justify-center font-bold text-xs">
                  {wizardStep}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Create New Technical Course</h3>
                  <p className="text-xs text-slate-500">Step {wizardStep} of 4: {
                    wizardStep === 1 ? "Details & Track" :
                    wizardStep === 2 ? "Curriculum Builder" :
                    wizardStep === 3 ? "Pricing in INR (₹)" : "Review & Publish"
                  }</p>
                </div>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 border-b border-slate-100 text-center text-xs font-semibold">
              {[
                { step: 1, label: "1. Details" },
                { step: 2, label: "2. Curriculum" },
                { step: 3, label: "3. Pricing" },
                { step: 4, label: "4. Review" },
              ].map(s => (
                <div
                  key={s.step}
                  className={`py-2.5 border-b-2 transition-colors ${
                    wizardStep >= s.step
                      ? "border-indigo-900 text-indigo-900 bg-indigo-50/40"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  {s.label}
                </div>
              ))}
            </div>

            {/* Step Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {/* STEP 1: DETAILS */}
              {wizardStep === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Distributed Consensus in Go 1.23 & Raft"
                      value={wizardTitle}
                      onChange={e => setWizardTitle(e.target.value)}
                      className="dd-input text-xs w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Engineering Track *</label>
                      <select
                        value={wizardTrack}
                        onChange={e => setWizardTrack(e.target.value)}
                        className="dd-input text-xs w-full"
                      >
                        <option value="Distributed Systems">Distributed Systems</option>
                        <option value="Concurrency">Concurrency & Atomics</option>
                        <option value="Storage Engines">Storage Engines & LSM</option>
                        <option value="Systems & Linux">Linux Kernel & eBPF</option>
                        <option value="AI Systems">AI Systems & Inference</option>
                        <option value="Full-Stack Edge">TypeScript & Edge Runtimes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Target Seniority *</label>
                      <select
                        value={wizardDifficulty}
                        onChange={e => setWizardDifficulty(e.target.value)}
                        className="dd-input text-xs w-full"
                      >
                        <option value="Beginner">Beginner (L2)</option>
                        <option value="Intermediate">Mid-Level (L3-L4)</option>
                        <option value="Advanced">Senior (L5)</option>
                        <option value="Staff">Staff / Principal (L6+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Syllabus Overview & Prerequisites</label>
                    <textarea
                      placeholder="Detail the technical architecture, target outcomes, and code labs covered..."
                      value={wizardDesc}
                      onChange={e => setWizardDesc(e.target.value)}
                      className="dd-input text-xs w-full h-24 p-2"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: CURRICULUM BUILDER */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new module title..."
                      value={newModuleTitle}
                      onChange={e => setNewModuleTitle(e.target.value)}
                      className="dd-input text-xs flex-1"
                    />
                    <button onClick={handleAddModule} className="btn-primary text-xs">
                      <Plus size={12} /> Add Module
                    </button>
                  </div>

                  <div className="space-y-3">
                    {wizardModules.map((mod, modIdx) => (
                      <div key={mod.id} className="p-3 border border-slate-200 rounded-md bg-slate-50/50 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">
                            {mod.title} ({mod.lessons.length} lessons)
                          </span>
                          <button
                            onClick={() => handleRemoveModule(mod.id)}
                            className="text-slate-400 hover:text-rose-600 text-xs"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        {/* Lessons inside module */}
                        <div className="space-y-1.5 pl-2 border-l-2 border-indigo-200">
                          {mod.lessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between text-xs bg-white p-2 rounded border border-slate-200">
                              <span className="text-slate-800 font-medium">· {lesson.title}</span>
                              <div className="flex items-center gap-2">
                                <span className="dd-chip-slate text-[10px]">{lesson.type}</span>
                                <span className="text-slate-400 text-[10px]">{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add lesson into selected module */}
                        {selectedModuleId === mod.id && (
                          <div className="flex gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="New lesson name (e.g. Memory Leak Lab)..."
                              value={newLessonTitle}
                              onChange={e => setNewLessonTitle(e.target.value)}
                              className="dd-input text-xs flex-1"
                            />
                            <button onClick={handleAddLesson} className="btn-ghost text-xs">
                              + Lesson
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: PRICING IN INR (₹) */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-md">
                    <p className="text-xs font-semibold text-emerald-900 mb-1">
                      Indian Rupee (₹ INR) Pricing Policy
                    </p>
                    <p className="text-xs text-emerald-700">
                      Standard pricing tiers in India are typically ₹2,999 to ₹6,999. Instructors keep 85% of net proceeds.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Course Enrollment Fee (₹ INR) *</label>
                    <div className="relative max-w-xs">
                      <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        step="500"
                        value={wizardPrice}
                        onChange={e => setWizardPrice(e.target.value)}
                        className="dd-input pl-8 font-mono font-bold text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Instructor Cut (85%):</span>
                      <span className="font-bold text-success font-mono">
                        ₹{(parseInt(wizardPrice || "0", 10) * 0.85).toLocaleString("en-IN")} INR
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Platform Compute & Verification Fee (15%):</span>
                      <span className="text-slate-400 font-mono">
                        ₹{(parseInt(wizardPrice || "0", 10) * 0.15).toLocaleString("en-IN")} INR
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & PUBLISH */}
              {wizardStep === 4 && (
                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Course Title:</span>
                      <span className="font-bold text-slate-900">{wizardTitle || "Untitled Course"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Track & Seniority:</span>
                      <span className="font-semibold text-slate-800">{wizardTrack} · {wizardDifficulty}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Price (INR):</span>
                      <span className="font-bold text-success font-mono">₹{parseInt(wizardPrice, 10).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Curriculum Structure:</span>
                      <span className="font-bold text-slate-800">{wizardModules.length} Modules · {wizardModules.reduce((acc, m) => acc + m.lessons.length, 0)} Total Lessons</span>
                    </div>
                  </div>

                  <p className="text-slate-500 leading-relaxed">
                    Submitting for review initiates our automated automated test suite evaluation and peer engineer review to guarantee 100% production fidelity.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              {wizardStep > 1 ? (
                <button
                  onClick={() => setWizardStep((s => (s - 1) as any))}
                  className="btn-ghost text-xs"
                >
                  Previous
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                {wizardStep < 4 ? (
                  <button
                    onClick={() => {
                      if (wizardStep === 1 && !wizardTitle.trim()) {
                        toast.error("Please enter a course title.");
                        return;
                      }
                      setWizardStep((s => (s + 1) as any));
                    }}
                    className="btn-primary text-xs"
                  >
                    Next Step <ChevronRight size={13} />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleCreateCourseSubmit(false)}
                      className="btn-ghost text-xs"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={() => handleCreateCourseSubmit(true)}
                      className="btn-primary text-xs bg-emerald-700 hover:bg-emerald-800"
                    >
                      <CheckCircle2 size={13} /> Submit for Review
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
