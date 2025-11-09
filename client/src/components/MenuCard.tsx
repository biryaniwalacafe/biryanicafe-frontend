import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Flame } from "lucide-react";
import type { MenuItem } from "@shared/schema";
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
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
                className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                onClick={() => toggleFavorite(item.id)}
                data-testid={`button-favorite-${item.id}`}
              >
                <Heart
                  className={`h-5 w-5 transition-all ${
                    isFavorite ? "fill-accent text-accent scale-110" : ""
                  }`}
                />
              </Button>
            </motion.div>
            {item.isVegetarian && (
              <Badge className="absolute top-3 left-3 bg-green-600 dark:bg-green-700 text-white border-0 shadow-lg">
                🌱 Veg
              </Badge>
            )}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold" data-testid={`text-rating-${item.id}`}>
                {item.rating}
              </span>
            </div>
          </div>

          <CardContent className="p-5 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="font-serif font-bold text-xl mb-2 line-clamp-1" data-testid={`text-item-name-${item.id}`}>
                {item.name}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed" data-testid={`text-description-${item.id}`}>
                {item.description}
              </p>

              {item.spiceLevel > 0 && (
                <div className="flex items-center gap-1 mb-4">
                  {spiceIcons.map((i) => (
                    <Flame key={i} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {item.spiceLevel === 1 ? "Mild" : item.spiceLevel === 2 ? "Medium" : "Hot"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <span className="text-2xl font-bold text-primary" data-testid={`text-price-${item.id}`}>
                  ${item.price}
                </span>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => setShowCustomize(true)}
                  data-testid={`button-add-to-cart-${item.id}`}
                  className="font-semibold"
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
