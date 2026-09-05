import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Zap, ArrowRight, ArrowLeft, Check, CheckCircle2,
  Code2, Sparkles, Building2, Users, BookOpen, ShieldCheck,
  Award, Clock
} from "lucide-react";
import { useAuth, getDashboardPath } from "@/lib/auth";
import { UserRole, ROLE_LABELS, DEVELOPER_ROLES } from "@/types/auth";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, switchRole } = useAuth();

  const role: UserRole =
    (searchParams.get("role") as UserRole) || user?.role || "professional";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Developer Onboarding State
  const [primaryLanguage, setPrimaryLanguage] = useState("Go");
  const [careerGoal, setCareerGoal] = useState("Distributed Systems");
  const [experienceLevel, setExperienceLevel] = useState("Mid / Senior");

  // Mentor Onboarding State
  const [domainExpertise, setDomainExpertise] = useState("Distributed Consensus & Raft");
  const [hourlyRate, setHourlyRate] = useState("4500");
  const [weeklyHours, setWeeklyHours] = useState("5-10 hrs/week");

  // Instructor Onboarding State
  const [courseTopic, setCourseTopic] = useState("High-Performance Backend in Go");
  const [courseFormat, setCourseFormat] = useState("Interactive Code Labs & Sandboxes");

  // Employer Onboarding State
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState("50-200 engineers");
  const [targetRole, setTargetRole] = useState("Staff Backend Engineer");

  const handleFinish = () => {
    setLoading(true);
    if (user && user.role !== role) {
      switchRole(role);
    }

    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome to DevDeep!", {
        description: `Your ${ROLE_LABELS[role]} profile has been configured successfully.`,
      });
      navigate(getDashboardPath(role));
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-3xl w-full mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
            <Zap size={16} className="text-cyan-400" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">DevDeep</span>
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
          Onboarding: {ROLE_LABELS[role]}
        </span>
      </div>

      {/* Wizard Card */}
      <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 my-4 space-y-6 animate-fade-in">
        {/* Progress Dots */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">
              STEP {step} OF 2
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {step === 1 ? "Configure Your Preferences" : "Confirm Platform Setup"}
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-8 h-2 rounded-full ${step >= 1 ? "bg-indigo-900" : "bg-slate-200"}`} />
            <div className={`w-8 h-2 rounded-full ${step >= 2 ? "bg-indigo-900" : "bg-slate-200"}`} />
          </div>
        </div>

        {/* Step 1: Role-Specific Inputs */}
        {step === 1 && (
          <div className="space-y-5">
            {DEVELOPER_ROLES.includes(role) && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Primary Programming Language
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["Go", "Rust", "TypeScript", "Python"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setPrimaryLanguage(lang)}
                        className={`p-3 rounded-lg border text-xs font-semibold transition-all ${
                          primaryLanguage === lang
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Primary Goal
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Distributed Systems & Raft",
                      "Staff L7 Engineering Screen",
                      "LSM-Trees & Storage Internals",
                      "Cloud Native & Micro-VM Kernels",
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setCareerGoal(goal)}
                        className={`p-3 rounded-lg border text-xs font-semibold text-left transition-all ${
                          careerGoal === goal
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Current Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["Beginner", "Mid / Senior", "Staff / Lead"].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setExperienceLevel(lvl)}
                        className={`p-3 rounded-lg border text-xs font-semibold transition-all ${
                          experienceLevel === lvl
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {role === "mentor" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Domain Specialty
                  </label>
                  <input
                    type="text"
                    value={domainExpertise}
                    onChange={(e) => setDomainExpertise(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-600"
                    placeholder="e.g. Distributed Consensus, Lock-Free Concurrency, High QPS Systems"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Hourly Mentorship Rate (INR ₹)
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["₹3,500/hr", "₹4,800/hr", "₹6,500/hr"].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setHourlyRate(rate.replace(/[^0-9]/g, ""))}
                        className={`p-3 rounded-lg border text-xs font-semibold transition-all ${
                          hourlyRate === rate.replace(/[^0-9]/g, "")
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {rate}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Available Bandwidth
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["2-5 hrs/week", "5-10 hrs/week", "10+ hrs/week"].map((hrs) => (
                      <button
                        key={hrs}
                        type="button"
                        onClick={() => setWeeklyHours(hrs)}
                        className={`p-3 rounded-lg border text-xs font-semibold transition-all ${
                          weeklyHours === hrs
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {hrs}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {role === "instructor" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Proposed Course Title
                  </label>
                  <input
                    type="text"
                    value={courseTopic}
                    onChange={(e) => setCourseTopic(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-600"
                    placeholder="e.g. Building High-Throughput Ingestion Pipelines in Go"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Primary Course Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Interactive Code Labs & Sandboxes",
                      "Production Architecture Video Walkthroughs",
                      "Hands-on Capstone Projects",
                      "Automated AST Graded Exercises",
                    ].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setCourseFormat(fmt)}
                        className={`p-3 rounded-lg border text-xs font-semibold text-left transition-all ${
                          courseFormat === fmt
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {role === "employer" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-600"
                    placeholder="e.g. Razorpay, Swiggy, Zerodha, Stripe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Engineering Team Size
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["10-50", "50-200", "200+ engineers"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setTeamSize(size)}
                        className={`p-3 rounded-lg border text-xs font-semibold transition-all ${
                          teamSize === size
                            ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Primary Role You Are Scouting
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-600"
                    placeholder="e.g. Senior Distributed Systems Engineer"
                  />
                </div>
              </>
            )}

            {role === "admin" && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">Administrator Console Initializer</p>
                <p>You have administrative authority across all telemetry nodes, mentors, verifications, and payment schedules.</p>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Review & Confirm Setup</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2: Summary Review */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 block">
                Profile Configuration Summary
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">Assigned Role</span>
                  <strong className="text-slate-800 font-bold">{ROLE_LABELS[role]}</strong>
                </div>
                {DEVELOPER_ROLES.includes(role) && (
                  <>
                    <div>
                      <span className="text-slate-400 block font-mono">Focus Language</span>
                      <strong className="text-slate-800 font-bold">{primaryLanguage}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Target Curriculum</span>
                      <strong className="text-slate-800 font-bold">{careerGoal}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Experience</span>
                      <strong className="text-slate-800 font-bold">{experienceLevel}</strong>
                    </div>
                  </>
                )}
                {role === "mentor" && (
                  <>
                    <div>
                      <span className="text-slate-400 block font-mono">Domain</span>
                      <strong className="text-slate-800 font-bold">{domainExpertise}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Session Rate</span>
                      <strong className="text-slate-800 font-bold">₹{hourlyRate}/hr</strong>
                    </div>
                  </>
                )}
                {role === "instructor" && (
                  <>
                    <div>
                      <span className="text-slate-400 block font-mono">Course Title</span>
                      <strong className="text-slate-800 font-bold">{courseTopic}</strong>
                    </div>
                  </>
                )}
                {role === "employer" && (
                  <>
                    <div>
                      <span className="text-slate-400 block font-mono">Company</span>
                      <strong className="text-slate-800 font-bold">{companyName || "Partner Org"}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Scouting</span>
                      <strong className="text-slate-800 font-bold">{targetRole}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Isolated sandbox container pre-allocated with 4.1ms spin-up latency</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Zero code retention guarantee & cryptographic attestation enabled</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
              <button
                onClick={handleFinish}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{loading ? "Initializing Dashboard..." : `Enter ${ROLE_LABELS[role]} Dashboard`}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 py-3">
        DevDeep Production Engineering Environment • 100% Encrypted Telemetry
      </div>
    </div>
  );
}
