import { useState } from "react";
import {
  Search, Briefcase, Users, CheckCircle2, Star, MapPin,
  Filter, ChevronRight, Mail, Calendar, Zap, Building2,
  BarChart3, UserCheck, Clock, Bell, Plus, X, IndianRupee,
  Eye, ArrowRight, Check, AlertCircle, Sparkles, Send, ShieldCheck
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, FunnelChart, Funnel, LabelList
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import LiveActivityStream from "@/components/features/LiveActivityStream";
import DeveloperPortfolioModal from "@/components/features/DeveloperPortfolioModal";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface Candidate {
  id: string;
  name: string;
  title: string;
  level: string;
  score: number;
  location: string;
  skills: string[];
  availability: "Actively looking" | "Open to offers" | "Passive";
  avatar: string;
  expectedSalary: string;
}

interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired";
  score: number;
  skills: string[];
  appliedDate: string;
  avatar: string;
}

interface JobPosting {
  id: string;
  title: string;
  track: string;
  salary: string;
  location: string;
  experience: string;
  applicants: number;
  status: "Active" | "Draft" | "Closed";
  closingDate: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: "d1",
    name: "Alex Volkov",
    title: "Staff Distributed Systems Engineer",
    level: "Staff L7",
    score: 96,
    location: "Bengaluru, IN (Hybrid)",
    skills: ["Go", "Raft", "Distributed Systems", "RocksDB"],
    availability: "Open to offers",
    avatar: "AV",
    expectedSalary: "₹65,00,000 - ₹80,00,000 INR",
  },
  {
    id: "d2",
    name: "Priya Sharma",
    title: "Senior Concurrency & Rust Engineer",
    level: "Senior L5",
    score: 94,
    location: "Hyderabad, IN / Remote",
    skills: ["Rust", "Atomics", "Edge Computing", "WASM"],
    availability: "Actively looking",
    avatar: "PS",
    expectedSalary: "₹50,00,000 - ₹62,00,000 INR",
  },
  {
    id: "d3",
    name: "James Chen",
    title: "Principal Storage Engine Specialist",
    level: "Principal L6",
    score: 98,
    location: "Remote (India)",
    skills: ["RocksDB", "LSM-Trees", "C++", "Kernel I/O"],
    availability: "Passive",
    avatar: "JC",
    expectedSalary: "₹75,00,000 - ₹95,00,000 INR",
  },
  {
    id: "d4",
    name: "Ryo Tanaka",
    title: "Mid-Level Distributed Backend Engineer",
    level: "Mid L3",
    score: 82,
    location: "Pune, IN (Hybrid)",
    skills: ["Go", "Kubernetes", "gRPC", "Kafka"],
    availability: "Actively looking",
    avatar: "RT",
    expectedSalary: "₹28,00,000 - ₹36,00,000 INR",
  },
  {
    id: "d5",
    name: "Sneha Patel",
    title: "Senior Cloud & K8s Infrastructure Lead",
    level: "Senior L5",
    score: 91,
    location: "Delhi NCR, IN",
    skills: ["Kubernetes", "eBPF", "Go", "Terraform"],
    availability: "Open to offers",
    avatar: "SP",
    expectedSalary: "₹48,00,000 - ₹60,00,000 INR",
  },
];

const INITIAL_PIPELINE: PipelineCandidate[] = [
  { id: "p1", name: "Vikram Mehta", role: "Staff Distributed Systems", stage: "Applied", score: 88, skills: ["Go", "Raft"], appliedDate: "Today", avatar: "VM" },
  { id: "p2", name: "Ananya Deshmukh", role: "Senior Rust Engineer", stage: "Applied", score: 92, skills: ["Rust", "Atomics"], appliedDate: "1d ago", avatar: "AD" },
  { id: "p3", name: "Rahul Verma", role: "Storage Engine Lead", stage: "Screening", score: 90, skills: ["C++", "LSM"], appliedDate: "3d ago", avatar: "RV" },
  { id: "p4", name: "Alex Volkov", role: "Staff Distributed Systems", stage: "Interview", score: 96, skills: ["Go", "RocksDB"], appliedDate: "5d ago", avatar: "AV" },
  { id: "p5", name: "Priya Sharma", role: "Senior Rust Engineer", stage: "Interview", score: 94, skills: ["Rust", "WASM"], appliedDate: "1w ago", avatar: "PS" },
  { id: "p6", name: "Kiran Nambiar", role: "Cloud Infra Architect", stage: "Offer", score: 95, skills: ["K8s", "eBPF"], appliedDate: "2w ago", avatar: "KN" },
  { id: "p7", name: "Devansh Roy", role: "Principal Systems Engineer", stage: "Hired", score: 98, skills: ["Go", "Kernel"], appliedDate: "3w ago", avatar: "DR" },
];

const INITIAL_POSTINGS: JobPosting[] = [
  { id: "job-1", title: "Staff Distributed Storage Engineer", track: "Distributed Systems", salary: "₹65,00,000 - ₹85,00,000 INR", location: "Bengaluru, IN (Hybrid)", experience: "Staff L6+", applicants: 42, status: "Active", closingDate: "12 days" },
  { id: "job-2", title: "Senior Concurrency & Rust Architect", track: "Concurrency", salary: "₹52,00,000 - ₹68,00,000 INR", location: "Remote (India)", experience: "Senior L5", applicants: 28, status: "Active", closingDate: "18 days" },
  { id: "job-3", title: "Lead Database Engine Core Specialist", track: "Storage Engines", salary: "₹70,00,000 - ₹90,00,000 INR", location: "Hyderabad, IN", experience: "Principal L6", applicants: 15, status: "Active", closingDate: "7 days" },
];

const FUNNEL_DATA = [
  { stage: "Applied", candidates: 142 },
  { stage: "Screening", candidates: 48 },
  { stage: "Interview", candidates: 24 },
  { stage: "Offer", candidates: 8 },
  { stage: "Hired", candidates: 6 },
];

export default function EmployerDashboard() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"search" | "pipeline" | "postings" | "interviews" | "analytics">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [minScore, setMinScore] = useState<number>(0);
  const [shortlisted, setShortlisted] = useState<string[]>(["d1", "d2"]);

  // Pipeline State
  const [pipeline, setPipeline] = useState<PipelineCandidate[]>(INITIAL_PIPELINE);

  // Job Postings State
  const [postings, setPostings] = useState<JobPosting[]>(INITIAL_POSTINGS);

  // Modal: View Developer Portfolio
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Modal: Post New Job Requirement
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobTrack, setNewJobTrack] = useState("Distributed Systems");
  const [newJobMinSalary, setNewJobMinSalary] = useState("50,00,000");
  const [newJobMaxSalary, setNewJobMaxSalary] = useState("70,00,000");
  const [newJobLocation, setNewJobLocation] = useState("Bengaluru, IN (Hybrid)");
  const [newJobLevel, setNewJobLevel] = useState("Senior L5");

  // Modal: Schedule Interview
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleCandidateName, setScheduleCandidateName] = useState("");
  const [scheduleRound, setScheduleRound] = useState("Raft Consensus & Architecture Round");
  const [scheduleDate, setScheduleDate] = useState("2026-09-12");
  const [scheduleTime, setScheduleTime] = useState("15:00 IST");
  const [scheduleLink, setScheduleLink] = useState("https://meet.google.com/dev-deep-interviews");

  // Shortlist Toggle
  const toggleShortlist = (id: string, name: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(s => s.filter(x => x !== id));
      toast.info(`Removed ${name} from shortlisted candidates.`);
    } else {
      setShortlisted(s => [...s, id]);
      toast.success(`Shortlisted ${name}!`);
    }
  };

  // Open Portfolio
  const handleOpenPortfolio = (id: string) => {
    setSelectedCandidateId(id);
    setIsPortfolioModalOpen(true);
  };

  // Move candidate across Kanban stages
  const STAGES: Array<PipelineCandidate["stage"]> = ["Applied", "Screening", "Interview", "Offer", "Hired"];

  const handleAdvanceStage = (id: string) => {
    setPipeline(prev =>
      prev.map(c => {
        if (c.id === id) {
          const currentIndex = STAGES.indexOf(c.stage);
          if (currentIndex < STAGES.length - 1) {
            const nextStage = STAGES[currentIndex + 1];
            toast.success(`Advanced ${c.name} to "${nextStage}" stage.`);
            return { ...c, stage: nextStage };
          }
        }
        return c;
      })
    );
  };

  const handleRejectCandidate = (id: string, name: string) => {
    setPipeline(prev => prev.filter(c => c.id !== id));
    toast.error(`${name} archived / rejected from pipeline.`);
  };

  // Submit new Job Requirement
  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) {
      toast.error("Please enter a job title.");
      return;
    }

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: newJobTitle.trim(),
      track: newJobTrack,
      salary: `₹${newJobMinSalary} - ₹${newJobMaxSalary} INR`,
      location: newJobLocation,
      experience: newJobLevel,
      applicants: 0,
      status: "Active",
      closingDate: "30 days",
    };

    setPostings(prev => [newJob, ...prev]);
    setIsNewJobModalOpen(false);
    setNewJobTitle("");
    toast.success(`Job requirement "${newJob.title}" posted to verified DevDeep talent!`);
  };

  // Submit interview schedule
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduleModalOpen(false);
    toast.success(`Interview confirmed with ${scheduleCandidateName} on ${scheduleDate} at ${scheduleTime}! Calendar invite dispatched.`);
  };

  // Filtered candidates
  const filteredCandidates = CANDIDATES.filter(c => {
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill = skillFilter === "all" || c.skills.includes(skillFilter);
    const matchesScore = c.score >= minScore;

    return matchesSearch && matchesSkill && matchesScore;
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-[1300px] mx-auto">

            {/* Header: Company Profile & Verification */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-md border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-md bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-900 text-2xl font-bold font-mono shrink-0">
                  <Building2 size={28} className="text-amber-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
                      Talent Hub — {user?.name || "Razorpay Tech Hiring"}
                    </h1>
                    <span className="dd-chip bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono inline-flex items-center gap-1">
                      <Building2 size={11} /> VERIFIED EMPLOYER
                    </span>
                    <span className="dd-chip-completed text-[10px]">
                      <ShieldCheck size={11} /> KYC Audited
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    FinTech Infrastructure & Cloud Core · 1,400+ Engineers · Bengaluru, Hyderabad & Remote
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => toast.info("No active compliance alerts. Platform talent feed healthy.")}
                  className="btn-ghost text-xs"
                >
                  <Bell size={13} /> Alerts
                </button>
                <button
                  onClick={() => setIsNewJobModalOpen(true)}
                  className="btn-primary text-sm shadow-sm"
                >
                  <Plus size={15} /> Post Requirement
                </button>
              </div>
            </div>

            {/* Live Activity Stream */}
            <LiveActivityStream />

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Active Job Postings</p>
                  <Briefcase size={14} className="text-indigo-900" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">{postings.length}</p>
                <p className="text-slate-400 text-xs">85 total applicants</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Shortlisted Candidates</p>
                  <UserCheck size={14} className="text-eblue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">{shortlisted.length}</p>
                <p className="text-slate-400 text-xs">Ready for screening</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Active In Pipeline</p>
                  <Users size={14} className="text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-emerald-600 font-mono">{pipeline.length}</p>
                <p className="text-success text-xs font-semibold mt-0.5">2 offers pending</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Avg. Time To Hire</p>
                  <Clock size={14} className="text-ai-dark" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">14 Days</p>
                <p className="text-slate-400 text-xs">-4 days vs industry avg</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="dd-card overflow-hidden bg-white">
              <div className="flex border-b border-slate-100 px-4 bg-slate-50/50 overflow-x-auto">
                {[
                  { id: "search", label: `Search Verified Talent (${CANDIDATES.length})` },
                  { id: "pipeline", label: `Hiring Pipeline (${pipeline.length})` },
                  { id: "postings", label: `Job Requirements (${postings.length})` },
                  { id: "analytics", label: "Talent Telemetry & Funnel" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                      activeTab === tab.id
                        ? "text-indigo-900 border-indigo-900 bg-white"
                        : "text-slate-500 border-transparent hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* TAB 1: SEARCH TALENT */}
                {activeTab === "search" && (
                  <div className="space-y-4">
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search candidates by name, stack, or title (e.g. Raft, Rust, Staff)..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="dd-input pl-9 text-xs w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={skillFilter}
                          onChange={e => setSkillFilter(e.target.value)}
                          className="dd-input text-xs py-1.5"
                        >
                          <option value="all">All Skills</option>
                          <option value="Go">Go</option>
                          <option value="Rust">Rust</option>
                          <option value="Raft">Raft</option>
                          <option value="RocksDB">RocksDB</option>
                          <option value="Kubernetes">Kubernetes</option>
                        </select>
                        <select
                          value={minScore}
                          onChange={e => setMinScore(Number(e.target.value))}
                          className="dd-input text-xs py-1.5 font-mono"
                        >
                          <option value={0}>Any DevDeep Score</option>
                          <option value={85}>Score &ge; 85</option>
                          <option value={90}>Score &ge; 90</option>
                          <option value={95}>Score &ge; 95 (Elite)</option>
                        </select>
                      </div>
                    </div>

                    {/* Candidate Cards */}
                    <div className="space-y-3">
                      {filteredCandidates.map(dev => (
                        <div
                          key={dev.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-200 rounded-md hover:border-indigo-300 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                              {dev.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-bold text-slate-900 text-base">{dev.name}</h3>
                                <span className="dd-chip-indigo text-[10px]">{dev.level}</span>
                                <span
                                  className={`dd-chip text-[10px] ${
                                    dev.availability === "Actively looking"
                                      ? "dd-chip-completed"
                                      : dev.availability === "Open to offers"
                                      ? "dd-chip-blue"
                                      : "dd-chip-slate"
                                  }`}
                                >
                                  {dev.availability}
                                </span>
                              </div>
                              <p className="text-slate-600 text-sm font-medium">{dev.title}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 flex-wrap">
                                <span className="flex items-center gap-1 text-slate-500">
                                  <MapPin size={12} /> {dev.location}
                                </span>
                                <span className="flex items-center gap-1 font-mono font-semibold text-slate-700">
                                  <IndianRupee size={12} /> {dev.expectedSalary}
                                </span>
                                <div className="flex gap-1">
                                  {dev.skills.map(s => (
                                    <span key={s} className="dd-chip-slate text-[10px]">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                            <div className="text-right hidden sm:block">
                              <div className="flex items-center justify-end gap-1 text-ai font-bold text-base font-mono">
                                <Zap size={14} className="text-ai" /> {dev.score}/100
                              </div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                                Verified Skill Attestation
                              </span>
                            </div>

                            <button
                              onClick={() => handleOpenPortfolio(dev.id)}
                              className="btn-ghost text-xs py-1.5 px-3 border border-slate-200 hover:border-slate-300"
                            >
                              <Eye size={12} /> View Developer Profile
                            </button>

                            <button
                              onClick={() => toggleShortlist(dev.id, dev.name)}
                              className={`text-xs py-1.5 px-3 rounded-sm font-semibold border transition-all ${
                                shortlisted.includes(dev.id)
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-300"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              {shortlisted.includes(dev.id) ? "✓ Shortlisted" : "Shortlist"}
                            </button>

                            <button
                              onClick={() => {
                                setScheduleCandidateName(dev.name);
                                setIsScheduleModalOpen(true);
                              }}
                              className="btn-primary text-xs py-1.5"
                            >
                              <Calendar size={12} /> Interview
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: 5-STAGE KANBAN PIPELINE */}
                {activeTab === "pipeline" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">
                        Interactive 5-stage engineering recruitment pipeline. Click "Advance" to move candidates forward.
                      </p>
                      <button
                        onClick={() => {
                          const candidate = CANDIDATES[0];
                          setPipeline(prev => [
                            {
                              id: `p-${Date.now()}`,
                              name: candidate.name,
                              role: candidate.title,
                              stage: "Applied",
                              score: candidate.score,
                              skills: candidate.skills.slice(0, 2),
                              appliedDate: "Just now",
                              avatar: candidate.avatar,
                            },
                            ...prev,
                          ]);
                          toast.success(`Candidate ${candidate.name} added to pipeline!`);
                        }}
                        className="btn-ghost text-xs"
                      >
                        + Add Candidate to Pipeline
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 min-h-[480px]">
                      {STAGES.map(stage => {
                        const stageCandidates = pipeline.filter(c => c.stage === stage);
                        return (
                          <div
                            key={stage}
                            className="bg-slate-50 border border-slate-200 rounded-md p-3 flex flex-col"
                          >
                            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200">
                              <span className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                                {stage}
                              </span>
                              <span className="dd-chip-slate text-[10px] font-mono px-1.5 py-0">
                                {stageCandidates.length}
                              </span>
                            </div>

                            <div className="space-y-2.5 flex-1 overflow-y-auto">
                              {stageCandidates.map(c => (
                                <div
                                  key={c.id}
                                  className="bg-white p-3 rounded border border-slate-200 shadow-xs space-y-2 hover:border-indigo-300 transition-all"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center text-[10px] font-bold">
                                        {c.avatar}
                                      </div>
                                      <span className="font-bold text-slate-900 text-xs truncate max-w-[90px]">
                                        {c.name}
                                      </span>
                                    </div>
                                    <span className="text-ai font-mono font-bold text-xs">{c.score}</span>
                                  </div>

                                  <p className="text-slate-500 text-[11px] truncate">{c.role}</p>

                                  <div className="flex gap-1 flex-wrap">
                                    {c.skills.map(s => (
                                      <span key={s} className="dd-chip-slate text-[9px] py-0 px-1">
                                        {s}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px]">
                                    <button
                                      onClick={() => handleOpenPortfolio(c.id)}
                                      className="text-indigo-700 hover:underline font-semibold"
                                    >
                                      Profile
                                    </button>

                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => handleRejectCandidate(c.id, c.name)}
                                        className="text-slate-400 hover:text-rose-600 px-1 py-0.5"
                                        title="Reject"
                                      >
                                        &times;
                                      </button>
                                      {stage !== "Hired" && (
                                        <button
                                          onClick={() => handleAdvanceStage(c.id)}
                                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold px-2 py-0.5 rounded border border-indigo-200"
                                        >
                                          Advance &rarr;
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {stageCandidates.length === 0 && (
                                <div className="h-28 flex items-center justify-center border-2 border-dashed border-slate-200 rounded text-slate-400 text-xs">
                                  No candidates
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: JOB REQUIREMENTS */}
                {activeTab === "postings" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">
                        Manage your verified engineering postings and talent sourcing pipelines.
                      </p>
                      <button
                        onClick={() => setIsNewJobModalOpen(true)}
                        className="btn-primary text-xs"
                      >
                        <Plus size={13} /> Post New Requirement
                      </button>
                    </div>

                    <div className="space-y-3">
                      {postings.map(job => (
                        <div
                          key={job.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 rounded-md hover:border-slate-300"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                              <Briefcase size={18} className="text-indigo-700" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                                <span className="dd-chip-completed text-[10px]">{job.status}</span>
                                <span className="dd-chip-indigo text-[10px]">{job.experience}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                                <span className="font-mono font-semibold text-slate-700">{job.salary}</span>
                                <span>·</span>
                                <span>{job.location}</span>
                                <span>·</span>
                                <span className="text-indigo-800 font-semibold">{job.applicants} applicants</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setActiveTab("pipeline");
                                toast.info(`Viewing applicant pipeline for ${job.title}`);
                              }}
                              className="btn-ghost text-xs py-1.5"
                            >
                              <Users size={12} /> View Pipeline
                            </button>
                            <button
                              onClick={() => {
                                setPostings(prev => prev.filter(j => j.id !== job.id));
                                toast.success(`Job "${job.title}" closed.`);
                              }}
                              className="btn-ghost text-xs py-1.5 text-rose-600 hover:bg-rose-50"
                            >
                              Close Job
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: TALENT TELEMETRY & FUNNEL */}
                {activeTab === "analytics" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="dd-surface p-4 rounded-md">
                        <p className="text-slate-400 text-xs font-semibold uppercase">Candidate Pass Rate</p>
                        <p className="text-2xl font-bold font-mono text-slate-900 mt-1">68.2%</p>
                        <p className="text-success text-xs mt-0.5">High attestation match</p>
                      </div>
                      <div className="dd-surface p-4 rounded-md">
                        <p className="text-slate-400 text-xs font-semibold uppercase">Offer Acceptance Rate</p>
                        <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">92.4%</p>
                        <p className="text-slate-400 text-xs mt-0.5">Top-tier compensation alignment</p>
                      </div>
                      <div className="dd-surface p-4 rounded-md">
                        <p className="text-slate-400 text-xs font-semibold uppercase">Talent Sourcing Speed</p>
                        <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">3.2 Days</p>
                        <p className="text-slate-400 text-xs mt-0.5">From requirement to shortlist</p>
                      </div>
                    </div>

                    {/* Funnel conversion chart */}
                    <div className="dd-card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Recruitment Funnel Throughput</h4>
                          <p className="text-xs text-slate-500">Candidates flowing through each interview gate</p>
                        </div>
                        <span className="dd-chip-ai text-[10px]">RECHARTS ENGINE</span>
                      </div>
                      <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={FUNNEL_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} />
                            <Tooltip
                              formatter={(value: any) => [`${value} Engineers`, "Volume"]}
                              labelStyle={{ fontWeight: "bold" }}
                            />
                            <Bar dataKey="candidates" fill="#1e1b4b" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SHARED DEVELOPER PORTFOLIO MODAL */}
      <DeveloperPortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        candidateId={selectedCandidateId || "d1"}
      />

      {/* POST NEW REQUIREMENT MODAL */}
      {isNewJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-lg w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-900" />
                <h3 className="font-bold text-slate-900 text-base">Post Engineering Requirement</h3>
              </div>
              <button
                onClick={() => setIsNewJobModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Staff Distributed Storage Engineer"
                  value={newJobTitle}
                  onChange={e => setNewJobTitle(e.target.value)}
                  className="dd-input text-xs w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Domain Track</label>
                  <select
                    value={newJobTrack}
                    onChange={e => setNewJobTrack(e.target.value)}
                    className="dd-input text-xs w-full"
                  >
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Concurrency">Concurrency & Rust</option>
                    <option value="Storage Engines">Storage Engines & LSM</option>
                    <option value="Cloud & K8s">Cloud & K8s</option>
                    <option value="AI Systems">AI Systems</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seniority Level</label>
                  <select
                    value={newJobLevel}
                    onChange={e => setNewJobLevel(e.target.value)}
                    className="dd-input text-xs w-full"
                  >
                    <option value="Mid L3">Mid (L3)</option>
                    <option value="Senior L5">Senior (L5)</option>
                    <option value="Staff L6+">Staff (L6+)</option>
                    <option value="Principal L7">Principal (L7)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Salary Range (₹ INR Annually) *</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                    <input
                      type="text"
                      placeholder="Min (e.g. 50,00,000)"
                      value={newJobMinSalary}
                      onChange={e => setNewJobMinSalary(e.target.value)}
                      className="dd-input pl-6 text-xs w-full font-mono"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                    <input
                      type="text"
                      placeholder="Max (e.g. 75,00,000)"
                      value={newJobMaxSalary}
                      onChange={e => setNewJobMaxSalary(e.target.value)}
                      className="dd-input pl-6 text-xs w-full font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Location *</label>
                <select
                  value={newJobLocation}
                  onChange={e => setNewJobLocation(e.target.value)}
                  className="dd-input text-xs w-full"
                >
                  <option value="Bengaluru, IN (Hybrid)">Bengaluru, IN (Hybrid)</option>
                  <option value="Hyderabad, IN (Hybrid)">Hyderabad, IN (Hybrid)</option>
                  <option value="Delhi NCR, IN">Delhi NCR, IN</option>
                  <option value="Pune, IN">Pune, IN</option>
                  <option value="Remote (India)">Remote (India)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewJobModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  <Plus size={13} /> Publish Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-indigo-900" />
                <h3 className="font-bold text-slate-900 text-base">Schedule Technical Interview</h3>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Candidate</label>
                <input
                  type="text"
                  value={scheduleCandidateName}
                  disabled
                  className="dd-input text-xs w-full bg-slate-100 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interview Round</label>
                <select
                  value={scheduleRound}
                  onChange={e => setScheduleRound(e.target.value)}
                  className="dd-input text-xs w-full"
                >
                  <option value="Raft Consensus & Architecture Round">Raft Consensus & Architecture Round (60m)</option>
                  <option value="Live Debugging & Race Condition Lab">Live Debugging & Race Condition Lab (45m)</option>
                  <option value="Database Storage Engine Internal Deep-Dive">Database Storage Engine Internal Deep-Dive (60m)</option>
                  <option value="Staff Systems Leadership & Culture">Staff Systems Leadership & Culture (45m)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={e => setScheduleDate(e.target.value)}
                    className="dd-input text-xs w-full"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time (IST)</label>
                  <input
                    type="text"
                    value={scheduleTime}
                    onChange={e => setScheduleTime(e.target.value)}
                    className="dd-input text-xs w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meeting Link</label>
                <input
                  type="url"
                  value={scheduleLink}
                  onChange={e => setScheduleLink(e.target.value)}
                  className="dd-input text-xs w-full font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  <CheckCircle2 size={13} /> Confirm & Dispatch Calendar Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
