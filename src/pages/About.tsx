import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Target, Zap, Award, TrendingUp, Heart } from "lucide-react";
const About = () => {
  const values = [{
    icon: Users,
    title: "MSME-First Approach",
    description: "We understand the unique challenges of small and medium businesses and design solutions specifically for them, not enterprise hand-me-downs."
  }, {
    icon: Target,
    title: "Results-Driven",
    description: "Every automation we implement is measured by tangible business outcomes: time saved, revenue increased, and processes improved."
  }, {
    icon: Zap,
    title: "Rapid Implementation",
    description: "We believe in speed to value. Our solutions are designed for quick implementation and immediate impact, not months of configuration."
  }, {
    icon: Heart,
    title: "Long-term Partnership",
    description: "We're not just vendors; we're growth partners committed to your long-term success through every stage of your business journey."
  }];
  const team = [{
    name: "Rahul Sharma",
    role: "Founder & CEO",
    experience: "12+ years",
    expertise: "Enterprise automation, MSME consulting",
    description: "Former automation consultant at Fortune 500 companies, passionate about democratizing enterprise-grade automation for MSMEs.",
    image: "/placeholder.svg?height=120&width=120"
  }, {
    name: "Priya Patel",
    role: "Head of Technology",
    experience: "10+ years",
    expertise: "AI/ML, System Integration",
    description: "Ex-tech lead at major SaaS companies, specializes in building scalable automation platforms for growing businesses.",
    image: "/placeholder.svg?height=120&width=120"
  }, {
    name: "Amit Kumar",
    role: "Head of Customer Success",
    experience: "8+ years",
    expertise: "Business Process Optimization",
    description: "MSME operations expert who ensures every client achieves their automation ROI goals within the first 90 days.",
    image: "/placeholder.svg?height=120&width=120"
  }];
  const milestones = [{
    year: "2020",
    title: "Company Founded",
    description: "Started with a mission to make enterprise-grade automation accessible to MSMEs across India."
  }, {
    year: "2021",
    title: "First 100 Clients",
    description: "Reached our first major milestone, helping 100 MSMEs automate their business processes."
  }, {
    year: "2022",
    title: "AI Integration",
    description: "Launched AI-powered features that revolutionized how small businesses approach automation."
  }, {
    year: "2023",
    title: "500+ Success Stories",
    description: "Crossed 500 successful automation implementations with an average 300% ROI."
  }, {
    year: "2024",
    title: "Industry Recognition",
    description: "Named 'Best MSME Automation Platform' by Indian Business Technology Awards."
  }, {
    year: "2025",
    title: "Expansion Goals",
    description: "On track to help 2,000+ MSMEs automate their operations and scale efficiently."
  }];
  const stats = [{
    number: "500+",
    label: "MSMEs Automated",
    description: "Across various industries"
  }, {
    number: "300%",
    label: "Average ROI",
    description: "Within 6 months"
  }, {
    number: "98%",
    label: "Client Satisfaction",
    description: "Success rate"
  }, {
    number: "₹50Cr+",
    label: "Revenue Generated",
    description: "For our clients"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">About Anagata IT Solutions</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Empowering MSMEs Through Intelligent Automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Founded in 2020, we've made it our mission to democratize enterprise-grade automation 
              for small and medium businesses across India. We believe every MSME deserves the same 
              technological advantages as large corporations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To transform every MSME in India into a digitally-powered, efficiently-run business 
                  that can compete on equal footing with larger enterprises through intelligent automation.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground">
                  A future where technology barriers don't limit business growth—where every entrepreneur 
                  has access to the same automation capabilities that drive success in large organizations.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-6 h-6 mr-2 text-primary" />
                    The Problem We Solve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most automation solutions are built for enterprises, with complex setups, 
                    high costs, and features that MSMEs don't need. We bridge this gap with 
                    purpose-built solutions for growing businesses.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary" />
                    Our Unique Approach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We start with business outcomes, not technology features. Every automation 
                    is designed to solve specific MSME challenges while being affordable, 
                    quick to implement, and easy to maintain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl font-bold mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core values guide every decision we make and every solution we build for our MSME partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-4">
              The People Behind Your Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team combines deep technical expertise with real-world MSME experience 
              to deliver automation solutions that actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => <Card key={index} className="text-center">
                <CardHeader>
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {member.role}
                  </CardDescription>
                  <div className="text-sm text-muted-foreground">
                    {member.experience} • {member.expertise}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl font-bold mb-4">
              5 Years of MSME Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small startup to India's leading MSME automation platform, 
              here's how we've grown alongside our clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => <div key={index} className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">By The Numbers</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These numbers represent real businesses transformed, real time saved, 
              and real revenue generated through automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <CardTitle className="text-lg">{stat.label}</CardTitle>
                  <CardDescription>{stat.description}</CardDescription>
                </CardHeader>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Recognition</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Best MSME Platform 2024</CardTitle>
                <CardDescription>Indian Business Technology Awards</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Top Growth Company</CardTitle>
                <CardDescription>StartupIndia Recognition</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>98% Client Satisfaction</CardTitle>
                <CardDescription>Based on 500+ reviews</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Join Our Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the next 500 MSMEs to transform their business with automation. 
              Let's write your success story together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default About;