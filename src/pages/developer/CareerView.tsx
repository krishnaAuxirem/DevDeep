import { useState } from "react";
import {
  Briefcase, Compass, Laptop, Send, CheckCircle2,
  Building, MapPin, ArrowRight, Star, Clock, Filter
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { toast } from "sonner";

interface CareerViewProps {
  initialTab?: "jobs" | "internships" | "freelance" | "applications";
}

const JOBS = [
  {
    id: "j1",
    title: "Senior Distributed Storage Engineer",
    company: "Cred",
    location: "Bengaluru / Hybrid",
    salary: "₹55,00,000 - ₹72,00,000 INR",
    type: "Full-Time",
    tags: ["Go", "Raft", "RocksDB", "Kubernetes"],
    reqScore: "Systems Score > 85%",
  },
  {
    id: "j2",
    title: "Staff AI Systems Engineer (LLM Inference)",
    company: "Sarvam AI",
    location: "Remote",
    salary: "₹65,00,000 - ₹85,00,000 INR",
    type: "Full-Time",
    tags: ["C++", "CUDA", "vLLM", "Python"],
    reqScore: "AI Path Completed",
  },
  {
    id: "j3",
    title: "Lead Edge Infrastructure Architect",
    company: "Razorpay",
    location: "Bengaluru",
    salary: "₹50,00,000 - ₹68,00,000 INR",
    type: "Full-Time",
    tags: ["Rust", "Wasm", "Cloudflare Workers"],
    reqScore: "Top 2% Global Rank",
  },
];

const INTERNSHIPS = [
  {
    id: "i1",
    title: "Systems Engineering Fellow (Distributed KV)",
    company: "Postman",
    location: "Bengaluru / Remote",
    stipend: "₹1,20,000 / month INR",
    duration: "6 Months",
    tags: ["Go", "Distributed Systems", "gRPC"],
  },
  {
    id: "i2",
    title: "Cloud Infrastructure & eBPF Intern",
    company: "Datadog India",
    location: "Remote",
    stipend: "₹1,40,000 / month INR",
    duration: "4 Months",
    tags: ["Linux Kernel", "eBPF", "Prometheus"],
  },
];

const FREELANCE = [
  {
    id: "f1",
    title: "Raft Consensus Audit & Fuzz Testing",
    client: "DeFi Infrastructure Lab",
    budget: "₹4,50,000 Fixed Contract INR",
    duration: "3 Weeks",
    tags: ["Go", "Formal Verification", "Jepsen"],
  },
];

const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    role: "Senior Distributed Storage Engineer",
    company: "Cred",
    stage: "Interview",
    appliedDate: "3 days ago",
    scorecardAttached: "94% Verified",
  },
  {
    id: "app-2",
    role: "Staff AI Systems Engineer",
    company: "Sarvam AI",
    stage: "Screening",
    appliedDate: "1 week ago",
    scorecardAttached: "94% Verified",
  },
];

export default function CareerView({ initialTab }: CareerViewProps) {
  const [activeTab, setActiveTab] = useState<"jobs" | "internships" | "freelance" | "applications">(initialTab ?? "jobs");
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [applyingJob, setApplyingJob] = useState<any | null>(null);

  const submitApplication = (job: any) => {
    const newApp = {
      id: `app-${Date.now()}`,
      role: job.title,
      company: job.company,
      stage: "Applied",
      appliedDate: "Just now",
      scorecardAttached: "94% Verified",
    };
    setApplications((prev) => [newApp, ...prev]);
    setApplyingJob(null);
    toast.success(`Application submitted to ${job.company}!`, {
      description: "Your verified DevDeep score of 94% was sent directly to the engineering hiring lead.",
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Career & Talent Fast-Lane</h1>
                <span className="dd-chip-pending text-[10px]">VERIFIED INR BILLING</span>
              </div>
              <p className="text-slate-500 text-sm">
                Skip standard recruiter screens with direct partner referrals verified by your scorecard.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "jobs" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase size={13} />
                <span>Jobs (3)</span>
              </button>
              <button
                onClick={() => setActiveTab("internships")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "internships" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Compass size={13} />
                <span>Internships (2)</span>
              </button>
              <button
                onClick={() => setActiveTab("freelance")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "freelance" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Laptop size={13} />
                <span>Contracts</span>
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "applications" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Send size={13} />
                <span>My Applications ({applications.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Jobs */}
          {activeTab === "jobs" && (
            <div className="space-y-4">
              {JOBS.map((job) => (
                <div key={job.id} className="dd-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-indigo-300 transition-colors">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{job.company}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{job.location}</span>
                      <span className="dd-chip-blue text-[10px]">{job.type}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                    <p className="text-base font-bold text-indigo-900 font-mono">{job.salary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">{job.reqScore}</span>
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="btn-primary text-xs py-2 w-full md:w-auto justify-center"
                    >
                      Apply with Scorecard →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Internships */}
          {activeTab === "internships" && (
            <div className="space-y-4">
              {INTERNSHIPS.map((intern) => (
                <div key={intern.id} className="dd-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{intern.company}</span>
                      <span className="text-xs text-slate-400">• {intern.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{intern.title}</h3>
                    <p className="font-mono text-sm font-bold text-indigo-900">{intern.stipend}</p>
                  </div>
                  <button
                    onClick={() => submitApplication(intern)}
                    className="btn-primary text-xs py-2"
                  >
                    Apply for Fellowship
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Freelance */}
          {activeTab === "freelance" && (
            <div className="space-y-4">
              {FREELANCE.map((f) => (
                <div key={f.id} className="dd-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-400 font-mono">{f.client} · {f.duration}</span>
                    <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                    <p className="font-mono text-sm font-bold text-emerald-700">{f.budget}</p>
                  </div>
                  <button
                    onClick={() => submitApplication(f)}
                    className="btn-primary text-xs py-2"
                  >
                    Submit Proposal
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: My Applications Kanban */}
          {activeTab === "applications" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Applied", "Screening", "Interview", "Offer"].map((stage) => {
                const stageApps = applications.filter((a) => a.stage === stage);
                return (
                  <div key={stage} className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-700">{stage}</span>
                      <span className="text-xs font-mono font-bold bg-white px-1.5 rounded border border-slate-200">
                        {stageApps.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {stageApps.map((app) => (
                        <div key={app.id} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
                          <span className="text-xs font-bold text-slate-900 block truncate">{app.role}</span>
                          <span className="text-xs text-indigo-700 font-medium block">{app.company}</span>
                          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                            <span>Score: {app.scorecardAttached}</span>
                            <span>{app.appliedDate}</span>
                          </div>
                        </div>
                      ))}
                      {stageApps.length === 0 && (
                        <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
                          No applications
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Apply Modal Confirmation */}
          {applyingJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Apply via Verified Scorecard</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You are applying to <strong>{applyingJob.title}</strong> at <strong>{applyingJob.company}</strong>.
                  Your verified DevDeep score (<strong>94%</strong>) and Merkle commit proof will be directly delivered to the engineering team.
                </p>
                <div className="p-3 bg-indigo-50 rounded-xl text-xs space-y-1 text-indigo-900 font-mono">
                  <div>Salary Range: {applyingJob.salary}</div>
                  <div>Direct Referral: Verified Staff Tier</div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setApplyingJob(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => submitApplication(applyingJob)}
                    className="btn-primary text-xs py-2"
                  >
                    Confirm & Dispatch Scorecard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
