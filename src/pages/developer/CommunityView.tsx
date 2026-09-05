import { useState } from "react";
import {
  MessageSquare, Users, Calendar, UserCheck, Plus,
  ThumbsUp, Share2, Check, UserPlus, ArrowRight
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { toast } from "sonner";

interface CommunityViewProps {
  initialTab?: "discussions" | "groups" | "events" | "following";
}

interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  tag: string;
  likes: number;
  replies: number;
  time: string;
}

const INITIAL_THREADS: DiscussionThread[] = [
  {
    id: "dt-1",
    title: "Why does channel mutex lock contention spike when workers scale from 1k to 10k Goroutines?",
    author: "Alex Volkov",
    avatar: "AV",
    tag: "Concurrency",
    likes: 42,
    replies: 18,
    time: "2h ago",
  },
  {
    id: "dt-2",
    title: "PostgreSQL 17 B-Tree Index Deduplication Benchmarks under 50k Concurrent Writes",
    author: "Priya Sharma",
    avatar: "PS",
    tag: "Databases",
    likes: 89,
    replies: 34,
    time: "5h ago",
  },
  {
    id: "dt-3",
    title: "RFC: Zero-Allocation Go Chunker for S3 multipart upload streaming",
    author: "Devendra K.",
    avatar: "DK",
    tag: "Architecture",
    likes: 64,
    replies: 22,
    time: "1d ago",
  },
];

const INITIAL_GROUPS = [
  { id: "g1", name: "Distributed Systems & Raft Cohort", members: 420, active: "12 active now", joined: true },
  { id: "g2", name: "Lock-Free & Kernel eBPF Specialists", members: 215, active: "6 active now", joined: false },
  { id: "g3", name: "FAANG+ Staff Engineering Prep", members: 680, active: "34 active now", joined: true },
];

const INITIAL_EVENTS = [
  { id: "ev1", title: "Distributed Consensus Hackathon 2026", date: "Starts in 4 Days", prize: "₹2,50,000 INR Pool", rsvp: false },
  { id: "ev2", title: "Live Architecture Review: S3 Chunking with Alexei Volkov", date: "Thursday · 6:30 PM IST", prize: "Free for Pro", rsvp: true },
];

const INITIAL_PEOPLE = [
  { id: "p1", name: "Anand Raghavan", role: "Staff Engineer @ Stripe", avatar: "AR", following: true },
  { id: "p2", name: "Priya Sharma", role: "Principal Architect @ Datadog", avatar: "PS", following: true },
  { id: "p3", name: "Sarah Chen", role: "Lead Systems Architect @ Cloudflare", avatar: "SC", following: false },
  { id: "p4", name: "Marcus Thorne", role: "Telemetry Lead @ Datadog", avatar: "MT", following: false },
];

export default function CommunityView({ initialTab }: CommunityViewProps) {
  const [activeTab, setActiveTab] = useState<"discussions" | "groups" | "events" | "following">(initialTab ?? "discussions");
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [newPostModal, setNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const toggleGroupJoin = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const joined = !g.joined;
          toast.success(joined ? `Joined ${g.name}` : `Left ${g.name}`);
          return { ...g, joined };
        }
        return g;
      })
    );
  };

  const toggleEventRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const rsvp = !e.rsvp;
          toast.success(rsvp ? `RSVP confirmed for ${e.title}!` : `RSVP cancelled.`);
          return { ...e, rsvp };
        }
        return e;
      })
    );
  };

  const toggleFollow = (id: string) => {
    setPeople((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const following = !p.following;
          toast.success(following ? `Now following ${p.name}` : `Unfollowed ${p.name}`);
          return { ...p, following };
        }
        return p;
      })
    );
  };

  const handleCreatePost = () => {
    if (!newTitle.trim()) return;
    const newThread: DiscussionThread = {
      id: `dt-${Date.now()}`,
      title: newTitle,
      author: "Alex Volkov",
      avatar: "AV",
      tag: "Discussion",
      likes: 1,
      replies: 0,
      time: "Just now",
    };
    setThreads([newThread, ...threads]);
    setNewTitle("");
    setNewPostModal(false);
    toast.success("Discussion topic published to the community!");
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
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Developer Community</h1>
                <span className="dd-chip-purple text-[10px]">38,400+ ENGINEERS</span>
              </div>
              <p className="text-slate-500 text-sm">
                Discuss distributed architecture RFCs, join specialized study cohorts, and hackathon teams.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("discussions")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "discussions" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <MessageSquare size={13} />
                <span>Discussions</span>
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "groups" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Users size={13} />
                <span>Groups (3)</span>
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "events" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calendar size={13} />
                <span>Events</span>
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "following" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserCheck size={13} />
                <span>Following ({people.filter((p) => p.following).length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Discussions */}
          {activeTab === "discussions" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setNewPostModal(true)}
                  className="btn-primary text-xs py-2 flex items-center gap-1.5"
                >
                  <Plus size={14} /> New Discussion Topic
                </button>
              </div>

              <div className="dd-card divide-y divide-slate-100 overflow-hidden">
                {threads.map((t) => (
                  <div key={t.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {t.avatar}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-800">{t.author}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded font-semibold">
                            {t.tag}
                          </span>
                          <span className="text-[11px] text-slate-400">• {t.time}</span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 hover:text-indigo-900 cursor-pointer">
                          {t.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs text-slate-400 font-mono">
                      <button
                        onClick={() => {
                          setThreads((prev) =>
                            prev.map((th) => (th.id === t.id ? { ...th, likes: th.likes + 1 } : th))
                          );
                          toast.success("Upvoted topic!");
                        }}
                        className="flex items-center gap-1 hover:text-indigo-700"
                      >
                        <ThumbsUp size={13} />
                        <span>{t.likes}</span>
                      </button>
                      <span>{t.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Groups */}
          {activeTab === "groups" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {groups.map((grp) => (
                <div key={grp.id} className="dd-card p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-slate-900">{grp.name}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>{grp.members} members</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium">{grp.active}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleGroupJoin(grp.id)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                      grp.joined
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "btn-primary justify-center"
                    }`}
                  >
                    {grp.joined ? "Joined ✓" : "Join Group"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Events */}
          {activeTab === "events" && (
            <div className="space-y-4">
              {events.map((ev) => (
                <div key={ev.id} className="dd-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-indigo-700 font-bold">{ev.date}</span>
                    <h3 className="font-bold text-base text-slate-900">{ev.title}</h3>
                    <p className="text-xs text-slate-500 font-mono">Prize Pool / Tier: {ev.prize}</p>
                  </div>
                  <button
                    onClick={() => toggleEventRsvp(ev.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      ev.rsvp ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "btn-primary"
                    }`}
                  >
                    {ev.rsvp ? "RSVP Confirmed ✓" : "RSVP for Event"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Following */}
          {activeTab === "following" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {people.map((p) => (
                <div key={p.id} className="dd-card p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {p.avatar}
                    </div>
                    <div className="truncate">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{p.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{p.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                      p.following
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "btn-primary"
                    }`}
                  >
                    {p.following ? "Following ✓" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New Discussion Modal */}
          {newPostModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
                <h3 className="font-bold text-base text-slate-900">New Discussion Topic</h3>
                <textarea
                  placeholder="Enter your architectural question or RFC topic..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  rows={3}
                  className="w-full dd-input text-xs p-3 h-auto"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setNewPostModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button onClick={handleCreatePost} className="btn-primary text-xs py-2">
                    Publish Topic
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
