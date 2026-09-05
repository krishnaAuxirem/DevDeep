import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { BarChart3, TrendingUp, Cpu, Award, Zap, Activity } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { SKILL_MATRIX } from "@/constants/data";

const PERFORMANCE_DATA = [
  { week: "W1", commits: 24, challenges: 4, hours: 8.2 },
  { week: "W2", commits: 38, challenges: 6, hours: 11.5 },
  { week: "W3", commits: 45, challenges: 8, hours: 14.0 },
  { week: "W4", commits: 52, challenges: 10, hours: 16.8 },
  { week: "W5", commits: 48, challenges: 9, hours: 15.2 },
  { week: "W6", commits: 64, challenges: 12, hours: 19.5 },
  { week: "W7", commits: 70, challenges: 14, hours: 22.0 },
  { week: "W8", commits: 84, challenges: 16, hours: 24.5 },
];

const SKILL_RADAR_DATA = [
  { domain: "Distributed Consensus", score: 96 },
  { domain: "Concurrency & Mutex", score: 94 },
  { domain: "Storage Engines (LSM)", score: 91 },
  { domain: "Network epoll / I/O", score: 89 },
  { domain: "Cloud & K8s Architecture", score: 88 },
  { domain: "Database Query Tuning", score: 82 },
];

export default function AnalyticsView() {
  const [metricTimeframe, setMetricTimeframe] = useState<"8w" | "quarter" | "year">("8w");

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
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Engineering Analytics Engine</h1>
                <span className="dd-chip-ai text-[10px]">DYNAMIC RECHARTS</span>
              </div>
              <p className="text-slate-500 text-sm">
                Objective algorithmic performance, commit rhythm telemetry, and market readiness distributions.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(["8w", "quarter", "year"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setMetricTimeframe(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
                    metricTimeframe === t ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">GLOBAL SKILL PERCENTILE</span>
              <p className="text-2xl font-bold text-indigo-900 font-mono">Top 0.4%</p>
              <p className="text-[11px] text-emerald-600 font-medium">Rank #142 of 38,400</p>
            </div>
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">CODE COMPLETION VELOCITY</span>
              <p className="text-2xl font-bold text-slate-900 font-mono">14.2 / wk</p>
              <p className="text-[11px] text-emerald-600 font-medium">+28% vs peer average</p>
            </div>
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">AST PASS RATIO</span>
              <p className="text-2xl font-bold text-cyan-700 font-mono">98.4%</p>
              <p className="text-[11px] text-slate-400">Zero unpatched data races</p>
            </div>
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">TOTAL ACTIVE HOURS</span>
              <p className="text-2xl font-bold text-slate-900 font-mono">131.7 hrs</p>
              <p className="text-[11px] text-indigo-600 font-medium">84-day continuous streak</p>
            </div>
          </div>

          {/* Charts Row 1: Coding Velocity Over Time */}
          <div className="dd-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900">Coding Velocity & Commit Trajectory</h3>
                <p className="text-xs text-slate-500">Weekly commits & verified challenge solutions</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-900" /> Commits</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Solves</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#312E81" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#312E81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                  />
                  <Area type="monotone" dataKey="commits" stroke="#312E81" strokeWidth={2} fillOpacity={1} fill="url(#colorCommits)" />
                  <Line type="monotone" dataKey="challenges" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2: Skill Domain Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="dd-card p-6 space-y-4">
              <h3 className="font-bold text-base text-slate-900">Domain Competency Ratings</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SKILL_RADAR_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                    <YAxis dataKey="domain" type="category" width={140} stroke="#475569" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="score" fill="#2563EB" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dd-card p-6 space-y-4">
              <h3 className="font-bold text-base text-slate-900">Talent Scout Calibration Radar</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aggregated skill evaluation compared against Staff Software Engineer (L7) benchmarks at Tier-1 tech organizations.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg text-xs">
                  <span className="text-slate-700 font-medium">Distributed Storage & Raft:</span>
                  <strong className="text-indigo-900 font-mono">Exceeds Benchmark (Top 1%)</strong>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg text-xs">
                  <span className="text-slate-700 font-medium">Memory Concurrency:</span>
                  <strong className="text-indigo-900 font-mono">Exceeds Benchmark (Top 2%)</strong>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg text-xs">
                  <span className="text-slate-700 font-medium">Database Buffer Pool Tuning:</span>
                  <strong className="text-emerald-700 font-mono">Meets Benchmark (Target Polish)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
