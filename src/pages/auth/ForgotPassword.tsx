import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, ArrowLeft, ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Password recovery email dispatched!");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Brand Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-900 flex items-center justify-center text-white">
            <Zap size={16} className="text-cyan-400" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">DevDeep</span>
        </Link>
        <Link to="/login" className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1">
          <ArrowLeft size={13} />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6 animate-fade-in">
        {!submitted ? (
          <>
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-2">
                <Mail size={24} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Reset Your Password</h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your registered engineering account email address and we will dispatch password recovery instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Work or Academic Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{loading ? "Transmitting Reset Request..." : "Send Reset Instructions"}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Recovery Link Dispatched</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                We have sent an authentication recovery token to <strong className="text-slate-800 font-mono">{email}</strong>. Please check your inbox or spam folder.
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate(`/reset-password?email=${encodeURIComponent(email)}`)}
                className="w-full py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold transition-all"
              >
                Enter Recovery Code →
              </button>
              <Link
                to="/login"
                className="block text-xs text-slate-500 hover:text-slate-800 font-medium pt-1"
              >
                Return to Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400 py-4">
        Protected by DevDeep Multi-Factor Telemetry Authentication
      </div>
    </div>
  );
}
