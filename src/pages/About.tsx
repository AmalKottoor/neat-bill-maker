import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional team with years of experience in financial services and invoice management."
    },
    {
      icon: Target,
      title: "Precision Focus",
      description: "We focus on accuracy and efficiency to help your business maintain perfect financial records."
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Award-winning customer service with 24/7 support for all your invoicing needs."
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Our solutions help businesses streamline operations and accelerate growth."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">About InvoicePro</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Leading the way in professional invoice management and financial solutions for businesses of all sizes.
        </p>
      </div>

      {/* Story Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2020, InvoicePro emerged from a simple vision: to make invoice management 
            effortless for businesses worldwide. What started as a small team of financial experts 
            has grown into a comprehensive platform serving thousands of businesses.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We understand the challenges of managing invoices, tracking payments, and maintaining 
            professional relationships with clients. That's why we've built a platform that combines 
            powerful functionality with intuitive design, ensuring that your business operations 
            run smoothly.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To empower businesses with innovative invoice management solutions that save time, 
              reduce errors, and improve cash flow. We're committed to making financial operations 
              simple and efficient for everyone.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Our Values</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Reliability</Badge>
                <Badge variant="secondary">Innovation</Badge>
                <Badge variant="secondary">Transparency</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Customer Success</Badge>
                <Badge variant="secondary">Quality</Badge>
                <Badge variant="secondary">Security</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <Card className="bg-gradient-subtle">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-muted-foreground">Invoices Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;