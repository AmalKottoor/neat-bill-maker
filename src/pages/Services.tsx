import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, Download, CreditCard, BarChart3, Shield, Clock, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Invoice Creation & Management",
      description: "Create professional invoices with customizable templates, automated numbering, and brand integration.",
      features: ["Custom Templates", "Auto-numbering", "Brand Integration", "Multi-currency Support"],
      popular: true
    },
    {
      icon: Mail,
      title: "Automated Email Delivery",
      description: "Send invoices directly to clients with automated reminders and delivery confirmations.",
      features: ["Email Templates", "Delivery Tracking", "Auto Reminders", "Client Portal Access"],
      popular: false
    },
    {
      icon: Download,
      title: "PDF Generation & Export",
      description: "Generate high-quality PDF invoices with professional formatting and digital signatures.",
      features: ["High-quality PDFs", "Digital Signatures", "Batch Export", "Archive Management"],
      popular: false
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Integrate with payment gateways to accept online payments and track payment status.",
      features: ["Multiple Gateways", "Payment Tracking", "Recurring Billing", "Partial Payments"],
      popular: true
    },
    {
      icon: BarChart3,
      title: "Financial Reporting",
      description: "Comprehensive reports and analytics to track business performance and cash flow.",
      features: ["Revenue Reports", "Cash Flow Analysis", "Tax Reports", "Custom Dashboards"],
      popular: false
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with data encryption and compliance with financial regulations.",
      features: ["Data Encryption", "GDPR Compliant", "Regular Backups", "Access Controls"],
      popular: false
    }
  ];

  const additionalServices = [
    {
      icon: Clock,
      title: "Time Tracking Integration",
      description: "Connect time tracking tools to automatically generate invoices based on billable hours."
    },
    {
      icon: Users,
      title: "Multi-user Collaboration",
      description: "Team access with role-based permissions for collaborative invoice management."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive invoice management solutions designed to streamline your business operations and improve cash flow.
        </p>
      </div>

      {/* Main Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="relative hover:shadow-lg transition-shadow">
              {service.popular && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-primary">
                  Popular
                </Badge>
              )}
              <CardHeader className="space-y-4">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full mt-4" variant={service.popular ? "default" : "outline"}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Services */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-subtle">
        <CardContent className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the services that best fit your business needs and start streamlining your invoice management today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;