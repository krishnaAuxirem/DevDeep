import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Laptop, Search, Clock, IndianRupee, MapPin, Building2,
  Filter, ArrowRight, ShieldCheck, CheckCircle2, Bookmark, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface FreelanceGig {
  id: string;
  title: string;
  client: string;
  budget: string;
  duration: string;
  location: string;
  skills: string[];
  proposals: number;
  description: string;
}

const FREELANCE_DATA: FreelanceGig[] = [
  {
    id: "free-1",
    title: "PostgreSQL 17 Database Migration & Sharding Architect",
    client: "Fintech Scaleup (Funded Series B)",
    budget: "₹3,50,000 - ₹5,000,000 (Fixed Contract)",
    duration: "6 Weeks",
    location: "Remote (India / APAC)",
    skills: ["PostgreSQL", "Citus", "Database Sharding", "Zero-Downtime"],
    proposals: 14,
    description: "Architect and execute live zero-downtime partitioning and sharding on a 14TB primary transactions database handling 12,000 writes/sec.",
  },
  {
    id: "free-2",
    title: "Go High-Throughput Webhook Ingestion Engine",
    client: "Enterprise SaaS Platform",
    budget: "₹4,000 / hr (Hourly Contract)",
    duration: "2 Months (20 hrs/wk)",
    location: "Remote",
    skills: ["Go", "Kafka", "Redis", "Distributed Systems"],
    proposals: 22,
    description: "Build an idempotent webhook dispatcher capable of delivering 400,000 webhook events per minute with exponential backoff.",
  },
  {
    id: "free-3",
    title: "Zero-Allocation gRPC Microservice Refactor",
    client: "AI Telemetry Infrastructure",
    budget: "₹2,80,000 (Milestone-based)",
    duration: "3 Weeks",
    location: "Remote",
    skills: ["Go", "gRPC", "Protobuf", "pprof", "Memory Tuning"],
    proposals: 9,
    description: "Profile memory allocations in hot-path gRPC request pipeline and reduce p99 latency from 18ms to under 4ms.",
  },
  {
    id: "free-4",
    title: "Kubernetes Operator for Distributed State Machines",
    client: "Cloud Storage Provider",
    budget: "₹4,50,000 (Project Fixed)",
    duration: "1 Month",
    location: "Remote",
    skills: ["Kubernetes", "CRD", "Golang", "Controller-runtime"],
    proposals: 12,
    description: "Implement custom Kubernetes Operator automating node failover, state synchronization, and cluster topology rebalancing.",
  },
];

export default function FreelancePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  const filtered = FREELANCE_DATA.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmitProposal = (gig: FreelanceGig) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to submit a contract proposal for ${gig.title}.`,
      });
      navigate(`/register?redirect=/freelance`);
      return;
    }

    if (submittedIds.includes(gig.id)) {
      toast.info("Proposal already submitted for this contract.");
      return;
    }

    setSubmittedIds((prev) => [...prev, gig.id]);
    toast.success(`Proposal submitted for ${gig.title}!`, {
      description: "Client will review your verified DevDeep profile and reach out via encrypted chat.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Laptop size={13} className="text-indigo-600" />
            <span>SPECIALIZED CONTRACTS & ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Developer Freelance Contracts
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            High-leverage architectural consulting and short-term engineering contracts with verified budgets in INR.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-xl mx-auto w-full">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search contracts by tech, domain, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Gigs List */}
        <div className="space-y-4">
          {filtered.map((gig) => {
            const hasSubmitted = submittedIds.includes(gig.id);
            return (
              <div
                key={gig.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-3xl">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                      {gig.client}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-900 transition-colors mt-2">
                      {gig.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {gig.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-bold text-emerald-700">
                      <IndianRupee size={12} /> {gig.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {gig.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {gig.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {gig.skills.map((s) => (
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
                    onClick={() => handleSubmitProposal(gig)}
                    disabled={hasSubmitted}
                    className={`w-full md:w-36 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      hasSubmitted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-indigo-900 hover:bg-indigo-950 text-white active:scale-[0.98]"
                    }`}
                  >
                    <span>{hasSubmitted ? "Proposal Sent ✓" : "Submit Proposal"}</span>
                    {!hasSubmitted && <ArrowRight size={13} />}
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
