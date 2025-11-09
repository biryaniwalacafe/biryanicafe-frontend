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
            <span className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2 cursor-pointer">
              <span className="font-serif text-2xl font-bold text-primary">
                Biriyani wala
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" data-testid="link-home">
                Home
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="ghost" data-testid="link-menu">
                Menu
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" data-testid="link-about">
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" data-testid="link-contact">
                Contact
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/favorites">
              <Button variant="ghost" size="icon" data-testid="button-favorites">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs" data-testid="text-cart-count">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" data-testid="button-profile">
                <User className="h-5 w-5" />
              </Button>
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
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-home">
                Home
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-menu">
                Menu
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-about">
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="w-full justify-start" data-testid="link-mobile-contact">
                Contact
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
