import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Users, Star, ArrowLeft, ArrowRight, ShieldCheck, Clock,
  Calendar, CheckCircle2, MessageSquare, IndianRupee, MapPin
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { MENTORS } from "@/constants/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function MentorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const mentor = MENTORS.find((m) => m.id === id) || MENTORS[0];

  const [selectedSlot, setSelectedSlot] = useState("Tomorrow, 4:00 PM IST");
  const [sessionType, setSessionType] = useState<"architecture" | "mock" | "code-review">("architecture");

  const slots = [
    "Tomorrow, 4:00 PM IST",
    "Tomorrow, 7:30 PM IST",
    "Friday, 11:00 AM IST",
    "Saturday, 2:00 PM IST",
  ];

  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to finalize your session with ${mentor.name}.`,
      });
      navigate(`/register?redirect=/mentors/${mentor.id}`);
      return;
    }
    toast.success("1:1 Mentorship Session Scheduled!", {
      description: `Confirmed with ${mentor.name} on ${selectedSlot}. Google Meet invite dispatched.`,
    });
    navigate("/dashboard/developer");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-in">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/mentors" className="hover:text-slate-900 flex items-center gap-1 font-medium">
            <ArrowLeft size={12} /> Back to Mentors
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{mentor.name}</span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-900 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
                {mentor.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{mentor.name}</h1>
                  <ShieldCheck size={18} className="text-indigo-600" />
                </div>
                <p className="text-xs text-indigo-700 font-semibold">{mentor.role} • {mentor.company}</p>
                <p className="text-xs text-slate-400 mt-0.5">Bengaluru, India / Global Remote</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">SESSION PRICING</span>
              <strong className="text-lg font-bold text-slate-900">₹4,800</strong>
              <span className="text-slate-500 text-[10px]"> / 45-min review</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Engineering Biography & Focus Areas</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Over 12 years of hands-on experience designing high-volume distributed transactional pipelines, consensus algorithms, and fault-tolerant storage engines. Former engineering lead at Tier-1 tech firms mentoring engineers transitioning to Staff L7 roles.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {mentor.specialties.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Schedule Your 1:1 Session</h2>

          {/* Session Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Select Session Focus
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "architecture", label: "Architectural Deep-Dive", desc: "Review your system design RFC" },
                { id: "mock", label: "Staff Mock Interview", desc: "Simulated FAANG technical screen" },
                { id: "code-review", label: "Pull Request & Concurrency", desc: "Live race hazard & leak audit" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSessionType(t.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    sessionType === t.id
                      ? "border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-bold text-xs text-slate-900">{t.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Available Slots */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Available Time Slots
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border text-xs font-medium text-left flex items-center justify-between transition-all ${
                    selectedSlot === slot
                      ? "border-indigo-600 bg-indigo-50 text-indigo-950 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calendar size={13} className="text-indigo-600" />
                    {slot}
                  </span>
                  {selectedSlot === slot && <CheckCircle2 size={14} className="text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span>Includes 45m Google Meet call + written diagnostic summary.</span>
            </div>
            <button
              onClick={handleConfirmBooking}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <span>Confirm & Schedule (₹4,800)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
