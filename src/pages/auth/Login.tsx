import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, Zap, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth, getDashboardPath } from "@/lib/auth";
import { ROLE_ICONS, ROLE_LABELS } from "@/types/auth";
import { toast } from "sonner";

const DEMO_CREDS = [
  {
    role: "professional" as const,
    label: "Developer Account",
    email: "developer@demo.com",
    password: "demo123",
    color: "indigo",
  },
  {
    role: "admin" as const,
    label: "Admin Account",
    email: "admin@demo.com",
    password: "demo123",
    color: "rose",
  },
  {
    role: "mentor" as const,
    label: "Mentor Account",
    email: "mentor@demo.com",
    password: "demo123",
    color: "cyan",
  },
  {
    role: "employer" as const,
    label: "Employer Account",
    email: "employer@demo.com",
    password: "demo123",
    color: "amber",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notRegistered, setNotRegistered] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardPath(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    setNotRegistered(false);
    setTimeout(() => {
      const result = login(email.trim(), password);
      setLoading(false);
      if (!result.success) {
        setError(result.error ?? "Login failed.");
        if (result.error?.includes("register")) setNotRegistered(true);
        return;
      }
      toast.success("Welcome back!");
      // Navigation handled by useEffect above
    }, 600);
  };

  const useDemo = (cred: typeof DEMO_CREDS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError("");
    setNotRegistered(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex w-[380px] shrink-0 bg-indigo-900 flex-col items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-950/60 to-transparent" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-indigo-800 rounded-full opacity-30" />
        </div>
        <Link to="/" className="relative text-center block group" title="DevDeep Home">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform">
            <Zap size={30} className="text-white" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2 tracking-tight">DevDeep</h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            The professional platform for engineers who build things that matter.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[["38k+", "Developers"], ["4.7 / 5", "Avg. Rating"], ["Top 1%", "Certified"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="text-white text-lg font-bold">{val}</p>
                <p className="text-indigo-300 text-xs">{lbl}</p>
              </div>
            ))}
          </div>
        </Link>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden group" title="DevDeep Home">
            <div className="w-8 h-8 rounded-md bg-indigo-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap size={15} className="text-white" />
            </div>
            <span className="text-indigo-900 font-bold text-lg">DevDeep</span>
          </Link>

          <h1 className="text-slate-900 text-2xl font-bold tracking-tight mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">
            New here?{" "}
            <Link to="/register" className="text-eblue-600 font-medium hover:text-eblue-700">
              Create a free account
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="dd-surface p-4 mb-6 rounded-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-slate-700 text-xs font-bold uppercase tracking-wider">Demo Accounts — One-Click Login</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDS.map(cred => {
                const CredIcon = ROLE_ICONS[cred.role];
                return (
                  <button
                    key={cred.email}
                    onClick={() => useDemo(cred)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-md border text-left transition-all hover:scale-[1.01] ${
                      email === cred.email
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                      <CredIcon size={14} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-slate-900 text-xs font-semibold truncate">{cred.label}</p>
                      <p className="text-slate-400 text-[10px] font-mono truncate">{cred.email}</p>
                    </div>
                    {email === cred.email && <CheckCircle2 size={13} className="text-indigo-600 shrink-0 ml-auto" />}
                  </button>
                );
              })}
            </div>
            <p className="text-slate-400 text-[10px] text-center mt-2">Password: <span className="font-mono text-slate-600">demo123</span> for all demo accounts</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded-md mb-4">
              <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 text-sm">{error}</p>
                {notRegistered && (
                  <Link to="/register" className="text-eblue-600 text-xs font-medium hover:underline mt-0.5 inline-block">
                    → Go to Sign Up
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); setNotRegistered(false); }}
                className="dd-input"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <button className="text-eblue-600 text-xs hover:text-eblue-700">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  className="dd-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`btn-primary w-full justify-center text-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing in..." : "Sign In to DevDeep"}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button className="btn-ghost w-full justify-center text-sm">
            <span className="text-lg leading-none">G</span> Continue with Google
          </button>

          {/* Security indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-400 text-xs">
            <CheckCircle2 size={12} className="text-success" />
            <span>Encrypted session · Secure by design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
