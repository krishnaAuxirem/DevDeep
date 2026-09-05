import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Calendar, Clock, User, Share2, Sparkles,
  BookOpen, CheckCircle2, Bookmark
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { BLOG_POSTS } from "./BlogPage";
import { toast } from "sonner";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Article link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link to="/blog" className="hover:text-slate-900 flex items-center gap-1 font-medium">
            <ArrowLeft size={12} /> Back to Blog
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-slate-900 font-medium px-2.5 py-1 rounded bg-white border border-slate-200"
          >
            <Share2 size={12} /> Share Article
          </button>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                {post.category}
              </span>
              <span className="text-xs font-mono text-slate-400">• {post.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-indigo-900 text-white font-bold text-sm flex items-center justify-center">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{post.author}</p>
                <p className="text-[11px] text-slate-500">{post.authorRole} • Published on {post.date}</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
            <p className="font-medium text-slate-900 text-base sm:text-lg">
              {post.excerpt}
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">
              1. The Architectural Roots of the Problem
            </h2>
            <p>
              In concurrent distributed software, shared mutable state between asynchronous routines is the single most frequent source of non-deterministic data corruption. When goroutines execute asynchronously across multiple CPU cores, subtle race conditions manifest only under high contention.
            </p>

            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
              <p className="text-slate-500">// Go 1.22: Lexical scope semantics are strictly per-iteration</p>
              <p className="text-cyan-400">for i := range tasks &#123;</p>
              <p className="text-slate-300">    go func() &#123;</p>
              <p className="text-slate-300">        process(tasks[i]) <span className="text-emerald-400">// Safe: tasks[i] is guaranteed unaliased</span></p>
              <p className="text-slate-300">    &#125;()</p>
              <p className="text-cyan-400">&#125;</p>
            </div>

            <h2 className="text-xl font-bold text-slate-900 pt-4">
              2. Memory Profiling & Benchmark Validation
            </h2>
            <p>
              Benchmarking under DevDeep ephemeral micro-VM kernels showed zero measurable allocation overhead when compiled with Go 1.22. Escape analysis accurately identified that variables captured by value never escaped to heap storage unless referenced outside the enclosing lifecycle.
            </p>

            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-indigo-700" /> Key Takeaway for Systems Architects:
              </p>
              <p className="text-indigo-800 leading-relaxed">
                Upgrading your compiler to Go 1.22 immediately eliminates loop capture race conditions. However, existing AST linters and thread sanitizer passes remain essential for validating shared memory structures across lock-free channels.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 text-slate-600 border border-slate-200">
                #{t}
              </span>
            ))}
          </div>
        </article>

        {/* Read Next Bar */}
        <div className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <Link
            to="/blog"
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1.5"
          >
            <span>Explore More Engineering Articles</span>
            <ArrowLeft size={12} className="rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
