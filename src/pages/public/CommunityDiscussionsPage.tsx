import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare, Search, Filter, Plus, ArrowRight,
  TrendingUp, Clock, CheckCircle2, ChevronRight, ThumbsUp
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  role: string;
  category: string;
  replies: number;
  upvotes: number;
  time: string;
  tags: string[];
  solved: boolean;
}

const DISCUSSIONS_LIST: DiscussionThread[] = [
  {
    id: "disc-1",
    title: "RFC #92: Zero-Copy Memory Ring Buffer in Go 1.22 with sync.Pool Tuning",
    author: "Alex Volkov",
    avatar: "AV",
    role: "Staff Engineer",
    category: "Architecture RFCs",
    replies: 48,
    upvotes: 142,
    time: "2h ago",
    tags: ["Go", "Memory", "sync.Pool", "Lock-free"],
    solved: true,
  },
  {
    id: "disc-2",
    title: "Handling Split-Brain Consensus in Raft under Asymmetric Network Partitions",
    author: "Priya Sharma",
    avatar: "PS",
    role: "Distributed Systems Lead",
    category: "Architecture RFCs",
    replies: 82,
    upvotes: 215,
    time: "4h ago",
    tags: ["Raft", "Consensus", "Network", "Chaos"],
    solved: false,
  },
  {
    id: "disc-3",
    title: "PostgreSQL 17 B-Tree Deduplication vs BRIN for 100M Transaction Records",
    author: "Devendra K.",
    avatar: "DK",
    role: "Database Architect",
    category: "Databases",
    replies: 31,
    upvotes: 98,
    time: "1d ago",
    tags: ["PostgreSQL", "B-Tree", "Indexing", "Storage"],
    solved: true,
  },
  {
    id: "disc-4",
    title: "Why does lock-free CAS loop degrade under high core counts in Go?",
    author: "Ryo Tanaka",
    avatar: "RT",
    role: "Senior Systems Engineer",
    category: "Concurrency",
    replies: 54,
    upvotes: 167,
    time: "2d ago",
    tags: ["Go", "sync/atomic", "Cache Coherency", "MESI"],
    solved: true,
  },
  {
    id: "disc-5",
    title: "Designing a Bounded Goroutine Worker Pool with Graceful Context Cancellation",
    author: "Elena Rostova",
    avatar: "ER",
    role: "Backend Engineer",
    category: "Concurrency",
    replies: 23,
    upvotes: 76,
    time: "3d ago",
    tags: ["Go", "Context", "Goroutines", "Graceful Shutdown"],
    solved: false,
  },
];

export default function CommunityDiscussionsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState(DISCUSSIONS_LIST);

  const categories = ["All", "Architecture RFCs", "Concurrency", "Databases", "General"];

  const filtered = threads.filter((t) => {
    const matchesCat = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleNewDiscussion = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please log in or register to publish an architecture discussion.",
      });
      navigate("/register?redirect=/community/discussions");
      return;
    }
    toast.success("Opening new discussion composer...");
  };

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Please log in to upvote discussions.");
      return;
    }
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
    toast.success("Upvote recorded!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              PEER ARCHITECTURAL REVIEW
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Engineering Discussions & RFCs
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Participate in high-signal discussions with senior systems developers and Staff engineers.
            </p>
          </div>
          <button
            onClick={handleNewDiscussion}
            className="px-5 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
          >
            <Plus size={14} />
            <span>New Discussion RFC</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search discussions by topic or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Discussion Threads List */}
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              {/* Upvote Pill */}
              <button
                onClick={(e) => handleUpvote(t.id, e)}
                className="flex flex-col items-center justify-center w-11 h-12 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-900 transition-colors shrink-0"
              >
                <ThumbsUp size={13} />
                <span className="font-mono text-xs font-bold mt-0.5">{t.upvotes}</span>
              </button>

              {/* Body */}
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {t.category}
                  </span>
                  {t.solved && (
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Solved
                    </span>
                  )}
                  <span className="text-slate-600 font-semibold">{t.author}</span>
                  <span className="text-slate-400">({t.role})</span>
                  <span className="text-slate-400">• {t.time}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 hover:text-indigo-900 cursor-pointer transition-colors leading-snug">
                  {t.title}
                </h3>

                <div className="flex flex-wrap gap-1 pt-1">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Replies Badge */}
              <div className="shrink-0 text-right font-mono text-xs text-slate-500 hidden sm:block">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                  {t.replies} replies
                </span>
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
