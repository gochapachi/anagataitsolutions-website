import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, Clock, DollarSign, Users } from "lucide-react";

export const ROICalculator = () => {
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentChallenges, setCurrentChallenges] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    // ROI calculations based on industry standards and company size
    const baseMetrics = {
      "1-10": { timeSpent: 15, hourlyRate: 300, efficiency: 0.6 },
      "11-25": { timeSpent: 25, hourlyRate: 400, efficiency: 0.65 },
      "26-50": { timeSpent: 35, hourlyRate: 500, efficiency: 0.7 },
      "51-100": { timeSpent: 45, hourlyRate: 600, efficiency: 0.75 },
      "100+": { timeSpent: 60, hourlyRate: 700, efficiency: 0.8 }
    };

    const industryMultipliers = {
      "manufacturing": 1.2,
      "services": 1.0,
      "technology": 1.3,
      "healthcare": 1.1,
      "retail": 0.9,
      "education": 0.8
    };

    const challengeMultipliers = {
      "lead-generation": 1.3,
      "time-management": 1.5,
      "scaling": 1.4,
      "follow-ups": 1.2,
      "data-tracking": 1.1,
      "team-productivity": 1.2
    };

    if (!companySize || !industry || !currentChallenges) return;

    const base = baseMetrics[companySize as keyof typeof baseMetrics];
    const industryMult = industryMultipliers[industry as keyof typeof industryMultipliers] || 1;
    const challengeMult = challengeMultipliers[currentChallenges as keyof typeof challengeMultipliers] || 1;

    const weeklyTimeSpent = base.timeSpent * industryMult * challengeMult;
    const timeValue = weeklyTimeSpent * base.hourlyRate * 4; // Monthly
    const timeSaved = Math.round(weeklyTimeSpent * base.efficiency);
    const monthlySavings = Math.round(timeValue * base.efficiency);
    const additionalRevenue = Math.round(monthlySavings * 1.5); // Opportunity cost
    const totalBenefit = monthlySavings + additionalRevenue;
    const roi = Math.round((totalBenefit / 25000) * 100); // Assuming ₹25k average plan cost

    setResults({
      timeSaved,
      monthlySavings,
      additionalRevenue,
      totalBenefit,
      roi,
      weeklyTimeSpent: Math.round(weeklyTimeSpent)
    });
  };

  return (
    <Card className="card-interactive">
      <CardHeader className="text-center">
        <Badge variant="secondary" className="mx-auto mb-4 w-fit">ROI Calculator</Badge>
        <CardTitle className="text-2xl">Calculate Your Automation ROI</CardTitle>
        <CardDescription>
          Get personalized savings estimates based on your business profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Size</label>
            <Select onValueChange={setCompanySize}>
              <SelectTrigger className="transition-all duration-300 hover:border-primary">
                <SelectValue placeholder="Select employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-25">11-25 employees</SelectItem>
                <SelectItem value="26-50">26-50 employees</SelectItem>
                <SelectItem value="51-100">51-100 employees</SelectItem>
                <SelectItem value="100+">100+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Select onValueChange={setIndustry}>
              <SelectTrigger className="transition-all duration-300 hover:border-primary">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="services">Professional Services</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Main Challenge</label>
            <Select onValueChange={setCurrentChallenges}>
              <SelectTrigger className="transition-all duration-300 hover:border-primary">
                <SelectValue placeholder="Biggest challenge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead-generation">Lead generation</SelectItem>
                <SelectItem value="time-management">Manual tasks</SelectItem>
                <SelectItem value="scaling">Scaling operations</SelectItem>
                <SelectItem value="follow-ups">Inconsistent follow-ups</SelectItem>
                <SelectItem value="data-tracking">Data tracking</SelectItem>
                <SelectItem value="team-productivity">Team productivity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={calculateROI} 
          className="w-full btn-interactive" 
          size="lg"
          disabled={!companySize || !industry || !currentChallenges}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate My ROI
        </Button>

        {results && (
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold mb-6 text-center">Your Potential Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">Current time spent:</span>
                  </div>
                  <span className="font-semibold">{results.weeklyTimeSpent}h/week</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Time you'll save:</span>
                  </div>
                  <span className="font-semibold text-green-600">{results.timeSaved}h/week</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">Monthly savings:</span>
                  </div>
                  <span className="font-semibold text-green-600">₹{results.monthlySavings.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">Additional revenue:</span>
                  </div>
                  <span className="font-semibold text-green-600">₹{results.additionalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Total Monthly Benefit:</span>
                <span className="text-2xl font-bold text-primary">₹{results.totalBenefit.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">ROI in first year:</span>
                <span className="text-lg font-semibold text-green-600">{results.roi}%</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button size="lg" className="btn-interactive">
                Get Detailed ROI Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};