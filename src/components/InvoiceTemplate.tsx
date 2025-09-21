import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
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
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">INVOICE</h1>
          <p className="text-muted-foreground">{invoice.invoiceNumber}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Badge variant={getStatusColor(invoice.status)} className="text-sm px-3 py-1">
            {invoice.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Company and Client Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-foreground mb-3">From:</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">{invoice.company.name}</p>
            <p>{invoice.company.address}</p>
            <p>{invoice.company.city}, {invoice.company.postalCode}</p>
            <p>{invoice.company.country}</p>
            <p className="mt-2">Email: {invoice.company.email}</p>
            <p>Phone: {invoice.company.phone}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-3">Bill To:</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">{invoice.client.name}</p>
            <p>{invoice.client.address}</p>
            <p>{invoice.client.city}, {invoice.client.postalCode}</p>
            <p>{invoice.client.country}</p>
            <p className="mt-2">Email: {invoice.client.email}</p>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Invoice Date</p>
          <p className="font-semibold text-foreground">{invoice.date}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Due Date</p>
          <p className="font-semibold text-foreground">{invoice.dueDate}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-semibold text-foreground">Description</th>
                <th className="text-center py-3 font-semibold text-foreground w-20">Qty</th>
                <th className="text-right py-3 font-semibold text-foreground w-24">Rate</th>
                <th className="text-right py-3 font-semibold text-foreground w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-border/50">
                  <td className="py-4 text-muted-foreground">{item.description}</td>
                  <td className="py-4 text-center text-muted-foreground">{item.quantity}</td>
                  <td className="py-4 text-right text-muted-foreground">${item.rate.toFixed(2)}</td>
                  <td className="py-4 text-right font-medium text-foreground">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full sm:w-80">
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium text-foreground">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-medium text-foreground">${invoice.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between py-3">
              <span className="text-lg font-semibold text-foreground">Total:</span>
              <span className="text-lg font-bold text-foreground">${invoice.total.toFixed(2)}</span>
            </div>
          </div>
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