// import { Card } from "@/components/ui/card";
// import { Link } from "wouter";
// import { motion } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import muttonBiryani from "@assets/generated_images/Mutton_biryani_menu_item_1b68aefe.png";
// import samosas from "@assets/generated_images/Samosas_starter_856e48c6.png";
// import butterChicken from "@assets/generated_images/Butter_chicken_main_course_0231f8df.png";
// import lassi from "@assets/generated_images/Mango_lassi_beverage_8906f161.png";
// import gulabJamun from "@assets/generated_images/Gulab_jamun_dessert_7d3d6433.png";
// import tandoori from "@assets/generated_images/Tandoori_chicken_starter_3431ab7f.png";
// import vegBiryani from "@assets/generated_images/Vegetable_biryani_menu_item_f9e7be5b.png";
// import heroBiryani from "@assets/generated_images/Hero_biryani_dish_61b2c449.png";

// // Categories based on the actual menu
// const categories = [
//   {
//     name: "Signature Biryani's",
//     image: heroBiryani,
//     filter: "Biriyani",
//     description: "Aromatic rice with layers of flavor",
//     icon: "🍚",
//   },
//   {
//     name: "Burgers & Sandwiches",
//     image: samosas,
//     filter: "Burgers",
//     description: "Juicy burgers and fresh sandwiches",
//     icon: "🍔",
//   },
//   {
//     name: "Snacks & Appetizers",
//     image: samosas,
//     filter: "Starters",
//     description: "Perfect bites to start your meal",
//     icon: "🥟",
//   },
//   {
//     name: "Signature Curry Selections",
//     image: butterChicken,
//     filter: "Main Course",
//     description: "Rich, flavorful curry dishes",
//     icon: "🍛",
//   },
//   {
//     name: "Rice Specialties",
//     image: vegBiryani,
//     filter: "Rice",
//     description: "Biryani, Jeera & Mango Rice",
//     icon: "🍚",
//   },
//   {
//     name: "Hot Beverages",
//     image: lassi,
//     filter: "Hot Drinks",
//     description: "Cappuccino, Latte, Tea & more",
//     icon: "☕",
//   },
//   {
//     name: "Cold Beverages",
//     image: lassi,
//     filter: "Cold Drinks",
//     description: "Refreshing drinks & smoothies",
//     icon: "🥤",
//   },
//   {
//     name: "Milkshakes",
//     image: lassi,
//     filter: "Milkshakes",
//     description: "Creamy and delicious shakes",
//     icon: "🥛",
//   },
//   {
//     name: "Ice Cream",
//     image: gulabJamun,
//     filter: "Ice Cream",
//     description: "Sweet frozen treats",
//     icon: "🍨",
//   },
//   {
//     name: "Desserts",
//     image: gulabJamun,
//     filter: "Desserts",
//     description: "Sweet endings to your meal",
//     icon: "🍰",
//   },
// ];

// export function CategorySection() {
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [carouselWidth, setCarouselWidth] = useState(0);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   useEffect(() => {
//     if (carouselRef.current) {
//       const scrollWidth = carouselRef.current.scrollWidth;
//       const clientWidth = carouselRef.current.clientWidth;
//       setCarouselWidth(scrollWidth - clientWidth);

//       // Check initial arrow visibility
//       setShowRightArrow(scrollWidth > clientWidth);
//     }

//     const handleResize = () => {
//       if (carouselRef.current) {
//         const scrollWidth = carouselRef.current.scrollWidth;
//         const clientWidth = carouselRef.current.clientWidth;
//         setCarouselWidth(scrollWidth - clientWidth);
//         setShowRightArrow(scrollWidth > clientWidth);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleScroll = () => {
//     if (carouselRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
//       setShowLeftArrow(scrollLeft > 10);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   const scroll = (direction: "left" | "right") => {
//     if (carouselRef.current) {
//       const scrollAmount = carouselRef.current.clientWidth * 0.8;
//       const newScrollLeft =
//         direction === "left"
//           ? carouselRef.current.scrollLeft - scrollAmount
//           : carouselRef.current.scrollLeft + scrollAmount;

//       carouselRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className="py-12 md:py-20 bg-gradient-to-b from-background to-card/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//             Explore Our Menu
//           </h2>
//           <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
//             Discover authentic Indian-Pakistani cuisine with our diverse
//             selection of dishes
//           </p>
//         </motion.div>

//         <div className="relative group">
//           {/* Left Arrow */}
//           {showLeftArrow && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block"
//             >
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => scroll("left")}
//                 className="h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2"
//                 aria-label="Scroll left"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </Button>
//             </motion.div>
//           )}

//           {/* Right Arrow */}
//           {showRightArrow && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block"
//             >
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => scroll("right")}
//                 className="h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2"
//                 aria-label="Scroll right"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </Button>
//             </motion.div>
//           )}

//           {/* Carousel Container */}
//           <div
//             ref={carouselRef}
//             className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-2 md:px-12"
//             onScroll={handleScroll}
//             style={{
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//               WebkitOverflowScrolling: "touch",
//             }}
//           >
//             <div className="flex gap-4 md:gap-6 py-4">
//               {categories.map((category, index) => (
//                 <motion.div
//                   key={category.name}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.08 }}
//                   className="flex-shrink-0 w-72 sm:w-80"
//                 >
//                   <Link href={`/menu?category=${category.filter}`}>
//                     <motion.div
//                       whileHover={{ y: -8, scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         damping: 20,
//                       }}
//                     >
//                       <Card className="overflow-hidden hover-elevate group cursor-pointer h-72 border-2 border-transparent hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
//                         <div className="relative h-full">
//                           {/* Image with overlay */}
//                           <img
//                             src={category.image}
//                             alt={category.name}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
//                           />

//                           {/* Gradient Overlay */}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

//                           {/* Icon Badge */}
//                           <motion.div
//                             className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
//                             whileHover={{ rotate: 360, scale: 1.1 }}
//                             transition={{ duration: 0.6 }}
//                           >
//                             <span className="text-2xl" aria-hidden="true">
//                               {category.icon}
//                             </span>
//                           </motion.div>

//                           {/* Content */}
//                           <div className="absolute bottom-0 left-0 right-0 p-6">
//                             <motion.div
//                               initial={{ y: 20, opacity: 0 }}
//                               whileInView={{ y: 0, opacity: 1 }}
//                               transition={{ delay: 0.2 }}
//                             >
//                               <h3
//                                 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors"
//                                 data-testid={`text-category-${category.filter}`}
//                               >
//                                 {category.name}
//                               </h3>
//                               <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors line-clamp-2">
//                                 {category.description}
//                               </p>

//                               {/* View Menu Button */}
//                               <motion.div
//                                 className="mt-4 inline-flex items-center gap-2 text-primary-foreground font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
//                                 whileHover={{ x: 5 }}
//                               >
//                                 <span>View Menu</span>
//                                 <ChevronRight className="h-4 w-4" />
//                               </motion.div>
//                             </motion.div>
//                           </div>

//                           {/* Shine Effect */}
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
//                         </div>
//                       </Card>
//                     </motion.div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="md:hidden text-center mt-6 text-sm text-muted-foreground"
//         >
//           <p className="flex items-center justify-center gap-2">
//             <span>← Swipe to explore →</span>
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import muttonBiryani from "@assets/generated_images/Mutton_biryani_menu_item_1b68aefe.png";
import samosas from "@assets/generated_images/Samosas_starter_856e48c6.png";
import butterChicken from "@assets/generated_images/Butter_chicken_main_course_0231f8df.png";
import lassi from "@assets/generated_images/Mango_lassi_beverage_8906f161.png";
import gulabJamun from "@assets/generated_images/Gulab_jamun_dessert_7d3d6433.png";
import tandoori from "@assets/generated_images/Tandoori_chicken_starter_3431ab7f.png";
import vegBiryani from "@assets/generated_images/Vegetable_biryani_menu_item_f9e7be5b.png";
import heroBiryani from "@assets/generated_images/Hero_biryani_dish_61b2c449.png";

// Categories based on the actual menu
const categories = [
  {
    name: "Signature Biryani's",
    image: heroBiryani,
    filter: "Biriyani",
    description: "Aromatic rice with layers of flavor",
    icon: "🍚",
  },
  {
    name: "Burgers & Sandwiches",
    image: samosas,
    filter: "Burgers",
    description: "Juicy burgers and fresh sandwiches",
    icon: "🍔",
  },
  {
    name: "Snacks & Appetizers",
    image: samosas,
    filter: "Starters",
    description: "Perfect bites to start your meal",
    icon: "🥟",
  },
  {
    name: "Signature Curry Selections",
    image: butterChicken,
    filter: "Main Course",
    description: "Rich, flavorful curry dishes",
    icon: "🍛",
  },
  {
    name: "Rice Specialties",
    image: vegBiryani,
    filter: "Rice",
    description: "Biryani, Jeera & Mango Rice",
    icon: "🍚",
  },
  {
    name: "Hot Beverages",
    image: lassi,
    filter: "Hot Drinks",
    description: "Cappuccino, Latte, Tea & more",
    icon: "☕",
  },
  {
    name: "Cold Beverages",
    image: lassi,
    filter: "Cold Drinks",
    description: "Refreshing drinks & smoothies",
    icon: "🥤",
  },
  {
    name: "Milkshakes",
    image: lassi,
    filter: "Milkshakes",
    description: "Creamy and delicious shakes",
    icon: "🥛",
  },
  {
    name: "Ice Cream",
    image: gulabJamun,
    filter: "Ice Cream",
    description: "Sweet frozen treats",
    icon: "🍨",
  },
  {
    name: "Desserts",
    image: gulabJamun,
    filter: "Desserts",
    description: "Sweet endings to your meal",
    icon: "🍰",
  },
];

export function CategorySection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"right" | "left">(
    "right"
  );
  const autoScrollRef = useRef<number | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;
      setCarouselWidth(scrollWidth - clientWidth);
      setShowRightArrow(scrollWidth > clientWidth);
    }

    const handleResize = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        setCarouselWidth(scrollWidth - clientWidth);
        setShowRightArrow(scrollWidth > clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }

      const autoScroll = () => {
        if (!carouselRef.current || isHovered) {
          autoScrollRef.current = requestAnimationFrame(autoScroll);
          return;
        }

        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const scrollSpeed = 1; // Pixels per frame

        // Check boundaries and reverse direction
        if (scrollDirection === "right") {
          if (scrollLeft >= maxScroll - 5) {
            setScrollDirection("left");
          } else {
            carouselRef.current.scrollLeft += scrollSpeed;
          }
        } else {
          if (scrollLeft <= 5) {
            setScrollDirection("right");
          } else {
            carouselRef.current.scrollLeft -= scrollSpeed;
          }
        }

        autoScrollRef.current = requestAnimationFrame(autoScroll);
      };

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll after a short delay
    const timer = setTimeout(startAutoScroll, 1000);

    return () => {
      clearTimeout(timer);
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isHovered, scrollDirection]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Explore Our Menu
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Discover authentic Indian-Pakistani cuisine with our diverse
            selection of dishes
          </p>
        </motion.div>

        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          )}

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-2 md:px-12"
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-4 md:gap-6 py-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex-shrink-0 w-72 sm:w-80"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={`/menu?category=${category.filter}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Card className="overflow-hidden hover-elevate group cursor-pointer h-72 border-2 border-transparent hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <div className="relative h-full">
                          {/* Image with overlay */}
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                          {/* Icon Badge */}
                          <motion.div
                            className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <span className="text-2xl" aria-hidden="true">
                              {category.icon}
                            </span>
                          </motion.div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h3
                                className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors"
                                data-testid={`text-category-${category.filter}`}
                              >
                                {category.name}
                              </h3>
                              <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors line-clamp-2">
                                {category.description}
                              </p>

                              {/* View Menu Button */}
                              <motion.div
                                className="mt-4 inline-flex items-center gap-2 text-primary-foreground font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ x: 5 }}
                              >
                                <span>View Menu</span>
                                <ChevronRight className="h-4 w-4" />
                              </motion.div>
                            </motion.div>
                          </div>

                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="md:hidden text-center mt-6 text-sm text-muted-foreground"
        >
          <p className="flex items-center justify-center gap-2">
            <span>← Swipe to explore →</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
