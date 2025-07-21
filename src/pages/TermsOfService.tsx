import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Legal Information</Badge>
              <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
              <p className="text-xl text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By accessing and using Anagata IT Solutions' services, you accept and agree to be bound 
                    by the terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Description of Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Anagata IT Solutions provides automation solutions for MSMEs including marketing automation, 
                    sales automation, and HR automation services. We offer consulting, implementation, 
                    and ongoing support services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. User Obligations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Account Responsibility</h4>
                      <p className="text-muted-foreground">
                        You are responsible for maintaining the confidentiality of your account credentials 
                        and for all activities that occur under your account.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Acceptable Use</h4>
                      <p className="text-muted-foreground">
                        You agree not to use our services for any unlawful purpose or in any way that could 
                        damage, disable, or impair our services or interfere with other users' access.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Service Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    While we strive to provide continuous service availability, we do not guarantee 
                    uninterrupted access to our services. We may temporarily suspend service for 
                    maintenance, updates, or due to circumstances beyond our control.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Payment Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>All fees are quoted in Indian Rupees (INR) unless otherwise specified</li>
                    <li>Payment terms are specified in individual service agreements</li>
                    <li>Late payments may incur additional charges</li>
                    <li>Refunds are subject to our refund policy as outlined in service agreements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All content, features, and functionality of our services are owned by Anagata IT Solutions 
                    and are protected by copyright, trademark, and other intellectual property laws. 
                    You may not reproduce, distribute, or create derivative works without our express permission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To the maximum extent permitted by law, Anagata IT Solutions shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, including but not limited 
                    to loss of profits, data, or business opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Either party may terminate service agreements with appropriate notice as specified in 
                    individual contracts. Upon termination, your right to use our services will cease immediately.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    These terms shall be governed by and construed in accordance with the laws of India. 
                    Any disputes arising from these terms will be subject to the jurisdiction of courts in Bangalore, India.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    For questions regarding these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-muted-foreground">Email: legal@anagatait.com</p>
                    <p className="text-muted-foreground">Phone: +91 98765 43210</p>
                    <p className="text-muted-foreground">
                      Address: Anagata IT Solutions, Tech Hub, Bangalore, India
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;