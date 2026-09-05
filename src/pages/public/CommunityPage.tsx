import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare, Users, Award, Calendar, Sparkles,
  ArrowRight, Search, CheckCircle2, TrendingUp, Terminal, Star
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function CommunityPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please log in to start a new discussion or RFC thread.",
      });
      navigate("/register?redirect=/community/discussions");
      return;
    }
    navigate("/community/discussions");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Users size={13} className="text-indigo-600" />
            <span>38,000+ SYSTEMS ENGINEERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            DevDeep Engineering Community
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Collaborate on distributed systems RFCs, join lock-free concurrency study groups, compete in global hackathons, and showcase production open-source architectures.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleCreatePost}
              className="px-6 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs shadow-sm transition-all"
            >
              + Start Discussion RFC
            </button>
            <Link
              to="/community/discussions"
              className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Browse All Discussions
            </Link>
          </div>
        </div>

        {/* 5 Community Pillars Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Discussions",
              desc: "Architecture RFCs & deep engineering questions",
              path: "/community/discussions",
              icon: <MessageSquare size={18} className="text-indigo-600" />,
              count: "4,200+ Threads",
            },
            {
              title: "Study Groups",
              desc: "Collaborative reading & lab cohorts",
              path: "/community/groups",
              icon: <Users size={18} className="text-cyan-600" />,
              count: "48 Active Groups",
            },
            {
              title: "Project Showcase",
              desc: "Peer-reviewed developer capstones",
              path: "/community/showcase",
              icon: <Sparkles size={18} className="text-amber-600" />,
              count: "320+ Projects",
            },
            {
              title: "Hackathons",
              desc: "Distributed systems build competitions",
              path: "/community/hackathons",
              icon: <Award size={18} className="text-emerald-600" />,
              count: "₹15 Lakh Prize Pool",
            },
            {
              title: "Events & Talks",
              desc: "Live tech talks & system design AMAs",
              path: "/community/events",
              icon: <Calendar size={18} className="text-purple-600" />,
              count: "Weekly Schedule",
            },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.path}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-indigo-700 font-semibold">
                <span>{card.count}</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Trending Discussions Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 tracking-wider">
                LIVE ACTIVITY
              </span>
              <h2 className="text-xl font-bold text-slate-900">Trending Engineering Discussions</h2>
            </div>
            <Link
              to="/community/discussions"
              className="text-xs font-semibold text-indigo-700 hover:underline flex items-center gap-1"
            >
              <span>View All Discussions</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                title: "RFC #92: Zero-Copy Memory Ring Buffer in Go 1.22 with sync.Pool Tuning",
                author: "Alex Volkov",
                role: "Staff Engineer",
                replies: 48,
                tag: "Go / Memory",
                time: "2 hours ago",
              },
              {
                title: "Handling Split-Brain Consensus in Raft under Asymmetric Network Partitions",
                author: "Priya Sharma",
                role: "Distributed Systems Lead",
                replies: 82,
                tag: "Distributed Systems",
                time: "4 hours ago",
              },
              {
                title: "PostgreSQL 17 B-Tree Deduplication vs BRIN for 100M Transaction Records",
                author: "Devendra K.",
                role: "Database Architect",
                replies: 31,
                tag: "Databases",
                time: "Yesterday",
              },
              {
                title: "Rust vs Go for LSM-Tree Storage Engines: Empirical Allocations & Compaction Throughput",
                author: "Dr. Marcus Vance",
                role: "Principal Systems Architect",
                replies: 65,
                tag: "Storage Engines",
                time: "2 days ago",
              },
            ].map((disc, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors rounded-lg px-2"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {disc.tag}
                    </span>
                    <span className="text-slate-600 font-semibold">{disc.author}</span>
                    <span className="text-slate-400">({disc.role})</span>
                    <span className="text-slate-400">• {disc.time}</span>
                  </div>
                  <Link
                    to="/community/discussions"
                    className="font-bold text-sm text-slate-900 hover:text-indigo-900 transition-colors block truncate"
                  >
                    {disc.title}
                  </Link>
                </div>
                <div className="shrink-0 text-right font-mono text-xs text-slate-500">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                    {disc.replies} replies
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
