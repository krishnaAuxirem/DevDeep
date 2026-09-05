import { useState, useEffect } from "react";
import {
  Activity, Zap, Award, User, Send, CheckCircle2,
  GitPullRequest, MessageSquare, Play, Pause, Bell
} from "lucide-react";

export interface StreamEvent {
  id: string;
  type: "badge" | "learner" | "application" | "review" | "comment" | "deploy";
  title: string;
  description: string;
  timestamp: string;
  author: string;
  badge?: string;
}

const POOL_EVENTS: StreamEvent[] = [
  {
    id: "e-init-1",
    type: "badge",
    title: "Badge Attestation Earned",
    description: "Earned 'Concurrency Architect' badge (passed with 0 data races).",
    timestamp: "Just now",
    author: "Alex Volkov",
    badge: "Staff L7",
  },
  {
    id: "e-init-2",
    type: "learner",
    title: "1:1 Review Request",
    description: "Priya Nair requested 45-min review on Raft Consensus RPCs.",
    timestamp: "1m ago",
    author: "Priya Nair",
    badge: "Mentorship",
  },
  {
    id: "e-init-3",
    type: "application",
    title: "Talent Scout Profile View",
    description: "Stripe Principal Recruiter reviewed your Systems Scorecard.",
    timestamp: "3m ago",
    author: "Stripe Talent",
    badge: "Career Radar",
  },
  {
    id: "e-init-4",
    type: "review",
    title: "AI AST Patch Validated",
    description: "Lock-Free Ring Buffer patch passed 10,000 Goroutine stress tests.",
    timestamp: "6m ago",
    author: "DevDeep AI",
    badge: "AST Verified",
  },
  {
    id: "e-pool-1",
    type: "deploy",
    title: "Sandbox Cluster Node Deployed",
    description: "S3 Object Store chunking pipeline passed all 18 cluster integration tests.",
    timestamp: "Just now",
    author: "CI Telemetry",
    badge: "Verified Lab",
  },
  {
    id: "e-pool-2",
    type: "comment",
    title: "New Architectural Discussion",
    description: "Marcus Thorne commented: 'Have you benchmarked epoll vs io_uring here?'",
    timestamp: "Just now",
    author: "Marcus Thorne",
    badge: "Community",
  },
  {
    id: "e-pool-3",
    type: "learner",
    title: "New Course Enrollment",
    description: "Ryo Tanaka enrolled in 'Distributed Systems Engineering in Go'.",
    timestamp: "Just now",
    author: "Ryo Tanaka",
    badge: "Learner",
  },
  {
    id: "e-pool-4",
    type: "application",
    title: "Direct Referral Fast-Track",
    description: "Sarvam AI hiring lead sent direct interview invitation (₹65L - ₹85L).",
    timestamp: "Just now",
    author: "Sarvam AI",
    badge: "Scout Fast-Lane",
  },
];

interface LiveActivityStreamProps {
  compact?: boolean;
  maxItems?: number;
  className?: string;
  title?: string;
}

export default function LiveActivityStream({
  compact = false,
  maxItems = 4,
  className = "",
  title = "Live Activity Telemetry",
}: LiveActivityStreamProps) {
  const [events, setEvents] = useState<StreamEvent[]>(POOL_EVENTS.slice(0, maxItems));
  const [isLive, setIsLive] = useState(true);

  // Simulated live event ticker
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * POOL_EVENTS.length);
      const nextEvent = {
        ...POOL_EVENTS[nextIndex],
        id: `stream-${Date.now()}`,
        timestamp: "Just now",
      };

      setEvents((prev) => [nextEvent, ...prev.slice(0, maxItems - 1)]);
    }, 12000); // fresh event every 12 seconds

    return () => clearInterval(interval);
  }, [isLive, maxItems]);

  const getEventIcon = (type: StreamEvent["type"]) => {
    switch (type) {
      case "badge":
        return <Award size={14} className="text-amber-500" />;
      case "learner":
        return <User size={14} className="text-indigo-600" />;
      case "application":
        return <Send size={14} className="text-emerald-600" />;
      case "review":
        return <GitPullRequest size={14} className="text-cyan-600" />;
      case "comment":
        return <MessageSquare size={14} className="text-purple-600" />;
      case "deploy":
        return <CheckCircle2 size={14} className="text-blue-600" />;
    }
  };

  return (
    <div className={`dd-card overflow-hidden bg-white ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
          <span className="text-xs font-bold text-slate-900 tracking-tight">{title}</span>
          <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
            {isLive ? "LIVE STREAM" : "PAUSED"}
          </span>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1 transition-colors"
          title={isLive ? "Pause live feed" : "Resume live feed"}
        >
          {isLive ? <Pause size={12} /> : <Play size={12} />}
          <span className="text-[11px] hidden sm:inline">{isLive ? "Pause" : "Resume"}</span>
        </button>
      </div>

      {/* Stream List */}
      <div className="divide-y divide-slate-100">
        {events.map((evt) => (
          <div
            key={evt.id}
            className={`p-3.5 hover:bg-slate-50/80 transition-colors flex items-start gap-3 animate-fade-in ${
              compact ? "py-2.5" : ""
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
              {getEventIcon(evt.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-xs font-semibold text-slate-900 truncate">{evt.title}</span>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{evt.timestamp}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 leading-snug">{evt.description}</p>
            </div>
            {evt.badge && (
              <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0 hidden sm:inline-block">
                {evt.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
