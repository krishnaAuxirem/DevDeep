import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap, ChevronRight, Code2, Brain, GitPullRequest, Trophy,
  Shield, TrendingUp, Star, CheckCircle2, ChevronDown,
  ArrowRight, BarChart3, BookOpen, Award, Briefcase, Play, Menu, X
} from "lucide-react";
import { PRICING_PLANS, MENTORS, CHALLENGES, LEARNING_PATHS } from "@/constants/data";
import heroImg from "@/assets/hero-bg.jpg";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { toast } from "sonner";

const FEATURES = [
  {
    icon: <Brain size={22} className="text-ai" />,
    title: "AI Developer Mentor",
    desc: "Personalized AI that detects bottleneck patterns, generates targeted micro-labs, and guides your architectural decisions in real time.",
    badge: "v3.8 ACTIVE", badgeClass: "dd-chip-ai",
  },
  {
    icon: <Code2 size={22} className="text-eblue-600" />,
    title: "Production-Grade IDE",
    desc: "Browser sandbox with Go 1.22 runtime, real test execution, telemetry charts, and live p99 latency benchmarks.",
    badge: "Sandbox VM", badgeClass: "dd-chip-blue",
  },
  {
    icon: <GitPullRequest size={22} className="text-purple-600" />,
    title: "AI Code Review Studio",
    desc: "PR-style diff viewer with AI pair architect, inline suggestions, race hazard detection, and auto-refactors.",
    badge: "Pair Architect", badgeClass: "dd-chip-purple",
  },
  {
    icon: <Shield size={22} className="text-success" />,
    title: "Verified Project Portfolio",
    desc: "Cryptographically verified production projects with live cluster benchmarks reviewed by partner companies.",
    badge: "On-chain Proof", badgeClass: "dd-chip-completed",
  },
  {
    icon: <BarChart3 size={22} className="text-warning" />,
    title: "Career Radar & Matching",
    desc: "Real-time market readiness index, compensation benchmarks, and direct connection to FAANG engineering leads.",
    badge: "Partner Active", badgeClass: "dd-chip-pending",
  },
  {
    icon: <BookOpen size={22} className="text-indigo-700" />,
    title: "Structured Learning Paths",
    desc: "Expert-curated curriculum spanning distributed systems, concurrency primitives, storage engines, and cloud security.",
    badge: "12 Tracks", badgeClass: "dd-chip-indigo",
  },
];

const STATS = [
  { label: "Engineers enrolled", value: "38,400+" },
  { label: "Challenges solved", value: "2.1M+" },
  { label: "Partner companies", value: "140+" },
  { label: "Avg. salary increase", value: "43%" },
];

const FAQS = [
  {
    q: "What makes DevDeep different from LeetCode or HackerRank?",
    a: "DevDeep focuses on production-grade engineering — not just algorithmic puzzles. You build real distributed systems, get AI-powered code reviews with race hazard detection, and earn cryptographically verified credentials.",
  },
  {
    q: "Is the coding sandbox running real Go code?",
    a: "Yes. Our sandbox runs a real Go 1.22 VM with production-equivalent CPU/memory constraints. You get actual p99 latency telemetry, real goroutine analysis, and benchmark comparisons.",
  },
  {
    q: "How does the AI Mentor know what to recommend?",
    a: "The AI Mentor analyzes your commit history, challenge submissions, code review patterns, and test results to build a continuous model of your skill gaps.",
  },
  {
    q: "Can I use my DevDeep portfolio for job applications?",
    a: "Absolutely. Your verified portfolio is published to a custom domain with cryptographic proofs. Partner companies actively scout high-performing profiles.",
  },
  {
    q: "What programming languages are supported?",
    a: "Tier 1 support for Go and Rust with full telemetry. TypeScript, Python, and Java in Tier 2. Adding C++ and Zig in Q3.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Global Navigation (logged-out) */}
      <PublicNavbar />

      {/* Hero */}
      <section className="relative pt-14 min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(248,250,252,0.4) 0%, rgba(248,250,252,0.85) 60%, rgba(248,250,252,1) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(49,46,129,0.06) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(49,46,129,0.035) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="dd-chip-ai text-xs">AI-Powered Platform</span>
              <span className="dd-chip-indigo text-xs">v3.8</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-none mb-6 text-slate-900">
              The Platform for
              <br />
              <span className="text-indigo-900">Elite Engineers</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
              Master distributed systems, concurrency primitives, and production engineering with AI-powered code review, real sandbox benchmarks, and cryptographically verified credentials.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <button onClick={() => navigate("/register")} className="btn-primary px-6 py-3 text-base">
                <Play size={16} /> Start Learning Free
              </button>
              <button onClick={() => navigate("/challenge/c1")} className="btn-ghost px-6 py-3 text-base">
                <Code2 size={16} /> Try a Challenge
              </button>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-8">
              {STATS.slice(0, 2).map(s => (
                <div key={s.label}>
                  <span className="text-slate-900 font-bold text-xl">{s.value}</span>
                  <span className="text-slate-400 ml-1.5 text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card — IDE preview */}
          <div className="hidden lg:block animate-slide-in-right">
            <div className="dd-card shadow-indigo rounded-xl overflow-hidden border-slate-200">
              {/* Card header — light */}
              <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-ai animate-pulse" />
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Curriculum · Module 8 of 12</span>
                </div>
                <h3 className="text-slate-900 font-bold text-xl tracking-tight mb-1">Distributed Systems & High-Performance Go</h3>
                <p className="text-slate-500 text-sm">Checkpoint: <span className="text-ai-dark font-medium">Raft Consensus Protocol & Leader Election</span></p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 progress-track h-2">
                    <div className="progress-fill" style={{ width: "68%" }} />
                  </div>
                  <span className="text-slate-700 text-xs font-bold">68%</span>
                </div>
              </div>
              {/* IDE dark panel */}
              <div className="ide-shell rounded-none border-0 p-4 text-xs leading-6" style={{ maxHeight: 200, overflow: "hidden" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
                  <span className="text-slate-500 text-[10px] font-mono ml-auto">consensus_raft.go · Go 1.22</span>
                </div>
                <p><span className="syn-keyword">func</span> <span className="syn-func">(rf *Raft)</span> <span className="syn-func">startElection</span>() {'{'}</p>
                <p>  rf.mu.<span className="syn-func">Lock</span>()</p>
                <p>  <span className="syn-keyword">defer</span> rf.mu.<span className="syn-func">Unlock</span>()</p>
                <p>  rf.currentTerm++</p>
                <p>  rf.state = <span className="syn-type">StateCandidate</span></p>
                <p>  rf.votedFor = rf.me</p>
                <p className="syn-comment">  {"// Broadcast RequestVoteArgs to peers"}</p>
              </div>
              {/* Card footer */}
              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button onClick={() => navigate("/register")} className="btn-primary text-xs py-1.5">
                  <Play size={12} /> Resume Sandbox
                </button>
                <button onClick={() => navigate("/challenge/c1")} className="btn-ghost text-xs py-1.5">Open Editor</button>
                <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
                  <span>Also enrolled:</span>
                  <span className="text-ai-dark font-mono">Full-Stack TS</span>
                  <span className="text-slate-700 font-bold">45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-slate-900 font-bold text-3xl tracking-tight">{s.value}</p>
              <p className="text-slate-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-ai-dark text-sm font-semibold uppercase tracking-widest mb-3">Growth Ecosystem</p>
          <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Every tool to reach Staff+</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">A tightly integrated platform — not a collection of disconnected tools. Every feature feeds your growth graph.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="dd-card-hover p-5 group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {f.icon}
                </div>
                <span className={`dd-chip text-[10px] ${f.badgeClass}`}>{f.badge}</span>
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-2 tracking-tight group-hover:text-indigo-900 transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-ai-dark text-xs font-semibold uppercase tracking-widest mb-1">Curriculum</p>
            <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Structured Learning Paths</h2>
          </div>
          <button onClick={() => navigate("/learning")} className="btn-ghost">View All <ChevronRight size={14} /></button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEARNING_PATHS.map(lp => (
            <div key={lp.id} onClick={() => navigate("/dashboard")} className="dd-card-hover p-5 cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <span className={`dd-chip text-[10px] ${lp.difficulty === "Expert" ? "dd-chip-purple" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>{lp.difficulty}</span>
                <span className="dd-chip-slate text-[10px]">{lp.category}</span>
              </div>
              <h3 className="text-slate-900 font-semibold text-sm leading-snug mb-2 tracking-tight group-hover:text-indigo-900 transition-colors">{lp.title}</h3>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-2">{lp.description}</p>
              <div className="progress-track h-1.5 mb-2">
                <div className="progress-fill" style={{ width: `${lp.progress}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{lp.currentModule}/{lp.totalModules} modules</span>
                <span className="text-indigo-900 font-semibold">{lp.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-ai-dark text-xs font-semibold uppercase tracking-widest mb-1">Practice</p>
            <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Real-World Challenges</h2>
          </div>
          <button onClick={() => navigate("/challenges")} className="btn-ghost">All Challenges <ChevronRight size={14} /></button>
        </div>
        <div className="dd-card overflow-hidden">
          <div className="divide-y divide-slate-100">
            {CHALLENGES.map((c, i) => (
              <div
                key={c.id}
                onClick={() => navigate(`/challenge/${c.id}`)}
                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <span className="text-slate-400 text-sm font-mono w-5 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-semibold group-hover:text-indigo-900 transition-colors truncate tracking-tight">{c.title}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {c.tags.slice(0, 3).map(t => (
                      <span key={t} className="dd-chip-slate text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-400 text-xs hidden md:block">{c.acceptance}% acceptance</span>
                  <span className={`dd-chip text-xs ${c.difficulty === "Easy" ? "dd-chip-completed" : c.difficulty === "Medium" ? "dd-chip-pending" : c.difficulty === "Hard" ? "bg-rose-50 text-rose-700 border border-rose-200" : "dd-chip-purple"}`}>
                    {c.difficulty}
                  </span>
                  <span className="text-slate-900 text-xs font-mono font-bold">{c.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="text-center mb-10">
          <p className="text-ai-dark text-xs font-semibold uppercase tracking-widest mb-2">1:1 Sessions</p>
          <h2 className="text-slate-900 text-3xl font-bold tracking-tight mb-3">Learn from Industry Leaders</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">Staff engineers and principal architects from Meta, Cloudflare, Stripe, and Datadog mentor you directly.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {MENTORS.map(m => (
            <div key={m.id} className="dd-card-hover p-5 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                {m.avatar}
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <p className="text-slate-900 font-bold tracking-tight">{m.name}</p>
                {m.available && <div className="w-2 h-2 rounded-full bg-success" />}
              </div>
              <p className="text-slate-500 text-sm">{m.title}</p>
              <p className="text-eblue-600 text-sm font-semibold mb-3">@ {m.company}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {m.specialties.map(s => (
                  <span key={s} className="dd-chip-slate text-[10px]">{s}</span>
                ))}
              </div>
              {m.nextSession && <p className="text-slate-400 text-xs mb-3">📅 {m.nextSession}</p>}
              <button
                onClick={() => {
                  toast.success(`Booking session with ${m.name}`, {
                    description: "Navigating to verified staff mentor reservation scheduler.",
                  });
                  navigate("/mentors");
                }}
                className="btn-ghost w-full text-xs justify-center"
              >
                {m.available ? "Book 1:1 Review (₹4,800)" : "Join Waitlist"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing with INR Toggle */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200" id="pricing">
        <div className="text-center mb-10">
          <p className="text-ai-dark text-xs font-semibold uppercase tracking-widest mb-2 font-mono">INR Billing</p>
          <h2 className="text-slate-900 text-3xl font-bold tracking-tight mb-3">Invest in Your Engineering Career</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mb-6">Transparent pricing with zero hidden fees. Cancel anytime with 1-click self-service.</p>

          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!isYearly ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-indigo-900 p-0.5 transition-colors relative focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow ${isYearly ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${isYearly ? "text-slate-900" : "text-slate-400"}`}>
              <span>Yearly</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">20% OFF</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="dd-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-slate-500 text-xs font-mono font-bold uppercase mb-1">Explorer</p>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Developer Free</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-slate-900 font-bold text-4xl tracking-tight font-mono">₹0</span>
                <span className="text-slate-400 text-xs">/ forever</span>
              </div>
              <p className="text-slate-500 text-xs mb-5 leading-relaxed">Start your journey with 50 sandboxes/month and core algorithm tracks.</p>
              <button
                onClick={() => navigate("/register")}
                className="btn-ghost w-full justify-center mb-5 font-semibold text-xs"
              >
                Start Free →
              </button>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> 50 cloud sandboxes / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> 120 Algorithmic challenges</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> Community discussions</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> Public verified profile</li>
              </ul>
            </div>
          </div>

          {/* Pro Tier (Most Popular) */}
          <div className="rounded-xl p-6 relative gradient-border shadow-indigo flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="dd-chip text-xs bg-indigo-900 text-white border-indigo-900">
                MOST POPULAR
              </span>
            </div>
            <div>
              <p className="text-indigo-700 text-xs font-mono font-bold uppercase mb-1">DEVDEEP PRO</p>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Pro Engineer</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-indigo-950 font-bold text-4xl tracking-tight font-mono">
                  {isYearly ? "₹1,199" : "₹1,499"}
                </span>
                <span className="text-slate-400 text-xs">/ month</span>
              </div>
              <p className="text-slate-500 text-xs mb-5 leading-relaxed">Complete access to production architecture labs, unlimited AST reviews, and certs.</p>
              <button
                onClick={() => navigate("/register")}
                className="btn-primary w-full justify-center mb-5 font-semibold text-xs"
              >
                Upgrade to Pro →
              </button>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-600 shrink-0" /> Unlimited AI Mentor v3.8 sessions</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-600 shrink-0" /> All 42 Production Labs & Repos</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-600 shrink-0" /> Cryptographic Skill Proofs</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-600 shrink-0" /> Full-speed container boot (4.1ms)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-600 shrink-0" /> Career radar & job matching</li>
              </ul>
            </div>
          </div>

          {/* Staff Tier */}
          <div className="dd-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-slate-500 text-xs font-mono font-bold uppercase mb-1">CAREER COHORT</p>
              <h3 className="text-slate-900 font-bold text-lg mb-2">Staff • 1:1</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-slate-900 font-bold text-4xl tracking-tight font-mono">
                  {isYearly ? "₹3,199" : "₹3,999"}
                </span>
                <span className="text-slate-400 text-xs">/ month</span>
              </div>
              <p className="text-slate-500 text-xs mb-5 leading-relaxed">Direct human architectural mentorship + guaranteed fast-tracked job referrals.</p>
              <button
                onClick={() => navigate("/register")}
                className="btn-ghost w-full justify-center mb-5 font-semibold text-xs"
              >
                Start Staff Cohort →
              </button>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> 2x 1:1 Staff Mentor Calls / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> Verified Scout Scorecard</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success shrink-0" /> Priority Tier 1 Referral Lane</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="text-center mb-10">
          <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="dd-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-slate-900 font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 border-t border-slate-100">
                  <p className="text-slate-600 text-sm leading-relaxed pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200 text-center">
        <div className="gradient-border rounded-xl p-12 bg-white shadow-indigo inline-block w-full max-w-2xl mx-auto">
          <div className="dd-chip-ai mb-4 mx-auto w-fit">3 Partner companies scouting profiles now</div>
          <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Ready to reach Staff+?</h2>
          <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto">Join 38,000+ engineers building production-grade systems with AI-powered mentorship.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button onClick={() => navigate("/register")} className="btn-primary px-8 py-3 text-base">
              <Zap size={16} /> Start Free Today
            </button>
            <button onClick={() => navigate("/profile")} className="btn-ghost px-6 py-3 text-base">
              View Sample Profile <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
