import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers, Terminal, Cpu, ShieldCheck, ArrowRight,
  Sparkles, CheckCircle2, GitBranch, Activity
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function SystemArchitecturePage() {
  const guides = [
    {
      id: "arch-raft",
      title: "Raft Consensus State Machine Replication Invariants",
      category: "Distributed Systems",
      readTime: "16 min read",
      summary: "A rigorous mathematical and code breakdown of Raft leader election, randomized heartbeat timers, log divergence reconciliation, and linearizable read quorums.",
      sections: [
        "1. Split-Brain Prevention via Quorum Majority Voting",
        "2. Monotonically Increasing Term Epochs",
        "3. Snapshotting & Log Compaction Disk Synchronization",
      ],
    },
    {
      id: "arch-lsm",
      title: "LSM-Tree Storage Engine: Write-Ahead Logs & SSTable Compaction",
      category: "Database Internals",
      readTime: "22 min read",
      summary: "Designing high-throughput key-value storage engines. Memory skiplist concurrent read paths, CRC32 block checksums, and leveled vs size-tiered compaction heuristics.",
      sections: [
        "1. Write Amplification vs Space Amplification Tradeoffs",
        "2. Block Cache Zero-Copy Alignment in OS Page Cache",
        "3. Bloom Filter False Positive Rate Sizing",
      ],
    },
    {
      id: "arch-concurrency",
      title: "Zero-Allocation Go Concurrency & Memory Model Deep Dive",
      category: "Performance Engineering",
      readTime: "14 min read",
      summary: "Eliminating GC pauses in low-latency systems. Atomic compare-and-swap (CAS), memory order barriers, and lock-free ring buffers in Go 1.22.",
      sections: [
        "1. Escape Analysis & Stack vs Heap Allocation",
        "2. sync.Pool Lifecycle & CPU Cache Contention",
        "3. Atomic 64-bit Alignment on Multi-Core Architectures",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Layers size={13} className="text-indigo-600" />
            <span>DEEP SYSTEMS ENGINEERING BLUEPRINTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            System Architecture Guides
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Exhaustive, code-level architectural breakdowns of production storage engines, consensus protocols, and low-latency concurrency primitives.
          </p>
        </div>

        {/* Guides List */}
        <div className="space-y-6">
          {guides.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {g.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{g.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                {g.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {g.summary}
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Included Architectural Modules
                </span>
                {g.sections.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 font-mono">
                    <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/coding-academy"
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                >
                  <span>Launch Interactive Sandbox Demo</span>
                  <ArrowRight size={13} />
                </Link>
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
