import { useState } from "react";
import {
  X, CheckCircle2, ShieldCheck, Award, Star,
  Terminal, ExternalLink, Calendar, ArrowUpRight, Flame,
  Zap, Rocket, Layers, Share2, Copy
} from "lucide-react";
import { CURRENT_USER, SKILL_MATRIX } from "@/constants/data";
import { toast } from "sonner";

interface DeveloperPortfolioModalProps {
  open: boolean;
  onClose: () => void;
  developerName?: string;
  developerTitle?: string;
  developerAvatar?: string;
  developerRole?: string;
}

export default function DeveloperPortfolioModal({
  open,
  onClose,
  developerName = CURRENT_USER.name,
  developerTitle = CURRENT_USER.title,
  developerAvatar = CURRENT_USER.avatar,
}: DeveloperPortfolioModalProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "contributions" | "milestones" | "credentials">("projects");

  if (!open) return null;

  const copyProfileLink = () => {
    navigator.clipboard?.writeText("https://devdeep.io/p/alexvolkov");
    toast.success("Public profile link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              DEVELOPER VERIFIED DOSSIER · ID: DD-L7-8942
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyProfileLink}
              className="text-xs flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-600 transition-colors"
            >
              <Share2 size={13} />
              <span>Share Profile</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Profile Identity Block (from Image 5) */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-5 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-18 h-18 rounded-2xl bg-indigo-900 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
                {developerAvatar}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{developerName}</h2>
                  <span className="text-xs font-mono text-slate-400">@alexvolkov</span>
                  <span className="dd-chip-ai text-[10px] font-semibold">
                    <ShieldCheck size={12} className="inline mr-0.5" /> DevDeep Verified Staff L7
                  </span>
                  <span className="dd-chip-purple text-[10px] font-semibold">
                    Top 0.4% Global
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed max-w-2xl">
                  {developerTitle} <span className="text-slate-400 font-normal">| Building low-latency fault-tolerant storage engines, Raft state machines & edge data pipelines.</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span>San Francisco, CA / Remote</span>
                  <span>•</span>
                  <span>Joined October 2022</span>
                  <span>•</span>
                  <a href="https://alexvolkov.dev" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline inline-flex items-center gap-1">
                    alexvolkov.dev <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={() => toast.success("Verified interview inquiry sent to Alex Volkov.")}
                className="btn-primary text-xs justify-center flex-1 md:flex-initial"
              >
                <ArrowUpRight size={13} /> Request Technical Screen
              </button>
              <button
                onClick={() => toast.success("Full cryptographic dossier downloaded (PDF).")}
                className="btn-ghost text-xs justify-center flex-1 md:flex-initial"
              >
                Download Verified Dossier
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Submissions</p>
              <p className="text-xl font-bold text-slate-900">512</p>
              <p className="text-[11px] text-emerald-600 font-medium">+32 this mo</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Active Streak</p>
              <p className="text-xl font-bold text-slate-900 font-mono">84 days</p>
              <p className="text-[11px] text-orange-600 font-medium">Best: 102d</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Market Readiness</p>
              <p className="text-xl font-bold text-cyan-700 font-mono">94%</p>
              <p className="text-[11px] text-cyan-600 font-medium">FAANG Calibrated</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Prod Deploys</p>
              <p className="text-xl font-bold text-slate-900">4</p>
              <p className="text-[11px] text-emerald-600 font-medium">100% Sandbox Pass</p>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">DevDeep Rank</p>
              <p className="text-xl font-bold text-indigo-900 font-mono">#142</p>
              <p className="text-[11px] text-indigo-600 font-medium">Top 0.4%</p>
            </div>
          </div>

          {/* Two-Column Grid: Main Showcase + Right Rail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Tabs & Showcase */}
            <div className="lg:col-span-8 space-y-4">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 gap-1 overflow-x-auto">
                {[
                  { id: "projects", label: "Verified Projects (4)" },
                  { id: "contributions", label: "Contribution Matrix" },
                  { id: "milestones", label: "Algorithmic Solves (78)" },
                  { id: "credentials", label: "Cryptographic Certs" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                      activeTab === t.id
                        ? "border-indigo-900 text-indigo-950 font-bold"
                        : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "projects" && (
                <div className="space-y-3">
                  <div className="dd-card p-4 space-y-3 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        DISTRIBUTED STORAGE
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-700">Score: 98/100</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      S3-Compatible Distributed Object Storage Engine
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Fault-tolerant storage node implementation featuring chunked multipart streaming, Raft state replication, and custom RocksDB block cache manager.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg font-mono">
                      <div><span className="text-slate-400 block text-[10px]">Throughput</span><strong className="text-slate-800">120,400 IOPS</strong></div>
                      <div><span className="text-slate-400 block text-[10px]">Coverage</span><strong className="text-emerald-700">98.4% passing</strong></div>
                      <div><span className="text-slate-400 block text-[10px]">Consensus</span><strong className="text-slate-800">Raft</strong></div>
                      <div><span className="text-slate-400 block text-[10px]">p99 Latency</span><strong className="text-indigo-600">1.82 ms</strong></div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">Go 1.23</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">RocksDB</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">gRPC</span>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px]">v2.4.1 Verified</span>
                    </div>
                  </div>

                  <div className="dd-card p-4 space-y-3 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-700">
                        EDGE STREAMING
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-700">Score: 96/100</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Edge AI Streaming Gateway with SSE & Backpressure
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sub-millisecond token pipeline proxy built for distributed LLM inference streams, enforcing client-aware backpressure buffer and zero-copy JSON parsing.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg font-mono">
                      <div><span className="text-slate-400 block text-[10px]">Memory RSS</span><strong className="text-slate-800">&lt; 14 MB</strong></div>
                      <div><span className="text-slate-400 block text-[10px]">Edge p99</span><strong className="text-indigo-600">820 µs</strong></div>
                      <div><span className="text-slate-400 block text-[10px]">Conns</span><strong className="text-slate-800">85,000 / node</strong></div>
                      <div><span className="text-slate-400 block text-[10px]">Allocations</span><strong className="text-emerald-700">0 in fast-path</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contributions" && (
                <div className="dd-card p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">1,842 Verified Contributions (Past 365 Days)</span>
                    <span className="text-xs text-slate-500">Current Streak: 84 days</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center font-mono text-xs text-slate-500">
                    52 weeks · 0 gaps in commit telemetry · All cryptographic commits signed with GPG key
                  </div>
                </div>
              )}

              {activeTab === "milestones" && (
                <div className="dd-card p-4 divide-y divide-slate-100">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Distributed Rate Limiter (Token Bucket Algorithm)</p>
                      <p className="text-[11px] text-slate-500">Passed 32/32 unit tests under 10k Goroutines · p99: 142ns</p>
                    </div>
                    <span className="dd-chip-completed text-[10px]">Hard · Top 0.8%</span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Concurrent Worker Pool with Graceful Shutdown</p>
                      <p className="text-[11px] text-slate-500">Zero heap allocations in task dispatch loop</p>
                    </div>
                    <span className="dd-chip-completed text-[10px]">Hard · Top 1.2%</span>
                  </div>
                </div>
              )}

              {activeTab === "credentials" && (
                <div className="space-y-3">
                  <div className="dd-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold text-sm">
                        <Layers size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Distributed Systems Architect</p>
                        <p className="text-[11px] font-mono text-slate-400">ID: DD-9842-ARCH · Merkle Leaf #18</p>
                      </div>
                    </div>
                    <span className="dd-chip-ai text-[10px]">Verified On-Chain</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Career Target & AI Endorsement */}
            <div className="lg:col-span-4 space-y-4">
              {/* Compensation & Radar */}
              <div className="dd-card p-4 space-y-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">CAREER RADAR</span>
                <div>
                  <span className="text-xs text-slate-400">Compensation Target:</span>
                  <p className="text-xl font-bold text-slate-900 font-mono">₹75L – ₹95L INR</p>
                  <p className="text-xs text-slate-500">Staff / Principal Benchmark</p>
                </div>
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  <strong>Active Scout Attention:</strong> Profile evaluated by hiring managers at Stripe, Cloudflare, and Datadog.
                </div>
              </div>

              {/* AI Mentor Synthesis */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                  <span>AI MENTOR v3.8 AUDIT</span>
                  <span>99.4% CONFIDENCE</span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "Alex demonstrates exceptional intuition for lock-free data structures, asynchronous channel orchestration, and zero-allocation memory pipelines under extreme concurrency."
                </p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                  Audited 40,000+ LOC in isolated cloud sandboxes
                </div>
              </div>

              {/* Skill Matrix */}
              <div className="dd-card p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Skill Matrix</span>
                  <span className="text-xs font-mono font-bold text-indigo-700">892 / 1000</span>
                </div>
                <div className="space-y-2.5">
                  {SKILL_MATRIX.map((s) => (
                    <div key={s.label} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-700 font-medium truncate">{s.label}</span>
                        <span className="font-mono font-bold text-slate-900">{s.value}%</span>
                      </div>
                      <div className="progress-track h-1.5">
                        <div className="progress-fill" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Cryptographically signed by DevDeep Consensus Telemetry</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            Close Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
