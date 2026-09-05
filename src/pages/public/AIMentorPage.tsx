import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain, Sparkles, ArrowRight, CheckCircle2, ShieldCheck,
  Terminal, GitPullRequest, Target, Zap, AlertTriangle, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function AIMentorPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"diff" | "model" | "labs">("diff");

  const handleStartDiagnosis = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please log in to start your personalized AI skill diagnosis.",
      });
      navigate("/register?redirect=/mentor");
      return;
    }
    navigate("/mentor");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Brain size={13} className="text-cyan-600" />
            <span>DEVDEEP AI ENGINE v3.8</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            A Persistent Cognitive Model of Your Code
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Not a generic prompt wrapper. DevDeep AI constructs an evolving abstract syntax tree (AST) graph of your engineering habits, concurrency race risks, and architectural blindspots.
          </p>
          <div className="pt-2">
            <button
              onClick={handleStartDiagnosis}
              className="px-6 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <span>Start Free Skill Diagnosis</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <GitPullRequest size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">AST Code Review Engine</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detects race hazards, goroutine leaks, and unbuffered channel deadlocks before code ever touches production.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Target size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Adaptive Micro-Labs</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              When a mistake is identified, the engine immediately synthesizes a targeted 4-minute interactive drill to rewrite that exact pattern.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero Code Retention</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your proprietary code runs within ephemeral RAM micro-VMs. We never use developer submissions to train foundational models.
            </p>
          </div>
        </div>

        {/* Live AST Diff Simulation Window */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-200 overflow-hidden shadow-2xl max-w-4xl mx-auto w-full">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">AST Inspector — Goroutine Race Analysis</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              RACE CONDITION DETECTED
            </span>
          </div>

          <div className="p-6 font-mono text-xs space-y-2 leading-relaxed">
            <p className="text-slate-500">// Vulnerable pattern: Loop variable capture in concurrent goroutine</p>
            <p className="text-rose-400 bg-rose-950/40 p-1.5 rounded border border-rose-900">
              - for _, task := range tasks &#123; go process(task) &#125;
            </p>
            <p className="text-emerald-400 bg-emerald-950/40 p-1.5 rounded border border-emerald-900">
              + for _, task := range tasks &#123; go process(task) // Go 1.22 scoped semantics &#125;
            </p>
            <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 text-xs space-y-1">
              <p className="text-cyan-300 font-bold">AI Diagnosis:</p>
              <p className="text-slate-400">
                In Go &lt; 1.22, loop variable <code>task</code> was reused across iterations. DevDeep recommends explicit parameter passing or upgrading runtime toolchain to Go 1.22+.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 bg-indigo-900 text-white rounded-2xl space-y-4 max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold">Get Your Free Engineering Diagnostic</h2>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-lg mx-auto">
            Scan your coding patterns against 50+ production failure modes. Receive actionable micro-labs tailored specifically to your weak points.
          </p>
          <button
            onClick={handleStartDiagnosis}
            className="px-7 py-3 rounded-lg bg-white text-indigo-950 hover:bg-slate-100 font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
          >
            <span>Launch AI Diagnosis Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
