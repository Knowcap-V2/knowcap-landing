// Job descriptions and requirements for AI scoring
export const jobDescriptions: Record<string, {
  title: string
  keyRequirements: string[]
  mustHaves: string[]
  niceToHaves: string[]
  responsibilities: string[]
}> = {
  'founding-ai-engineer': {
    title: 'Founding AI Engineer (Path to CTO)',
    keyRequirements: [
      '5-7+ years professional software engineering experience',
      'Deep hands-on experience with RAG pipelines',
      'Strong architectural and systems thinking',
      'High proficiency in Python and ML ecosystem',
      'Pragmatic, high-ownership mindset for startup environment'
    ],
    mustHaves: [
      'Proven track record of shipping complex systems in cloud environment',
      'Expert in chunking, embedding, and hybrid search strategies',
      'Understanding of trade-offs between different models',
      'Experience with LLM workflows and orchestration'
    ],
    niceToHaves: [
      'Hands-on experience with multimodal AI models',
      'Experience with LangChain, LangGraph or equivalent',
      'Knowledge of vector databases (Pinecone, Weaviate)',
      'Experience with reranking pipelines'
    ],
    responsibilities: [
      'Build multimodal alignment systems',
      'Design and implement RAG/retrieval layer',
      'Build orchestration and reliability layer',
      'Create evaluation and observability frameworks'
    ]
  },
  'head-of-growth': {
    title: 'Head of Growth (Revenue Partner)',
    keyRequirements: [
      '5-7+ years growth or revenue experience',
      'Proven track record building demand generation engines',
      'Strong analytical and data-driven mindset',
      'Experience with B2B SaaS or agency sales',
      'Ability to own strategy and execution'
    ],
    mustHaves: [
      'Experience building and optimizing funnels',
      'Strong understanding of marketing analytics',
      'Proven ability to generate qualified leads',
      'Experience with growth experiments'
    ],
    niceToHaves: [
      'Experience in AI/ML product marketing',
      'Knowledge of content marketing',
      'Experience with partner/referral programs'
    ],
    responsibilities: [
      'Own growth strategy and execution',
      'Build demand generation engine',
      'Optimize conversion funnels',
      'Generate qualified demo pipeline'
    ]
  },
  'content-creator-intern': {
    title: 'Content Creator Intern',
    keyRequirements: [
      'Strong storytelling and content creation skills',
      'Experience with video editing and social media',
      'Understanding of build-in-public movement',
      'Creative mindset with execution ability',
      'Passion for startups and entrepreneurship'
    ],
    mustHaves: [
      'Portfolio of content work',
      'Proficiency with content creation tools',
      'Understanding of social media platforms',
      'Ability to create engaging content'
    ],
    niceToHaves: [
      'Experience with tech content',
      'Knowledge of AI/ML space',
      'Video production skills',
      'Audience building experience'
    ],
    responsibilities: [
      'Create build-in-public content',
      'Document company journey',
      'Manage social media presence',
      'Engage with startup community'
    ]
  },
  'product-manager': {
    title: 'Product Manager',
    keyRequirements: [
      '3-5+ years product management experience',
      'Strong technical background',
      'Experience with AI/ML products',
      'User-centric product thinking',
      'Data-driven decision making'
    ],
    mustHaves: [
      'Experience building 0-to-1 products',
      'Strong understanding of user needs',
      'Ability to work with engineering teams',
      'Experience with roadmap planning'
    ],
    niceToHaves: [
      'Technical degree or engineering background',
      'Experience with AI products',
      'Knowledge of RAG systems',
      'Enterprise product experience'
    ],
    responsibilities: [
      'Own product roadmap and vision',
      'Translate user needs into features',
      'Work closely with engineering',
      'Define success metrics'
    ]
  },
  'qa-specialist': {
    title: 'AI Trust & Reliability Specialist (QA)',
    keyRequirements: [
      '3-5+ years QA or testing experience',
      'Strong attention to detail',
      'Experience with AI/ML testing',
      'Understanding of quality frameworks',
      'Analytical mindset'
    ],
    mustHaves: [
      'Experience testing AI systems',
      'Knowledge of test automation',
      'Understanding of data quality',
      'Experience with regression testing'
    ],
    niceToHaves: [
      'Experience with LLM testing',
      'Knowledge of hallucination detection',
      'Python or automation skills',
      'Experience with observability tools'
    ],
    responsibilities: [
      'Ensure AI output quality',
      'Build testing frameworks',
      'Detect and prevent hallucinations',
      'Maintain quality standards'
    ]
  },
  'executive-assistant': {
    title: 'Executive Assistant',
    keyRequirements: [
      '2-4+ years executive assistant experience',
      'Exceptional organizational skills',
      'Strong written and verbal communication',
      'Ability to handle confidential information',
      'Proactive problem-solving mindset'
    ],
    mustHaves: [
      'Experience supporting C-level executives',
      'Calendar and meeting management',
      'Travel coordination experience',
      'Professional communication skills'
    ],
    niceToHaves: [
      'Experience in tech startups',
      'Project coordination experience',
      'Knowledge of productivity tools',
      'Event planning experience'
    ],
    responsibilities: [
      'Manage executive calendar and meetings',
      'Coordinate travel and logistics',
      'Handle confidential correspondence',
      'Support strategic initiatives'
    ]
  }
}

export function getJobDescription(roleId: string) {
  return jobDescriptions[roleId] || null
}
