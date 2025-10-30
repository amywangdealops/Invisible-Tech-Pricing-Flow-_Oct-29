import React, { useEffect, useState, createElement } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, Info, Building2, ChevronDown, Plus, Search, Package, X, Cpu, Database, Zap, Target, GitBranch, LineChart, Shield, TrendingUp, Activity, Briefcase, Landmark, Building, ShoppingBag, Code, Users, Trophy, Cloud, DollarSign, MessageSquare, Mail, FileText, BarChart3, AlertCircle } from 'lucide-react';
// Core AI Services for Invisible Tech
const coreProducts = [{
  id: 'model-orchestration',
  name: 'Model Orchestration',
  icon: GitBranch,
  description: 'Coordinate multiple AI models for optimal performance',
  defaultFor: ['finance', 'healthcare', 'insurance', 'retail', 'technology', 'public-sector', 'sports', 'model-provider']
}, {
  id: 'rag-context',
  name: 'RAG & Context Optimization',
  icon: Database,
  description: 'Retrieve and refine information pipelines for context',
  defaultFor: ['finance', 'healthcare', 'insurance', 'technology', 'public-sector', 'model-provider']
}, {
  id: 'synthetic-data',
  name: 'Synthetic Data & Fine-Tuning',
  icon: Zap,
  description: 'Generate datasets to enhance model accuracy and fit',
  defaultFor: ['ai-training', 'finance', 'healthcare', 'model-provider']
}, {
  id: 'evaluation',
  name: 'Evaluation & Benchmarking',
  icon: Target,
  description: 'Test models for relevance, accuracy, and compliance',
  defaultFor: ['ai-training', 'finance', 'healthcare', 'insurance', 'model-provider']
}, {
  id: 'agent-workflow',
  name: 'Agent Workflow Automation',
  icon: Cpu,
  description: 'Deploy multi-step AI agents for business automation',
  defaultFor: ['finance', 'healthcare', 'insurance', 'retail', 'technology', 'public-sector']
}];
// Use cases by industry
const useCasesByIndustry = {
  'ai-training': [{
    id: 'rag-optimization',
    name: 'RAG Pipeline Optimization',
    icon: Database,
    description: 'Improve retrieval accuracy and reduce hallucinations'
  }, {
    id: 'llm-training-speed',
    name: 'LLM Training Acceleration',
    icon: Zap,
    description: 'Automate data curation to reduce training costs'
  }, {
    id: 'red-teaming',
    name: 'AI Red-Teaming',
    icon: Shield,
    description: 'Test and harden model behavior against adversarial attacks'
  }, {
    id: 'synthetic-edge-cases',
    name: 'Synthetic Data Generation',
    icon: GitBranch,
    description: 'Create rare examples for improved model coverage'
  }, {
    id: 'seo-content-gen',
    name: 'SEO Content Optimization',
    icon: TrendingUp,
    description: 'Generate optimized content aligned with search trends'
  }],
  finance: [{
    id: 'investment-strategy',
    name: 'Investment Strategy AI',
    icon: TrendingUp,
    description: 'Real-time insights and portfolio optimization'
  }, {
    id: 'credit-risk',
    name: 'Credit Risk Modeling',
    icon: BarChart3,
    description: 'Evaluate creditworthiness using real-time data'
  }, {
    id: 'compliance-monitoring',
    name: 'Compliance Monitoring',
    icon: Shield,
    description: 'Automate detection of regulatory non-compliance'
  }, {
    id: 'fraud-detection',
    name: 'Fraud Detection',
    icon: AlertCircle,
    description: 'Flag suspicious transactions with anomaly detection'
  }, {
    id: 'deal-sourcing',
    name: 'Intelligent Deal Sourcing',
    icon: Search,
    description: 'Identify opportunities using AI-powered scanning'
  }],
  healthcare: [{
    id: 'clinical-workflow',
    name: 'Clinical Workflow Optimization',
    icon: Activity,
    description: 'Triage requests and reduce administrative burden'
  }, {
    id: 'automated-documentation',
    name: 'Automated Documentation',
    icon: FileText,
    description: 'Generate clinical notes from voice or EHR data'
  }, {
    id: 'predictive-care',
    name: 'Predictive Care Planning',
    icon: TrendingUp,
    description: 'Identify at-risk patients and recommend interventions'
  }, {
    id: 'medical-image-triage',
    name: 'Medical Image Triage',
    icon: Target,
    description: 'Pre-screen imaging results to flag anomalies'
  }, {
    id: 'knowledge-retrieval',
    name: 'Clinical Knowledge Retrieval',
    icon: Database,
    description: 'Surface relevant medical research at point of care'
  }],
  insurance: [{
    id: 'claims-automation',
    name: 'Claims Automation',
    icon: Zap,
    description: 'Automate validation and fraud detection workflows'
  }, {
    id: 'underwriting-automation',
    name: 'Underwriting Automation',
    icon: FileText,
    description: 'Extract data for faster risk evaluation'
  }, {
    id: 'predictive-analytics',
    name: 'Predictive Analytics',
    icon: TrendingUp,
    description: 'Predict profitability and improve premium pricing'
  }, {
    id: 'insurance-fraud',
    name: 'Fraud Detection',
    icon: Shield,
    description: 'Identify vulnerabilities and strengthen detection'
  }, {
    id: 'self-service-chatbot',
    name: 'Customer Self-Service',
    icon: MessageSquare,
    description: 'Enable instant claim status and quote updates'
  }],
  retail: [{
    id: 'recruitment-automation',
    name: 'Recruitment Automation',
    icon: Users,
    description: 'Pre-screen candidates and reduce time-to-hire'
  }, {
    id: 'onboarding-speed',
    name: 'Seller Onboarding',
    icon: Zap,
    description: 'Automate document validation and catalog syncing'
  }, {
    id: 'sku-enrichment',
    name: 'SKU Enrichment',
    icon: Package,
    description: 'Auto-fill metadata and enhance discoverability'
  }, {
    id: 'dynamic-pricing',
    name: 'Dynamic Pricing',
    icon: DollarSign,
    description: 'Optimize pricing based on demand predictions'
  }, {
    id: 'visual-search',
    name: 'Visual Search',
    icon: Search,
    description: 'Enable image recognition and contextual matching'
  }],
  technology: [{
    id: 'product-adoption',
    name: 'Product Adoption Insights',
    icon: TrendingUp,
    description: 'Identify friction points and personalize onboarding'
  }, {
    id: 'data-enrichment',
    name: 'Data Quality Enrichment',
    icon: Database,
    description: 'Standardize and complete customer data fields'
  }, {
    id: 'developer-support',
    name: 'Developer Support Agents',
    icon: Code,
    description: 'Resolve technical issues and reduce support backlog'
  }, {
    id: 'api-integration',
    name: 'API Integration Acceleration',
    icon: Cpu,
    description: 'Automate code generation and documentation'
  }, {
    id: 'predictive-rollout',
    name: 'Predictive Feature Rollout',
    icon: GitBranch,
    description: 'Simulate adoption outcomes before deployment'
  }],
  'public-sector': [{
    id: 'document-processing',
    name: 'Smart Document Processing',
    icon: FileText,
    description: 'Digitize and classify government records'
  }, {
    id: 'citizen-chatbots',
    name: 'Citizen Service Chatbots',
    icon: MessageSquare,
    description: 'Provide multilingual assistance for permits and benefits'
  }, {
    id: 'infrastructure-maintenance',
    name: 'Predictive Maintenance',
    icon: Activity,
    description: 'Predict failures in utilities and transportation'
  }, {
    id: 'policy-simulation',
    name: 'Policy Impact Simulation',
    icon: BarChart3,
    description: 'Model outcomes of proposed policies'
  }, {
    id: 'fraud-waste-detection',
    name: 'Fraud & Waste Detection',
    icon: Shield,
    description: 'Identify misuse of public funds'
  }],
  sports: [{
    id: 'athlete-performance',
    name: 'Athlete Performance Optimization',
    icon: Activity,
    description: 'Analyze data to personalize training and prevent injuries'
  }, {
    id: 'fan-engagement',
    name: 'Fan Engagement Analytics',
    icon: Users,
    description: 'Recommend content and merchandise to increase loyalty'
  }, {
    id: 'game-summarization',
    name: 'Automated Game Summarization',
    icon: FileText,
    description: 'Generate highlights and statistics from footage'
  }, {
    id: 'sponsorship-roi',
    name: 'Sponsorship ROI Analysis',
    icon: DollarSign,
    description: 'Measure brand partnership impact'
  }, {
    id: 'predictive-scouting',
    name: 'Predictive Scouting',
    icon: Search,
    description: 'Identify emerging talent across leagues'
  }],
  'model-provider': [{
    id: 'fine-tuning-service',
    name: 'Fine-Tuning as a Service',
    icon: Zap,
    description: 'Domain-specific model adaptation pipelines'
  }, {
    id: 'automated-benchmarking',
    name: 'Automated Benchmarking',
    icon: Target,
    description: 'Test performance across standardized datasets'
  }, {
    id: 'rag-frameworks',
    name: 'RAG Optimization Frameworks',
    icon: Database,
    description: 'APIs for retrieval-augmented generation'
  }, {
    id: 'interpretability',
    name: 'Model Interpretability',
    icon: LineChart,
    description: 'Visualize reasoning and explainability metrics'
  }, {
    id: 'multi-model-orchestration',
    name: 'Multi-Model Orchestration',
    icon: GitBranch,
    description: 'Dynamic routing between models based on query type'
  }]
};
// Additional custom products for drawer
const customProducts = [...coreProducts, {
  id: 'analytics',
  name: 'Advanced Analytics',
  icon: LineChart,
  description: 'Comprehensive reporting and business intelligence',
  defaultFor: []
}, {
  id: 'api-access',
  name: 'API Access',
  icon: Cpu,
  description: 'Direct integration with your systems',
  defaultFor: []
}];
// Pricing metrics options
const pricingMetrics = [{
  id: 'per-seat',
  name: 'Per Seat/Month',
  icon: Users,
  description: 'Fixed monthly fee per agent or user seat',
  defaultFor: ['technology', 'finance', 'healthcare']
}, {
  id: 'per-api-call',
  name: 'Per API Call',
  icon: Cpu,
  description: 'Pay per API request to AI services',
  defaultFor: ['model-provider', 'technology']
}, {
  id: 'per-transaction',
  name: 'Per Transaction',
  icon: DollarSign,
  description: 'Pay per completed business transaction',
  defaultFor: ['finance', 'insurance', 'retail']
}, {
  id: 'per-document',
  name: 'Per Document',
  icon: Package,
  description: 'Pay per document processed or analyzed',
  defaultFor: ['healthcare', 'insurance', 'public-sector']
}, {
  id: 'per-model-run',
  name: 'Per Model Run',
  icon: Zap,
  description: 'Pay per model inference or evaluation',
  defaultFor: ['ai-training', 'model-provider']
}, {
  id: 'base-subscription',
  name: 'Base Subscription',
  icon: DollarSign,
  description: 'Fixed monthly base fee with included usage',
  defaultFor: []
}];
// Customer types
const customerTypes = [{
  id: 'ai-training',
  name: 'AI Training & Operations',
  icon: Activity,
  description: 'Model iteration and quality assurance'
}, {
  id: 'finance',
  name: 'Finance & Investment',
  icon: TrendingUp,
  description: 'Analytics, risk, and compliance automation'
}, {
  id: 'healthcare',
  name: 'Healthcare',
  icon: Activity,
  description: 'Clinical documentation and predictive care'
}, {
  id: 'insurance',
  name: 'Insurance',
  icon: Shield,
  description: 'Claims processing and underwriting'
}, {
  id: 'retail',
  name: 'Retail & E-Commerce',
  icon: ShoppingBag,
  description: 'Marketplace intelligence and automation'
}, {
  id: 'technology',
  name: 'Technology & SaaS',
  icon: Code,
  description: 'Product enablement and data enrichment'
}, {
  id: 'public-sector',
  name: 'Public Sector',
  icon: Landmark,
  description: 'Government services and infrastructure'
}, {
  id: 'sports',
  name: 'Sports & Entertainment',
  icon: Trophy,
  description: 'Performance analytics and fan engagement'
}, {
  id: 'model-provider',
  name: 'Model Provider',
  icon: Cloud,
  description: 'AI infrastructure and orchestration'
}, {
  id: 'custom',
  name: 'Custom',
  icon: Plus,
  description: 'Create your own industry category'
}];
// Milestones for project phases
const milestones = [{
  id: 'benchmarking',
  name: 'Benchmarking',
  icon: Target,
  description: 'Evaluate current performance and set baseline metrics',
  order: 1
}, {
  id: 'prototype',
  name: 'Prototype',
  icon: Zap,
  description: 'Build initial proof-of-concept solution',
  order: 2
}, {
  id: 'systems-integration',
  name: 'Systems Integration',
  icon: GitBranch,
  description: 'Connect with existing infrastructure and workflows',
  order: 3
}, {
  id: 'qa',
  name: 'QA',
  icon: Shield,
  description: 'Quality assurance testing and validation',
  order: 4
}, {
  id: 'full-scale-rollout',
  name: 'Full Scale Rollout',
  icon: TrendingUp,
  description: 'Deploy solution across entire organization',
  order: 5
}];
// Utility function to convert hyphenated IDs to display names
const formatDisplayName = (id: string): string => {
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
// Keyword mapping for use cases
const useCaseKeywords: Record<string, string[]> = {
  'rag-optimization': ['data', 'retrieval', 'search', 'knowledge', 'information', 'accuracy', 'hallucination'],
  'llm-training-speed': ['training', 'model', 'ai', 'machine learning', 'data', 'automation', 'speed'],
  'red-teaming': ['security', 'testing', 'adversarial', 'safety', 'risk', 'vulnerability'],
  'synthetic-edge-cases': ['data generation', 'synthetic', 'training data', 'edge cases', 'rare'],
  'seo-content-gen': ['content', 'seo', 'marketing', 'optimization', 'search'],
  'investment-strategy': ['investment', 'portfolio', 'trading', 'finance', 'strategy', 'market'],
  'credit-risk': ['credit', 'risk', 'lending', 'underwriting', 'financial'],
  'compliance-monitoring': ['compliance', 'regulation', 'audit', 'legal', 'policy'],
  'fraud-detection': ['fraud', 'security', 'anomaly', 'detection', 'risk'],
  'deal-sourcing': ['deal', 'sourcing', 'investment', 'opportunities', 'analysis'],
  'clinical-workflow': ['clinical', 'healthcare', 'workflow', 'patient', 'medical'],
  'automated-documentation': ['documentation', 'notes', 'records', 'automation', 'clinical'],
  'predictive-care': ['predictive', 'care', 'patient', 'health', 'intervention'],
  'medical-image-triage': ['medical', 'imaging', 'radiology', 'diagnosis', 'triage'],
  'knowledge-retrieval': ['knowledge', 'research', 'medical', 'information', 'retrieval'],
  'claims-automation': ['claims', 'insurance', 'automation', 'processing'],
  'underwriting-automation': ['underwriting', 'risk', 'insurance', 'evaluation'],
  'predictive-analytics': ['predictive', 'analytics', 'forecasting', 'data'],
  'insurance-fraud': ['fraud', 'insurance', 'detection', 'claims'],
  'self-service-chatbot': ['chatbot', 'customer service', 'self-service', 'support'],
  'recruitment-automation': ['recruitment', 'hiring', 'hr', 'candidates', 'screening'],
  'onboarding-speed': ['onboarding', 'seller', 'vendor', 'automation'],
  'sku-enrichment': ['product', 'catalog', 'sku', 'metadata', 'enrichment'],
  'dynamic-pricing': ['pricing', 'dynamic', 'optimization', 'revenue'],
  'visual-search': ['search', 'visual', 'image', 'recognition'],
  'product-adoption': ['product', 'adoption', 'user', 'onboarding', 'engagement'],
  'data-enrichment': ['data', 'quality', 'enrichment', 'cleansing'],
  'developer-support': ['developer', 'technical', 'support', 'api', 'integration'],
  'api-integration': ['api', 'integration', 'automation', 'development'],
  'predictive-rollout': ['rollout', 'deployment', 'feature', 'predictive'],
  'document-processing': ['document', 'processing', 'digitization', 'records'],
  'citizen-chatbots': ['citizen', 'government', 'service', 'public', 'chatbot'],
  'infrastructure-maintenance': ['infrastructure', 'maintenance', 'predictive', 'utilities'],
  'policy-simulation': ['policy', 'simulation', 'government', 'impact'],
  'fraud-waste-detection': ['fraud', 'waste', 'detection', 'public funds'],
  'athlete-performance': ['athlete', 'sports', 'performance', 'training'],
  'fan-engagement': ['fan', 'engagement', 'sports', 'entertainment'],
  'game-summarization': ['game', 'sports', 'highlights', 'summarization'],
  'sponsorship-roi': ['sponsorship', 'roi', 'marketing', 'brand'],
  'predictive-scouting': ['scouting', 'talent', 'sports', 'recruitment'],
  'fine-tuning-service': ['fine-tuning', 'model', 'training', 'customization'],
  'automated-benchmarking': ['benchmarking', 'testing', 'evaluation', 'performance'],
  'rag-frameworks': ['rag', 'retrieval', 'framework', 'optimization'],
  interpretability: ['interpretability', 'explainability', 'transparency', 'model'],
  'multi-model-orchestration': ['orchestration', 'model', 'routing', 'optimization']
};
// Function to extract keywords from text
const extractKeywords = (text: string): string[] => {
  const normalized = text.toLowerCase();
  const words = normalized.split(/\s+/);
  return words.filter(word => word.length > 3); // Filter out short words
};
// Function to calculate relevance score
const calculateRelevanceScore = (description: string, useCase: any): number => {
  const descriptionKeywords = extractKeywords(description);
  const useCaseKeywordList = useCaseKeywords[useCase.id] || [];
  // Also extract keywords from use case name and description
  const useCaseText = `${useCase.name} ${useCase.description}`.toLowerCase();
  let score = 0;
  // Score based on keyword matches
  descriptionKeywords.forEach(keyword => {
    if (useCaseKeywordList.some(useCaseKeyword => useCaseKeyword.includes(keyword) || keyword.includes(useCaseKeyword))) {
      score += 2;
    }
    if (useCaseText.includes(keyword)) {
      score += 1;
    }
  });
  return score;
};
// Function to get intelligent use case suggestions
const getIntelligentUseCases = (description: string): any[] => {
  const allUseCases = Object.values(useCasesByIndustry).flat();
  if (!description || description.trim().length < 10) {
    // If description is too short, return first 6 use cases
    return allUseCases.slice(0, 6);
  }
  // Score all use cases
  const scoredUseCases = allUseCases.map(useCase => ({
    ...useCase,
    score: calculateRelevanceScore(description, useCase)
  }));
  // Sort by score and always return top 6
  const sortedUseCases = scoredUseCases.sort((a, b) => b.score - a.score);
  return sortedUseCases.slice(0, 6);
};
export function ConfigurationStep() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [customerType, setCustomerType] = useState('');
  const [customIndustryName, setCustomIndustryName] = useState('');
  const [customIndustryDescription, setCustomIndustryDescription] = useState('');
  const [showCustomIndustryModal, setShowCustomIndustryModal] = useState(false);
  const [selectedCore, setSelectedCore] = useState<string[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');
  const [selectedDealTypes, setSelectedDealTypes] = useState<string[]>([]);
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    id: string;
    pricingMetric: string;
  }>>([]);
  const [showCustomerTypeDropdown, setShowCustomerTypeDropdown] = useState(false);
  const [showCustomProductDrawer, setShowCustomProductDrawer] = useState(false);
  const [customProductSearch, setCustomProductSearch] = useState('');
  const [customProductCategory, setCustomProductCategory] = useState<string | null>(null);
  const [showCustomUseCaseModal, setShowCustomUseCaseModal] = useState(false);
  const [customUseCaseName, setCustomUseCaseName] = useState('');
  const [customUseCaseDescription, setCustomUseCaseDescription] = useState('');
  const [customUseCases, setCustomUseCases] = useState<any[]>([]);
  // Deal type options
  const dealTypes = [{
    id: 'data-labeling',
    name: 'Data Labeling',
    description: 'High-quality data annotation and labeling services',
    icon: Database,
    multiSelect: false
  }, {
    id: 'enterprise-transformation',
    name: 'Enterprise Transformation',
    description: 'Comprehensive AI transformation and implementation',
    icon: TrendingUp,
    multiSelect: true
  }];
  // Restore state from URL params on mount
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const coreParam = searchParams.get('core');
    const useCaseParam = searchParams.get('useCase');
    const customNameParam = searchParams.get('customName');
    const customDescParam = searchParams.get('customDesc');
    if (typeParam) {
      setCustomerType(typeParam);
    }
    if (customNameParam) {
      setCustomIndustryName(customNameParam);
    }
    if (customDescParam) {
      setCustomIndustryDescription(customDescParam);
    }
    if (coreParam) {
      const coreIds = coreParam.split(',');
      setSelectedCore(coreIds);
    }
    if (useCaseParam) {
      setSelectedUseCase(useCaseParam);
    }
  }, []);
  const toggleCore = (id: string) => {
    if (selectedCore.includes(id)) {
      setSelectedCore(selectedCore.filter(item => item !== id));
      setSelectedProducts(selectedProducts.filter(item => item.id !== id));
    } else {
      setSelectedCore([...selectedCore, id]);
      let defaultMetric = 'per-api-call';
      if (id === 'agent-workflow') defaultMetric = 'per-transaction';
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    }
  };
  const selectUseCase = (id: string) => {
    // Remove old use case from products if exists
    if (selectedUseCase) {
      setSelectedProducts(selectedProducts.filter(item => item.id !== selectedUseCase));
    }
    // Set new use case
    setSelectedUseCase(id);
    // Add new use case to products
    const defaultMetric = 'per-transaction';
    setSelectedProducts([...selectedProducts.filter(item => item.id !== selectedUseCase), {
      id,
      pricingMetric: defaultMetric
    }]);
  };
  const toggleDealType = (id: string) => {
    const dealType = dealTypes.find(dt => dt.id === id);
    if (!dealType) return;
    if (dealType.multiSelect) {
      // For multi-select deal types, toggle in array
      if (selectedDealTypes.includes(id)) {
        setSelectedDealTypes(selectedDealTypes.filter(item => item !== id));
      } else {
        setSelectedDealTypes([...selectedDealTypes, id]);
      }
    } else {
      // For single-select deal types, replace selection
      if (selectedDealTypes.includes(id)) {
        setSelectedDealTypes([]);
      } else {
        setSelectedDealTypes([id]);
      }
    }
  };
  const toggleMilestone = (id: string) => {
    if (selectedMilestones.includes(id)) {
      setSelectedMilestones(selectedMilestones.filter(item => item !== id));
      setSelectedProducts(selectedProducts.filter(item => item.id !== id));
    } else {
      setSelectedMilestones([...selectedMilestones, id]);
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: 'per-transaction'
      }]);
    }
  };
  const isMilestoneEnabled = (milestoneId: string) => {
    // Only enable if use cases are selected
    if (selectedUseCases.length === 0) return false;
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone) return false;
    // First milestone is always enabled
    if (milestone.order === 1) return true;
    // Check if previous milestone is selected
    const previousMilestone = milestones.find(m => m.order === milestone.order - 1);
    return previousMilestone ? selectedMilestones.includes(previousMilestone.id) : false;
  };
  const addCustomProduct = (id: string) => {
    const isCore = coreProducts.some(product => product.id === id);
    let defaultMetric = 'per-api-call';
    if (isCore && !selectedCore.includes(id)) {
      setSelectedCore([...selectedCore, id]);
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    } else if (!isCore) {
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    }
    setShowCustomProductDrawer(false);
  };
  const updatePricingMetric = (productId: string, metric: string) => {
    setSelectedProducts(selectedProducts.map(product => product.id === productId ? {
      ...product,
      pricingMetric: metric
    } : product));
  };
  const getProductName = (id: string) => {
    const coreProduct = coreProducts.find(p => p.id === id);
    if (coreProduct) return coreProduct.name;
    for (const industry in useCasesByIndustry) {
      const useCase = useCasesByIndustry[industry as keyof typeof useCasesByIndustry].find(uc => uc.id === id);
      if (useCase) return useCase.name;
    }
    const customProduct = customProducts.find(p => p.id === id);
    return customProduct ? customProduct.name : formatDisplayName(id);
  };
  const getProductIcon = (id: string) => {
    const coreProduct = coreProducts.find(p => p.id === id);
    if (coreProduct) return coreProduct.icon;
    for (const industry in useCasesByIndustry) {
      const useCase = useCasesByIndustry[industry as keyof typeof useCasesByIndustry].find(uc => uc.id === id);
      if (useCase) return useCase.icon;
    }
    const customProduct = customProducts.find(p => p.id === id);
    return customProduct ? customProduct.icon : Cpu;
  };
  const filteredCustomProducts = customProducts.filter(product => {
    const matchesSearch = customProductSearch === '' || product.name.toLowerCase().includes(customProductSearch.toLowerCase()) || product.description.toLowerCase().includes(customProductSearch.toLowerCase());
    const matchesCategory = customProductCategory === null || customProductCategory === 'core' && coreProducts.some(p => p.id === product.id) || customProductCategory === 'custom' && !coreProducts.some(p => p.id === product.id);
    return matchesSearch && matchesCategory;
  });
  const isProductSelected = (id: string) => {
    return selectedProducts.some(product => product.id === id);
  };
  const canProceed = customerType && selectedUseCase && selectedDealTypes.length > 0 && selectedMilestones.length > 0;
  const availableUseCases = customerType ? customerType === 'custom' ? [...getIntelligentUseCases(customIndustryDescription), ...customUseCases] : useCasesByIndustry[customerType as keyof typeof useCasesByIndustry] || [] : [];
  const handleCustomerTypeSelect = (typeId: string) => {
    if (typeId === 'custom') {
      setShowCustomIndustryModal(true);
      setShowCustomerTypeDropdown(false);
    } else {
      setCustomerType(typeId);
      setShowCustomerTypeDropdown(false);
    }
  };
  const saveCustomIndustry = () => {
    if (customIndustryName.trim()) {
      setCustomerType('custom');
      setShowCustomIndustryModal(false);
    }
  };
  useEffect(() => {
    if (customerType) {
      setSelectedCore([]);
      setSelectedUseCase('');
      setSelectedProducts([]);
      setSelectedMilestones([]);
    }
  }, [customerType]);
  // Auto-select all milestones when a use case is selected
  useEffect(() => {
    if (selectedUseCase) {
      // Select all milestones by default
      const allMilestoneIds = milestones.map(m => m.id);
      setSelectedMilestones(allMilestoneIds);
      // Add all milestones to products
      const milestoneProducts = allMilestoneIds.map(id => ({
        id,
        pricingMetric: 'per-transaction'
      }));
      // Keep existing products (use case) and add milestones
      setSelectedProducts(prev => {
        const nonMilestoneProducts = prev.filter(p => !milestones.some(m => m.id === p.id));
        return [...nonMilestoneProducts, ...milestoneProducts];
      });
    }
  }, [selectedUseCase]);
  // Auto-select all milestones when deal type is selected
  useEffect(() => {
    if (selectedDealTypes.length > 0) {
      // Select all milestones by default
      const allMilestoneIds = milestones.map(m => m.id);
      setSelectedMilestones(allMilestoneIds);
      // Add all milestones to products
      const milestoneProducts = allMilestoneIds.map(id => ({
        id,
        pricingMetric: 'per-transaction'
      }));
      // Keep existing products (use case) and add milestones
      setSelectedProducts(prev => {
        const nonMilestoneProducts = prev.filter(p => !milestones.some(m => m.id === p.id));
        return [...nonMilestoneProducts, ...milestoneProducts];
      });
    }
  }, [selectedDealTypes]);
  const handleNext = () => {
    const params = new URLSearchParams();
    params.set('type', customerType);
    params.set('core', selectedCore.join(','));
    if (selectedUseCase) {
      params.set('useCase', selectedUseCase);
    }
    if (customerType === 'custom') {
      params.set('customName', customIndustryName);
      params.set('customDesc', customIndustryDescription);
    }
    // Pass all selected products with their pricing metrics
    const productsData = selectedProducts.map(p => `${p.id}:${p.pricingMetric}`).join(',');
    params.set('products', productsData);
    // Determine which page to navigate to based on deal type selection
    if (selectedDealTypes.length === 1 && selectedDealTypes[0] === 'data-labeling') {
      // Only data labeling selected -> go to pricing calculator
      navigate(`/pricing-calculator?${params.toString()}`);
    } else {
      // Enterprise transformation selected (alone or with data labeling) -> go to volume
      navigate(`/volume?${params.toString()}`);
    }
  };
  const saveCustomUseCase = () => {
    if (customUseCaseName.trim()) {
      const newUseCase = {
        id: `custom-${Date.now()}`,
        name: customUseCaseName,
        description: customUseCaseDescription,
        icon: Target,
        isCustom: true
      };
      setCustomUseCases([...customUseCases, newUseCase]);
      setCustomUseCaseName('');
      setCustomUseCaseDescription('');
      setShowCustomUseCaseModal(false);
    }
  };
  return <div className="w-full bg-white">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Customer Opportunities
          </Link>
          <ArrowRight size={12} />
          <span className="font-medium text-black">Configure</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-2xl font-semibold mb-2">Configure Quote</h1>
        <p className="text-gray-500 mb-6">
          Select AI services and pricing metrics for your customer
        </p>
        <div className="space-y-6">
          {/* Customer Type Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">Industry</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Info size={14} />
                <span>This will pre-select recommended services</span>
              </div>
            </div>
            <div className="relative">
              <button className="w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center hover:border-gray-300" onClick={() => setShowCustomerTypeDropdown(!showCustomerTypeDropdown)}>
                {customerType ? <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {createElement(customerType === 'custom' ? Plus : customerTypes.find(type => type.id === customerType)?.icon || Building2, {
                    size: 18,
                    className: 'text-gray-600'
                  })}
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="font-medium">
                        {customerType === 'custom' ? customIndustryName || 'Custom Industry' : customerTypes.find(type => type.id === customerType)?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customerType === 'custom' ? customIndustryDescription || 'Custom industry category' : customerTypes.find(type => type.id === customerType)?.description}
                      </div>
                    </div>
                  </div> : <span className="text-gray-500">Select industry</span>}
                <ChevronDown size={16} className={showCustomerTypeDropdown ? 'transform rotate-180' : ''} />
              </button>
              {showCustomerTypeDropdown && <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {customerTypes.map(type => <button key={type.id} className="w-full p-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0" onClick={() => handleCustomerTypeSelect(type.id)}>
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <type.icon size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-gray-500">
                          {type.description}
                        </div>
                      </div>
                      {customerType === type.id && <Check size={16} className="ml-auto text-black" />}
                    </button>)}
                </div>}
            </div>
          </div>
          {/* Industry-Specific Use Cases */}
          {customerType && <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">
                  {customerType === 'custom' ? 'Select Use Cases' : 'Industry Use Cases'}
                </h2>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Info size={14} />
                  <span>
                    {customerType === 'custom' ? 'Choose applicable use cases for your custom industry' : 'Select specific use case for this industry'}
                  </span>
                </div>
              </div>
              {availableUseCases.length > 0 ? <>
                  <div className="grid grid-cols-2 gap-3">
                    {availableUseCases.map(useCase => {
                const UseCaseIcon = useCase.icon;
                return <button key={useCase.id} className={`p-3 border rounded-lg text-left transition-colors ${selectedUseCase === useCase.id ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => selectUseCase(useCase.id)}>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <UseCaseIcon size={18} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  {useCase.name}
                                  {useCase.isCustom && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                      Custom
                                    </span>}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {useCase.description}
                                </div>
                              </div>
                            </div>
                            {selectedUseCase === useCase.id && <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                <Check size={12} className="text-white" />
                              </div>}
                          </div>
                        </button>;
              })}
                  </div>
                  {customerType === 'custom' && <button onClick={() => setShowCustomUseCaseModal(true)} className="mt-3 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Plus size={18} />
                        <span className="font-medium">Add Custom Use Case</span>
                      </div>
                    </button>}
                </> : <div className="p-6 border border-gray-200 rounded-lg text-center">
                  <p className="text-gray-500">
                    No use cases available for this industry
                  </p>
                </div>}
            </div>}
          {/* Deal Type Selection */}
          {selectedUseCase && <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Deal Type</h2>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Info size={14} />
                  <span>Select the type of engagement</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {dealTypes.map(dealType => {
              const DealTypeIcon = dealType.icon;
              const isSelected = selectedDealTypes.includes(dealType.id);
              return <button key={dealType.id} className={`p-4 border rounded-lg text-left transition-colors ${isSelected ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleDealType(dealType.id)}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <DealTypeIcon size={18} className="text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {dealType.name}
                              {dealType.multiSelect && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                  Multi-select
                                </span>}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {dealType.description}
                            </div>
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-white" />
                          </div>}
                      </div>
                    </button>;
            })}
              </div>
            </div>}
          {/* Milestones - Show only when Enterprise Transformation is selected */}
          {selectedDealTypes.includes('enterprise-transformation') && <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Milestones</h2>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Info size={14} />
                  <span>Select project milestones</span>
                </div>
              </div>
              <div className="space-y-3">
                {milestones.map((milestone, index) => {
              const MilestoneIcon = milestone.icon;
              const isSelected = selectedMilestones.includes(milestone.id);
              return <div key={milestone.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-black' : 'bg-gray-200'}`}>
                          {isSelected ? <Check size={16} className="text-white" /> : <span className="text-sm font-medium text-gray-700">
                              {milestone.order}
                            </span>}
                        </div>
                        {index < milestones.length - 1 && <div className="w-0.5 h-8 bg-gray-200"></div>}
                      </div>
                      <button className={`flex-1 p-3 border rounded-lg text-left transition-colors ${isSelected ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleMilestone(milestone.id)}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <MilestoneIcon size={18} className="text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{milestone.name}</div>
                            <div className="text-sm text-gray-500">
                              {milestone.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>;
            })}
              </div>
            </div>}
          {/* Selected Products & Pricing Metrics */}
          {selectedProducts.filter(p => !coreProducts.some(cp => cp.id === p.id)).length > 0}
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Link to="/" className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium transition-colors hover:bg-gray-50">
            Cancel
          </Link>
          <button onClick={handleNext} disabled={!canProceed} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${canProceed ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
            Next
          </button>
        </div>
      </div>
      {/* Custom Industry Modal */}
      {showCustomIndustryModal && <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowCustomIndustryModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Create Custom Industry</h2>
              <button onClick={() => setShowCustomIndustryModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Industry Name
                </label>
                <input type="text" value={customIndustryName} onChange={e => setCustomIndustryName(e.target.value)} placeholder="e.g., Manufacturing, Education, etc." className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea value={customIndustryDescription} onChange={e => setCustomIndustryDescription(e.target.value)} placeholder="Brief description of your industry" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowCustomIndustryModal(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                Cancel
              </button>
              <button onClick={saveCustomIndustry} disabled={!customIndustryName.trim()} className={`px-4 py-2 rounded-md text-sm ${customIndustryName.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                Save
              </button>
            </div>
          </div>
        </div>}
      {/* Custom Use Case Modal */}
      {showCustomUseCaseModal && <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowCustomUseCaseModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Create Custom Use Case</h2>
              <button onClick={() => setShowCustomUseCaseModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Use Case Name
                </label>
                <input type="text" value={customUseCaseName} onChange={e => setCustomUseCaseName(e.target.value)} placeholder="e.g., Quality Control Automation" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea value={customUseCaseDescription} onChange={e => setCustomUseCaseDescription(e.target.value)} placeholder="Brief description of the use case" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowCustomUseCaseModal(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                Cancel
              </button>
              <button onClick={saveCustomUseCase} disabled={!customUseCaseName.trim()} className={`px-4 py-2 rounded-md text-sm ${customUseCaseName.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                Save
              </button>
            </div>
          </div>
        </div>}
      {/* Custom Product Drawer */}
      {showCustomProductDrawer && <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowCustomProductDrawer(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium">Add Custom Service</h2>
                  <button onClick={() => setShowCustomProductDrawer(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search services..." value={customProductSearch} onChange={e => setCustomProductSearch(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className={`px-3 py-1.5 text-sm rounded-md ${customProductCategory === null ? 'bg-gray-100 font-medium' : 'bg-white border border-gray-200'}`} onClick={() => setCustomProductCategory(null)}>
                      All
                    </button>
                    <button className={`px-3 py-1.5 text-sm rounded-md ${customProductCategory === 'core' ? 'bg-gray-100 font-medium' : 'bg-white border border-gray-200'}`} onClick={() => setCustomProductCategory('core')}>
                      Core
                    </button>
                    <button className={`px-3 py-1.5 text-sm rounded-md ${customProductCategory === 'custom' ? 'bg-gray-100 font-medium' : 'bg-white border border-gray-200'}`} onClick={() => setCustomProductCategory('custom')}>
                      Custom
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {filteredCustomProducts.map(product => {
                  const ProductIcon = product.icon;
                  const isSelected = isProductSelected(product.id);
                  return <div key={product.id} className={`p-3 border rounded-lg ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <ProductIcon size={18} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.description}
                                </div>
                              </div>
                            </div>
                            <button className={`px-3 py-1 text-xs rounded ${isSelected ? 'bg-gray-200 text-gray-700' : 'bg-black text-white'}`} onClick={() => addCustomProduct(product.id)} disabled={isSelected}>
                              {isSelected ? 'Added' : 'Add'}
                            </button>
                          </div>
                        </div>;
                })}
                    {filteredCustomProducts.length === 0 && <div className="text-center py-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Package size={20} className="text-gray-400" />
                        </div>
                        <h3 className="font-medium mb-1">No services found</h3>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search or filters
                        </p>
                      </div>}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-end">
                  <button onClick={() => setShowCustomProductDrawer(false)} className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}