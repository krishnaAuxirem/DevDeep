import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Briefcase, MapPin, IndianRupee, Clock, Building2, CheckCircle2,
  Bookmark, Share2, ArrowLeft, ArrowRight, ShieldCheck, Zap,
  Check, ChevronRight, Send, AlertCircle, FileText, Globe, Sparkles
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { JOBS_DATA, JobListing } from "@/data/jobsData";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const job: JobListing = JOBS_DATA.find((j) => j.id === id) || JOBS_DATA[0];

  const [saved, setSaved] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Application form state
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    experience: job.experienceText || "1-3 years",
    portfolioUrl: "https://github.com/developer",
    note: "",
  });

  const handleToggleSave = () => {
    if (!isAuthenticated) {
      toast.error("Login required to save jobs", {
        description: "Please sign in to save opportunities to your personal dashboard.",
      });
      navigate("/login", { state: { from: `/jobs/${job.id}` } });
      return;
    }
    setSaved(!saved);
    if (!saved) {
      toast.success(`Saved "${job.title}" to your bookmarks`, {
        description: "You can access saved opportunities anytime.",
      });
    } else {
      toast.info(`Removed "${job.title}" from bookmarks`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Job link copied to clipboard!");
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error("Authentication required to apply", {
        description: `Please log in to submit your verified developer application to ${job.company}.`,
      });
      navigate("/login", { state: { from: `/jobs/${job.id}` } });
      return;
    }
    if (hasApplied) {
      toast.info("You have already applied for this position.");
      return;
    }
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
    setApplyModalOpen(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Login required", {
        description: "Please sign in before submitting applications.",
      });
      navigate("/login", { state: { from: `/jobs/${job.id}` } });
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setHasApplied(true);
      setApplyModalOpen(false);
      toast.success(`Application submitted to ${job.company}!`, {
        description: "Your verified DevDeep technical profile has been forwarded to the hiring team.",
      });
    }, 900);
  };

  const similarJobs = JOBS_DATA.filter((j) => j.id !== job.id && (j.category === job.category || j.city === job.city)).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
        {/* Top Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-indigo-900 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/jobs" className="hover:text-indigo-900 transition-colors">Career Opportunities</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400 truncate max-w-xs">{job.category}</span>
          <ChevronRight size={12} />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{job.title}</span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-900 mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Back to all jobs
        </button>

        {/* Main Job Hero Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl shadow-sm shrink-0 ${job.companyColor}`}>
                {job.companyInitials}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {job.title}
                  </h1>
                  {job.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold font-mono">
                      FEATURED
                    </span>
                  )}
                  {job.isInternship && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-bold font-mono">
                      INTERNSHIP
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-sm text-slate-600 flex-wrap">
                  <span className="font-semibold text-slate-900">{job.company}</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm">
                    <MapPin size={13} className="text-slate-400" />
                    {job.location}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs">
                    <Clock size={13} />
                    Posted {job.posted}
                  </span>
                </div>

                {/* Key metadata badges */}
                <div className="flex items-center gap-2 pt-2 flex-wrap text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-900 font-bold font-mono">
                    {job.salary}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    job.workMode === "Remote"
                      ? "bg-cyan-50 text-cyan-800 border border-cyan-200"
                      : job.workMode === "Hybrid"
                      ? "bg-blue-50 text-blue-800 border border-blue-200"
                      : "bg-slate-100 text-slate-800"
                  }`}>
                    {job.workMode}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    {job.jobType}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                    Exp: {job.experienceText}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-medium inline-flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified Employer
                  </span>
                </div>
              </div>
            </div>

            {/* Top Action CTAs */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-center w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={handleToggleSave}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                  saved
                    ? "bg-indigo-50 border-indigo-300 text-indigo-600 shadow-xs"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
                title={saved ? "Saved to bookmarks" : "Save this job"}
                aria-label="Save job"
              >
                <Bookmark size={18} className={saved ? "fill-current" : ""} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                title="Share job"
                aria-label="Share job"
              >
                <Share2 size={18} />
              </button>

              <button
                onClick={handleApplyClick}
                className={`flex-1 md:flex-initial px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                  hasApplied
                    ? "bg-emerald-600 text-white cursor-default"
                    : "bg-indigo-900 hover:bg-indigo-950 text-white hover:shadow-md"
                }`}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle2 size={16} /> Applied
                  </>
                ) : (
                  <>
                    Apply Now <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Full Description, Responsibilities, Requirements, Benefits */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Role */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-900" />
                About the Role
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {job.aboutRole}
              </p>
              <div className="pt-2">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-2">Required Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 font-medium text-xs transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-900" />
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements & Qualifications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Zap size={18} className="text-indigo-900" />
                Requirements & Qualifications
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-900 shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits & Compensation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-900" />
                Compensation & Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 size={18} className="text-indigo-900" />
                About {job.company}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {job.aboutCompany}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-indigo-700 font-semibold">
                <span className="inline-flex items-center gap-1 hover:underline cursor-pointer">
                  <Globe size={13} /> Visit Company Profile
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 hover:underline cursor-pointer">
                  <Briefcase size={13} /> More Jobs from this Company
                </span>
              </div>
            </div>

            {/* Bottom Call to Action Card */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-bold">Ready to take the next step?</h3>
                <p className="text-indigo-200 text-sm">
                  Apply directly with your DevDeep profile, code challenges & projects.
                </p>
              </div>
              <button
                onClick={handleApplyClick}
                className="px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-indigo-50 transition-colors shadow-sm shrink-0"
              >
                {hasApplied ? "Application Sent ✓" : "Apply Now →"}
              </button>
            </div>
          </div>

          {/* Right Column (Sidebar): Quick Overview, Hiring Steps, Similar Jobs */}
          <div className="space-y-6">
            {/* Quick Job Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">
                Job Overview
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Offered Compensation</span>
                  <span className="font-bold text-indigo-900 font-mono text-sm">{job.salary}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Work Mode</span>
                  <span className="font-semibold text-slate-800">{job.workMode}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Job Type</span>
                  <span className="font-semibold text-slate-800">{job.jobType}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Experience Required</span>
                  <span className="font-semibold text-slate-800">{job.experienceText}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-800">{job.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Role Category</span>
                  <span className="font-semibold text-slate-800">{job.category}</span>
                </div>
              </div>

              <button
                onClick={handleApplyClick}
                className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs transition-colors shadow-xs"
              >
                {hasApplied ? "Applied ✓" : "Apply for this Job"}
              </button>
            </div>

            {/* Hiring Process Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">
                Hiring Process
              </h3>
              <div className="space-y-3 relative pl-4 border-l-2 border-indigo-100 text-xs">
                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">1. Fast-Track Review</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Resume & DevDeep profile evaluated within 48 hours.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-300 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">2. Technical Assessment</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Live code review or take-home micro-challenge.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-300 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">3. Engineering Discussion</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Architecture & team collaboration interview.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">4. Offer & Onboarding</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Competitive compensation package & equipment setup.</p>
                </div>
              </div>
            </div>

            {/* Similar Jobs Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono">
                Similar Opportunities
              </h3>
              <div className="space-y-3">
                {similarJobs.map((simJob) => (
                  <div
                    key={simJob.id}
                    onClick={() => {
                      navigate(`/jobs/${simJob.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-900 transition-colors">
                          {simJob.title}
                        </h4>
                        <p className="text-slate-500 text-[11px]">{simJob.company} • {simJob.city}</p>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-900 font-mono shrink-0">
                        {simJob.salary}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/jobs"
                className="block text-center text-xs font-bold text-indigo-700 hover:underline pt-1"
              >
                Browse all developer jobs →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-in relative">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Apply to {job.company}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Role: <strong className="text-slate-700">{job.title}</strong> • {job.location} ({job.salary})
            </p>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Volkov"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">GitHub / Portfolio URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/yourhandle"
                  value={form.portfolioUrl}
                  onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Note to Hiring Manager (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Share any highlights about your experience with distributed systems, algorithms or related projects..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 flex items-start gap-2">
                <ShieldCheck size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  Your DevDeep verified challenges, projects, and telemetry stats will automatically be linked to this application.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send size={13} /> Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
