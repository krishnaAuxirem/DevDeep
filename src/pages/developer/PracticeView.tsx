import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Code2, Trophy, FlaskConical, Play, CheckCircle2,
  Bug, AlertTriangle, Terminal, Cpu, Zap, Search, RefreshCw
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { CHALLENGES } from "@/constants/data";
import { toast } from "sonner";

interface PracticeViewProps {
  initialTab?: "challenges" | "lab";
}

interface DebugScenario {
  id: string;
  title: string;
  runtime: string;
  difficulty: string;
  symptom: string;
  rootCause: string;
  fixed: boolean;
}

const INITIAL_SCENARIOS: DebugScenario[] = [
  {
    id: "sc-1",
    title: "Channel Deadlock under Pipeline Backpressure",
    runtime: "Go 1.22",
    difficulty: "Hard",
    symptom: "All Goroutines asleep - deadlock! Worker pool halted at 10,000 req/s.",
    rootCause: "Unbuffered send on notifyChan without non-blocking select or context timeout.",
    fixed: false,
  },
  {
    id: "sc-2",
    title: "Heap Escape on Hot-Path String Concatenation",
    runtime: "Go 1.22",
    difficulty: "Medium",
    symptom: "GC pauses spike to 18ms under microsecond latency SLA.",
    rootCause: "Slice reallocation in tight loop causes heap escape analyzed by escape-analysis.",
    fixed: false,
  },
  {
    id: "sc-3",
    title: "Redis Lease Invalidation Stale-Read Race",
    runtime: "TypeScript / Node 20",
    difficulty: "Expert",
    symptom: "Cache stampede dogpile queries duplicate PostgreSQL records.",
    rootCause: "Missing atomic SETNX version fence across distributed replicas.",
    fixed: false,
  },
];

export default function PracticeView({ initialTab }: PracticeViewProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const defaultTab = initialTab ?? (currentPath.includes("lab") ? "lab" : "challenges");
  const [activeTab, setActiveTab] = useState<"challenges" | "lab">(defaultTab);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [scenarios, setScenarios] = useState<DebugScenario[]>(INITIAL_SCENARIOS);
  const [activeScenario, setActiveScenario] = useState<DebugScenario>(INITIAL_SCENARIOS[0]);
  const [simulating, setSimulating] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[telemetry] Initialized isolated sandbox kernel: us-east-4a",
    "[runtime] Go 1.22.1 linux/amd64",
    "[debug-lab] Ready for fault injection.",
  ]);

  const filteredChallenges = CHALLENGES.filter((c) => {
    if (selectedDifficulty !== "All" && c.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const injectFault = () => {
    setSimulating(true);
    setConsoleLogs((prev) => [
      ...prev,
      `[fault-injection] Triggering scenario: ${activeScenario.title}`,
      `[stacktrace] fatal error: all goroutines are asleep - deadlock!`,
      `[stacktrace] goroutine 42 [chan send]: internal/cache.(*RedisStore).DispatchNotification()`,
      `[p99-monitor] Latency spike: infinite wait (worker blocked)`,
    ]);
    setTimeout(() => {
      setSimulating(false);
      toast.error("Fault successfully injected! Inspect stacktrace to patch.");
    }, 600);
  };

  const applyFix = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setScenarios((prev) =>
        prev.map((s) => (s.id === activeScenario.id ? { ...s, fixed: true } : s))
      );
      setActiveScenario((prev) => ({ ...prev, fixed: true }));
      setConsoleLogs((prev) => [
        ...prev,
        `[ai-patch] Applying atomic select with ctx.Done() fallback...`,
        `[benchmark] Running 10,000 Goroutine race detector test...`,
        `[test-runner] PASS: TestConcurrentBackpressure (0.8ms)`,
        `[telemetry] 0 races detected. Latency p99: 142ns.`,
      ]);
      toast.success("Fault resolved! All tests passed.");
    }, 800);
  };

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
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Practice Arena & Debugging Lab</h1>
                <span className="dd-chip-blue text-[10px]">REAL VM RUNTIMES</span>
              </div>
              <p className="text-slate-500 text-sm">
                Tackle algorithmic puzzles and debug production-grade race conditions in cloud sandboxes.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab("challenges")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "challenges" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Trophy size={13} />
                <span>Coding Challenges</span>
              </button>
              <button
                onClick={() => setActiveTab("lab")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "lab" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FlaskConical size={13} />
                <span>Debugging Lab (Live)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Challenges */}
          {activeTab === "challenges" && (
            <div className="space-y-4">
              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["All", "Easy", "Medium", "Hard", "Expert"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedDifficulty === diff
                        ? "bg-indigo-900 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Challenges Table Card */}
              <div className="dd-card overflow-hidden divide-y divide-slate-100">
                {filteredChallenges.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/challenge/${c.id}`)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs text-slate-400 w-6 shrink-0">{i + 1}</span>
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-900 truncate">
                            {c.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {c.tags.map((t) => (
                            <span key={t} className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[10px] font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-400 font-mono hidden sm:inline">{c.acceptance}% pass</span>
                      <span
                        className={`dd-chip text-[10px] ${
                          c.difficulty === "Easy"
                            ? "dd-chip-completed"
                            : c.difficulty === "Medium"
                            ? "dd-chip-pending"
                            : "dd-chip-purple"
                        }`}
                      >
                        {c.difficulty}
                      </span>
                      <span className="text-xs font-bold font-mono text-slate-800">{c.points} pts</span>
                      <span className="text-xs text-indigo-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Solve →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Live Debugging Lab */}
          {activeTab === "lab" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Scenarios List */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  ACTIVE FAULT SCENARIOS
                </span>
                {scenarios.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => setActiveScenario(sc)}
                    className={`dd-card p-4 cursor-pointer transition-all space-y-2 ${
                      activeScenario.id === sc.id
                        ? "border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm"
                        : "hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                        {sc.runtime}
                      </span>
                      {sc.fixed ? (
                        <span className="dd-chip-completed text-[10px]">PASS ✓</span>
                      ) : (
                        <span className="dd-chip-error text-[10px]">BUG DETECTED</span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{sc.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{sc.symptom}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Interactive Diagnostic Sandbox Console */}
              <div className="lg:col-span-8 space-y-4">
                <div className="dd-card p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <Bug size={16} className="text-rose-600" />
                        <h3 className="font-bold text-base text-slate-900">{activeScenario.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Root cause: <span className="text-slate-800 font-mono">{activeScenario.rootCause}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={injectFault}
                        disabled={simulating}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Inject Fault
                      </button>
                      <button
                        onClick={applyFix}
                        disabled={simulating}
                        className="btn-primary text-xs py-1.5"
                      >
                        <Zap size={12} /> Apply AI Fix & Verify
                      </button>
                    </div>
                  </div>

                  {/* Terminal Console Stream */}
                  <div className="ide-shell p-4 text-xs font-mono rounded-xl space-y-1.5 min-h-[260px] max-h-[320px] overflow-y-auto">
                    <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2 mb-2 text-[11px]">
                      <span>SANDBOX TELEMETRY LOGS · US-EAST-4A</span>
                      <span>STATUS: RUNNING</span>
                    </div>
                    {consoleLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`${
                          log.includes("fatal") || log.includes("deadlock") || log.includes("fault")
                            ? "text-rose-400"
                            : log.includes("PASS") || log.includes("0 races")
                            ? "text-emerald-400 font-bold"
                            : "text-slate-300"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                    {simulating && (
                      <div className="text-cyan-400 animate-pulse flex items-center gap-2">
                        <RefreshCw size={12} className="animate-spin" /> Compiling sandbox test suite...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
