import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trophy, Search, ArrowRight, CheckCircle2, Clock,
  Filter, Sparkles, Code2, Zap
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { CHALLENGES } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function ChallengesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [difficulty, setDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = CHALLENGES.filter((c) => {
    const matchesDiff = difficulty === "All" || c.difficulty === difficulty;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDiff && matchesSearch;
  });

  const handleSolve = (challengeId: string, challengeTitle: string) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to solve ${challengeTitle}.`,
      });
      navigate(`/register?redirect=/challenge/${challengeId}`);
      return;
    }
    navigate(`/challenge/${challengeId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Trophy size={13} className="text-indigo-600" />
            <span>420+ PRODUCTION PROBLEMS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Systems Coding Challenges
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real algorithmic and concurrency challenges. Every problem runs against deterministic multi-threaded harnesses with p99 benchmarking.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {["All", "Medium", "Hard", "Expert"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  difficulty === lvl
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
              placeholder="Search challenges by name, tag, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Challenge Cards List */}
        <div className="space-y-4">
          {filteredChallenges.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                    c.difficulty === "Expert" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                    c.difficulty === "Hard" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                    "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  }`}>
                    {c.difficulty}
                  </span>
                  <span className="text-xs font-mono text-indigo-700 font-bold">
                    +{c.points} XP
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Acceptance: {c.acceptance}%
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {c.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 pt-2 md:pt-0">
                <button
                  onClick={() => handleSolve(c.id, c.title)}
                  className="w-full md:w-auto px-5 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Solve in IDE</span>
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
