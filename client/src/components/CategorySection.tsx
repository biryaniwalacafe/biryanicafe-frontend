import { Card } from "@/components/ui/card";
import { Link } from "wouter";
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
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Menu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/menu?category=${category.filter}`}>
              <a>
                <Card className="overflow-hidden hover-elevate group cursor-pointer h-64">
                  <div className="relative h-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl font-bold text-white" data-testid={`text-category-${category.filter}`}>
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
