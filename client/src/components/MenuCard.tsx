import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Flame } from "lucide-react";
import type { MenuItem } from "@shared/schema";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import { CustomizeModal } from "./CustomizeModal";

interface MenuCardProps {
  item: MenuItem;
  imageUrl: string;
}

export function MenuCard({ item, imageUrl }: MenuCardProps) {
  const favorites = useCartStore((state) => state.favorites);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const [showCustomize, setShowCustomize] = useState(false);
  const isFavorite = favorites.includes(item.id);

  const spiceIcons = Array.from({ length: item.spiceLevel }, (_, i) => i);

  return (
    <>
      <Card className="overflow-hidden hover-elevate group">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => toggleFavorite(item.id)}
            data-testid={`button-favorite-${item.id}`}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`}
            />
          </Button>
          {item.isVegetarian && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white">
              Veg
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg" data-testid={`text-item-name-${item.id}`}>
              {item.name}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span data-testid={`text-rating-${item.id}`}>{item.rating}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`text-description-${item.id}`}>
            {item.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            {spiceIcons.map((i) => (
              <Flame key={i} className="h-4 w-4 text-orange-500" />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${item.id}`}>
              ${item.price}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => setShowCustomize(true)}
            data-testid={`button-add-to-cart-${item.id}`}
          >
            Customize & Add
          </Button>
        </CardFooter>
      </Card>

      <CustomizeModal
        item={item}
        imageUrl={imageUrl}
        open={showCustomize}
        onClose={() => setShowCustomize(false)}
      />
    </>
  );
}
