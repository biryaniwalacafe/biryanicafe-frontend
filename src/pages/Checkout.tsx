// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input"; // --- ADDED ---
// import { Label } from "@/components/ui/label";
// import { useCartStore, CartItem } from "@/lib/store";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useLocation } from "wouter";
// import { useState, useEffect } from "react";
// import { Check, Loader2, X } from "lucide-react"; // --- ADDED ---
// import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
// import { useToast } from "@/hooks/use-toast";
// import { Separator } from "@/components/ui/separator";

// const API_URL = "http://localhost:8000/api";

// // --- NEW INTERFACES ---
// interface MiscCharge {
//   name: string;
//   charge_type: "PERCENTAGE" | "FIXED_AMOUNT";
//   value: string;
// }

// interface AppliedCoupon {
//   code: string;
//   discount_percent: number;
// }

// interface ConfirmedOrderDetails {
//   items: CartItem[];
//   notes: string;
//   subtotal: number;
//   charges: { name: string; value: number }[];
//   discount: { code: string; amount: number } | null;
//   total: number;
// }

// export default function Checkout() {
//   const { items, clearCart } = useCartStore();
//   const { user } = useAuthStore();
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [additionalNotes, setAdditionalNotes] = useState("");
//   const [newOrderId, setNewOrderId] = useState<string | null>(null);

//   // --- NEW STATE for Coupons and Charges ---
//   const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
//   const [couponInput, setCouponInput] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
//     null
//   );
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [confirmedOrder, setConfirmedOrder] =
//     useState<ConfirmedOrderDetails | null>(null);

//   const axiosAuth = axios.create({ baseURL: API_URL });
//   axiosAuth.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const token = useAuthStore.getState().accessToken;
//       if (token) {
//         if (!config.headers) config.headers = new AxiosHeaders();
//         else if (!(config.headers instanceof AxiosHeaders))
//           config.headers = new AxiosHeaders(config.headers);
//         config.headers.set("Authorization", `Bearer ${token}`);
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   useEffect(() => {
//     if (!user) {
//       toast({
//         title: "Authentication Required",
//         description: "Please log in to proceed to checkout.",
//         variant: "destructive",
//       });
//       setLocation("/auth");
//     }
//   }, [user, setLocation, toast]);
//   useEffect(() => {
//     if (orderPlaced) {
//       clearCart();
//     }
//   }, [orderPlaced, clearCart]);

//   // --- NEW: Fetch dynamic charges on component load ---
//   useEffect(() => {
//     const fetchCharges = async () => {
//       try {
//         const response = await axiosAuth.get("/coupons/charges/");
//         setMiscCharges(response.data);
//       } catch (error) {
//         console.error("Failed to fetch miscellaneous charges:", error);
//       }
//     };
//     fetchCharges();
//   }, []); // Run once on mount

//   // --- DYNAMIC CALCULATIONS ---
//   const subtotal = items.reduce(
//     (sum, item) => sum + parseFloat(item.price) * item.quantity,
//     0
//   );

//   const calculatedCharges = miscCharges.map((charge) => {
//     const value = parseFloat(charge.value);
//     const amount =
//       charge.charge_type === "PERCENTAGE" ? (subtotal * value) / 100 : value;
//     return { name: charge.name, amount };
//   });

//   const totalCharges = calculatedCharges.reduce(
//     (sum, charge) => sum + charge.amount,
//     0
//   );
//   const discountAmount = appliedCoupon
//     ? (subtotal * appliedCoupon.discount_percent) / 100
//     : 0;
//   const total = subtotal + totalCharges - discountAmount;

//   if (items.length === 0 && !orderPlaced) {
//     if (typeof window !== "undefined") {
//       setLocation("/menu");
//     }
//     return null;
//   }

//   // --- NEW: Handle Coupon Application ---
//   const handleApplyCoupon = async () => {
//     if (!couponInput)
//       return toast({
//         title: "Please enter a coupon code.",
//         variant: "destructive",
//       });
//     setCouponLoading(true);
//     try {
//       const response = await axiosAuth.post("/coupons/validate/", {
//         code: couponInput,
//       });
//       setAppliedCoupon(response.data);
//       toast({
//         title: "Coupon Applied!",
//         description: `${response.data.discount_percent}% off your order.`,
//       });
//     } catch (error: any) {
//       toast({
//         title: "Coupon Error",
//         description: error.response?.data?.error || "Invalid coupon code.",
//         variant: "destructive",
//       });
//       setAppliedCoupon(null);
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput("");
//     toast({ title: "Coupon removed." });
//   };

//   // --- UPDATED: Handle Place Order ---
//   const handlePlaceOrder = async () => {
//     setIsLoading(true);
//     const orderPayload = {
//       coupon_code: appliedCoupon ? appliedCoupon.code : null,
//       additional_notes: additionalNotes,
//       items: items.map((item) => ({
//         menu_item_id: parseInt(item.id, 10),
//         quantity: item.quantity,
//         customizations: item.customizations || [],
//       })),
//     };

//     try {
//       const response = await axiosAuth.post("/orders/", orderPayload);
//       setNewOrderId(response.data.order_id);
//       setConfirmedOrder({
//         items,
//         notes: additionalNotes,
//         subtotal,
//         charges: calculatedCharges.map((c) => ({
//           name: c.name,
//           value: c.amount,
//         })),
//         discount: appliedCoupon
//           ? { code: appliedCoupon.code, amount: discountAmount }
//           : null,
//         total,
//       });
//       setOrderPlaced(true);
//     } catch (error) {
//       toast({
//         title: "Order Failed",
//         description: "There was a problem placing your order.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- UPDATED: Order Confirmation Screen ---
//   if (orderPlaced && confirmedOrder) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 flex items-center justify-center py-12">
//           <Card className="max-w-lg w-full mx-4">
//             <CardContent className="pt-8 pb-8 text-center space-y-6">
//               <div>
//                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
//                   <Check className="h-10 w-10 text-green-600" />
//                 </div>
//                 <h2 className="font-serif text-3xl font-bold mb-2">
//                   Order Confirmed!
//                 </h2>
//                 <p className="text-muted-foreground">
//                   Your Order ID: {newOrderId}
//                 </p>
//               </div>
//               <Card className="text-left">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-3">
//                     {confirmedOrder.items.map((item) => (
//                       <div
//                         key={`${item.id}-${JSON.stringify(
//                           item.customizations
//                         )}`}
//                         className="flex gap-4 pb-3 border-b last:border-0"
//                       >
//                         {/* ... item display ... */}
//                       </div>
//                     ))}
//                   </div>
//                   <Separator />
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <p className="text-muted-foreground">Subtotal</p>
//                       <p>${confirmedOrder.subtotal.toFixed(2)}</p>
//                     </div>
//                     {confirmedOrder.charges.map((charge) => (
//                       <div key={charge.name} className="flex justify-between">
//                         <p className="text-muted-foreground">{charge.name}</p>
//                         <p>${charge.value.toFixed(2)}</p>
//                       </div>
//                     ))}
//                     {confirmedOrder.discount && (
//                       <div className="flex justify-between text-green-600">
//                         <p>Discount ({confirmedOrder.discount.code})</p>
//                         <p>-${confirmedOrder.discount.amount.toFixed(2)}</p>
//                       </div>
//                     )}
//                     <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
//                       <p>Grand Total</p>
//                       <p>${confirmedOrder.total.toFixed(2)}</p>
//                     </div>
//                   </div>
//                   {confirmedOrder.notes && (
//                     <div className="pt-4">
//                       <p className="font-semibold">Your Notes:</p>
//                       <p className="text-sm text-muted-foreground italic">
//                         "{confirmedOrder.notes}"
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//               <div className="space-y-3 pt-4">{/* ... buttons ... */}</div>
//             </CardContent>
//           </Card>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // --- UPDATED: Main Checkout Page ---
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Order Items</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {items.map((item) => (
//                       <div
//                         key={`${item.id}-${JSON.stringify(
//                           item.customizations
//                         )}`}
//                         className="flex items-center gap-4 pb-3 border-b last:border-0"
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded-md"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium">{item.name}</p>
//                           {item.customizations &&
//                             item.customizations.length > 0 && (
//                               <p className="text-sm text-muted-foreground">
//                                 {item.customizations
//                                   .map((c) => c.selection)
//                                   .join(", ")}
//                               </p>
//                             )}
//                           <p className="text-sm text-muted-foreground">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <span className="font-semibold">
//                           ${(parseFloat(item.price) * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//             <div>
//               <Card className="sticky top-20">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {/* Price Breakdown */}
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Subtotal</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>
//                     {calculatedCharges.map((charge) => (
//                       <div key={charge.name} className="flex justify-between">
//                         <span className="text-muted-foreground">
//                           {charge.name}
//                         </span>
//                         <span>${charge.amount.toFixed(2)}</span>
//                       </div>
//                     ))}
//                     {appliedCoupon && (
//                       <div className="flex justify-between text-green-600 font-medium">
//                         <span>Discount ({appliedCoupon.code})</span>
//                         <span>-${discountAmount.toFixed(2)}</span>
//                       </div>
//                     )}
//                     <div className="border-t pt-2 flex justify-between font-bold text-lg">
//                       <span>Total</span>
//                       <span className="text-primary">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                   <Separator />
//                   {/* Coupon Area */}
//                   <div className="space-y-2">
//                     <Label htmlFor="coupon-code">Coupon Code</Label>
//                     {!appliedCoupon ? (
//                       <div className="flex space-x-2">
//                         <Input
//                           id="coupon-code"
//                           placeholder="Enter code"
//                           value={couponInput}
//                           onChange={(e) =>
//                             setCouponInput(e.target.value.toUpperCase())
//                           }
//                         />
//                         <Button
//                           onClick={handleApplyCoupon}
//                           disabled={couponLoading}
//                         >
//                           {couponLoading ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             "Apply"
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
//                         <p className="text-sm font-medium text-green-600">
//                           {appliedCoupon.code} Applied!
//                         </p>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={handleRemoveCoupon}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                   <Separator />
//                   {/* Additional Notes */}
//                   <div className="space-y-2">
//                     <Label htmlFor="additional-notes">Additional Notes</Label>
//                     <Textarea
//                       id="additional-notes"
//                       placeholder="Any special requests?"
//                       value={additionalNotes}
//                       onChange={(e) => setAdditionalNotes(e.target.value)}
//                     />
//                   </div>
//                   {/* Place Order Button */}
//                   <Button
//                     className="w-full"
//                     size="lg"
//                     onClick={handlePlaceOrder}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     ) : (
//                       "Place Order"
//                     )}
//                   </Button>
//                 </CardContent>
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, CartItem } from "@/lib/store";
import { useAuthStore } from "@/lib/store/authStore";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Check, Loader2, X } from "lucide-react";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

//const API_URL = "http://localhost:8000/api";
const API_URL = import.meta.env.VITE_API_URL;

// --- INTERFACES ---
interface MiscCharge {
  name: string;
  charge_type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: string;
}

interface AppliedCoupon {
  code: string;
  discount_percent: number;
}

interface ConfirmedOrderDetails {
  items: CartItem[];
  notes: string;
  subtotal: number;
  charges: { name: string; value: number }[];
  discount: { code: string; amount: number } | null;
  total: number;
}

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // --- STATE ---
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );
  const [couponLoading, setCouponLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] =
    useState<ConfirmedOrderDetails | null>(null);

  const axiosAuth = axios.create({ baseURL: API_URL });
  axiosAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      if (!config.headers) config.headers = new AxiosHeaders();
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  });

  // --- EFFECTS ---
  useEffect(() => {
    if (!user) setLocation("/auth");
  }, [user, setLocation]);

  useEffect(() => {
    if (orderPlaced) {
      clearCart();
    }
  }, [orderPlaced, clearCart]);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await api.get("/coupons/charges/");
        setMiscCharges(response.data);
      } catch (error) {
        console.error("Failed to fetch miscellaneous charges:", error);
        toast({
          title: "Error",
          description: "Could not fetch service charges or taxes.",
          variant: "destructive",
        });
      }
    };
    fetchCharges();
  }, []);

  // --- DYNAMIC CALCULATIONS ---
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

  if (items.length === 0 && !orderPlaced) {
    if (typeof window !== "undefined") setLocation("/menu");
    return null;
  }

  // --- HANDLERS ---
  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    setCouponLoading(true);
    try {
      const response = await axiosAuth.post("/coupons/validate/", {
        code: couponInput,
      });
      setAppliedCoupon(response.data);
      toast({
        title: "Coupon Applied!",
        description: `${response.data.discount_percent}% off your order.`,
      });
    } catch (error: any) {
      toast({
        title: "Coupon Error",
        description: error.response?.data?.error || "Invalid coupon code.",
        variant: "destructive",
      });
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    toast({ title: "Coupon removed." });
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    const orderPayload = {
      coupon_code: appliedCoupon?.code,
      additional_notes: additionalNotes,
      items: items.map((item) => ({
        menu_item_id: parseInt(item.id, 10),
        quantity: item.quantity,
        customizations: item.customizations || [],
      })),
    };
    try {
      const response = await axiosAuth.post("/orders/", orderPayload);
      setNewOrderId(response.data.order_id);
      setConfirmedOrder({
        items,
        notes: additionalNotes,
        subtotal,
        charges: calculatedCharges.map((c) => ({
          name: c.name,
          value: c.amount,
        })),
        discount: appliedCoupon
          ? { code: appliedCoupon.code, amount: discountAmount }
          : null,
        total,
      });
      setOrderPlaced(true);
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was a problem placing your order.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- CONFIRMATION SCREEN ---
  if (orderPlaced && confirmedOrder) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <Card className="max-w-lg w-full mx-4">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="font-serif text-3xl font-bold mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-muted-foreground">
                  Your Order ID: {newOrderId}
                </p>
              </div>
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Final Receipt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {confirmedOrder.items.map((item) => (
                      <div
                        key={`${item.id}-${JSON.stringify(
                          item.customizations
                        )}`}
                        className="flex gap-4 pb-3 border-b last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.name} (x{item.quantity})
                          </p>
                          {item.customizations &&
                            item.customizations.length > 0 && (
                              <p className="text-xs text-muted-foreground italic">
                                +{" "}
                                {item.customizations
                                  .map((c) => c.selection)
                                  .join(", ")}
                              </p>
                            )}
                        </div>
                        <span className="font-semibold">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p>${confirmedOrder.subtotal.toFixed(2)}</p>
                    </div>
                    {confirmedOrder.charges.map((charge) => (
                      <div key={charge.name} className="flex justify-between">
                        <p className="text-muted-foreground">{charge.name}</p>
                        <p>${charge.value.toFixed(2)}</p>
                      </div>
                    ))}
                    {confirmedOrder.discount && (
                      <div className="flex justify-between text-green-600">
                        <p>Discount ({confirmedOrder.discount.code})</p>
                        <p>-${confirmedOrder.discount.amount.toFixed(2)}</p>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                      <p>Grand Total</p>
                      <p>${confirmedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                  {confirmedOrder.notes && (
                    <div className="pt-4">
                      <p className="font-semibold">Your Notes:</p>
                      <p className="text-sm text-muted-foreground italic">
                        "{confirmedOrder.notes}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="space-y-3 pt-4">
                <Button className="w-full" onClick={() => setLocation("/")}>
                  Grab a Bite again
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation("/auth?tab=orders")}
                >
                  View My Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // --- MAIN CHECKOUT PAGE ---
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${JSON.stringify(
                          item.customizations
                        )}`}
                        className="flex items-center gap-4 pb-3 border-b last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          {item.customizations &&
                            item.customizations.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                {item.customizations
                                  .map((c) => c.selection)
                                  .join(", ")}
                              </p>
                            )}
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
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
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="coupon-code">Coupon Code</Label>
                    {!appliedCoupon ? (
                      <div className="flex space-x-2">
                        <Input
                          id="coupon-code"
                          placeholder="Enter code"
                          value={couponInput}
                          onChange={(e) =>
                            setCouponInput(e.target.value.toUpperCase())
                          }
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                        >
                          {couponLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Apply"
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
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Additional Notes</Label>
                    <Textarea
                      id="additional-notes"
                      placeholder="Any special requests?"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
