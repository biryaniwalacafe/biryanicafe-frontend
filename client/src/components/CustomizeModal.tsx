import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Flame, Minus, Plus } from "lucide-react";
import type { MenuItem } from "@shared/schema";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface CustomizeModalProps {
  item: MenuItem;
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

const addOnsOptions = [
  { id: "extra-raita", label: "Extra Raita", price: 1.99 },
  { id: "extra-pickle", label: "Extra Pickle", price: 0.99 },
  { id: "papad", label: "Papad (2 pcs)", price: 1.49 },
];

export function CustomizeModal({ item, imageUrl, open, onClose }: CustomizeModalProps) {
  const [spiceLevel, setSpiceLevel] = useState(item.spiceLevel.toString());
  const [portionSize, setPortionSize] = useState("regular");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const { toast } = useToast();

  const basePrice = parseFloat(item.price);
  const portionMultiplier = portionSize === "large" ? 1.5 : 1;
  const addOnsTotal = addOns.reduce((sum, id) => {
    const addOn = addOnsOptions.find((a) => a.id === id);
    return sum + (addOn?.price || 0);
  }, 0);
  const totalPrice = (basePrice * portionMultiplier + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: totalPrice.toFixed(2),
      quantity,
      image: imageUrl,
      spiceLevel: parseInt(spiceLevel),
      addOns: addOns.map((id) => addOnsOptions.find((a) => a.id === id)?.label || ""),
      portionSize,
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
    
    onClose();
    setQuantity(1);
    setAddOns([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="text-muted-foreground">{item.description}</p>
            <p className="text-2xl font-bold text-primary mt-2">${item.price}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Spice Level</h4>
            <RadioGroup value={spiceLevel} onValueChange={setSpiceLevel}>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="spice-1" data-testid="radio-spice-mild" />
                  <Label htmlFor="spice-1" className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    Mild
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="spice-2" data-testid="radio-spice-medium" />
                  <Label htmlFor="spice-2" className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <Flame className="h-4 w-4" />
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="spice-3" data-testid="radio-spice-hot" />
                  <Label htmlFor="spice-3" className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    <Flame className="h-4 w-4" />
                    <Flame className="h-4 w-4" />
                    Hot
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Portion Size</h4>
            <RadioGroup value={portionSize} onValueChange={setPortionSize}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regular" id="portion-regular" data-testid="radio-portion-regular" />
                  <Label htmlFor="portion-regular">Regular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="portion-large" data-testid="radio-portion-large" />
                  <Label htmlFor="portion-large">Large (+50%)</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Add-ons</h4>
            <div className="space-y-3">
              {addOnsOptions.map((addOn) => (
                <div key={addOn.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={addOn.id}
                    checked={addOns.includes(addOn.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setAddOns([...addOns, addOn.id]);
                      } else {
                        setAddOns(addOns.filter((id) => id !== addOn.id));
                      }
                    }}
                    data-testid={`checkbox-addon-${addOn.id}`}
                  />
                  <Label htmlFor={addOn.id} className="flex-1">
                    {addOn.label}
                  </Label>
                  <span className="text-sm text-muted-foreground">+${addOn.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quantity</h4>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                data-testid="button-decrease-quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center" data-testid="text-quantity">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-increase-quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-primary" data-testid="text-total-price">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <Button onClick={handleAddToCart} className="px-8" data-testid="button-confirm-add-to-cart">
              Add to Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
