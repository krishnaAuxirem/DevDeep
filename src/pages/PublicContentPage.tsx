import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Zap, ArrowRight, CheckCircle2, Shield,
  BookOpen, Code2, Users, Calendar, Briefcase,
  Search, ExternalLink, Sparkles, Terminal, FileText
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { MENTORS, PRICING_PLANS } from "@/constants/data";
import { toast } from "sonner";

interface PublicContentProps {
  pageType?:
    | "pricing"
    | "mentors"
    | "community"
    | "jobs"
    | "documentation"
    | "system-architecture"
    | "about"
    | "security"
    | "terms"
    | "privacy"
    | "sitemap"
    | "generic";
}

export default function PublicContentPage({ pageType }: PublicContentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const path = location.pathname.replace(/^\//, "");
  const activeType = pageType || (path as any) || "generic";

  const handleAction = (label: string, route?: string) => {
    if (route) {
      navigate(route);
      return;
    }
    toast.info(`${label}`, {
      description: "Action verified in the DevDeep production telemetry network.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 animate-fade-in">
        {/* ====================================================
            1. PRICING PAGE (All INR ₹)
           ==================================================== */}
        {(activeType === "pricing" || path === "pricing") && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                <span>TRANSPARENT DEVELOPER TIERS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Invest in Your Engineering Trajectory
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Straightforward localized INR billing. Zero foreign markup. Cancel anytime with 1-click self-service.
              </p>

              {/* Monthly / Yearly Switch */}
              <div className="flex items-center justify-center gap-3 pt-4">
                <span className={`text-sm font-semibold ${!isYearly ? "text-slate-900" : "text-slate-400"}`}>
                  Monthly Billing
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="w-12 h-6 rounded-full bg-indigo-900 p-0.5 transition-colors relative focus:outline-none"
                  aria-label="Toggle annual billing"
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      isYearly ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className={`text-sm font-semibold flex items-center gap-1.5 ${isYearly ? "text-slate-900" : "text-slate-400"}`}>
                  <span>Yearly</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    20% OFF
                  </span>
                </span>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {/* Explorer / Free Tier */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">FREE TIER</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">Developer Free</h2>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">₹0</span>
                    <span className="text-xs text-slate-400">/ forever</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Fundamental algorithm sandboxes and community open-source labs.
                  </p>
                  <ul className="space-y-3 pt-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>50 cloud sandboxes / month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>120 Algorithmic challenges</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>Community discussion boards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>Public verifiable profile</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full mt-8 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors"
                >
                  Start Free
                </button>
              </div>

              {/* Pro Engineer Tier (Most Popular) */}
              <div className="bg-white rounded-2xl border-2 border-indigo-600 p-7 shadow-xl flex flex-col justify-between relative hover:scale-[1.01] transition-all">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-900 text-white font-mono text-[11px] font-bold shadow-sm">
                  MOST POPULAR
                </div>
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-700 uppercase">DEVDEEP PRO</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">Pro Engineer</h2>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-indigo-950 font-mono">
                      {isYearly ? "₹1,199" : "₹1,499"}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Full access to production architecture labs, unlimited AST reviews, and verifiable certs.
                  </p>
                  <ul className="space-y-3 pt-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Unlimited AI Mentor v3.8 sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                      <span>All 42 Production Labs & S3 repos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                      <span>Cryptographic Skill Attestations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                      <span>Full-speed container boot (4.1ms)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                      <span>Partner radar scout matchmaking</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full mt-8 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Upgrade to Pro</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Staff & Career Cohort Tier */}
              <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">CAREER FAST-TRACK</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">Staff • 1:1 Mentorship</h2>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900 font-mono">
                      {isYearly ? "₹3,199" : "₹3,999"}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Direct human architectural mentorship + guaranteed fast-tracked job referrals.
                  </p>
                  <ul className="space-y-3 pt-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Everything in Pro tier</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>2x 1:1 Staff Mentor Calls / month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>Verified Scout Scorecard Dossier</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>Tier-1 Partner Referral Lane (₹40L - ₹95L)</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full mt-8 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-950 text-white font-semibold text-xs transition-colors"
                >
                  Start Staff Cohort
                </button>
              </div>
            </div>

            {/* Payment Trust Footer */}
            <div className="text-center text-xs text-slate-400 pt-4 space-y-1">
              <p>UPI (GPay, PhonePe, Paytm), RuPay, NetBanking, Credit Cards supported natively with GST invoices.</p>
              <p>30-day money back guarantee • 100% secure Indian payment processing.</p>
            </div>
          </div>
        )}

        {/* ====================================================
            2. MENTORS DIRECTORY
           ==================================================== */}
        {(activeType === "mentors" || path === "mentors") && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
                  VERIFIED DIRECTORY
                </span>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
                  Staff & Principal Mentors
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Book 1:1 architectural reviews and mock system screens with verifiable leaders.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Direct INR Billing • ₹4,500/hr Average
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MENTORS.map((m) => (
                <div key={m.id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-900 text-white font-bold text-lg flex items-center justify-center shrink-0">
                        {m.avatar}
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-bold text-base text-slate-900 truncate">{m.name}</h2>
                        <p className="text-xs text-indigo-600 font-medium truncate">{m.role} • {m.company}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Specializes in distributed transaction guarantees, ledger double-entry systems, and high-volume idempotent pipelines.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.specialties.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <span className="text-amber-600 font-semibold">★ 4.98 (120+ reviews)</span>
                      <span>Bengaluru / Remote</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm font-mono">₹4,800</span>
                      <span className="text-[11px] text-slate-400"> / 45 min</span>
                    </div>
                    <button
                      onClick={() => handleAction(`Booking session with ${m.name}`)}
                      className="px-4 py-1.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold transition-colors"
                    >
                      Book 1:1 Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            3. COMMUNITY / DISCUSSIONS
           ==================================================== */}
        {(activeType === "community" || path === "community" || path === "study-groups" || path === "showcase" || path === "hackathons" || path === "events") && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
                  PEER COLLABORATION
                </span>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
                  Developer Community & Showcases
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Connect with 38,000+ engineers building distributed systems, hackathons, and RFC discussions.
                </p>
              </div>
              <button
                onClick={() => handleAction("Create Discussion Thread")}
                className="px-4 py-2 bg-indigo-900 text-white text-xs font-semibold rounded-lg hover:bg-indigo-950 transition-colors shrink-0"
              >
                + New Discussion Thread
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {["All", "Architecture RFCs", "Hackathons 2026", "Study Groups", "Project Showcase"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-indigo-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Discussions Stream */}
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
              {[
                { title: "RFC #84: Zero-Allocation Go Channel Multiplexer in High-Throughput Ingestion", author: "Alex Volkov", replies: 28, tag: "Architecture", time: "2h ago" },
                { title: "Distributed Consensus Hackathon 2026: Build a Raft-backed Key-Value Store", author: "Priya Sharma", replies: 64, tag: "Hackathons", time: "5h ago" },
                { title: "PostgreSQL 17 B-Tree Index Deduplication Benchmarks under 50k Concurrent Writes", author: "Devendra K.", replies: 19, tag: "Databases", time: "1d ago" },
                { title: "Study Group: Concurrency & Lock-Free Queue Primitives in Rust", author: "Marcus Thorne", replies: 42, tag: "Study Groups", time: "2d ago" },
              ].map((item, i) => (
                <div key={i} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-mono text-[10px] rounded font-semibold">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-400">by {item.author}</span>
                      <span className="text-xs text-slate-400">• {item.time}</span>
                    </div>
                    <h2
                      onClick={() => handleAction(`Viewing discussion: ${item.title}`)}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-900 cursor-pointer truncate"
                    >
                      {item.title}
                    </h2>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-700">{item.replies} replies</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================
            4. DOCUMENTATION / SYSTEM ARCHITECTURE / RESOURCES
           ==================================================== */}
        {(activeType === "documentation" || activeType === "system-architecture" || path === "documentation" || path === "system-architecture" || path === "blog" || path === "open-source" || path === "api") && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
                ENGINEERING SPECIFICATIONS
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
                System Architecture & Documentation
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Comprehensive technical guides for the DevDeep platform, AST code evaluator, and ephemeral sandbox kernels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Terminal size={20} />
                </div>
                <h2 className="font-bold text-base text-slate-900">Cloud Sandbox VM Architecture</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  How DevDeep provisions isolated micro-VMs in 4.1ms with Go 1.22, memory profiling pprof, and deterministic test harnesses.
                </p>
                <button onClick={() => handleAction("Reading Sandbox Docs")} className="text-xs font-bold text-indigo-700 hover:underline">
                  Read Architecture Spec →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h2 className="font-bold text-base text-slate-900">AST Review Engine Invariants</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Deep-dive into our abstract syntax tree parsing rules, race-hazard detectors, and automated patch synthesis algorithms.
                </p>
                <button onClick={() => handleAction("Reading AST Spec")} className="text-xs font-bold text-cyan-700 hover:underline">
                  Read AST Documentation →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <h2 className="font-bold text-base text-slate-900">Cryptographic Portfolio Proofs</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  On-chain commit Merkle tree verification specs, benchmark cryptographic seals, and hiring partner verification API.
                </p>
                <button onClick={() => handleAction("Reading Proofs Spec")} className="text-xs font-bold text-emerald-700 hover:underline">
                  Read Verification Spec →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            5. LEGAL & COMPANY (About, Careers, Security, Terms, Privacy, Sitemap)
           ==================================================== */}
        {(activeType === "about" || activeType === "security" || activeType === "terms" || activeType === "privacy" || activeType === "sitemap" || path === "about" || path === "careers" || path === "security" || path === "terms" || path === "privacy" || path === "sitemap") && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-indigo-700 uppercase">DEVDEEP PLATFORM GOVERNANCE</span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1 capitalize">
                {path.replace("-", " ") || "Company & Legal"}
              </h1>
              <p className="text-xs text-slate-400 mt-1">Last revised: January 2026 • Verified for ISO/IEC 27001 & GDPR compliance</p>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                Welcome to DevDeep. Engineered for deep work, our platform adheres to strict engineering precision, developer data sovereignty, and zero-compromise security protocols.
              </p>
              <h2 className="font-bold text-base text-slate-900 pt-2">1. Zero Code Retention Guarantee</h2>
              <p>
                Proprietary code authored within DevDeep sandboxes or analyzed via the AI Mentor AST Inspector is never utilized to train generalized models. All inference operations occur within ephemeral worker micro-VMs that terminate automatically upon session closure.
              </p>
              <h2 className="font-bold text-base text-slate-900 pt-2">2. Cryptographic Proof Attestation</h2>
              <p>
                Developer benchmarks, code challenge solutions, and skill index ratings are cryptographically signed. Authenticated partner employers verify competency scorecards directly via tamper-proof verification APIs.
              </p>
              <h2 className="font-bold text-base text-slate-900 pt-2">3. INR Billing & Compliance</h2>
              <p>
                All transactions are processed through RBI-compliant Indian payment gateways with native UPI, RuPay, and corporate NetBanking support. GST invoices are issued instantaneously.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link to="/" className="text-xs font-bold text-indigo-700 hover:underline">
                ← Back to Overview
              </Link>
              <button
                onClick={() => handleAction("Download Legal PDF Documentation")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
              >
                Download PDF Policy
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
