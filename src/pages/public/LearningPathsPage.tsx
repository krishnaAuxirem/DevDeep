import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Clock, BarChart2, CheckCircle2, ArrowRight,
  Search, Filter, Sparkles, Terminal, ShieldCheck, Zap
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { LEARNING_PATHS } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function LearningPathsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Systems", "Algorithms", "Databases", "Security"];

  const filteredPaths = LEARNING_PATHS.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleStartPath = (pathId: string, pathTitle: string) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please register or log in to enroll in ${pathTitle}.`,
      });
      navigate(`/register?redirect=/courses/${pathId}`);
      return;
    }
    navigate(`/courses/${pathId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Sparkles size={13} className="text-indigo-600" />
            <span>PRODUCTION CURRICULA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Structured Learning Paths
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered for deep technical mastery. Rigorous curricula covering Raft consensus, LSM-Tree storage engines, zero-allocation Go, and cryptographic verification.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search curricula, topics, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPaths.map((path) => (
            <div
              key={path.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {path.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 size={12} /> {path.difficulty}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {path.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Modules Included:</span>
                    <span className="font-bold text-slate-800">{path.totalModules} Core Labs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Telemetry Verification:</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-600" /> Automated Benchmarking
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <Link
                  to={`/courses/${path.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-900 underline underline-offset-4"
                >
                  View Full Syllabus →
                </Link>
                <button
                  onClick={() => handleStartPath(path.id, path.title)}
                  className="px-5 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Start Learning</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
              CUSTOM ENGINEERING ROADMAPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Need a personalized skill gap diagnosis?
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Our AI Mentor analyzes your syntax tree patterns, memory leaks, and goroutine races to generate a tailor-made curriculum.
            </p>
          </div>
          <button
            onClick={() => navigate("/ai-mentor")}
            className="px-6 py-3 rounded-lg bg-white text-indigo-950 hover:bg-slate-100 font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>Explore AI Mentor</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
