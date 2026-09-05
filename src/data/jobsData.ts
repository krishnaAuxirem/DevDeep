export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyInitials: string;
  companyColor: string; // Tailwind bg & text class
  location: string;
  city: "Mumbai" | "Pune" | "Bengaluru" | "Hyderabad" | "Delhi NCR" | "Chennai" | "Remote";
  workMode: "Remote" | "Hybrid" | "On-site";
  jobType: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract";
  salary: string;
  minSalaryLpa: number;
  maxSalaryLpa: number;
  experience: "Fresher" | "0–2 Years" | "2–5 Years" | "5+ Years";
  experienceText: string;
  skills: string[];
  category: string;
  posted: string;
  featured?: boolean;
  isRemote?: boolean;
  isInternship?: boolean;
  stipend?: string;
  duration?: string;
  department: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  aboutCompany: string;
}

export interface SkillInDemand {
  name: string;
  growth: string;
  jobsCount: string;
  demandLevel: "High demand" | "Trending" | "Surging";
  progressPercent: number;
}

export const QUICK_CATEGORIES = [
  "All Roles",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Python Developer",
  "AI/ML Engineer",
  "DevOps Engineer",
  "Data Engineer",
] as const;

export const SKILLS_IN_DEMAND: SkillInDemand[] = [
  { name: "React", growth: "+24% this quarter", jobsCount: "420+ open jobs", demandLevel: "High demand", progressPercent: 92 },
  { name: "TypeScript", growth: "+31% this quarter", jobsCount: "380+ open jobs", demandLevel: "Surging", progressPercent: 88 },
  { name: "Python", growth: "+28% this quarter", jobsCount: "350+ open jobs", demandLevel: "High demand", progressPercent: 85 },
  { name: "Node.js", growth: "+19% this quarter", jobsCount: "290+ open jobs", demandLevel: "High demand", progressPercent: 78 },
  { name: "SQL", growth: "+15% this quarter", jobsCount: "310+ open jobs", demandLevel: "High demand", progressPercent: 74 },
  { name: "AWS", growth: "+22% this quarter", jobsCount: "260+ open jobs", demandLevel: "Surging", progressPercent: 80 },
  { name: "Docker", growth: "+26% this quarter", jobsCount: "240+ open jobs", demandLevel: "High demand", progressPercent: 76 },
  { name: "Machine Learning", growth: "+45% this quarter", jobsCount: "210+ open jobs", demandLevel: "Surging", progressPercent: 95 },
  { name: "JavaScript", growth: "+12% this quarter", jobsCount: "450+ open jobs", demandLevel: "High demand", progressPercent: 90 },
  { name: "System Design", growth: "+34% this quarter", jobsCount: "190+ open jobs", demandLevel: "Surging", progressPercent: 86 },
];

export const JOBS_DATA: JobListing[] = [
  {
    id: "job-1",
    title: "Frontend Engineer",
    company: "NovaStack Technologies",
    companyInitials: "NS",
    companyColor: "bg-indigo-600 text-white",
    location: "Pune, Maharashtra",
    city: "Pune",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹8–14 LPA",
    minSalaryLpa: 8,
    maxSalaryLpa: 14,
    experience: "0–2 Years",
    experienceText: "1–3 years",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind"],
    category: "Frontend Developer",
    posted: "2 days ago",
    featured: true,
    isRemote: true,
    department: "Core UI Platform",
    aboutRole: "NovaStack is seeking a detail-oriented Frontend Engineer to help scale our enterprise dashboard applications. You will build high-performance, modular React components, optimize critical rendering paths, and work closely with product designers to ship fluid interfaces.",
    responsibilities: [
      "Architect and maintain reusable, accessible React + TypeScript component libraries.",
      "Profile and eliminate browser rendering bottlenecks to achieve steady 60fps telemetry flows.",
      "Collaborate with backend engineers to integrate GraphQL and REST endpoints with optimistic state updates.",
      "Write comprehensive unit and visual regression tests with Vitest and Playwright."
    ],
    requirements: [
      "1–3 years of professional frontend engineering experience with React & TypeScript.",
      "Deep understanding of modern CSS layout engines, Tailwind CSS, and DOM virtualization.",
      "Familiarity with state management patterns (Zustand, Redux Toolkit, or React Query).",
      "Demonstrated ability to produce production-grade code adhering to clean architecture standards."
    ],
    benefits: [
      "100% remote work flexibility with home-office setup allowance (₹40,000).",
      "Comprehensive medical insurance coverage for employee and dependents (₹10 Lakh).",
      "Annual professional learning & conference stipend (₹60,000).",
      "Generous wellness days and flexible paid time off."
    ],
    aboutCompany: "NovaStack Technologies builds modern telemetry and cloud analytics suites for fast-growing global startups. Headquartered in Pune with a distributed engineering culture across India."
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    company: "CloudForge Labs",
    companyInitials: "CF",
    companyColor: "bg-blue-600 text-white",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹14–22 LPA",
    minSalaryLpa: 14,
    maxSalaryLpa: 22,
    experience: "2–5 Years",
    experienceText: "2–4 years",
    skills: ["React", "Node.js", "TypeScript", "AWS", "SQL"],
    category: "Full Stack Developer",
    posted: "1 day ago",
    featured: true,
    isRemote: false,
    department: "Platform Engineering",
    aboutRole: "Join CloudForge Labs as a Full Stack Developer building cloud orchestration services. You'll bridge frontend developer tooling with scalable Node.js microservices deployed across AWS ECS and PostgreSQL clusters.",
    responsibilities: [
      "Develop end-to-end features spanning React web clients down to Node.js backend services.",
      "Model and optimize relational database schemas and indexed queries in PostgreSQL.",
      "Design and deploy resilient RESTful and gRPC service APIs on AWS infrastructure.",
      "Lead code reviews, mentor junior peers, and uphold strict code quality benchmarks."
    ],
    requirements: [
      "2–4 years of full stack software engineering experience in production environments.",
      "Proficiency in Node.js runtime, asynchronous event loops, and TypeScript.",
      "Solid foundation in SQL query profiling, connection pooling, and ACID transaction boundaries.",
      "Hands-on experience with Docker containerization and AWS primitives (S3, ECS, RDS)."
    ],
    benefits: [
      "Hybrid workspace in Koramangala with state-of-the-art workstations and meal provisions.",
      "Competitive equity stock options (ESOPs) with transparent vesting schedules.",
      "Family health, dental, and vision insurance with cashless network hospital access.",
      "Bi-annual appraisal cycles and merit-based performance bonuses."
    ],
    aboutCompany: "CloudForge Labs empowers engineering teams with developer platforms that streamline cloud container deployments and Kubernetes observability."
  },
  {
    id: "job-3",
    title: "React Developer",
    company: "PixelGrid",
    companyInitials: "PG",
    companyColor: "bg-emerald-600 text-white",
    location: "Remote, India",
    city: "Remote",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹10–18 LPA",
    minSalaryLpa: 10,
    maxSalaryLpa: 18,
    experience: "2–5 Years",
    experienceText: "2–5 years",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind"],
    category: "React Developer",
    posted: "3 days ago",
    featured: true,
    isRemote: true,
    department: "Design Systems & Web",
    aboutRole: "PixelGrid is looking for a passionate React Developer who cares deeply about UI craftsmanship, micro-animations, and client-side performance. You'll create interactive design systems and customer-facing interfaces.",
    responsibilities: [
      "Translate Figma high-fidelity prototypes into pixel-perfect React UI components.",
      "Implement accessible keyboard navigation, ARIA standards, and responsive adaptations.",
      "Integrate motion graphics and physics-based animations with Framer Motion.",
      "Partner with product managers to deliver A/B tests with zero regression."
    ],
    requirements: [
      "2+ years of dedicated React.js production application development.",
      "Deep understanding of React hooks, custom state abstraction, and memoization rules.",
      "Mastery of modern CSS, CSS Modules, Tailwind CSS, and CSS-in-JS tooling.",
      "Strong aesthetic sensibility and attention to typography, spacing, and micro-interactions."
    ],
    benefits: [
      "Work from anywhere in India on asynchronous hours.",
      "MacBook Pro M3 Max or equivalent hardware provided upon joining.",
      "Annual remote co-working pass (WeWork / Awfis / Indiqube).",
      "Wellness allowance and mental health counseling support."
    ],
    aboutCompany: "PixelGrid is a creative technology studio crafting next-generation digital interfaces and interactive SaaS software for global clients."
  },
  {
    id: "job-4",
    title: "Backend Engineer",
    company: "DataMesh Systems",
    companyInitials: "DM",
    companyColor: "bg-purple-600 text-white",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹16–26 LPA",
    minSalaryLpa: 16,
    maxSalaryLpa: 26,
    experience: "2–5 Years",
    experienceText: "3–6 years",
    skills: ["Python", "SQL", "Docker", "AWS"],
    category: "Backend Developer",
    posted: "Just now",
    featured: false,
    isRemote: false,
    department: "Data Infrastructure",
    aboutRole: "DataMesh Systems is building high-throughput data processing pipelines. We need a Backend Engineer proficient in Python and distributed system design to construct real-time stream consumers and analytics APIs.",
    responsibilities: [
      "Construct distributed event ingestion pipelines using Python, Kafka, and Redis.",
      "Optimize low-latency SQL query engines querying multi-terabyte analytical tables.",
      "Implement fault-tolerant background workers with robust retry mechanics and dead-letter queues.",
      "Collaborate with Site Reliability Engineers to monitor telemetry metrics and error budgets."
    ],
    requirements: [
      "3+ years building high-load backend services and microservice architectures.",
      "Strong Python expertise (FastAPI, AsyncIO, Celery, SQLAlchemy).",
      "Solid grasp of relational databases (PostgreSQL) and caching strategies (Redis).",
      "Experience with containerized deployments via Docker and Kubernetes."
    ],
    benefits: [
      "Modern tech campus in HITEC City, Hyderabad.",
      "Generous sign-on bonus and relocation reimbursement.",
      "Comprehensive insurance covering parents and in-laws.",
      "Continuous learning sponsorship for AWS certifications."
    ],
    aboutCompany: "DataMesh Systems provides real-time streaming data infrastructure for FinTech and e-commerce leaders across South Asia."
  },
  {
    id: "job-5",
    title: "Python Developer",
    company: "AIWorks",
    companyInitials: "AW",
    companyColor: "bg-amber-600 text-white",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹12–20 LPA",
    minSalaryLpa: 12,
    maxSalaryLpa: 20,
    experience: "2–5 Years",
    experienceText: "2–4 years",
    skills: ["Python", "SQL", "Docker", "AWS"],
    category: "Python Developer",
    posted: "4 days ago",
    featured: false,
    isRemote: true,
    department: "AI Products & Automation",
    aboutRole: "AIWorks builds automated workflow bots and intelligent document parsing platforms. We are seeking a Python Developer to develop asynchronous API microservices, automate extraction pipelines, and integrate frontier model endpoints.",
    responsibilities: [
      "Build scalable REST APIs using FastAPI and Pydantic with strict typing.",
      "Implement OCR and document parsing pipelines with asynchronous Celery workers.",
      "Integrate vector search indices (pgvector, Qdrant) with relational storage.",
      "Maintain automated CI/CD pipelines and unit test suites with pytest."
    ],
    requirements: [
      "2–4 years of production software development with Python 3.10+.",
      "Demonstrated experience with asynchronous programming (asyncio, httpx, FastAPI).",
      "Good understanding of relational database schema design, indexing, and SQL optimization.",
      "Experience working with cloud storage (S3/GCS) and Docker container workflows."
    ],
    benefits: [
      "Flexible remote working policy with flexible core hours.",
      "Quarterly performance incentives in addition to base pay.",
      "Internet, mobile, and co-working reimbursement.",
      "Dedicated conference budget for PyCon India and PyData."
    ],
    aboutCompany: "AIWorks is an AI-first software company automating complex financial and legal workflows with custom model orchestration."
  },
  {
    id: "job-6",
    title: "AI/ML Engineer",
    company: "NeuralEdge",
    companyInitials: "NE",
    companyColor: "bg-rose-600 text-white",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹22–35 LPA",
    minSalaryLpa: 22,
    maxSalaryLpa: 35,
    experience: "2–5 Years",
    experienceText: "3–5 years",
    skills: ["Machine Learning", "Python", "Docker", "AWS"],
    category: "AI/ML Engineer",
    posted: "1 day ago",
    featured: true,
    isRemote: false,
    department: "Applied AI Research",
    aboutRole: "NeuralEdge is developing edge-compatible LLM inference systems. As an AI/ML Engineer, you will fine-tune models, optimize token latency using vLLM and TensorRT-LLM, and deploy mission-critical intelligence pipelines.",
    responsibilities: [
      "Fine-tune open-weight models (Llama, Mistral) on domain-specific corpora using LoRA / QLoRA.",
      "Benchmark and profile inference throughput, latency, and memory footprint on NVIDIA GPU clusters.",
      "Build retrieval-augmented generation (RAG) pipelines with hybrid keyword-vector retrieval.",
      "Collaborate with product teams to translate business requirements into quantitative ML evaluations."
    ],
    requirements: [
      "3–5 years in applied machine learning, deep learning, or NLP engineering.",
      "Strong proficiency in PyTorch, Hugging Face ecosystem, and Python.",
      "Hands-on experience with LLM serving runtimes (vLLM, Ollama, Triton, or TensorRT-LLM).",
      "Solid mathematical foundations in linear algebra, probability, and optimization algorithms."
    ],
    benefits: [
      "Access to state-of-the-art dedicated GPU cluster infrastructure (H100/A100s).",
      "Top-tier compensation with lucrative equity allocations.",
      "Generous book and research paper publication stipends.",
      "Premium workspace in Indiranagar, Bengaluru with catered gourmet lunches."
    ],
    aboutCompany: "NeuralEdge creates specialized foundation models and high-efficiency inference runtimes for low-latency enterprise applications."
  },
  {
    id: "job-7",
    title: "Node.js Developer",
    company: "DevCore",
    companyInitials: "DC",
    companyColor: "bg-teal-600 text-white",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹12–19 LPA",
    minSalaryLpa: 12,
    maxSalaryLpa: 19,
    experience: "2–5 Years",
    experienceText: "2–5 years",
    skills: ["Node.js", "TypeScript", "JavaScript", "SQL", "Docker"],
    category: "Node.js Developer",
    posted: "3 days ago",
    featured: false,
    isRemote: false,
    department: "Backend Services",
    aboutRole: "DevCore operates a payment and invoicing API engine processing millions of monthly transactions. We are looking for an experienced Node.js Developer who excels at backend architecture, high availability, and secure transactions.",
    responsibilities: [
      "Develop highly available transaction processing microservices using Node.js and TypeScript.",
      "Implement idempotent API endpoints and webhook delivery mechanisms.",
      "Optimize MongoDB and PostgreSQL read/write query latencies under spike traffic.",
      "Ensure compliance with PCI-DSS and Indian data residency standards."
    ],
    requirements: [
      "2–5 years of professional backend development with Node.js.",
      "Strong command of TypeScript, Express/Fastify/NestJS, and asynchronous patterns.",
      "Experience with database transactions, locking mechanisms, and database migrations.",
      "Familiarity with message brokers (RabbitMQ or Kafka) and Redis caching."
    ],
    benefits: [
      "Prime office location in Bandra Kurla Complex (BKC), Mumbai.",
      "Annual health checkup and extensive hospitalization insurance.",
      "Flexible hybrid model (2 days in office, 3 days remote).",
      "Annual bonus tied to company profitability and personal milestones."
    ],
    aboutCompany: "DevCore provides modern financial connectivity APIs, payout rails, and invoicing infrastructure for Indian businesses."
  },
  {
    id: "job-8",
    title: "Software Engineer",
    company: "CodeOrbit",
    companyInitials: "CO",
    companyColor: "bg-indigo-700 text-white",
    location: "Delhi NCR",
    city: "Delhi NCR",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹10–16 LPA",
    minSalaryLpa: 10,
    maxSalaryLpa: 16,
    experience: "0–2 Years",
    experienceText: "1–3 years",
    skills: ["Java", "SQL", "Docker", "AWS"],
    category: "Software Engineer",
    posted: "2 days ago",
    featured: false,
    isRemote: true,
    department: "Core Systems",
    aboutRole: "CodeOrbit is seeking a Software Engineer to join our core backend engineering team. You will build resilient microservices, scale transactional databases, and help maintain high-availability cloud systems.",
    responsibilities: [
      "Design and maintain Java Spring Boot microservices powering core business workflows.",
      "Write clean, modular code with high test coverage and documentation.",
      "Participate in daily standups, architectural retrospectives, and peer code reviews.",
      "Diagnose and resolve production issues alongside our DevOps support team."
    ],
    requirements: [
      "1–3 years of software engineering experience using Java or C#.",
      "Familiarity with Spring Boot, Hibernate/JPA, and relational databases (MySQL/PostgreSQL).",
      "Knowledge of fundamental data structures, algorithms, and system architecture patterns.",
      "Understanding of Git branching workflows, pull requests, and CI pipelines."
    ],
    benefits: [
      "Fully remote position with home connectivity allowance.",
      "Performance-linked incentives paid out semi-annually.",
      "Comprehensive medical insurance for self and family.",
      "Paid certifications and skill upgrade pathways on DevDeep."
    ],
    aboutCompany: "CodeOrbit builds enterprise ERP and supply-chain logistics platforms for fast-growing Indian retail brands."
  },
  {
    id: "job-9",
    title: "DevOps Engineer",
    company: "CloudScale",
    companyInitials: "CS",
    companyColor: "bg-cyan-600 text-white",
    location: "Pune, Maharashtra",
    city: "Pune",
    workMode: "Remote",
    jobType: "Full-time",
    salary: "₹15–24 LPA",
    minSalaryLpa: 15,
    maxSalaryLpa: 24,
    experience: "2–5 Years",
    experienceText: "3–6 years",
    skills: ["AWS", "Docker", "Python"],
    category: "DevOps Engineer",
    posted: "Just now",
    featured: false,
    isRemote: true,
    department: "Cloud Infrastructure & SRE",
    aboutRole: "CloudScale helps high-velocity tech teams automate their delivery pipelines and maintain 99.99% uptime. We're looking for a DevOps Engineer with strong Kubernetes and Terraform expertise.",
    responsibilities: [
      "Architect and provision Infrastructure as Code (IaC) using Terraform on AWS.",
      "Manage and optimize multi-tenant Kubernetes (EKS) clusters with automated node scaling.",
      "Build robust CI/CD deployment pipelines utilizing GitHub Actions and ArgoCD.",
      "Implement centralized logging, telemetry, and alerting with Prometheus and Grafana."
    ],
    requirements: [
      "3–6 years of dedicated DevOps or Site Reliability Engineering experience.",
      "In-depth knowledge of AWS cloud services (VPC, IAM, EKS, CloudFront, Route53).",
      "Strong scripting capabilities in Python, Bash, or Go.",
      "Solid experience containerizing applications and debugging Linux networking issues."
    ],
    benefits: [
      "100% remote flexibility with quarterly in-person team retreats.",
      "Broad health insurance coverage including zero-deductible outpatient treatment.",
      "Generous hardware refresh every 2 years.",
      "On-call compensation and dedicated compensatory off days."
    ],
    aboutCompany: "CloudScale is a managed cloud operations and infrastructure consulting firm serving unicorns and enterprise clients."
  },
  {
    id: "job-10",
    title: "Junior Software Developer",
    company: "TechNova",
    companyInitials: "TN",
    companyColor: "bg-slate-800 text-white",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    workMode: "On-site",
    jobType: "Full-time",
    salary: "₹5–8 LPA",
    minSalaryLpa: 5,
    maxSalaryLpa: 8,
    experience: "Fresher",
    experienceText: "Fresher / 0–2 years",
    skills: ["JavaScript", "React", "SQL"],
    category: "Software Engineer",
    posted: "5 days ago",
    featured: false,
    isRemote: false,
    department: "Digital Solutions",
    aboutRole: "TechNova is hiring Junior Software Developers looking to jumpstart their career. You will receive structured mentorship from Senior Staff Engineers while contributing code directly to customer-facing SaaS applications.",
    responsibilities: [
      "Implement UI screens and client-side logic using JavaScript and React.",
      "Write SQL queries to fetch, transform, and display data for management reports.",
      "Fix bug tickets, write unit tests, and participate in code review cycles.",
      "Complete guided internal onboarding modules and technical skill certifications."
    ],
    requirements: [
      "Degree in Computer Science, Information Technology, or equivalent self-taught portfolio.",
      "Solid grasp of JavaScript (ES6+), HTML5, CSS3, and core programming fundamentals.",
      "Basic understanding of Git version control and relational database concepts.",
      "Strong curiosity, problem-solving mindset, and passion for continuous learning."
    ],
    benefits: [
      "Structured 6-month engineering mentorship program with dedicated Senior mentors.",
      "Subsidized cafeteria food and company bus transportation in Chennai.",
      "Medical insurance coverage of ₹5 Lakh for employee.",
      "Annual promotion and career advancement track."
    ],
    aboutCompany: "TechNova delivers digital transformation software, CRM implementations, and enterprise solutions for international logistics and retail clients."
  },
  {
    id: "job-11",
    title: "React Intern",
    company: "BuildLabs",
    companyInitials: "BL",
    companyColor: "bg-emerald-700 text-white",
    location: "Remote, India",
    city: "Remote",
    workMode: "Remote",
    jobType: "Internship",
    salary: "₹30,000–35,000/mo",
    minSalaryLpa: 3.6,
    maxSalaryLpa: 4.2,
    stipend: "₹35,000 / month INR",
    duration: "6 Months (PPO Opportunity)",
    experience: "Fresher",
    experienceText: "0–1 year / Fresher",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind"],
    category: "React Developer",
    posted: "1 day ago",
    featured: true,
    isRemote: true,
    isInternship: true,
    department: "Frontend Labs",
    aboutRole: "Kickstart your frontend engineering career with BuildLabs! You'll build real-world React UI components, learn state management best practices, and work directly with senior engineers on active consumer products.",
    responsibilities: [
      "Build modular React components following provided Figma design specifications.",
      "Integrate REST API endpoints with proper error handling and loading skeletons.",
      "Help maintain frontend documentation and Storybook component catalogs.",
      "Collaborate in daily virtual standups and engineering sprint planning."
    ],
    requirements: [
      "Strong foundation in React, modern JavaScript, and CSS/Tailwind.",
      "Portfolio of at least 2 personal or academic projects built with React.",
      "Familiarity with Git (commits, branches, pull requests).",
      "Available for a full-time 6-month commitment with intent to convert to Full-Time."
    ],
    benefits: [
      "Competitive monthly stipend of ₹35,000 INR with pre-placement offer (PPO) potential up to ₹10 LPA.",
      "100% remote with flexible working hours.",
      "1-on-1 mentorship from an experienced Staff Frontend Engineer.",
      "Certificate of Internship and verified DevDeep portfolio badge upon completion."
    ],
    aboutCompany: "BuildLabs is an innovation incubator launching high-growth developer tools and web applications."
  },
  {
    id: "job-12",
    title: "Full Stack Intern",
    company: "StartupForge",
    companyInitials: "SF",
    companyColor: "bg-amber-700 text-white",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    workMode: "Hybrid",
    jobType: "Internship",
    salary: "₹30,000–45,000/mo",
    minSalaryLpa: 3.6,
    maxSalaryLpa: 5.4,
    stipend: "₹40,000 / month INR",
    duration: "6 Months (Pre-Placement Offer)",
    experience: "Fresher",
    experienceText: "Fresher / College Graduate",
    skills: ["React", "Node.js", "JavaScript", "SQL"],
    category: "Full Stack Developer",
    posted: "3 days ago",
    featured: false,
    isRemote: false,
    isInternship: true,
    department: "Product Engineering",
    aboutRole: "StartupForge is hiring ambitious Full Stack Interns in Bengaluru. You'll gain hands-on experience across the entire product lifecycle from React frontend interfaces to Node.js backend services and cloud deployments.",
    responsibilities: [
      "Develop new features using React, Node.js, and PostgreSQL.",
      "Write unit tests and ensure dependable API integrations.",
      "Participate in product brainstorms and sprint demonstrations.",
      "Document architectural decisions and contribute to developer onboarding guides."
    ],
    requirements: [
      "Current final-year college student or recent graduate in Computer Science or related fields.",
      "Practical experience building full stack apps with Node.js and React.",
      "Understanding of SQL databases and RESTful API conventions.",
      "Eager to learn fast and embrace feedback in an agile startup pace."
    ],
    benefits: [
      "Generous stipend of ₹40,000 / month with fast-track Full-Time hiring (PPO: ₹12–16 LPA).",
      "Modern collaborative office space in HSR Layout, Bengaluru.",
      "Free snacks, beverages, and team lunches.",
      "Direct mentorship from founding engineers."
    ],
    aboutCompany: "StartupForge is a venture-backed tech studio building SaaS platforms and developer productivity infrastructure."
  },
  {
    id: "job-13",
    title: "Data Engineer",
    company: "DataMesh Systems",
    companyInitials: "DM",
    companyColor: "bg-purple-600 text-white",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "₹18–28 LPA",
    minSalaryLpa: 18,
    maxSalaryLpa: 28,
    experience: "2–5 Years",
    experienceText: "3–6 years",
    skills: ["SQL", "Python", "Docker", "AWS"],
    category: "Data Engineer",
    posted: "3 days ago",
    featured: false,
    isRemote: false,
    department: "Big Data & Lakehouse",
    aboutRole: "Build scalable ETL/ELT pipelines, manage Apache Spark / Trino querying clusters, and establish data governance pipelines for high-volume enterprise ingestion.",
    responsibilities: [
      "Develop and optimize automated data ingestion pipelines using Python and SQL.",
      "Manage cloud data warehouse models and partitioning strategies.",
      "Ensure end-to-end data quality checks, reconciliation, and alerting."
    ],
    requirements: [
      "3+ years building data pipelines in production environments.",
      "Expertise in SQL, data modeling, and Python scripting.",
      "Familiarity with distributed data tools (Spark, Airflow, Snowflake, or BigQuery)."
    ],
    benefits: [
      "Hybrid work arrangement in Hyderabad.",
      "Comprehensive insurance and annual family health benefits.",
      "Annual conference and technical certification sponsorship."
    ],
    aboutCompany: "DataMesh Systems provides enterprise data lakehouse infrastructure and analytics platforms."
  },
  {
    id: "job-14",
    title: "Senior Cloud Platform Architect",
    company: "CloudScale",
    companyInitials: "CS",
    companyColor: "bg-cyan-600 text-white",
    location: "Remote, India",
    city: "Remote",
    workMode: "Remote",
    jobType: "Contract",
    salary: "₹30–45 LPA",
    minSalaryLpa: 30,
    maxSalaryLpa: 45,
    experience: "5+ Years",
    experienceText: "6+ years",
    skills: ["AWS", "Docker", "Python"],
    category: "DevOps Engineer",
    posted: "4 days ago",
    featured: true,
    isRemote: true,
    department: "Enterprise Architecture",
    aboutRole: "Lead enterprise cloud migration architectures, design zero-trust multi-region networks, and audit Kubernetes security postures for multinational corporations.",
    responsibilities: [
      "Formulate multi-region, disaster-resilient AWS cloud deployment topologies.",
      "Establish automated Terraform IaC compliance guardrails and FinOps cost optimizations.",
      "Provide senior technical consultation to VP of Engineering and CTO stakeholders."
    ],
    requirements: [
      "6+ years of specialized cloud infrastructure and distributed systems architecture.",
      "AWS Solutions Architect Professional certification or equivalent proven pedigree.",
      "Extensive experience with Kubernetes at scale, service meshes (Istio), and eBPF observability."
    ],
    benefits: [
      "Lucrative contract rates with flexible milestone delivery.",
      "100% remote flexibility from anywhere in India.",
      "Direct strategic leadership engagement."
    ],
    aboutCompany: "CloudScale is an elite cloud architecture and security advisory firm."
  }
];

export const INTERNSHIP_OPPORTUNITIES = JOBS_DATA.filter(j => j.isInternship || j.jobType === "Internship");
export const REMOTE_OPPORTUNITIES = JOBS_DATA.filter(j => j.isRemote || j.workMode === "Remote");
export const FEATURED_OPPORTUNITIES = JOBS_DATA.filter(j => j.featured);
