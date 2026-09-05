import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass, Search, MapPin, IndianRupee, Clock, Building2,
  Filter, ArrowRight, ShieldCheck, CheckCircle2, Bookmark, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface InternshipItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string[];
  isRemote: boolean;
  applicants: number;
  description: string;
}

const INTERNSHIPS_DATA: InternshipItem[] = [
  {
    id: "intern-1",
    title: "Systems Engineering Intern (Go & Microservices)",
    company: "Razorpay",
    logo: "RZ",
    location: "Bengaluru, India",
    stipend: "₹65,000 / month",
    duration: "6 Months",
    skills: ["Go", "Kafka", "PostgreSQL", "Docker"],
    isRemote: true,
    applicants: 142,
    description: "Work with the core payment rails team optimizing idempotency keys, webhook throughput, and ledger audit pipelines.",
  },
  {
    id: "intern-2",
    title: "Distributed Storage Intern (LSM & RocksDB)",
    company: "Zerodha",
    logo: "ZD",
    location: "Bengaluru, India",
    stipend: "₹75,000 / month",
    duration: "6 Months",
    skills: ["Go", "C++", "RocksDB", "LSM-Tree"],
    isRemote: false,
    applicants: 89,
    description: "Assist in architecting low-latency order book tick storage with write-ahead logging and zero-allocation memory pools.",
  },
  {
    id: "intern-3",
    title: "Cloud Infrastructure & eBPF Intern",
    company: "Postman",
    logo: "PM",
    location: "Hyderabad, India",
    stipend: "₹60,000 / month",
    duration: "3 Months",
    skills: ["Linux", "eBPF", "Go", "Kubernetes"],
    isRemote: true,
    applicants: 110,
    description: "Build automated telemetry probes capturing p99 request latency and container memory escape analysis.",
  },
  {
    id: "intern-4",
    title: "Full-Stack Backend Intern (Node & Distributed Queues)",
    company: "Swiggy",
    logo: "SW",
    location: "Bengaluru, India",
    stipend: "₹50,000 / month",
    duration: "6 Months",
    skills: ["TypeScript", "Redis", "BullMQ", "AWS"],
    isRemote: true,
    applicants: 230,
    description: "Implement high-throughput real-time order dispatch coordination and geohash spatial indexing.",
  },
  {
    id: "intern-5",
    title: "Compiler & AST Static Analysis Intern",
    company: "DevDeep Labs",
    logo: "DD",
    location: "Remote",
    stipend: "₹80,000 / month",
    duration: "6 Months",
    skills: ["Go", "AST", "Parsers", "Static Analysis"],
    isRemote: true,
    applicants: 64,
    description: "Build semantic linting rules and race hazard detectors for our browser-based cloud sandbox kernels.",
  },
];

export default function InternshipsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const filtered = INTERNSHIPS_DATA.filter((item) => {
    const matchesRemote = !remoteOnly || item.isRemote;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRemote && matchesSearch;
  });

  const handleApply = (internship: InternshipItem) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in or register to submit your verified application to ${internship.company}.`,
      });
      navigate(`/register?redirect=/internships`);
      return;
    }

    if (appliedIds.includes(internship.id)) {
      toast.info("Already applied to this internship opportunity.");
      return;
    }

    setAppliedIds((prev) => [...prev, internship.id]);
    toast.success(`Application submitted to ${internship.company}!`, {
      description: "Your verified DevDeep skill scorecard has been transmitted to recruiting.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Compass size={13} className="text-indigo-600" />
            <span>VERIFIED STUDENT & EARLY CAREER TRACK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Engineering Internships
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            High-stipend engineering internships at top tech companies. Direct radar applications verified by your DevDeep benchmark scorecard.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by role, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                remoteOnly
                  ? "bg-indigo-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>Remote Only</span>
              {remoteOnly && <Check size={12} />}
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing {filtered.length} active opportunities
          </span>
        </div>

        {/* Internships Grid */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const hasApplied = appliedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {item.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-900 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-indigo-700 font-semibold">{item.company}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-bold text-emerald-700">
                      <IndianRupee size={12} /> {item.stipend}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {item.location} {item.isRemote && "(Remote Available)"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex md:flex-col items-center gap-2">
                  <button
                    onClick={() => handleApply(item)}
                    disabled={hasApplied}
                    className={`w-full md:w-36 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      hasApplied
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-indigo-900 hover:bg-indigo-950 text-white active:scale-[0.98]"
                    }`}
                  >
                    <span>{hasApplied ? "Applied ✓" : "Apply with Scorecard"}</span>
                    {!hasApplied && <ArrowRight size={13} />}
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
