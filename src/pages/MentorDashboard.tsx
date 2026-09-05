import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Calendar, Star, MessageSquare, Clock, TrendingUp,
  CheckCircle2, Brain, Award, BarChart3, Zap, ChevronRight,
  Video, BookOpen, Bell, Check, X, ArrowUpRight, ShieldCheck,
  GitPullRequest, FileText, Plus, RefreshCw, IndianRupee
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import DeveloperPortfolioModal from "@/components/features/DeveloperPortfolioModal";
import LiveActivityStream from "@/components/features/LiveActivityStream";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { CURRENT_USER } from "@/constants/data";

interface LearnerRequest {
  id: string;
  name: string;
  goal: string;
  level: string;
  time: string;
  avatar: string;
  urgent: boolean;
}

interface MentorSession {
  id: string;
  learner: string;
  topic: string;
  date: string;
  duration: string;
  paid: boolean;
  status: "upcoming" | "completed" | "rescheduled";
  amount: string;
}

const INITIAL_REQUESTS: LearnerRequest[] = [
  { id: "l1", name: "Priya Nair", goal: "Distributed Systems Path & Raft", level: "Intermediate", time: "Today, 2:00 PM", avatar: "PN", urgent: true },
  { id: "l2", name: "Ryo Tanaka", goal: "Go Concurrency & Lock-Free CAS", level: "Advanced", time: "Tomorrow, 10:00 AM", avatar: "RT", urgent: false },
  { id: "l3", name: "Marco Silva", goal: "Raft Consensus Formal Invariants", level: "Expert", time: "Thu, 6:00 PM", avatar: "MS", urgent: false },
];

const INITIAL_SESSIONS: MentorSession[] = [
  { id: "s1", learner: "Priya Nair", topic: "Distributed Rate Limiting & Token Buckets", date: "Today 2:00 PM", duration: "60 min", paid: true, status: "upcoming", amount: "₹4,800" },
  { id: "s2", learner: "Ryo Tanaka", topic: "Lock-Free Data Structures in Go", date: "Tomorrow 10:00 AM", duration: "45 min", paid: true, status: "upcoming", amount: "₹4,500" },
  { id: "s3", learner: "Alex Volkov", topic: "Raft Consensus Log Compaction & Snapshotting", date: "Yesterday", duration: "60 min", paid: true, status: "completed", amount: "₹4,800" },
];

const MATCHED_LEARNERS = [
  { id: "ml1", name: "Alex Volkov", role: "Senior Distributed Engineer", level: "Staff L7 Candidate", avatar: "AV", progress: 88, status: "Ready for Mock Screen" },
  { id: "ml2", name: "Priya Nair", role: "Backend Software Engineer", level: "Senior Candidate", avatar: "PN", progress: 72, status: "Module 6 / 12 Active" },
  { id: "ml3", name: "Ryo Tanaka", role: "Go Systems Developer", level: "Mid-Level", avatar: "RT", progress: 65, status: "Debugging Lab Active" },
];

const MENTOR_REVIEWS = [
  { name: "Priya Nair", rating: 5, text: "Incredible guidance on Raft consensus RPCs. Helped me structure state transitions in under an hour.", date: "2 days ago" },
  { name: "Ryo Tanaka", rating: 5, text: "Deep knowledge on sync/atomic in Go. Every 1:1 session is worth 10x the cost.", date: "1 week ago" },
  { name: "Alex Volkov", rating: 5, text: "Direct, senior architectural feedback with zero fluff. Prepared me for Staff screen.", date: "2 weeks ago" },
];

const MENTOR_CHART_DATA = [
  { month: "Jan", revenue: 145000, sessions: 28 },
  { month: "Feb", revenue: 182000, sessions: 35 },
  { month: "Mar", revenue: 210000, sessions: 40 },
  { month: "Apr", revenue: 235000, sessions: 44 },
];

export default function MentorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "sessions" | "requests" | "learners" | "code-review" | "career-prep" | "reviews" | "profile"
  >("sessions");

  const [requests, setRequests] = useState<LearnerRequest[]>(INITIAL_REQUESTS);
  const [sessions, setSessions] = useState<MentorSession[]>(INITIAL_SESSIONS);
  const [selectedLearner, setSelectedLearner] = useState<string | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [reschedulingSession, setReschedulingSession] = useState<MentorSession | null>(null);
  const [sessionTopic, setSessionTopic] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("4800");
  const [isAvailable, setIsAvailable] = useState(true);

  const handleAcceptRequest = (req: LearnerRequest) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    const newSession: MentorSession = {
      id: `session-${Date.now()}`,
      learner: req.name,
      topic: req.goal,
      date: req.time,
      duration: "45 min",
      paid: true,
      status: "upcoming",
      amount: `₹${hourlyRate}`,
    };
    setSessions((prev) => [newSession, ...prev]);
    toast.success(`Accepted session request from ${req.name}! Added to Upcoming Sessions.`);
  };

  const handleDeclineRequest = (id: string, name: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.info(`Declined session request from ${name}.`);
  };

  const handleReschedule = () => {
    if (!reschedulingSession || !sessionDate) return;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === reschedulingSession.id ? { ...s, date: sessionDate, status: "rescheduled" } : s
      )
    );
    setReschedulingSession(null);
    setSessionDate("");
    toast.success("Session rescheduled and notification dispatched to mentee!");
  };

  const handleCreateSession = () => {
    if (!sessionTopic || !sessionDate) return;
    const newSession: MentorSession = {
      id: `session-${Date.now()}`,
      learner: "Priya Nair",
      topic: sessionTopic,
      date: sessionDate,
      duration: "45 min",
      paid: true,
      status: "upcoming",
      amount: `₹${hourlyRate}`,
    };
    setSessions([newSession, ...sessions]);
    setScheduleModalOpen(false);
    setSessionTopic("");
    setSessionDate("");
    toast.success("New 1:1 Architectural Session scheduled!");
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
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Staff Mentor Console — {user?.name?.split(" ")[0] ?? "James"}
                </h1>
                <span className="dd-chip-ai text-[10px] font-mono">STAFF MENTOR HUB</span>
              </div>
              <p className="text-slate-500 text-sm">
                Manage your student cohorts, 1:1 architecture screens, PR reviews, and hourly INR revenue.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="btn-primary text-xs py-2 flex items-center gap-1.5"
              >
                <Plus size={14} /> Schedule Session
              </button>
            </div>
          </div>

          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">TOTAL SESSIONS</span>
              <p className="text-2xl font-bold text-slate-900 font-mono">142</p>
              <p className="text-[11px] text-emerald-600 font-medium">+8 completed this month</p>
            </div>
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">AVG. REPUTATION RATING</span>
              <p className="text-2xl font-bold text-amber-500 font-mono flex items-center gap-1.5">
                <Star size={20} className="fill-amber-500 text-amber-500" /> 4.98
              </p>
              <p className="text-[11px] text-slate-500">From 118 verified student reviews</p>
            </div>
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">ACTIVE MENTEES</span>
              <p className="text-2xl font-bold text-indigo-900 font-mono">23</p>
              <p className="text-[11px] text-indigo-600 font-medium">{requests.length} pending requests</p>
            </div>
            <div className="dd-card p-4 space-y-1">
              <span className="text-xs text-slate-400 font-mono">MONTHLY REVENUE (INR)</span>
              <p className="text-2xl font-bold text-emerald-700 font-mono">₹2,35,000</p>
              <p className="text-[11px] text-emerald-600 font-medium">+₹28,000 vs last month</p>
            </div>
          </div>

          {/* Sub Navigation Bar (7 Sections as requested) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
            {[
              { id: "sessions", label: `Sessions (${sessions.length})` },
              { id: "requests", label: `Requests (${requests.length})` },
              { id: "learners", label: "Matched Learners" },
              { id: "code-review", label: "Code Review Queue" },
              { id: "career-prep", label: "Career & Interview Tools" },
              { id: "reviews", label: "Ratings & Reputation" },
              { id: "profile", label: "Profile & Pricing" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SECTION 1: Sessions */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              <div className="dd-card divide-y divide-slate-100 overflow-hidden">
                {sessions.map((s) => (
                  <div key={s.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {s.learner.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div className="space-y-0.5 truncate">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900 truncate">{s.learner}</h3>
                          <span className="dd-chip-completed text-[9px]">{s.amount} Paid</span>
                          {s.status === "rescheduled" && (
                            <span className="dd-chip-pending text-[9px]">Rescheduled</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{s.topic}</p>
                        <p className="text-[11px] font-mono text-slate-400">{s.date} · {s.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedLearner(s.learner)}
                        className="btn-ghost text-xs py-1.5 hidden sm:inline-flex"
                      >
                        Learner Profile
                      </button>
                      <button
                        onClick={() => setReschedulingSession(s)}
                        className="btn-ghost text-xs py-1.5"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => toast.success(`Launching secure 1:1 WebRTC Video Session with ${s.learner}`)}
                        className="btn-primary text-xs py-1.5"
                      >
                        <Video size={13} /> Join Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: Learner Requests */}
          {activeTab === "requests" && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="dd-card p-10 text-center text-slate-400 space-y-2">
                  <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
                  <p className="font-bold text-sm text-slate-700">All Learner Requests Processed</p>
                  <p className="text-xs">You're completely caught up on your mentee queue.</p>
                </div>
              ) : (
                <div className="dd-card divide-y divide-slate-100 overflow-hidden">
                  {requests.map((req) => (
                    <div key={req.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {req.avatar}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-slate-900">{req.name}</h3>
                            {req.urgent && <span className="dd-chip-error text-[9px]">Urgent</span>}
                            <span className="dd-chip-slate text-[9px]">{req.level}</span>
                          </div>
                          <p className="text-xs text-slate-600">{req.goal}</p>
                          <p className="text-[11px] font-mono text-slate-400">Requested time slot: {req.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedLearner(req.name)}
                          className="btn-ghost text-xs py-1.5 hidden md:inline-flex"
                        >
                          View Portfolio
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(req.id, req.name)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-rose-600 border border-slate-200 rounded-lg transition-colors"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(req)}
                          className="btn-primary text-xs py-1.5"
                        >
                          Accept & Book (₹{hourlyRate})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: Matched Learners List */}
          {activeTab === "learners" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MATCHED_LEARNERS.map((l) => (
                <div key={l.id} className="dd-card p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {l.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{l.name}</h4>
                        <p className="text-xs text-slate-500 truncate">{l.role}</p>
                      </div>
                    </div>
                    <span className="dd-chip-ai text-[10px]">{l.level}</span>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Syllabus Progress</span>
                        <span className="font-bold text-indigo-900 font-mono">{l.progress}%</span>
                      </div>
                      <div className="progress-track h-1.5">
                        <div className="progress-fill" style={{ width: `${l.progress}%` }} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">Status: {l.status}</p>
                  </div>

                  <button
                    onClick={() => setSelectedLearner(l.name)}
                    className="btn-primary text-xs py-2 w-full justify-center flex items-center gap-1.5"
                  >
                    <span>View Full Developer Portfolio</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 4: Code Review Queue */}
          {activeTab === "code-review" && (
            <div className="space-y-4">
              <div className="dd-card divide-y divide-slate-100 overflow-hidden">
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      P1 REVIEW · 2 HAZARDS
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">PR #42: Cache Invalidation Pipeline & Redis Fallback</h3>
                    <p className="text-xs text-slate-500">Author: Alex Volkov · Go 1.22 · internal/cache/redis_store.go</p>
                  </div>
                  <button
                    onClick={() => navigate("/code-review")}
                    className="btn-primary text-xs py-2 shrink-0 flex items-center gap-1.5"
                  >
                    <GitPullRequest size={13} /> Review Diff
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: Career & Interview Prep Tools */}
          {activeTab === "career-prep" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="dd-card p-5 space-y-3">
                <h3 className="font-bold text-base text-slate-900">Mock Technical Screen Question Bank</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Generate realistic FAANG-calibrated system design and concurrency screening rubrics.
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 bg-slate-50 rounded-lg">1. Design a multi-tenant Rate Limiter with burst capacity</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">2. Raft Leader Election Split-Vote Partition Recovery</div>
                  <div className="p-2.5 bg-slate-50 rounded-lg">3. Lock-free MPSC channel in Go using sync/atomic</div>
                </div>
                <button
                  onClick={() => toast.success("Question bank exported to PDF rubric!")}
                  className="btn-primary text-xs py-2 w-full justify-center"
                >
                  Generate Evaluation Rubric
                </button>
              </div>

              <div className="dd-card p-5 space-y-3">
                <h3 className="font-bold text-base text-slate-900">Candidate Readiness Attestation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Directly sign off on a mentee's skill competencies to fast-track their profile to partner companies.
                </p>
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-lg text-xs border border-emerald-200">
                  Attestations signed by verified Staff Mentors grant automatic recruiter screen bypasses at Stripe and Datadog.
                </div>
                <button
                  onClick={() => toast.success("Candidate attestation certificate generator launched.")}
                  className="btn-ghost text-xs py-2 w-full justify-center"
                >
                  Create Mentorship Attestation
                </button>
              </div>
            </div>
          )}

          {/* SECTION 6: Reviews & Revenue Charts */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Dynamic Recharts Revenue Graph */}
              <div className="dd-card p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Mentor Monthly Revenue & Sessions</h3>
                    <p className="text-xs text-slate-500">Track earnings in Indian Rupees (₹)</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700">₹4,800/session</span>
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MENTOR_CHART_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                      />
                      <Bar dataKey="revenue" fill="#312E81" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reviews List */}
              <div className="dd-card divide-y divide-slate-100 overflow-hidden">
                {MENTOR_REVIEWS.map((r, i) => (
                  <div key={i} className="p-4 sm:p-5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-slate-900">{r.name}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} size={12} className="text-amber-500 fill-amber-500" />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: Profile & Pricing */}
          {activeTab === "profile" && (
            <div className="dd-card p-6 space-y-5 max-w-xl">
              <h3 className="font-bold text-base text-slate-900">Mentor Availability & INR Pricing</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Hourly Session Rate (₹ INR)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="dd-input text-sm font-mono"
                  />
                  <p className="text-slate-400 text-[11px] mt-1">Average platform rate: ₹4,500/session.</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="font-semibold text-slate-800 block">Available for New Learner Bookings</span>
                    <span className="text-slate-400 text-[11px]">Shows active presence on public Mentors directory</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.value)}
                    className="h-4 w-4 rounded accent-indigo-900 cursor-pointer"
                  />
                </div>
                <button
                  onClick={() => toast.success("Mentor profile & hourly rate updated successfully!")}
                  className="btn-primary text-xs py-2 w-full justify-center"
                >
                  Save Profile Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shared Developer Portfolio Modal */}
      <DeveloperPortfolioModal
        open={!!selectedLearner}
        onClose={() => setSelectedLearner(null)}
        developerName={selectedLearner ?? CURRENT_USER.name}
      />

      {/* Schedule / Reschedule Modal */}
      {(scheduleModalOpen || reschedulingSession) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              {reschedulingSession ? "Reschedule Session" : "Schedule 1:1 Session"}
            </h3>
            <div className="space-y-3 text-xs">
              {!reschedulingSession && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Session Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Distributed Consensus & Raft Formal Invariants"
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    className="dd-input text-xs"
                  />
                </div>
              )}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Date & Time</label>
                <input
                  type="text"
                  placeholder="e.g. Thursday · 6:30 PM IST"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="dd-input text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setScheduleModalOpen(false);
                  setReschedulingSession(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={reschedulingSession ? handleReschedule : handleCreateSession}
                className="btn-primary text-xs py-2"
              >
                {reschedulingSession ? "Confirm Reschedule" : "Confirm Session"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
