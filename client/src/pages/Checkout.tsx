import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store";
import { useLocation } from "wouter";
import { useState } from "react";
import { Check } from "lucide-react";

//todo: remove mock functionality
const mockAddresses = [
  {
    id: "1",
    label: "Home",
    street: "123 Main Street",
    city: "Cuisine City",
    state: "CC",
    zipCode: "12345",
  },
  {
    id: "2",
    label: "Work",
    street: "456 Office Avenue",
    city: "Cuisine City",
    state: "CC",
    zipCode: "12346",
  },
];

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const [, setLocation] = useLocation();
  const [selectedAddress, setSelectedAddress] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !orderPlaced) {
    setLocation("/menu");
    return null;
  }

  const handlePlaceOrder = () => {
    console.log("Order placed:", {
      items,
      address: mockAddresses.find((a) => a.id === selectedAddress),
      paymentMethod,
      total,
    });
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-lg w-full mx-4">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4">
                Order Confirmed!
              </h2>
              <p className="text-muted-foreground mb-2">
                Order #ORD{Math.floor(Math.random() * 10000)}
              </p>
              <p className="text-muted-foreground mb-8">
                Estimated delivery: 30-40 minutes
              </p>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => setLocation("/")}
                  data-testid="button-continue-shopping"
                >
                  Grab a Bite again
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation("/profile")}
                  data-testid="button-view-orders"
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
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedAddress}
                    onValueChange={setSelectedAddress}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockAddresses.map((address) => (
                        <Card
                          key={address.id}
                          className="hover-elevate cursor-pointer"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <RadioGroupItem
                                value={address.id}
                                id={address.id}
                                data-testid={`radio-address-${address.id}`}
                              />
                              <Label
                                htmlFor={address.id}
                                className="flex-1 cursor-pointer"
                              >
                                <p className="font-semibold mb-1">
                                  {address.label}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {address.street}
                                  <br />
                                  {address.city}, {address.state}{" "}
                                  {address.zipCode}
                                </p>
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="card"
                          id="card"
                          data-testid="radio-payment-card"
                        />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value="cash"
                          id="cash"
                          data-testid="radio-payment-cash"
                        />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          Cash on Delivery
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 pb-3 border-b last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">${item.price}</span>
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
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span data-testid="text-checkout-subtotal">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span data-testid="text-checkout-delivery">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span
                        className="text-primary"
                        data-testid="text-checkout-total"
                      >
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                    data-testid="button-place-order"
                  >
                    Place Order
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
