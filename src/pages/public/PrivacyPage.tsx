import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-in">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase">DATA PRIVACY & SOVEREIGNTY</span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">Last Updated: January 1, 2026 • Compliant with DPDP Act & GDPR</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                We collect account registration data (name, email address, password hash, role selection), transaction history for localized INR billing, and platform execution telemetry (p99 latency, test pass rates, challenge submissions).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Zero-Code Retention for AI Training</h2>
              <p>
                Source code entered into DevDeep interactive IDEs or analyzed via the AI Mentor AST Inspector is processed strictly in volatile ephemeral memory. We never sell, share, or utilize your code to train public machine learning or LLM models.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Cryptographic Proofs & Verifiable Scores</h2>
              <p>
                When you solve verified challenges or capstones, we sign the benchmark results with an Ed25519 digital signature. If you opt into the Employer Radar network, partner companies can verify your scorecards via cryptographic hash verification.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Data Localization & Payments</h2>
              <p>
                Payment data is handled exclusively by RBI-certified Indian payment aggregators. DevDeep never stores complete debit/credit card numbers or UPI PINs on our servers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. Your Data Rights</h2>
              <p>
                You retain the right to export your telemetry data, request complete account erasure, or revoke partner employer visibility at any time from your Account Settings.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link to="/" className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1">
              <ArrowLeft size={12} /> Back to Overview
            </Link>
            <span className="text-xs text-slate-400 font-mono">privacy@devdeep.dev</span>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
