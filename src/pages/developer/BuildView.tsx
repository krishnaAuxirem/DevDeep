import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen, Boxes, Terminal, CheckCircle2,
  GitBranch, RefreshCw, Play, ExternalLink, ShieldCheck,
  ChevronRight, ArrowRight, Layers
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { toast } from "sonner";

interface BuildViewProps {
  initialTab?: "projects" | "workspace";
}

const PRODUCTION_PROJECTS = [
  {
    id: "p1",
    specId: "LAB-SYS-01",
    title: "S3-Compatible Distributed Object Storage Engine",
    description: "Zero-copy OS splice syscalls, multipart chunk streaming, Raft state replication, and RocksDB metadata persistence.",
    duration: "~30h build",
    enrolled: "890 Engineers",
    milestone: "Milestone 3 of 5",
    milestones: [
      { name: "Spec", done: true },
      { name: "Build", done: true },
      { name: "Tests", done: true },
      { name: "Review", done: false },
    ],
    tags: ["Go 1.23", "RocksDB", "Raft", "Docker"],
  },
  {
    id: "p2",
    specId: "LAB-SYS-02",
    title: "High-Performance Zero-Knowledge Rollup Prover",
    description: "Write arithmetic constraint circuits in Rust, generate succinct validity proofs, and verify gas metrics on EVM testnet.",
    duration: "~45h build",
    enrolled: "420 Engineers",
    milestone: "Milestone 2 of 5",
    milestones: [
      { name: "Spec", done: true },
      { name: "Build", done: true },
      { name: "Tests", done: false },
      { name: "Review", done: false },
    ],
    tags: ["Rust", "ZKP", "Groth16", "EVM"],
  },
  {
    id: "p3",
    specId: "LAB-SYS-03",
    title: "Distributed Redis In-Memory Engine with RESP3",
    description: "Implement wire-level RESP3 protocol parsing, skip lists, TTL expiration daemons, and master-replica replication.",
    duration: "~25h build",
    enrolled: "1,410 Engineers",
    milestone: "Milestone 4 of 4",
    milestones: [
      { name: "Spec", done: true },
      { name: "Build", done: true },
      { name: "Tests", done: true },
      { name: "Review", done: true },
    ],
    tags: ["C++20", "RESP3", "SkipList", "Network I/O"],
  },
];

export default function BuildView({ initialTab }: BuildViewProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"projects" | "workspace">(initialTab ?? "projects");
  const [activeProject, setActiveProject] = useState(PRODUCTION_PROJECTS[0]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncGitHub = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Repository synced to personal GitHub with CI benchmarks!");
    }, 1000);
  };

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
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Build & Project Workspace</h1>
                <span className="dd-chip-purple text-[10px]">PRODUCTION LABS</span>
              </div>
              <p className="text-slate-500 text-sm">
                Engineering portfolio repos with automated CI benchmark proof and architecture reviews.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "projects" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FolderOpen size={13} />
                <span>All Projects (42)</span>
              </button>
              <button
                onClick={() => setActiveTab("workspace")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "workspace" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Boxes size={13} />
                <span>Active Workspace</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Projects List */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PRODUCTION_PROJECTS.map((proj) => (
                <div key={proj.id} className="dd-card p-5 flex flex-col justify-between hover:border-indigo-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {proj.specId}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{proj.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{proj.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

                    {/* Milestone Pipeline Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Pipeline Progress</span>
                        <span className="font-mono text-indigo-900 font-bold">{proj.milestone}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
                        {proj.milestones.map((m) => (
                          <div
                            key={m.name}
                            className={`py-1 rounded font-bold ${
                              m.done ? "bg-indigo-900 text-white" : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {m.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-semibold">{proj.enrolled}</span>
                    <button
                      onClick={() => {
                        setActiveProject(proj);
                        setActiveTab("workspace");
                        toast.success(`Opening workspace for ${proj.title}`);
                      }}
                      className="btn-primary text-xs py-1.5"
                    >
                      Open Workspace →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Active Workspace */}
          {activeTab === "workspace" && (
            <div className="space-y-6">
              {/* Workspace Header Toolbar */}
              <div className="dd-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-600 font-bold">{activeProject.specId}</span>
                    <h2 className="text-lg font-bold text-slate-900">{activeProject.title}</h2>
                  </div>
                  <p className="text-xs text-slate-500">
                    Active branch: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">feat/multipart-wal-chunker</code>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSyncGitHub}
                    disabled={isSyncing}
                    className="btn-ghost text-xs py-2 flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
                    <span>Sync to GitHub</span>
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Running integration test harness in isolated VM...");
                      navigate("/challenge/c1");
                    }}
                    className="btn-primary text-xs py-2 flex items-center gap-1.5"
                  >
                    <Play size={13} />
                    <span>Run Test Harness</span>
                  </button>
                </div>
              </div>

              {/* 2-Column Split: File Architecture + Telemetry */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 dd-card p-5 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    REPOSITORY SPEC SCHEMATIC
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                      <span>pkg/storage/chunker.go</span>
                      <span className="text-emerald-600 font-bold">✓ Tested</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                      <span>pkg/wal/write_log.go</span>
                      <span className="text-indigo-600 font-bold">In Progress</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between opacity-60">
                      <span>pkg/consensus/raft.go</span>
                      <span className="text-slate-400">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 dd-card p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Live VM Cluster Telemetry</span>
                    <span className="text-xs font-mono text-emerald-600">3/3 Nodes Restored</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Fault Survival</span>
                      <strong className="text-slate-800 text-sm">99.992%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">P99 Write Latency</span>
                      <strong className="text-indigo-600 text-sm">8.4ms</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">IOPS Throughput</span>
                      <strong className="text-slate-800 text-sm">48,200 req/s</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-900 flex items-center justify-between">
                    <span>Cryptographically attested build artifact. Verified on GitHub Actions.</span>
                    <button
                      onClick={() => toast.success("Opening GitHub commit benchmark logs...")}
                      className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
                    >
                      <span>Inspect CI Action</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
