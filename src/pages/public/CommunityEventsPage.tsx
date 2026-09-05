import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar, Clock, Users, ArrowRight, Video, MapPin,
  CheckCircle2, Sparkles, Terminal, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface EventItem {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  date: string;
  time: string;
  attendees: number;
  type: "Live Workshop" | "Architecture AMA" | "Tech Talk";
  description: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-1",
    title: "Live Architectural Review: Building Fault-Tolerant LSM Storage Engines",
    speaker: "Alex Volkov",
    speakerRole: "Staff Distributed Systems Engineer",
    date: "Thursday, October 12, 2026",
    time: "7:00 PM – 8:30 PM IST",
    attendees: 480,
    type: "Live Workshop",
    description: "Deep dive into write-ahead logs, memtable concurrency with atomic CAS, and compaction heuristics.",
  },
  {
    id: "evt-2",
    title: "FAANG Staff Engineer Screen AMA: What Interviewers Actually Look For",
    speaker: "Dr. Marcus Vance",
    speakerRole: "Principal Architect",
    date: "Sunday, October 15, 2026",
    time: "5:00 PM – 6:30 PM IST",
    attendees: 720,
    type: "Architecture AMA",
    description: "Live mock evaluation of distributed caching tradeoffs, partition tolerance, and cross-region consensus.",
  },
  {
    id: "evt-3",
    title: "Zero-Allocation Go Concurrency in High-Throughput Ingestion",
    speaker: "James Chen",
    speakerRole: "Staff Infrastructure Engineer",
    date: "Wednesday, October 21, 2026",
    time: "8:00 PM – 9:00 PM IST",
    attendees: 310,
    type: "Tech Talk",
    description: "Profile memory allocation hotspots, understand CPU cache line bouncing, and benchmark sync.Pool.",
  },
];

export default function CommunityEventsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [rsvpIds, setRsvpIds] = useState<string[]>([]);

  const handleRsvp = (event: EventItem) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to RSVP for ${event.title}.`,
      });
      navigate(`/register?redirect=/community/events`);
      return;
    }

    if (rsvpIds.includes(event.id)) {
      toast.info("You have already RSVP'd for this event.");
      return;
    }

    setRsvpIds((prev) => [...prev, event.id]);
    toast.success(`RSVP confirmed for ${event.title}!`, {
      description: "Google Calendar invite and video access link dispatched to your email.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
            <Calendar size={13} className="text-purple-600" />
            <span>LIVE INTERACTIVE WORKSHOPS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Developer Events & AMAs
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Live technical sessions, system architecture dissections, and candid AMAs with verified Staff engineers.
          </p>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {EVENTS_DATA.map((evt) => {
            const hasRsvp = rsvpIds.includes(evt.id);
            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      {evt.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                      <Calendar size={12} className="text-indigo-600" /> {evt.date}
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {evt.time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs pt-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {evt.speaker.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-800">{evt.speaker}</span>
                    <span className="text-slate-400">({evt.speakerRole})</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono flex items-center gap-1">
                      <Users size={12} className="text-indigo-600" /> {evt.attendees} Registered
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleRsvp(evt)}
                    disabled={hasRsvp}
                    className={`w-full md:w-36 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      hasRsvp
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-indigo-900 hover:bg-indigo-950 text-white active:scale-[0.98]"
                    }`}
                  >
                    <span>{hasRsvp ? "RSVP Confirmed ✓" : "RSVP for Free"}</span>
                    {!hasRsvp && <ArrowRight size={13} />}
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
