export const defaultAILab = [
  {
    id: 'exp-rag-enterprise',
    title: 'Self-Corrective Multi-Stage RAG',
    category: 'Information Retrieval',
    status: 'Operational',
    description: 'Autonomous retrieval pipeline with active hallucination detection, confidence threshold checking, and iterative fallback web querying.',
    tags: ['RAG', 'Vector Embeddings', 'Hallucination Mitigation', 'ChromaDB'],
    metrics: { latency: '180ms', precision: '94.8%', contextWindow: '1M tokens' },
    codeSnippet: `// Dynamic RAG Query Routing
const context = await retrieveHybridEmbeddings(query, {
  denseWeight: 0.7,
  sparseWeight: 0.3,
  topK: 5
});
const verification = await assessFaithfulness(context, query);
if (verification.confidence < 0.85) {
  return fallbackRefinedSearch(query);
}`
  },
  {
    id: 'exp-exam-copilot',
    title: 'Adaptive Exam Copilot & Question Synthesis',
    category: 'Assessment & Pedagogy',
    status: 'Beta Testing',
    description: 'Generates syllabus-aligned exam problem sets across Bloom Taxonomy cognitive stages with automated difficulty balancing and rubrics.',
    tags: ['Question Generation', 'Socratic Tutor', 'LaTeX Rendering', 'LLMs'],
    metrics: { accuracy: '96.2%', questionsGenerated: '12,400+', format: 'JSON / LaTeX' },
    codeSnippet: `// Socratic Hint Synthesis Engine
export async function generateSocraticHint(problem, studentWork) {
  return llm.generate({
    instruction: "Guide without revealing the final equation or answer.",
    problem,
    studentStep: studentWork.lastStep
  });
}`
  },
  {
    id: 'exp-doc-intelligence',
    title: 'Vision-Augmented Document Intelligence',
    category: 'Document Analysis',
    status: 'Operational',
    description: 'Combines multimodal document parsing with coordinate-aware spatial OCR to accurately extract nested financial tables and engineering blueprints.',
    tags: ['Document AI', 'Multimodal LLM', 'Spatial OCR', 'Table Extraction'],
    metrics: { tableAccuracy: '98.4%', processingSpeed: '1.2s/page', formats: 'PDF / TIFF / PNG' },
    codeSnippet: `// Coordinate-Aware Table Extraction
const extractedTable = await documentAI.parseSpatialGrid(pageImage, {
  detectHeaders: true,
  preserveCellTypes: true
});`
  },
  {
    id: 'exp-semantic-telemetry',
    title: 'High-Density Vector Telemetry & Search',
    category: 'Semantic Search',
    status: 'Prototype',
    description: 'Sub-millisecond approximate nearest neighbor search over million-vector operational logs to pinpoint system anomalies before threshold breach.',
    tags: ['Semantic Search', 'HNSW Indexing', 'Anomaly Detection', 'Embeddings'],
    metrics: { indexSize: '1.4M vectors', p99Latency: '8.4ms', recallRate: '99.1%' },
    codeSnippet: `// Low-latency HNSW Vector Nearest Neighbor
const anomalies = await vectorIndex.query({
  vector: currentTelemetryVector,
  distanceMetric: 'cosine',
  threshold: 0.92
});`
  }
];
