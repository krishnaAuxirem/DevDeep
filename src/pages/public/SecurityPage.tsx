import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Lock, CheckCircle2, Server, Key,
  EyeOff, Terminal, ArrowRight
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>ENTERPRISE TRUST & SECURITY POSTURE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Security & Trust at DevDeep
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered with strict zero-code retention guarantees, hardware-isolated micro-VM hypervisors, and end-to-end encrypted telemetry.
          </p>
        </div>

        {/* 4 Pillars of DevDeep Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <EyeOff size={20} />
            </div>
            <h2 className="font-bold text-lg text-slate-900">Zero Code Retention Guarantee</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Proprietary code evaluated in sandboxes executes in volatile RAM micro-VMs. We never persist your solution code to disk or use customer submissions to train foundational AI models.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Server size={20} />
            </div>
            <h2 className="font-bold text-lg text-slate-900">Hardware Kernel Isolation</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every sandbox session is segregated using Linux KVM micro-VMs with dedicated memory bounds, read-only root filesystems, and strict network seccomp filters.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Key size={20} />
            </div>
            <h2 className="font-bold text-lg text-slate-900">End-to-End Encryption</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All communications utilize TLS 1.3 with forward secrecy. Cryptographic skill proofs are signed via Ed25519 keypairs anchored on tamper-proof Merkle trees.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h2 className="font-bold text-lg text-slate-900">Compliance & RBI Standards</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Full adherence to ISO/IEC 27001, SOC 2 Type II, and Indian Reserve Bank payment data localization protocols for UPI and card processing.
            </p>
          </div>
        </div>

        {/* Responsible Disclosure */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Vulnerability Disclosure Program</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We value the security research community. If you discover a security issue or kernel escape anomaly within DevDeep, please contact our security team directly at <code className="font-mono text-indigo-700 font-bold">security@devdeep.dev</code>. We respond within 24 hours and award competitive bug bounties.
          </p>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
