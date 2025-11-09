import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    categories: string[];
    priceRange: number[];
    dietary: string[];
    minRating: number;
  };
  onFilterChange: (filters: any) => void;
  onClear: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const categoryOptions = ["Biriyani", "Starters", "Main Course", "Beverages", "Desserts"];
const dietaryOptions = ["Vegetarian", "Gluten-Free", "Dairy-Free"];

export function FilterSidebar({ filters, onFilterChange, onClear, isMobile, onClose }: FilterSidebarProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    const newDietary = checked
      ? [...filters.dietary, dietary]
      : filters.dietary.filter((d) => d !== dietary);
    onFilterChange({ ...filters, dietary: newDietary });
  };

  return (
    <Card className={isMobile ? "h-full" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-filters">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base font-semibold mb-3 block">Categories</Label>
          <div className="space-y-3">
            {categoryOptions.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                  data-testid={`checkbox-category-${category}`}
                />
                <Label htmlFor={`category-${category}`} className="font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Label>
          <Slider
            min={0}
            max={30}
            step={1}
            value={filters.priceRange}
            onValueChange={(value) =>
              onFilterChange({ ...filters, priceRange: value })
            }
            className="mt-2"
            data-testid="slider-price-range"
          />
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">Dietary Preferences</Label>
          <div className="space-y-3">
            {dietaryOptions.map((dietary) => (
              <div key={dietary} className="flex items-center space-x-2">
                <Checkbox
                  id={`dietary-${dietary}`}
                  checked={filters.dietary.includes(dietary)}
                  onCheckedChange={(checked) =>
                    handleDietaryChange(dietary, checked as boolean)
                  }
                  data-testid={`checkbox-dietary-${dietary}`}
                />
                <Label htmlFor={`dietary-${dietary}`} className="font-normal cursor-pointer">
                  {dietary}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            Minimum Rating: {filters.minRating}★
          </Label>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filters.minRating]}
            onValueChange={(value) =>
              onFilterChange({ ...filters, minRating: value[0] })
            }
            className="mt-2"
            data-testid="slider-rating"
          />
        </div>

        <Button variant="outline" className="w-full" onClick={onClear} data-testid="button-clear-filters">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
}
