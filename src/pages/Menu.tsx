// import { useState, useMemo } from "react";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { MenuCard } from "@/components/MenuCard";
// import { FilterSidebar } from "@/components/FilterSidebar";
// import { SearchBar } from "@/components/SearchBar";
// import { Button } from "@/components/ui/button";
// import { SlidersHorizontal } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import heroBiryani from "@assets/generated_images/Hero_biryani_dish_61b2c449.png";
// import muttonBiryani from "@assets/generated_images/Mutton_biryani_menu_item_1b68aefe.png";
// import vegBiryani from "@assets/generated_images/Vegetable_biryani_menu_item_f9e7be5b.png";
// import samosas from "@assets/generated_images/Samosas_starter_856e48c6.png";
// import tandoori from "@assets/generated_images/Tandoori_chicken_starter_3431ab7f.png";
// import butterChicken from "@assets/generated_images/Butter_chicken_main_course_0231f8df.png";
// import lassi from "@assets/generated_images/Mango_lassi_beverage_8906f161.png";
// import gulabJamun from "@assets/generated_images/Gulab_jamun_dessert_7d3d6433.png";

// const menuItems = [
//   {
//     id: "1",
//     name: "Chicken Biryani",
//     description:
//       "Aromatic basmati rice layered with tender chicken, saffron, and traditional spices",
//     price: "12.99",
//     discountPercent: 10,
//     category: "Biriyani",
//     image: heroBiryani,
//     isVegetarian: false,
//     spiceLevel: 3,
//     rating: "4.8",
//     isAvailable: true,
//     dietaryInfo: ["Gluten-Free"],
//     customize: true,
//   },
//   {
//     id: "2",
//     name: "Mutton Biryani",
//     description:
//       "Premium mutton cooked with fragrant rice, whole spices, and garnished with fried onions",
//     price: "15.99",
//     discountPercent: 15,
//     category: "Biriyani",
//     image: muttonBiryani,
//     isVegetarian: false,
//     spiceLevel: 4,
//     rating: "4.9",
//     isAvailable: true,
//     dietaryInfo: ["Gluten-Free"],
//     customize: true,
//   },
//   {
//     id: "3",
//     name: "Vegetable Biryani",
//     description:
//       "Fresh mixed vegetables and paneer with aromatic basmati rice and herbs",
//     price: "10.99",
//     discountPercent: 5,
//     category: "Biriyani",
//     image: vegBiryani,
//     isVegetarian: true,
//     spiceLevel: 2,
//     rating: "4.6",
//     isAvailable: true,
//     dietaryInfo: ["Vegetarian", "Gluten-Free"],
//     customize: true,
//   },
//   {
//     id: "4",
//     name: "Chicken Samosa (3 pcs)",
//     description: "Crispy golden pastry filled with spiced chicken and herbs",
//     price: "5.99",
//     discountPercent: 0,
//     category: "Starters",
//     image: samosas,
//     isVegetarian: false,
//     spiceLevel: 2,
//     rating: "4.7",
//     isAvailable: true,
//     dietaryInfo: null,
//     customize: true,
//   },
//   {
//     id: "5",
//     name: "Tandoori Chicken",
//     description: "Marinated chicken roasted in tandoor with authentic spices",
//     price: "13.99",
//     discountPercent: 10,
//     category: "Starters",
//     image: tandoori,
//     isVegetarian: false,
//     spiceLevel: 3,
//     rating: "4.8",
//     isAvailable: true,
//     dietaryInfo: ["Gluten-Free", "Dairy-Free"],
//     customize: true,
//   },
//   {
//     id: "6",
//     name: "Butter Chicken",
//     description:
//       "Tender chicken in creamy tomato-based curry with butter and cream",
//     price: "14.99",
//     discountPercent: 20,
//     category: "Main Course",
//     image: butterChicken,
//     isVegetarian: false,
//     spiceLevel: 2,
//     rating: "4.9",
//     isAvailable: true,
//     dietaryInfo: ["Gluten-Free"],
//     customize: true,
//   },
//   {
//     id: "7",
//     name: "Mango Lassi",
//     description: "Refreshing yogurt drink blended with ripe mangoes",
//     price: "4.99",
//     discountPercent: 0,
//     category: "Beverages",
//     image: lassi,
//     isVegetarian: true,
//     spiceLevel: 0,
//     rating: "4.7",
//     isAvailable: true,
//     dietaryInfo: ["Vegetarian", "Gluten-Free"],
//   },
//   {
//     id: "8",
//     name: "Gulab Jamun (4 pcs)",
//     description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
//     price: "6.99",
//     discountPercent: 10,
//     category: "Desserts",
//     image: gulabJamun,
//     isVegetarian: true,
//     spiceLevel: 0,
//     rating: "4.8",
//     isAvailable: true,
//     dietaryInfo: ["Vegetarian"],
//   },
// ];

// export default function Menu() {
//   const [filters, setFilters] = useState({
//     categories: [] as string[],
//     priceRange: [0, 30],
//     dietary: [] as string[],
//     minRating: 0,
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredItems = useMemo(() => {
//     return menuItems.filter((item) => {
//       if (
//         filters.categories.length > 0 &&
//         !filters.categories.includes(item.category)
//       ) {
//         return false;
//       }

//       const price = parseFloat(item.price);
//       if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
//         return false;
//       }

//       if (filters.dietary.length > 0) {
//         const itemDietary = item.dietaryInfo || [];
//         const hasAllDietary = filters.dietary.every((d) =>
//           itemDietary.includes(d)
//         );
//         if (!hasAllDietary) return false;
//       }

//       const rating = parseFloat(item.rating);
//       if (rating < filters.minRating) {
//         return false;
//       }

//       if (
//         searchQuery &&
//         !item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       ) {
//         return false;
//       }

//       return true;
//     });
//   }, [filters, searchQuery]);

//   const clearFilters = () => {
//     setFilters({
//       categories: [],
//       priceRange: [0, 30],
//       dietary: [],
//       minRating: 0,
//     });
//     setSearchQuery("");
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <div className="bg-card border-b border-card-border">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//             <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
//               Our Menu
//             </h1>
//             <div className="flex items-center gap-2 sm:gap-4">
//               <div className="flex-1">
//                 <SearchBar onSearch={setSearchQuery} />
//               </div>
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="md:hidden shrink-0"
//                     data-testid="button-open-filters"
//                   >
//                     <SlidersHorizontal className="h-5 w-5" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left" className="w-80 p-0">
//                   <FilterSidebar
//                     filters={filters}
//                     onFilterChange={setFilters}
//                     onClear={clearFilters}
//                     isMobile
//                   />
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
//             <aside className="hidden md:block md:w-64 lg:w-80 flex-shrink-0">
//               <div className="sticky top-20">
//                 <FilterSidebar
//                   filters={filters}
//                   onFilterChange={setFilters}
//                   onClear={clearFilters}
//                 />
//               </div>
//             </aside>

//             <div className="flex-1 min-w-0">
//               <p
//                 className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base"
//                 data-testid="text-results-count"
//               >
//                 Showing {filteredItems.length} of {menuItems.length} items
//               </p>

//               {filteredItems.length === 0 ? (
//                 <div className="text-center py-12">
//                   <p className="text-muted-foreground text-base sm:text-lg">
//                     No items found matching your filters.
//                   </p>
//                   <Button
//                     variant="outline"
//                     className="mt-4"
//                     onClick={clearFilters}
//                     data-testid="button-clear-all"
//                   >
//                     Clear All Filters
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
//                   {filteredItems.map((item, index) => (
//                     <MenuCard
//                       key={item.id}
//                       item={item}
//                       imageUrl={item.image}
//                       index={index}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import api from "@/lib/api";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuCard } from "@/components/MenuCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { MenuItem, Category, DietaryInfo } from "@/types/menu";

// Custom hook for debouncing search input to avoid excessive API calls
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

//const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Menu() {
  // --- State for data fetched from API ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dietaryOptions, setDietaryOptions] = useState<DietaryInfo[]>([]);

  // --- State for filters and UI ---
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [1, 50], // Default price range
    dietary: [] as string[],
    minRating: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search query to prevent API calls on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // --- Effect to fetch filter options (Categories, Dietary Info) on component mount ---
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [catRes, dietaryRes] = await Promise.all([
          // axios.get(`${API_BASE_URL}/categories/`),
          // axios.get(`${API_BASE_URL}/dietary-info/`),
          api.get("/categories/"),
          api.get("/dietary-info/"),
        ]);
        setCategories(catRes.data);
        setDietaryOptions(dietaryRes.data);
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
        setError("Could not load filter options. Please try again later.");
      }
    };
    fetchFilterOptions();
  }, []);

  // --- Effect to fetch menu items whenever filters or search query change ---
  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);
      setError(null);

      // Build query parameters for the API call
      const params = new URLSearchParams();
      if (debouncedSearchQuery) params.append("search", debouncedSearchQuery);
      if (filters.categories.length > 0)
        params.append("categories", filters.categories.join(","));
      if (filters.dietary.length > 0)
        params.append("dietary", filters.dietary.join(","));
      if (filters.minRating > 0)
        params.append("min_rating", String(filters.minRating));
      params.append("min_price", String(filters.priceRange[0]));
      params.append("max_price", String(filters.priceRange[1]));

      try {
        //const response = await axios.get(`${API_BASE_URL}/menu/`, { params });
        const response = await api.get("/menu/", { params });
        setMenuItems(response.data);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError("Could not load the menu. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [filters, debouncedSearchQuery]);

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 50],
      dietary: [],
      minRating: 0,
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header and Search Bar */}
        <div className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-serif text-4xl font-bold mb-6">Our Menu</h1>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden shrink-0"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onClear={clearFilters}
                    isMobile
                    categories={categories}
                    dietaryOptions={dietaryOptions}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block md:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClear={clearFilters}
                  categories={categories}
                  dietaryOptions={dietaryOptions}
                />
              </div>
            </aside>

            {/* Menu Grid */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500 font-semibold">
                  {error}
                </div>
              ) : menuItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No items found matching your filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-6">
                    Showing {menuItems.length} items
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                      <MenuCard key={item.id} item={item} index={index} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
