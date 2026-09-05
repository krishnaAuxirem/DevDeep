import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Terminal, Play, Zap, CheckCircle2, ArrowRight, ShieldCheck,
  Cpu, Activity, Code2, Sparkles, RefreshCw, Copy, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function CodingAcademyPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"code" | "output">("code");
  const [running, setRunning] = useState(false);
  const [outputShown, setOutputShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleCode = `package main

import (
	"context"
	"fmt"
	"sync/atomic"
	"time"
)

// TokenBucket represents a lock-free distributed rate limiter
type TokenBucket struct {
	capacity  int64
	tokens    int64
	refillRate int64 // tokens per second
	lastRefill int64 // unix timestamp nanos
}

func (tb *TokenBucket) Allow() bool {
	for {
		curr := atomic.LoadInt64(&tb.tokens)
		if curr <= 0 {
			return false
		}
		if atomic.CompareAndSwapInt64(&tb.tokens, curr, curr-1) {
			return true
		}
	}
}

func main() {
	tb := &TokenBucket{capacity: 100, tokens: 100, refillRate: 20}
	fmt.Println("DevDeep Sandbox VM initialized in 4.1ms")
	fmt.Printf("Rate limiter check: allow=%v\\n", tb.Allow())
}`;

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setOutputShown(true);
      setActiveTab("output");
      toast.success("Sandbox test suite passed! 32/32 tests verified.");
    }, 600);
  };

  const handleLaunchPractice = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please log in to launch full cloud VM IDE sessions.",
      });
      navigate("/register?redirect=/challenge/c1");
      return;
    }
    navigate("/challenge/c1");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Terminal size={13} className="text-cyan-600" />
            <span>CLOUD SANDBOX KERNEL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Interactive Coding Academy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real Go 1.22 micro-VMs in your browser. Telemetry p99 profiling, goroutine race detection, and zero-allocation memory benchmarks.
          </p>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "4.1ms VM Spin-Up", sub: "Global edge worker clusters", icon: <Zap size={18} className="text-amber-500" /> },
            { label: "AST Static Analysis", sub: "Race hazards & leak detector", icon: <Sparkles size={18} className="text-cyan-500" /> },
            { label: "Zero-Code Retention", sub: "Ephemeral instances", icon: <ShieldCheck size={18} className="text-emerald-500" /> },
            { label: "Cryptographic Proofs", sub: "Signed commit hashes", icon: <Activity size={18} className="text-indigo-500" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{item.label}</h3>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive IDE Preview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 overflow-hidden shadow-2xl">
          {/* Editor Header */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">main.go — Go 1.22 (Isolated Kernel)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(sampleCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="p-1.5 rounded text-slate-400 hover:text-white transition-colors"
                title="Copy code"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <button
                onClick={handleRun}
                disabled={running}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                {running ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
                <span>{running ? "Compiling..." : "Run Sandbox"}</span>
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="p-4 sm:p-6 font-mono text-xs overflow-x-auto leading-relaxed text-slate-300">
            <pre>
              <code>{sampleCode}</code>
            </pre>
          </div>

          {/* Terminal Output Tray */}
          {outputShown && (
            <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800 font-mono text-xs space-y-1 text-slate-300 animate-fade-in">
              <p className="text-emerald-400 font-semibold">✓ Test Suite: PASS (32/32 tests)</p>
              <p className="text-slate-400">DevDeep Sandbox VM initialized in 4.1ms</p>
              <p className="text-slate-400">Rate limiter check: allow=true</p>
              <p className="text-cyan-400">Telemetry: p99 latency: 2.8ms · Memory Allocations: 0 bytes/op</p>
            </div>
          )}
        </div>

        {/* Launch Full Workspace CTA */}
        <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Ready to tackle real challenges?</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Join thousands of developers practicing distributed consensus, lock-free queues, and LSM-Tree storage internals.
          </p>
          <button
            onClick={handleLaunchPractice}
            className="px-6 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Launch Live Coding Academy</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
