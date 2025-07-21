import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Legal Information</Badge>
              <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cookies are small text files that are stored on your computer or mobile device when you 
                    visit our website. They help us provide you with a better experience by remembering your 
                    preferences and understanding how you use our site.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Essential Cookies</h4>
                    <p className="text-muted-foreground">
                      These cookies are necessary for the website to function properly. They enable basic 
                      features like page navigation and access to secure areas of the website.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-muted-foreground">
                      We use these cookies to understand how visitors interact with our website by collecting 
                      and reporting information anonymously. This helps us improve our website's performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Functional Cookies</h4>
                    <p className="text-muted-foreground">
                      These cookies allow us to remember choices you make and provide enhanced, more personal features. 
                      They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                    <p className="text-muted-foreground">
                      These cookies track your browsing habits to enable us to show advertising which is more 
                      likely to be of interest to you. They may be used to build a profile of your interests.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Third-Party Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We may use third-party service providers who may set cookies on your device on our behalf 
                    when you visit our website. These include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Google Analytics - for website analytics and performance monitoring</li>
                    <li>Google Ads - for advertising and remarketing purposes</li>
                    <li>Social media platforms - for social sharing functionality</li>
                    <li>Customer support tools - for providing help and support services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. How to Control Cookies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Browser Settings</h4>
                    <p className="text-muted-foreground">
                      Most web browsers allow you to control cookies through their settings preferences. 
                      You can set your browser to refuse cookies or to indicate when a cookie is being sent.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cookie Banner</h4>
                    <p className="text-muted-foreground">
                      When you first visit our website, you'll see a cookie banner that allows you to 
                      accept or reject non-essential cookies. You can change your preferences at any time.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Opt-Out Links</h4>
                    <p className="text-muted-foreground">
                      For third-party cookies, you can opt out directly through the service provider's 
                      opt-out mechanisms or through industry opt-out tools.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Impact of Disabling Cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you choose to disable cookies, some features of our website may not function properly. 
                    This could affect your ability to use certain services or access specific content on our site.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We may update this Cookie Policy from time to time to reflect changes in our practices 
                    or for legal, regulatory, or operational reasons. We will notify you of any material 
                    changes by posting the updated policy on our website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-muted-foreground">Email: privacy@anagatait.com</p>
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

export default CookiePolicy;