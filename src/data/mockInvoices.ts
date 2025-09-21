// Mock data for demonstration - in production this would come from your Supabase database

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface FullInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  client: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  company: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export interface DashboardInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  date: string;
  dueDate: string;
}

// Mock company data
export const mockCompany = {
  name: "InvoicePro Ltd.",
  address: "123 Business Street",
  city: "New York",
  postalCode: "10001",
  country: "United States",
  email: "contact@invoicepro.com",
  phone: "+1 (555) 123-4567"
};

// Mock invoices for dashboard
export const mockDashboardInvoices: DashboardInvoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    clientName: "Acme Corporation",
    amount: 2500.00,
    status: "paid",
    date: "2024-01-15",
    dueDate: "2024-02-15"
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    clientName: "Tech Solutions Inc.",
    amount: 1750.50,
    status: "sent",
    date: "2024-01-20",
    dueDate: "2024-02-20"
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    clientName: "Creative Agency LLC",
    amount: 3200.00,
    status: "overdue",
    date: "2024-01-10",
    dueDate: "2024-02-10"
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    clientName: "StartupXYZ",
    amount: 950.00,
    status: "draft",
    date: "2024-01-25",
    dueDate: "2024-02-25"
  }
];

// Mock full invoice data
export const mockFullInvoice: FullInvoice = {
  id: "1",
  invoiceNumber: "INV-2024-001",
  date: "January 15, 2024",
  dueDate: "February 15, 2024",
  status: "paid",
  client: {
    name: "Acme Corporation",
    email: "accounting@acme.com",
    address: "456 Corporate Avenue",
    city: "Los Angeles",
    postalCode: "90210",
    country: "United States"
  },
  company: mockCompany,
  items: [
    {
      id: "1",
      description: "Web Development Services - Q1 2024",
      quantity: 40,
      rate: 50.00,
      amount: 2000.00
    },
    {
      id: "2",
      description: "UI/UX Design Consultation",
      quantity: 8,
      rate: 75.00,
      amount: 600.00
    },
    {
      id: "3",
      description: "Project Management",
      quantity: 20,
      rate: 45.00,
      amount: 900.00
    }
  ],
  subtotal: 3500.00,
  tax: 280.00,
  total: 3780.00,
  notes: "Payment terms: Net 30 days. Late payments may incur additional fees."
};