import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Zap, CheckCircle2, ArrowRight, Chrome, Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { ROLE_LABELS, ROLE_DESCRIPTIONS, ROLE_ICONS, type UserRole } from "@/types/auth";
import { toast } from "sonner";

const ROLES: UserRole[] = [
  "beginner", "professional", "student", "mentor", "instructor", "employer", "admin",
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Full name must be at least 2 characters.";
    if (!form.email.includes("@")) errs.email = "Please enter a valid email address.";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleStep1 = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = () => {
    if (!selectedRole) return;
    setLoading(true);
    setTimeout(() => {
      const result = register({
        email: form.email,
        password: form.password,
        name: form.name,
        role: selectedRole,
      });
      setLoading(false);
      if (!result.success) {
        toast.error(result.error);
        setStep(1);
        return;
      }
      toast.success("Account created! Please log in to continue.");
      navigate(`/login?email=${encodeURIComponent(form.email)}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-[420px] shrink-0 bg-indigo-900 flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-800 rounded-full opacity-40" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-950 rounded-full opacity-50" />
        </div>
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-12 group" title="DevDeep Home">
            <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">DevDeep</span>
          </Link>
          <h2 className="text-white text-3xl font-bold leading-tight mb-4">
            Your engineering career<br />starts here.
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Join 38,000+ developers who use DevDeep to practice, get verified, and land Staff-level roles.
          </p>
        </div>
        <div className="relative space-y-3">
          {[
            "Verified skill profiles trusted by top companies",
            "AI-powered mentor & code review engine",
            "Real-world challenges aligned to production standards",
          ].map(label => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-bold shrink-0">
                <Check size={13} className="text-white" />
              </div>
              <p className="text-indigo-100 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden group" title="DevDeep Home">
            <div className="w-8 h-8 rounded-md bg-indigo-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={15} className="text-white" />
            </div>
            <span className="text-indigo-900 font-bold text-lg">DevDeep</span>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s ? "bg-indigo-900 text-white" :
                  step > s ? "bg-success text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                <span className={`text-sm font-medium ${step === s ? "text-slate-900" : "text-slate-400"}`}>
                  {s === 1 ? "Your Account" : "Choose Your Role"}
                </span>
                {s < 2 && <div className="w-12 h-px bg-slate-200 ml-1" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="text-slate-900 text-2xl font-bold tracking-tight mb-1">Create your account</h1>
              <p className="text-slate-500 text-sm mb-8">
                Already have an account?{" "}
                <Link to="/login" className="text-eblue-600 font-medium hover:text-eblue-700">Sign in</Link>
              </p>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="btn-ghost justify-center text-sm">
                  <Chrome size={15} /> Continue with Google
                </button>
                <button className="btn-ghost justify-center text-sm">
                  <span className="font-bold text-slate-700 text-base leading-none">f</span> Social Login
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-slate-400 text-xs">or with email</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="Alex Volkov"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`dd-input ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`dd-input ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      onKeyDown={e => e.key === "Enter" && handleStep1()}
                      className={`dd-input pr-10 ${errors.password ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>

              <button
                onClick={handleStep1}
                className="btn-primary w-full justify-center mt-6 text-sm"
              >
                Continue <ArrowRight size={15} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-slate-900 text-2xl font-bold tracking-tight mb-1">What describes you best?</h1>
              <p className="text-slate-500 text-sm mb-6">Your role shapes your dashboard, curriculum, and platform experience.</p>

              <div className="grid grid-cols-1 gap-2.5 mb-6">
                {ROLES.map(role => {
                  const RoleIcon = ROLE_ICONS[role];
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`flex items-start gap-3.5 p-4 rounded-md border text-left transition-all ${
                        selectedRole === role
                          ? "border-indigo-900 bg-indigo-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        selectedRole === role
                          ? "bg-indigo-900 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        <RoleIcon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${selectedRole === role ? "text-indigo-900" : "text-slate-900"}`}>
                          {ROLE_LABELS[role]}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{ROLE_DESCRIPTIONS[role]}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        selectedRole === role ? "border-indigo-900 bg-indigo-900" : "border-slate-300"
                      }`}>
                        {selectedRole === role && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost text-sm px-5">
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedRole || loading}
                  className={`btn-primary flex-1 justify-center text-sm ${!selectedRole || loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Creating account..." : "Create Account"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </div>
            </>
          )}

          <p className="text-slate-400 text-xs text-center mt-6">
            By creating an account, you agree to our{" "}
            <span className="text-eblue-600 cursor-pointer hover:underline">Terms of Service</span>{" "}
            and{" "}
            <span className="text-eblue-600 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
