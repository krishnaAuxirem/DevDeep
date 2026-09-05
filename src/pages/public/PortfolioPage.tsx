import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, ShieldCheck, ArrowRight, CheckCircle2, Award,
  Terminal, Activity, Sparkles, ExternalLink, Globe, Lock
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { CURRENT_USER } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function PortfolioPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBuildPortfolio = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please register or log in to create and publish your verifiable engineering portfolio.",
      });
      navigate("/register?redirect=/profile");
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Award size={13} className="text-indigo-600" />
            <span>CRYPTOGRAPHIC PORTFOLIO ATTESTATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Show Code, Not Just Credentials
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Replace resume fluff with cryptographically signed commit Merkle proofs, verified p99 latency benchmarks, and Staff-level architectural capstones.
          </p>
          <div className="pt-2">
            <button
              onClick={handleBuildPortfolio}
              className="px-6 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
            >
              <span>Build Your Verifiable Portfolio</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 3 Verification Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Signed Commit Hashes</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every solved challenge and production capstone is signed by the DevDeep edge worker VM that executed the deterministic test harness.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Live Benchmarking Proofs</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Employers inspect your actual allocations, goroutine throughput, and p99 millisecond latency curves under multi-threaded load.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Globe size={20} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Partner Radar Scout Dossier</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hiring managers from Stripe, Razorpay, and Swiggy discover and interview top-scoring developers directly through verified talent dossiers.
            </p>
          </div>
        </div>

        {/* Live Public Profile Showcase Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 tracking-wider">
              SAMPLE VERIFIED ENGINEER PROFILE
            </span>
            <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} /> FAANG Calibrated Scorecard
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-900 text-white font-bold text-lg flex items-center justify-center shrink-0">
                {CURRENT_USER.avatar}
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">{CURRENT_USER.name}</h3>
                <p className="text-xs text-indigo-700 font-medium">{CURRENT_USER.title}</p>
                <p className="text-xs text-slate-400">@{CURRENT_USER.username} • Joined {CURRENT_USER.joinedDate}</p>
              </div>
            </div>
            <div className="text-right font-mono text-xs p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">MARKET READINESS</span>
              <strong className="text-xl font-bold text-indigo-900">{CURRENT_USER.marketReadiness}%</strong>
              <span className="text-slate-400 text-[10px] block">Top 0.8% percentile</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {CURRENT_USER.bio}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Submissions</span>
              <strong className="text-slate-900 font-bold">{CURRENT_USER.submissions}</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Streak</span>
              <strong className="text-orange-600 font-bold">{CURRENT_USER.streak} Days</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Prod Deploys</span>
              <strong className="text-indigo-900 font-bold">{CURRENT_USER.productionDeploys} Verified</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 block">DevDeep Rank</span>
              <strong className="text-slate-900 font-bold">#{CURRENT_USER.rank}</strong>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="text-center p-8 bg-indigo-900 text-white rounded-2xl space-y-4 max-w-3xl mx-auto shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold">Claim Your Engineering Profile</h2>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-lg mx-auto">
            Build production projects, complete verified benchmarks, and let top tier tech companies scout your verified dossier.
          </p>
          <button
            onClick={handleBuildPortfolio}
            className="px-7 py-3 rounded-lg bg-white text-indigo-950 hover:bg-slate-100 font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
          >
            <span>Get Started Free</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
