import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FolderOpen, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck,
  Terminal, Cpu, Sparkles, Layers, Activity, GitBranch, Play
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { EXTENDED_PROJECTS } from "./ProjectsPage";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const project = EXTENDED_PROJECTS.find((p) => p.id === id) || EXTENDED_PROJECTS[0];

  const milestones = [
    { phase: "Phase 1", title: "Protocol Definition & State Machine Invariants", duration: "6 hrs", tests: "24 Unit Tests" },
    { phase: "Phase 2", title: "Lock-Free Memory Allocator & Disk WAL Ingestion", duration: "8 hrs", tests: "18 Integration Tests" },
    { phase: "Phase 3", title: "Multi-Node Clustering & Distributed Consensus", duration: "10 hrs", tests: "32 Chaos Invariants" },
    { phase: "Phase 4", title: "Production Benchmark & Telemetry Cryptographic Proof", duration: "4 hrs", tests: "P99 SLA Seal" },
  ];

  const handleStartLab = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to launch ${project.title}.`,
      });
      navigate(`/register?redirect=/projects/${project.id}`);
      return;
    }
    toast.success("Sandbox VM initialized! Redirecting to Project Workspace...");
    navigate("/project-workspace");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/projects" className="hover:text-slate-900 flex items-center gap-1 font-medium">
            <ArrowLeft size={12} /> Back to Projects
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{project.title}</span>
        </div>

        {/* Project Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck size={12} /> Cryptographic Proof Attestation
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 font-mono text-xs">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <span className="text-[10px] text-slate-400 block">{m.label}</span>
                <strong className="text-slate-900 font-bold text-sm sm:text-base">{m.value}</strong>
              </div>
            ))}
            <div>
              <span className="text-[10px] text-slate-400 block">Verification Pass</span>
              <strong className="text-emerald-700 font-bold text-sm sm:text-base">100% Deterministic</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Kernel Latency</span>
              <strong className="text-cyan-700 font-bold text-sm sm:text-base">4.1ms VM Spin</strong>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleStartLab}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <Play size={14} />
              <span>Start Project Lab Workspace</span>
            </button>
            <button
              onClick={() => {
                toast.info("Architecture specification copied to clipboard.");
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Share Spec
            </button>
          </div>
        </div>

        {/* Architectural Milestones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Capstone Implementation Phases</h2>
            <span className="text-xs font-mono text-slate-500">4 Phases • Production Harnesses</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
            {milestones.map((m) => (
              <div key={m.phase} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase">
                    {m.phase}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">{m.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                    <span>{m.duration}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{m.tests}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <GitBranch size={13} className="text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Ready to build this system?</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Launch your isolated VM environment. Submit commits directly for cryptographic skill attestations.
          </p>
          <button
            onClick={handleStartLab}
            className="mt-2 px-6 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold shadow-sm inline-flex items-center gap-2"
          >
            <span>Launch Capstone Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
