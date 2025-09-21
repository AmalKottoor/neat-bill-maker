import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  hoursDays: number;
  amount: number;
}

interface Invoice {
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

interface InvoiceTemplateProps {
  invoice: Invoice;
}

export const InvoiceTemplate = ({ invoice }: InvoiceTemplateProps) => {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'success';
      case 'sent': return 'default';
      case 'overdue': return 'destructive';
      case 'draft': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-8 shadow-medium animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-6">Professional Invoice</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-muted-foreground">Date</p>
            <p className="font-semibold text-foreground">{invoice.date}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-muted-foreground">Invoice No.</p>
            <p className="font-semibold text-foreground">{invoice.invoiceNumber}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-muted-foreground">Employee ID</p>
            <p className="font-semibold text-foreground">{invoice.employeeId}</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant={getStatusColor(invoice.status)} className="text-sm px-4 py-2">
            {invoice.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Billed To and Billed From */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="font-bold text-foreground mb-4 text-lg">Billed To</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Company Name</p>
              <p className="font-medium text-foreground">{invoice.billedTo.companyName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Address</p>
              <p>{invoice.billedTo.address}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Contact Person</p>
              <p>{invoice.billedTo.contactPerson}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p>{invoice.billedTo.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border border-border rounded-lg">
          <h3 className="font-bold text-foreground mb-4 text-lg">Billed From</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Employee Name</p>
              <p className="font-medium text-foreground">{invoice.billedFrom.employeeName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Address</p>
              <p>{invoice.billedFrom.address}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p>{invoice.billedFrom.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p>{invoice.billedFrom.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Rendered Table */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Services Rendered</h3>
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Description</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground w-24">Rate</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground w-32">Hours/Days</th>
                <th className="text-right py-4 px-4 font-semibold text-foreground w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.services.map((service) => (
                <tr key={service.id} className="border-b border-border/50 last:border-b-0">
                  <td className="py-4 px-4 text-muted-foreground">{service.description}</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">${service.rate.toFixed(2)}</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">{service.hoursDays}</td>
                  <td className="py-4 px-4 text-right font-medium text-foreground">${service.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Summary</h3>
        <div className="flex justify-end">
          <div className="w-full sm:w-96 border border-border rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium text-foreground">${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Taxes/Fees:</span>
                <span className="font-medium text-foreground">${invoice.taxesFees.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-3">
                <span className="text-xl font-bold text-foreground">Total Amount Due:</span>
                <span className="text-xl font-bold text-primary">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4 text-lg">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Due Date</p>
            <p className="font-semibold text-foreground">{invoice.dueDate}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Bank Name</p>
            <p className="font-semibold text-foreground">{invoice.paymentInfo.bankName}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Account Name</p>
            <p className="font-semibold text-foreground">{invoice.paymentInfo.accountName}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Account Number</p>
            <p className="font-semibold text-foreground">{invoice.paymentInfo.accountNumber}</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">SWIFT/BIC Code</p>
          <p className="font-semibold text-foreground">{invoice.paymentInfo.swiftBicCode}</p>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-2">Notes:</h4>
          <p className="text-sm text-muted-foreground">{invoice.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="pt-8 mt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Thank you for your business!
        </p>
      </div>
    </Card>
  );
};