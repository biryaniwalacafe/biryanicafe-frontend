import { useState } from "react";
import { useAcceptJs } from "react-acceptjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
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
    environment: "SANDBOX", // Change to 'PRODUCTION' for live
    authData,
  });
  const { toast } = useToast();

  const [cardData, setCardData] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cardCode: "",
  });

  // **DEBUG: Log auth data**
  console.log("Auth Data:", authData);
  console.log("Accept.js Error:", error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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
      console.log("Submitting card data:", cardData); // DEBUG
      const response = await dispatchData({
        ...cardData,
        cardData, // Ensure cardData is passed correctly
      });

      console.log("Accept.js Response:", response); // DEBUG

      if (response.messages.resultCode === "Error") {
        const errorMsg =
          response.messages.message?.map((m: any) => m.text).join(", ") ||
          "Unknown error";
        console.error("Accept.js Error Details:", response);
        onPaymentError(errorMsg);
        return;
      }

      // Success - extract nonce
      const nonce = response.opaqueData?.dataValue;
      if (nonce) {
        console.log("Payment nonce generated:", nonce); // DEBUG
        onPaymentSuccess(nonce);
      } else {
        onPaymentError("Payment nonce not received");
      }
    } catch (err: any) {
      console.error("Dispatch error:", err);
      onPaymentError(
        err.message || "Payment processing failed - check console",
      );
    }
  };

  // Show auth data error
  if (!authData.apiLoginID || !authData.clientKey) {
    return (
      <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-lg">
        <AlertCircle className="h-4 w-4 inline mr-2" />
        Payment configuration missing. Check your .env file:
        <br />
        <code>VITE_AUTHORIZE_NET_API_LOGIN_ID</code>
        <br />
        <code>VITE_AUTHORIZE_NET_CLIENT_KEY</code>
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
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="tel"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={cardData.cardNumber.replace(/\s/g, "")}
              onChange={(e) => {
                let value = e.target.value.replace(/\s/g, "");
                // Add spaces for readability
                value = value.match(/.{1,4}/g)?.join(" ") || value;
                setCardData({ ...cardData, cardNumber: value });
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Exp. Month</Label>
              <Input
                id="month"
                type="tel"
                inputMode="numeric"
                placeholder="MM"
                maxLength={2}
                value={cardData.month}
                onChange={(e) =>
                  setCardData({ ...cardData, month: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Exp. Year</Label>
              <Input
                id="year"
                type="tel"
                inputMode="numeric"
                placeholder="YY"
                maxLength={4}
                value={cardData.year}
                onChange={(e) =>
                  setCardData({ ...cardData, year: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardCode">CVV</Label>
              <Input
                id="cardCode"
                type="tel"
                inputMode="numeric"
                placeholder="123"
                maxLength={4}
                value={cardData.cardCode}
                onChange={(e) =>
                  setCardData({ ...cardData, cardCode: e.target.value })
                }
              />
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
