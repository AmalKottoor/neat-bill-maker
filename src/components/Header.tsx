import { Button } from "@/components/ui/button";
import { FileText, Plus, Download, Mail, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  onCreateInvoice?: () => void;
  onDownload?: () => void;
  onSendEmail?: () => void;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header = ({ onCreateInvoice, onDownload, onSendEmail, onMenuClick, showMenuButton }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
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
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
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