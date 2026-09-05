import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles,
  HelpCircle, ChevronDown, ChevronUp, IndianRupee
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function PricingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSelectPlan = (tier: string) => {
    if (!isAuthenticated) {
      toast.info("Create your account to continue", {
        description: `You've selected the ${tier} plan.`,
      });
      navigate(`/register?plan=${tier.toLowerCase()}`);
      return;
    }
    toast.success(`Plan ${tier} selected!`, {
      description: "Redirecting to secure payment checkout...",
    });
    navigate("/dashboard/developer");
  };

  const faqs = [
    {
      q: "What payment methods do you support in India?",
      a: "We support 100% native Indian payment rails: UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay debit/credit cards, Visa/Mastercard, NetBanking across 50+ Indian banks, and corporate GST invoicing.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes. DevDeep provides 1-click self-service cancellation with zero lock-in contracts or retention friction. You retain access until the end of your billing cycle.",
    },
    {
      q: "How does the Zero-Code Retention policy work?",
      a: "All code executed in our sandboxes runs in isolated RAM micro-VMs. Nothing is retained on persistent storage or used to train foundational AI models.",
    },
    {
      q: "Are the cryptographic certificates recognized by employers?",
      a: "Yes. Our skill attestations are signed on-chain and directly verified by partner hiring platforms scouting on DevDeep.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 animate-fade-in">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Zap size={13} className="text-indigo-600" />
            <span>TRANSPARENT INR PRICING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Invest in Your Engineering Career
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Straightforward localized INR billing. Zero foreign markup. Cancel anytime with 1-click self-service.
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs sm:text-sm font-semibold ${!isYearly ? "text-slate-900" : "text-slate-400"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-indigo-900 p-0.5 transition-colors relative focus:outline-none"
              aria-label="Toggle annual billing"
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${isYearly ? "text-slate-900" : "text-slate-400"}`}>
              <span>Yearly</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                20% OFF
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Explorer / Free Tier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">FREE TIER</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Developer Free</h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">₹0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fundamental algorithm sandboxes and community open-source labs.
              </p>
              <ul className="space-y-3 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>50 cloud sandboxes / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>120 Algorithmic challenges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>Community discussion boards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>Public verifiable profile</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan("Free")}
              className="w-full mt-8 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors"
            >
              Start Free
            </button>
          </div>

          {/* Pro Engineer Tier (Most Popular) */}
          <div className="bg-white rounded-2xl border-2 border-indigo-600 p-7 shadow-xl flex flex-col justify-between relative hover:scale-[1.01] transition-all">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-900 text-white font-mono text-[11px] font-bold shadow-sm">
              MOST POPULAR
            </div>
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-700 uppercase">DEVDEEP PRO</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Pro Engineer</h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-indigo-950 font-mono">
                  {isYearly ? "₹1,199" : "₹1,499"}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full access to production architecture labs, unlimited AST reviews, and verifiable certs.
              </p>
              <ul className="space-y-3 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Unlimited AI Mentor v3.8 sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                  <span>All 42 Production Labs & S3 repos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                  <span>Cryptographic Skill Attestations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                  <span>Full-speed container boot (4.1ms)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-indigo-600 shrink-0" />
                  <span>Partner radar scout matchmaking</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan("Pro")}
              className="w-full mt-8 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Upgrade to Pro</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Staff & Career Cohort Tier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">CAREER FAST-TRACK</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">Staff • 1:1 Mentorship</h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900 font-mono">
                  {isYearly ? "₹3,199" : "₹3,999"}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct human architectural mentorship + guaranteed fast-tracked job referrals.
              </p>
              <ul className="space-y-3 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Everything in Pro tier</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>2x 1:1 Staff Mentor Calls / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>Verified Scout Scorecard Dossier</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>Tier-1 Partner Referral Lane (₹40L - ₹95L)</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan("Staff")}
              className="w-full mt-8 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-950 text-white font-semibold text-xs transition-colors"
            >
              Start Staff Cohort
            </button>
          </div>
        </div>

        {/* Payment Trust Footer */}
        <div className="text-center text-xs text-slate-400 pt-4 space-y-1">
          <p>UPI (GPay, PhonePe, Paytm), RuPay, NetBanking, Credit Cards supported natively with GST invoices.</p>
          <p>30-day money back guarantee • 100% secure Indian payment processing.</p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-4 pt-6">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span>{f.q}</span>
                  {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
