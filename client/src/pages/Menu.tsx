import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuCard } from "@/components/MenuCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import heroBiryani from '@assets/generated_images/Hero_biryani_dish_61b2c449.png';
import muttonBiryani from '@assets/generated_images/Mutton_biryani_menu_item_1b68aefe.png';
import vegBiryani from '@assets/generated_images/Vegetable_biryani_menu_item_f9e7be5b.png';
import samosas from '@assets/generated_images/Samosas_starter_856e48c6.png';
import tandoori from '@assets/generated_images/Tandoori_chicken_starter_3431ab7f.png';
import butterChicken from '@assets/generated_images/Butter_chicken_main_course_0231f8df.png';
import lassi from '@assets/generated_images/Mango_lassi_beverage_8906f161.png';
import gulabJamun from '@assets/generated_images/Gulab_jamun_dessert_7d3d6433.png';

const menuItems = [
  { id: "1", name: "Chicken Biryani", description: "Aromatic basmati rice layered with tender chicken, saffron, and traditional spices", price: "12.99", category: "Biriyani", image: heroBiryani, isVegetarian: false, spiceLevel: 3, rating: "4.8", isAvailable: true, dietaryInfo: ["Gluten-Free"] },
  { id: "2", name: "Mutton Biryani", description: "Premium mutton cooked with fragrant rice, whole spices, and garnished with fried onions", price: "15.99", category: "Biriyani", image: muttonBiryani, isVegetarian: false, spiceLevel: 4, rating: "4.9", isAvailable: true, dietaryInfo: ["Gluten-Free"] },
  { id: "3", name: "Vegetable Biryani", description: "Fresh mixed vegetables and paneer with aromatic basmati rice and herbs", price: "10.99", category: "Biriyani", image: vegBiryani, isVegetarian: true, spiceLevel: 2, rating: "4.6", isAvailable: true, dietaryInfo: ["Vegetarian", "Gluten-Free"] },
  { id: "4", name: "Chicken Samosa (3 pcs)", description: "Crispy golden pastry filled with spiced chicken and herbs", price: "5.99", category: "Starters", image: samosas, isVegetarian: false, spiceLevel: 2, rating: "4.7", isAvailable: true, dietaryInfo: null },
  { id: "5", name: "Tandoori Chicken", description: "Marinated chicken roasted in tandoor with authentic spices", price: "13.99", category: "Starters", image: tandoori, isVegetarian: false, spiceLevel: 3, rating: "4.8", isAvailable: true, dietaryInfo: ["Gluten-Free", "Dairy-Free"] },
  { id: "6", name: "Butter Chicken", description: "Tender chicken in creamy tomato-based curry with butter and cream", price: "14.99", category: "Main Course", image: butterChicken, isVegetarian: false, spiceLevel: 2, rating: "4.9", isAvailable: true, dietaryInfo: ["Gluten-Free"] },
  { id: "7", name: "Mango Lassi", description: "Refreshing yogurt drink blended with ripe mangoes", price: "4.99", category: "Beverages", image: lassi, isVegetarian: true, spiceLevel: 0, rating: "4.7", isAvailable: true, dietaryInfo: ["Vegetarian", "Gluten-Free"] },
  { id: "8", name: "Gulab Jamun (4 pcs)", description: "Soft milk dumplings soaked in rose-flavored sugar syrup", price: "6.99", category: "Desserts", image: gulabJamun, isVegetarian: true, spiceLevel: 0, rating: "4.8", isAvailable: true, dietaryInfo: ["Vegetarian"] },
];

export default function Menu() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 30],
    dietary: [] as string[],
    minRating: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }
      
      const price = parseFloat(item.price);
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      if (filters.dietary.length > 0) {
        const itemDietary = item.dietaryInfo || [];
        const hasAllDietary = filters.dietary.every((d) => itemDietary.includes(d));
        if (!hasAllDietary) return false;
      }

      const rating = parseFloat(item.rating);
      if (rating < filters.minRating) {
        return false;
      }

      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 30],
      dietary: [],
      minRating: 0,
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-card border-b border-card-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-serif text-4xl font-bold mb-6">Our Menu</h1>
            <div className="flex items-center gap-4">
              <SearchBar onSearch={setSearchQuery} />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden" data-testid="button-open-filters">
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onClear={clearFilters}
                    isMobile
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <aside className="hidden md:block w-80 flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClear={clearFilters}
                />
              </div>
            </aside>

            <div className="flex-1">
              <p className="text-muted-foreground mb-6" data-testid="text-results-count">
                Showing {filteredItems.length} of {menuItems.length} items
              </p>
              
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No items found matching your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters} data-testid="button-clear-all">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <MenuCard key={item.id} item={item} imageUrl={item.image} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
