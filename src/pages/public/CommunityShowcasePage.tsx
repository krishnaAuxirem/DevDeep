import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles, Star, GitBranch, ExternalLink, Search,
  Plus, ArrowRight, ShieldCheck, CheckCircle2, Terminal
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface ShowcaseProject {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  description: string;
  stars: number;
  githubUrl: string;
  demoUrl: string;
  tags: string[];
  benchmarkPass: boolean;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "show-1",
    title: "GrapheneKV: Lock-Free LSM-Tree in Pure Go",
    author: "Alex Volkov",
    authorAvatar: "AV",
    description: "An embeddable key-value engine with concurrent skiplist memtables, CRC32 write-ahead logs, and background leveled compactions.",
    stars: 840,
    githubUrl: "https://github.com/alexvolkov/graphenekv",
    demoUrl: "https://graphenekv.dev",
    tags: ["Go", "LSM-Tree", "Storage", "Zero-Alloc"],
    benchmarkPass: true,
  },
  {
    id: "show-2",
    title: "HydroFlow: Distributed Rate Limiter with Redis Cluster",
    author: "Priya Sharma",
    authorAvatar: "PS",
    description: "Multi-datacenter sliding window token bucket library with local in-memory Bloom filter pre-checks.",
    stars: 520,
    githubUrl: "https://github.com/priyasharma/hydroflow",
    demoUrl: "https://hydroflow.dev",
    tags: ["Redis", "Distributed", "Concurrency", "Go"],
    benchmarkPass: true,
  },
  {
    id: "show-3",
    title: "ChronoTrace: eBPF Kernel Network Tracer",
    author: "Ryo Tanaka",
    authorAvatar: "RT",
    description: "Captures TCP round-trip delays, packet retransmissions, and socket backlogs directly at the Linux kernel ring buffer.",
    stars: 690,
    githubUrl: "https://github.com/ryotanaka/chronotrace",
    demoUrl: "https://chronotrace.dev",
    tags: ["eBPF", "Linux", "C", "Networking"],
    benchmarkPass: true,
  },
  {
    id: "show-4",
    title: "RaftMesh: Visual Consensus Simulator in WebAssembly",
    author: "Elena Rostova",
    authorAvatar: "ER",
    description: "Interactive browser simulation of Raft leader election, heartbeats, network partitions, and log divergence.",
    stars: 940,
    githubUrl: "https://github.com/elenarostova/raftmesh",
    demoUrl: "https://raftmesh.dev",
    tags: ["Raft", "Wasm", "Visualizer", "TypeScript"],
    benchmarkPass: true,
  },
];

export default function CommunityShowcasePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState(SHOWCASE_PROJECTS);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStar = (id: string) => {
    if (!isAuthenticated) {
      toast.info("Please log in to star showcase projects.");
      return;
    }
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stars: p.stars + 1 } : p))
    );
    toast.success("Starred project!");
  };

  const handleSubmitProject = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please log in to submit your open-source project for verification.",
      });
      navigate("/register?redirect=/community/showcase");
      return;
    }
    toast.success("Opening project submission modal...");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              COMMUNITY OPEN SOURCE SHOWCASE
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Developer Project Showcase
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              Production architectures, storage engines, and developer tools built by DevDeep engineers.
            </p>
          </div>
          <button
            onClick={handleSubmitProject}
            className="px-5 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
          >
            <Plus size={14} />
            <span>Submit Your Project</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-xl mx-auto w-full">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search showcase by project name, author, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center">
                      {proj.authorAvatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{proj.author}</p>
                      <p className="text-[10px] text-slate-400">Verified DevDeep Author</p>
                    </div>
                  </div>

                  {proj.benchmarkPass && (
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck size={12} /> Test Harness Verified
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleStar(proj.id)}
                  className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600 hover:text-amber-700 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 transition-colors"
                >
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  <span>{proj.stars}</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <GitBranch size={13} />
                    <span>Source Code</span>
                  </a>
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
