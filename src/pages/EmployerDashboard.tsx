import { useState } from "react";
import {
  Search, Briefcase, Users, CheckCircle2, Star, MapPin,
  Filter, ChevronRight, Mail, Calendar, Zap, Building2,
  BarChart3, UserCheck, Clock, Bell, Plus
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { useAuth } from "@/lib/auth";

const CANDIDATES = [
  { id: "d1", name: "Alex Volkov", title: "Staff Distributed Systems Engineer", level: "Staff L7", score: 94, location: "San Francisco, CA", skills: ["Go", "Raft", "Distributed Systems"], availability: "Open to offers", avatar: "AV" },
  { id: "d2", name: "Priya Sharma", title: "Senior Software Engineer", level: "Senior L5", score: 88, location: "Bangalore, IN", skills: ["Rust", "Edge Computing", "WASM"], availability: "Open to offers", avatar: "PS" },
  { id: "d3", name: "James Chen", title: "Principal Database Engineer", level: "Principal L6", score: 96, location: "New York, NY", skills: ["RocksDB", "LSM-Trees", "Storage"], availability: "Passive", avatar: "JC" },
  { id: "d4", name: "Ryo Tanaka", title: "Mid-Level Backend Engineer", level: "Mid L3", score: 76, location: "Tokyo, JP", skills: ["Go", "Kubernetes", "gRPC"], availability: "Actively looking", avatar: "RT" },
];

const EMPLOYER_STATS = [
  { label: "Active Postings", value: "4", sub: "2 closing soon", icon: <Briefcase size={14} />, color: "text-indigo-900" },
  { label: "Shortlisted", value: "12", sub: "3 in final round", icon: <UserCheck size={14} />, color: "text-eblue-600" },
  { label: "Assessments Sent", value: "8", sub: "6 completed", icon: <CheckCircle2 size={14} />, color: "text-success" },
  { label: "Avg. Time to Hire", value: "14d", sub: "-3d vs avg", icon: <Clock size={14} />, color: "text-ai-dark" },
];

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"search" | "shortlist" | "postings">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const toggleShortlist = (id: string) => {
    setShortlisted(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const filtered = CANDIDATES.filter(c =>
    !searchQuery ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5 max-w-[1200px] mx-auto">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
                    Talent Hub — {user?.name}
                  </h1>
                  <span className="dd-chip bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">🏢 EMPLOYER</span>
                </div>
                <p className="text-slate-500 text-sm">Search verified developers, shortlist candidates, and manage your hiring pipeline.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost text-xs">
                  <Bell size={13} /> Notifications
                </button>
                <button className="btn-primary text-sm">
                  <Plus size={14} /> Post a Role
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {EMPLOYER_STATS.map(stat => (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">{stat.label}</p>
                    <span className="text-slate-400">{stat.icon}</span>
                  </div>
                  <p className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
                  <p className="text-slate-400 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="dd-card overflow-hidden">
              <div className="flex border-b border-slate-100 px-4">
                {(["search", "shortlist", "postings"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${activeTab === tab ? "text-slate-900 border-indigo-900" : "text-slate-400 border-transparent hover:text-slate-700"}`}
                  >
                    {tab === "search" ? "Search Developers" : tab === "shortlist" ? `Shortlist (${shortlisted.length})` : "Job Postings"}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === "search" && (
                  <>
                    {/* Search bar */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search by name, skill, language..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="dd-input pl-9"
                        />
                      </div>
                      <button className="btn-ghost text-sm"><Filter size={13} /> Filters</button>
                    </div>

                    <div className="space-y-3">
                      {filtered.map(dev => (
                        <div key={dev.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-md hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                          <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold shrink-0">
                            {dev.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-slate-900 font-bold">{dev.name}</p>
                              <span className="dd-chip-indigo text-[10px]">{dev.level}</span>
                              <span className={`dd-chip text-[10px] ${dev.availability === "Actively looking" ? "dd-chip-completed" : dev.availability === "Open to offers" ? "dd-chip-blue" : "dd-chip-slate"}`}>
                                {dev.availability}
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm">{dev.title}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={11} />{dev.location}</span>
                              <div className="flex gap-1">
                                {dev.skills.map(s => <span key={s} className="dd-chip-slate text-[10px]">{s}</span>)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="flex items-center gap-1.5 justify-end mb-1">
                              <Zap size={12} className="text-ai" />
                              <span className="text-slate-900 font-bold text-sm">{dev.score}/100</span>
                            </div>
                            <p className="text-slate-400 text-[10px]">DevDeep Score</p>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <button
                              onClick={() => toggleShortlist(dev.id)}
                              className={`text-xs py-1.5 px-3 rounded-sm font-semibold border transition-all ${shortlisted.includes(dev.id) ? "bg-indigo-50 text-indigo-700 border-indigo-300" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
                            >
                              {shortlisted.includes(dev.id) ? "✓ Shortlisted" : "Shortlist"}
                            </button>
                            <button className="btn-primary text-xs">
                              <Mail size={11} /> Reach Out
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "shortlist" && (
                  <div className="space-y-3">
                    {shortlisted.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <UserCheck size={32} className="mb-3 text-slate-300" />
                        <p className="text-sm font-medium">No candidates shortlisted yet</p>
                        <p className="text-xs mt-1">Go to "Search Developers" and shortlist candidates.</p>
                      </div>
                    ) : (
                      CANDIDATES.filter(c => shortlisted.includes(c.id)).map(dev => (
                        <div key={dev.id} className="flex items-center gap-4 p-4 border border-indigo-200 bg-indigo-50/40 rounded-md">
                          <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold shrink-0 text-sm">
                            {dev.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-900 font-bold">{dev.name}</p>
                            <p className="text-slate-500 text-sm">{dev.title}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button className="btn-ghost text-xs"><Calendar size={11} /> Interview</button>
                            <button className="btn-primary text-xs"><CheckCircle2 size={11} /> Assess</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "postings" && (
                  <div className="space-y-3">
                    {[
                      { title: "Staff Distributed Systems Engineer", applicants: 42, closing: "7 days", status: "Active" },
                      { title: "Senior Go Engineer — Edge Infrastructure", applicants: 28, closing: "14 days", status: "Active" },
                      { title: "Database Engineer (Storage Team)", applicants: 15, closing: "Closed", status: "Closed" },
                    ].map((j, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-md">
                        <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          <Building2 size={16} className="text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-slate-900 font-semibold">{j.title}</p>
                            <span className={`dd-chip text-[10px] ${j.status === "Active" ? "dd-chip-completed" : "dd-chip-slate"}`}>{j.status}</span>
                          </div>
                          <p className="text-slate-400 text-xs">{j.applicants} applicants · {j.status === "Active" ? `Closes in ${j.closing}` : "Closed"}</p>
                        </div>
                        <button className="btn-ghost text-xs shrink-0">
                          <BarChart3 size={11} /> View Applications <ChevronRight size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
