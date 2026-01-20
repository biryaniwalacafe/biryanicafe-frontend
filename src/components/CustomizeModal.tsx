// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Minus, Plus } from "lucide-react";
// import type { MenuItem, CartItem } from "@/types/menu";
// import { useState, useMemo, useEffect } from "react";
// import { useCartStore } from "@/lib/store";
// import { useToast } from "@/hooks/use-toast";

// interface CustomizeModalProps {
//   item: MenuItem;
//   open: boolean;
//   onClose: () => void;
// }

// export function CustomizeModal({ item, open, onClose }: CustomizeModalProps) {
//   const { toast } = useToast();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [selectedOptions, setSelectedOptions] = useState<
//     Record<number, number[]>
//   >({});
//   const [quantity, setQuantity] = useState(1);

//   const imageUrl = item.image || "https://via.placeholder.com/400x300";

//   useEffect(() => {
//     if (open) {
//       const initialSelections: Record<number, number[]> = {};
//       item.addon_groups.forEach((group) => {
//         initialSelections[group.id] = [];
//       });
//       setSelectedOptions(initialSelections);
//       setQuantity(1);
//     }
//   }, [open, item]);

//   const { totalPrice } = useMemo(() => {
//     const originalItemPrice = parseFloat(item.price);
//     const basePrice =
//       item.discount_percent > 0
//         ? originalItemPrice * (1 - item.discount_percent / 100)
//         : originalItemPrice;

//     const addOnsTotal = Object.entries(selectedOptions).reduce(
//       (sum, [groupId, selectedAddonIds]) => {
//         const group = item.addon_groups.find((g) => g.id === Number(groupId));
//         if (!group) return sum;

//         const groupTotal = selectedAddonIds.reduce((groupSum, addonId) => {
//           const addon = group.addons.find((a) => a.id === addonId);
//           return groupSum + (addon ? parseFloat(addon.price) : 0);
//         }, 0);

//         return sum + groupTotal;
//       },
//       0
//     );

//     return { totalPrice: (basePrice + addOnsTotal) * quantity };
//   }, [item, selectedOptions, quantity]);

//   const handleOptionToggle = (groupId: number, addonId: number) => {
//     setSelectedOptions((prev) => {
//       const currentSelections = prev[groupId] || [];
//       const newSelections = currentSelections.includes(addonId)
//         ? currentSelections.filter((id) => id !== addonId)
//         : [...currentSelections, addonId];
//       return {
//         ...prev,
//         [groupId]: newSelections,
//       };
//     });
//   };

//   const handleAddToCart = () => {
//     const customizationsForCart = Object.entries(selectedOptions).flatMap(
//       ([groupId, addonIds]) => {
//         const group = item.addon_groups.find((g) => g.id === Number(groupId));
//         return addonIds.map((addonId) => {
//           const addon = group?.addons.find((a) => a.id === addonId);
//           return {
//             groupName: group?.name || "Unknown Group",
//             selection: addon?.name || "Unknown Selection",
//           };
//         });
//       }
//     );

//     const cartItemToAdd: CartItem = {
//       id: String(item.id),
//       name: item.name,
//       price: totalPrice.toFixed(2),
//       quantity: quantity,
//       image: imageUrl,
//       customizations: customizationsForCart,
//     };

//     addToCart(cartItemToAdd);

//     toast({
//       title: "Added to cart",
//       description: `${quantity}x ${item.name} has been added.`,
//     });

//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
//         <div className="aspect-video w-full overflow-hidden relative">
//           <img
//             src={imageUrl}
//             alt={item.name}
//             className="w-full h-full object-cover"
//           />
//           {item.discount_percent > 0 && (
//             <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-600 text-white">
//               {item.discount_percent}% OFF
//             </div>
//           )}
//         </div>

//         <div className="p-6 space-y-6">
//           <DialogHeader className="p-0 text-left">
//             <DialogTitle className="text-2xl sm:text-3xl font-serif">
//               {item.name}
//             </DialogTitle>
//           </DialogHeader>

//           <p className="text-sm sm:text-base text-muted-foreground">
//             {item.description}
//           </p>

//           {/* --- DYNAMIC CUSTOMIZATION OPTIONS --- */}
//           {item.addon_groups.map((group) => (
//             <div key={group.id}>
//               <h4 className="font-semibold mb-3 text-base sm:text-lg">
//                 {group.name}
//               </h4>
//               <div className="space-y-3">
//                 {/* --- FIX APPLIED: Separated Label and Checkbox for rendering stability --- */}
//                 {group.addons.map((addon) => (
//                   <div
//                     key={addon.id}
//                     className="flex items-center justify-between p-3 border rounded-lg"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Checkbox
//                         id={`addon-${group.id}-${addon.id}`}
//                         checked={(selectedOptions[group.id] || []).includes(
//                           addon.id
//                         )}
//                         onCheckedChange={() =>
//                           handleOptionToggle(group.id, addon.id)
//                         }
//                       />
//                       <Label
//                         htmlFor={`addon-${group.id}-${addon.id}`}
//                         className="cursor-pointer"
//                       >
//                         {addon.name}
//                       </Label>
//                     </div>
//                     {parseFloat(addon.price) > 0 && (
//                       <span className="text-sm font-medium">
//                         +${addon.price}
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {/* --- QUANTITY SELECTOR --- */}
//           <div>
//             <h4 className="font-semibold mb-3 text-base sm:text-lg">
//               Quantity
//             </h4>
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 disabled={quantity <= 1}
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="text-xl font-semibold w-12 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity(quantity + 1)}
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* --- FOOTER --- */}
//         <DialogFooter className="flex-col sm:flex-row gap-3 p-6 bg-muted/50">
//           <div className="flex items-center justify-between w-full gap-4">
//             <div>
//               <p className="text-sm text-muted-foreground">Total Price</p>
//               <p className="text-2xl sm:text-3xl font-bold text-primary">
//                 ${totalPrice.toFixed(2)}
//               </p>
//             </div>
//             <Button
//               onClick={handleAddToCart}
//               size="lg"
//               className="px-8 text-base"
//             >
//               Add {quantity} to Cart
//             </Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // --- ADD THIS IMPORT ---
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Leaf } from "lucide-react"; // --- ADD LEAF ICON ---
import type { MenuItem, CartItem } from "@/types/menu";
import { useState, useMemo, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface CustomizeModalProps {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

export function CustomizeModal({ item, open, onClose }: CustomizeModalProps) {
  const { toast } = useToast();
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, number[]>
  >({});
  const [quantity, setQuantity] = useState(1);

  const imageUrl = item.image || "https://via.placeholder.com/400x300";

  useEffect(() => {
    if (open) {
      const initialSelections: Record<number, number[]> = {};
      item.addon_groups.forEach((group) => {
        initialSelections[group.id] = [];
      });
      setSelectedOptions(initialSelections);
      setQuantity(1);
    }
  }, [open, item]);

  const { totalPrice } = useMemo(() => {
    const originalItemPrice = parseFloat(item.price);
    const basePrice =
      item.discount_percent > 0
        ? originalItemPrice * (1 - item.discount_percent / 100)
        : originalItemPrice;

    const addOnsTotal = Object.entries(selectedOptions).reduce(
      (sum, [groupId, selectedAddonIds]) => {
        const group = item.addon_groups.find((g) => g.id === Number(groupId));
        if (!group) return sum;

        const groupTotal = selectedAddonIds.reduce((groupSum, addonId) => {
          const addon = group.addons.find((a) => a.id === addonId);
          return groupSum + (addon ? parseFloat(addon.price) : 0);
        }, 0);

        return sum + groupTotal;
      },
      0
    );

    return { totalPrice: (basePrice + addOnsTotal) * quantity };
  }, [item, selectedOptions, quantity]);

  const handleOptionToggle = (groupId: number, addonId: number) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[groupId] || [];
      const newSelections = currentSelections.includes(addonId)
        ? currentSelections.filter((id) => id !== addonId)
        : [...currentSelections, addonId];
      return {
        ...prev,
        [groupId]: newSelections,
      };
    });
  };

  const handleAddToCart = () => {
    const customizationsForCart = Object.entries(selectedOptions).flatMap(
      ([groupId, addonIds]) => {
        const group = item.addon_groups.find((g) => g.id === Number(groupId));
        return addonIds.map((addonId) => {
          const addon = group?.addons.find((a) => a.id === addonId);
          return {
            groupName: group?.name || "Unknown Group",
            selection: addon?.name || "Unknown Selection",
          };
        });
      }
    );

    const cartItemToAdd: CartItem = {
      id: String(item.id),
      name: item.name,
      price: totalPrice.toFixed(2),
      quantity: quantity,
      image: imageUrl,
      customizations: customizationsForCart,
    };

    addToCart(cartItemToAdd);

    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} has been added.`,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="aspect-video w-full overflow-hidden relative">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.discount_percent > 0 && (
            <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-600 text-white">
              {item.discount_percent}% OFF
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* --- UPDATED: Header now includes the Veg badge --- */}
          <DialogHeader className="p-0 text-left">
            <div className="flex justify-between items-start gap-2">
              <DialogTitle className="text-2xl sm:text-3xl font-serif">
                {item.name}
              </DialogTitle>
              {item.is_vegetarian && (
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                  >
                    <Leaf className="h-3.5 w-3.5 mr-1" />
                    Veg
                  </Badge>
                </div>
              )}
            </div>
          </DialogHeader>

          <p className="text-sm sm:text-base text-muted-foreground">
            {item.description}
          </p>

          {/* Dynamic customization options */}
          {item.addon_groups.map((group) => (
            <div key={group.id}>
              <h4 className="font-semibold mb-3 text-base sm:text-lg">
                {group.name}
              </h4>
              <div className="space-y-3">
                {group.addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`modal-addon-${group.id}-${addon.id}`}
                        checked={(selectedOptions[group.id] || []).includes(
                          addon.id
                        )}
                        onCheckedChange={() =>
                          handleOptionToggle(group.id, addon.id)
                        }
                      />
                      <Label
                        htmlFor={`modal-addon-${group.id}-${addon.id}`}
                        className="cursor-pointer"
                      >
                        {addon.name}
                      </Label>
                    </div>
                    {parseFloat(addon.price) > 0 && (
                      <span className="text-sm font-medium">
                        +${addon.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity selector */}
          <div>
            <h4 className="font-semibold mb-3 text-base sm:text-lg">
              Quantity
            </h4>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex-col sm:flex-row gap-3 p-6 bg-muted/50">
          <div className="flex items-center justify-between w-full gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Price</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="px-8 text-base"
            >
              Add {quantity} to Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
