import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Leaf, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ChefHat,
    title: "Authentic Recipes",
    description: "Traditional recipes passed down through generations, prepared with expertise and love.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source the finest, freshest ingredients daily to ensure quality in every bite.",
  },
  {
    icon: Clock,
    title: "Lightning Fast Delivery",
    description: "Hot, fresh meals delivered to your door in 30 minutes or less, guaranteed.",
  },
];

export function FeatureSection() {
  return (
    <section className="py-12 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="text-center hover-elevate h-full">
                <CardContent className="pt-8 pb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.2 + 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
                  >
                    <feature.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
