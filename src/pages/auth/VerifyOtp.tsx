import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Zap, ArrowLeft, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "engineer@devdeep.dev";
  const redirect = searchParams.get("redirect") || "/select-role";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Security token verified successfully!");
      navigate(redirect);
    }, 600);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    toast.info("A new verification code has been dispatched to your email.");
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

      {/* Main Form */}
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Two-Factor Authentication</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            We sent a 6-digit cryptographic verification code to:
            <br />
            <strong className="text-slate-800 font-mono">{email}</strong>
          </p>
        </div>

        {/* 6 Digit Input Boxes */}
        <div className="flex justify-center gap-2.5 py-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-12 text-center text-lg font-bold font-mono border-2 border-slate-200 rounded-lg focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-slate-50/50"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>{loading ? "Authenticating Token..." : "Verify & Authenticate"}</span>
          <ArrowRight size={14} />
        </button>

        {/* Resend Timer */}
        <div className="text-center text-xs text-slate-500 pt-2">
          {timer > 0 ? (
            <span>Resend code in <strong className="font-mono text-slate-700">{timer}s</strong></span>
          ) : (
            <button
              onClick={handleResend}
              className="text-indigo-700 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <RefreshCw size={12} /> Resend Verification Code
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 py-4">
        Protected by DevDeep Multi-Factor Telemetry Authentication
      </div>
    </div>
  );
}
