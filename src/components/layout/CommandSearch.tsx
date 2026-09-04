import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Code2, BookOpen, Brain, Trophy,
  Briefcase, User, Sparkles, X, ArrowRight
} from "lucide-react";
import { CHALLENGES, LEARNING_PATHS, MENTORS } from "@/constants/data";

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const filteredChallenges = CHALLENGES.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPaths = LEARNING_PATHS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredMentors = MENTORS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase()) ||
      m.company.toLowerCase().includes(query.toLowerCase())
  );

  const quickPages = [
    { title: "Dashboard Overview", path: "/dashboard", icon: <Trophy size={14} className="text-indigo-600" /> },
    { title: "AI Mentor Diagnostic Studio", path: "/mentor", icon: <Brain size={14} className="text-cyan-600" /> },
    { title: "AI Code Review Studio", path: "/code-review", icon: <Sparkles size={14} className="text-purple-600" /> },
    { title: "Coding Sandbox (Token Bucket)", path: "/challenge/c1", icon: <Code2 size={14} className="text-blue-600" /> },
    { title: "Developer Portfolio & Dossier", path: "/profile", icon: <User size={14} className="text-emerald-600" /> },
    { title: "Pricing & Plans (INR)", path: "/pricing", icon: <Briefcase size={14} className="text-amber-600" /> },
  ].filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 gap-3">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search resources, sandboxes, algorithms, mentors, or paths... (esc to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">ESC</kbd>
        </div>

        {/* Scrollable Results List */}
        <div className="overflow-y-auto p-3 space-y-4 text-sm">
          {/* Quick Pages */}
          {quickPages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Quick Navigation</div>
              <div className="space-y-1">
                {quickPages.map((qp) => (
                  <button
                    key={qp.path}
                    onClick={() => handleSelect(qp.path)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-900 hover:bg-indigo-50/70 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      {qp.icon}
                      <span className="font-medium text-slate-800">{qp.title}</span>
                    </div>
                    <ArrowRight size={13} className="text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Coding Challenges */}
          {filteredChallenges.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Coding Challenges & Sandboxes</div>
              <div className="space-y-1">
                {filteredChallenges.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/challenge/${c.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-blue-50/70 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Code2 size={15} className="text-blue-600 shrink-0" />
                      <div className="truncate">
                        <div className="font-medium text-slate-800 truncate">{c.title}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <span className="text-amber-600 font-semibold">{c.difficulty}</span>
                          <span>•</span>
                          <span>{c.points} pts</span>
                          <span>•</span>
                          <span>{c.acceptance}% pass</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400 px-2 py-0.5 bg-slate-100 rounded group-hover:bg-blue-100 group-hover:text-blue-700 shrink-0">Open IDE →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Learning Paths */}
          {filteredPaths.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Curated Learning Paths</div>
              <div className="space-y-1">
                {filteredPaths.map((lp) => (
                  <button
                    key={lp.id}
                    onClick={() => handleSelect(`/learning`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-900 hover:bg-indigo-50/70 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <BookOpen size={15} className="text-indigo-600 shrink-0" />
                      <div className="truncate">
                        <div className="font-medium text-slate-800 truncate">{lp.title}</div>
                        <div className="text-xs text-slate-400">{lp.duration} • {lp.totalModules} modules</div>
                      </div>
                    </div>
                    <span className="text-xs text-indigo-700 font-semibold shrink-0">{lp.progress}% done</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mentors */}
          {filteredMentors.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Staff Mentors</div>
              <div className="space-y-1">
                {filteredMentors.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(`/mentors`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/70 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {m.avatar}
                      </div>
                      <div className="truncate">
                        <div className="font-medium text-slate-800 truncate">{m.name}</div>
                        <div className="text-xs text-slate-400">{m.role} • {m.company}</div>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold shrink-0">₹4,500/session</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {quickPages.length === 0 && filteredChallenges.length === 0 && filteredPaths.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Search size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "rate limiter", "consensus", "AI", or "Go".</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Navigate with <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↓</kbd></span>
            <span>Select with <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded">↵</kbd></span>
          </div>
          <span>DevDeep Telemetry v2.4</span>
        </div>
      </div>
    </div>
  );
}
