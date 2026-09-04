import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Calendar, Globe, Linkedin, Github, Twitter,
  ChevronRight, CheckCircle2, ArrowUpRight, Star, Trophy,
  Shield, BarChart3, Brain, Share2, Download, ExternalLink,
  Layers, Zap, Award, Users, TrendingUp
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import ActivityHeatmap from "@/components/features/ActivityHeatmap";
import { CURRENT_USER, PROJECTS, SKILL_MATRIX, MENTORS } from "@/constants/data";

const MILESTONES = [
  {
    lang: "Go", color: "cyan",
    title: "Distributed Rate Limiter (Token Bucket with Redis Cluster)",
    difficulty: "Hard", passed: "32/32 tests", sub: "Top 0.8% Speed",
    metric: "p99: 142 ms", value: "4.1 ms total runtime", verified: true,
  },
  {
    lang: "Go", color: "cyan",
    title: "Concurrent Worker Pool with Graceful Context Cancellation",
    difficulty: "Hard", passed: "0 Heap Allocations", sub: "Lock-Free Queue",
    metric: "0 allocs/op", value: "Atomic Pointer Swap", verified: true,
  },
  {
    lang: "Rs", color: "orange",
    title: "Zero-Knowledge Proof Arithmetic Circuit Verifier",
    difficulty: "Expert", passed: "Groth16 Polynomials", sub: "Staff Benchmark",
    metric: "18.2 ms verify", value: "Curve BN254", verified: true,
  },
];

const CREDENTIALS = [
  { title: "Distributed Systems Architect", id: "DD-9842-ARCH", verified: true },
  { title: "Go Concurrency & Memory Master", id: "DD-5510-G0C", verified: true },
];

const PROFILE_TABS = ["Overview & Portfolio", "Production Projects", "Open Source", "Credentials", "Experience"] as const;

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof PROFILE_TABS[number]>("Overview & Portfolio");
  const [portfolioPreset, setPortfolioPreset] = useState("Developer Precision");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto px-6 py-6">
            {/* Profile Header */}
            <div className="dd-card p-6 mb-4">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full bg-indigo-900 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-card">
                    {CURRENT_USER.avatar}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-success border-2 border-white flex items-center justify-center">
                    <CheckCircle2 size={11} className="text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h1 className="text-slate-900 text-2xl font-bold tracking-tight">{CURRENT_USER.name}</h1>
                    <span className="text-slate-400 text-sm font-mono">@{CURRENT_USER.username}</span>
                    <span className="dd-chip-completed text-xs">
                      ✓ DEVDEEP VERIFIED STAFF L7
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Trophy size={13} className="text-warning" />
                    <span className="text-warning text-sm font-semibold">Top 0.4% Global</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{CURRENT_USER.title} · {CURRENT_USER.bio}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} />{CURRENT_USER.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} />Joined {CURRENT_USER.joinedDate}</span>
                    <span className="flex items-center gap-1 text-eblue-600"><Globe size={11} />alexvolkov.dev</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { icon: <Globe size={11} />, label: "alex-volkov" },
                      { icon: <Linkedin size={11} />, label: "LinkedIn" },
                      { icon: <Github size={11} />, label: "GitHub" },
                      { icon: <Twitter size={11} />, label: "@volkov_dist" },
                    ].map((link, i) => (
                      <div key={i} className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 hover:text-slate-900 hover:border-slate-300 cursor-pointer transition-colors">
                        {link.icon}
                        <span>{link.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost text-xs"><Globe size={12} /> Public View</button>
                    <button className="btn-ghost text-xs"><Layers size={12} /> Portfolio Builder</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost text-xs"><Share2 size={12} /> Share</button>
                    <button className="btn-primary text-xs"><Download size={12} /> Verified Dossier</button>
                  </div>
                </div>
              </div>

              {/* Stat strip */}
              <div className="grid grid-cols-5 gap-4 mt-5 pt-5 border-t border-slate-100">
                {[
                  { label: "Submissions", value: CURRENT_USER.submissions, sub: "+32 this month", color: "" },
                  { label: "Active Streak", value: `${CURRENT_USER.streak} days`, sub: "Best: 102d", color: "text-orange-600" },
                  { label: "Market Readiness", value: `${CURRENT_USER.marketReadiness}%`, sub: "FAANG Calibrated", color: "text-ai-dark" },
                  { label: "Production Deploys", value: CURRENT_USER.productionDeploys, sub: "100% Sandbox Pass", color: "" },
                  { label: "DevDeep Rank", value: `#${CURRENT_USER.rank}`, sub: `of ${CURRENT_USER.rankTotal.toLocaleString()}`, color: "text-indigo-900" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className={`text-2xl font-bold tracking-tight ${s.color || "text-slate-900"}`}>{s.value}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                    <p className={`text-xs mt-0.5 ${s.color || "text-slate-400"}`}>{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Builder Banner */}
            <div className="gradient-border p-4 mb-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                  <Layers size={15} className="text-indigo-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-slate-900 font-bold">Portfolio Builder Active</p>
                    <span className="dd-chip-completed text-[10px]">LIVE</span>
                  </div>
                  <p className="text-slate-600 text-sm">Publishing to <span className="text-eblue-600 font-medium">alex.devdeep.page</span> with cryptographic verification proofs.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">Preset:</span>
                  {["Developer Precision", "Terminal Dark", "Monospace Raw"].map(p => (
                    <button
                      key={p}
                      onClick={() => setPortfolioPreset(p)}
                      className={`px-2.5 py-1 rounded-sm text-xs font-medium transition-colors ${portfolioPreset === p ? "bg-indigo-900 text-white" : "text-slate-500 hover:text-slate-900"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="btn-primary text-xs">Publish Profile</button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200 mb-5 overflow-x-auto bg-white rounded-t-md px-2">
              {PROFILE_TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                >
                  {i === 1 && <Layers size={13} />}
                  {i === 2 && <Github size={13} />}
                  {i === 3 && <Award size={13} />}
                  {i === 4 && <TrendingUp size={13} />}
                  {tab}
                  {i === 1 && <span className="dd-chip-blue text-[10px]">4</span>}
                </button>
              ))}
            </div>

            <div className="flex gap-5">
              {/* Main content */}
              <div className="flex-1 min-w-0 space-y-5">
                {/* Verified Projects */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-warning" />
                      <h2 className="text-slate-900 font-bold text-lg tracking-tight">Verified Production Projects</h2>
                    </div>
                    <span className="text-slate-400 text-xs">Validated via DevDeep Live Cluster Test Suite</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {PROJECTS.map(project => (
                      <div key={project.id} className="dd-card-hover p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="dd-chip-indigo text-[10px] uppercase">{project.category}</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <div className="w-2 h-2 rounded-full bg-ai" />
                            <span className="text-slate-900 text-xs font-bold">{project.score}/100</span>
                          </div>
                        </div>
                        <h3 className="text-slate-900 font-bold text-sm mb-2 tracking-tight">{project.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed mb-3">{project.description}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {project.metrics.map(m => (
                            <div key={m.label} className="dd-surface p-2">
                              <p className="text-slate-400 text-[10px]">{m.label}</p>
                              <p className="text-slate-900 text-sm font-bold font-mono">{m.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map(t => (
                              <span key={t} className="dd-chip-slate text-[10px]">{t}</span>
                            ))}
                          </div>
                          {project.verified && (
                            <div className="flex items-center gap-1 text-success text-[10px] font-semibold">
                              <CheckCircle2 size={11} />
                              Verified
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="btn-ghost text-xs py-1.5"><ExternalLink size={11} /> Code Repo</button>
                          <button className="btn-ghost text-xs py-1.5"><Layers size={11} /> Architecture</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contributions Heatmap */}
                <div className="dd-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-eblue-600" />
                      <h2 className="text-slate-900 font-bold text-base tracking-tight">1,842 Verified Contributions in the Past Year</h2>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      {["All Activity", "Commits", "Reviews", "Challenges"].map(f => (
                        <button key={f} className="hover:text-slate-700 transition-colors">{f}</button>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs mb-4">Aggregated from GitHub commits, merged PRs, and DevDeep challenge completions.</p>
                  <ActivityHeatmap />
                </div>

                {/* Milestones */}
                <div className="dd-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-indigo-700" />
                      <h2 className="text-slate-900 font-bold text-base tracking-tight">Algorithmic & Systems Milestones</h2>
                    </div>
                    <button className="text-eblue-600 text-xs hover:text-eblue-700 transition-colors">View all 78 solved →</button>
                  </div>
                  <div className="space-y-3">
                    {MILESTONES.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
                        <div className={`w-9 h-9 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${m.color === "cyan" ? "bg-ai-dark" : "bg-orange-500"}`}>
                          {m.lang}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 text-sm font-semibold truncate">{m.title}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className={`dd-chip text-[10px] ${m.difficulty === "Expert" ? "dd-chip-purple" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>{m.difficulty}</span>
                            <span className="text-slate-500 text-xs">{m.passed}</span>
                            <span className="text-ai-dark text-xs">{m.sub}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-slate-900 text-sm font-bold font-mono">{m.metric}</p>
                          <p className="text-slate-400 text-xs">{m.value}</p>
                        </div>
                        {m.verified && <CheckCircle2 size={16} className="text-success shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Rail */}
              <div className="w-[272px] shrink-0 space-y-4">
                {/* Career */}
                <div className="dd-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={14} className="text-ai-dark" />
                    <p className="text-slate-900 font-bold text-sm">Career & Compensation</p>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex-1 progress-track">
                      <div className="progress-fill" style={{ width: "87%" }} />
                    </div>
                    <span className="text-ai-dark text-[10px] font-bold whitespace-nowrap">Staff / Principal</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-1">Q2 2026 · Compensation Target</p>
                  <p className="text-slate-900 text-lg font-bold font-mono">₹75L – ₹95L INR</p>
                  <p className="text-slate-500 text-xs">Verified Staff L7 Tier</p>
                  <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-md text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={11} className="text-warning" />
                      <span className="text-amber-800 font-semibold">Active Scout Attention</span>
                    </div>
                    <p className="text-slate-600">Profile reviewed by hiring leads at <span className="text-slate-900 font-medium">Stripe, Cloudflare, Datadog</span> in the last 48 hours.</p>
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      onClick={() => toast.success("Contact request forwarded via DevDeep Verified Relay.")}
                      className="btn-primary w-full justify-center text-xs"
                    >
                      <ArrowUpRight size={12} /> Contact via Verified Relay
                    </button>
                    <button
                      onClick={() => toast.success("Technical Screen Scheduler opened.")}
                      className="btn-ghost w-full justify-center text-xs"
                    >
                      <Calendar size={12} /> Schedule Technical Screen
                    </button>
                  </div>
                </div>

                {/* AI Mentor Testimonial */}
                <div className="dd-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain size={13} className="text-ai" />
                      <p className="text-slate-900 font-bold text-sm">DevDeep AI Mentor</p>
                    </div>
                    <span className="dd-chip-ai text-[10px]">99.4% confidence</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-2">v3.8 · Evaluated on 40,000+ LOC</p>
                  <p className="text-slate-600 text-xs italic leading-relaxed mb-3">
                    "Alex demonstrates exceptional intuition for lock-free data structures, async channel orchestration, and zero-allocation memory pipelines under extreme concurrency loads. Consistently 99th percentile."
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Autonomous audit</span>
                    <div className="flex items-center gap-1 text-success">
                      <CheckCircle2 size={11} />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Skill Mastery */}
                <div className="dd-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-900 font-bold text-sm">Skill Mastery Matrix</p>
                    <span className="text-slate-500 text-xs font-mono">892 / 1000</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-3">Continuous evaluation based on automated benchmarks & production tests.</p>
                  {SKILL_MATRIX.map(s => (
                    <div key={s.label} className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-600 text-xs">{s.label}</span>
                        <span className={`text-xs font-semibold ${s.value >= 90 ? "text-ai-dark" : "text-eblue-600"}`}>{s.value}% <span className="text-slate-400 font-normal">({s.badge})</span></span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${s.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Credentials */}
                <div className="dd-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield size={13} className="text-success" />
                      <p className="text-slate-900 font-bold text-sm">Verified Credentials</p>
                    </div>
                    <span className="text-slate-400 text-xs">On-chain Proof</span>
                  </div>
                  {CREDENTIALS.map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-md mb-2">
                      <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                        <Award size={14} className="text-indigo-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-900 text-xs font-semibold">{c.title}</p>
                        <p className="text-slate-400 text-[10px] font-mono">ID: {c.id}</p>
                      </div>
                      <CheckCircle2 size={14} className="text-success shrink-0" />
                    </div>
                  ))}
                  <button className="w-full text-xs text-center text-eblue-600 hover:text-eblue-700 mt-1 transition-colors flex items-center justify-center gap-1">
                    <ExternalLink size={11} /> Inspect Verification Merkle Leaf
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
