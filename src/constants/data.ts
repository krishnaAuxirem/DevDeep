import type { User, Challenge, ActivityDay, LearningPath, Project, Mentor, PricingPlan } from "@/types";

export const CURRENT_USER: User = {
  id: "u1",
  name: "Alex Volkov",
  username: "alexvolkov",
  avatar: "AV",
  title: "Staff Distributed Systems Engineer",
  level: 7,
  levelLabel: "Staff",
  streak: 84,
  xp: 892,
  rank: 142,
  rankTotal: 38400,
  marketReadiness: 94,
  submissions: 512,
  productionDeploys: 4,
  location: "San Francisco, CA / Remote",
  joinedDate: "October 2022",
  bio: "Building low-latency fault-tolerant storage engines, Raft state machines & edge data pipelines.",
};

export const generateHeatmap = (): ActivityDay[] => {
  const days: ActivityDay[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const rand = Math.random();
    const count = rand < 0.3 ? 0 : rand < 0.5 ? 1 : rand < 0.7 ? 3 : rand < 0.85 ? 6 : rand < 0.95 ? 10 : 14;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
    days.push({ date: d.toISOString().split("T")[0], count, level: level as 0|1|2|3|4 });
  }
  return days;
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "lp1",
    title: "Distributed Systems & High-Performance Go",
    description: "Master Raft consensus, distributed transactions, and high-throughput data pipelines in Go.",
    progress: 68,
    totalModules: 12,
    currentModule: 8,
    category: "Systems",
    difficulty: "Expert",
    duration: "42 hours",
    tags: ["Go", "Raft", "Consensus", "Distributed"],
  },
  {
    id: "lp2",
    title: "Algorithms & Concurrency Primitives",
    description: "Lock-free data structures, concurrent algorithms, and memory model mastery.",
    progress: 91,
    totalModules: 8,
    currentModule: 7,
    category: "Algorithms",
    difficulty: "Hard",
    duration: "28 hours",
    tags: ["Go", "Rust", "Atomics", "Lock-free"],
  },
  {
    id: "lp3",
    title: "Database Internals & Storage Engines",
    description: "Build LSM-Trees, B-Trees, WAL, and MVCC from scratch with production benchmarks.",
    progress: 45,
    totalModules: 10,
    currentModule: 5,
    category: "Databases",
    difficulty: "Expert",
    duration: "36 hours",
    tags: ["RocksDB", "LSM", "MVCC", "Storage"],
  },
  {
    id: "lp4",
    title: "Cloud & Systems Security",
    description: "Zero-knowledge proofs, cryptographic protocols, and security-first architecture.",
    progress: 30,
    totalModules: 6,
    currentModule: 2,
    category: "Security",
    difficulty: "Hard",
    duration: "20 hours",
    tags: ["ZKP", "Crypto", "Security", "Cloud"],
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "Distributed Rate Limiter (Token Bucket Algorithm)",
    difficulty: "Hard",
    points: 300,
    acceptance: 67.4,
    tags: ["Distributed Systems", "Concurrency", "Redis & In-Memory", "sync/atomic"],
    description: "Design and implement a high-throughput, thread-safe Token Bucket Rate Limiter in Go.",
    category: "Distributed Systems",
  },
  {
    id: "c2",
    title: "Concurrent Worker Pool with Graceful Shutdown",
    difficulty: "Hard",
    points: 250,
    acceptance: 54.2,
    tags: ["Concurrency", "Go", "Context", "WaitGroup"],
    description: "Implement a worker pool with context cancellation and graceful shutdown.",
    category: "Concurrency",
  },
  {
    id: "c3",
    title: "Zero-Knowledge Proof Arithmetic Circuit Verifier",
    difficulty: "Expert",
    points: 500,
    acceptance: 12.8,
    tags: ["Cryptography", "ZKP", "Groth16", "Curve BN254"],
    description: "Implement a Groth16 polynomial verifier over BN254 elliptic curve.",
    category: "Cryptography",
  },
  {
    id: "c4",
    title: "Raft Leader Election & Log Replication",
    difficulty: "Expert",
    points: 450,
    acceptance: 23.1,
    tags: ["Raft", "Consensus", "Distributed", "State Machine"],
    description: "Implement the Raft consensus protocol with leader election and log replication.",
    category: "Distributed Systems",
  },
  {
    id: "c5",
    title: "Lock-Free MPSC Ring Buffer",
    difficulty: "Hard",
    points: 280,
    acceptance: 38.5,
    tags: ["Lock-free", "Atomics", "Ring Buffer", "Go"],
    description: "Implement a lock-free multi-producer single-consumer ring buffer.",
    category: "Concurrency",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "S3-Compatible Distributed Object Storage Engine",
    category: "Distributed Storage",
    score: 98,
    description: "Fault-tolerant storage node implementation featuring chunked multipart streaming, Raft state replication, and custom RocksDB block cache.",
    metrics: [
      { label: "Throughput", value: "120,400 IOPS" },
      { label: "Test Coverage", value: "98.4% passing" },
      { label: "Consensus", value: "Raft (hashicorp)" },
      { label: "p99 Latency", value: "1.82 ms" },
    ],
    techStack: ["Go 1.23", "RocksDB", "gRPC", "Docker"],
    verified: true,
  },
  {
    id: "p2",
    title: "Edge AI Inference Gateway with SSE & Backpressure",
    category: "Edge Streaming",
    score: 96,
    description: "Sub-millisecond token pipeline proxy built for distributed LLM inference streams, enforcing client-aware backpressure buffer and zero-copy SSE.",
    metrics: [
      { label: "Memory Footprint", value: "< 14 MB RSS" },
      { label: "Edge Edge-P99", value: "820 μs" },
      { label: "Concurrent Conns", value: "85,000 / node" },
      { label: "Allocations", value: "0 in fast-path" },
    ],
    techStack: ["Rust 2024", "Tokio", "Cloudflare Workers", "Wasm"],
    verified: true,
  },
];

export const MENTORS: Mentor[] = [
  {
    id: "m1",
    name: "Alexey Volkov",
    title: "Principal Cloud Architect",
    company: "Meta",
    avatar: "AV",
    available: true,
    specialties: ["Distributed Systems", "Raft", "Go"],
    nextSession: "Thursday • 6:30 PM IST (In 2 Days)",
  },
  {
    id: "m2",
    name: "Priya Sharma",
    title: "Senior Staff Engineer",
    company: "Cloudflare",
    avatar: "PS",
    available: true,
    specialties: ["Edge Computing", "Rust", "WASM"],
    nextSession: "Friday • 4:00 PM IST",
  },
  {
    id: "m3",
    name: "James Chen",
    title: "Distinguished Engineer",
    company: "Stripe",
    avatar: "JC",
    available: false,
    specialties: ["Databases", "Storage Engines", "Reliability"],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Explorer",
    price: 0,
    priceINR: 0,
    period: "forever",
    description: "Start your journey with 5 challenges/month and basic learning paths.",
    features: [
      "5 coding challenges / month",
      "3 learning path previews",
      "Community code review",
      "Basic activity tracking",
      "Public profile",
    ],
    highlighted: false,
  },
  {
    name: "Engineer",
    price: 1499,
    priceINR: 1499,
    period: "month",
    description: "Unlimited challenges, AI mentor access, and verified project portfolio.",
    features: [
      "Unlimited coding challenges",
      "Full curriculum access",
      "AI Mentor (50 sessions/mo)",
      "Automated code review",
      "Verified project portfolio",
      "Career radar & job matching",
      "1:1 mentor sessions (2/mo)",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Staff",
    price: 3999,
    priceINR: 3999,
    period: "month",
    description: "Enterprise-grade features for engineers targeting Staff+ roles.",
    features: [
      "Everything in Engineer",
      "Unlimited AI Mentor sessions",
      "AI pair architect (GPT-5)",
      "Staff benchmark certification",
      "Priority partner company radar",
      "Custom learning roadmaps",
      "Unlimited 1:1 mentor sessions",
      "Cryptographic proof credentials",
    ],
    highlighted: false,
    badge: "Staff Track",
  },
];

export const ACTIVITY_FEED = [
  {
    id: "af1",
    type: "challenge",
    title: "Passed Challenge: Distributed Rate Limiter (Token Bucket)",
    detail: "Validated concurrency semantics under 50,000 req/sec load test. Latency p99 at 1.4ms.",
    tags: ["100% test pass", "Go Runtime", "BenchmarkBreach-12"],
    time: "2 hrs ago",
    color: "emerald",
  },
  {
    id: "af2",
    type: "review",
    title: "AI Code Review completed: Cache Invalidation PR #42",
    detail: "Discovered stale-read window in Redis lease negotiation. Recommended sliding expiration ttl fallback.",
    tags: ["+12 Maintainability", "3 suggestions applied"],
    time: "5 hrs ago",
    color: "cyan",
  },
  {
    id: "af3",
    type: "milestone",
    title: "Milestone reached: S3-Compatible Object Storage",
    detail: "Milestone 2 completed. Multipart upload chunks with cryptographic SHA-256 validation pipeline.",
    tags: ["Production Verified", "Architecture Score: 98%"],
    time: "Yesterday",
    color: "blue",
  },
];

export const GOALS = [
  {
    id: "g1",
    done: true,
    title: "Implement AppendEntries RPC heartbeats in Go sandbox",
    xp: "+30 XP",
    detail: "Completed via sandbox auto-evaluator • 4 tests passed",
    color: "emerald",
  },
  {
    id: "g2",
    done: false,
    title: "Solve Daily Challenge: Concurrent Worker Pool with Graceful Shutdown",
    xp: "HARD • 300 pts",
    detail: "Requires context cancellation, sync.WaitGroup, and panic recovery handling",
    color: "amber",
    hard: true,
  },
  {
    id: "g3",
    done: false,
    title: "Review AI Mentor recommendations on PostgreSQL index contention",
    xp: "15 min",
    detail: "Diagnostic report generated for high-traffic write pipeline",
    color: "blue",
  },
];

export const CODE_REVIEW_FILES = [
  { name: "redis_store.go", path: "internal/cache", added: 42, removed: 18, status: "Active", statusColor: "blue", issue: "1 Critical Concurrency Fix" },
  { name: "invalidation.go", path: "internal/cache", added: 112, removed: 4, issue: "1 Warning", statusColor: "amber" },
  { name: "token_bucket.go", path: "pkg/limiter", added: 15, removed: 12, issue: "Clean", statusColor: "emerald" },
  { name: "cache.yaml", path: "config", added: 6, removed: 2, issue: "Verified", statusColor: "cyan" },
];

export const SKILL_MATRIX = [
  { label: "Distributed Consensus & Raft", value: 96, badge: "Staff L7" },
  { label: "Concurrency & Lock-Free Primitives", value: 94, badge: "Expert" },
  { label: "LSM-Trees & Storage Engines", value: 91, badge: "Advanced" },
  { label: "High-Throughput Network I/O", value: 89, badge: "Advanced" },
];
