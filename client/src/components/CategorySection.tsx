import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import muttonBiryani from '@assets/generated_images/Mutton_biryani_menu_item_1b68aefe.png';
import samosas from '@assets/generated_images/Samosas_starter_856e48c6.png';
import butterChicken from '@assets/generated_images/Butter_chicken_main_course_0231f8df.png';
import lassi from '@assets/generated_images/Mango_lassi_beverage_8906f161.png';

const categories = [
  { name: "Signature Biriyani", image: muttonBiryani, filter: "Biriyani" },
  { name: "Starters", image: samosas, filter: "Starters" },
  { name: "Main Course", image: butterChicken, filter: "Main Course" },
  { name: "Beverages", image: lassi, filter: "Beverages" },
];

export function CategorySection() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Explore Our Menu
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/menu?category=${category.filter}`}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="overflow-hidden hover-elevate group cursor-pointer h-64 border-2 border-transparent hover:border-primary/20 transition-colors">
                    <div className="relative h-full">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-2xl font-bold text-white" data-testid={`text-category-${category.filter}`}>
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
