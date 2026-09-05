import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap, ChevronRight, Code2, Brain, GitPullRequest, Trophy,
  Shield, TrendingUp, Star, CheckCircle2, ChevronDown,
  ArrowRight, BarChart3, BookOpen, Award, Play, ChevronLeft,
  Terminal, Cpu, Layers, LayoutGrid, Database, Lock,
  Rocket, Users, Globe, Flame, Target, Sparkles,
  FileCode2, AlarmClock, Building2, Send, Plus, Minus,
  BadgeCheck, IndianRupee, MessageSquare, CircleDot, Wifi
} from "lucide-react";
import { PRICING_PLANS, MENTORS, CHALLENGES, LEARNING_PATHS } from "@/constants/data";
import heroImg from "@/assets/hero-bg.jpg";
import mentor1Img from "@/assets/mentor-1.jpg";
import mentor2Img from "@/assets/mentor-2.jpg";
import mentor3Img from "@/assets/mentor-3.jpg";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import ActivityHeatmap from "@/components/features/ActivityHeatmap";
import { toast } from "sonner";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Active Engineers", value: "38,400+", icon: <Users size={16} className="text-indigo-400" /> },
  { label: "Challenges Solved", value: "2.1M+", icon: <Zap size={16} className="text-cyan-400" /> },
  { label: "Placement Rate", value: "94%", icon: <TrendingUp size={16} className="text-emerald-400" /> },
  { label: "Tech Partners", value: "140+", icon: <Building2 size={16} className="text-amber-400" /> },
];

const HERO_SLIDES = [
  {
    id: "flashcard",
    label: "Active Recall",
    icon: <Brain size={13} />,
    title: "Active Recall Engine",
    badge: "SPACED REPETITION",
    badgeClass: "bg-cyan-900/60 text-cyan-300 border-cyan-700",
    content: (
      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <p className="text-[10px] font-mono text-slate-400 mb-2">RECALL CARD · Distributed Systems · Hard</p>
          <p className="text-white text-sm font-semibold leading-snug">In Raft consensus, what happens when a follower's log is behind the leader by more than one term?</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Log Rollback occurs", "Leader sends AppendEntries with prevLogIndex", "Election restarts", "Snapshot install triggered"].map((opt, i) => (
            <button key={i} className={`p-2.5 rounded-md text-xs text-left border transition-colors ${i === 1 ? "bg-emerald-900/40 border-emerald-600 text-emerald-300" : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500"}`}>
              {i === 1 && <CheckCircle2 size={11} className="inline mr-1 text-emerald-400" />}
              {opt}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">Retention: <span className="text-emerald-400 font-bold">92%</span></span>
          <span className="text-cyan-400 font-semibold">Next review in 4 days →</span>
        </div>
      </div>
    ),
  },
  {
    id: "sandbox",
    label: "Live Sandbox",
    icon: <Terminal size={13} />,
    title: "Cloud Micro-IDE",
    badge: "Go 1.22 · 4.1ms",
    badgeClass: "bg-indigo-900/60 text-indigo-300 border-indigo-700",
    content: (
      <div className="space-y-2">
        <div className="rounded-md bg-slate-950 border border-slate-800 p-3 font-mono text-xs leading-6">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-slate-600 ml-auto text-[10px]">main.go</span>
          </div>
          <p><span className="text-purple-400">func</span> <span className="text-blue-300">workerPool</span><span className="text-white">(ctx context.Context, n </span><span className="text-cyan-300">int</span><span className="text-white">) {'{'}</span></p>
          <p><span className="text-white">  sem := make(</span><span className="text-purple-400">chan</span> <span className="text-cyan-300">struct</span><span className="text-white">{'{'}, n)</span></p>
          <p><span className="text-slate-500">  // goroutine pool with graceful shutdown</span></p>
          <p><span className="text-white">  wg.Wait(); close(results)</span></p>
          <p><span className="text-white">{'}'}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-md bg-emerald-950 border border-emerald-800 p-2.5 text-xs">
            <p className="text-emerald-400 font-mono font-bold mb-1">✓ PASS — 32/32 tests</p>
            <p className="text-slate-400">p99: <span className="text-white font-bold">4.1ms</span> · 0 allocs/op · 0 races</p>
          </div>
          <button className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-semibold transition-colors">
            <Play size={10} className="inline mr-1" />Run
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "ai-mentor",
    label: "AI Diagnostic",
    icon: <Sparkles size={13} />,
    title: "AI Mentor Diagnostic",
    badge: "v3.8 · 99.4%",
    badgeClass: "bg-cyan-900/60 text-cyan-300 border-cyan-700",
    content: (
      <div className="space-y-2.5">
        <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-xs">
          <p className="text-cyan-400 font-semibold mb-1 flex items-center gap-1.5"><Sparkles size={11} />AI Mentor v3.8 · Profile Analysis</p>
          <p className="text-slate-300 leading-relaxed">"Strong concurrency model. I detected a gap in <span className="text-amber-300 font-semibold">distributed tracing</span> and <span className="text-amber-300 font-semibold">LSM-tree internals</span>. Generating 2 micro-labs now."</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["Concurrency", 94], ["Dist. Systems", 78], ["Storage Eng.", 62]].map(([label, val]) => (
            <div key={label as string} className="text-center p-2 rounded-md bg-slate-800/50 border border-slate-700">
              <p className={`text-base font-bold font-mono ${(val as number) >= 90 ? "text-emerald-400" : (val as number) >= 75 ? "text-amber-400" : "text-rose-400"}`}>{val}%</p>
              <p className="text-slate-500 text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <button className="w-full py-2 bg-cyan-700/40 border border-cyan-600/60 text-cyan-300 rounded-md text-xs font-semibold hover:bg-cyan-700/60 transition-colors">
          <Target size={11} className="inline mr-1.5" />Start Recommended Micro-Lab
        </button>
      </div>
    ),
  },
  {
    id: "milestone",
    label: "Project Milestone",
    icon: <Trophy size={13} />,
    title: "Project Milestone Tracker",
    badge: "VERIFIED PROOF",
    badgeClass: "bg-emerald-900/60 text-emerald-300 border-emerald-700",
    content: (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex-1">
            <p className="text-white text-sm font-bold">Distributed Rate Limiter</p>
            <p className="text-slate-400 text-xs">Token Bucket · Redis Cluster · Go</p>
          </div>
          <span className="text-emerald-400 text-sm font-bold font-mono">98/100</span>
        </div>
        {[
          { label: "Token Bucket Algorithm", done: true },
          { label: "Redis Cluster Integration", done: true },
          { label: "Benchmark Suite (p99 < 5ms)", done: true },
          { label: "Race Hazard Audit", done: true },
          { label: "Cryptographic Proof Issued", done: true },
        ].map((m, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <CheckCircle2 size={13} className={m.done ? "text-emerald-400" : "text-slate-600"} />
            <span className={m.done ? "text-slate-300" : "text-slate-600"}>{m.label}</span>
          </div>
        ))}
        <div className="mt-2 p-2.5 rounded-md bg-emerald-900/30 border border-emerald-700/60 text-xs text-emerald-300 flex items-center gap-2">
          <BadgeCheck size={14} />
          <span className="font-semibold">Cryptographic proof issued · ID: DD-9842-ARCH</span>
        </div>
      </div>
    ),
  },
  {
    id: "code-review",
    label: "AI Code Review",
    icon: <GitPullRequest size={13} />,
    title: "AI Pair Architect Review",
    badge: "PR #42 · DIFF",
    badgeClass: "bg-purple-900/60 text-purple-300 border-purple-700",
    content: (
      <div className="space-y-2">
        <div className="rounded-md bg-slate-950 border border-slate-800 p-3 font-mono text-[11px] leading-5">
          <div className="text-slate-500 mb-1">// Before — data race detected</div>
          <div className="bg-rose-950/50 px-2 py-0.5 rounded text-rose-300">- go func() {'{'} counter++ {'}'}</div>
          <div className="text-slate-500 mt-1 mb-1">// After — AI suggestion</div>
          <div className="bg-emerald-950/50 px-2 py-0.5 rounded text-emerald-300">+ atomic.AddInt64(&counter, 1)</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {[["Security", "A+", "text-emerald-400"], ["Complexity", "O(1)", "text-cyan-400"], ["Race Risk", "0", "text-emerald-400"]].map(([l, v, c]) => (
            <div key={l as string} className="p-2 rounded-md bg-slate-800/50 border border-slate-700">
              <p className={`font-bold font-mono ${c}`}>{v}</p>
              <p className="text-slate-500 text-[10px]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const WHY_CARDS = [
  {
    icon: <Brain size={24} className="text-cyan-400" />,
    title: "Deep Knowledge Model",
    desc: "AI that builds a persistent model of your skill gaps, learning velocity, and code patterns — not just a generic hint system.",
    link: "See AI Mentor →",
    path: "/ai-mentor",
  },
  {
    icon: <Terminal size={24} className="text-indigo-400" />,
    title: "Live Sandboxes",
    desc: "Real Go 1.22 VMs with p99 latency telemetry, goroutine analysis, and zero-allocation benchmarks — in your browser.",
    link: "Try the IDE →",
    path: "/coding-academy",
  },
  {
    icon: <Cpu size={24} className="text-purple-400" />,
    title: "AI Pair Architect",
    desc: "PR-diff code review with race hazard detection, auto-refactors, and architectural suggestions from a 40,000-LOC trained model.",
    link: "View Code Review →",
    path: "/ai-mentor",
  },
  {
    icon: <Rocket size={24} className="text-amber-400" />,
    title: "Real Production Projects",
    desc: "Build distributed rate limiters, LSM-tree storage engines, and eBPF tracers — with cryptographically verified completion proofs.",
    link: "Explore Projects →",
    path: "/projects",
  },
];

const PATH_LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
type PathLevel = typeof PATH_LEVELS[number];

const EXTENDED_PATHS = [
  { id: "p1", title: "Distributed Systems Engineering", level: "Advanced", tags: ["Go", "Raft", "gRPC", "Redis"], projects: 8, progress: 68, desc: "From CAP theorem to production Raft consensus. Build 8 verified systems." },
  { id: "p2", title: "Go Concurrency Mastery", level: "Intermediate", tags: ["Go", "Goroutines", "Channels", "Atomics"], projects: 6, progress: 45, desc: "Lock-free data structures, goroutine pools, and zero-allocation patterns." },
  { id: "p3", title: "Backend Engineering Foundations", level: "Beginner", tags: ["Go", "REST", "PostgreSQL", "Docker"], projects: 5, progress: 12, desc: "Build production REST APIs with Go, PostgreSQL, and containerization." },
  { id: "p4", title: "Database Internals", level: "Advanced", tags: ["LSM", "B-Tree", "WAL", "Rust"], projects: 7, progress: 0, desc: "Implement LSM-trees, B-tree indexes, and WAL from scratch in Rust." },
  { id: "p5", title: "Cloud Security Engineering", level: "Intermediate", tags: ["AWS", "IAM", "eBPF", "TLS"], projects: 5, progress: 0, desc: "Zero-trust architecture, eBPF tracing, and cryptographic protocol design." },
  { id: "p6", title: "Full-Stack TypeScript", level: "Beginner", tags: ["React", "TypeScript", "Prisma", "tRPC"], projects: 6, progress: 30, desc: "End-to-end type-safe apps with React, tRPC, and Prisma ORM." },
];

const PROJECT_LABS = [
  {
    id: "lab1",
    title: "Distributed Rate Limiter",
    subtitle: "Token Bucket + Redis Cluster · Go",
    difficulty: "Hard",
    tags: ["Go", "Redis", "Distributed"],
    milestones: ["Token Bucket Algorithm", "Redis Cluster Integration", "Benchmark Suite (p99 < 5ms)", "Race Hazard Audit", "Cryptographic Proof"],
    score: "98/100",
    verified: true,
  },
  {
    id: "lab2",
    title: "LSM-Tree Storage Engine",
    subtitle: "From Scratch · Rust · Production-Grade",
    difficulty: "Expert",
    tags: ["Rust", "Storage", "LSM-Tree"],
    milestones: ["MemTable Implementation", "SSTable Compaction", "WAL + Recovery", "Bloom Filter Optimisation", "Benchmark vs RocksDB"],
    score: "95/100",
    verified: true,
  },
  {
    id: "lab3",
    title: "eBPF Performance Tracer",
    subtitle: "Linux Kernel Tracing · Go + C",
    difficulty: "Expert",
    tags: ["eBPF", "Linux", "Go"],
    milestones: ["kprobe Attachment", "Map-based Event Aggregation", "User-Space Consumer", "Flamegraph Output", "Production Deploy"],
    score: null,
    verified: false,
  },
];

const FAQS = [
  { q: "What makes DevDeep different from LeetCode or HackerRank?", a: "DevDeep focuses on production-grade engineering — not just algorithmic puzzles. You build real distributed systems, get AI-powered code reviews with race hazard detection, and earn cryptographically verified credentials that companies actively use for hiring." },
  { q: "Is the coding sandbox running real Go code?", a: "Yes. Our sandbox runs a real Go 1.22 VM with production-equivalent CPU/memory constraints. You get actual p99 latency telemetry, real goroutine analysis, and benchmark comparisons against top 1% solutions." },
  { q: "How does the AI Mentor know what to recommend?", a: "The AI Mentor analyzes your commit history, challenge submissions, code review patterns, and test results to build a continuous model of your skill gaps — updated after every session." },
  { q: "Can I use my DevDeep portfolio for job applications?", a: "Absolutely. Your verified portfolio is published to a custom domain with cryptographic proofs. 140+ partner companies actively scout high-performing profiles — Stripe, Cloudflare, Datadog, and Razorpay scout weekly." },
  { q: "What programming languages are supported?", a: "Tier 1 support for Go and Rust with full telemetry. TypeScript, Python, and Java in Tier 2. Adding C++ and Zig support in Q3 2026." },
  { q: "Is there a free tier I can actually learn with?", a: "Yes — the free tier includes 50 cloud sandbox hours/month, 120 algorithmic challenges, and a public verified profile. Most learners start here and upgrade to Pro when they hit the advanced curriculum." },
];

const MENTOR_PROFILES = [
  { name: "Arjun Mehta", title: "Staff Engineer", company: "Cloudflare", specialty: "Distributed Systems · Go", rating: 4.97, reviews: 142, price: "₹4,800", available: true, img: mentor1Img },
  { name: "Yuki Tanaka", title: "Principal Engineer", company: "Stripe", specialty: "Payments · Rust · eBPF", rating: 4.94, reviews: 118, price: "₹5,200", available: true, img: mentor2Img },
  { name: "Marcus Johnson", title: "Senior Architect", company: "Datadog", specialty: "Observability · Linux Kernel", rating: 4.91, reviews: 96, price: "₹4,400", available: false, img: mentor3Img },
];

const JOB_CARDS = [
  { title: "Senior Backend Engineer", company: "Razorpay", salary: "₹40L–₹60L", match: 96, tags: ["Go", "Kafka", "Postgres"], type: "Full-time" },
  { title: "Staff Engineer – Platform", company: "Cloudflare India", salary: "₹70L–₹1Cr", match: 89, tags: ["Rust", "eBPF", "Networking"], type: "Full-time" },
  { title: "Senior SRE / Platform", company: "Zepto", salary: "₹35L–₹55L", match: 82, tags: ["Go", "Kubernetes", "SLO"], type: "Hybrid" },
];

const COMPETENCY_BARS = [
  { label: "Concurrency & Parallelism", value: 94 },
  { label: "Distributed Systems", value: 78 },
  { label: "System Design", value: 85 },
  { label: "Storage Engineering", value: 62 },
  { label: "Cloud & Infrastructure", value: 71 },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [pathFilter, setPathFilter] = useState<PathLevel>("All");
  const [email, setEmail] = useState("");
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Auto-play slider
  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 4500);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [nextSlide]);

  const goToSlide = (i: number) => {
    setActiveSlide(i);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 4500);
  };

  const prevSlideHandler = () => goToSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlideHandler = () => goToSlide((activeSlide + 1) % HERO_SLIDES.length);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextSlideHandler() : prevSlideHandler();
  };

  const filteredPaths = pathFilter === "All" ? EXTENDED_PATHS : EXTENDED_PATHS.filter(p => p.level === pathFilter);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're on the list!", { description: "Check your inbox for the next step." });
    setEmail("");
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <PublicNavbar />

      {/* ── 1. ANNOUNCEMENT STRIP ─────────────────────────────────────── */}
      <div className="bg-indigo-950 text-white text-xs py-2 px-4 text-center flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold font-mono border border-cyan-500/30">
          <Zap size={9} className="fill-cyan-300 text-cyan-300" /> NEW
        </span>
        <span className="text-slate-200">
          <span className="font-semibold text-white">DevDeep AI Engine 3.0</span> — Career Diagnostic Live · 4 partner companies scouting profiles this week
        </span>
        <button onClick={() => navigate("/register")} className="hidden sm:inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-semibold transition-colors">
          Try it free <ArrowRight size={11} />
        </button>
      </div>

      {/* ── 2. HERO ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-14 pb-16">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-[0.07]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(79,70,229,0.2) 0%, transparent 65%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-0">
          {/* Headline block */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/25 font-mono">
                AI-Powered · v3.8
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-bold border border-indigo-500/25 font-mono">
                38,400+ Engineers
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-5 text-white">
              Go deeper.{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)" }}>
                Build better.
              </span>
              <br className="hidden sm:block" />
              <span className="text-slate-300 text-4xl sm:text-5xl lg:text-6xl"> Become a better developer.</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Master distributed systems, concurrency primitives, and production engineering with AI-powered code review, real sandbox benchmarks, and cryptographically verified credentials.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                onClick={() => navigate("/learning-paths")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-[0.98]"
              >
                <Rocket size={16} /> Start Learning Free
              </button>
              <button
                onClick={() => navigate("/coding-academy")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-base transition-all"
              >
                <Play size={16} /> Explore Interactive Demo
              </button>
            </div>
            <p className="text-slate-500 text-sm">No credit card required · Free tier always available</p>
          </div>

          {/* ── Hero Slider ── */}
          <div className="max-w-5xl mx-auto">
            {/* Tab selectors */}
            <div className="flex items-center justify-center gap-1 mb-4 flex-wrap">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeSlide === i
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg"
                      : "bg-white/8 text-slate-400 border-white/10 hover:border-white/25 hover:text-slate-200"
                  }`}
                >
                  {slide.icon} {slide.label}
                </button>
              ))}
            </div>

            {/* Slide panel */}
            <div
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-sm shadow-2xl"
              style={{ minHeight: 280 }}
            >
              {/* Slide header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-slate-300 text-sm font-semibold">{currentSlide.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border font-mono ${currentSlide.badgeClass}`}>
                    {currentSlide.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={prevSlideHandler} className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <ChevronLeft size={12} className="text-white" />
                    </button>
                    <button onClick={nextSlideHandler} className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                      <ChevronRight size={12} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide content */}
              <div className="p-5">
                <div key={currentSlide.id} className="animate-fade-in">
                  {currentSlide.content}
                </div>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center justify-center gap-1.5 pb-4">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`rounded-full transition-all ${activeSlide === i ? "w-6 h-1.5 bg-indigo-400" : "w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Stat strip ── */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 mt-10 border border-white/8 rounded-xl overflow-hidden bg-slate-900/60 backdrop-blur-sm">
            {STATS.map((s, i) => (
              <div key={s.label} className={`py-5 px-4 text-center ${i < 3 ? "border-r border-white/8" : ""}`}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  {s.icon}
                  <span className="text-white font-bold text-2xl font-mono tracking-tight">{s.value}</span>
                </div>
                <p className="text-slate-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY DEVDEEP ────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3 font-mono">Growth Ecosystem</p>
            <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Why DevDeep?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Four pillars engineered to take you from capable to exceptional — tightly integrated, not disconnected tools.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CARDS.map((card, i) => (
              <div key={i} className="group p-6 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(card.path)}>
                <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2 tracking-tight">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className="text-indigo-600 text-sm font-semibold group-hover:text-indigo-700 flex items-center gap-1 transition-colors">
                  {card.link} <ChevronRight size={13} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LEARNING PATHS ─────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-1 font-mono">Curriculum</p>
              <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Structured Learning Paths</h2>
            </div>
            <button onClick={() => navigate("/learning-paths")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-900 transition-colors">
              View all paths <ChevronRight size={14} />
            </button>
          </div>
          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {PATH_LEVELS.map(level => (
              <button
                key={level}
                onClick={() => setPathFilter(level)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  pathFilter === level
                    ? "bg-indigo-900 text-white border-indigo-900"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPaths.map(path => (
              <div
                key={path.id}
                onClick={() => navigate(`/courses/${path.id}`)}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border font-mono ${
                    path.level === "Advanced" ? "bg-purple-50 text-purple-700 border-purple-200" :
                    path.level === "Intermediate" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}>
                    {path.level.toUpperCase()}
                  </span>
                  <span className="text-slate-400 text-xs">{path.projects} projects</span>
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-2 tracking-tight group-hover:text-indigo-900 transition-colors">{path.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{path.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {path.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-mono">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400">{path.progress > 0 ? `${path.progress}% complete` : "Not started"}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${path.progress}%` }} />
                </div>
                <button className="w-full py-2 rounded-lg text-xs font-bold border transition-colors bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 group-hover:bg-indigo-900 group-hover:text-white group-hover:border-indigo-900">
                  {path.progress > 0 ? "Continue Path →" : "Start Path →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MICRO-IDE SHOWCASE ─────────────────────────────────────── */}
      <section className="bg-slate-950 py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3 font-mono">Cloud Micro-IDE</p>
            <h2 className="text-white text-4xl font-bold tracking-tighter mb-4">Interactive Coding Academy</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Write, run, and benchmark real Go code — directly in your browser. No setup. No downloads.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
              {/* IDE Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-xs font-mono">concurrent_worker.go · Go 1.22</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/50 border border-emerald-700 text-emerald-400 text-[10px] font-bold">
                    <Wifi size={9} /> LIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toast.success("Code submitted! 32/32 tests passed · p99: 4.1ms")} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md text-xs font-semibold transition-colors">
                    Run Code
                  </button>
                  <button onClick={() => { toast.success("Opening Interactive IDE...", { description: "Launch full IDE with live benchmarks" }); navigate("/coding-academy"); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-semibold transition-colors">
                    Submit Solution
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                {/* Code editor */}
                <div className="lg:col-span-3 p-5 font-mono text-xs leading-7 overflow-auto" style={{ minHeight: 260 }}>
                  <p><span className="text-purple-400">package</span> <span className="text-white">main</span></p>
                  <p className="mt-1"><span className="text-purple-400">import</span> <span className="text-white">(</span></p>
                  <p><span className="text-white">  </span><span className="text-emerald-300">"context"</span></p>
                  <p><span className="text-white">  </span><span className="text-emerald-300">"sync"</span></p>
                  <p><span className="text-white">  </span><span className="text-emerald-300">"sync/atomic"</span></p>
                  <p><span className="text-white">)</span></p>
                  <p className="mt-2"><span className="text-slate-500">// WorkerPool manages N concurrent goroutines</span></p>
                  <p><span className="text-purple-400">func</span> <span className="text-blue-300">WorkerPool</span><span className="text-white">(ctx context.Context, n </span><span className="text-cyan-300">int</span><span className="text-white">,</span></p>
                  <p><span className="text-white">  tasks </span><span className="text-purple-400">chan</span> <span className="text-cyan-300">func</span><span className="text-white">()) </span><span className="text-purple-400">chan</span> <span className="text-cyan-300">error</span> <span className="text-white">{'{'}</span></p>
                  <p><span className="text-white">  errs := make(</span><span className="text-purple-400">chan</span> <span className="text-cyan-300">error</span><span className="text-white">, n)</span></p>
                  <p><span className="text-white">  </span><span className="text-purple-400">var</span><span className="text-white"> wg sync.WaitGroup</span></p>
                  <p><span className="text-white">  </span><span className="text-purple-400">var</span><span className="text-white"> completed </span><span className="text-cyan-300">int64</span></p>
                  <p><span className="text-white">  </span><span className="text-purple-400">for</span><span className="text-white"> i := </span><span className="text-amber-300">0</span><span className="text-white">; i &lt; n; i++ {'{'}</span></p>
                  <p><span className="text-white">    wg.Add(</span><span className="text-amber-300">1</span><span className="text-white">)</span></p>
                  <p><span className="text-white">    </span><span className="text-purple-400">go</span> <span className="text-purple-400">func</span><span className="text-white">() {'{'}</span></p>
                  <p><span className="text-white">      </span><span className="text-purple-400">defer</span><span className="text-white"> wg.Done()</span></p>
                  <p><span className="text-white">      atomic.AddInt64(&completed, </span><span className="text-amber-300">1</span><span className="text-white">)</span></p>
                  <p><span className="text-white">    {'}'}()</span></p>
                  <p><span className="text-white">  {'}'}</span></p>
                  <p><span className="text-white">  </span><span className="text-purple-400">go</span> <span className="text-purple-400">func</span><span className="text-white">() {'{'} wg.Wait(); close(errs) {'}'}()</span></p>
                  <p><span className="text-white">  </span><span className="text-purple-400">return</span><span className="text-white"> errs</span></p>
                  <p><span className="text-white">{'}'}</span></p>
                </div>

                {/* Test Results panel */}
                <div className="lg:col-span-2 p-4 bg-slate-950/60">
                  <p className="text-slate-400 text-[10px] font-mono font-bold uppercase mb-3">Test Results</p>
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { test: "TestWorkerPool_Basic", status: "PASS", time: "0.2ms" },
                      { test: "TestWorkerPool_Concurrent", status: "PASS", time: "1.4ms" },
                      { test: "TestWorkerPool_GracefulShutdown", status: "PASS", time: "2.1ms" },
                      { test: "TestWorkerPool_NoRaces", status: "PASS", time: "4.1ms" },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-800/60 border border-slate-700">
                        <span className="text-slate-300 text-[10px] truncate mr-2">{t.test}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-slate-500 text-[10px]">{t.time}</span>
                          <span className="text-emerald-400 text-[10px] font-bold">✓ {t.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-emerald-900/30 rounded-lg border border-emerald-700/60">
                    <p className="text-emerald-400 text-xs font-bold">✓ 32/32 Tests Passed</p>
                    <div className="text-slate-400 text-[10px] mt-1 space-y-0.5">
                      <div>p99 latency: <span className="text-white font-bold">4.1ms</span></div>
                      <div>allocs/op: <span className="text-white font-bold">0</span></div>
                      <div>race detector: <span className="text-white font-bold">CLEAN</span></div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-[10px] mt-3 font-mono">Rank: <span className="text-white font-bold">Top 0.8%</span> speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. AI MENTOR SPOTLIGHT ────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-cyan-600 text-xs font-bold uppercase tracking-widest mb-3 font-mono">AI Developer Mentor</p>
            <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Your Personalized AI Architect</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Trained on 40,000+ LOC of production Go and Rust. It finds your exact bottlenecks and generates targeted micro-challenges.</p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
            {/* Chat / Diagnostic */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-950">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-300 text-sm font-semibold">AI Mentor v3.8</span>
                <span className="ml-auto text-[10px] font-mono text-slate-500">99.4% confidence</span>
              </div>
              <div className="p-4 space-y-3 text-xs">
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-indigo-900 flex items-center justify-center text-white text-[10px] font-bold shrink-0">AX</div>
                  <div className="bg-slate-800 rounded-xl rounded-tl-sm px-3 py-2 text-slate-300 leading-relaxed">
                    Why does my goroutine pool leak when context is cancelled?
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-cyan-700 flex items-center justify-center shrink-0">
                    <Sparkles size={12} className="text-cyan-200" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-cyan-950/60 border border-cyan-800/60 rounded-xl rounded-tl-sm px-3 py-2 text-slate-200 leading-relaxed">
                      Your worker goroutines are reading from the task channel without a <code className="text-cyan-300 bg-slate-800 px-1 rounded">select</code> on <code className="text-cyan-300 bg-slate-800 px-1 rounded">ctx.Done()</code>. When context cancels, they block forever waiting for new tasks.
                    </div>
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 font-mono text-[10px] leading-5">
                      <p className="text-purple-400">select {'{'}</p>
                      <p><span className="text-purple-400">case</span> task := &lt;-tasks:</p>
                      <p>  task()</p>
                      <p><span className="text-purple-400">case</span> &lt;-ctx.Done():</p>
                      <p>  <span className="text-purple-400">return</span> <span className="text-slate-500">// clean exit</span></p>
                      <p>{'}'}</p>
                    </div>
                    <button onClick={() => { toast.success("Opening AI Mentor...", { description: "Context-aware worker pool — 4 guided tasks" }); navigate("/ai-mentor"); }} className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-700/40 border border-cyan-600/60 text-cyan-300 text-[10px] font-semibold hover:bg-cyan-700/60 transition-colors">
                      <Target size={10} /> Generate Micro-Lab on this Topic
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Diagnostic Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-900 text-white font-bold flex items-center justify-center text-base shrink-0">AX</div>
                <div>
                  <p className="text-slate-900 font-bold">Alex Volkov</p>
                  <p className="text-slate-500 text-sm">Staff L7 · Top 0.4% Global</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-indigo-900 text-2xl font-bold font-mono">87%</p>
                  <p className="text-slate-400 text-xs">Readiness</p>
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-xs font-bold uppercase tracking-wide mb-3">Detected Weaknesses</p>
                <div className="space-y-2">
                  {[
                    { label: "Distributed Tracing (OpenTelemetry)", severity: "Medium" },
                    { label: "LSM-Tree Compaction Strategies", severity: "High" },
                    { label: "eBPF Map Types & Performance", severity: "Low" },
                  ].map((w, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${w.severity === "High" ? "bg-rose-400" : w.severity === "Medium" ? "bg-amber-400" : "bg-emerald-400"}`} />
                      <span className="text-slate-700 text-xs flex-1">{w.label}</span>
                      <span className={`text-[10px] font-bold ${w.severity === "High" ? "text-rose-600" : w.severity === "Medium" ? "text-amber-600" : "text-emerald-600"}`}>{w.severity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-xs font-bold uppercase tracking-wide mb-2">Recommended Micro-Challenge</p>
                <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
                  <p className="text-indigo-900 font-semibold text-sm">Implement OpenTelemetry tracing in a distributed system</p>
                  <p className="text-slate-500 text-xs mt-1">Difficulty: Medium · Est. 45 min · 250 pts</p>
                </div>
              </div>

              <button onClick={() => navigate("/ai-mentor")} className="w-full py-3 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm transition-colors">
                Start AI Diagnosis →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CHALLENGES PREVIEW ─────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-1 font-mono">Practice</p>
              <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Coding Challenges</h2>
            </div>
            <button onClick={() => navigate("/challenges")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-900 transition-colors">
              All 420+ Challenges <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Two-Sum with Sorted Input", difficulty: "Easy", points: 50, tags: ["Arrays", "HashMap"], acceptance: 78, desc: "Optimal O(n) solution with hash map. Foundation for all lookup patterns." },
              { title: "Concurrent Worker Pool", difficulty: "Medium", points: 150, tags: ["Go", "Goroutines", "Context"], acceptance: 41, desc: "Build a bounded goroutine pool with graceful shutdown on context cancellation." },
              { title: "Distributed Rate Limiter", difficulty: "Hard", points: 300, tags: ["Redis", "Token Bucket", "Distributed"], acceptance: 12, desc: "Implement sliding window + token bucket with Redis Cluster and atomic operations." },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer" onClick={() => navigate("/challenges")}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    c.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    c.difficulty === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                    "bg-rose-50 text-rose-700 border-rose-200"
                  }`}>{c.difficulty}</span>
                  <span className="text-slate-900 font-mono font-bold text-sm">{c.points} pts</span>
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-2 group-hover:text-indigo-900 transition-colors">{c.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {c.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-mono">{t}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">{c.acceptance}% acceptance</span>
                  <button className="px-4 py-1.5 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold transition-colors">
                    Solve →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PROJECT LAB ────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3 font-mono">Real-World Projects</p>
            <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Production Project Lab</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Build the same systems used at Cloudflare, Stripe, and Datadog — then earn a cryptographic completion proof.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {PROJECT_LABS.map(lab => (
              <div key={lab.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer" onClick={() => navigate("/projects")}>
                <div className={`px-5 pt-5 pb-4 border-b border-slate-100 ${lab.verified ? "bg-gradient-to-br from-indigo-50 to-white" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${
                      lab.difficulty === "Expert" ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>{lab.difficulty}</span>
                    {lab.verified && <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold"><BadgeCheck size={11} />Verified Proof</span>}
                    {lab.score && <span className="ml-auto text-indigo-900 font-bold font-mono text-sm">{lab.score}</span>}
                  </div>
                  <h3 className="text-slate-900 font-bold text-base mb-1 group-hover:text-indigo-900 transition-colors">{lab.title}</h3>
                  <p className="text-slate-500 text-xs">{lab.subtitle}</p>
                </div>
                <div className="p-5">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wide mb-3">Milestone Checklist</p>
                  <div className="space-y-2">
                    {lab.milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 size={13} className={lab.verified ? "text-emerald-500" : "text-slate-300"} />
                        <span className={lab.verified ? "text-slate-700" : "text-slate-400"}>{m}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-4 mb-4">
                    {lab.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-mono">{t}</span>)}
                  </div>
                  <button className="w-full py-2 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                    <FileCode2 size={12} /> Start Project Repo →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. AI CODE REVIEW PREVIEW ─────────────────────────────────── */}
      <section className="bg-slate-950 border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 font-mono">AI Pair Architect</p>
            <h2 className="text-white text-4xl font-bold tracking-tighter mb-4">AI Code Review Studio</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">PR-style diff viewer with race hazard detection, automated refactors, and security scoring.</p>
          </div>

          <div className="max-w-4xl mx-auto rounded-xl border border-slate-700 overflow-hidden bg-slate-900">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <GitPullRequest size={14} className="text-purple-400" />
                <span className="text-slate-300 text-sm font-semibold">PR #42 — Fix goroutine data race in counter</span>
              </div>
              <div className="flex items-center gap-2">
                {[["Security", "A+", "text-emerald-400"], ["Complexity", "O(1)", "text-cyan-400"], ["Race Risk", "0 Found", "text-emerald-400"]].map(([l, v, c]) => (
                  <div key={l as string} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
                    <span className="text-slate-400">{l}:</span>
                    <span className={`font-bold font-mono ${c}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 grid lg:grid-cols-2 gap-5">
              {/* Before */}
              <div>
                <p className="text-rose-400 text-[10px] font-bold font-mono mb-2">─ BEFORE (Data Race Detected)</p>
                <div className="rounded-lg bg-rose-950/30 border border-rose-800/50 p-4 font-mono text-xs leading-6">
                  <div className="bg-rose-900/30 px-2 py-1 rounded border border-rose-700/50 mb-1">
                    <span className="text-rose-400">- </span><span className="text-white">go func() {'{'} counter++ {'}'}</span>
                  </div>
                  <p className="text-slate-400">// DATA RACE: unsynchronized</p>
                  <p className="text-slate-400">// concurrent write to counter</p>
                  <div className="mt-2 p-2 rounded bg-rose-900/20 border border-rose-800/40 text-rose-300 text-[10px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                    Race Condition Detected — CRITICAL
                  </div>
                </div>
              </div>

              {/* After */}
              <div>
                <p className="text-emerald-400 text-[10px] font-bold font-mono mb-2">+ AFTER (AI-Suggested Fix)</p>
                <div className="rounded-lg bg-emerald-950/30 border border-emerald-800/50 p-4 font-mono text-xs leading-6">
                  <div className="bg-emerald-900/30 px-2 py-1 rounded border border-emerald-700/50 mb-1">
                    <span className="text-emerald-400">+ </span><span className="text-white">atomic.AddInt64(&counter, 1)</span>
                  </div>
                  <p className="text-slate-400">// Lock-free atomic operation</p>
                  <p className="text-slate-400">// 0 allocs · race-free</p>
                  <div className="mt-2 p-2 rounded bg-emerald-900/20 border border-emerald-800/40 text-emerald-300 text-[10px] flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                    All Checks Passed — SECURE
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={13} className="text-cyan-400" />
                  <span className="text-cyan-300 text-xs font-bold">AI Architect Comment</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">"Using <code className="text-cyan-300 bg-slate-800 px-1 rounded">atomic.AddInt64</code> eliminates the race condition and is lock-free. For more complex state, consider a mutex or channel-based approach. I've also detected 2 similar patterns in your codebase — generating a targeted micro-lab."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. ANALYTICS TEASER ──────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3 font-mono">Developer Analytics</p>
            <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Activity & Competency Dashboard</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Track your coding activity, skill growth, and career readiness with production telemetry.</p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
            {/* Heatmap */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-900 font-bold">Contribution Activity</p>
                  <p className="text-slate-400 text-xs mt-0.5">1,842 verified contributions this year</p>
                </div>
                <span className="text-indigo-600 font-mono font-bold text-sm inline-flex items-center gap-1">
                  84d streak <Flame size={14} className="text-indigo-600" />
                </span>
              </div>
              <ActivityHeatmap />
              <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                <span>Aggregated from GitHub + DevDeep challenges</span>
                <span className="flex items-center gap-1">Less <span className="flex items-center gap-0.5 mx-1">{[1,2,3,4,5].map(i => <span key={i} className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: `rgba(79,70,229,${i * 0.18})` }} />)}</span> More</span>
              </div>
            </div>

            {/* Competency bars */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-slate-900 font-bold">Technical Competency Matrix</p>
                  <p className="text-slate-400 text-xs mt-0.5">Evaluated on 40,000+ LOC · v3.8</p>
                </div>
                <span className="text-indigo-900 font-bold font-mono">892/1000</span>
              </div>
              <div className="space-y-4">
                {COMPETENCY_BARS.map(bar => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-slate-700 text-sm">{bar.label}</span>
                      <span className={`text-sm font-bold font-mono ${bar.value >= 90 ? "text-emerald-600" : bar.value >= 75 ? "text-indigo-600" : "text-amber-600"}`}>{bar.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${bar.value >= 90 ? "bg-emerald-500" : bar.value >= 75 ? "bg-indigo-600" : "bg-amber-500"}`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/ai-mentor")} className="w-full mt-5 py-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-100 transition-colors">
                Run Full Skill Diagnostic →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. MENTOR NETWORK ────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3 font-mono">1:1 Sessions</p>
            <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-4">Mentor Network</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Staff engineers and principal architects from the world's best engineering organizations — available for live 1:1 sessions.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {MENTOR_PROFILES.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all group">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold">{m.name}</p>
                      <p className="text-slate-300 text-xs">{m.title} · {m.company}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full border-2 border-white ${m.available ? "bg-emerald-400" : "bg-slate-400"}`} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-xs mb-3">{m.specialty}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={12} className={si < Math.round(m.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                      ))}
                    </div>
                    <span className="text-slate-900 text-xs font-bold">{m.rating}</span>
                    <span className="text-slate-400 text-xs">({m.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-indigo-900 font-bold text-base">{m.price}<span className="text-slate-400 text-xs font-normal"> / session</span></span>
                    {m.available ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold"><CircleDot size={10} />Available</span>
                    ) : (
                      <span className="text-slate-400 text-xs">Fully Booked</span>
                    )}
                  </div>
                  <button
                    onClick={() => { toast.success(`Viewing mentor profile for ${m.name}`); navigate("/mentors"); }}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${m.available ? "bg-indigo-900 hover:bg-indigo-800 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                  >
                    {m.available ? "Book 1:1 Review →" : "Join Waitlist →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. CAREER / JOBS PREVIEW ─────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-1 font-mono">Career Board</p>
              <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Matched Opportunities</h2>
              <p className="text-slate-500 text-sm mt-1">Roles matched to your verified skill matrix · Updated daily</p>
            </div>
            <button onClick={() => navigate("/jobs")} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-900 transition-colors">
              Browse all jobs <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {JOB_CARDS.map((job, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer" onClick={() => navigate("/jobs")}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                    <Building2 size={18} className="text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                    <Target size={11} className="text-emerald-600" />
                    <span className="text-emerald-700 text-xs font-bold">{job.match}% Match</span>
                  </div>
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-1 group-hover:text-indigo-900 transition-colors">{job.title}</h3>
                <p className="text-slate-500 text-xs mb-3">{job.company} · {job.type}</p>
                <p className="text-indigo-900 font-bold text-base mb-4 flex items-center gap-1">
                  <IndianRupee size={14} />
                  {job.salary.replace("₹", "")}
                  <span className="text-slate-400 text-xs font-normal">per year</span>
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-mono">{t}</span>)}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/jobs"); }}
                  className="w-full py-2 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold transition-colors"
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. PRICING ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2 font-mono">INR · Transparent Billing</p>
            <h2 className="text-slate-900 text-4xl font-bold tracking-tighter mb-3">Invest in Your Engineering Career</h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto mb-8">No hidden fees. Cancel anytime. All plans include a free trial.</p>
            {/* Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-semibold ${!isYearly ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="w-12 h-6 rounded-full bg-indigo-900 p-0.5 relative focus:outline-none"
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow ${isYearly ? "translate-x-6" : "translate-x-0"}`} />
              </button>
              <span className={`text-sm font-semibold flex items-center gap-2 ${isYearly ? "text-slate-900" : "text-slate-400"}`}>
                Annual
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">SAVE 20%</span>
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
              <p className="text-slate-400 text-[10px] font-mono font-bold uppercase mb-1">Explorer</p>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Free</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-slate-900 font-bold text-3xl font-mono">₹0</span>
                <span className="text-slate-400 text-xs">forever</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 flex-1 mb-6">
                {["50 sandbox hours/month", "120 algorithm challenges", "Public verified profile", "Community discussions"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500 shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate("/register")} className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                Start Free →
              </button>
            </div>
            {/* Pro */}
            <div className="bg-indigo-950 rounded-xl border border-indigo-700 p-6 flex flex-col relative shadow-xl shadow-indigo-900/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">MOST POPULAR</div>
              <p className="text-indigo-300 text-[10px] font-mono font-bold uppercase mb-1">DevDeep Pro</p>
              <h3 className="text-white font-bold text-lg mb-1">Pro Engineer</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-white font-bold text-3xl font-mono">{isYearly ? "₹1,199" : "₹1,499"}</span>
                <span className="text-indigo-400 text-xs">/month</span>
              </div>
              {isYearly && <p className="text-emerald-400 text-xs mb-2 font-semibold">You save ₹3,600/year</p>}
              <ul className="space-y-2 text-xs text-indigo-200 flex-1 mb-6">
                {["Unlimited AI Mentor v3.8", "All 42 Production Labs", "Cryptographic Skill Proofs", "Career radar & job matching", "Full-speed 4.1ms sandbox"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 size={12} className="text-indigo-400 shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate("/register")} className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold transition-colors shadow-lg">
                Upgrade to Pro →
              </button>
            </div>
            {/* Career+ */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
              <p className="text-slate-400 text-[10px] font-mono font-bold uppercase mb-1">Career Cohort</p>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Career+</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-slate-900 font-bold text-3xl font-mono">{isYearly ? "₹3,199" : "₹3,999"}</span>
                <span className="text-slate-400 text-xs">/month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 flex-1 mb-6">
                {["Everything in Pro", "2× 1:1 Staff Mentor calls/mo", "Verified Scout Scorecard", "Priority job referral lane", "Resume & portfolio review"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500 shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => navigate("/register")} className="w-full py-2.5 rounded-lg border border-indigo-200 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors">
                Start Cohort →
              </button>
            </div>
            {/* Enterprise */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
              <p className="text-slate-400 text-[10px] font-mono font-bold uppercase mb-1">Teams</p>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-slate-900 font-bold text-2xl font-mono">Custom</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 flex-1 mb-6">
                {["Everything in Career+", "Team analytics dashboard", "SSO & SAML integration", "Custom curriculum paths", "Dedicated success manager"].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500 shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => toast.success("Sales request sent!", { description: "Our team will reach out within 24 hours." })} className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                Contact Sales →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2 font-mono">FAQ</p>
            <h2 className="text-slate-900 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-slate-900 font-semibold text-sm pr-4 group-hover:text-indigo-900 transition-colors">{faq.q}</span>
                  <div className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? "bg-indigo-100" : ""}`}>
                    {openFaq === i ? <Minus size={12} className="text-indigo-600" /> : <Plus size={12} className="text-slate-500" />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 border-t border-slate-100 animate-fade-in">
                    <p className="text-slate-600 text-sm leading-relaxed pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. FINAL CTA BAND ────────────────────────────────────────── */}
      <section className="bg-indigo-950 py-20 border-t border-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/25">
              <Flame size={11} className="fill-cyan-300 text-cyan-300" />4 companies scouting profiles now
            </span>
          </div>
          <h2 className="text-white text-5xl font-bold tracking-tighter mb-4">Ready to reach Staff+?</h2>
          <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Join 38,000+ engineers building production systems with AI-powered mentorship and cryptographic proof of their skills.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-all shadow-lg flex items-center gap-2 justify-center"
            >
              <Send size={14} />Start Free
            </button>
          </form>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" />No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" />Free tier always available</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" />Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ── 16. FOOTER ────────────────────────────────────────────────── */}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
