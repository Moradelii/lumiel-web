export type Language = 'es' | 'en';

export type ServiceDivisionId = 
  | 'apostille'
  | 'notary'
  | 'translation'
  | 'vital-records'
  | 'passport'
  | 'vehicles'
  | 'insurance';

export interface ServiceItem {
  id: string;
  divisionId: ServiceDivisionId;
  name: { es: string; en: string };
  shortDesc: { es: string; en: string };
  fullDesc: { es: string; en: string };
  requirements: { es: string[]; en: string[] };
  estimatedDays: string;
  popular?: boolean;
  relatedServices?: string[];
}

export interface ServiceDivision {
  id: ServiceDivisionId;
  code: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  iconName: string;
  services: ServiceItem[];
}

export type CrmStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'DOCUMENT_REVIEW'
  | 'QUOTE_REQUIRED'
  | 'QUOTE_SENT'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_RECEIVED'
  | 'PROCESSING'
  | 'READY'
  | 'COMPLETED'
  | 'FOLLOW_UP'
  | 'CLOSED';

export type PriorityLevel = 'normal' | 'alta' | 'urgente';

export type PaymentStatus = 'pending' | 'deposit_paid' | 'paid_in_full' | 'quote_sent' | 'refunded';

export interface ClientDocument {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected' | 'translated';
  notes?: string;
  url?: string;
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ClientQuote {
  quoteNumber: string;
  createdAt: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  depositRequired: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  author: string;
  action: string;
  details?: string;
}

export interface ClientRecord {
  id: string;
  caseNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  preferredLanguage: Language;
  preferredContactMethod: 'phone' | 'whatsapp' | 'email';
  division: ServiceDivisionId;
  serviceId: string;
  serviceName: string;
  status: CrmStatus;
  priority: PriorityLevel;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  notes: string;
  documents: ClientDocument[];
  quote?: ClientQuote;
  activityLogs: ActivityLog[];
  assignedTo: string;
  estimatedDelivery?: string;
}

export interface CrmFilterState {
  searchQuery: string;
  division: ServiceDivisionId | 'all';
  status: CrmStatus | 'all';
  priority: PriorityLevel | 'all';
  paymentStatus: PaymentStatus | 'all';
  hasDocuments: 'all' | 'with_docs' | 'pending_review' | 'no_docs';
  language: 'all' | 'es' | 'en';
  dateRange: 'all' | 'today' | 'last_7_days' | 'this_month';
  sortBy: 'date_desc' | 'date_asc' | 'priority' | 'name' | 'status';
}

export interface CrmUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: 'super_admin' | 'notary' | 'agent' | 'translator';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

