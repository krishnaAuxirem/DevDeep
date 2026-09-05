import { Link } from "react-router-dom";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-in">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase">LEGAL GOVERNANCE</span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">Effective Date: January 1, 2026 • Version 2.4</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Agreement to Terms</h2>
              <p>
                By accessing or using the DevDeep platform, services, cloud sandbox kernels, and telemetry APIs, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use our services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Sandbox & Computing Usage Rules</h2>
              <p>
                DevDeep provides isolated Linux micro-VM sandboxes for coding practice, challenge solutions, and production lab execution. Users agree not to utilize sandboxes for unauthorized penetration testing against third parties, cryptocurrency mining, denial-of-service activities, or deploying malicious payloads.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Intellectual Property & Zero Code Retention</h2>
              <p>
                You retain complete ownership of all intellectual property, source code, and project files authored within DevDeep sandboxes. In accordance with our Zero-Code Retention Guarantee, DevDeep does not claim ownership of user code, nor do we train public AI models on proprietary code submitted during evaluation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Payments, Subscriptions & Refunds</h2>
              <p>
                All billing is conducted in Indian Rupees (INR) with native UPI, RuPay, and card processing. Subscriptions renew automatically unless cancelled via the account settings menu. DevDeep offers a 30-day money-back guarantee for initial annual subscription purchases.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability</h2>
              <p>
                DevDeep provides benchmarking, AST analysis, and cryptographic proofs "as is". In no event shall DevDeep be liable for any indirect, incidental, special, or consequential damages resulting from platform downtime or third-party hiring decisions.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link to="/" className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1">
              <ArrowLeft size={12} /> Back to Overview
            </Link>
            <span className="text-xs text-slate-400 font-mono">DevDeep Inc. Legal</span>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
