import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FolderOpen, ArrowRight, CheckCircle2, ShieldCheck,
  Search, Filter, Sparkles, Terminal, Activity, Layers
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { PROJECTS } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const EXTENDED_PROJECTS = [
  ...PROJECTS,
  {
    id: "p2",
    title: "LSM-Tree Key-Value Storage Engine with WAL",
    category: "Database Internals",
    score: 96,
    description: "Append-only write-ahead log, memtable skiplist with concurrent readers, and multi-threaded SSTable compaction pipeline.",
    metrics: [
      { label: "Write QPS", value: "84,000 ops/sec" },
      { label: "P99 Latency", value: "1.4ms" },
    ],
    tech: ["Go", "Skiplist", "Compaction", "Disk I/O"],
    verified: true,
  },
  {
    id: "p3",
    title: "Distributed Rate Limiter & Sliding Window Token Bucket",
    category: "High-Volume Infrastructure",
    score: 99,
    description: "Cluster-wide distributed rate limiter with Redis backend, lock-free local caching, and fallback circuit breakers.",
    metrics: [
      { label: "Peak QPS", value: "250,000 req/sec" },
      { label: "Failover Time", value: "< 50ms" },
    ],
    tech: ["Redis", "sync/atomic", "Distributed Locks", "Go"],
    verified: true,
  },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = EXTENDED_PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartLab = (projectId: string, projectTitle: string) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to launch ${projectTitle}.`,
      });
      navigate(`/register?redirect=/projects/${projectId}`);
      return;
    }
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <FolderOpen size={13} className="text-indigo-600" />
            <span>PRODUCTION-GRADE CAPSTONES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Real-World Engineering Projects
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Build actual distributed systems, not toy apps. Each project includes production test benches, chaos fault injection, and cryptographic proof attestations.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-xl mx-auto w-full">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects by architecture, category, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {proj.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck size={13} /> {proj.score}/100 Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 font-mono text-xs">
                  {proj.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] text-slate-400 block">{m.label}</span>
                      <strong className="text-slate-800 font-bold">{m.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/projects/${proj.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-900 underline underline-offset-4"
                >
                  Architecture Specs
                </Link>
                <button
                  onClick={() => handleStartLab(proj.id, proj.title)}
                  className="px-4 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Launch Lab</span>
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
