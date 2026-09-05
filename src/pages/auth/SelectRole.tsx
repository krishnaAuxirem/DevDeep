import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Zap, Rocket, GraduationCap, Users, BookOpen, Building2,
  ShieldCheck, ArrowRight, Check, ArrowLeft
} from "lucide-react";
import { useAuth, getDashboardPath } from "@/lib/auth";
import { UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS } from "@/types/auth";
import { toast } from "sonner";

interface RoleCardData {
  role: UserRole;
  icon: React.ReactNode;
  category: "LEARNER" | "MENTORSHIP" | "ENTERPRISE" | "MANAGEMENT";
  perks: string[];
}

const ROLE_OPTIONS: RoleCardData[] = [
  {
    role: "beginner",
    icon: <Rocket size={22} className="text-emerald-500" />,
    category: "LEARNER",
    perks: ["Guided foundational paths", "Interactive code sandbox", "AI hint assistance"],
  },
  {
    role: "student",
    icon: <GraduationCap size={22} className="text-cyan-500" />,
    category: "LEARNER",
    perks: ["Campus verified credentials", "Internship radar matching", "Academic discounts"],
  },
  {
    role: "professional",
    icon: <Zap size={22} className="text-indigo-500" />,
    category: "LEARNER",
    perks: ["Staff-level architecture labs", "Cryptographic skill attestations", "Top-tier hiring radar"],
  },
  {
    role: "mentor",
    icon: <Users size={22} className="text-amber-500" />,
    category: "MENTORSHIP",
    perks: ["1:1 paid session bookings", "Direct INR payouts", "Reputation scorecards"],
  },
  {
    role: "instructor",
    icon: <BookOpen size={22} className="text-purple-500" />,
    category: "MENTORSHIP",
    perks: ["Publish interactive courses", "Student analytics", "Revenue share payouts"],
  },
  {
    role: "employer",
    icon: <Building2 size={22} className="text-blue-500" />,
    category: "ENTERPRISE",
    perks: ["Radar search verified devs", "Custom assessment pipelines", "Direct interview scheduling"],
  },
  {
    role: "admin",
    icon: <ShieldCheck size={22} className="text-slate-700" />,
    category: "MANAGEMENT",
    perks: ["Full platform governance", "Content moderation", "Partner verification"],
  },
];

export default function SelectRole() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, switchRole } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(
    (searchParams.get("role") as UserRole) || user?.role || "professional"
  );
  const [saving, setSaving] = useState(false);

  const handleContinue = () => {
    setSaving(true);
    setTimeout(() => {
      if (isAuthenticated && user) {
        switchRole(selectedRole);
        toast.success(`Role switched to ${ROLE_LABELS[selectedRole]}`);
        navigate(`/onboarding?role=${selectedRole}`);
      } else {
        navigate(`/register?role=${selectedRole}`);
      }
      setSaving(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
            <Zap size={16} className="text-cyan-400" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">DevDeep</span>
        </Link>
        <Link
          to={isAuthenticated && user ? getDashboardPath(user.role) : "/login"}
          className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
        >
          <ArrowLeft size={13} />
          <span>{isAuthenticated ? "Cancel & Back to Dashboard" : "Back to Login"}</span>
        </Link>
      </div>

      {/* Main Role Selection Area */}
      <div className="max-w-5xl w-full mx-auto py-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            PERSONALIZED PLATFORM EXPERIENCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Choose Your DevDeep Role
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Tailor your dashboard, navigation, telemetry, and curriculum to match your engineering trajectory.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {ROLE_OPTIONS.map((item) => {
            const isSelected = selectedRole === item.role;
            return (
              <div
                key={item.role}
                onClick={() => setSelectedRole(item.role)}
                className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900">{ROLE_LABELS[item.role]}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {ROLE_DESCRIPTIONS[item.role]}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                    {item.perks.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Check size={12} className="text-emerald-600 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-2">
                  <div
                    className={`w-full py-1.5 rounded-md text-xs font-semibold text-center transition-colors ${
                      isSelected
                        ? "bg-indigo-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select Role"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mt-6">
          <div>
            <p className="text-xs text-slate-500 font-mono">SELECTED ROLE</p>
            <p className="font-bold text-base text-slate-900">
              {ROLE_LABELS[selectedRole]}
            </p>
          </div>
          <button
            onClick={handleContinue}
            disabled={saving}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>{saving ? "Setting Up..." : "Continue to Onboarding"}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom info */}
      <div className="text-center py-4 text-xs text-slate-400">
        You can change your role anytime from the account settings menu.
      </div>
    </div>
  );
}
