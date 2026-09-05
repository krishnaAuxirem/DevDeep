import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle, ChevronDown, ChevronUp, Search, ArrowRight,
  BookOpen, Users, Building2, Zap
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const faqs = [
    {
      category: "Learners",
      q: "How are DevDeep challenges different from generic LeetCode problems?",
      a: "DevDeep problems test real production systems engineering: race hazards in Go goroutines, memory allocation tuning with pprof, write-ahead logs, and Raft leader election invariants. Every solution runs inside a real Linux micro-VM with multi-threaded chaos injection.",
    },
    {
      category: "Learners",
      q: "What programming languages are supported in the Interactive IDE?",
      a: "Our core execution kernels specialize in Go 1.22, Rust, C/C++, and TypeScript/Node.js. Additional language runtimes are continuously deployed across our global edge micro-VM clusters.",
    },
    {
      category: "Mentors",
      q: "How does the Mentorship billing and payout system work in India?",
      a: "Mentors set their own hourly rate (typically ₹3,500 – ₹7,500/hr). Mentees pay securely via UPI or Indian cards. Payouts are credited directly to your registered Indian bank account on a weekly basis with complete GST tax invoices.",
    },
    {
      category: "Companies",
      q: "How does Employer Radar verify developer candidates?",
      a: "Unlike traditional resumes where skills are self-reported, DevDeep scorecards are backed by cryptographically signed commit Merkle proofs. Employers inspect verified p99 latency benchmarks and AST code review scores before extending interviews.",
    },
    {
      category: "Platform & Billing",
      q: "What payment options are available for DevDeep Pro in India?",
      a: "We support native UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay debit/credit cards, NetBanking across 50+ banks, and international cards. All prices are displayed in Indian Rupees (INR) with zero hidden currency conversion markups.",
    },
    {
      category: "Platform & Billing",
      q: "Can I cancel my subscription anytime?",
      a: "Yes. You can cancel your subscription at any time with 1-click self-service from Account Settings. You will retain access until the end of your prepaid billing period.",
    },
  ];

  const filtered = faqs.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <HelpCircle size={13} className="text-indigo-600" />
            <span>KNOWLEDGE BASE & FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our cloud sandboxes, AI mentor engine, mentorship payouts, and employer talent radar.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {["All", "Learners", "Mentors", "Companies", "Platform & Billing"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-indigo-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp size={18} className="text-indigo-600 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="text-center p-8 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Still have questions?</h2>
          <p className="text-xs text-slate-600">
            Our engineering support team is available around the clock.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold transition-all shadow-sm"
          >
            <span>Contact Support</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
