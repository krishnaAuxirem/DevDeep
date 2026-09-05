import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Star, Clock, Users, ArrowRight, Search,
  CheckCircle2, Sparkles, Filter, Code2, Award
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { LEARNING_PATHS } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export interface CourseData {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  price: string;
  tags: string[];
  description: string;
}

export const COURSES_CATALOG: CourseData[] = [
  {
    id: "c-raft",
    title: "Building Raft Distributed Consensus from Scratch",
    instructor: "Alex Volkov",
    instructorRole: "Staff Distributed Systems Engineer",
    rating: 4.98,
    reviewsCount: 312,
    studentsCount: 2450,
    duration: "18 hours",
    level: "Expert",
    price: "Included in Pro",
    tags: ["Go", "Raft", "Consensus", "Distributed"],
    description: "Write leader election, log compaction, snapshotting, and linearizable read state machines in Go 1.22.",
  },
  {
    id: "c-storage",
    title: "LSM-Tree Storage Engine Architecture & WAL",
    instructor: "Dr. Marcus Vance",
    instructorRole: "Principal Systems Architect",
    rating: 4.95,
    reviewsCount: 198,
    studentsCount: 1820,
    duration: "24 hours",
    level: "Expert",
    price: "Included in Pro",
    tags: ["Storage", "LSM", "RocksDB", "WAL"],
    description: "Implement an append-only Write-Ahead Log, memtable skiplist, and SSTable compaction pipeline.",
  },
  {
    id: "c-concurrency",
    title: "Zero-Allocation Go Concurrency & Memory Models",
    instructor: "James Chen",
    instructorRole: "Staff Infrastructure Engineer",
    rating: 4.99,
    reviewsCount: 420,
    studentsCount: 3900,
    duration: "14 hours",
    level: "Advanced",
    price: "Included in Pro",
    tags: ["Go", "Atomics", "sync/atomic", "pprof"],
    description: "Master lock-free ring buffers, sync.Pool optimization, escape analysis, and p99 garbage collector tuning.",
  },
  {
    id: "c-cloud-native",
    title: "eBPF Kernel Telemetry & Micro-VM Sandboxes",
    instructor: "Priya Sharma",
    instructorRole: "Lead Kernel Engineer",
    rating: 4.92,
    reviewsCount: 145,
    studentsCount: 1120,
    duration: "16 hours",
    level: "Expert",
    price: "Included in Pro",
    tags: ["Linux", "eBPF", "C", "Containers"],
    description: "Write XDP socket packet filters and kernel ring-buffer probes to monitor live container latency.",
  },
  {
    id: "c-algorithms",
    title: "Production Algorithm Design for High-Throughput Pipelines",
    instructor: "Elena Rostova",
    instructorRole: "Principal Algorithmist",
    rating: 4.96,
    reviewsCount: 270,
    studentsCount: 2600,
    duration: "20 hours",
    level: "Intermediate",
    price: "Free Access",
    tags: ["Algorithms", "Data Structures", "Big-O", "Benchmarks"],
    description: "Consistent hashing rings, HyperLogLog cardinality counters, and Bloom filters for billion-item sets.",
  },
  {
    id: "c-postgres",
    title: "PostgreSQL 17 Internal Indexing & Query Tuning",
    instructor: "Devendra K.",
    instructorRole: "Senior Database Engineer",
    rating: 4.94,
    reviewsCount: 185,
    studentsCount: 1490,
    duration: "15 hours",
    level: "Advanced",
    price: "Included in Pro",
    tags: ["PostgreSQL", "B-Tree", "EXPLAIN ANALYZE", "MVCC"],
    description: "Index deduplication, BRIN vs GIN tradeoffs, transaction isolation anomalies, and partition pruning.",
  },
];

export default function CoursesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES_CATALOG.filter((c) => {
    const matchesLevel = levelFilter === "All" || c.level === levelFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const handleEnroll = (courseId: string, courseTitle: string) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to enroll in ${courseTitle}.`,
      });
      navigate(`/register?redirect=/courses/${courseId}`);
      return;
    }
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <BookOpen size={13} className="text-indigo-600" />
            <span>EXPERT-LED SYSTEMS COURSES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Engineered for Deep Work
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every course features real micro-VM cloud sandboxes, automated AST code evaluator tests, and verifiable completion proofs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["All", "Intermediate", "Advanced", "Expert"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  levelFilter === lvl
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                    course.level === "Expert" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                    course.level === "Advanced" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" :
                    "bg-cyan-50 text-cyan-700 border border-cyan-200"
                  }`}>
                    {course.level}
                  </span>
                  <span className="font-mono text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {course.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <div className="w-7 h-7 rounded-full bg-indigo-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {course.instructor.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{course.instructor}</p>
                    <p className="text-[10px] text-slate-400 truncate">{course.instructorRole}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> {course.rating} ({course.reviewsCount})
                  </span>
                  <span>{course.studentsCount.toLocaleString()} enrolled</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/courses/${course.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-900 underline underline-offset-4"
                >
                  Syllabus
                </Link>
                <button
                  onClick={() => handleEnroll(course.id, course.title)}
                  className="px-4 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Start Learning</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
