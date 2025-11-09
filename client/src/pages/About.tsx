import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-card border-b border-card-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="font-serif text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Bringing authentic Indian flavors to your table since 2010
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, Biriyani wala & Cafe was born from a passion for authentic Indian cuisine and a desire to share the rich flavors of traditional biriyani with food lovers everywhere.
                </p>
                <p>
                  Our journey began in a small kitchen where our founder, a third-generation chef, perfected family recipes passed down through generations. What started as a humble endeavor has grown into a beloved restaurant known for its commitment to quality and authenticity.
                </p>
                <p>
                  Today, we continue to honor those traditions while embracing modern convenience. Every dish is prepared with the same care and attention to detail that our founder instilled from day one, using only the finest ingredients and time-tested cooking techniques.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Quality First</h3>
                      <p className="text-muted-foreground">
                        We source premium ingredients and never compromise on quality, ensuring every meal exceeds expectations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
                      <p className="text-muted-foreground">
                        Each dish is prepared with passion and care, honoring the traditions that make our food special.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Community Focused</h3>
                      <p className="text-muted-foreground">
                        We're proud to serve our community and create memorable dining experiences for families and friends.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              To deliver authentic, delicious Indian cuisine that brings people together. We believe food is more than sustenance—it's a celebration of culture, tradition, and the joy of sharing a meal with loved ones.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
