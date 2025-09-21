import { useState } from "react";
import { Header } from "@/components/Header";
import { InvoiceDashboard } from "@/components/InvoiceDashboard";
import { InvoiceTemplate } from "@/components/InvoiceTemplate";
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { mockDashboardInvoices, mockFullInvoice, type DashboardInvoice, type FullInvoice } from "@/data/mockInvoices";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'invoice'>('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<FullInvoice | null>(null);
  const { toast } = useToast();

  const handleLogin = (credentials: { username: string; password: string }) => {
    // In production, this would validate against Supabase Auth
    setIsAuthenticated(true);
  };

  const handleViewInvoice = (dashboardInvoice: DashboardInvoice) => {
    // In a real app, you would fetch the full invoice data from your database
    // For demo purposes, we'll use the mock data
    setSelectedInvoice(mockFullInvoice);
    setCurrentView('invoice');
  };

  const handleCreateInvoice = () => {
    toast({
      title: "Create New Invoice",
      description: "This feature requires backend integration with Supabase to create and store invoices.",
    });
  };

  const handleEditInvoice = (invoice: DashboardInvoice) => {
    toast({
      title: "Edit Invoice",
      description: "This feature requires backend integration with Supabase to modify invoice data.",
    });
  };

  const handleSendEmail = (invoice?: DashboardInvoice) => {
    toast({
      title: "Send Email",
      description: "This feature requires backend integration with Supabase to send emails via API.",
    });
  };

  const handleDownload = (invoice?: DashboardInvoice) => {
    toast({
      title: "Download Invoice",
      description: "This feature requires backend integration to generate and download PDF invoices.",
    });
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedInvoice(null);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onCreateInvoice={handleCreateInvoice}
        onDownload={currentView === 'invoice' ? () => handleDownload() : undefined}
        onSendEmail={currentView === 'invoice' ? () => handleSendEmail() : undefined}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' ? (
          <InvoiceDashboard
            invoices={mockDashboardInvoices}
            onViewInvoice={handleViewInvoice}
            onEditInvoice={handleEditInvoice}
            onSendEmail={handleSendEmail}
            onDownload={handleDownload}
          />
        ) : (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={handleBackToDashboard}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            {selectedInvoice && (
              <InvoiceTemplate invoice={selectedInvoice} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
