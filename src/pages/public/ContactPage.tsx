import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, MessageSquare, Building2, Send, MapPin,
  CheckCircle2, Sparkles, ArrowRight
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Developer Support",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message dispatched to DevDeep engineering support!");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Mail size={13} className="text-indigo-600" />
            <span>DIRECT ENGINEERING COMMUNICATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Contact DevDeep
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions regarding our enterprise sandboxes, mentorship network, or cryptographic attestation APIs? Reach out directly.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900">Direct Inquiries</h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block font-mono">General Support</span>
                  <a href="mailto:support@devdeep.dev" className="text-indigo-700 font-semibold hover:underline">
                    support@devdeep.dev
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Enterprise & Hiring</span>
                  <a href="mailto:partnerships@devdeep.dev" className="text-indigo-700 font-semibold hover:underline">
                    partnerships@devdeep.dev
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Security & Disclosures</span>
                  <a href="mailto:security@devdeep.dev" className="text-indigo-700 font-semibold hover:underline">
                    security@devdeep.dev
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
              <h3 className="font-bold text-base text-slate-900">Headquarters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                DevDeep Technologies Private Limited<br />
                Indiranagar, 100 Feet Road<br />
                Bengaluru, Karnataka 560038, India
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. priya@company.com"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Inquiry Department</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-white"
                  >
                    <option>Developer Support</option>
                    <option>Enterprise Hiring & Radar</option>
                    <option>Become an Architectural Mentor</option>
                    <option>Instructor Course Publishing</option>
                    <option>Bug Bounty / Security Report</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your inquiry with technical specifications or details..."
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Send size={14} />
                  <span>{loading ? "Transmitting Message..." : "Dispatch Message"}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Transmitted</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting DevDeep. An engineering specialist will review your inquiry and follow up within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-indigo-700 hover:underline pt-2"
                >
                  Send Another Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
