import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Calendar, Clock, ArrowRight, User, Sparkles,
  Tag, Search
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "go-122-loop-semantics",
    title: "How Go 1.22 Finally Fixed the Loop Variable Trap & What It Means for Concurrency",
    excerpt: "For over a decade, loop variable capture caused countless silent goroutine race conditions. We dissect the new compiler semantics, AST transformations, and memory profile impacts.",
    author: "Alex Volkov",
    authorRole: "Staff Distributed Systems Engineer",
    date: "August 28, 2026",
    readTime: "8 min read",
    category: "Go Concurrency",
    tags: ["Go", "Compiler", "AST", "Concurrency"],
  },
  {
    id: "raft-vs-paxos-production",
    title: "Why Raft Won the Distributed Consensus War in Modern Infrastructure",
    excerpt: "A practical retrospective examining why etcd, TiKV, CockroachDB, and modern storage engines overwhelmingly adopted Raft over Multi-Paxos.",
    author: "Dr. Marcus Vance",
    authorRole: "Principal Systems Architect",
    date: "August 14, 2026",
    readTime: "12 min read",
    category: "Distributed Systems",
    tags: ["Raft", "Paxos", "Consensus", "etcd"],
  },
  {
    id: "postgres-17-indexing-tradeoffs",
    title: "PostgreSQL 17 Indexing Deep-Dive: B-Tree Deduplication vs BRIN at Scale",
    excerpt: "Analyzing real-world query execution plans and write amplifications when ingesting over 50,000 transaction events per second into Postgres.",
    author: "Devendra K.",
    authorRole: "Database Architect",
    date: "July 30, 2026",
    readTime: "10 min read",
    category: "Databases",
    tags: ["PostgreSQL", "B-Tree", "Indexing", "Performance"],
  },
  {
    id: "ebpf-telemetry-containers",
    title: "Replacing Sidecars with eBPF: Zero-Overhead Kubernetes Observability",
    excerpt: "How kernel tracepoints eliminate the 15% latency penalty traditionally imposed by Envoy sidecars in containerized service meshes.",
    author: "Priya Sharma",
    authorRole: "Kernel Telemetry Lead",
    date: "July 12, 2026",
    readTime: "14 min read",
    category: "Cloud Native",
    tags: ["eBPF", "Kubernetes", "Linux", "Networking"],
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = BLOG_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <BookOpen size={13} className="text-indigo-600" />
            <span>DEVDEEP ENGINEERING DISPATCHES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            DevDeep Engineering Blog
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Written by systems developers, for systems developers. Zero marketing fluff. Deep technical investigations into kernel internals, storage engines, and concurrency.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-xl mx-auto w-full">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search engineering articles by keyword or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="px-2.5 py-0.5 rounded font-bold text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {post.category}
                </span>
                <div className="flex items-center gap-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Link to={`/blog/${post.id}`} className="block">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-900 text-white font-bold text-xs flex items-center justify-center">
                    {post.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{post.author}</p>
                    <p className="text-[10px] text-slate-400">{post.authorRole}</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${post.id}`}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
