import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const { toast } = useToast();

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + deliveryFee - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon({ code: "SAVE10", discount: 10 });
      toast({
        title: "Coupon applied!",
        description: "You saved 10% on your order.",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please check the coupon code and try again.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some delicious items to get started!</p>
            <Link href="/menu">
              <a>
                <Button size="lg" data-testid="button-browse-menu">Browse Menu</Button>
              </a>
            </Link>
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
              {items.map((item) => (
                <Card key={`${item.id}-${item.spiceLevel}-${item.portionSize}`} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1" data-testid={`text-cart-item-${item.id}`}>
                          {item.name}
                        </h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {item.portionSize && (
                            <p>Size: {item.portionSize}</p>
                          )}
                          {item.spiceLevel && (
                            <p>Spice Level: {item.spiceLevel}</p>
                          )}
                          {item.addOns && item.addOns.length > 0 && (
                            <p>Add-ons: {item.addOns.join(", ")}</p>
                          )}
                        </div>
                        <p className="text-lg font-bold text-primary mt-2" data-testid={`text-cart-price-${item.id}`}>
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" onClick={clearCart} className="w-full" data-testid="button-clear-cart">
                Clear Cart
              </Button>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-xl">Order Summary</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span data-testid="text-delivery">${deliveryFee.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span data-testid="text-discount">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary" data-testid="text-total">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coupon">Have a coupon?</Label>
                    <div className="flex gap-2">
                      <Input
                        id="coupon"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        data-testid="input-coupon"
                      />
                      <Button variant="outline" onClick={applyCoupon} data-testid="button-apply-coupon">
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Try: SAVE10</p>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href="/checkout" className="w-full">
                    <a className="w-full">
                      <Button className="w-full" size="lg" data-testid="button-checkout">
                        Proceed to Checkout
                      </Button>
                    </a>
                  </Link>
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
