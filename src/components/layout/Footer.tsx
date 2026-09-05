import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap, CheckCircle2, ShieldCheck, Activity,
  ExternalLink, ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const FOOTER_COLUMNS = [
    {
      title: "Product",
      links: [
        { label: "Learning Paths", path: "/learning-paths" },
        { label: "Interactive IDE", path: "/coding-academy" },
        { label: "AI Mentor", path: "/ai-mentor" },
        { label: "Projects", path: "/projects" },
        { label: "Pricing", path: "/pricing" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discussions", path: "/community/discussions" },
        { label: "Groups", path: "/community/groups" },
        { label: "Project Showcase", path: "/community/showcase" },
        { label: "Hackathons", path: "/community/hackathons" },
        { label: "Events", path: "/community/events" },
      ],
    },
    {
      title: "Career",
      links: [
        { label: "Jobs", path: "/jobs" },
        { label: "Internships", path: "/internships" },
        { label: "Freelance", path: "/freelance" },
        { label: "Mentorship Directory", path: "/mentors" },
        { label: "Company Directory", path: "/companies" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", path: "/documentation" },
        { label: "System Architecture Guides", path: "/resources/system-architecture" },
        { label: "Blog", path: "/blog" },
        { label: "Open Source", path: "/open-source" },
        { label: "API Reference", path: "/api-reference" },
      ],
    },
    {
      title: "Legal & Company",
      links: [
        { label: "About DevDeep", path: "/about" },
        { label: "Careers", path: "/careers" },
        { label: "Security", path: "/security" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Sitemap", path: "/sitemap" },
      ],
    },
  ];

  return (
    <>
      <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-all">
        {/* Main Columns Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Intro Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Zap size={16} className="text-cyan-300" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-tight text-lg">DevDeep</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    v2.4
                  </span>
                </div>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                The Developer Growth Operating System. Unifying production telemetry, automated AST code evaluation, and deep AI architecture review.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-cyan-400 block mb-1">TELEMETRY RUNTIME</span>
                <span className="text-xs text-slate-300">4.1ms sandbox spin-up • Global edge clusters</span>
              </div>
            </div>

            {/* 5 Dynamic Organized Columns */}
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-100 font-mono">
                  {col.title}
                </p>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            {/* Copyright & Tagline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} DevDeep Inc. All rights reserved.</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-300 font-medium">Engineered for deep work.</span>
            </div>

            {/* Social Icons & Status Pill */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Functioning Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub (opens in new tab)"
                >
                  GitHub
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Discord (opens in new tab)"
                >
                  Discord
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="X / Twitter (opens in new tab)"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </div>

              {/* System Status Pill */}
              <button
                onClick={() => setStatusModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors shadow-2xs group"
                title="Click to view live system status"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-emerald-400 font-medium">All Systems Operational</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* System Status Telemetry Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-bold text-base text-slate-900">Live System Status</h3>
              </div>
              <button
                onClick={() => setStatusModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span className="font-semibold">All Microservices & Sandboxes Normal</span>
                </div>
                <span className="font-mono font-bold">99.98%</span>
              </div>

              <div className="space-y-2 font-mono">
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-500 font-sans">Cloud Sandboxes Latency (p99):</span>
                  <span className="font-bold text-slate-800">4.1ms</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-500 font-sans">AI AST Inference Engine:</span>
                  <span className="font-bold text-emerald-600">Operational (142ms)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-500 font-sans">Active Sandboxes Global:</span>
                  <span className="font-bold text-indigo-700">8,420 Active</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-slate-50">
                  <span className="text-slate-500 font-sans">Evaluation Cluster Nodes:</span>
                  <span className="font-bold text-slate-800">US-East, EU-Central, AP-South</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
