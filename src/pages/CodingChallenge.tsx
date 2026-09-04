import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight, Play, Send, Brain, CheckCircle2, Clock,
  Bookmark, BarChart3, Maximize2, X, Zap, AlertTriangle,
  RefreshCw, ChevronDown, CheckCheck, Cpu, Settings
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { CHALLENGES } from "@/constants/data";

const CHALLENGE = CHALLENGES[0];

const CODE_INITIAL = `package ratelimiter

import (
  "sync"
  "sync/atomic"
  "time"
)

// TokenBucket orchestrates high-throughput burst rate governance
type TokenBucket struct {
  capacity     int64
  tokens       int64
  refillRate   float64 // tokens per second
  lastRefillNs int64
  mu           sync.Mutex
}

func NewTokenBucket(cap int64, rate float64) *TokenBucket {
  return &TokenBucket{
    capacity:     cap,
    tokens:       cap,
    refillRate:   rate,
    lastRefillNs: time.Now().UnixNano(),
  }
}

// Allow evaluates and consumes tokens in atomic time window
func (tb *TokenBucket) Allow(tokens int64) bool {
  now := time.Now().UnixNano()
  tb.mu.Lock()
  defer tb.mu.Unlock()

  // Replenish elapsed tokens
  elapsedSec := float64(now-tb.lastRefillNs) / 1e9
  delta := int64(elapsedSec * tb.refillRate)
  if delta > 0 {
    tb.tokens = min(tb.capacity, tb.tokens+delta)
    tb.lastRefillNs = now
  }

  if tb.tokens >= tokens {
    tb.tokens -= tokens
    return true
  }
  return false
}

func min(a, b int64) int64 {
  if a < b { return a }
  return b
}`;

const TEST_CASES = [
  { id: 1, name: "Case 1", time: "2.1ms", status: "pass" },
  { id: 2, name: "Case 2", time: "0.8ms", status: "pass" },
  { id: 3, name: "Case 3", time: "2.4ms", status: "pass" },
  { id: 4, name: "Case 4", time: "0.4ms", status: "pass" },
];

const LATENCY_BARS = [40, 55, 38, 62, 45, 72, 50, 44, 58, 36, 48, 52, 41, 47, 53, 39, 61, 44, 57, 43];

export default function CodingChallenge() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"description" | "design" | "hints" | "submissions" | "benchmarks">("description");
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiDismissed, setAiDismissed] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1800);
  };

  const handleSubmit = () => {
    setRunning(true);
    setTimeout(() => { setRunning(false); setSubmitted(true); }, 2000);
  };

  const difficultyColor = CHALLENGE.difficulty === "Hard"
    ? "bg-rose-50 text-rose-700 border-rose-200"
    : CHALLENGE.difficulty === "Expert"
    ? "bg-purple-50 text-purple-700 border-purple-200"
    : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Challenge top bar */}
        <div className="h-11 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400">
            <button onClick={() => navigate("/dashboard")} className="hover:text-slate-700 transition-colors">Practice</button>
            <ChevronRight size={12} />
            <button className="hover:text-slate-700 transition-colors">Coding Academy</button>
            <ChevronRight size={12} />
            <span className="text-eblue-600 font-semibold">Distributed Systems</span>
          </nav>
          <span className={`dd-chip border text-[10px] ${difficultyColor}`}>{CHALLENGE.difficulty}</span>
          <span className="text-slate-400 text-xs">· {CHALLENGE.points} pts</span>
          <span className="text-slate-400 text-xs">· {CHALLENGE.acceptance}% acceptance</span>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>Sandbox Ready · 0.8ms</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">Autosaved 2s ago</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-sm">
              <span className="text-xs text-slate-900 font-mono font-semibold">Go 1.22</span>
              <ChevronDown size={10} className="text-slate-400" />
            </div>
            <button className="btn-ai text-xs py-1.5 px-3">
              <Brain size={12} /> AI Mentor
            </button>
            <button onClick={handleRun} disabled={running} className="btn-ghost text-xs py-1.5">
              {running ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
              Run Tests
              <kbd className="text-[9px] border border-slate-200 rounded px-1 py-0.5 font-mono bg-slate-50">⌘;</kbd>
            </button>
            <button onClick={handleSubmit} disabled={running}
              className={`text-xs py-1.5 px-3 rounded-sm font-semibold flex items-center gap-1.5 transition-colors ${submitted ? "bg-success hover:bg-emerald-600 text-white" : "btn-primary"}`}>
              {submitted ? <><CheckCheck size={12} /> Submitted</> : <><Send size={12} /> Submit</>}
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel — Description */}
          <div className="w-[380px] shrink-0 border-r border-slate-200 flex flex-col overflow-hidden bg-white">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-slate-900 font-bold text-base tracking-tight">{CHALLENGE.title}</h1>
                <Bookmark size={14} className="text-slate-300 hover:text-slate-600 cursor-pointer" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CHALLENGE.tags.map(t => (
                  <span key={t} className="dd-chip-slate text-[10px]">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center border-b border-slate-100 px-2">
              {(["description", "design", "hints", "submissions", "benchmarks"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2.5 text-xs font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                >
                  {tab === "submissions" ? "Submissions (4)" : tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 text-sm text-slate-600 leading-relaxed space-y-4">
              {activeTab === "description" && (
                <>
                  <div className="dd-chip-indigo text-xs mb-2 w-fit">SYSTEM ARCHITECTURE SPEC</div>
                  <p className="text-slate-400 text-xs font-mono">RFC-7540 Compliant</p>
                  <p className="text-slate-700">
                    Design and implement a high-throughput, thread-safe <strong className="text-slate-900">Token Bucket Rate Limiter</strong> in Go. Controls the rate of outgoing/incoming network traffic to prevent API starvation and protect downstream microservices.
                  </p>
                  <p>The bucket holds up to <code className="bg-indigo-50 text-indigo-800 px-1.5 py-0.5 rounded text-xs font-mono border border-indigo-100">capacity</code> tokens and refills at <code className="bg-indigo-50 text-indigo-800 px-1.5 py-0.5 rounded text-xs font-mono border border-indigo-100">refillRate</code> tokens/second.</p>

                  <div className="dd-surface p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">GO INTERFACE CONTRACT</span>
                      <span className="dd-chip-slate text-[10px]">v1.22-strict</span>
                    </div>
                    <div className="ide-shell text-xs p-3">
                      <p><span className="syn-keyword">type</span> <span className="syn-type">RateLimiter</span> <span className="syn-keyword">interface</span> {'{'}</p>
                      <p>  <span className="syn-func">Allow</span>(tokens <span className="syn-type">int64</span>) <span className="syn-type">bool</span></p>
                      <p>  <span className="syn-func">CurrentTokens</span>() <span className="syn-type">int64</span></p>
                      <p>  <span className="syn-func">Reset</span>()</p>
                      <p>{'}'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-900 font-semibold mb-2">Execution Examples</p>
                    <div className="dd-surface p-3 space-y-3">
                      <div>
                        <p className="text-slate-900 text-xs font-semibold mb-1">Example 1: Smooth Traffic with Bursts</p>
                        <p className="text-xs font-mono text-slate-500">Input: tb := NewTokenBucket(10, 2.0); tb.Allow(5); tb.Allow(6);</p>
                        <p className="text-xs font-mono text-success mt-1">Output: [true, false]</p>
                        <p className="text-xs text-slate-500 mt-1">First request consumes 5 tokens (5 remain). Second asks for 6 — returns false.</p>
                      </div>
                    </div>
                  </div>

                  {!aiDismissed && (
                    <div className="border border-cyan-200 bg-cyan-50 rounded-md p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Zap size={12} className="text-ai" />
                          <span className="text-ai-dark text-[10px] font-bold uppercase tracking-wider">DEVDEEP AI DIAGNOSTIC</span>
                        </div>
                        <span className="dd-chip-ai text-[10px]">Atomic Refactor Available</span>
                      </div>
                      <p className="text-slate-600 text-xs">Contention hotspot detected at <code className="text-red-600 font-mono bg-red-50 px-1 rounded">tb.mu.Lock()</code>. Under continuous 10k Goroutines, this incurs lock contention overhead.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="btn-ai text-[10px] py-1 px-2">Apply Atomic CAS Refactor</button>
                        <button onClick={() => setAiDismissed(true)} className="text-slate-400 text-[10px] hover:text-slate-700">Dismiss</button>
                      </div>
                    </div>
                  )}
                </>
              )}
              {activeTab !== "description" && (
                <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                  <p className="text-sm">Content for <span className="text-slate-700 capitalize">{activeTab}</span> tab</p>
                  <p className="text-xs mt-1">Available in the full platform</p>
                </div>
              )}
            </div>
          </div>

          {/* Middle — Code Editor (IDE dark) */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#020617" }}>
            {/* File tabs */}
            <div className="h-9 flex items-center px-2 gap-1 border-b" style={{ background: "#0F172A", borderColor: "#1E293B" }}>
              {["rate_limiter.go", "rate_limiter_test.go", "config.yaml"].map((f, i) => (
                <div key={f} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono cursor-pointer transition-colors ${i === 0 ? "text-white border" : "text-slate-500 hover:text-slate-300"}`}
                  style={i === 0 ? { background: "#1E293B", borderColor: "#334155" } : {}}>
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-ai" : "bg-slate-600"}`} />
                  {f}
                  {i === 0 && <X size={10} className="text-slate-500 hover:text-slate-300 ml-1" />}
                </div>
              ))}
              <div className="flex-1" />
              <div className="flex items-center gap-2 px-2 text-[10px] text-slate-500 font-mono">
                <span>Ln 28, Col 14</span>
                <span>UTF-8</span>
                <span>Go 1.22.1</span>
                <button><Maximize2 size={12} /></button>
                <button><Settings size={12} /></button>
              </div>
            </div>

            {/* Code content */}
            <div className="flex-1 overflow-auto" style={{ background: "#020617" }}>
              <div className="flex">
                <div className="select-none text-xs font-mono leading-6 px-3 py-4 text-right min-w-[3rem] border-r" style={{ color: "#475569", borderColor: "#1E293B" }}>
                  {CODE_INITIAL.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="flex-1 text-xs font-mono leading-6 p-4 overflow-x-auto whitespace-pre" style={{ color: "#F1F5F9" }}>
                  <code dangerouslySetInnerHTML={{
                    __html: CODE_INITIAL
                      .replace(/\b(func|return|type|struct|interface|if|for|defer|go|range|var|const|package|import)\b/g, '<span class="syn-keyword">$1</span>')
                      .replace(/\b(int64|float64|bool|string|error)\b/g, '<span class="syn-type">$1</span>')
                      .replace(/"([^"]*)"/g, '<span class="syn-string">"$1"</span>')
                      .replace(/\/\/[^\n]*/g, '<span class="syn-comment">$&</span>')
                      .replace(/\b(\d+)\b/g, '<span class="syn-number">$1</span>')
                  }} />
                </pre>
              </div>
            </div>

            {/* Status bar */}
            <div className="h-6 flex items-center px-3 gap-4 text-[10px] font-mono border-t" style={{ background: "#0F172A", borderColor: "#1E293B", color: "#64748B" }}>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" />0 Errors</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning" />1 Optimization Hint</span>
              <div className="flex-1" />
              <span>Spaces: 4</span>
              <span>Tab: 4</span>
            </div>
          </div>

          {/* Right Panel — Test Runner + AI */}
          <div className="w-[272px] shrink-0 border-l border-slate-200 flex flex-col overflow-hidden bg-white">
            {/* Test Runner */}
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Play size={13} className="text-slate-700" />
                  <h3 className="text-slate-900 font-bold text-sm">Test Runner</h3>
                </div>
                <span className={`dd-chip text-[10px] ${running ? "dd-chip-pending" : "dd-chip-completed"}`}>
                  {running ? "Running..." : "4 / 4 Passed"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {TEST_CASES.map(tc => (
                  <div key={tc.id} className={`flex items-center justify-between p-2 rounded-md border ${running ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
                    <div className="flex items-center gap-1.5">
                      {running
                        ? <RefreshCw size={10} className="text-warning animate-spin" />
                        : <CheckCircle2 size={10} className="text-success" />
                      }
                      <span className="text-xs text-slate-700">{tc.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{tc.time}</span>
                  </div>
                ))}
              </div>
              <div className="dd-surface p-3 text-xs space-y-1.5">
                <p className="text-slate-900 font-semibold text-[10px] uppercase tracking-wider">ACTIVE: CASE 3</p>
                <p className="text-slate-500">Capacity: <span className="text-slate-900 font-mono">50,000</span> · Refill: <span className="text-slate-900 font-mono">1,000/s</span></p>
                <p className="text-slate-500">Expected: <span className="text-success">Passed (Zero Starvation)</span></p>
                <p className="text-slate-500">Actual: <span className="text-success">Passed (50,000 in 2.1ms)</span></p>
              </div>
            </div>

            {/* Telemetry */}
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 size={13} className="text-ai" />
                  <h3 className="text-slate-900 font-bold text-sm">Telemetry</h3>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-[9px]">p99</p>
                  <p className="text-slate-900 text-xs font-mono font-bold">142ns</p>
                </div>
              </div>
              <div className="flex items-end gap-0.5 h-12 mb-2">
                {LATENCY_BARS.map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-200 hover:bg-indigo-400 rounded-sm transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className="text-eblue-600 text-xs font-semibold">Faster than 89.4% of Go submissions</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="dd-surface p-2">
                  <p className="text-slate-400 text-[10px]">Runtime</p>
                  <p className="text-slate-900 font-bold font-mono">4.1ms</p>
                  <p className="text-success text-[10px]">Top 89.4%</p>
                </div>
                <div className="dd-surface p-2">
                  <p className="text-slate-400 text-[10px]">Memory</p>
                  <p className="text-slate-900 font-bold font-mono">8.2 MB</p>
                  <p className="text-success text-[10px]">Top 92.1%</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Lock Contention</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-success font-mono">0.04% (Minimal)</span>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <Brain size={13} className="text-ai" />
                <h3 className="text-slate-900 font-bold text-sm">Cyan AI Assistant</h3>
              </div>
              <div className="space-y-2 mb-3">
                {[
                  { label: "Explain Complexity", value: "O(1)" },
                  { label: "Race Detector", value: "0 Races" },
                  { label: "Synthesize Edge Cases", value: "+3 Tests" },
                ].map(item => (
                  <button key={item.label} className="w-full flex items-center justify-between p-2.5 dd-surface hover:border-slate-300 transition-colors text-xs rounded-md">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="text-ai-dark font-mono">{item.value}</span>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-md text-xs text-slate-600 italic leading-relaxed">
                "Your implementation avoids race conditions, but the mutex bottleneck will throttle beyond 100k req/s. Ready for a lock-free CAS solution?"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
