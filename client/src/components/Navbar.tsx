// import { ShoppingCart, User, Heart, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ThemeToggle } from "./ThemeToggle";
// import { Link } from "wouter";
// import { useCartStore } from "@/lib/store";
// import { useState } from "react";

// export function Navbar() {
//   const items = useCartStore((state) => state.items);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav className="sticky top-0 z-50 bg-background border-b border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link href="/">
//             <span className="flex items-center space-x-2 hover-elevate rounded-md px-3 py-2 cursor-pointer">
//               <span className="font-serif text-2xl font-bold text-primary">
//                 Biriyani wala & Cafe
//               </span>
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-1">
//             <Link href="/">
//               <Button variant="ghost" data-testid="link-home">
//                 Home
//               </Button>
//             </Link>
//             <Link href="/menu">
//               <Button variant="ghost" data-testid="link-menu">
//                 Menu
//               </Button>
//             </Link>
//             <Link href="/about">
//               <Button variant="ghost" data-testid="link-about">
//                 About
//               </Button>
//             </Link>
//             <Link href="/contact">
//               <Button variant="ghost" data-testid="link-contact">
//                 Contact
//               </Button>
//             </Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <ThemeToggle />
//             <Link href="/favorites">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 data-testid="button-favorites"
//               >
//                 <Heart className="h-5 w-5" />
//               </Button>
//             </Link>
//             <Link href="/cart">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="relative"
//                 data-testid="button-cart"
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemCount > 0 && (
//                   <Badge
//                     className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
//                     data-testid="text-cart-count"
//                   >
//                     {cartItemCount}
//                   </Badge>
//                 )}
//               </Button>
//             </Link>
//             <Link href="/profile">
//               <Button variant="ghost" size="icon" data-testid="button-profile">
//                 <User className="h-5 w-5" />
//               </Button>
//             </Link>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               data-testid="button-mobile-menu"
//             >
//               <Menu className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden pb-4 space-y-2">
//             <Link href="/">
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start"
//                 data-testid="link-mobile-home"
//               >
//                 Home
//               </Button>
//             </Link>
//             <Link href="/menu">
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start"
//                 data-testid="link-mobile-menu"
//               >
//                 Menu
//               </Button>
//             </Link>
//             <Link href="/about">
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start"
//                 data-testid="link-mobile-about"
//               >
//                 About
//               </Button>
//             </Link>
//             <Link href="/contact">
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start"
//                 data-testid="link-mobile-contact"
//               >
//                 Contact
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";
import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger animation when cart count increases
  useEffect(() => {
    if (cartItemCount > prevCartCount) {
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 600);
    }
    setPrevCartCount(cartItemCount);
  }, [cartItemCount]);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Logo Container - Circular to match logo shape */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Biryaniwala & Cafe Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {/* Optional subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                  Biryaniwala & Cafe
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block mt-0.5">
                  Authentic Indian-Pakistani Cuisine
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home", testId: "link-home" },
              { href: "/menu", label: "Menu", testId: "link-menu" },
              { href: "/about", label: "About", testId: "link-about" },
              { href: "/contact", label: "Contact", testId: "link-contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="relative font-medium hover:text-primary transition-colors duration-300 group"
                  data-testid={link.testId}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300" />
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Animated Cart Button */}
            <Link href="/cart">
              <motion.div
                animate={
                  cartAnimation
                    ? {
                        scale: [1, 1.2, 0.9, 1.1, 1],
                        rotate: [0, -10, 10, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative group hover:bg-primary/10 transition-colors duration-300"
                  data-testid="button-cart"
                >
                  <motion.div
                    animate={
                      cartAnimation
                        ? {
                            y: [0, -3, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.3,
                      repeat: cartAnimation ? 1 : 0,
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
                  </motion.div>

                  <AnimatePresence>
                    {cartItemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      >
                        <Badge
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-primary hover:bg-primary shadow-lg"
                          data-testid="text-cart-count"
                        >
                          <motion.span
                            key={cartItemCount}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            {cartItemCount}
                          </motion.span>
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cart pulse effect when item added */}
                  {cartAnimation && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </Button>
              </motion.div>
            </Link>

            {/* Profile Button */}
            <Link href="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                data-testid="button-profile"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-border/50">
                {[
                  { href: "/", label: "Home", testId: "link-mobile-home" },
                  { href: "/menu", label: "Menu", testId: "link-mobile-menu" },
                  {
                    href: "/about",
                    label: "About",
                    testId: "link-mobile-about",
                  },
                  {
                    href: "/contact",
                    label: "Contact",
                    testId: "link-mobile-contact",
                  },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={link.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={link.testId}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
