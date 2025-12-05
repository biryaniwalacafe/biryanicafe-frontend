// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Minus, Plus, Trash2, Tag } from "lucide-react";
// import { useCartStore } from "@/lib/store"; // Assuming cart store is here
// import { useAuthStore } from "@/lib/store/authStore"; // --- CORRECT IMPORT PATH ---
// import { useLocation } from "wouter";
// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// export default function Cart() {
//   const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

//   // --- CORRECTLY READING FROM YOUR AUTH STORE ---
//   // The `user` object's existence determines the auth state.
//   const { user } = useAuthStore();
//   const isAuthenticated = !!user;

//   const [, setLocation] = useLocation();
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState<{
//     code: string;
//     discount: number;
//   } | null>(null);
//   const { toast } = useToast();

//   const subtotal = items.reduce(
//     (sum, item) => sum + parseFloat(item.price) * item.quantity,
//     0
//   );
//   const deliveryFee = subtotal > 0 ? 2.99 : 0;
//   const discount = appliedCoupon
//     ? (subtotal * appliedCoupon.discount) / 100
//     : 0;
//   const total = subtotal + deliveryFee - discount;

//   const applyCoupon = () => {
//     if (couponCode.toUpperCase() === "SAVE10") {
//       setAppliedCoupon({ code: "SAVE10", discount: 10 });
//       toast({
//         title: "Coupon applied!",
//         description: "You saved 10% on your order.",
//       });
//     } else {
//       toast({
//         title: "Invalid coupon",
//         description: "Please check the coupon code and try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleCheckout = () => {
//     // --- The logic is now correct based on your auth store ---
//     if (isAuthenticated) {
//       setLocation("/checkout");
//     } else {
//       setLocation("/auth"); // Redirect to your auth page
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center py-12">
//             <h2 className="font-serif text-3xl font-bold mb-4">
//               Your cart is empty
//             </h2>
//             <p className="text-muted-foreground mb-8">
//               Add some delicious items to get started!
//             </p>
//             <a href="/menu">
//               <Button size="lg">Browse Menu</Button>
//             </a>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-4">
//               {items.map((item) => (
//                 <Card
//                   key={`${item.id}-${JSON.stringify(item.customizations)}`}
//                   className="overflow-hidden"
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex gap-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-cover rounded-md"
//                       />
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-lg mb-1">
//                           {item.name}
//                         </h3>
//                         <div className="text-sm text-muted-foreground space-y-1">
//                           {item.customizations &&
//                             item.customizations.length > 0 && (
//                               <p>
//                                 <span className="font-medium">Add-ons:</span>{" "}
//                                 {item.customizations
//                                   .map((c) => c.selection)
//                                   .join(", ")}
//                               </p>
//                             )}
//                         </div>
//                         <p className="text-lg font-bold text-primary mt-2">
//                           ${(parseFloat(item.price) * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-end justify-between">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() =>
//                             removeFromCart(item.id, item.customizations)
//                           }
//                         >
//                           <Trash2 className="h-5 w-5 text-destructive" />
//                         </Button>
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() =>
//                               updateQuantity(
//                                 item.id,
//                                 Math.max(1, item.quantity - 1),
//                                 item.customizations
//                               )
//                             }
//                             disabled={item.quantity <= 1}
//                           >
//                             <Minus className="h-4 w-4" />
//                           </Button>
//                           <span className="w-8 text-center">
//                             {item.quantity}
//                           </span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() =>
//                               updateQuantity(
//                                 item.id,
//                                 item.quantity + 1,
//                                 item.customizations
//                               )
//                             }
//                           >
//                             <Plus className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               <Button variant="outline" onClick={clearCart} className="w-full">
//                 Clear Cart
//               </Button>
//             </div>

//             <div>
//               <Card className="sticky top-20">
//                 <CardContent className="p-6 space-y-4">
//                   <h3 className="font-semibold text-xl">Order Summary</h3>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>
//                     {/* <div className="flex justify-between">
//                       <span>Delivery Fee</span>
//                       <span>${deliveryFee.toFixed(2)}</span>
//                     </div> */}
//                     {appliedCoupon && (
//                       <div className="flex justify-between text-green-600">
//                         <span>Discount ({appliedCoupon.code})</span>
//                         <span>-${discount.toFixed(2)}</span>
//                       </div>
//                     )}
//                     <div className="border-t pt-2 flex justify-between font-bold text-lg">
//                       <span>Total</span>
//                       <span className="text-primary">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="coupon">Have a coupon?</Label>
//                     <div className="flex gap-2">
//                       <Input
//                         id="coupon"
//                         placeholder="Enter code"
//                         value={couponCode}
//                         onChange={(e) => setCouponCode(e.target.value)}
//                       />
//                       <Button variant="outline" onClick={applyCoupon}>
//                         <Tag className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     <p className="text-xs text-muted-foreground">Try: SAVE10</p>
//                   </div>
//                 </CardContent>

//                 <CardFooter className="p-6 pt-0">
//                   <Button className="w-full" size="lg" onClick={handleCheckout}>
//                     Proceed to Checkout
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import api from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2, Tag, X, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store/authStore";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

//const API_URL = "http://localhost:8000/api";
const API_URL = import.meta.env.VITE_API_URL;

// Interfaces for dynamic data
interface MiscCharge {
  name: string;
  charge_type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: string;
}

interface AppliedCoupon {
  code: string;
  discount_percent: number;
}

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // State for dynamic charges and coupons
  const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );
  const [couponLoading, setCouponLoading] = useState(false);

  const axiosAuth = axios.create({ baseURL: API_URL });
  axiosAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      if (!config.headers) config.headers = new AxiosHeaders();
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  });

  // Effect to fetch dynamic charges
  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await api.get("/coupons/charges/");
        setMiscCharges(response.data);
      } catch (error) {
        console.error("Failed to fetch miscellaneous charges:", error);
      }
    };
    fetchCharges();
  }, []);

  // Dynamic Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const calculatedCharges = miscCharges.map((charge) => {
    const value = parseFloat(charge.value);
    const amount =
      charge.charge_type === "PERCENTAGE" ? (subtotal * value) / 100 : value;
    return { name: charge.name, amount };
  });

  const totalCharges = calculatedCharges.reduce(
    (sum, charge) => sum + charge.amount,
    0
  );
  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discount_percent) / 100
    : 0;
  const total = subtotal + totalCharges - discountAmount;

  // API-driven coupon handlers
  const handleApplyCoupon = async () => {
    /* ... (omitted for brevity, no changes) ... */
  };
  const handleRemoveCoupon = () => {
    /* ... (omitted for brevity, no changes) ... */
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      setLocation("/checkout");
    } else {
      toast({
        title: "Please Log In",
        description: "You need to be logged in to proceed to checkout.",
      });
      setLocation("/auth");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <h2 className="font-serif text-3xl font-bold mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Add some delicious items to get started!
            </p>
            <a href="/menu">
              <Button size="lg">Browse Menu</Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* --- THIS IS THE CORRECTED SECTION --- */}
              {items.map((item) => (
                <Card
                  key={`${item.id}-${JSON.stringify(item.customizations)}`}
                  className="overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.name}
                        </h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {item.customizations &&
                            item.customizations.length > 0 && (
                              <p>
                                <span className="font-medium">Add-ons:</span>{" "}
                                {item.customizations
                                  .map((c) => c.selection)
                                  .join(", ")}
                              </p>
                            )}
                        </div>
                        <p className="text-lg font-bold text-primary mt-2">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeFromCart(item.id, item.customizations)
                          }
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                                item.customizations
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.customizations
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </div>
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-xl">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {calculatedCharges.map((charge) => (
                      <div key={charge.name} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {charge.name}
                        </span>
                        <span>${charge.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="coupon">Have a coupon?</Label>
                    {!appliedCoupon ? (
                      <div className="flex gap-2">
                        <Input
                          id="coupon"
                          placeholder="Enter code"
                          value={couponInput}
                          onChange={(e) =>
                            setCouponInput(e.target.value.toUpperCase())
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                        >
                          {couponLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Tag className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
                        <p className="text-sm font-medium text-green-600">
                          {appliedCoupon.code} Applied!
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveCoupon}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div> */}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
