import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Award, Calendar, Clock, IndianRupee, Users, ArrowRight,
  ShieldCheck, CheckCircle2, Sparkles, Terminal, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface Hackathon {
  id: string;
  title: string;
  prizePool: string;
  dates: string;
  status: "Active" | "Upcoming" | "Registration Open";
  participants: number;
  tags: string[];
  description: string;
  sponsors: string[];
}

const HACKATHONS: Hackathon[] = [
  {
    id: "hack-raft-2026",
    title: "Global Distributed Consensus Hackathon 2026",
    prizePool: "₹10,00,000 INR",
    dates: "October 14 – October 28, 2026",
    status: "Registration Open",
    participants: 1240,
    tags: ["Raft", "Distributed Systems", "Go", "Storage Engines"],
    description: "Build a multi-region Raft-backed key-value store capable of surviving automated chaos network splits with zero data divergence.",
    sponsors: ["Razorpay", "AWS", "Zerodha"],
  },
  {
    id: "hack-ebpf-2026",
    title: "Linux eBPF & Kernel Telemetry Cup",
    prizePool: "₹5,00,000 INR",
    dates: "November 5 – November 18, 2026",
    status: "Upcoming",
    participants: 680,
    tags: ["eBPF", "Linux", "C", "Micro-VMs"],
    description: "Implement custom kernel probes to analyze microsecond execution latency and memory safety bounds on cloud sandbox workloads.",
    sponsors: ["Postman", "DevDeep Labs"],
  },
];

export default function CommunityHackathonsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const handleRegister = (hack: Hackathon) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to register for ${hack.title}.`,
      });
      navigate(`/register?redirect=/community/hackathons`);
      return;
    }

    if (registeredIds.includes(hack.id)) {
      toast.info("Already registered for this competition.");
      return;
    }

    setRegisteredIds((prev) => [...prev, hack.id]);
    toast.success(`Registered for ${hack.title}!`, {
      description: "Starter repository and automated test benchmark credentials dispatched.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Award size={13} className="text-emerald-600" />
            <span>ANNUAL SYSTEMS BUILD COMPETITIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Developer Hackathons
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Test your systems engineering against automated chaos test suites. Compete for ₹15 Lakhs in localized INR prize pools and fast-track interview referrals.
          </p>
        </div>

        {/* Hackathons List */}
        <div className="space-y-6">
          {HACKATHONS.map((hack) => {
            const isReg = registeredIds.includes(hack.id);
            return (
              <div
                key={hack.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {hack.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                      <Calendar size={12} className="text-indigo-600" /> {hack.dates}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {hack.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hack.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-bold text-emerald-700 text-sm">
                      <IndianRupee size={14} /> {hack.prizePool}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {hack.participants} Registered Engineers
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Sponsors:</span>
                    {hack.sponsors.map((sp) => (
                      <span key={sp} className="font-semibold text-slate-700">{sp}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {hack.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleRegister(hack)}
                    disabled={isReg}
                    className={`w-full md:w-44 py-3 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      isReg
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-indigo-900 hover:bg-indigo-950 text-white active:scale-[0.98]"
                    }`}
                  >
                    <span>{isReg ? "Registered ✓" : "Register for Hackathon"}</span>
                    {!isReg && <ArrowRight size={13} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
