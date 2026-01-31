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
// import { useState, useEffect, useMemo } from "react";
// import { Check, Loader2, X, MapPin, Package } from "lucide-react";
// import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
// import { useToast } from "@/hooks/use-toast";
// import { Separator } from "@/components/ui/separator";
// import { AuthorizeNetPayment } from "@/components/AuthorizeNetPayment";
// import MapAddressPicker from "@/components/MapAddressPicker";

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

// interface DeliveryAddress {
//   full_name: string;
//   phone: string;
//   address_line: string;
//   landmark?: string;
//   zipcode: string;
//   latitude?: number | null;
//   longitude?: number | null;
// }

// export default function Checkout() {
//   const { items, clearCart } = useCartStore();
//   const { user, isAuthenticated } = useAuthStore();
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();
//   // const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(null);
//   const [deliveryAddress, setDeliveryAddress] =
//     useState<DeliveryAddress | null>(() => {
//       const saved = localStorage.getItem("saved_delivery_address");
//       return saved ? JSON.parse(saved) : null;
//     });

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
//   const axiosAuth = useMemo(() => {
//     const instance = axios.create({ baseURL: API_URL });

//     instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//       const token = useAuthStore.getState().accessToken;
//       if (token) {
//         if (!config.headers) config.headers = new AxiosHeaders();
//         config.headers.set("Authorization", `Bearer ${token}`);
//       }
//       return config;
//     });

//     return instance;
//   }, []);

//   // --- EFFECTS ---
//   useEffect(() => {
//     if (!user) setLocation("/auth");
//   }, [user, setLocation]);
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Assuming your api/axiosAuth is set up to handle the token
//         const response = await axiosAuth.get("/auth/profile/");
//       } catch (error) {
//         console.error("Failed to sync profile data:", error);
//       }
//     };

//     if (isAuthenticated) {
//       fetchProfile();
//     }
//   }, [isAuthenticated, axiosAuth]);
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
//   const updateAddress = (field: keyof DeliveryAddress, value: string) => {
//     setDeliveryAddress((prev) => (prev ? { ...prev, [field]: value } : null));
//   };

//   // 2. Combined Sync Logic
//   useEffect(() => {
//     // If delivery is selected but no address state exists, create it
//     if (deliveryInfo?.type === "delivery" && !deliveryAddress) {
//       const initialAddress: DeliveryAddress = {
//         full_name: user?.name || "",
//         phone: user?.phone || "",
//         address_line: "",
//         landmark: "",
//         zipcode: "",
//         latitude: deliveryInfo?.userLocation?.lat || null,
//         longitude: deliveryInfo?.userLocation?.lon || null,
//       };
//       setDeliveryAddress(initialAddress);
//     }
//   }, [deliveryInfo, user, !!deliveryAddress]);

//   // 3. Keep localStorage in sync
//   useEffect(() => {
//     if (
//       deliveryAddress &&
//       deliveryAddress.full_name &&
//       deliveryAddress.phone &&
//       deliveryAddress.address_line
//     ) {
//       localStorage.setItem(
//         "saved_delivery_address",
//         JSON.stringify(deliveryAddress),
//       );
//     }
//   }, [deliveryAddress]);

//   const isDeliveryAddressValid =
//     deliveryInfo?.type !== "delivery" ||
//     (deliveryAddress &&
//       deliveryAddress.full_name &&
//       deliveryAddress.phone &&
//       deliveryAddress.address_line &&
//       deliveryAddress.zipcode);

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

//   const roundDistance = (distance?: number | null) => {
//     if (distance == null) return null;
//     return Number(distance.toFixed(2)); // 8 digits after decimal
//   };

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
//       delivery_address:
//         deliveryInfo?.type === "delivery"
//           ? {
//               ...deliveryAddress,
//               latitude: deliveryAddress?.latitude ?? null,
//               longitude: deliveryAddress?.longitude ?? null,
//             }
//           : null,
//       delivery_distance: roundDistance(deliveryInfo?.distance) || null,
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
//       delivery_distance: roundDistance(deliveryInfo?.distance) || null,
//       delivery_location: deliveryInfo?.userLocation || null,
//       delivery_address:
//         deliveryInfo?.type === "delivery"
//           ? {
//               ...deliveryAddress,
//               latitude: deliveryAddress?.latitude ?? null,
//               longitude: deliveryAddress?.longitude ?? null,
//             }
//           : null,
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

//               {deliveryInfo?.type === "delivery" && deliveryAddress && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <MapPin className="h-5 w-5" />
//                       Delivery Address
//                     </CardTitle>
//                   </CardHeader>

//                   <CardContent className="space-y-5">
//                     {/* 🗺️ MAP ADDRESS PICKER */}
//                     <MapAddressPicker
//                       initialLocation={{
//                         lat: deliveryAddress.latitude ?? 42.7332227, // chicago fallback
//                         lon: deliveryAddress.longitude ?? -88.8010003,
//                       }}
//                       onSelectLocation={({ lat, lon, address, distance }) => {
//                         // Update delivery address coordinates
//                         setDeliveryAddress((prev) =>
//                           prev
//                             ? {
//                                 ...prev,
//                                 latitude: lat,
//                                 longitude: lon,
//                                 address_line: address || prev.address_line,
//                               }
//                             : null,
//                         );

//                         // Update delivery distance (used for fee calculation)
//                         setDeliveryInfo((prev) =>
//                           prev
//                             ? {
//                                 ...prev,
//                                 distance: distance ?? prev.distance,
//                               }
//                             : null,
//                         );
//                       }}
//                     />

//                     {/* 👤 NAME + PHONE */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label>Full Name</Label>
//                         <Input
//                           type="text"
//                           placeholder="Your Name"
//                           value={deliveryAddress.full_name}
//                           onChange={(e) =>
//                             updateAddress("full_name", e.target.value)
//                           }
//                         />
//                       </div>

//                       <div>
//                         <Label>Phone</Label>
//                         <Input
//                           type="tel"
//                           placeholder="Phone Number"
//                           value={deliveryAddress.phone}
//                           onChange={(e) =>
//                             updateAddress("phone", e.target.value)
//                           }
//                         />
//                       </div>
//                     </div>

//                     {/* 📍 ADDRESS */}
//                     <div>
//                       <Label>Address Line</Label>
//                       <Input
//                         type="text"
//                         placeholder="House / Street / Area"
//                         value={deliveryAddress.address_line}
//                         onChange={(e) =>
//                           updateAddress("address_line", e.target.value)
//                         }
//                       />
//                     </div>

//                     {/* 🏷️ LANDMARK */}
//                     <div>
//                       <Label>Landmark</Label>
//                       <Input
//                         type="text"
//                         placeholder="Nearby landmark (optional)"
//                         value={deliveryAddress.landmark}
//                         onChange={(e) =>
//                           updateAddress("landmark", e.target.value)
//                         }
//                       />
//                     </div>

//                     {/* 📮 ZIPCODE */}
//                     <div>
//                       <Label>Zipcode</Label>
//                       <Input
//                         type="text"
//                         placeholder="Zipcode"
//                         inputMode="numeric"
//                         maxLength={10}
//                         value={deliveryAddress.zipcode}
//                         onChange={(e) =>
//                           updateAddress("zipcode", e.target.value)
//                         }
//                       />
//                     </div>

//                     {/* 📌 COORDINATES INFO */}
//                     <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
//                       📍 Coordinates:{" "}
//                       <span className="font-medium">
//                         {deliveryAddress.latitude ?? "N/A"},{" "}
//                         {deliveryAddress.longitude ?? "N/A"}
//                       </span>
//                       {deliveryInfo?.distance != null && (
//                         <>
//                           <br />
//                           🚗 Distance:{" "}
//                           <span className="font-medium">
//                             {deliveryInfo.distance.toFixed(2)} miles
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

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
//                       disabled={isLoading || !isDeliveryAddressValid}
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
import { useState, useEffect, useMemo } from "react";
import { Check, Loader2, X, MapPin, Package, AlertCircle } from "lucide-react";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { AuthorizeNetPayment } from "@/components/AuthorizeNetPayment";
import MapAddressPicker from "@/components/MapAddressPicker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const API_URL = import.meta.env.VITE_API_URL;

/* -------------------------------------------------------------------------- */
/* CONFIG CONSTANTS                              */
/* -------------------------------------------------------------------------- */

// 📍 REPLACE THESE WITH YOUR ACTUAL RESTAURANT COORDINATES
const RESTAURANT_LOCATION = {
  lat: 41.7332227,
  lon: -87.8010003,
};

const MAX_DELIVERY_RADIUS_MILES = 5;
const FREE_DELIVERY_RADIUS_MILES = 2;
const STANDARD_DELIVERY_FEE = 4.99;

/* -------------------------------------------------------------------------- */
/* UTILS                                    */
/* -------------------------------------------------------------------------- */

function haversineMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* -------------------------------------------------------------------------- */
/* INTERFACES                                 */
/* -------------------------------------------------------------------------- */

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
  address_line: string;
  landmark?: string;
  zipcode: string;
  latitude?: number | null;
  longitude?: number | null;
}

/* -------------------------------------------------------------------------- */
/* COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // --- STATE ---
  const [deliveryAddress, setDeliveryAddress] =
    useState<DeliveryAddress | null>(() => {
      const saved = localStorage.getItem("saved_delivery_address");
      return saved ? JSON.parse(saved) : null;
    });

  const [deliveryInfo, setDeliveryInfo] = useState<{
    type: "pickup" | "delivery";
    deliveryFee: number;
    distance?: number | null;
    userLocation?: { lat: number; lon: number } | null;
  } | null>(null);

  const [deliveryError, setDeliveryError] = useState<string | null>(null);

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
  const [showPayment, setShowPayment] = useState(false);

  // --- AXIOS INSTANCE ---
  const axiosAuth = useMemo(() => {
    const instance = axios.create({ baseURL: API_URL });
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        if (!config.headers) config.headers = new AxiosHeaders();
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    });
    return instance;
  }, []);

  // --- INITIALIZATION EFFECTS ---

  useEffect(() => {
    if (!user) setLocation("/auth");
  }, [user, setLocation]);

  useEffect(() => {
    if (user) {
      axiosAuth.get("/auth/profile/").catch(console.error);
    }
  }, [user, axiosAuth]);

  useEffect(() => {
    if (orderPlaced) clearCart();
  }, [orderPlaced, clearCart]);

  // Fetch Service Charges
  useEffect(() => {
    api
      .get("/coupons/charges/")
      .then((res) => setMiscCharges(res.data))
      .catch(() =>
        toast({
          title: "Error",
          description: "Could not fetch charges",
          variant: "destructive",
        }),
      );
  }, [toast]);

  // Load Intent from Session (Pickup vs Delivery)
  useEffect(() => {
    const storedDeliveryInfo = sessionStorage.getItem("deliveryOption");
    if (storedDeliveryInfo) {
      const parsed = JSON.parse(storedDeliveryInfo);
      setDeliveryInfo((prev) => ({
        ...parsed,
        // Reset these on fresh load to ensure recalculation happens via map
        deliveryFee: prev?.deliveryFee || 0,
        distance: prev?.distance || null,
      }));
    }
  }, []);

  // Initialize Address State if Empty
  useEffect(() => {
    if (deliveryInfo?.type === "delivery" && !deliveryAddress) {
      setDeliveryAddress({
        full_name: user?.name || "",
        phone: user?.phone || "",
        address_line: "",
        landmark: "",
        zipcode: "",
        latitude: null,
        longitude: null,
      });
    }
  }, [deliveryInfo, user]);

  // Sync Address to LocalStorage
  useEffect(() => {
    if (deliveryAddress?.full_name && deliveryAddress?.address_line) {
      localStorage.setItem(
        "saved_delivery_address",
        JSON.stringify(deliveryAddress),
      );
    }
  }, [deliveryAddress]);

  // --- CALCULATIONS ---

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

  const currentDeliveryFee = deliveryInfo?.deliveryFee || 0;

  const total = subtotal + totalCharges - discountAmount + currentDeliveryFee;

  const isDeliveryAddressValid =
    deliveryInfo?.type !== "delivery" ||
    (!!deliveryAddress &&
      !!deliveryAddress.full_name &&
      !!deliveryAddress.phone &&
      !!deliveryAddress.address_line &&
      !!deliveryAddress.zipcode &&
      !!deliveryAddress.latitude && // Must have picked location
      deliveryError === null); // Must be in range

  // --- HANDLERS ---

  const updateAddress = (field: keyof DeliveryAddress, value: string) => {
    setDeliveryAddress((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleMapLocationSelect = (
    // lat,
    // lon,
    // address,
    data: { lat: number; lon: number; address?: string }, //: {
  ) =>
    // lat: number;
    // lon: number;
    // address?: string;
    //})
    {
      // 1. Calculate Distance
      const dist = haversineMiles(
        RESTAURANT_LOCATION.lat,
        RESTAURANT_LOCATION.lon,
        data.lat,
        data.lon,
      );

      // 2. Determine Fee & Validity based on Distance
      let fee = 0;
      let error = null;

      if (dist > MAX_DELIVERY_RADIUS_MILES) {
        error = `We only deliver within ${MAX_DELIVERY_RADIUS_MILES} miles. You are ${dist.toFixed(2)} miles away.`;
      } else if (dist <= FREE_DELIVERY_RADIUS_MILES) {
        fee = 0;
      } else {
        fee = STANDARD_DELIVERY_FEE;
      }

      // 3. Update State
      setDeliveryError(error);
      setDeliveryInfo((prev) =>
        prev
          ? {
              ...prev,
              distance: dist,
              deliveryFee: fee,
              userLocation: { lat: data.lat, lon: data.lon },
            }
          : null,
      );

      setDeliveryAddress((prev) =>
        prev
          ? {
              ...prev,
              latitude: data.lat,
              longitude: data.lon,
              address_line: data.address || prev.address_line,
            }
          : null,
      );
    };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const res = await axiosAuth.post("/coupons/validate/", {
        code: couponInput.toUpperCase(),
      });
      setAppliedCoupon(res.data);
      toast({
        title: "Coupon Applied!",
        description: `${res.data.discount_percent}% off.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Invalid coupon.",
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
    toast({ title: "Coupon removed." });
  };

  const handlePaymentSuccess = (paymentData: {
    nonce?: string;
    method: string;
    token?: string;
  }) => {
    const orderPayload = {
      coupon_code: appliedCoupon?.code || "",
      additional_notes: additionalNotes,
      delivery_type: deliveryInfo?.type || "pickup",
      // IMPORTANT: Send the calculated fee and distance
      delivery_fee: deliveryInfo?.deliveryFee || 0,
      delivery_distance: deliveryInfo?.distance
        ? Number(deliveryInfo.distance.toFixed(2))
        : null,
      delivery_location: deliveryInfo?.userLocation || null,
      delivery_address:
        deliveryInfo?.type === "delivery"
          ? {
              ...deliveryAddress,
              latitude: deliveryAddress?.latitude ?? null,
              longitude: deliveryAddress?.longitude ?? null,
            }
          : null,
      payment_method: paymentData.method,
      payment_token: paymentData.token || paymentData.nonce,
      payment_nonce: paymentData.nonce, // For backward compatibility if needed
      items: items.map((item) => ({
        menu_item_id: parseInt(item.id, 10),
        quantity: item.quantity,
        customizations: item.customizations || [],
      })),
    };

    placeOrder(orderPayload);
  };

  const placeOrder = async (payload: any) => {
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
        title: "Success!",
        description: `Order #${response.data.order_id} confirmed!`,
      });
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.response?.data?.error || "Could not place order.",
        variant: "destructive",
      });
      setShowPayment(false); // Reset to allow retry
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
    setShowPayment(false);
  };

  // --- RENDERING ---

  if (items.length === 0 && !orderPlaced) {
    if (typeof window !== "undefined") setLocation("/menu");
    return null;
  }

  // 1. CONFIRMATION SCREEN
  if (orderPlaced && confirmedOrder) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <Card className="max-w-2xl w-full mx-4">
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-2">
                Order Confirmed!
              </h2>
              <p className="text-muted-foreground text-lg">
                Order ID: <strong>{newOrderId}</strong>
              </p>

              <Card className="text-left bg-muted/20">
                <CardContent className="space-y-4 p-6">
                  {/* CONFIRMATION ITEMS LIST */}
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {confirmedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  {/* CONFIRMATION TOTALS */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${confirmedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {confirmedOrder.charges.map((c) => (
                      <div
                        key={c.name}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>{c.name}</span>
                        <span>${c.value.toFixed(2)}</span>
                      </div>
                    ))}
                    {confirmedOrder.deliveryInfo?.deliveryFee! > 0 && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>
                          ${confirmedOrder.deliveryInfo?.deliveryFee.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total Paid</span>
                      <span>${confirmedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3 pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setLocation("/")}
                >
                  Order More Food
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation("/auth?tab=orders")}
                >
                  View Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. MAIN CHECKOUT FORM
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: ITEMS & ADDRESS */}
            <div className="lg:col-span-2 space-y-6">
              {/* ORDER ITEMS CARD */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Order ({items.length} items)</CardTitle>
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
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} • $
                            {parseFloat(item.price).toFixed(2)}
                          </p>
                          {item.customizations?.length ? (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.customizations
                                .map((c) => c.selection)
                                .join(", ")}
                            </p>
                          ) : null}
                        </div>
                        <div className="font-bold">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* DELIVERY ADDRESS FORM */}
              {deliveryInfo?.type === "delivery" && deliveryAddress && (
                <Card className={deliveryError ? "border-red-500" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" /> Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* ERROR ALERT */}
                    {deliveryError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Out of Delivery Range</AlertTitle>
                        <AlertDescription>{deliveryError}</AlertDescription>
                      </Alert>
                    )}

                    {/* MAP */}
                    <div className="space-y-2">
                      <Label>Pin your location to calculate delivery fee</Label>
                      <MapAddressPicker
                        initialLocation={{
                          lat:
                            deliveryAddress.latitude ?? RESTAURANT_LOCATION.lat,
                          lon:
                            deliveryAddress.longitude ??
                            RESTAURANT_LOCATION.lon,
                        }}
                        onSelectLocation={handleMapLocationSelect}
                      />
                    </div>

                    {/* FIELDS */}
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
                      <Label>Address Line</Label>
                      <Input
                        value={deliveryAddress.address_line}
                        onChange={(e) =>
                          updateAddress("address_line", e.target.value)
                        }
                        placeholder="St #, Apt, Floor"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Zipcode</Label>
                        <Input
                          value={deliveryAddress.zipcode}
                          onChange={(e) =>
                            updateAddress("zipcode", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Landmark (Optional)</Label>
                        <Input
                          value={deliveryAddress.landmark}
                          onChange={(e) =>
                            updateAddress("landmark", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* DYNAMIC INFO BOX */}
                    {!deliveryError && deliveryInfo.distance !== null && (
                      <div
                        className={`text-sm p-3 rounded-lg border ${deliveryInfo.deliveryFee === 0 ? "bg-green-50 border-green-200 text-green-800" : "bg-blue-50 border-blue-200 text-blue-800"}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            🚗 Distance:{" "}
                            <strong>
                              {deliveryInfo.distance?.toFixed(2)} miles
                            </strong>
                          </span>
                          <span className="font-bold">
                            {deliveryInfo.deliveryFee === 0
                              ? "FREE Delivery Applied!"
                              : `Delivery Fee: $${deliveryInfo.deliveryFee}`}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* NOTES */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Allergies, gate codes, etc."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    maxLength={500}
                  />
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: SUMMARY & PAYMENT */}
            <div>
              <Card className="sticky top-20 h-fit">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* BREAKDOWN */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {/* DELIVERY FEE DISPLAY */}
                    {deliveryInfo?.type === "delivery" && (
                      <div className="flex justify-between">
                        <span>
                          Delivery{" "}
                          {deliveryInfo.distance
                            ? `(${deliveryInfo.distance.toFixed(1)}mi)`
                            : ""}
                        </span>
                        <span>
                          {currentDeliveryFee === 0
                            ? "FREE"
                            : `$${currentDeliveryFee.toFixed(2)}`}
                        </span>
                      </div>
                    )}

                    {calculatedCharges.map((c) => (
                      <div
                        key={c.name}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>{c.name}</span>
                        <span>${c.amount.toFixed(2)}</span>
                      </div>
                    ))}

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <Separator className="my-2" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* COUPON INPUT */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon Code"
                      value={couponInput}
                      onChange={(e) =>
                        setCouponInput(e.target.value.toUpperCase())
                      }
                      disabled={!!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <Button
                        variant="destructive"
                        onClick={handleRemoveCoupon}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading}
                      >
                        Apply
                      </Button>
                    )}
                  </div>

                  <Separator />

                  {/* ACTION BUTTON */}
                  {!showPayment ? (
                    <Button
                      className="w-full h-14 text-lg font-bold"
                      size="lg"
                      onClick={() => setShowPayment(true)}
                      disabled={isLoading || !isDeliveryAddressValid}
                    >
                      {deliveryError
                        ? "🚫 Address Too Far"
                        : `Pay $${total.toFixed(2)}`}
                    </Button>
                  ) : (
                    <div className="animate-in fade-in zoom-in duration-300">
                      <AuthorizeNetPayment
                        amount={total}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                      />
                      <Button
                        variant="ghost"
                        className="w-full mt-2"
                        onClick={() => setShowPayment(false)}
                      >
                        Cancel Payment
                      </Button>
                    </div>
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
