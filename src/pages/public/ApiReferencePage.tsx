import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Terminal, ShieldCheck, Copy, Check, ArrowRight,
  Code2, ExternalLink, Activity, Lock
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { toast } from "sonner";

export default function ApiReferencePage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("evaluate");
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: "evaluate",
      method: "POST",
      path: "/v1/sandbox/evaluate",
      title: "Evaluate Code in Sandbox VM",
      desc: "Dispatches a code solution to an ephemeral micro-VM kernel and returns deterministic benchmark results in 4.1ms.",
      sampleReq: `{
  "challenge_id": "c1-token-bucket",
  "language": "go1.22",
  "code": "package main\\nfunc Allow() bool { return true }"
}`,
      sampleRes: `{
  "status": "PASS",
  "test_count": 32,
  "passed_count": 32,
  "p99_latency_ms": 4.1,
  "allocations_bytes": 0,
  "attestation_signature": "0x8fa928...3b9"
}`,
    },
    {
      id: "verify",
      method: "GET",
      path: "/v1/verifications/:commit_hash",
      title: "Verify Cryptographic Skill Attestation",
      desc: "Validates a signed commit hash against the tamper-proof DevDeep Merkle tree.",
      sampleReq: `// Parameter: commit_hash=0x7e29a8f...`,
      sampleRes: `{
  "valid": true,
  "developer_name": "Alex Volkov",
  "score": 98,
  "evaluated_at": "2026-08-28T14:32:00Z",
  "issuer": "DevDeep Edge Kernel Region ap-south-1"
}`,
    },
    {
      id: "ast",
      method: "POST",
      path: "/v1/ast/review",
      title: "AST Concurrency & Race Hazard Scan",
      desc: "Performs full abstract syntax tree analysis detecting goroutine leaks, deadlocks, and memory escape hazards.",
      sampleReq: `{
  "code": "for _, t := range tasks { go run(t) }",
  "compiler_target": "go1.22"
}`,
      sampleRes: `{
  "hazards_detected": 1,
  "hazards": [
    {
      "severity": "CRITICAL",
      "line": 1,
      "message": "Potential loop variable capture in asynchronous routine",
      "recommendation": "Upgrade to Go 1.22 scoped semantics or pass parameter explicitly"
    }
  ]
}`,
    },
  ];

  const current = endpoints.find((e) => e.id === selectedEndpoint) || endpoints[0];

  const copyCode = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast.success("JSON copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Terminal size={13} className="text-indigo-600" />
            <span>DEVELOPER API SPECIFICATIONS v1</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            DevDeep REST API Reference
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Integrate DevDeep deterministic code evaluators, cryptographic skill verifications, and AST static analyzers directly into your CI/CD pipelines.
          </p>
        </div>

        {/* API Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Nav of Endpoints */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
            <p className="text-[10px] font-mono font-bold uppercase text-slate-400 px-3 py-1">
              Available Endpoints
            </p>
            {endpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep.id)}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedEndpoint === ep.id
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      ep.method === "POST" ? "bg-cyan-100 text-cyan-900" : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="truncate">{ep.path}</span>
                </div>
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 px-3 space-y-2 text-xs text-slate-500">
              <span className="font-bold text-slate-800 block">Authentication Header:</span>
              <code className="text-[11px] font-mono bg-slate-100 p-1 rounded text-slate-800 block">
                Authorization: Bearer ddp_live_...
              </code>
            </div>
          </div>

          {/* Right Endpoint Details Panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5">
              <span
                className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                  current.method === "POST" ? "bg-cyan-100 text-cyan-900" : "bg-emerald-100 text-emerald-900"
                }`}
              >
                {current.method}
              </span>
              <span className="font-mono text-base font-bold text-slate-900">
                {current.path}
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">{current.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Request Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Request Payload (JSON)
                </span>
                <button
                  onClick={() => copyCode(current.sampleReq)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-mono"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800">
                <code>{current.sampleReq}</code>
              </pre>
            </div>

            {/* Response Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-600">
                  Response (200 OK)
                </span>
                <button
                  onClick={() => copyCode(current.sampleRes)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-mono"
                >
                  <Copy size={12} /> Copy
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800">
                <code>{current.sampleRes}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
