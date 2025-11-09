import { ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2">
              <span className="font-serif text-2xl font-bold text-primary">
                Biriyani wala
              </span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <a>
                <Button variant="ghost" data-testid="link-home">
                  Home
                </Button>
              </a>
            </Link>
            <Link href="/menu">
              <a>
                <Button variant="ghost" data-testid="link-menu">
                  Menu
                </Button>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <Button variant="ghost" data-testid="link-about">
                  About
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button variant="ghost" data-testid="link-contact">
                  Contact
                </Button>
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/favorites">
              <a>
                <Button variant="ghost" size="icon" data-testid="button-favorites">
                  <Heart className="h-5 w-5" />
                </Button>
              </a>
            </Link>
            <Link href="/cart">
              <a>
                <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs" data-testid="text-cart-count">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <Button variant="ghost" size="icon" data-testid="button-profile">
                  <User className="h-5 w-5" />
                </Button>
              </a>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/">
              <a className="block">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-home">
                  Home
                </Button>
              </a>
            </Link>
            <Link href="/menu">
              <a className="block">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-menu">
                  Menu
                </Button>
              </a>
            </Link>
            <Link href="/about">
              <a className="block">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-about">
                  About
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a className="block">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-contact">
                  Contact
                </Button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
