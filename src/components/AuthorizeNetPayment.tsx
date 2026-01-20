// import { useState } from "react";
// import { useAcceptJs } from "react-acceptjs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2, CreditCard, AlertCircle } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface AuthorizeNetPaymentProps {
//   amount: number;
//   onPaymentSuccess: (paymentNonce: string) => void;
//   onPaymentError: (error: string) => void;
// }

// const authData = {
//   apiLoginID: import.meta.env.VITE_AUTHORIZE_NET_API_LOGIN_ID || "7Jv44Uh9D8Y",
//   clientKey:
//     import.meta.env.VITE_AUTHORIZE_NET_CLIENT_KEY ||
//     "8wrDe8kG7SpZZ8799hDwvX98EeCN9QSKvewrwKmp838rARFR8tUwJ7Q9gB769ZWM",
// };

// export function AuthorizeNetPayment({
//   amount,
//   onPaymentSuccess,
//   onPaymentError,
// }: AuthorizeNetPaymentProps) {
//   const { dispatchData, loading, error } = useAcceptJs({
//     environment: "SANDBOX", // Change to 'PRODUCTION' for live
//     authData,
//   });
//   const { toast } = useToast();

//   const [cardData, setCardData] = useState({
//     cardNumber: "",
//     month: "",
//     year: "",
//     cardCode: "",
//   });

//   // **DEBUG: Log auth data**
//   console.log("Auth Data:", authData);
//   console.log("Accept.js Error:", error);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (
//       !cardData.cardNumber ||
//       !cardData.month ||
//       !cardData.year ||
//       !cardData.cardCode
//     ) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in all card details",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       console.log("Submitting card data:", cardData); // DEBUG
//       const response = await dispatchData({
//         ...cardData,
//         cardData, // Ensure cardData is passed correctly
//       });

//       console.log("Accept.js Response:", response); // DEBUG

//       if (response.messages.resultCode === "Error") {
//         const errorMsg =
//           response.messages.message?.map((m: any) => m.text).join(", ") ||
//           "Unknown error";
//         console.error("Accept.js Error Details:", response);
//         onPaymentError(errorMsg);
//         return;
//       }

//       // Success - extract nonce
//       const nonce = response.opaqueData?.dataValue;
//       if (nonce) {
//         console.log("Payment nonce generated:", nonce); // DEBUG
//         onPaymentSuccess(nonce);
//       } else {
//         onPaymentError("Payment nonce not received");
//       }
//     } catch (err: any) {
//       console.error("Dispatch error:", err);
//       onPaymentError(
//         err.message || "Payment processing failed - check console",
//       );
//     }
//   };

//   // Show auth data error
//   if (!authData.apiLoginID || !authData.clientKey) {
//     return (
//       <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-lg">
//         <AlertCircle className="h-4 w-4 inline mr-2" />
//         Payment configuration missing. Check your .env file:
//         <br />
//         <code>VITE_AUTHORIZE_NET_API_LOGIN_ID</code>
//         <br />
//         <code>VITE_AUTHORIZE_NET_CLIENT_KEY</code>
//       </div>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <CreditCard className="h-5 w-5" />
//           Secure Payment (${amount.toFixed(2)})
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {error && (
//           <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="cardNumber">Card Number</Label>
//             <Input
//               id="cardNumber"
//               type="tel"
//               inputMode="numeric"
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//               value={cardData.cardNumber.replace(/\s/g, "")}
//               onChange={(e) => {
//                 let value = e.target.value.replace(/\s/g, "");
//                 // Add spaces for readability
//                 value = value.match(/.{1,4}/g)?.join(" ") || value;
//                 setCardData({ ...cardData, cardNumber: value });
//               }}
//             />
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="month">Exp. Month</Label>
//               <Input
//                 id="month"
//                 type="tel"
//                 inputMode="numeric"
//                 placeholder="MM"
//                 maxLength={2}
//                 value={cardData.month}
//                 onChange={(e) =>
//                   setCardData({ ...cardData, month: e.target.value })
//                 }
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="year">Exp. Year</Label>
//               <Input
//                 id="year"
//                 type="tel"
//                 inputMode="numeric"
//                 placeholder="YY"
//                 maxLength={4}
//                 value={cardData.year}
//                 onChange={(e) =>
//                   setCardData({ ...cardData, year: e.target.value })
//                 }
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="cardCode">CVV</Label>
//               <Input
//                 id="cardCode"
//                 type="tel"
//                 inputMode="numeric"
//                 placeholder="123"
//                 maxLength={4}
//                 value={cardData.cardCode}
//                 onChange={(e) =>
//                   setCardData({ ...cardData, cardCode: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="pt-4 space-y-2">
//             <div className="flex justify-between text-lg font-bold">
//               <span>Total Amount:</span>
//               <span className="text-primary">${amount.toFixed(2)}</span>
//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               size="lg"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Processing Payment...
//                 </>
//               ) : (
//                 `Pay Securely $${amount.toFixed(2)}`
//               )}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
import { useState } from "react";
import { useAcceptJs } from "react-acceptjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthorizeNetPaymentProps {
  amount: number;
  onPaymentSuccess: (paymentNonce: string) => void;
  onPaymentError: (error: string) => void;
}

const authData = {
  apiLoginID: import.meta.env.VITE_AUTHORIZE_NET_API_LOGIN_ID || "7Jv44Uh9D8Y",
  clientKey:
    import.meta.env.VITE_AUTHORIZE_NET_CLIENT_KEY ||
    "8wrDe8kG7SpZZ8799hDwvX98EeCN9QSKvewrwKmp838rARFR8tUwJ7Q9gB769ZWM",
};

export function AuthorizeNetPayment({
  amount,
  onPaymentSuccess,
  onPaymentError,
}: AuthorizeNetPaymentProps) {
  const { dispatchData, loading, error } = useAcceptJs({
    environment: "PRODUCTION",
    authData,
  });
  const { toast } = useToast();

  const [cardData, setCardData] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cardCode: "",
  });

  // ✅ NEW: Card validation errors state
  const [cardErrors, setCardErrors] = useState<{
    cardNumber?: string;
    month?: string;
    year?: string;
    cardCode?: string;
    general?: string;
  }>({});

  // Clear errors when user types
  const clearFieldError = (field: keyof typeof cardData) => {
    setCardErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setCardErrors({});

    // Basic validation
    if (
      !cardData.cardNumber ||
      !cardData.month ||
      !cardData.year ||
      !cardData.cardCode
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Submitting card data:", cardData);
      const response = await dispatchData({
        cardData: {
          cardNumber: cardData.cardNumber.replace(/\s/g, ""), // Clean spaces
          month: cardData.month,
          year: cardData.year,
          cardCode: cardData.cardCode,
        },
      });

      console.log("Accept.js Response:", response);

      if (response.messages.resultCode === "Error") {
        // ✅ DETAILED ERROR PARSING
        const messages = response.messages.message || [];
        let generalError = "";
        const fieldErrors: any = {};

        messages.forEach((msg: any) => {
          const text = msg.text || "";
          const code = msg.code || "";

          // Parse field-specific errors
          if (text.includes("cardNumber") || code.includes("cardNumber")) {
            fieldErrors.cardNumber = text;
          } else if (text.includes("month") || text.includes("expDate")) {
            fieldErrors.month = text;
          } else if (text.includes("year") || text.includes("expDate")) {
            fieldErrors.year = text;
          } else if (text.includes("cardCode") || text.includes("CVV")) {
            fieldErrors.cardCode = text;
          } else {
            // General error (like E_WC_20)
            generalError += text + " ";
          }
        });

        // Set field-specific errors
        if (Object.keys(fieldErrors).length > 0) {
          setCardErrors(fieldErrors);
        }

        // Show general error in toast
        if (generalError.trim()) {
          const errorMsg = generalError.trim();
          setCardErrors((prev) => ({ ...prev, general: errorMsg }));
          onPaymentError(errorMsg);
          toast({
            title: "Card Validation Error",
            description: errorMsg,
            variant: "destructive",
          });
        }
        return;
      }

      // Success - extract nonce
      const nonce = response.opaqueData?.dataValue;
      if (nonce) {
        console.log("Payment nonce generated:", nonce);
        setCardErrors({}); // Clear errors on success
        onPaymentSuccess(nonce);
      } else {
        onPaymentError("Payment nonce not received");
      }
    } catch (err: any) {
      console.error("Dispatch error:", err);
      const errorMsg =
        err?.messages?.message?.[0]?.text ||
        err.message ||
        "Payment processing failed";
      setCardErrors({ general: errorMsg });
      onPaymentError(errorMsg);
      toast({
        title: "Payment Error",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  const authError = !authData.apiLoginID || !authData.clientKey;

  if (authError) {
    return (
      <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-lg">
        <AlertCircle className="h-4 w-4 inline mr-2" />
        Payment configuration missing. Check your .env file.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment (${amount.toFixed(2)})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Accept.js General Error */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* ✅ FIELD-SPECIFIC ERRORS */}
        {cardErrors.general && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{cardErrors.general}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number Field */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="tel"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={
                cardErrors.cardNumber
                  ? "border-destructive focus:border-destructive"
                  : ""
              }
              value={cardData.cardNumber}
              onChange={(e) => {
                clearFieldError("cardNumber");
                let value = e.target.value.replace(/\s/g, "");
                value = value.match(/.{1,4}/g)?.join(" ") || value;
                setCardData({ ...cardData, cardNumber: value });
              }}
            />
            {cardErrors.cardNumber && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {cardErrors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Month Field */}
            <div className="space-y-2">
              <Label htmlFor="month">Exp. Month</Label>
              <Input
                id="month"
                type="tel"
                inputMode="numeric"
                placeholder="MM"
                maxLength={2}
                className={
                  cardErrors.month
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
                value={cardData.month}
                onChange={(e) => {
                  clearFieldError("month");
                  setCardData({ ...cardData, month: e.target.value });
                }}
              />
              {cardErrors.month && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {cardErrors.month}
                </p>
              )}
            </div>

            {/* Year Field */}
            <div className="space-y-2">
              <Label htmlFor="year">Exp. Year</Label>
              <Input
                id="year"
                type="tel"
                inputMode="numeric"
                placeholder="YY"
                maxLength={4}
                className={
                  cardErrors.year
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
                value={cardData.year}
                onChange={(e) => {
                  clearFieldError("year");
                  setCardData({ ...cardData, year: e.target.value });
                }}
              />
              {cardErrors.year && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {cardErrors.year}
                </p>
              )}
            </div>

            {/* CVV Field */}
            <div className="space-y-2">
              <Label htmlFor="cardCode">CVV</Label>
              <Input
                id="cardCode"
                type="tel"
                inputMode="numeric"
                placeholder="123"
                maxLength={4}
                className={
                  cardErrors.cardCode
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
                value={cardData.cardCode}
                onChange={(e) => {
                  clearFieldError("cardCode");
                  setCardData({ ...cardData, cardCode: e.target.value });
                }}
              />
              {cardErrors.cardCode && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {cardErrors.cardCode}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-primary">${amount.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Pay Securely $${amount.toFixed(2)}`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
