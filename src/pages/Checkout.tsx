// import api from "@/lib/api";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useCartStore, CartItem } from "@/lib/store";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useLocation } from "wouter";
// import { useState, useEffect } from "react";
// import { Check, Loader2, X, MapPin, Package } from "lucide-react";
// import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
// import { useToast } from "@/hooks/use-toast";
// import { Separator } from "@/components/ui/separator";
// import { AuthorizeNetPayment } from "@/components/AuthorizeNetPayment";

// const API_URL = import.meta.env.VITE_API_URL;

// // --- INTERFACES ---
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
//   deliveryInfo?: {
//     type: "pickup" | "delivery";
//     deliveryFee: number;
//     distance?: number | null;
//     userLocation?: { lat: number; lon: number } | null;
//   };
// }

// export default function Checkout() {
//   const { items, clearCart } = useCartStore();
//   const { user } = useAuthStore();
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();

//   // --- STATE ---
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [additionalNotes, setAdditionalNotes] = useState("");
//   const [newOrderId, setNewOrderId] = useState<string | null>(null);
//   const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
//   const [couponInput, setCouponInput] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
//     null,
//   );
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [confirmedOrder, setConfirmedOrder] =
//     useState<ConfirmedOrderDetails | null>(null);

//   const [deliveryInfo, setDeliveryInfo] = useState<{
//     type: "pickup" | "delivery";
//     deliveryFee: number;
//     distance?: number | null;
//     userLocation?: { lat: number; lon: number } | null;
//   } | null>(null);

//   const [showPayment, setShowPayment] = useState(false);

//   const axiosAuth = axios.create({ baseURL: API_URL });
//   axiosAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     const token = useAuthStore.getState().accessToken;
//     if (token) {
//       if (!config.headers) config.headers = new AxiosHeaders();
//       config.headers.set("Authorization", `Bearer ${token}`);
//     }
//     return config;
//   });

//   // --- EFFECTS ---
//   useEffect(() => {
//     if (!user) setLocation("/auth");
//   }, [user, setLocation]);

//   useEffect(() => {
//     if (orderPlaced) {
//       clearCart();
//     }
//   }, [orderPlaced, clearCart]);

//   useEffect(() => {
//     const fetchCharges = async () => {
//       try {
//         const response = await api.get("/coupons/charges/");
//         setMiscCharges(response.data);
//       } catch (error) {
//         console.error("Failed to fetch miscellaneous charges:", error);
//         toast({
//           title: "Error",
//           description: "Could not fetch service charges or taxes.",
//           variant: "destructive",
//         });
//       }
//     };
//     fetchCharges();
//   }, [toast]);

//   // Retrieve delivery info from session
//   useEffect(() => {
//     const storedDeliveryInfo = sessionStorage.getItem("deliveryOption");
//     if (storedDeliveryInfo) {
//       setDeliveryInfo(JSON.parse(storedDeliveryInfo));
//     }
//   }, []);

//   // --- DYNAMIC CALCULATIONS ---
//   const subtotal = items.reduce(
//     (sum, item) => sum + parseFloat(item.price) * item.quantity,
//     0,
//   );
//   const calculatedCharges = miscCharges.map((charge) => {
//     const value = parseFloat(charge.value);
//     const amount =
//       charge.charge_type === "PERCENTAGE" ? (subtotal * value) / 100 : value;
//     return { name: charge.name, amount };
//   });
//   const totalCharges = calculatedCharges.reduce(
//     (sum, charge) => sum + charge.amount,
//     0,
//   );
//   const discountAmount = appliedCoupon
//     ? (subtotal * appliedCoupon.discount_percent) / 100
//     : 0;
//   const deliveryFee = deliveryInfo?.deliveryFee || 0;
//   const total = subtotal + totalCharges - discountAmount + deliveryFee;

//   if (items.length === 0 && !orderPlaced) {
//     if (typeof window !== "undefined") setLocation("/menu");
//     return null;
//   }

//   // --- HANDLERS ---
//   const handleApplyCoupon = async () => {
//     if (!couponInput.trim()) return;
//     setCouponLoading(true);
//     try {
//       const response = await axiosAuth.post("/coupons/validate/", {
//         code: couponInput.toUpperCase(),
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
//       setCouponInput("");
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput("");
//     toast({ title: "Coupon removed." });
//   };

//   // ✅ UPDATED: Handle multi-payment methods from AuthorizeNetPayment
//   const handlePaymentSuccess = (paymentData: {
//     nonce?: string;
//     method: string;
//     token?: string;
//   }) => {
//     console.log("Payment success:", paymentData);

//     // For cards - use nonce directly
//     if (paymentData.method === "card" && paymentData.nonce) {
//       handlePlaceOrder(paymentData.nonce);
//       return;
//     }

//     // For other methods - send payment data to backend
//     const orderPayload = {
//       coupon_code: appliedCoupon?.code || "",
//       additional_notes: additionalNotes,
//       delivery_type: deliveryInfo?.type || "pickup",
//       delivery_fee: deliveryInfo?.deliveryFee || 0,
//       delivery_distance: deliveryInfo?.distance || null,
//       delivery_location: deliveryInfo?.userLocation || null,
//       payment_method: paymentData.method, // 'paypal', 'apple-pay', 'google-pay'
//       payment_token: paymentData.token || paymentData.nonce, // token or nonce
//       items: items.map((item) => ({
//         menu_item_id: parseInt(item.id, 10),
//         quantity: item.quantity,
//         customizations: item.customizations || [],
//       })),
//     };

//     // Call backend with payment method info
//     placeOrderWithPayment(orderPayload);
//   };

//   const handlePaymentError = (error: string) => {
//     console.error("Payment error:", error);
//     toast({
//       title: "Payment Failed",
//       description: error,
//       variant: "destructive",
//     });
//     setShowPayment(false); // Allow retry
//   };

//   const placeOrderWithPayment = async (payload: any) => {
//     setIsLoading(true);
//     try {
//       const response = await axiosAuth.post("/orders/", payload);
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
//         deliveryInfo: deliveryInfo || undefined,
//       });
//       setOrderPlaced(true);
//       sessionStorage.removeItem("deliveryOption");
//       toast({
//         title: "Order Placed!",
//         description: `Order #${response.data.order_id} confirmed!`,
//       });
//     } catch (error: any) {
//       toast({
//         title: "Order Failed",
//         description: error.response?.data?.error || "Order placement failed.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePlaceOrder = async (nonce?: string) => {
//     // Legacy card-only order (still works)
//     setIsLoading(true);
//     const orderPayload = {
//       coupon_code: appliedCoupon?.code || "",
//       additional_notes: additionalNotes,
//       delivery_type: deliveryInfo?.type || "pickup",
//       delivery_fee: deliveryInfo?.deliveryFee || 0,
//       delivery_distance: deliveryInfo?.distance || null,
//       delivery_location: deliveryInfo?.userLocation || null,
//       payment_nonce: nonce,
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
//         deliveryInfo: deliveryInfo || undefined,
//       });
//       setOrderPlaced(true);
//       sessionStorage.removeItem("deliveryOption");
//       toast({
//         title: "Order Placed!",
//         description: `Order #${response.data.order_id} confirmed!`,
//       });
//     } catch (error: any) {
//       toast({
//         title: "Order Failed",
//         description:
//           error.response?.data?.payment ||
//           error.response?.data?.error ||
//           "There was a problem placing your order.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- CONFIRMATION SCREEN ---
//   if (orderPlaced && confirmedOrder) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 flex items-center justify-center py-12">
//           <Card className="max-w-2xl w-full mx-4">
//             <CardContent className="pt-8 pb-8 text-center space-y-6">
//               <div>
//                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
//                   <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
//                 </div>
//                 <h2 className="font-serif text-3xl font-bold mb-2">
//                   Order Confirmed!
//                 </h2>
//                 <p className="text-muted-foreground text-lg">
//                   Your Order ID: <strong>{newOrderId}</strong>
//                 </p>
//               </div>

//               <Card className="text-left">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4 p-6">
//                   {/* Items */}
//                   <div className="space-y-3 max-h-48 overflow-y-auto">
//                     {confirmedOrder.items.map((item) => (
//                       <div
//                         key={`${item.id}-${JSON.stringify(item.customizations)}`}
//                         className="flex gap-4 pb-3 border-b last:border-b-0 last:pb-0"
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-14 h-14 object-cover rounded-md flex-shrink-0"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium truncate">{item.name}</p>
//                           {item.customizations &&
//                             item.customizations.length > 0 && (
//                               <p className="text-xs text-muted-foreground line-clamp-2">
//                                 {item.customizations
//                                   .map((c) => c.selection)
//                                   .join(", ")}
//                               </p>
//                             )}
//                           <p className="text-xs text-muted-foreground">
//                             Qty: {item.quantity}
//                           </p>
//                         </div>
//                         <span className="font-semibold text-sm whitespace-nowrap">
//                           ${(parseFloat(item.price) * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <Separator />

//                   {/* Pricing Breakdown */}
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
//                       <span>${confirmedOrder.subtotal.toFixed(2)}</span>
//                     </div>

//                     {confirmedOrder.deliveryInfo &&
//                       confirmedOrder.deliveryInfo.deliveryFee > 0 && (
//                         <div className="flex justify-between">
//                           <span>Delivery Fee</span>
//                           <span>
//                             $
//                             {confirmedOrder.deliveryInfo.deliveryFee.toFixed(2)}
//                           </span>
//                         </div>
//                       )}

//                     {confirmedOrder.deliveryInfo?.type && (
//                       <div className="flex justify-between">
//                         <span className="flex items-center gap-1">
//                           {confirmedOrder.deliveryInfo.type === "delivery" ? (
//                             <MapPin className="h-3 w-3" />
//                           ) : (
//                             <Package className="h-3 w-3" />
//                           )}
//                           {confirmedOrder.deliveryInfo.type === "delivery"
//                             ? `Delivery (${confirmedOrder.deliveryInfo.distance?.toFixed(1) || 0} miles)`
//                             : "Pickup"}
//                         </span>
//                         <span className="capitalize font-medium">
//                           {confirmedOrder.deliveryInfo.type}
//                         </span>
//                       </div>
//                     )}

//                     {confirmedOrder.charges.map((charge) => (
//                       <div key={charge.name} className="flex justify-between">
//                         <span className="text-muted-foreground">
//                           {charge.name}
//                         </span>
//                         <span>${charge.value.toFixed(2)}</span>
//                       </div>
//                     ))}

//                     {confirmedOrder.discount && (
//                       <div className="flex justify-between text-green-600 font-medium">
//                         <span>Discount ({confirmedOrder.discount.code})</span>
//                         <span>
//                           -${confirmedOrder.discount.amount.toFixed(2)}
//                         </span>
//                       </div>
//                     )}

//                     <div className="border-t pt-3 flex justify-between font-bold text-xl">
//                       <span>Total</span>
//                       <span className="text-primary">
//                         ${confirmedOrder.total.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>

//                   {confirmedOrder.notes && (
//                     <div className="pt-4 mt-4 border-t">
//                       <p className="font-semibold mb-2">Special Notes:</p>
//                       <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-md">
//                         "{confirmedOrder.notes}"
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

//               <div className="space-y-3 pt-6">
//                 <Button
//                   className="w-full"
//                   size="lg"
//                   onClick={() => setLocation("/")}
//                 >
//                   🍔 Order More Food
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   size="lg"
//                   onClick={() => setLocation("/auth?tab=orders")}
//                 >
//                   📋 View Orders
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // --- MAIN CHECKOUT PAGE ---
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Items */}
//             <div className="lg:col-span-2 space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     Your Order ({items.length} item
//                     {items.length !== 1 ? "s" : ""})
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {items.map((item) => (
//                       <div
//                         key={`${item.id}-${JSON.stringify(item.customizations)}`}
//                         className="flex items-start gap-4 p-4 border rounded-lg"
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-20 h-20 object-cover rounded-md flex-shrink-0"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-semibold text-lg leading-tight">
//                             {item.name}
//                           </h4>
//                           {item.customizations &&
//                             item.customizations.length > 0 && (
//                               <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
//                                 {item.customizations
//                                   .map((c) => c.selection)
//                                   .join(", ")}
//                               </p>
//                             )}
//                           <p className="text-sm text-muted-foreground mt-1">
//                             Qty: {item.quantity} • $
//                             {parseFloat(item.price).toFixed(2)} each
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-lg">
//                             $
//                             {(parseFloat(item.price) * item.quantity).toFixed(
//                               2,
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Additional Notes */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Additional Notes (Optional)</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <Textarea
//                     id="additional-notes"
//                     placeholder="Any special instructions? (ex: 'Extra spicy', 'Leave at door', etc.)"
//                     value={additionalNotes}
//                     onChange={(e) => setAdditionalNotes(e.target.value)}
//                     className="min-h-[100px]"
//                     maxLength={500}
//                   />
//                   <p className="text-xs text-muted-foreground mt-2">
//                     {additionalNotes.length}/500 characters
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Order Summary & Payment */}
//             <div>
//               <Card className="sticky top-20 h-fit">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {/* Pricing */}
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between font-medium">
//                       <span>Subtotal ({items.length} items)</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>

//                     {deliveryFee > 0 && deliveryInfo && (
//                       <div className="flex justify-between p-2 bg-blue-50 rounded-lg">
//                         <span className="flex items-center gap-1 text-blue-700">
//                           <MapPin className="h-4 w-4" />
//                           Delivery ({deliveryInfo.distance?.toFixed(1) ||
//                             0}{" "}
//                           miles)
//                         </span>
//                         <span className="font-semibold text-blue-700">
//                           ${deliveryFee.toFixed(2)}
//                         </span>
//                       </div>
//                     )}

//                     {deliveryInfo?.type === "pickup" && (
//                       <div className="flex justify-between p-2 bg-green-50 rounded-lg">
//                         <span className="flex items-center gap-1 text-green-700">
//                           <Package className="h-4 w-4" />
//                           Pickup (Free)
//                         </span>
//                         <span className="font-semibold text-green-700">
//                           $0.00
//                         </span>
//                       </div>
//                     )}

//                     {calculatedCharges.map((charge) => (
//                       <div key={charge.name} className="flex justify-between">
//                         <span className="text-muted-foreground">
//                           {charge.name}
//                         </span>
//                         <span>${charge.amount.toFixed(2)}</span>
//                       </div>
//                     ))}

//                     {appliedCoupon && (
//                       <div className="flex justify-between bg-green-50 p-3 rounded-lg text-green-700 font-medium">
//                         <span>Discount ({appliedCoupon.code})</span>
//                         <span>-${discountAmount.toFixed(2)}</span>
//                       </div>
//                     )}

//                     <Separator />
//                     <div className="flex justify-between text-xl font-bold">
//                       <span>Total</span>
//                       <span className="text-2xl text-primary">
//                         ${total.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Coupon */}
//                   <div className="space-y-2">
//                     <Label htmlFor="coupon-code">Coupon Code (Optional)</Label>
//                     {!appliedCoupon ? (
//                       <div className="flex gap-2">
//                         <Input
//                           id="coupon-code"
//                           placeholder="Enter coupon code"
//                           value={couponInput}
//                           onChange={(e) =>
//                             setCouponInput(e.target.value.toUpperCase())
//                           }
//                           onKeyDown={(e) =>
//                             e.key === "Enter" && handleApplyCoupon()
//                           }
//                         />
//                         <Button
//                           onClick={handleApplyCoupon}
//                           disabled={couponLoading || !couponInput.trim()}
//                         >
//                           {couponLoading ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             "Apply"
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between p-3 bg-green-50 border rounded-lg">
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-500 rounded-full" />
//                           <span className="font-medium text-green-700">
//                             {appliedCoupon.code} Applied!
//                           </span>
//                           <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                             -{appliedCoupon.discount_percent}%
//                           </span>
//                         </div>
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

//                   {/* Payment */}
//                   {!showPayment ? (
//                     <Button
//                       className="w-full h-14 text-lg"
//                       size="lg"
//                       onClick={() => setShowPayment(true)}
//                       disabled={isLoading}
//                     >
//                       💳 Proceed to Secure Payment
//                     </Button>
//                   ) : (
//                     <AuthorizeNetPayment
//                       amount={total}
//                       onPaymentSuccess={handlePaymentSuccess}
//                       onPaymentError={handlePaymentError}
//                     />
//                   )}
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
import { Check, Loader2, X, MapPin, Package } from "lucide-react";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { AuthorizeNetPayment } from "@/components/AuthorizeNetPayment";

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
  deliveryInfo?: {
    type: "pickup" | "delivery";
    deliveryFee: number;
    distance?: number | null;
    userLocation?: { lat: number; lon: number } | null;
  };
}

interface DeliveryAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  latitude?: number | null;
  longitude?: number | null;
}


export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(null);

  // --- STATE ---
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );
  const [couponLoading, setCouponLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] =
    useState<ConfirmedOrderDetails | null>(null);

  const [deliveryInfo, setDeliveryInfo] = useState<{
    type: "pickup" | "delivery";
    deliveryFee: number;
    distance?: number | null;
    userLocation?: { lat: number; lon: number } | null;
  } | null>(null);

  const [showPayment, setShowPayment] = useState(false);

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
  }, [toast]);

  // Retrieve delivery info from session
  useEffect(() => {
    const storedDeliveryInfo = sessionStorage.getItem("deliveryOption");
    if (storedDeliveryInfo) {
      setDeliveryInfo(JSON.parse(storedDeliveryInfo));
    }
  }, []);

  useEffect(() => {
  if (deliveryInfo?.type === "delivery" && !deliveryAddress) {
    setDeliveryAddress({
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      latitude: deliveryInfo?.userLocation?.lat || null,
      longitude: deliveryInfo?.userLocation?.lon || null,
    });
  }
}, [deliveryInfo]);

  const updateAddress = (field: keyof DeliveryAddress, value: any) => {
  setDeliveryAddress((prev) =>
    prev ? { ...prev, [field]: value } : prev,
  );
};

  const isDeliveryAddressValid =
  deliveryInfo?.type !== "delivery" ||
  (deliveryAddress &&
    deliveryAddress.full_name &&
    deliveryAddress.phone &&
    deliveryAddress.address_line1 &&
    deliveryAddress.city &&
    deliveryAddress.state &&
    deliveryAddress.pincode);



  // --- DYNAMIC CALCULATIONS ---
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );
  const calculatedCharges = miscCharges.map((charge) => {
    const value = parseFloat(charge.value);
    const amount =
      charge.charge_type === "PERCENTAGE" ? (subtotal * value) / 100 : value;
    return { name: charge.name, amount };
  });
  const totalCharges = calculatedCharges.reduce(
    (sum, charge) => sum + charge.amount,
    0,
  );
  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discount_percent) / 100
    : 0;
  const deliveryFee = deliveryInfo?.deliveryFee || 0;
  const total = subtotal + totalCharges - discountAmount + deliveryFee;

  if (items.length === 0 && !orderPlaced) {
    if (typeof window !== "undefined") setLocation("/menu");
    return null;
  }

  // --- HANDLERS ---
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const response = await axiosAuth.post("/coupons/validate/", {
        code: couponInput.toUpperCase(),
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
      setCouponInput("");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    toast({ title: "Coupon removed." });
  };

  // ✅ UPDATED: Handle multi-payment methods from AuthorizeNetPayment
  const handlePaymentSuccess = (paymentData: {
    nonce?: string;
    method: string;
    token?: string;
  }) => {
    console.log("Payment success:", paymentData);

    // For cards - use nonce directly
    if (paymentData.method === "card" && paymentData.nonce) {
      handlePlaceOrder(paymentData.nonce);
      return;
    }

    // For other methods - send payment data to backend
    const orderPayload = {
      coupon_code: appliedCoupon?.code || "",
      additional_notes: additionalNotes,
      delivery_type: deliveryInfo?.type || "pickup",
      delivery_fee: deliveryInfo?.deliveryFee || 0,
      delivery_address:
  deliveryInfo?.type === "delivery"
    ? {
        ...deliveryAddress,
        latitude: deliveryAddress?.latitude ?? null,
        longitude: deliveryAddress?.longitude ?? null,
      }
    : null,
      delivery_distance: deliveryInfo?.distance || null,
      delivery_location: deliveryInfo?.userLocation || null,
      payment_method: paymentData.method, // 'paypal', 'apple-pay', 'google-pay'
      payment_token: paymentData.token || paymentData.nonce, // token or nonce
      items: items.map((item) => ({
        menu_item_id: parseInt(item.id, 10),
        quantity: item.quantity,
        customizations: item.customizations || [],
      })),
    };

    // Call backend with payment method info
    placeOrderWithPayment(orderPayload);
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
    setShowPayment(false); // Allow retry
  };

  const placeOrderWithPayment = async (payload: any) => {
    setIsLoading(true);
    try {
      const response = await axiosAuth.post("/orders/", payload);
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
        deliveryInfo: deliveryInfo || undefined,
      });
      setOrderPlaced(true);
      sessionStorage.removeItem("deliveryOption");
      toast({
        title: "Order Placed!",
        description: `Order #${response.data.order_id} confirmed!`,
      });
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.response?.data?.error || "Order placement failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = async (nonce?: string) => {
    // Legacy card-only order (still works)
    setIsLoading(true);
    const orderPayload = {
      coupon_code: appliedCoupon?.code || "",
      additional_notes: additionalNotes,
      delivery_type: deliveryInfo?.type || "pickup",
      delivery_fee: deliveryInfo?.deliveryFee || 0,
      delivery_distance: deliveryInfo?.distance || null,
      delivery_location: deliveryInfo?.userLocation || null,
      delivery_address:
  deliveryInfo?.type === "delivery"
    ? {
        ...deliveryAddress,
        latitude: deliveryAddress?.latitude ?? null,
        longitude: deliveryAddress?.longitude ?? null,
      }
    : null,
      payment_nonce: nonce,
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
        deliveryInfo: deliveryInfo || undefined,
      });
      setOrderPlaced(true);
      sessionStorage.removeItem("deliveryOption");
      toast({
        title: "Order Placed!",
        description: `Order #${response.data.order_id} confirmed!`,
      });
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description:
          error.response?.data?.payment ||
          error.response?.data?.error ||
          "There was a problem placing your order.",
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
          <Card className="max-w-2xl w-full mx-4">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="font-serif text-3xl font-bold mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your Order ID: <strong>{newOrderId}</strong>
                </p>
              </div>

              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {/* Items */}
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {confirmedOrder.items.map((item) => (
                      <div
                        key={`${item.id}-${JSON.stringify(item.customizations)}`}
                        className="flex gap-4 pb-3 border-b last:border-b-0 last:pb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          {item.customizations &&
                            item.customizations.length > 0 && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {item.customizations
                                  .map((c) => c.selection)
                                  .join(", ")}
                              </p>
                            )}
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-sm whitespace-nowrap">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${confirmedOrder.subtotal.toFixed(2)}</span>
                    </div>

                    {confirmedOrder.deliveryInfo &&
                      confirmedOrder.deliveryInfo.deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>
                            $
                            {confirmedOrder.deliveryInfo.deliveryFee.toFixed(2)}
                          </span>
                        </div>
                      )}

                    {confirmedOrder.deliveryInfo?.type && (
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          {confirmedOrder.deliveryInfo.type === "delivery" ? (
                            <MapPin className="h-3 w-3" />
                          ) : (
                            <Package className="h-3 w-3" />
                          )}
                          {confirmedOrder.deliveryInfo.type === "delivery"
                            ? `Delivery (${confirmedOrder.deliveryInfo.distance?.toFixed(1) || 0} miles)`
                            : "Pickup"}
                        </span>
                        <span className="capitalize font-medium">
                          {confirmedOrder.deliveryInfo.type}
                        </span>
                      </div>
                    )}

                    {confirmedOrder.charges.map((charge) => (
                      <div key={charge.name} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {charge.name}
                        </span>
                        <span>${charge.value.toFixed(2)}</span>
                      </div>
                    ))}

                    {confirmedOrder.discount && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount ({confirmedOrder.discount.code})</span>
                        <span>
                          -${confirmedOrder.discount.amount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3 flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span className="text-primary">
                        ${confirmedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {confirmedOrder.notes && (
                    <div className="pt-4 mt-4 border-t">
                      <p className="font-semibold mb-2">Special Notes:</p>
                      <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-md">
                        "{confirmedOrder.notes}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-3 pt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation("/")}
                >
                  🍔 Order More Food
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation("/auth?tab=orders")}
                >
                  📋 View Orders
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
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Your Order ({items.length} item
                    {items.length !== 1 ? "s" : ""})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${JSON.stringify(item.customizations)}`}
                        className="flex items-start gap-4 p-4 border rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg leading-tight">
                            {item.name}
                          </h4>
                          {item.customizations &&
                            item.customizations.length > 0 && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.customizations
                                  .map((c) => c.selection)
                                  .join(", ")}
                              </p>
                            )}
                          <p className="text-sm text-muted-foreground mt-1">
                            Qty: {item.quantity} • $
                            {parseFloat(item.price).toFixed(2)} each
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            $
                            {(parseFloat(item.price) * item.quantity).toFixed(
                              2,
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="additional-notes"
                    placeholder="Any special instructions? (ex: 'Extra spicy', 'Leave at door', etc.)"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="min-h-[100px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {additionalNotes.length}/500 characters
                  </p>
                </CardContent>
              </Card>
              {deliveryInfo?.type === "delivery" && deliveryAddress && (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        Delivery Address
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name</Label>
          <Input
            value={deliveryAddress.full_name}
            onChange={(e) =>
              updateAddress("full_name", e.target.value)
            }
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            value={deliveryAddress.phone}
            onChange={(e) =>
              updateAddress("phone", e.target.value)
            }
          />
        </div>
      </div>

      <div>
        <Label>Address Line 1</Label>
        <Input
          value={deliveryAddress.address_line1}
          onChange={(e) =>
            updateAddress("address_line1", e.target.value)
          }
        />
      </div>

      <div>
        <Label>Address Line 2</Label>
        <Input
          value={deliveryAddress.address_line2}
          onChange={(e) =>
            updateAddress("address_line2", e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>City</Label>
          <Input
            value={deliveryAddress.city}
            onChange={(e) => updateAddress("city", e.target.value)}
          />
        </div>

        <div>
          <Label>State</Label>
          <Input
            value={deliveryAddress.state}
            onChange={(e) => updateAddress("state", e.target.value)}
          />
        </div>

        <div>
          <Label>Pincode</Label>
          <Input
            value={deliveryAddress.pincode}
            onChange={(e) =>
              updateAddress("pincode", e.target.value)
            }
          />
        </div>
      </div>

      <div>
        <Label>Landmark</Label>
        <Input
          value={deliveryAddress.landmark}
          onChange={(e) =>
            updateAddress("landmark", e.target.value)
          }
        />
      </div>

      {/* Coordinates Display */}
      <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
        📍 Coordinates:{" "}
        {deliveryAddress.latitude}, {deliveryAddress.longitude}
      </div>
    </CardContent>
  </Card>
)}

            </div>

            {/* Order Summary & Payment */}
            <div>
              <Card className="sticky top-20 h-fit">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between font-medium">
                      <span>Subtotal ({items.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {deliveryFee > 0 && deliveryInfo && (
                      <div className="flex justify-between p-2 bg-blue-50 rounded-lg">
                        <span className="flex items-center gap-1 text-blue-700">
                          <MapPin className="h-4 w-4" />
                          Delivery ({deliveryInfo.distance?.toFixed(1) ||
                            0}{" "}
                          miles)
                        </span>
                        <span className="font-semibold text-blue-700">
                          ${deliveryFee.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {deliveryInfo?.type === "pickup" && (
                      <div className="flex justify-between p-2 bg-green-50 rounded-lg">
                        <span className="flex items-center gap-1 text-green-700">
                          <Package className="h-4 w-4" />
                          Pickup (Free)
                        </span>
                        <span className="font-semibold text-green-700">
                          $0.00
                        </span>
                      </div>
                    )}

                    {calculatedCharges.map((charge) => (
                      <div key={charge.name} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {charge.name}
                        </span>
                        <span>${charge.amount.toFixed(2)}</span>
                      </div>
                    ))}

                    {appliedCoupon && (
                      <div className="flex justify-between bg-green-50 p-3 rounded-lg text-green-700 font-medium">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-2xl text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="space-y-2">
                    <Label htmlFor="coupon-code">Coupon Code (Optional)</Label>
                    {!appliedCoupon ? (
                      <div className="flex gap-2">
                        <Input
                          id="coupon-code"
                          placeholder="Enter coupon code"
                          value={couponInput}
                          onChange={(e) =>
                            setCouponInput(e.target.value.toUpperCase())
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !couponInput.trim()}
                        >
                          {couponLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-green-50 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="font-medium text-green-700">
                            {appliedCoupon.code} Applied!
                          </span>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            -{appliedCoupon.discount_percent}%
                          </span>
                        </div>
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

                  {/* Payment */}
                  {!showPayment ? (
                    <Button
                      className="w-full h-14 text-lg"
                      size="lg"
                     onClick={() => setShowPayment(true)}
  disabled={isLoading || !isDeliveryAddressValid}
                    >
                      💳 Proceed to Secure Payment
                    </Button>
                  ) : (
                    <AuthorizeNetPayment
                      amount={total}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                    />
                  )}
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

