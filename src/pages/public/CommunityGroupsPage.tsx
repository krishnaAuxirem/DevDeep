import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users, Search, Clock, BookOpen, Calendar, CheckCircle2,
  ArrowRight, ShieldCheck, Sparkles, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  membersCount: number;
  meetingSchedule: string;
  currentReading: string;
  level: "Intermediate" | "Advanced" | "Expert";
  tags: string[];
}

const STUDY_GROUPS: StudyGroup[] = [
  {
    id: "grp-raft",
    name: "Raft & Distributed State Machines Cohort",
    topic: "Formal invariants in consensus algorithms and multi-datacenter replication.",
    membersCount: 420,
    meetingSchedule: "Every Saturday at 6:00 PM IST",
    currentReading: "Ongaro & Ousterhout Raft Consensus Dissertation (Stanford)",
    level: "Expert",
    tags: ["Raft", "Consensus", "Distributed Systems", "Go"],
  },
  {
    id: "grp-concurrency",
    name: "Go Concurrency & Lock-Free Structures Guild",
    topic: "Investigating atomic CPU primitives, memory fences, and zero-allocation queue designs.",
    membersCount: 680,
    meetingSchedule: "Every Tuesday at 8:00 PM IST",
    currentReading: "The Art of Multiprocessor Programming (Herlihy & Shavit)",
    level: "Advanced",
    tags: ["Go", "Atomics", "Memory Model", "Concurrency"],
  },
  {
    id: "grp-storage",
    name: "LSM-Tree & Database Storage Engines Club",
    topic: "Disk write-ahead logging, SSTable block compression, and bloom filter sizing.",
    membersCount: 310,
    meetingSchedule: "Every Thursday at 7:00 PM IST",
    currentReading: "Database Internals: A Deep Dive into Distributed Data Systems",
    level: "Expert",
    tags: ["RocksDB", "LSM-Tree", "B-Tree", "PostgreSQL"],
  },
  {
    id: "grp-systems",
    name: "Staff Engineer Career & RFC Architecture Ring",
    topic: "Senior engineering leadership, RFC evaluation, and FAANG staff interview screens.",
    membersCount: 890,
    meetingSchedule: "Bi-weekly Sundays at 11:00 AM IST",
    currentReading: "Staff Engineer: Leadership beyond the management track",
    level: "Advanced",
    tags: ["Architecture", "Leadership", "System Design", "Staff"],
  },
];

export default function CommunityGroupsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  const filtered = STUDY_GROUPS.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoin = (group: StudyGroup) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to join ${group.name}.`,
      });
      navigate(`/register?redirect=/community/groups`);
      return;
    }

    if (joinedGroups.includes(group.id)) {
      toast.info(`Already a member of ${group.name}`);
      return;
    }

    setJoinedGroups((prev) => [...prev, group.id]);
    toast.success(`Joined ${group.name}!`, {
      description: `Meeting calendar invitation sent for ${group.meetingSchedule}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold">
            <Users size={13} className="text-cyan-600" />
            <span>PEER READING COHORTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Engineering Study Groups
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Collaborative reading cohorts dissecting foundational academic papers, storage engines, and high-performance concurrency algorithms.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-xl mx-auto w-full">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search study groups by topic, paper, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((g) => {
            const isMember = joinedGroups.includes(g.id);
            return (
              <div
                key={g.id}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {g.level} Track
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Users size={12} className="text-indigo-600" /> {g.membersCount} Members
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                      {g.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {g.topic}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5 font-mono">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar size={13} className="text-indigo-600 shrink-0" />
                      <span>{g.meetingSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <BookOpen size={13} className="text-cyan-600 shrink-0" />
                      <span className="truncate">Reading: {g.currentReading}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {g.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Google Meet + Slack channel</span>
                  <button
                    onClick={() => handleJoin(g)}
                    disabled={isMember}
                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                      isMember
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-indigo-900 hover:bg-indigo-950 text-white active:scale-[0.98]"
                    }`}
                  >
                    <span>{isMember ? "Joined Group ✓" : "Join Study Group"}</span>
                    {!isMember && <ArrowRight size={13} />}
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
