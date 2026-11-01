export const defaultProjects = [
  {
    id: 'proj-hyperion-rag',
    title: 'Hyperion RAG Neural Engine',
    shortDescription: 'High-throughput enterprise document intelligence and vector retrieval pipeline.',
    description: 'An end-to-end cognitive search and question-answering architecture capable of parsing multi-modal enterprise documents (PDFs, spreadsheets, technical schematics). Implements hybrid dense-sparse vector indexing, automated chunk optimization, and dynamic re-ranking to yield sub-200ms grounded answers.',
    techStack: ['React', 'Node.js', 'Vector DB', 'Gemini API', 'PostgreSQL', 'Framer Motion'],
    category: 'AI Systems',
    features: [
      'Hybrid dense & sparse embedding retrieval engine',
      'Context-aware dynamic chunking with metadata tagging',
      'Real-time streaming LLM response with verifiable citations',
      'Sub-200ms semantic search with re-ranking filters',
      'Secure enterprise multi-tenant role isolation'
    ],
    github: 'https://github.com/santhosh/hyperion-rag-engine',
    liveDemo: 'https://hyperion-demo.santhosh.dev',
    image: '',
    status: 'Completed',
    featured: true
  },
  {
    id: 'proj-ai-exam-assistant',
    title: 'Cognitive Exam Assistant & Evaluator',
    shortDescription: 'Adaptive AI-powered question generator, proctoring assistant, and personalized evaluator.',
    description: 'Built to empower students and educators with real-time semantic assessment. Generates multi-tier difficulty assessments from curriculum syllabi, provides conversational step-by-step Socratic hints without giving away solutions, and scores complex written answers with granular rubric breakdowns.',
    techStack: ['React', 'Express.js', 'LLM Inference', 'MySQL', 'Tailwind CSS'],
    category: 'Full-Stack & AI',
    features: [
      'Automated bloom-taxonomy aligned question synthesis',
      'Socratic dialogue tutor with contextual hint generation',
      'Multi-modal mathematical formula rendering via LaTeX',
      'Rubric-based deterministic semantic grading engine',
      'Analytics dashboard tracking student mastery trajectories'
    ],
    github: 'https://github.com/santhosh/ai-exam-assistant',
    liveDemo: 'https://exam-ai.santhosh.dev',
    image: '',
    status: 'Completed',
    featured: true
  },
  {
    id: 'proj-nexus-orchestrator',
    title: 'Nexus Autonomous Agent Swarm',
    shortDescription: 'Multi-agent coordination protocol for autonomous software engineering workflows.',
    description: 'A distributed autonomous agent orchestration layer that decomposes complex software specifications into discrete planning, coding, reviewing, and deployment phases. Features shared memory reflection, tool sandboxing, and automated rollback triggers.',
    techStack: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'React Dashboard'],
    category: 'AI Systems',
    features: [
      'Self-healing plan execution with reflection loops',
      'Sandboxed tool execution with security boundary gates',
      'Shared agent memory graph utilizing Redis state caches',
      'Live WebSocket event telemetry feed'
    ],
    github: 'https://github.com/santhosh/nexus-agent-swarm',
    liveDemo: 'https://nexus-swarm.santhosh.dev',
    image: '',
    status: 'In Progress',
    featured: true
  },
  {
    id: 'proj-cinematic-studio',
    title: 'Verve Spatial Design System',
    shortDescription: 'Next-gen glassmorphism component library with GPU-accelerated micro-interactions.',
    description: 'An open-source reactive component ecosystem engineered for modern dark-mode applications requiring cinematic fidelity, spatial depth, and fluid 60fps animations on both mobile and high-refresh desktop monitors.',
    techStack: ['React', 'Vite', 'CSS Variables', 'Framer Motion'],
    category: 'Design Systems',
    features: [
      'Zero-runtime overhead CSS variable architecture',
      'Adaptive backdrop-filter blur degradation for low-spec devices',
      'Full keyboard accessibility and WAI-ARIA compliance',
      'Dynamic theme ambient glow coordination'
    ],
    github: 'https://github.com/santhosh/verve-spatial-ui',
    liveDemo: 'https://verve-ui.santhosh.dev',
    image: '',
    status: 'Completed',
    featured: false
  },
  {
    id: 'proj-pulse-mesh',
    title: 'Pulse Realtime Telemetry Hub',
    shortDescription: 'Ultra-low latency WebSocket monitoring dashboard with spatial node visualizations.',
    description: 'Real-time telemetry and metrics ingestion platform handling 50k events/sec. Visualizes cluster health, request latency distributions, and AI model token consumption in a clean dark-glass HUD.',
    techStack: ['Node.js', 'Express', 'WebSocket', 'React', 'Canvas API'],
    category: 'Backend & Systems',
    features: [
      'Sub-5ms WebSocket transmission pipeline',
      'Canvas 2D particle visualization of real-time server traffic',
      'Custom threshold alert hooks with Discord & Slack triggers',
      'Persistent time-series indexing in MySQL'
    ],
    github: 'https://github.com/santhosh/pulse-telemetry-hub',
    liveDemo: 'https://pulse-telemetry.santhosh.dev',
    image: '',
    status: 'Experimental',
    featured: false
  }
];
