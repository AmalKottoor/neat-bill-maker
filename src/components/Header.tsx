import { Button } from "@/components/ui/button";
import { FileText, Plus, Download, Mail } from "lucide-react";

interface HeaderProps {
  onCreateInvoice?: () => void;
  onDownload?: () => void;
  onSendEmail?: () => void;
}

export const Header = ({ onCreateInvoice, onDownload, onSendEmail }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">InvoicePro</h1>
              <p className="text-sm text-muted-foreground">Professional Invoice Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onDownload}
              className="hidden sm:flex"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSendEmail}
              className="hidden sm:flex"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button 
              onClick={onCreateInvoice}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};