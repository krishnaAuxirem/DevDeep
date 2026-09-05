import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users, Star, Search, Filter, ArrowRight, ShieldCheck,
  Clock, IndianRupee, MapPin, Sparkles, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { MENTORS } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function MentorsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = [
    "All",
    "Distributed Systems",
    "Go Concurrency",
    "Database Internals",
    "System Design",
  ];

  const filteredMentors = MENTORS.filter((m) => {
    const matchesSpec =
      selectedSpecialty === "All" ||
      m.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpec && matchesSearch;
  });

  const handleBook = (mentorId: string, mentorName: string) => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to book a 1:1 architectural session with ${mentorName}.`,
      });
      navigate(`/register?redirect=/mentors/${mentorId}`);
      return;
    }
    navigate(`/mentors/${mentorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Users size={13} className="text-indigo-600" />
            <span>VERIFIED STAFF & PRINCIPAL DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Find an Architectural Mentor
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Direct 1:1 sessions with verified engineering leaders from Stripe, Google, Razorpay, and AWS. Zero fluff mock screens, PR reviews, and Staff readiness diagnostics.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {specialties.map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSpecialty(sp)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedSpecialty === sp
                    ? "bg-indigo-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search mentors, companies, domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-900 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                    {m.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-900 transition-colors truncate">
                      {m.name}
                    </h3>
                    <p className="text-xs text-indigo-700 font-medium truncate">{m.role}</p>
                    <p className="text-[11px] text-slate-400 truncate">{m.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono py-1 border-y border-slate-100">
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> 4.98
                  </span>
                  <span>120+ Sessions Conducted</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    Core Specialties
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {m.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-sm font-bold font-mono text-slate-900">₹4,800</span>
                  <span className="text-[10px] text-slate-400 font-mono"> / 45m</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/mentors/${m.id}`}
                    className="text-xs font-semibold text-slate-600 hover:text-indigo-900 px-2 py-1"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => handleBook(m.id, m.name)}
                    className="px-4 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                  >
                    <span>Book 1:1</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mentor Onboarding Callout */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900">Are you a Staff or Principal Engineer?</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Join the DevDeep mentor network. Guide ambitious developers, set your own hourly rates in INR, and earn direct weekly bank payouts.
            </p>
          </div>
          <button
            onClick={() => navigate("/select-role?role=mentor")}
            className="px-6 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold transition-all shadow-sm shrink-0"
          >
            Apply to Become a Mentor →
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
