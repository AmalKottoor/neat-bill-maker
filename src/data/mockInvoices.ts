// Mock data for demonstration - in production this would come from your Supabase database

export interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  hoursDays: number;
  amount: number;
}

export interface FullInvoice {
  id: string;
  invoiceNumber: string;
  employeeId: string;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  billedTo: {
    companyName: string;
    address: string;
    contactPerson: string;
    email: string;
  };
  billedFrom: {
    employeeName: string;
    address: string;
    email: string;
    phone: string;
  };
  services: InvoiceItem[];
  subtotal: number;
  taxesFees: number;
  total: number;
  paymentInfo: {
    bankName: string;
    accountName: string;  
    accountNumber: string;
    swiftBicCode: string;
  };
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

// Mock payment info
export const mockPaymentInfo = {
  bankName: "First National Bank",
  accountName: "InvoicePro Ltd.",
  accountNumber: "1234567890",
  swiftBicCode: "FNBKUS33XXX"
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
  employeeId: "EMP-12345",
  date: "January 15, 2024",
  dueDate: "February 15, 2024",
  status: "paid",
  billedTo: {
    companyName: "Acme Corporation",
    address: "456 Corporate Avenue, Los Angeles, CA 90210",
    contactPerson: "John Smith",
    email: "accounting@acme.com"
  },
  billedFrom: {
    employeeName: "Sarah Johnson",
    address: "123 Professional Street, New York, NY 10001",
    email: "sarah.johnson@invoicepro.com",
    phone: "+1 (555) 123-4567"
  },
  services: [
    {
      id: "1",
      description: "Web Development Services - Frontend Development",
      rate: 85.00,
      hoursDays: 40,
      amount: 3400.00
    },
    {
      id: "2",
      description: "UI/UX Design and Consultation",
      rate: 95.00,
      hoursDays: 16,
      amount: 1520.00
    },
    {
      id: "3",
      description: "Project Management and Coordination",
      rate: 75.00,
      hoursDays: 24,
      amount: 1800.00
    }
  ],
  subtotal: 6720.00,
  taxesFees: 537.60,
  total: 7257.60,
  paymentInfo: mockPaymentInfo,
  notes: "Payment terms: Net 30 days. Late payments may incur additional fees. Please reference invoice number in all correspondence."
};