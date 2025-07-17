import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, Calculator } from "lucide-react";
export const CTASection = () => {
  return <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">Limited Time Offer</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Save 47% of Your Time and Increase Revenue by 300%?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 50+ MSMEs who've already transformed their business with our automation solutions. 
            Get started today with our risk-free consultation.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm">Free automation assessment</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm">30-day implementation guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Calculator className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span className="text-sm">ROI calculator included</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto btn-interactive">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto btn-interactive">
                View Pricing Plans
              </Button>
            </Link>
          </div>

          {/* Urgency */}
          <div className="mt-8 p-4 bg-background/80 rounded-lg border max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">This month only:</strong> Free setup worth ₹25,000 
              for the first 50 MSME clients
            </p>
            <div className="mt-2">
              <div className="bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2 w-3/4"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">37 spots remaining</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Trusted by businesses like:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold">Kumar Manufacturing</div>
              <div className="text-lg font-semibold">TechStart Solutions</div>
              <div className="text-lg font-semibold">GreenTech Industries</div>
              <div className="text-lg font-semibold">+50 more</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};