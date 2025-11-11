import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">
              Biriyani wala & Cafe
            </h3>
            <p className="text-muted-foreground mb-4">
              Authentic Indian cuisine delivered fresh to your door.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover-elevate"
                data-testid="button-social-facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover-elevate"
                data-testid="button-social-instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover-elevate"
                data-testid="button-social-twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/menu">
                <span
                  className="block text-muted-foreground hover:text-foreground cursor-pointer"
                  data-testid="link-footer-menu"
                >
                  Menu
                </span>
              </Link>
              <Link href="/about">
                <span
                  className="block text-muted-foreground hover:text-foreground cursor-pointer"
                  data-testid="link-footer-about"
                >
                  About Us
                </span>
              </Link>
              <Link href="/contact">
                <span
                  className="block text-muted-foreground hover:text-foreground cursor-pointer"
                  data-testid="link-footer-contact"
                >
                  Contact
                </span>
              </Link>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground"
                data-testid="link-footer-faq"
              >
                FAQ
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-testid="text-address">
                  123 Food Street, Cuisine City, CC 12345
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm" data-testid="text-phone">
                  (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm" data-testid="text-email">
                  hello@biriyaniwala.com
                </span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-testid="text-hours">
                  Mon-Sun: 11:00 AM - 10:00 PM
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive offers and updates!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button data-testid="button-newsletter-submit">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Biriyani wala & Cafe. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="#"
              className="hover:text-foreground"
              data-testid="link-privacy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-foreground"
              data-testid="link-terms"
            >
              Terms of Service
            </a>
            <br />
            <div className="flex justify-center items-center gap-1">
              Developed by
              <a
                href="https://staffarc.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-orange-600 hover:underline"
              >
                <img
                  src="https://www.staffarc.in/images/Staffarc-logo.png"
                  alt="StaffArc logo"
                  className="h-5 w-5 object-contain"
                />
                StaffArc
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
