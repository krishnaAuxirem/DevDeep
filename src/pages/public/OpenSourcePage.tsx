import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GitBranch, Star, Terminal, ExternalLink, ArrowRight,
  ShieldCheck, CheckCircle2, Code2, Users, Sparkles
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { toast } from "sonner";

export default function OpenSourcePage() {
  const repos = [
    {
      name: "devdeep/ast-evaluator",
      desc: "Fast Go & Rust Abstract Syntax Tree parser for detecting concurrency deadlocks, memory leaks, and goroutine anti-patterns.",
      stars: 1240,
      forks: 180,
      lang: "Go",
      license: "Apache-2.0",
    },
    {
      name: "devdeep/sandbox-kernel",
      desc: "Lightweight Linux KVM micro-VM hypervisor wrapper achieving 4.1ms cold starts for ephemeral code execution sandboxes.",
      stars: 2890,
      forks: 310,
      lang: "Rust",
      license: "MIT",
    },
    {
      name: "devdeep/raft-benchmarks",
      desc: "Deterministic test harnesses and chaos network partition injector for validating Raft consensus state machine invariants.",
      stars: 960,
      forks: 140,
      lang: "Go",
      license: "Apache-2.0",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <GitBranch size={13} className="text-emerald-600" />
            <span>OPEN SOURCE AT DEVDEEP</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Building in the Open
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our core evaluator kernels, AST analyzers, and deterministic consensus test suites are published openly under permissive licenses.
          </p>
        </div>

        {/* Repositories List */}
        <div className="space-y-4">
          {repos.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-sm font-bold text-indigo-900 hover:underline cursor-pointer">
                    {r.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200">
                    {r.license}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {r.desc}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> {r.lang}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> {r.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch size={12} /> {r.forks} forks
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => {
                    toast.success(`Opening GitHub repository ${r.name}`);
                    window.open(`https://github.com/${r.name}`, "_blank");
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>View Repository</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contributing Guidelines Callout */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">How to Contribute</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We welcome RFC contributions, bug fixes, and benchmark harness test suites from the community. All pull requests are verified automatically against our multi-threaded micro-VM CI/CD test cluster.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/documentation"
              className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
            >
              <span>Read Contributor Architecture Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
