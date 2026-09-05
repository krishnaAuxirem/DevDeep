import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap, ShieldCheck, Users, Terminal, CheckCircle2,
  ArrowRight, Sparkles, Building2, Globe
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Zap size={13} className="text-indigo-600" />
            <span>OUR ENGINEERING MISSION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            About DevDeep
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are building the growth operating system for serious software engineers. Unifying micro-VM sandboxes, automated AST code review, and verifiable cryptographic attestations.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Why DevDeep Exists</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-xs sm:text-sm">
            <p>
              Traditional online coding platforms focus on toy LeetCode trivia that bear little resemblance to real-world distributed infrastructure. In production, code doesn't just fail because of an algorithm bug; it fails because of loop variable race conditions, goroutine leaks, unbuffered channel deadlocks, and split-brain consensus failures.
            </p>
            <p>
              DevDeep was created to bridge this chasm. We provision isolated micro-VM sandboxes in 4.1 milliseconds, providing developers with deterministic test suites, chaos network partition injectors, and an AI mentor engine that constructs an evolving cognitive model of their code quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <span className="text-2xl font-bold text-indigo-900 font-mono">38,000+</span>
              <p className="text-xs text-slate-500">Engineers practicing on DevDeep</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <span className="text-2xl font-bold text-indigo-900 font-mono">4.1ms</span>
              <p className="text-xs text-slate-500">Average sandbox spin-up latency</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <span className="text-2xl font-bold text-indigo-900 font-mono">100%</span>
              <p className="text-xs text-slate-500">Zero-code retention guarantee</p>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">Our Core Engineering Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Terminal size={18} />
              </div>
              <h3 className="font-bold text-base text-slate-900">Deterministic Evaluation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Code should run in true Linux micro-VMs with reproducible test harnesses and memory profiles, not simulated browser runtimes.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <h3 className="font-bold text-base text-slate-900">Cognitive AI Mentorship</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                AI should model your syntax patterns and teach you through targeted micro-labs, rather than spoon-feeding generic LLM completions.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="font-bold text-base text-slate-900">Verifiable Dossiers</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Skills should be proven with cryptographically signed commits and live latency benchmarks that top hiring teams can verify in seconds.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
