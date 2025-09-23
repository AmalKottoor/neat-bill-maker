import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@invoicepro.com",
      subtitle: "Get email support within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtitle: "Monday to Friday, 9 AM - 6 PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Business Plaza, Suite 456",
      subtitle: "New York, NY 10001, USA"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9 AM - 6 PM EST",
      subtitle: "Weekend support via email"
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat"
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed questions via email",
      action: "Send Email"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about our invoice management services? We're here to help you succeed.
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mx-auto">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{info.title}</h3>
                  <p className="text-foreground font-medium">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this regarding?" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..." 
                  className="min-h-[120px]"
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-gradient-primary">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {option.action}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">How quickly do you respond to support requests?</h4>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 4 hours during business hours and within 24 hours on weekends.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Do you offer phone support?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Phone support is available Monday through Friday, 9 AM - 6 PM EST.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Is there a knowledge base available?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we have a comprehensive help center with guides, tutorials, and FAQs.
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                View Full FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;