import React, { useEffect, useState, Fragment, Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Info, ChevronDown, ChevronRight, Check, AlertCircle, Phone, Mail, MessageSquare, FileText, Headphones, Settings, DollarSign, Shield, TrendingUp, BarChart3, Plus, Minus, Calendar, Clock, Sliders, ExternalLink, Share2, Link2, X, Database, Users, GripVertical } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { RampDrawer } from './RampDrawer';
// Industry solutions mapping (must match ConfigurationStep)
const industrySolutionsMap: Record<string, string> = {
  onboarding: 'High-Touch Onboarding',
  'support-scalable': 'Scalable Technical Support',
  'cart-abandonment': 'Cart Abandonment Recovery',
  'post-purchase': 'Post-Purchase Support',
  verification: 'Secure Customer Verification',
  'transaction-support': 'Complex Transaction Support',
  'student-conversion': 'Student Lead Conversion',
  'student-retention': 'Student Support & Retention',
  'hipaa-support': 'HIPAA-Compatible Support',
  'supply-chain': 'Supply Chain Automation'
};
// Intercom products with pricing details
const products = [{
  id: 'platform-essential',
  name: 'Essential Plan',
  category: 'Core Platform',
  basePrice: 29,
  unit: 'per full-seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  freeLiteSeats: 0,
  description: 'Core capabilities: shared inbox, live chat, help centre, basic automation and AI features',
  tiers: [{
    min: 0,
    max: 10,
    price: 29
  }, {
    min: 10,
    max: 50,
    price: 27
  }, {
    min: 50,
    max: Infinity,
    price: 25
  }],
  cost: 10
}, {
  id: 'platform-advanced',
  name: 'Advanced Plan',
  category: 'Core Platform',
  basePrice: 85,
  unit: 'per full-seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  freeLiteSeats: 20,
  description: 'Includes 20 free "lite" seats. Enhanced automation and AI capabilities',
  tiers: [{
    min: 0,
    max: 10,
    price: 85
  }, {
    min: 10,
    max: 50,
    price: 80
  }, {
    min: 50,
    max: Infinity,
    price: 75
  }],
  cost: 30
}, {
  id: 'platform-expert',
  name: 'Expert Plan',
  category: 'Core Platform',
  basePrice: 132,
  unit: 'per full-seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  freeLiteSeats: 50,
  description: 'Includes 50 free lite seats. Enterprise-grade features: SSO, HIPAA support, and more',
  tiers: [{
    min: 0,
    max: 10,
    price: 132
  }, {
    min: 10,
    max: 50,
    price: 125
  }, {
    min: 50,
    max: Infinity,
    price: 120
  }],
  cost: 45
}, {
  id: 'fin-ai-agent',
  name: 'Fin AI Agent',
  category: 'AI Services',
  basePrice: 0.99,
  unit: 'per resolution',
  unitShort: 'resolutions',
  volume: 12000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-resolution',
  tiers: [{
    min: 0,
    max: 5000,
    price: 0.99
  }, {
    min: 5000,
    max: 20000,
    price: 0.89
  }, {
    min: 20000,
    max: Infinity,
    price: 0.79
  }],
  cost: 0.35
}, {
  id: 'fin-ai-copilot',
  name: 'Fin AI Copilot',
  category: 'AI Services',
  basePrice: 29,
  unit: 'per seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  tiers: [{
    min: 0,
    max: 10,
    price: 29
  }, {
    min: 10,
    max: 50,
    price: 27
  }, {
    min: 50,
    max: Infinity,
    price: 25
  }],
  cost: 10
}, {
  id: 'proactive-messaging',
  name: 'Proactive Support Plus',
  category: 'Messaging',
  basePrice: 99,
  unit: 'per month (base)',
  unitShort: 'months',
  volume: 12,
  pricingType: 'Subscription',
  pricingMetric: 'base-subscription',
  tiers: [{
    min: 0,
    max: 12,
    price: 99
  }, {
    min: 12,
    max: 24,
    price: 95
  }, {
    min: 24,
    max: Infinity,
    price: 90
  }],
  cost: 35
}, {
  id: 'sms',
  name: 'SMS',
  category: 'Communication Channels',
  basePrice: 0.04,
  unit: 'per segment',
  unitShort: 'segments',
  volume: 60000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-segment',
  tiers: [{
    min: 0,
    max: 10000,
    price: 0.04
  }, {
    min: 10000,
    max: 50000,
    price: 0.038
  }, {
    min: 50000,
    max: Infinity,
    price: 0.035
  }],
  cost: 0.015
}, {
  id: 'whatsapp',
  name: 'WhatsApp',
  category: 'Communication Channels',
  basePrice: 0.06,
  unit: 'per conversation',
  unitShort: 'conversations',
  volume: 24000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-conversation',
  tiers: [{
    min: 0,
    max: 5000,
    price: 0.06
  }, {
    min: 5000,
    max: 20000,
    price: 0.055
  }, {
    min: 20000,
    max: Infinity,
    price: 0.05
  }],
  cost: 0.025
}, {
  id: 'phone',
  name: 'Phone (Fin Voice)',
  category: 'Communication Channels',
  basePrice: 0.0035,
  unit: 'per minute',
  unitShort: 'minutes',
  volume: 360000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-minute',
  tiers: [{
    min: 0,
    max: 100000,
    price: 0.0035
  }, {
    min: 100000,
    max: 500000,
    price: 0.003
  }, {
    min: 500000,
    max: Infinity,
    price: 0.0025
  }],
  cost: 0.001
}, {
  id: 'bulk-email',
  name: 'Bulk Email',
  category: 'Communication Channels',
  basePrice: 0.01,
  unit: 'per email',
  unitShort: 'emails',
  volume: 120000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-email',
  tiers: [{
    min: 0,
    max: 50000,
    price: 0.01
  }, {
    min: 50000,
    max: 200000,
    price: 0.008
  }, {
    min: 200000,
    max: Infinity,
    price: 0.006
  }],
  cost: 0.003
}];
// Pricing guardrails
const pricingGuardrails = {
  marginBands: [{
    min: 0,
    max: 100000,
    minMargin: 0.4
  }, {
    min: 100000,
    max: 500000,
    minMargin: 0.35
  }, {
    min: 500000,
    max: 1000000,
    minMargin: 0.3
  }, {
    min: 1000000,
    max: Infinity,
    minMargin: 0.25
  }],
  contractTerms: [{
    months: 12,
    marginAdjustment: 0
  }, {
    months: 24,
    marginAdjustment: -0.02
  }, {
    months: 36,
    marginAdjustment: -0.05
  }],
  competitorAdjustments: {
    'Manual Processes': 0,
    'In-house Team': -0.02,
    'Competitor AI': -0.05
  },
  approvalLevels: [{
    threshold: 0.3,
    level: 'VP of Sales',
    color: 'red'
  }, {
    threshold: 0.11,
    level: 'Manager',
    color: 'amber'
  }, {
    threshold: 0,
    level: 'None',
    color: 'green'
  }]
};
// Deployment models
const deploymentModels = [{
  id: 'poc-production',
  name: 'POC → Production',
  description: '2-month POC followed by full production rollout'
}, {
  id: 'annual-commitment',
  name: 'Annual Commitment',
  description: 'Standard 12-month contract with monthly billing'
}, {
  id: 'annual-drawdown',
  name: 'Annual Pool with Drawdown',
  description: 'Monthly volume commitment with monthly drawdown'
}, {
  id: 'multi-year',
  name: 'Multi-Year Contract',
  description: '2-3 year commitment with additional discounts'
}];
// AI development seasonality patterns
const seasonalityPatterns = [{
  id: 'standard',
  name: 'Standard Distribution',
  distribution: [25, 25, 25, 25]
}, {
  id: 'model-training',
  name: 'Model Training Cycle',
  distribution: [15, 35, 35, 15]
}, {
  id: 'product-launch',
  name: 'Product Launch',
  distribution: [20, 20, 25, 35]
}, {
  id: 'research-cycle',
  name: 'Research Cycle',
  distribution: [22, 28, 28, 22]
}];
// Pricing metrics options
const pricingMetrics = [{
  id: 'per-seat',
  name: 'Per Seat/Month',
  icon: Users,
  description: 'Fixed monthly fee per agent or user seat',
  defaultFor: ['platform-essential', 'platform-advanced', 'platform-expert', 'fin-ai-copilot']
}, {
  id: 'per-resolution',
  name: 'Per Resolution',
  icon: Check,
  description: 'Pay per successful AI-resolved conversation',
  defaultFor: ['fin-ai-agent']
}, {
  id: 'per-segment',
  name: 'Per Message Segment',
  icon: MessageSquare,
  description: 'Pay per SMS segment sent or received',
  defaultFor: ['sms']
}, {
  id: 'per-conversation',
  name: 'Per 24-hour Conversation',
  icon: MessageSquare,
  description: 'Pay per WhatsApp conversation window',
  defaultFor: ['whatsapp']
}, {
  id: 'per-minute',
  name: 'Per Minute',
  icon: Phone,
  description: 'Pay per minute of voice call',
  defaultFor: ['phone']
}, {
  id: 'per-email',
  name: 'Per Email Sent',
  icon: Mail,
  description: 'Pay per bulk email sent',
  defaultFor: ['bulk-email']
}, {
  id: 'base-subscription',
  name: 'Base Subscription',
  icon: DollarSign,
  description: 'Fixed monthly base fee with included usage',
  defaultFor: ['proactive-messaging']
}];
// Get pricing metric display name
const getPricingMetricName = (metricId: string) => {
  switch (metricId) {
    case 'per-seat':
      return 'Per Seat/Month';
    case 'per-resolution':
      return 'Per Resolution';
    case 'per-segment':
      return 'Per Message Segment';
    case 'per-conversation':
      return 'Per 24-hour Conversation';
    case 'per-minute':
      return 'Per Minute';
    case 'per-email':
      return 'Per Email Sent';
    case 'base-subscription':
      return 'Base Subscription';
    default:
      return metricId;
  }
};
export function VolumeAndPricingStep() {
  // Get URL parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // State for pricing configuration
  const [contractTerm, setContractTerm] = useState(parseInt(queryParams.get('term') || '12'));
  const [competitor, setCompetitor] = useState('Manual Processes');
  const [deploymentModel, setDeploymentModel] = useState(queryParams.get('deploymentModel') || 'annual-commitment');
  const [billingCycle, setBillingCycle] = useState(queryParams.get('billingCycle') || 'monthly');
  // State for product pricing and volumes
  const [margins, setMargins] = useState<Record<string, number>>({});
  const [productVolumes, setProductVolumes] = useState<Record<string, number>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  // State for view mode
  const [viewMode, setViewMode] = useState<'sales' | 'client'>('sales');
  // State for phase configuration
  const [selectedPhaseType, setSelectedPhaseType] = useState('annual-commitment');
  const [phases, setPhases] = useState([{
    name: 'POC',
    months: 2,
    discount: 100
  }, {
    name: 'Production',
    months: 12,
    discount: 0
  }]);
  // State for POC configuration
  const [pocEnabled, setPocEnabled] = useState(queryParams.get('poc') === 'true');
  const [showPocDrawer, setShowPocDrawer] = useState(false);
  const [pocMonths, setPocMonths] = useState(parseInt(queryParams.get('pocMonths') || '2'));
  const [pocProducts, setPocProducts] = useState<string[]>(queryParams.get('pocProducts') ? queryParams.get('pocProducts')!.split(',') : []);
  const [pocVolumes, setPocVolumes] = useState<Record<string, number>>({});
  const [pocPrices, setPocPrices] = useState<Record<string, number>>({});
  // State for seasonality
  const [selectedSeasonality, setSelectedSeasonality] = useState('standard');
  const [quarterDistribution, setQuarterDistribution] = useState([25, 25, 25, 25]);
  // State for ramp drawer
  const [rampDrawerOpen, setRampDrawerOpen] = useState(false);
  const [selectedRampProduct, setSelectedRampProduct] = useState<string | null>(null);
  // State for price tiers drawer
  const [showPriceTiersDrawer, setShowPriceTiersDrawer] = useState(false);
  const [selectedTierProduct, setSelectedTierProduct] = useState<string | null>(null);
  const [tierData, setTierData] = useState<Array<{
    qty: number;
    suggested: number;
    you: number;
  }>>([]);
  const [tierRows, setTierRows] = useState<Array<{
    tier: number;
    start: number;
    end: number | string;
    price: number;
  }>>([]);
  // State for discount percentages (0-90)
  const [discountPct, setDiscountPct] = useState<Record<string, number>>({});
  // State for Add Product drawer
  const [showAddProductDrawer, setShowAddProductDrawer] = useState(false);
  // State for platform plans expansion
  const [platformPlansExpanded, setPlatformPlansExpanded] = useState(true);
  // State for solution tabs
  const selectedSolutionIds = queryParams.get('selectedSolutions') ? queryParams.get('selectedSolutions')!.split(',').filter(Boolean) : [];
  const [activeSolutionTab, setActiveSolutionTab] = useState<string>(selectedSolutionIds.length > 0 ? selectedSolutionIds[0] : '');
  // Utility functions - MUST be defined before other functions use them
  const money = (n: number) => Math.max(0, Math.round(n * 100) / 100);
  const approvalForDiscount = (pct: number | undefined): 'Manager' | 'VP of Sales' | 'CEO' => {
    const d = Math.max(0, Math.min(90, Number(pct) || 0));
    if (d <= 15) return 'Manager';
    if (d <= 30) return 'VP of Sales';
    return 'CEO';
  };
  // Update discount percentage
  const updateDiscountPct = (productId: string, value: number) => {
    const clamped = Math.max(0, Math.min(90, value));
    setDiscountPct({
      ...discountPct,
      [productId]: clamped
    });
  };
  // Get tiered price based on volume
  const getTieredPrice = (productId: string, volume: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    // Find the appropriate tier based on volume
    const tier = product.tiers.find(t => volume >= t.min && volume < t.max);
    return tier ? tier.price : product.basePrice;
  };
  // Initialize product volumes, margins, and discount percentages
  useEffect(() => {
    const customerType = queryParams.get('customerType') || queryParams.get('segment') || 'saas';
    const useCase = queryParams.get('primaryUseCase') || 'customer-support';
    // Get selected services from ConfigurationStep if available
    const selectedCoreParam = queryParams.get('selectedCore');
    const selectedSolutionsParam = queryParams.get('selectedSolutions');
    const servicePricingMetricsParam = queryParams.get('servicePricingMetrics');
    let selectedProductIds: string[] = [];
    // If services are passed from ConfigurationStep, use them
    if (selectedCoreParam) {
      const selectedCore = selectedCoreParam.split(',').filter(Boolean);
      // Always need a platform plan if any core service is selected
      // Default platform plan based on customer type
      let platformPlan = 'platform-advanced';
      if (customerType === 'saas' || customerType === 'ecommerce' || customerType === 'edtech') {
        platformPlan = 'platform-advanced';
      } else if (customerType === 'fintech' || customerType === 'healthtech') {
        platformPlan = 'platform-expert';
      } else if (customerType === 'logistics') {
        platformPlan = 'platform-essential';
      }
      // Add platform plan if any core service is selected (Intercom requires a base plan)
      if (selectedCore.length > 0 && !selectedProductIds.includes(platformPlan)) {
        selectedProductIds.push(platformPlan);
      }
      // Map core services to Intercom products
      if (selectedCore.includes('chat')) {
        selectedProductIds.push('fin-ai-agent');
      }
      if (selectedCore.includes('agent')) {
        selectedProductIds.push('fin-ai-copilot');
      }
      if (selectedCore.includes('voice')) {
        selectedProductIds.push('phone');
      }
      if (selectedCore.includes('messaging')) {
        selectedProductIds.push('proactive-messaging');
        selectedProductIds.push('sms');
        selectedProductIds.push('whatsapp');
      }
      if (selectedCore.includes('email')) {
        selectedProductIds.push('bulk-email');
      }
      if (selectedCore.includes('documents')) {
        // Documents might map to a product, add if exists
        if (products.find(p => p.id === 'document-processing')) {
          selectedProductIds.push('document-processing');
        }
      }
      // Note: servicePricingMetrics contains service mappings but uses keys like 'platform-plans'
      // which aren't real product IDs, so we rely on the selectedCore mapping above
    } else {
      // Fallback to default products based on customer type
      if (customerType === 'saas') {
        selectedProductIds = ['platform-advanced', 'fin-ai-agent', 'fin-ai-copilot', 'sms', 'bulk-email'];
      } else if (customerType === 'ecommerce') {
        selectedProductIds = ['platform-advanced', 'fin-ai-agent', 'sms', 'whatsapp'];
      } else if (customerType === 'fintech') {
        selectedProductIds = ['platform-expert', 'fin-ai-agent', 'fin-ai-copilot', 'sms', 'phone'];
      } else {
        selectedProductIds = ['platform-advanced', 'fin-ai-agent', 'sms'];
      }
    }
    const initialVolumes: Record<string, number> = {};
    const initialMargins: Record<string, number> = {};
    const initialDiscounts: Record<string, number> = {};
    const filteredProducts = products.filter(product => selectedProductIds.includes(product.id));
    filteredProducts.forEach(product => {
      initialVolumes[product.id] = product.volume;
      initialMargins[product.id] = 0.15;
      initialDiscounts[product.id] = 15;
    });
    setProductVolumes(initialVolumes);
    setMargins(initialMargins);
    setDiscountPct(initialDiscounts);
    // Initialize POC products
    setPocProducts(['platform-advanced', 'fin-ai-agent']);
    const initialPocVolumes: Record<string, number> = {};
    const initialPocPrices: Record<string, number> = {};
    filteredProducts.forEach(product => {
      initialPocVolumes[product.id] = Math.round(product.volume * 0.1);
      initialPocPrices[product.id] = 0;
    });
    setPocVolumes(initialPocVolumes);
    setPocPrices(initialPocPrices);
    if (filteredProducts.length > 0) {
      initializeTierData(filteredProducts[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  // Initialize tier data
  const initializeTierData = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const initialTierData = product.tiers.map(tier => ({
      qty: tier.min,
      suggested: tier.price * 1.1,
      you: tier.price
    }));
    const initialTierRows = product.tiers.map((tier, index) => ({
      tier: index + 1,
      start: tier.min,
      end: tier.max === Infinity ? '∞' : tier.max,
      price: tier.price
    }));
    setTierData(initialTierData);
    setTierRows(initialTierRows);
  };
  // Update tier price
  const updateTierPrice = (index: number, price: number) => {
    const newTierRows = [...tierRows];
    newTierRows[index].price = price;
    setTierRows(newTierRows);
    const newTierData = [...tierData];
    newTierData[index].you = price;
    setTierData(newTierData);
  };
  // Handle POC toggle
  const togglePoc = () => {
    const newPocEnabled = !pocEnabled;
    setPocEnabled(newPocEnabled);
    if (newPocEnabled) {
      setDeploymentModel('poc-production');
      setContractTerm(12 + pocMonths);
    } else {
      setDeploymentModel('annual-commitment');
      setContractTerm(12);
    }
  };
  // Calculate min margin
  const getMinMargin = () => {
    const totalValue = calculateTotalValue();
    const band = pricingGuardrails.marginBands.find(band => totalValue >= band.min && totalValue < band.max) || pricingGuardrails.marginBands[0];
    const termAdjustment = pricingGuardrails.contractTerms.find(term => term.months === contractTerm)?.marginAdjustment || 0;
    const competitorAdjustment = pricingGuardrails.competitorAdjustments[competitor] || 0;
    return band.minMargin + termAdjustment + competitorAdjustment;
  };
  // Calculate total value
  const calculateTotalValue = () => {
    // TCV = Monthly Contract Value * Contract Term
    // But we need to account for POC adjustments
    let totalMonthly = calculateMonthlyValue();
    // If POC is enabled, we need to adjust TCV calculation
    // POC months have different pricing, production months have regular pricing
    if (pocEnabled && pocProducts.length > 0) {
      // For POC, getMonthlyRevenue already accounts for POC pricing
      // TCV = sum of (monthly revenue * months) for each product
      // This is more complex, so we'll use the simpler approach:
      // TCV = effective monthly value (which accounts for POC) * contract term
      return totalMonthly * contractTerm;
    }
    // Standard calculation: monthly contract value * contract term
    return totalMonthly * contractTerm;
  };
  // Calculate total margin
  const calculateTotalMargin = () => {
    let totalRevenue = 0;
    let totalCost = 0;
    products.forEach(product => {
      const margin = margins[product.id] || 0;
      const volume = productVolumes[product.id] || product.volume;
      const discountedPrice = product.basePrice * (1 - margin);
      totalRevenue += discountedPrice * volume;
      totalCost += product.cost * volume;
    });
    if (pocEnabled) {
      pocProducts.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          const pocVolume = pocVolumes[productId] || 0;
          const pocPrice = pocPrices[productId] || 0;
          totalRevenue -= (product.basePrice * (1 - (margins[productId] || 0)) - pocPrice) * pocVolume;
        }
      });
    }
    return totalRevenue - totalCost;
  };
  // Calculate average margin percentage
  const calculateAverageMarginPercentage = () => {
    const totalRevenue = calculateTotalValue();
    const totalMargin = calculateTotalMargin();
    return totalRevenue > 0 ? totalMargin / totalRevenue : 0;
  };
  // Update margin
  const updateMargin = (productId: string, margin: number) => {
    setMargins({
      ...margins,
      [productId]: margin
    });
  };
  // Update volume
  const updateVolume = (productId: string, volume: number) => {
    setProductVolumes({
      ...productVolumes,
      [productId]: volume
    });
  };
  // Update volume with phases
  const updateVolumeWithPhases = (productId: string, phaseVolumes: {
    [key: string]: number;
  }) => {
    const totalVolume = Object.values(phaseVolumes).reduce((sum, vol) => sum + vol, 0);
    updateVolume(productId, totalVolume);
  };
  // Toggle product expansion
  const toggleProductExpansion = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };
  // Get approval level based on discount percentage
  const getApprovalLevel = (productId: string) => {
    const discount = discountPct[productId] || 0;
    const level = approvalForDiscount(discount);
    if (level === 'CEO') {
      return {
        level: 'CEO',
        color: 'red',
        threshold: 30
      };
    }
    if (level === 'VP of Sales') {
      return {
        level: 'VP of Sales',
        color: 'amber-dark',
        threshold: 15
      };
    }
    return {
      level: 'Manager',
      color: 'amber',
      threshold: 0
    };
  };
  // Check if requires approval
  const requiresApproval = () => {
    return Object.entries(margins).some(([productId, margin]) => {
      return margin >= pricingGuardrails.approvalLevels[1].threshold;
    });
  };
  // Get highest approval level
  const getHighestApprovalLevel = () => {
    if (!requiresApproval()) return null;
    let highestLevel = pricingGuardrails.approvalLevels[pricingGuardrails.approvalLevels.length - 1];
    products.forEach(product => {
      const margin = margins[product.id] || 0;
      for (const level of pricingGuardrails.approvalLevels) {
        if (margin >= level.threshold && level.threshold > highestLevel.threshold) {
          highestLevel = level;
          break;
        }
      }
    });
    return highestLevel;
  };
  // Calculate monthly value - sum of all monthly revenues
  const calculateMonthlyValue = () => {
    let totalMonthly = 0;
    Object.keys(productVolumes).forEach(productId => {
      totalMonthly += getMonthlyRevenue(productId);
    });
    return totalMonthly;
  };
  // Get effective price (quote price) - uses tiered pricing by default
  const getEffectivePrice = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    // Get tiered price based on volume
    const tieredPrice = getTieredPrice(productId, volume);
    const margin = margins[productId];
    // If margin is explicitly set (user has manually adjusted quote price), use it with tiered price
    if (margin !== undefined && margin !== null && margin !== 0.15) {
      return money(tieredPrice * (1 - margin));
    }
    // Otherwise, use tiered pricing with discount percentage
    const discount = discountPct[productId] || 0;
    return money(tieredPrice * (1 - discount / 100));
  };
  // Get product total
  const getProductTotal = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    return getEffectivePrice(productId) * volume;
  };
  // Get monthly revenue using quote price or suggested price
  const getMonthlyRevenue = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    // Use effective price (quote price if set, otherwise suggested price)
    const price = getEffectivePrice(productId);
    // Volume is already monthly, so monthly revenue = price * monthly volume
    let monthlyRevenue;
    if (product.pricingMetric === 'per-seat' || product.pricingMetric === 'per-agent') {
      // For per-seat/month products: monthly revenue = price * monthly seats
      monthlyRevenue = price * volume;
    } else {
      // For usage-based products: monthly revenue = price * monthly usage volume
      monthlyRevenue = price * volume;
    }
    // Handle POC adjustments
    if (pocEnabled && pocProducts.includes(productId)) {
      const pocVolume = pocVolumes[productId] || 0;
      const pocPrice = pocPrices[productId] || 0;
      const regularPrice = getEffectivePrice(productId);
      // POC volume is already monthly, so use it directly
      let pocMonthlyVolume;
      if (product.pricingMetric === 'per-seat' || product.pricingMetric === 'per-agent') {
        // POC volume is monthly seats
        pocMonthlyVolume = pocVolume;
      } else {
        // POC volume is monthly usage
        pocMonthlyVolume = pocVolume;
      }
      // POC adjustment: difference between regular and POC pricing
      const pocAdjustment = pocMonthlyVolume * (regularPrice - (pocPrice || 0));
      // Adjust based on POC duration as portion of total contract
      const pocPortion = pocMonths / contractTerm;
      monthlyRevenue = monthlyRevenue * (1 - pocPortion) + pocMonthlyVolume * (pocPrice || 0) * pocPortion;
    }
    return Math.round(monthlyRevenue);
  };
  // Get margin status color
  const getMarginStatusColor = (productId: string) => {
    const margin = margins[productId] || 0;
    if (margin >= pricingGuardrails.approvalLevels[0].threshold) return 'red';
    if (margin >= pricingGuardrails.approvalLevels[1].threshold) return 'amber';
    return 'green';
  };
  // Get discount percentage
  const getDiscountPercentage = (productId: string) => {
    const margin = margins[productId] || 0;
    return margin * 100;
  };
  // Open ramp drawer
  const openRampDrawer = (productId: string) => {
    setSelectedRampProduct(productId);
    setRampDrawerOpen(true);
  };
  // Open price tiers drawer
  const openPriceTiersDrawer = (productId: string) => {
    setSelectedTierProduct(productId);
    initializeTierData(productId);
    setShowPriceTiersDrawer(true);
  };
  // Toggle POC product
  const togglePocProduct = (productId: string) => {
    if (pocProducts.includes(productId)) {
      setPocProducts(pocProducts.filter(id => id !== productId));
    } else {
      setPocProducts([...pocProducts, productId]);
    }
  };
  // Update POC volume
  const updatePocVolume = (productId: string, volume: number) => {
    setPocVolumes({
      ...pocVolumes,
      [productId]: volume
    });
  };
  // Update POC price
  const updatePocPrice = (productId: string, price: number) => {
    setPocPrices({
      ...pocPrices,
      [productId]: price
    });
  };
  // Get product name
  const getProductName = (id: string) => {
    const product = products.find(p => p.id === id);
    return product ? product.name : id;
  };
  // Get suggested price based on list rate and discount percentage
  const getSuggestedPrice = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    const tieredPrice = getTieredPrice(productId, volume);
    const discount = discountPct[productId] || 0;
    return money(tieredPrice * (1 - discount / 100));
  };
  // Get suggested discount percentage
  const getSuggestedDiscountPercentage = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const suggestedPrice = getSuggestedPrice(productId);
    return Math.round((product.basePrice - suggestedPrice) / product.basePrice * 100);
  };
  // Calculate suggested minimum
  const calculateSuggestedMinimum = () => {
    const monthlyRev = calculateMonthlyValue();
    return Math.round(monthlyRev * (minimumPercentage / 100));
  };
  // Update quote minimum
  const updateQuoteMinimum = (amount: number) => {
    setQuoteMinimum(amount);
  };
  // Calculate percent of revenue
  const calculatePercentOfRevenue = () => {
    return Math.round(quoteMinimum / monthlyValue * 100);
  };
  // Calculate annually contracted revenue
  const calculateAnnuallyContractedRevenue = () => {
    return monthlyMinimumEnabled ? quoteMinimum * 12 : 0;
  };
  // Add product to quote
  const addProductToQuote = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    setProductVolumes({
      ...productVolumes,
      [productId]: product.volume
    });
    setMargins({
      ...margins,
      [productId]: 0.15
    });
    setDiscountPct({
      ...discountPct,
      [productId]: 15
    });
  };
  // Remove product from quote
  const removeProductFromQuote = (productId: string) => {
    const newVolumes = {
      ...productVolumes
    };
    const newMargins = {
      ...margins
    };
    const newDiscounts = {
      ...discountPct
    };
    delete newVolumes[productId];
    delete newMargins[productId];
    delete newDiscounts[productId];
    setProductVolumes(newVolumes);
    setMargins(newMargins);
    setDiscountPct(newDiscounts);
  };
  // Calculate metrics
  const totalValue = calculateTotalValue();
  const monthlyValue = calculateMonthlyValue();
  const totalMargin = calculateTotalMargin();
  const averageMarginPercentage = calculateAverageMarginPercentage();
  const minMargin = getMinMargin();
  const highestApprovalLevel = getHighestApprovalLevel();
  // Calculate total months
  const totalMonths = phases.reduce((sum, phase) => sum + phase.months, 0);
  // Generate revenue data
  const generateRevenueData = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    const volume = productVolumes[productId] || product.volume;
    const price = getEffectivePrice(productId);
    const monthlyVolume = volume / 12;
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: `M${i + 1}`,
        revenue: Math.round(monthlyVolume * price)
      });
    }
    return data;
  };
  // Generate terms chart data
  const generateTermsChartData = () => {
    const data = [];
    let cumulative = 0;
    if (pocEnabled) {
      for (let i = 0; i < pocMonths; i++) {
        const monthRevenue = pocProducts.reduce((sum, productId) => {
          const pocVolume = pocVolumes[productId] || 0;
          const pocPrice = pocPrices[productId] || 0;
          return sum + pocVolume / pocMonths * pocPrice;
        }, 0);
        cumulative += monthRevenue;
        data.push({
          month: `M${i + 1}`,
          revenue: Math.round(monthRevenue),
          cumulative: Math.round(cumulative),
          phase: 'POC'
        });
      }
      const remainingMonths = contractTerm - pocMonths;
      const monthlyRevenue = (totalValue - cumulative) / remainingMonths;
      for (let i = 0; i < remainingMonths; i++) {
        cumulative += monthlyRevenue;
        data.push({
          month: `M${pocMonths + i + 1}`,
          revenue: Math.round(monthlyRevenue),
          cumulative: Math.round(cumulative),
          phase: 'Production'
        });
      }
    } else {
      const monthlyRevenue = totalValue / contractTerm;
      for (let i = 0; i < contractTerm; i++) {
        cumulative += monthlyRevenue;
        data.push({
          month: `M${i + 1}`,
          revenue: Math.round(monthlyRevenue),
          cumulative: Math.round(cumulative),
          phase: 'Standard'
        });
      }
    }
    return data;
  };
  // Generate summary chart data
  const generateSummaryChartData = () => {
    const data = [];
    const categories: Record<string, number> = {};
    products.forEach(product => {
      const volume = productVolumes[product.id] || product.volume;
      const price = getEffectivePrice(product.id);
      const total = volume * price;
      if (categories[product.category]) {
        categories[product.category] += total;
      } else {
        categories[product.category] = total;
      }
    });
    Object.entries(categories).forEach(([category, value]) => {
      data.push({
        name: category,
        value: Math.round(value)
      });
    });
    return data;
  };
  const summaryChartData = generateSummaryChartData();
  const termsChartData = generateTermsChartData();
  const companyName = queryParams.get('company') || 'Customer';
  return <div className="w-full bg-white">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Intercom Opportunities
          </Link>
          <ArrowRight size={12} />
          <Link to="/configure" className="hover:text-gray-700">
            Configure Intercom Quote
          </Link>
          <ArrowRight size={12} />
          <span className="font-medium text-black">
            Intercom Volume & Pricing
          </span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              Intercom Volume & Pricing
            </h1>
            <p className="text-gray-500">
              Configure volume, pricing, and commercial terms for Intercom
              services
            </p>
          </div>
          <div className="flex items-center gap-3">
            {viewMode === 'client' && <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm">
                <Share2 size={14} />
                <span>Share link</span>
              </button>}
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <button className={`px-3 py-1.5 text-sm ${viewMode === 'sales' ? 'bg-gray-100 font-medium' : 'bg-white'}`} onClick={() => setViewMode('sales')}>
                Sales
              </button>
              <button className={`px-3 py-1.5 text-sm ${viewMode === 'client' ? 'bg-gray-100 font-medium' : 'bg-white'}`} onClick={() => setViewMode('client')}>
                Client
              </button>
            </div>
          </div>
        </div>
        {viewMode === 'client' ?
      // Client view
      <div className="space-y-6">
            {/* Products summary */}
            <div>
              <h2 className="text-lg font-medium mb-4">
                Intercom Products & Services
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Volume
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.filter(p => productVolumes[p.id] > 0).map(product => <tr key={product.id}>
                            <td className="px-4 py-3 text-sm font-medium">
                              {product.name}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {(productVolumes[product.id] || 0).toLocaleString()}{' '}
                              {product.unitShort}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${getEffectivePrice(product.id).toFixed(2)}{' '}
                              {product.unit}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              $
                              {Math.round(getProductTotal(product.id)).toLocaleString()}
                            </td>
                          </tr>)}
                      <tr className="bg-gray-50 font-medium">
                        <td className="px-4 py-3 text-sm">Total</td>
                        <td className="px-4 py-3 text-sm"></td>
                        <td className="px-4 py-3 text-sm"></td>
                        <td className="px-4 py-3 text-sm">
                          ${Math.round(totalValue).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={products.filter(p => productVolumes[p.id] > 0).map(p => ({
                  name: p.name,
                  value: Math.round(getProductTotal(p.id))
                }))} margin={{
                  top: 20,
                  right: 30,
                  left: 100,
                  bottom: 5
                }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={value => `$${value.toLocaleString()}`} />
                      <Bar dataKey="value" fill="#ff6b35" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Contract terms */}
            <div>
              <h2 className="text-lg font-medium mb-4">Contract Terms</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Term Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Contract Length
                        </span>
                        <span className="text-sm font-medium">
                          {contractTerm} months
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Deployment Model
                        </span>
                        <span className="text-sm font-medium">
                          {deploymentModels.find(m => m.id === deploymentModel)?.name || 'Standard'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Billing Cycle
                        </span>
                        <span className="text-sm font-medium">
                          {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Monthly Value
                        </span>
                        <span className="text-sm font-medium">
                          ${Math.round(monthlyValue).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Total Contract Value
                        </span>
                        <span className="text-sm font-medium">
                          ${Math.round(totalValue).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {pocEnabled && <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium mb-3">POC Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            POC Duration
                          </span>
                          <span className="text-sm font-medium">
                            {pocMonths} months
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Included Products
                          </span>
                          <span className="text-sm font-medium">
                            {pocProducts.map(id => getProductName(id)).join(', ')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            POC Pricing
                          </span>
                          <span className="text-sm font-medium">
                            {pocProducts.every(id => (pocPrices[id] || 0) === 0) ? 'Free' : 'Discounted'}
                          </span>
                        </div>
                      </div>
                    </div>}
                </div>
                <div className="h-64 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Revenue Schedule</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={termsChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value, name, props) => {
                      if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Monthly Revenue'];
                      return [value, name];
                    }} labelFormatter={label => `Month: ${label}`} />
                        <Area type="monotone" dataKey="revenue" fill="#ff6b35" stroke="#ff6b35" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            {/* Add blank space to prevent bottom bar from hiding content */}
            <div className="h-32"></div>
          </div> :
      // Sales view
      <div>
            {/* Commercial Terms */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Commercial Terms</h2>
              <div className="grid grid-cols-2 gap-5 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription start date
                  </label>
                  <div className="relative">
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select value={contractTerm} onChange={e => {
                const newTerm = parseInt(e.target.value);
                setContractTerm(newTerm);
                // If POC is enabled, adjust the production months
                if (pocEnabled && newTerm > pocMonths) {
                  // Keep POC months the same, adjust production months
                  setDeploymentModel('poc-production');
                } else if (pocEnabled) {
                  // If new term is too short for POC, disable POC
                  setPocEnabled(false);
                  setDeploymentModel('annual-commitment');
                }
              }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value={12}>12 months</option>
                    <option value={24}>24 months</option>
                    <option value={36}>36 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing frequency
                  </label>
                  <select value={billingCycle} onChange={e => setBillingCycle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annual">Annual upfront</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment terms
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="net30">Net 30</option>
                    <option value="net45">Net 45</option>
                    <option value="net60">Net 60</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 mt-8">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Revenue Schedule</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={termsChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value, name, props) => {
                      if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Monthly Revenue'];
                      return [value, name];
                    }} labelFormatter={label => `Month: ${label}`} />
                        <Area type="monotone" dataKey="revenue" fill="#ff6b35" stroke="#ff6b35" name="Monthly Revenue" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-5 rounded-full p-0.5 cursor-pointer ${pocEnabled ? 'bg-black' : 'bg-gray-300'}`} onClick={togglePoc}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${pocEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                    <span className="text-sm">Proof of Concept</span>
                  </div>
                  {pocEnabled && <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1" onClick={() => setShowPocDrawer(true)}>
                      <Settings size={16} />
                      <span>Configure</span>
                    </button>}
                </div>
              </div>
            </div>
            {/* POC Configuration */}
            {pocEnabled && <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">POC Configuration</h2>
                  <button className="flex items-center gap-1 text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50" onClick={() => setShowPocDrawer(true)}>
                    <Settings size={16} />
                    <span>Configure POC</span>
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        Proof of Concept ({pocMonths} months)
                      </h3>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Included
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Volume
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Regular Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Discount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map(product => {
                  const isIncluded = pocProducts.includes(product.id);
                  const regularPrice = getEffectivePrice(product.id);
                  const pocPrice = pocPrices[product.id] || 0;
                  const discount = isIncluded ? 100 - pocPrice / regularPrice * 100 : 0;
                  return <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div>
                                <span className="text-sm font-medium">
                                  {product.name}
                                </span>
                                <div className="text-xs text-gray-400">
                                  {getPricingMetricName(product.pricingMetric)}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <input type="checkbox" checked={isIncluded} onChange={() => togglePocProduct(product.id)} className="h-4 w-4 text-black rounded border-gray-300" />
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <input type="number" value={pocVolumes[product.id] || 0} onChange={e => updatePocVolume(product.id, parseInt(e.target.value) || 0)} disabled={!isIncluded} className={`w-20 px-2 py-1 border rounded-md text-sm ${!isIncluded ? 'bg-gray-100 text-gray-400' : 'border-gray-300'}`} />
                            </td>
                            <td className="px-4 py-3">
                              <input type="number" step="0.01" value={pocPrice} onChange={e => updatePocPrice(product.id, parseFloat(e.target.value) || 0)} disabled={!isIncluded} className={`w-20 px-2 py-1 border rounded-md text-sm ${!isIncluded ? 'bg-gray-100 text-gray-400' : 'border-gray-300'}`} />
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${regularPrice.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {isIncluded ? `${Math.round(discount)}%` : '-'}
                            </td>
                          </tr>;
                })}
                    </tbody>
                  </table>
                </div>
              </div>}
            {/* Solution Tabs */}
            {selectedSolutionIds.length > 0 && <div className="mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex items-center gap-0 -mb-px">
                    {selectedSolutionIds.map((solutionId, index) => {
                const solutionName = industrySolutionsMap[solutionId] || solutionId;
                return <button key={solutionId} onClick={() => setActiveSolutionTab(solutionId)} className={`px-6 py-3 border-b-2 transition-colors ${activeSolutionTab === solutionId ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                          <span className="text-sm">{solutionName}</span>
                        </button>;
              })}
                  </div>
                </div>
              </div>}
            {/* Products */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Products</h2>
                <button className="flex items-center gap-1 text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50" onClick={() => setShowAddProductDrawer(true)}>
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Products
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Monthly Volume
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        List rate
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Discount %
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Suggested price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quote price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Approval level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Est. Mo. Rev.
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Core Platform Plans Section */}
                    <>
                      {/* Parent row for Core Platform Plans */}
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-4 py-3" colSpan={9}>
                          <button className="flex items-center gap-2 w-full text-left" onClick={() => setPlatformPlansExpanded(!platformPlansExpanded)}>
                            <ChevronRight size={16} className={`transition-transform ${platformPlansExpanded ? 'rotate-90' : ''}`} />
                            <span className="text-sm font-medium">
                              Core Platform Plans
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {['platform-essential', 'platform-advanced', 'platform-expert'].filter(id => Object.keys(productVolumes).includes(id)).length}{' '}
                              plans selected
                            </span>
                          </button>
                        </td>
                      </tr>
                      {/* Child rows for each platform plan - show all three plans */}
                      {platformPlansExpanded && products.filter(product => ['platform-essential', 'platform-advanced', 'platform-expert'].includes(product.id)).sort((a, b) => {
                    // Sort in order: Essential, Advanced, Expert
                    const order = ['platform-essential', 'platform-advanced', 'platform-expert'];
                    return order.indexOf(a.id) - order.indexOf(b.id);
                  }).map(product => {
                    const isSelected = Object.keys(productVolumes).includes(product.id);
                    const volume = isSelected ? productVolumes[product.id] || product.volume : product.volume;
                    const discount = isSelected ? discountPct[product.id] || 0 : 0;
                    const suggestedPrice = isSelected ? getSuggestedPrice(product.id) : 0;
                    const effectivePrice = isSelected ? getEffectivePrice(product.id) : 0;
                    const approvalLevel = isSelected ? getApprovalLevel(product.id) : {
                      level: 'Manager'
                    };
                    const monthlyRevenue = isSelected ? getMonthlyRevenue(product.id) : 0;
                    return <tr key={product.id} className={`hover:bg-gray-50 ${!isSelected ? 'opacity-60' : ''}`}>
                                <td className="px-4 py-3 pl-12">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">
                                        {product.name}
                                      </span>
                                      {!isSelected && <button onClick={() => addProductToQuote(product.id)} className="text-xs text-blue-600 hover:text-blue-800">
                                          + Add
                                        </button>}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {getPricingMetricName(product.pricingMetric)}
                                    </div>
                                    {product.freeLiteSeats > 0 && <div className="text-xs text-green-600 mt-1">
                                        Includes {product.freeLiteSeats} free
                                        "lite" seats
                                      </div>}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <input type="number" value={volume} onChange={e => {
                            const newVolume = parseInt(e.target.value) || 0;
                            if (newVolume > 0 && !isSelected) {
                              addProductToQuote(product.id);
                            }
                            updateVolume(product.id, newVolume);
                          }} disabled={!isSelected} className={`w-24 px-2 py-1 border border-gray-300 rounded-md text-sm ${!isSelected ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`} />
                                    {isSelected && <button onClick={() => openRampDrawer(product.id)} className="p-1 text-gray-400 hover:text-gray-600">
                                        <Settings size={14} />
                                      </button>}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  $
                                  {getTieredPrice(product.id, volume).toFixed(2)}
                                </td>
                                <td className="px-4 py-3">
                                  <input type="number" min="0" max="90" value={isSelected ? discount : ''} onChange={e => {
                          const value = parseInt(e.target.value) || 0;
                          updateDiscountPct(product.id, value);
                        }} onBlur={e => {
                          const value = parseInt(e.target.value) || 0;
                          const clamped = Math.max(0, Math.min(90, value));
                          updateDiscountPct(product.id, clamped);
                        }} onKeyDown={e => {
                          if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            updateDiscountPct(product.id, discount + 1);
                          } else if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            updateDiscountPct(product.id, discount - 1);
                          }
                        }} disabled={!isSelected} className={`w-16 px-2 py-1 border border-gray-300 rounded-md text-sm ${!isSelected ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`} />
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {isSelected ? <>
                                      ${suggestedPrice.toFixed(2)}{' '}
                                      {discount > 0 && <span className="text-gray-400">
                                          (-{discount}%)
                                        </span>}
                                    </> : '-'}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <input type="number" step="0.01" value={isSelected ? effectivePrice.toFixed(2) : ''} onChange={e => {
                            const newPrice = parseFloat(e.target.value) || 0;
                            const tieredPrice = getTieredPrice(product.id, volume);
                            const newMargin = 1 - newPrice / tieredPrice;
                            updateMargin(product.id, newMargin);
                          }} disabled={!isSelected} className={`w-20 px-2 py-1 border border-gray-300 rounded-md text-sm ${!isSelected ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`} />
                                    {isSelected && <button onClick={() => openPriceTiersDrawer(product.id)} className="p-1 text-gray-400 hover:text-gray-600">
                                        <Settings size={14} />
                                      </button>}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {isSelected && (approvalLevel.level !== 'Manager' || discount > 0) ? <span className={`px-2 py-1 text-xs font-medium rounded-full ${approvalLevel.level === 'CEO' ? 'bg-red-500 text-white' : approvalLevel.level === 'VP of Sales' ? 'bg-black text-white' : 'bg-amber-100 text-amber-700'}`}>
                                      {approvalLevel.level}
                                    </span> : null}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {isSelected ? <>
                                      $
                                      {Math.round(monthlyRevenue).toLocaleString()}
                                    </> : '-'}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {isSelected ? <button className="text-gray-400 hover:text-gray-600" onClick={() => removeProductFromQuote(product.id)}>
                                      <X size={16} />
                                    </button> : null}
                                </td>
                              </tr>;
                  })}
                    </>
                    {/* Other products (non-platform) */}
                    {products.filter(product => {
                  return Object.keys(productVolumes).includes(product.id) && !['platform-essential', 'platform-advanced', 'platform-expert'].includes(product.id);
                }).map(product => {
                  const volume = productVolumes[product.id] || product.volume;
                  const discount = discountPct[product.id] || 0;
                  const suggestedPrice = getSuggestedPrice(product.id);
                  const effectivePrice = getEffectivePrice(product.id);
                  const approvalLevel = getApprovalLevel(product.id);
                  const monthlyRevenue = getMonthlyRevenue(product.id);
                  return <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div>
                                <span className="text-sm font-medium">
                                  {product.name}
                                </span>
                                <div className="text-xs text-gray-400">
                                  {getPricingMetricName(product.pricingMetric)}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <input type="number" value={volume} onChange={e => {
                          const newVolume = parseInt(e.target.value) || 0;
                          updateVolume(product.id, newVolume);
                        }} className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                <button onClick={() => openRampDrawer(product.id)} className="p-1 text-gray-400 hover:text-gray-600">
                                  <Settings size={14} />
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${getTieredPrice(product.id, volume).toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              <input type="number" min="0" max="90" value={discount} onChange={e => {
                        const value = parseInt(e.target.value) || 0;
                        updateDiscountPct(product.id, value);
                      }} onBlur={e => {
                        const value = parseInt(e.target.value) || 0;
                        const clamped = Math.max(0, Math.min(90, value));
                        updateDiscountPct(product.id, clamped);
                      }} onKeyDown={e => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          updateDiscountPct(product.id, discount + 1);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          updateDiscountPct(product.id, discount - 1);
                        }
                      }} className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${suggestedPrice.toFixed(2)}{' '}
                              {discount > 0 && <span className="text-gray-400">
                                  (-{discount}%)
                                </span>}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <input type="number" step="0.01" value={effectivePrice.toFixed(2)} onChange={e => {
                          const newPrice = parseFloat(e.target.value) || 0;
                          const newMargin = 1 - newPrice / product.basePrice;
                          updateMargin(product.id, newMargin);
                        }} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                <button onClick={() => openPriceTiersDrawer(product.id)} className="p-1 text-gray-400 hover:text-gray-600">
                                  <Settings size={14} />
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {approvalLevel.level !== 'Manager' || discount > 0 ? <span className={`px-2 py-1 text-xs font-medium rounded-full ${approvalLevel.level === 'CEO' ? 'bg-red-500 text-white' : approvalLevel.level === 'VP of Sales' ? 'bg-black text-white' : 'bg-amber-100 text-amber-700'}`}>
                                  {approvalLevel.level}
                                </span> : null}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              ${Math.round(monthlyRevenue).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button className="text-gray-400 hover:text-gray-600" onClick={() => removeProductFromQuote(product.id)}>
                                <X size={16} />
                              </button>
                            </td>
                          </tr>;
                })}
                    {/* Totals row */}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-3 text-sm">Totals</td>
                      <td className="px-4 py-3 text-sm">
                        {Object.entries(productVolumes).reduce((sum, [_, vol]) => sum + vol, 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm"></td>
                      <td className="px-4 py-3 text-sm">
                        ${Math.round(calculateMonthlyValue()).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {expandedProduct && <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-3">
                    Revenue Forecast:{' '}
                    {products.find(p => p.id === expandedProduct)?.name}
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={generateRevenueData(expandedProduct)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={value => `$${value.toLocaleString()}`} />
                        <Area type="monotone" dataKey="revenue" fill="#ff6b35" stroke="#ff6b35" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>}
            </div>
            {/* Add blank space to prevent bottom bar from hiding content */}
            <div className="h-32"></div>
          </div>}
      </div>
      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-500">TCV</div>
              <div className="text-xl font-semibold">
                ${Math.round(totalValue).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Net new ARR</div>
              <div className="text-xl font-semibold">
                ${Math.round(totalValue / contractTerm * 12).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Monthly Contract Value
              </div>
              <div className="text-xl font-semibold">
                ${Math.round(monthlyValue).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/configure" className="px-4 py-2 border border-gray-200 rounded-md text-sm">
              Back
            </Link>
            <Link to={`/quote?tcv=${Math.round(totalValue)}&term=${contractTerm}&monthly=${Math.round(monthlyValue)}&poc=${pocEnabled}&pocMonths=${pocMonths}&pocProducts=${pocProducts.join(',')}&deploymentModel=${deploymentModel}&billingCycle=${billingCycle}&customerType=${encodeURIComponent(queryParams.get('customerType') || queryParams.get('segment') || '')}&company=${encodeURIComponent(queryParams.get('company') || '')}&selectedCore=${encodeURIComponent(queryParams.get('selectedCore') || '')}`} className="px-4 py-2 bg-black text-white rounded-md text-sm">
              Next
            </Link>
          </div>
        </div>
      </div>
      {/* Ramp Drawer */}
      {selectedRampProduct && <RampDrawer isOpen={rampDrawerOpen} onClose={() => setRampDrawerOpen(false)} productId={selectedRampProduct} productName={products.find(p => p.id === selectedRampProduct)?.name || ''} initialVolume={productVolumes[selectedRampProduct] || products.find(p => p.id === selectedRampProduct)?.volume || 0} unit={products.find(p => p.id === selectedRampProduct)?.unitShort || ''} onVolumeChange={updateVolumeWithPhases} />}
      {/* POC Configuration Drawer */}
      {showPocDrawer && <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowPocDrawer(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium">Configure POC</h2>
                  <button onClick={() => setShowPocDrawer(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        POC Duration
                      </label>
                      <select value={pocMonths} onChange={e => {
                    const newMonths = parseInt(e.target.value);
                    setPocMonths(newMonths);
                    // Update contract term to include POC months
                    setContractTerm(12 + newMonths);
                  }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value={1}>1 month</option>
                        <option value={2}>2 months</option>
                        <option value={3}>3 months</option>
                        <option value={4}>4 months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Included Products
                      </label>
                      <div className="space-y-2">
                        {products.map(product => <div key={product.id} className="flex items-center">
                            <input type="checkbox" id={`poc-${product.id}`} checked={pocProducts.includes(product.id)} onChange={() => togglePocProduct(product.id)} className="h-4 w-4 text-black rounded border-gray-300" />
                            <label htmlFor={`poc-${product.id}`} className="ml-2 text-sm">
                              {product.name}
                            </label>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        POC Volumes & Pricing
                      </label>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Product
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Volume
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {pocProducts.map(productId => {
                          const product = products.find(p => p.id === productId);
                          if (!product) return null;
                          return <tr key={productId}>
                                  <td className="px-3 py-2 text-sm">
                                    {product.name}
                                  </td>
                                  <td className="px-3 py-2">
                                    <input type="number" value={pocVolumes[productId] || 0} onChange={e => updatePocVolume(productId, parseInt(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                  </td>
                                  <td className="px-3 py-2">
                                    <input type="number" step="0.01" value={pocPrices[productId] || 0} onChange={e => updatePocPrice(productId, parseFloat(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                  </td>
                                </tr>;
                        })}
                            {pocProducts.length === 0 && <tr>
                                <td colSpan={3} className="px-3 py-4 text-sm text-center text-gray-500">
                                  Select products to include in POC
                                </td>
                              </tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                  <button onClick={() => setShowPocDrawer(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                    Cancel
                  </button>
                  <button onClick={() => setShowPocDrawer(false)} className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* Price Tiers Drawer */}
      {showPriceTiersDrawer && selectedTierProduct && <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowPriceTiersDrawer(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium">
                    Price tiers:{' '}
                    {products.find(p => p.id === selectedTierProduct)?.name}
                  </h2>
                  <button onClick={() => setShowPriceTiersDrawer(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Set quantity-based price tiers to deliver greater value
                        at scale. Going lower than that company suggested price
                        may trigger an approval.
                      </p>
                      <div className="h-64 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={tierData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="qty" label={{
                          value: 'End quantity',
                          position: 'bottom'
                        }} />
                            <YAxis label={{
                          value: 'Price',
                          angle: -90,
                          position: 'insideLeft'
                        }} />
                            <Tooltip />
                            <Area type="stepAfter" dataKey="suggested" stroke="#ff6b35" fill="#ff6b3580" name="Suggested price" />
                            <Area type="stepAfter" dataKey="you" stroke="#0066cc" fill="#0066cc80" name="You" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      {/* Volume-based pricing tiers summary */}
                      <div className="space-y-2 mb-6">
                        {tierRows.map((row, index) => <div key={index} className="flex justify-between text-sm">
                            <span>
                              {row.start.toLocaleString()} -{' '}
                              {typeof row.end === 'string' ? row.end : row.end.toLocaleString()}
                            </span>
                            <span className="font-medium">
                              ${row.price.toFixed(2)}
                            </span>
                          </div>)}
                      </div>
                      {/* Tier editing table */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                Tier
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                Start Qty
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                End Qty
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                Price
                              </th>
                              <th className="px-3 py-2"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {tierRows.map((row, index) => <tr key={index}>
                                <td className="px-3 py-2 text-sm">
                                  {row.tier}
                                </td>
                                <td className="px-3 py-2 text-sm">
                                  {row.start}
                                </td>
                                <td className="px-3 py-2 text-sm">{row.end}</td>
                                <td className="px-3 py-2 text-sm">
                                  <input type="number" step="0.01" value={row.price} onChange={e => updateTierPrice(index, parseFloat(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                </td>
                                <td className="px-3 py-2 text-sm">
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <X size={14} />
                                  </button>
                                </td>
                              </tr>)}
                            <tr>
                              <td colSpan={5} className="px-3 py-2">
                                <button className="flex items-center gap-1 text-sm text-gray-600">
                                  <Plus size={14} />
                                  <span>Add new tier</span>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* Approval warnings */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Approvals required of:
                          </span>
                          <span className="px-2 py-0.5 bg-black text-white text-xs font-medium rounded">
                            VP of Sales
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Info size={14} className="text-gray-400" />
                            <span>
                              Change start quantity of Tier 3 to 15,000
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Info size={14} className="text-gray-400" />
                            <span>
                              Change price of Tier 2 to below minimum margin
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Summary metrics */}
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Discount</span>
                        <span className="font-medium">
                          {Math.round(getDiscountPercentage(selectedTierProduct))}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Effective Price</span>
                        <span className="font-medium">
                          ${getEffectivePrice(selectedTierProduct).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                  <button onClick={() => setShowPriceTiersDrawer(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                    Cancel
                  </button>
                  <button onClick={() => setShowPriceTiersDrawer(false)} className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}