import { useState } from "react";
import {
  ClipboardList, Award, CheckCircle2, ShieldCheck,
  Clock, ArrowRight, ExternalLink, QrCode, FileText
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { toast } from "sonner";

interface AssessmentsViewProps {
  initialTab?: "tests" | "certificates";
}

const TESTS = [
  {
    id: "t1",
    title: "Distributed Systems & Raft Consensus Attestation",
    duration: "60 mins",
    questions: "30 questions + 2 coding labs",
    difficulty: "Expert",
    score: "94%",
    status: "Passed",
    date: "Completed Jan 14, 2026",
  },
  {
    id: "t2",
    title: "Go Concurrency & Memory Allocation Benchmark",
    duration: "45 mins",
    questions: "25 questions + 1 race lab",
    difficulty: "Hard",
    score: "98%",
    status: "Passed",
    date: "Completed Dec 20, 2025",
  },
  {
    id: "t3",
    title: "Database Internals: LSM Trees & WAL Recovery",
    duration: "60 mins",
    questions: "30 questions + 1 B-Tree lab",
    difficulty: "Expert",
    score: "Pending",
    status: "Available",
    date: "Expires in 14 days",
  },
];

const CERTIFICATES = [
  {
    id: "cert-1",
    title: "Distributed Systems Architect — Staff L7",
    credentialId: "DD-9842-ARCH",
    issueDate: "January 15, 2026",
    merkleRoot: "0x4f98a2c17b8893d98ef01ab924c56e7190ad312e",
    skills: ["Raft Consensus", "WAL Chunking", "Fault Injection", "Go Atomics"],
  },
  {
    id: "cert-2",
    title: "High-Concurrency Systems Specialist",
    credentialId: "DD-5510-GOC",
    issueDate: "December 22, 2025",
    merkleRoot: "0x88ea3021f47bc91023ad5b11299dfc44310029b8",
    skills: ["Lock-Free Queues", "Zero-Allocation Channels", "Memory Profiling"],
  },
];

export default function AssessmentsView({ initialTab }: AssessmentsViewProps) {
  const [activeTab, setActiveTab] = useState<"tests" | "certificates">(initialTab ?? "tests");
  const [merkleModal, setMerkleModal] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Assessments & Certifications</h1>
                <span className="dd-chip-completed text-[10px]">ON-CHAIN PROOFS</span>
              </div>
              <p className="text-slate-500 text-sm">
                Cryptographically signed benchmarks recognized by partner companies like Stripe and Datadog.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab("tests")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "tests" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ClipboardList size={13} />
                <span>Timed Tests (3)</span>
              </button>
              <button
                onClick={() => setActiveTab("certificates")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "certificates" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Award size={13} />
                <span>Certificates (2)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Tests */}
          {activeTab === "tests" && (
            <div className="space-y-4">
              {TESTS.map((test) => (
                <div key={test.id} className="dd-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-indigo-300 transition-colors">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`dd-chip text-[10px] ${test.status === "Passed" ? "dd-chip-completed" : "dd-chip-pending"}`}>
                        {test.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{test.duration}</span>
                      <span className="text-xs text-slate-400">• {test.questions}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 truncate">{test.title}</h3>
                    <p className="text-xs text-slate-500">{test.date}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">SCORE</span>
                      <span className="text-lg font-bold text-indigo-900 font-mono">{test.score}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (test.status === "Passed") {
                          toast.success(`Opening verification scorecard for ${test.title}`);
                        } else {
                          toast.info(`Launching timed sandbox assessment session...`);
                        }
                      }}
                      className="btn-primary text-xs py-2"
                    >
                      {test.status === "Passed" ? "View Scorecard" : "Start Test"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Certificates */}
          {activeTab === "certificates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="dd-card p-6 flex flex-col justify-between space-y-4 border-indigo-200/60 shadow-md">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        CRYPTOGRAPHIC SEAL ✓
                      </span>
                      <span className="font-mono text-xs text-slate-400">{cert.credentialId}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{cert.title}</h3>
                    <p className="text-xs text-slate-500">Issued on {cert.issueDate}</p>

                    <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-600 space-y-1">
                      <div className="text-[10px] text-slate-400">MERKLE ROOT COMMIT HASH</div>
                      <div className="truncate text-indigo-700">{cert.merkleRoot}</div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setMerkleModal(cert.merkleRoot)}
                      className="text-indigo-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <QrCode size={13} />
                      <span>Inspect Merkle Leaf</span>
                    </button>
                    <button
                      onClick={() => toast.success(`Downloading signed certificate PDF for ${cert.title}...`)}
                      className="btn-ghost text-xs py-1.5"
                    >
                      <FileText size={13} /> PDF Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Merkle Leaf Modal */}
          {merkleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-900">Cryptographic Merkle Proof</span>
                  <button onClick={() => setMerkleModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This skill certificate is attested on the DevDeep validation consensus ledger. All automated commit hashes, test telemetry, and p99 benchmark constraints are mathematically sealed.
                </p>
                <div className="p-3 bg-slate-900 text-cyan-300 font-mono text-xs rounded-xl overflow-x-auto">
                  {merkleModal}
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setMerkleModal(null)}
                    className="btn-primary text-xs py-1.5"
                  >
                    Close Verification
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
