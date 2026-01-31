// import api from "@/lib/api";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Minus, Plus, Trash2, Tag, X, Loader2 } from "lucide-react";
// import { useCartStore } from "@/lib/store";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useLocation } from "wouter";
// import { useState, useEffect } from "react";
// import { useToast } from "@/hooks/use-toast";
// import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { MapPin, Package } from "lucide-react";

// //const API_URL = "http://localhost:8000/api";
// const API_URL = import.meta.env.VITE_API_URL;

// // Interfaces for dynamic data
// interface MiscCharge {
//   name: string;
//   charge_type: "PERCENTAGE" | "FIXED_AMOUNT";
//   value: string;
// }

// interface AppliedCoupon {
//   code: string;
//   discount_percent: number;
// }

// export default function Cart() {
//   const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
//   const { user } = useAuthStore();
//   const isAuthenticated = !!user;

//   const [, setLocation] = useLocation();
//   const { toast } = useToast();

//   // State for dynamic charges and coupons
//   const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
//   const [couponInput, setCouponInput] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
//     null,
//   );
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
//     "pickup",
//   );
//   const [deliveryFee, setDeliveryFee] = useState(0);
//   const [userLocation, setUserLocation] = useState<{
//     lat: number;
//     lon: number;
//   } | null>(null);
//   const [locationError, setLocationError] = useState<string | null>(null);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [distance, setDistance] = useState<number | null>(null);

//   // Restaurant location - UPDATE THIS with your actual restaurant coordinates
//   const RESTAURANT_LOCATION = {
//     // lat: 17.434490054454354,
//     // lon: 78.31194158239244,
//     lat: 41.7332227,
//     lon: -87.8010003,
//   };

//   const axiosAuth = axios.create({ baseURL: API_URL });
//   axiosAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     const token = useAuthStore.getState().accessToken;
//     if (token) {
//       if (!config.headers) config.headers = new AxiosHeaders();
//       config.headers.set("Authorization", `Bearer ${token}`);
//     }
//     return config;
//   });

//   // Haversine distance calculation in Miles
//   function calculateDistance(
//     lat1: number,
//     lon1: number,
//     lat2: number,
//     lon2: number,
//   ): number {
//     const earthRadiusMiles = 3958.8;

//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const straightLineDistance = earthRadiusMiles * c;

//     // OPTIONAL: Multiply by 1.3 to estimate "Driving Distance" (Road curvature factor)
//     // Remove this line if you strictly want straight-line radius
//     const estimatedDrivingDistance = straightLineDistance * 1.4;

//     return estimatedDrivingDistance;
//   }

//   // Effect to fetch dynamic charges
//   useEffect(() => {
//     const fetchCharges = async () => {
//       try {
//         const response = await api.get("/coupons/charges/");
//         setMiscCharges(response.data);
//       } catch (error) {
//         console.error("Failed to fetch miscellaneous charges:", error);
//       }
//     };
//     fetchCharges();
//   }, []);

//   // Dynamic Calculations
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
//   const total = subtotal + totalCharges - discountAmount + deliveryFee;

//   // **FIX 1: Complete coupon handlers**
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
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput("");
//     toast({ title: "Coupon removed." });
//   };

//   // Delivery option handler
//   const handleDeliveryOptionChange = async (value: "pickup" | "delivery") => {
//     setDeliveryOption(value);

//     if (value === "delivery") {
//       setLoadingLocation(true);
//       setLocationError(null);

//       if (!navigator.geolocation) {
//         setLocationError("Geolocation is not supported by your browser");
//         setLoadingLocation(false);
//         setDeliveryOption("pickup");
//         return;
//       }

//       const successHandler = (position: GeolocationPosition) => {
//         const userLat = position.coords.latitude;
//         const userLon = position.coords.longitude;

//         setUserLocation({ lat: userLat, lon: userLon });

//         const dist = calculateDistance(
//           RESTAURANT_LOCATION.lat,
//           RESTAURANT_LOCATION.lon,
//           userLat,
//           userLon,
//         );

//         setDistance(dist);

//         if (dist > 5) {
//           setLocationError(
//             `You are ${dist.toFixed(1)} miles away. Delivery is limited to 5 miles.`,
//           );
//           setDeliveryFee(0);
//           // Don't auto-switch to pickup immediately, let the user see the error
//           toast({
//             title: "Too Far for Delivery",
//             description: "We currently only deliver within a 5-mile radius.",
//             variant: "destructive",
//           });
//         } else if (dist <= 2) {
//           setDeliveryFee(0);
//           toast({
//             title: "Free Delivery!",
//             description: `Your location is ${dist.toFixed(1)} miles away. Delivery is free!`,
//           });
//         } else {
//           setDeliveryFee(4.99);
//           toast({
//             title: "Delivery Available",
//             description: `Your location is ${dist.toFixed(1)} miles away. Delivery fee: $4.99`,
//           });
//         }
//         setLoadingLocation(false);
//       };

//       const errorHandler = (error: GeolocationPositionError) => {
//         console.error("Geolocation error:", error);
//         let errorMessage = "Unable to retrieve location.";

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage =
//               "Please allow location access in your browser settings.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable.";
//             break;
//           case error.TIMEOUT:
//             errorMessage = "Location request timed out. Please try again.";
//             break;
//         }

//         setLocationError(errorMessage);
//         setDeliveryOption("pickup"); // Fallback to pickup
//         setLoadingLocation(false);
//         toast({
//           title: "Location Error",
//           description: errorMessage,
//           variant: "destructive",
//         });
//       };

//       // Try high accuracy first
//       navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
//         enableHighAccuracy: true,
//         timeout: 15000, // Increased timeout to 15s
//         maximumAge: 10000, // Accept cached location up to 10s old
//       });
//     } else {
//       // Reset if user switches back to pickup
//       setDeliveryFee(0);
//       setUserLocation(null);
//       setDistance(null);
//       setLocationError(null);
//     }
//   };

//   const handleCheckout = () => {
//     if (isAuthenticated) {
//       // Store delivery info in sessionStorage to pass to checkout
//       sessionStorage.setItem(
//         "deliveryOption",
//         JSON.stringify({
//           type: deliveryOption,
//           deliveryFee,
//           distance,
//           userLocation,
//         }),
//       );
//       setLocation("/checkout");
//     } else {
//       toast({
//         title: "Please Log In",
//         description: "You need to be logged in to proceed to checkout.",
//       });
//       setLocation("/auth");
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
//                                 item.customizations,
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
//                                 item.customizations,
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

//                   {/* Delivery Option Selection */}
//                   <div className="space-y-3 border rounded-lg p-4 bg-secondary/50">
//                     <Label className="text-base font-semibold">
//                       Delivery Option
//                     </Label>
//                     <RadioGroup
//                       value={deliveryOption}
//                       onValueChange={handleDeliveryOptionChange}
//                     >
//                       <div className="flex items-center space-x-2 p-2 rounded hover:bg-background cursor-pointer">
//                         <RadioGroupItem value="pickup" id="pickup" />
//                         <Label
//                           htmlFor="pickup"
//                           className="flex items-center gap-2 cursor-pointer flex-1"
//                         >
//                           <Package className="h-4 w-4" />
//                           <span>Pickup (Free)</span>
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2 p-2 rounded hover:bg-background cursor-pointer">
//                         <RadioGroupItem
//                           value="delivery"
//                           id="delivery"
//                           disabled={loadingLocation}
//                         />
//                         <Label
//                           htmlFor="delivery"
//                           className="flex items-center gap-2 cursor-pointer flex-1"
//                         >
//                           <MapPin className="h-4 w-4" />
//                           <span>Delivery</span>
//                           {loadingLocation && (
//                             <Loader2 className="h-3 w-3 animate-spin ml-auto" />
//                           )}
//                         </Label>
//                       </div>
//                     </RadioGroup>

//                     {deliveryOption === "delivery" &&
//                       distance !== null &&
//                       !locationError && (
//                         <div className="text-sm text-muted-foreground bg-background p-2 rounded">
//                           <p>📍 Distance: {distance.toFixed(2)} Miles</p>
//                           {distance <= 2 && (
//                             <p className="text-green-600 font-medium">
//                               ✓ Free delivery!
//                             </p>
//                           )}
//                           {distance > 2 && distance <= 5 && (
//                             <p className="text-blue-600 font-medium">
//                               Delivery fee: $4.99
//                             </p>
//                           )}
//                         </div>
//                       )}

//                     {locationError && (
//                       <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
//                         {locationError}
//                       </div>
//                     )}
//                   </div>

//                   {/* Price breakdown */}
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Subtotal</span>
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
//                     {deliveryFee > 0 && (
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">
//                           Delivery Fee
//                         </span>
//                         <span>${deliveryFee.toFixed(2)}</span>
//                       </div>
//                     )}
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

//                   {/* **ENHANCEMENT: Re-enable coupon section (optional)** */}
//                   {/* <div className="space-y-2">
//                     <Label htmlFor="coupon">Have a coupon?</Label>
//                     {!appliedCoupon ? (
//                       <div className="flex gap-2">
//                         <Input
//                           id="coupon"
//                           placeholder="Enter code"
//                           value={couponInput}
//                           onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
//                         />
//                         <Button
//                           variant="outline"
//                           onClick={handleApplyCoupon}
//                           disabled={couponLoading}
//                         >
//                           {couponLoading ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Tag className="h-4 w-4" />
//                           )}
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
//                         <p className="text-sm font-medium text-green-600">
//                           {appliedCoupon.code} Applied!
//                         </p>
//                         <Button variant="ghost" size="icon" onClick={handleRemoveCoupon}>
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     )}
//                   </div> */}
//                 </CardContent>
//                 <CardFooter className="p-6 pt-0">
//                   <Button className="w-full" size="lg" onClick={handleCheckout}>
//                     Proceed to Checkout ${total.toFixed(2)}
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
import { Minus, Plus, Trash2, MapPin, Package } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store/authStore";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface MiscCharge {
  name: string;
  charge_type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: string;
}

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [miscCharges, setMiscCharges] = useState<MiscCharge[]>([]);
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">(
    "pickup",
  );

  /* ------------------------------ FETCH CHARGES ------------------------------ */

  useEffect(() => {
    api
      .get("/coupons/charges/")
      .then((res) => setMiscCharges(res.data))
      .catch(() => console.warn("Failed to load misc charges"));
  }, []);

  /* ------------------------------- CALCULATIONS ------------------------------- */

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  const miscTotal = miscCharges.reduce((sum, charge) => {
    const value = parseFloat(charge.value);
    return (
      sum +
      (charge.charge_type === "PERCENTAGE" ? (subtotal * value) / 100 : value)
    );
  }, 0);

  const total = subtotal + miscTotal;

  /* ------------------------------- CHECKOUT ------------------------------- */

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to continue to checkout",
      });
      setLocation("/auth");
      return;
    }

    // ✅ ONLY intent is stored — validation happens in checkout
    sessionStorage.setItem(
      "deliveryOption",
      JSON.stringify({
        type: deliveryType,
      }),
    );

    setLocation("/checkout");
  };

  /* ------------------------------- EMPTY CART ------------------------------- */

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Button size="lg" onClick={() => setLocation("/menu")}>
            Browse Menu
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${JSON.stringify(item.customizations)}`}>
              <CardContent className="flex gap-4 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  {item.customizations && item.customizations.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {item.customizations.map((c) => c.selection).join(", ")}
                    </p>
                  )}

                  <p className="font-bold mt-2">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id, item.customizations)}
                  >
                    <Trash2 />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1),
                          item.customizations,
                        )
                      }
                    >
                      <Minus />
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                          item.customizations,
                        )
                      }
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={clearCart} className="w-full">
            Clear Cart
          </Button>
        </div>

        {/* ORDER SUMMARY */}
        <Card className="sticky top-20 h-fit">
          <CardContent className="space-y-4 p-6">
            <h3 className="text-xl font-semibold">Order Summary</h3>

            {/* DELIVERY TYPE */}
            <RadioGroup
              value={deliveryType}
              onValueChange={(v) => setDeliveryType(v as "pickup" | "delivery")}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pickup" />
                <Package className="h-4 w-4" />
                Pickup
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="delivery" />
                <MapPin className="h-4 w-4" />
                Delivery
              </div>
            </RadioGroup>

            {/* PRICE BREAKDOWN */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {miscCharges.map((c) => {
                const val = parseFloat(c.value);
                const amount =
                  c.charge_type === "PERCENTAGE" ? (subtotal * val) / 100 : val;

                return (
                  <div key={c.name} className="flex justify-between">
                    <span className="text-muted-foreground">{c.name}</span>
                    <span>${amount.toFixed(2)}</span>
                  </div>
                );
              })}

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
