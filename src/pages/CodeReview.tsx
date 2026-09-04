import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download, CheckCircle2, Shield, Zap, ChevronDown, Brain,
  GitPullRequest, MessageSquare, Layers, Webhook, Plus, ChevronRight,
  RefreshCw, CheckCheck, X, Send, Cpu
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { CODE_REVIEW_FILES } from "@/constants/data";

const DIFF_LINES = [
  { type: "context", ln: "44  44", content: `  func (s *RedisStore) DispatchNotification(ctx context.Context, key string) error {` },
  { type: "context", ln: "45  45", content: `    entry := s.registry.Load(key)` },
  { type: "context", ln: "46  46", content: `    if entry == nil { return ErrNotFound }` },
  { type: "removed", ln: "47   -", content: `    s.notifyChan <- entry // Unbounded block risk` },
  { type: "added",   ln: " -  47", content: `    notifyChan <- entry.DeepCopy()` },
  { type: "context", ln: "  48", content: `  }` },
  { type: "context", ln: "",     content: `` },
  { type: "context", ln: "83  83", content: `  func (s *RedisStore) RecordEviction() {` },
  { type: "removed", ln: "84   -", content: `    s.mu.Lock(); defer s.mu.Unlock(); s.evictionCount++` },
  { type: "added",   ln: " -  84", content: `    atomic.AddUint64(&s.evictionCount, 1)` },
  { type: "context", ln: "  87", content: `  }` },
];

const AI_SUGGESTIONS = [
  {
    id: "s1", severity: "Critical", type: "Goroutine Leak & Channel Backpressure",
    desc: "Channel notifyChan will deadlock workers if the consumer context terminates during high redis pipeline loads. The current write lacks non-blocking select logic with ctx.Done() fallback.",
    patch: `select {\n  case s.notifyChan <- entry.DeepCopy():\n    return nil\n  case <-ctx.Done():\n    return fmt.Errorf("dispatch aborted: %w", ctx.Err())\n}`,
    accepted: false, dismissed: false,
  },
  {
    id: "s2", severity: "Performance", type: "Lock-Free Atomic Increment",
    badge: "-18% CPU Mutex Contention",
    desc: "Replace s.mu.Lock() around uint64 counter with atomic.AddUint64(&s.evictionCount, 1). Eliminates scheduler thread pauses during burst invalidations.",
    patch: `atomic.AddUint64(&s.evictionCount, 1)`,
    accepted: false, dismissed: false,
  },
];

const CHAT_MESSAGES = [
  { id: "c1", author: "Alex Volkov", time: "11:42 AM", text: "Can we ensure this cache invalidation is idempotent across multiple worker replicas?", isUser: true },
  {
    id: "c2", author: "Cyan AI", time: "11:43 AM", isAI: true,
    text: "In the current implementation, concurrent invalidation commands lack a monotonically increasing version fence. Here's how to enforce idempotency via Redis Version Vectors:",
    code: `Worker A —[SETNX v42]—> Redis (OK)\nWorker B —[SETNX v41]—> Redis (REJECT)\n—[PUBLISH]— Synced Stream`,
    links: ["Check Memory Leaks", "Run Staticcheck", "Generate Fuzz Tests", "P99 Latency Impact"],
  },
];

export default function CodeReview() {
  const navigate = useNavigate();
  const [activeFile, setActiveFile] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES);
  const [suggestions, setSuggestions] = useState(AI_SUGGESTIONS);
  const [chatTab, setChatTab] = useState<"ai" | "radar" | "security">("ai");

  const acceptSuggestion = (id: string) => setSuggestions(s => s.map(sg => sg.id === id ? { ...sg, accepted: true } : sg));
  const dismissSuggestion = (id: string) => setSuggestions(s => s.map(sg => sg.id === id ? { ...sg, dismissed: true } : sg));

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(m => [...m, { id: Date.now().toString(), author: "Alex Volkov", time: "now", text: chatInput, isUser: true }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(m => [...m, {
        id: (Date.now() + 1).toString(), author: "Cyan AI", time: "now", isAI: true,
        text: "Using atomic operations here eliminates the mutex bottleneck entirely — here's the lock-free pattern.",
        code: undefined, links: ["View Benchmark", "Apply Refactor"],
      }]);
    }, 1200);
  };

  const SCORE_CARDS = [
    { label: "Quality Score", value: 88, max: 100, sub: "+12 refactor", color: "indigo", icon: <Cpu size={14} /> },
    { label: "Security Guard", value: 96, max: 100, sub: "0 High, 1 Advisory", color: "emerald", icon: <Shield size={14} /> },
    { label: "P99 Benchmark", value: 94, max: 100, sub: "-34% Latency", color: "cyan", icon: <Zap size={14} /> },
  ];

  const fileStatusClass = (color: string) => {
    if (color === "blue") return "dd-chip-blue";
    if (color === "amber") return "dd-chip-pending";
    if (color === "emerald") return "dd-chip-completed";
    return "dd-chip-ai";
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center">
                  <GitPullRequest size={16} className="text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h1 className="text-slate-900 font-bold text-base tracking-tight">DevDeep AI Code Review Studio</h1>
                    <span className="dd-chip-purple text-[10px]">PAIR ARCHITECT</span>
                  </div>
                  <p className="text-slate-500 text-xs">Automated synthesis, security verification, and distributed systems review</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 dd-surface rounded-md text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
                <span className="text-slate-500">Active PR:</span>
                <span className="text-slate-900 font-semibold">PR #42: Cache Invalidation Pipeline & Redis Fallback</span>
                <span className="text-slate-400 font-mono">Go 1.22</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button className="btn-ghost text-xs"><Download size={12} /> Export Diff</button>
              <button className="btn-primary text-xs bg-success hover:bg-emerald-600 border-0">
                <CheckCircle2 size={12} /> Apply All AI Refactors (3)
              </button>
              <button className="btn-ghost text-xs border-emerald-300 text-success hover:text-emerald-700">
                <CheckCheck size={12} /> Approve PR
              </button>
              <div className="flex items-center gap-3 ml-auto text-xs text-slate-400">
                <Webhook size={10} />
                <span>Webhook: commit <span className="text-slate-700 font-mono">4f98a2c</span> · 2m ago</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left — Files + Scores */}
            <div className="w-[256px] shrink-0 border-r border-slate-200 flex flex-col overflow-y-auto bg-white">
              <div className="p-4 space-y-3">
                {SCORE_CARDS.map(sc => (
                  <div key={sc.label} className="dd-surface p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{sc.label}</p>
                      <div className={`w-6 h-6 rounded-sm flex items-center justify-center ${sc.color === "indigo" ? "bg-indigo-50 text-indigo-700" : sc.color === "emerald" ? "bg-emerald-50 text-success" : "bg-cyan-50 text-ai"}`}>
                        {sc.icon}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-2xl font-bold ${sc.color === "indigo" ? "text-indigo-900" : sc.color === "emerald" ? "text-success" : "text-ai-dark"}`}>{sc.value}</span>
                      <span className="text-slate-400 text-xs">/{sc.max}</span>
                      <span className={`dd-chip ml-auto text-[10px] ${sc.color === "indigo" ? "dd-chip-indigo" : sc.color === "emerald" ? "dd-chip-completed" : "dd-chip-ai"}`}>{sc.sub}</span>
                    </div>
                  </div>
                ))}

                <div className="dd-surface p-3">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Maintainability</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-success text-2xl font-bold">A+</span>
                    <span className="text-slate-400 text-xs">Cyclomatic: 4.2</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Changed Files (4)</p>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-success">+175</span>
                      <span className="text-slate-300">/</span>
                      <span className="text-danger">-36</span>
                    </div>
                  </div>
                  <input placeholder="Filter files..." className="dd-input mb-2 h-8 text-xs" />
                  <div className="space-y-1">
                    {CODE_REVIEW_FILES.map((file, i) => (
                      <button
                        key={file.name}
                        onClick={() => setActiveFile(i)}
                        className={`w-full text-left p-2.5 rounded-md border transition-all ${i === activeFile ? "border-indigo-200 bg-indigo-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-slate-900 text-xs font-mono font-semibold">{file.name}</span>
                          {i === activeFile && <span className="dd-chip-indigo text-[10px]">Active</span>}
                        </div>
                        <p className="text-slate-400 text-[10px] mb-1">{file.path}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[10px] font-mono">
                            <span className="text-success">+{file.added}</span>
                            <span className="text-danger">-{file.removed}</span>
                          </div>
                          <span className={`dd-chip text-[10px] ${fileStatusClass(file.statusColor)}`}>{file.issue}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Audit Filters</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Race Hazards & Leaks", value: "1 alert", ok: false },
                      { label: "Error Propagation", value: "2 alerts", ok: false },
                      { label: "Escape Analysis / Alloc", value: "1 opt", ok: false },
                      { label: "OWASP & Secret Leaks", value: "Passed", ok: true },
                    ].map(f => (
                      <div key={f.label} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${f.ok ? "bg-success" : "bg-warning"}`} />
                          <span className="text-slate-600">{f.label}</span>
                        </div>
                        <span className={f.ok ? "text-success font-semibold" : "text-warning font-semibold"}>{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center — Diff Viewer */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* File header */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-200 bg-white">
                <span className="text-slate-900 text-xs font-mono font-semibold">internal/cache/redis_store.go</span>
                <span className="dd-chip-slate text-[10px]">Go 1.22</span>
                <div className="flex-1" />
                <span className="text-slate-400 text-xs">Blame: Alex V. (2h ago)</span>
                <div className="flex items-center gap-1 text-xs">
                  <button className="btn-ghost text-xs py-0.5 px-2 text-indigo-700 border-indigo-200 bg-indigo-50">Unified</button>
                  <button className="btn-ghost text-xs py-0.5 px-2">Split</button>
                </div>
              </div>

              {/* Diff in IDE dark shell */}
              <div className="flex-1 overflow-y-auto ide-shell rounded-none border-0">
                <div className="font-mono text-xs">
                  {DIFF_LINES.map((line, i) => (
                    <div key={i} className={`flex ${line.type === "removed" ? "bg-red-900/20" : line.type === "added" ? "bg-emerald-900/20" : ""}`}>
                      <span className="w-16 shrink-0 px-3 py-1.5 text-[10px] border-r select-none" style={{ color: "#475569", borderColor: "#1E293B" }}>{line.ln}</span>
                      <div className={`flex-1 px-4 py-1.5 ${line.type === "removed" ? "text-red-300 border-l-2 border-red-500" : line.type === "added" ? "text-emerald-300 border-l-2 border-emerald-500" : "text-slate-400"}`}>
                        {line.type === "removed" && <span className="text-red-500 mr-2">-</span>}
                        {line.type === "added" && <span className="text-emerald-500 mr-2">+</span>}
                        {line.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Suggestions — white cards over dark bg */}
                <div className="p-4 space-y-4">
                  {suggestions.filter(s => !s.dismissed).map(sg => (
                    <div key={sg.id} className={`bg-white border rounded-md overflow-hidden shadow-card ${sg.accepted ? "border-emerald-200 opacity-70" : "border-slate-200"}`}>
                      <div className={`flex items-center gap-2 px-4 py-2.5 ${sg.accepted ? "bg-emerald-50" : "bg-indigo-50"}`}>
                        <Zap size={13} className="text-ai" />
                        <span className="text-ai-dark text-xs font-bold uppercase tracking-wider">AI PAIR ARCHITECT</span>
                        <span className="text-slate-900 text-sm font-semibold ml-1">{sg.type}</span>
                        {(sg as any).badge && <span className="dd-chip-error text-[10px] ml-auto">{(sg as any).badge}</span>}
                        {sg.severity === "Critical" && !(sg as any).badge && (
                          <div className="ml-auto flex items-center gap-1.5">
                            <span className="dd-chip-error text-[10px]">Critical</span>
                            <span className="dd-chip-indigo text-[10px]">Memory Contention</span>
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">{sg.desc}</p>
                        <div className="ide-shell text-xs p-3 mb-3 whitespace-pre-wrap font-mono" style={{ color: "#34D399" }}>
                          <div className="text-slate-500 text-[10px] mb-1">Zero-allocation patch</div>
                          {sg.patch}
                        </div>
                        {!sg.accepted ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => acceptSuggestion(sg.id)} className="btn-primary text-xs">
                              <CheckCheck size={12} /> Accept & Apply
                            </button>
                            <button className="btn-ai text-xs">
                              <MessageSquare size={12} /> Explain in Chat
                            </button>
                            <button onClick={() => dismissSuggestion(sg.id)} className="btn-ghost text-xs text-slate-400">
                              Dismiss
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-success text-sm font-semibold">
                            <CheckCircle2 size={14} /> Applied to codebase
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Commit Message */}
                <div className="mx-4 mb-4 p-3 bg-white border border-slate-200 rounded-md shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <GitPullRequest size={11} className="text-ai" />
                      <span className="text-ai-dark text-[10px] font-bold uppercase tracking-wider">AI Suggested Commit Message</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-700 text-[10px] transition-colors">Copy</button>
                  </div>
                  <p className="text-slate-900 text-xs font-mono">feat(cache): implement bounded channel select with context cancellation and atomic eviction counters</p>
                </div>
              </div>
            </div>

            {/* Right — AI Chat */}
            <div className="w-[264px] shrink-0 border-l border-slate-200 flex flex-col overflow-hidden bg-white">
              <div className="flex border-b border-slate-100 px-1">
                {(["AI Pair Mentor", "Radar", "Security"] as const).map((tab, i) => {
                  const key = ["ai", "radar", "security"][i] as "ai" | "radar" | "security";
                  return (
                    <button key={tab} onClick={() => setChatTab(key)}
                      className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px ${chatTab === key ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}>
                      {tab}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-ai animate-pulse" />
                    <span className="text-slate-900 text-sm font-bold">Cyan Architect</span>
                  </div>
                  <span className="text-slate-400 text-xs">Claude 3.5 Sonnet</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map(msg => (
                    <div key={msg.id}>
                      <div className="flex items-start gap-2 mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 text-white ${(msg as any).isAI ? "bg-ai-dark" : "bg-indigo-900"}`}>
                          {(msg as any).isAI ? "AI" : "AV"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-slate-900 text-xs font-semibold">{msg.author}</span>
                            <span className="text-slate-400 text-[10px]">{msg.time}</span>
                          </div>
                          <div className={`text-xs leading-relaxed p-3 rounded-md ${(msg as any).isUser ? "bg-indigo-50 border border-indigo-100 text-slate-800" : "bg-slate-50 border border-slate-200 text-slate-600"}`}>
                            <p>{msg.text}</p>
                            {(msg as any).code && (
                              <div className="ide-shell text-[10px] p-2 mt-2 whitespace-pre">{(msg as any).code}</div>
                            )}
                          </div>
                          {(msg as any).links && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {(msg as any).links.map((l: string) => (
                                <button key={l} className="dd-chip-ai text-[10px] cursor-pointer hover:bg-cyan-100 transition-colors">{l}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-900/10 focus-within:border-indigo-900/30">
                    <input
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendMessage()}
                      placeholder="Ask AI Mentor..."
                      className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    <button onClick={sendMessage} className="w-7 h-7 rounded-sm bg-indigo-900 hover:bg-indigo-950 flex items-center justify-center transition-colors shrink-0">
                      <Send size={12} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Engineer Radar</p>
                    <span className="dd-chip-indigo text-[10px]">Level 7</span>
                  </div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold text-white">AV</div>
                    <div>
                      <p className="text-slate-900 text-sm font-bold">Alex Volkov</p>
                      <p className="text-slate-500 text-xs">Distributed Systems Track</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    {[
                      { label: "Concurrency & Mutex", status: "Needs Polish", value: 72 },
                      { label: "Distributed Systems", status: "", value: 96 },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-600 text-xs">{s.label}</span>
                          {s.status && <span className="text-warning text-[10px] font-semibold">{s.status}</span>}
                        </div>
                        <div className="progress-track">
                          <div className={`${s.value >= 90 ? "progress-fill-cyan" : s.value >= 75 ? "progress-fill" : "h-full bg-warning rounded-full"}`} style={{ width: `${s.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 dd-surface rounded-md">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended Lab</p>
                    <p className="text-slate-900 text-xs font-semibold">Lock-Free Ring Buffers & Atomics in Go (15 min)</p>
                    <button className="btn-primary w-full justify-center mt-2 text-xs">
                      Launch Lab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
