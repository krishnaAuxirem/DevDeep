import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Star, Clock, Users, ArrowRight, ArrowLeft,
  CheckCircle2, Sparkles, Terminal, Shield, Play, FileCode, Check
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { COURSES_CATALOG } from "./CoursesPage";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const course = COURSES_CATALOG.find((c) => c.id === id) || COURSES_CATALOG[0];

  const modules = [
    { number: 1, title: "Architectural Overview & Failure Invariants", duration: "2.5 hrs", labs: 2 },
    { number: 2, title: "State Machine Replication & Append-Only Logs", duration: "3.5 hrs", labs: 3 },
    { number: 3, title: "Leader Election Protocols & Split-Brain Mitigation", duration: "4.0 hrs", labs: 4 },
    { number: 4, title: "Compaction, Snapshotting & Disk Synchronization", duration: "3.0 hrs", labs: 2 },
    { number: 5, title: "Linearizable Read Quorums & Leases", duration: "2.5 hrs", labs: 3 },
    { number: 6, title: "Production Chaos Engineering & Partition Injection", duration: "2.5 hrs", labs: 2 },
  ];

  const handleStartLearning = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: `Please log in to start learning ${course.title}.`,
      });
      navigate(`/register?redirect=/courses/${course.id}`);
      return;
    }
    toast.success("Enrolled successfully! Launching sandbox environment...");
    navigate("/learning");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/courses" className="hover:text-slate-900 flex items-center gap-1 font-medium">
            <ArrowLeft size={12} /> Back to Courses
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{course.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
              {course.level}
            </span>
            <span className="px-2.5 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
              {course.price}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-auto">
              Course ID: {course.id}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600 font-mono border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="fill-amber-500 text-amber-500" />
              <strong className="text-slate-900 font-bold">{course.rating}</strong>
              <span className="text-slate-400">({course.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-indigo-600" />
              <span>{course.studentsCount.toLocaleString()} Engineers Enrolled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-500" />
              <span>{course.duration} Interactive Sandbox Work</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleStartLearning}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <span>Start Course Labs Now</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => {
                toast.info("Course curriculum syllabus downloaded to clipboard.");
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Share Syllabus
            </button>
          </div>
        </div>

        {/* Detailed Syllabus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Curriculum & Sandbox Syllabus</h2>
            <span className="text-xs font-mono text-slate-500">6 Modules • 16 Labs</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
            {modules.map((m) => (
              <div key={m.number} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase">
                    Module {m.number}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">{m.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                    <span>{m.duration}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{m.labs} Interactive Labs</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <Play size={12} className="ml-0.5 text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor Bio */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Your Lead Instructor</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-900 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
              {course.instructor.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{course.instructor}</h3>
              <p className="text-xs text-indigo-700 font-medium">{course.instructorRole}</p>
              <p className="text-xs text-slate-500 mt-1">
                Verified instructor with over a decade of production infrastructure experience across multi-region distributed databases.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Ready to begin this course?</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Get instant access to real Go 1.22 sandboxes, automated AST evaluator feedback, and peer discussions.
          </p>
          <button
            onClick={handleStartLearning}
            className="mt-2 px-6 py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold shadow-sm inline-flex items-center gap-2"
          >
            <span>Enroll in Course</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
