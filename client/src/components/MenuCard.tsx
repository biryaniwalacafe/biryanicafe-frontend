// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Star, Heart, Flame, Leaf } from "lucide-react";
// import type { MenuItem } from "@shared/schema";
// import { useCartStore } from "@/lib/store";
// import { useState } from "react";
// import { CustomizeModal } from "./CustomizeModal";
// import { motion } from "framer-motion";

// interface MenuCardProps {
//   item: MenuItem;
//   imageUrl: string;
//   index?: number;
// }

// export function MenuCard({ item, imageUrl, index = 0 }: MenuCardProps) {
//   const favorites = useCartStore((state) => state.favorites);
//   const toggleFavorite = useCartStore((state) => state.toggleFavorite);
//   const [showCustomize, setShowCustomize] = useState(false);
//   const isFavorite = favorites.includes(item.id);

//   const spiceIcons = Array.from({ length: item.spiceLevel }, (_, i) => i);

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, delay: index * 0.1 }}
//       >
//         <Card className="overflow-hidden hover-elevate group h-full flex flex-col">
//           <div className="relative aspect-[4/3] overflow-hidden">
//             <img
//               src={imageUrl}
//               alt={item.name}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             <motion.div
//               whileTap={{ scale: 0.9 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
//                 onClick={() => toggleFavorite(item.id)}
//                 data-testid={`button-favorite-${item.id}`}
//               >
//                 <Heart
//                   className={`h-5 w-5 transition-all ${
//                     isFavorite ? "fill-accent text-accent scale-110" : ""
//                   }`}
//                 />
//               </Button>
//             </motion.div>
//             {item.isVegetarian && (
//               <Badge className="absolute top-3 left-3 bg-green-600 dark:bg-green-700 text-white border-0 shadow-lg flex items-center gap-1">
//                 <Leaf className="h-3 w-3" />
//                 Veg
//               </Badge>
//             )}
//             <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
//               <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
//               <span
//                 className="text-xs font-semibold"
//                 data-testid={`text-rating-${item.id}`}
//               >
//                 {item.rating}
//               </span>
//             </div>
//           </div>

//           <CardContent className="p-5 flex-1 flex flex-col">
//             <div className="flex-1">
//               <h3
//                 className="font-serif font-bold text-xl mb-2 line-clamp-1"
//                 data-testid={`text-item-name-${item.id}`}
//               >
//                 {item.name}
//               </h3>

//               <p
//                 className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed"
//                 data-testid={`text-description-${item.id}`}
//               >
//                 {item.description}
//               </p>

//               {item.spiceLevel > 0 && (
//                 <div className="flex items-center gap-1 mb-4">
//                   {spiceIcons.map((i) => (
//                     <Flame
//                       key={i}
//                       className="h-3.5 w-3.5 fill-orange-500 text-orange-500"
//                     />
//                   ))}
//                   <span className="text-xs text-muted-foreground ml-1">
//                     {item.spiceLevel === 1
//                       ? "Mild"
//                       : item.spiceLevel === 2
//                       ? "Medium"
//                       : "Hot"}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center justify-between pt-2 border-t">
//               <div>
//                 <div className="text-sm text-muted-foreground">Price</div>
//                 <span
//                   className="text-2xl font-bold text-primary"
//                   data-testid={`text-price-${item.id}`}
//                 >
//                   ${item.price}
//                 </span>
//               </div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   size="lg"
//                   onClick={() => setShowCustomize(true)}
//                   data-testid={`button-add-to-cart-${item.id}`}
//                   className="font-semibold"
//                 >
//                   Add to Cart
//                 </Button>
//               </motion.div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <CustomizeModal
//         item={item}
//         imageUrl={imageUrl}
//         open={showCustomize}
//         onClose={() => setShowCustomize(false)}
//       />
//     </>
//   );
// }
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Flame, Leaf } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import { CustomizeModal } from "./CustomizeModal";
import { motion } from "framer-motion";

interface MenuCardProps {
  item: MenuItem;
  imageUrl: string;
  index?: number;
}

export function MenuCard({ item, imageUrl, index = 0 }: MenuCardProps) {
  const favorites = useCartStore((state) => state.favorites);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const [showCustomize, setShowCustomize] = useState(false);
  const isFavorite = favorites.includes(item.id);

  const spiceIcons = Array.from({ length: item.spiceLevel }, (_, i) => i);

  // Calculate discounted price
  const originalPrice = parseFloat(item.price);
  const hasDiscount = item.discountPercent > 0;
  const discountedPrice = hasDiscount
    ? (originalPrice * (1 - item.discountPercent / 100)).toFixed(2)
    : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className="overflow-hidden hover-elevate group h-full flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => toggleFavorite(item.id)}
                data-testid={`button-favorite-${item.id}`}
              >
                <Heart
                  className={`h-4 w-4 sm:h-5 sm:w-5 transition-all ${
                    isFavorite ? "fill-accent text-accent scale-110" : ""
                  }`}
                />
              </Button>
            </motion.div>

            {/* Discount Badge */}
            {hasDiscount && (
              <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 dark:bg-red-700 text-white border-0 shadow-lg font-bold text-xs sm:text-sm px-2 py-0.5">
                {item.discountPercent}% OFF
              </Badge>
            )}

            {/* Vegetarian Badge */}
            {item.isVegetarian && !hasDiscount && (
              <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-600 dark:bg-green-700 text-white border-0 shadow-lg flex items-center gap-1 text-xs sm:text-sm px-2 py-0.5">
                <Leaf className="h-3 w-3" />
                Veg
              </Badge>
            )}

            {/* Rating Badge */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
              <span
                className="text-xs font-semibold"
                data-testid={`text-rating-${item.id}`}
              >
                {item.rating}
              </span>
            </div>
          </div>

          <CardContent className="p-4 sm:p-5 flex-1 flex flex-col">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3
                  className="font-serif font-bold text-lg sm:text-xl line-clamp-1"
                  data-testid={`text-item-name-${item.id}`}
                >
                  {item.name}
                </h3>
                {item.isVegetarian && hasDiscount && (
                  <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-500 shrink-0" />
                )}
              </div>

              <p
                className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4 leading-relaxed"
                data-testid={`text-description-${item.id}`}
              >
                {item.description}
              </p>

              {item.spiceLevel > 0 && (
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {spiceIcons.map((i) => (
                    <Flame
                      key={i}
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-orange-500 text-orange-500"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {item.spiceLevel === 1
                      ? "Mild"
                      : item.spiceLevel === 2
                      ? "Medium"
                      : "Hot"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-1">Price</div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  {hasDiscount ? (
                    <>
                      <span
                        className="text-xl sm:text-2xl font-bold text-primary"
                        data-testid={`text-price-${item.id}`}
                      >
                        ${discountedPrice}
                      </span>
                      <span
                        className="text-sm sm:text-base text-muted-foreground line-through"
                        data-testid={`text-original-price-${item.id}`}
                      >
                        ${item.price}
                      </span>
                    </>
                  ) : (
                    <span
                      className="text-xl sm:text-2xl font-bold text-primary"
                      data-testid={`text-price-${item.id}`}
                    >
                      ${item.price}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <p className="text-xs text-green-600 dark:text-green-500 font-medium mt-0.5">
                    Save $
                    {(originalPrice - parseFloat(discountedPrice!)).toFixed(2)}
                  </p>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0"
              >
                <Button
                  size="default"
                  onClick={() => setShowCustomize(true)}
                  data-testid={`button-add-to-cart-${item.id}`}
                  className="font-semibold text-sm sm:text-base px-4 sm:px-6"
                >
                  Add to Cart
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <CustomizeModal
        item={item}
        imageUrl={imageUrl}
        open={showCustomize}
        onClose={() => setShowCustomize(false)}
      />
    </>
  );
}
