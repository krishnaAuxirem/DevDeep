import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, MapPin, IndianRupee, Clock, ArrowRight,
  Sparkles, CheckCircle2, ShieldCheck, Terminal, Heart
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { toast } from "sonner";

interface DevDeepJob {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  type: string;
  description: string;
}

const DEVDEEP_ROLES: DevDeepJob[] = [
  {
    id: "dd-job-1",
    title: "Staff Distributed Systems Architect",
    department: "Core Infrastructure",
    location: "Bengaluru, India / Remote",
    salary: "₹55,00,000 – ₹85,00,000 + Equity",
    type: "Full-Time",
    description: "Design multi-region consensus coordinator and deterministic chaos partition harnesses for our telemetry network.",
  },
  {
    id: "dd-job-2",
    title: "Compiler & Static Analysis Engineer (Go / AST)",
    department: "AI Mentor Engine",
    location: "Remote (India)",
    salary: "₹45,00,000 – ₹70,00,000 + Equity",
    type: "Full-Time",
    description: "Build semantic static analysis passes detecting memory leaks, goroutine races, and anti-patterns across thousands of submissions daily.",
  },
  {
    id: "dd-job-3",
    title: "Linux Micro-VM Kernel Engineer (KVM / eBPF)",
    department: "Cloud Sandboxes",
    location: "Bengaluru, India",
    salary: "₹50,00,000 – ₹75,00,000 + Equity",
    type: "Full-Time",
    description: "Optimize hypervisor memory ballooning and cold-boot times to keep edge container initialization below 4 milliseconds.",
  },
];

export default function CareersPage() {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (role: DevDeepJob) => {
    if (appliedIds.includes(role.id)) {
      toast.info("You have already applied for this opening.");
      return;
    }
    setAppliedIds((prev) => [...prev, role.id]);
    toast.success(`Application received for ${role.title}!`, {
      description: "Our engineering leadership team will review your profile within 48 hours.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Briefcase size={13} className="text-indigo-600" />
            <span>JOIN DEVDEEP ENGINEERING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Work on Hard Systems Problems
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are a small, highly technical engineering team building micro-VM hypervisors, AST static analyzers, and cryptographic proof protocols.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-sm text-slate-900">Top-Tier Localized Comp</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Competitive top 1% INR compensation with meaningful equity ownership and bi-annual performance adjustments.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-sm text-slate-900">Remote-First Culture</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Work from anywhere in India or our Bengaluru engineering lab. Async communication with zero pointless meetings.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-sm text-slate-900">High-End Tooling</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Top-of-the-line Apple Silicon workstation, home office budget, and unlimited cloud sandbox compute allocations.
            </p>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Current Openings</h2>
          <div className="space-y-4">
            {DEVDEEP_ROLES.map((role) => {
              const hasApplied = appliedIds.includes(role.id);
              return (
                <div
                  key={role.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {role.department}
                      </span>
                      <span className="text-xs font-mono text-slate-400">• {role.type}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {role.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {role.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                      <span className="font-bold text-emerald-700">{role.salary}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {role.location}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleApply(role)}
                      disabled={hasApplied}
                      className={`w-full md:w-36 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                        hasApplied
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                          : "bg-indigo-900 hover:bg-indigo-950 text-white active:scale-[0.98]"
                      }`}
                    >
                      <span>{hasApplied ? "Applied ✓" : "Apply for Role"}</span>
                      {!hasApplied && <ArrowRight size={13} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
