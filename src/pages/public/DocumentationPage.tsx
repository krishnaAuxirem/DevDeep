import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Terminal, ShieldCheck, Activity, Search,
  ChevronRight, ArrowRight, Sparkles, Cpu, Layers, Copy, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const curlExample = `curl -X POST https://api.devdeep.dev/v1/sandbox/evaluate \\
  -H "Authorization: Bearer ddp_live_839f28a9b" \\
  -H "Content-Type: application/json" \\
  -d '{
    "language": "go1.22",
    "challenge_id": "c1-token-bucket",
    "solution": "package main..."
  }'`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <BookOpen size={13} className="text-indigo-600" />
            <span>PLATFORM SPECIFICATIONS & KERNEL GUIDES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            DevDeep Documentation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Technical architecture guides, cloud sandbox micro-VM internals, automated AST evaluator hooks, and cryptographic portfolio attestation APIs.
          </p>

          <div className="relative max-w-lg mx-auto pt-2">
            <Search size={16} className="absolute left-3.5 top-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation, VM kernels, API endpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs bg-white shadow-xs focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* 4 Core Doc Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Quickstart & Setup",
              desc: "Deploying your first sandbox drill in under 4.1ms.",
              path: "/coding-academy",
              icon: <Terminal size={18} className="text-indigo-600" />,
            },
            {
              title: "AST Evaluator",
              desc: "Static analysis syntax tree and race condition invariants.",
              path: "/ai-mentor",
              icon: <Sparkles size={18} className="text-cyan-600" />,
            },
            {
              title: "System Architecture",
              desc: "In-depth blueprints for Raft, LSM-trees, and eBPF tracing.",
              path: "/resources/system-architecture",
              icon: <Layers size={18} className="text-amber-600" />,
            },
            {
              title: "API Reference",
              desc: "REST & GraphQL endpoints for telemetry proofs.",
              path: "/api-reference",
              icon: <Activity size={18} className="text-emerald-600" />,
            },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-700 pt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide →
              </span>
            </Link>
          ))}
        </div>

        {/* Technical Specification Highlight */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider">
                API INTEGRATION
              </span>
              <h3 className="text-lg font-bold text-white">Execute Code Against the Deterministic Engine</h3>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(curlExample);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? "Copied cURL" : "Copy cURL"}</span>
            </button>
          </div>

          <pre className="font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <code>{curlExample}</code>
          </pre>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-slate-500 block text-[10px]">Response Time</span>
              <strong className="text-emerald-400">p99: 4.1ms edge execution</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Isolation</span>
              <strong className="text-slate-200">KVM Hardware Micro-VMs</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Memory Ceiling</span>
              <strong className="text-slate-200">256MB / tenant sandbox</strong>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
