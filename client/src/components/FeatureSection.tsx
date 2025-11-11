// import { Card, CardContent } from "@/components/ui/card";
// import { ChefHat, Leaf, Clock } from "lucide-react";
// import { motion } from "framer-motion";

// const features = [
//   {
//     icon: ChefHat,
//     title: "Authentic Recipes",
//     description: "Traditional recipes passed down through generations, prepared with expertise and love.",
//   },
//   {
//     icon: Leaf,
//     title: "Fresh Ingredients",
//     description: "We source the finest, freshest ingredients daily to ensure quality in every bite.",
//   },
//   {
//     icon: Clock,
//     title: "Lightning Fast Delivery",
//     description: "Hot, fresh meals delivered to your door in 30 minutes or less, guaranteed.",
//   },
// ];

// export function FeatureSection() {
//   return (
//     <section className="py-12 md:py-20 bg-card">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="font-serif text-3xl md:text-4xl font-bold text-center mb-12"
//         >
//           Why Choose Us
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//             >
//               <Card className="text-center hover-elevate h-full">
//                 <CardContent className="pt-8 pb-8">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 200, delay: index * 0.2 + 0.3 }}
//                     className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
//                   >
//                     <feature.icon className="h-8 w-8 text-primary" />
//                   </motion.div>
//                   <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Leaf, Clock, Flame, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ChefHat,
    title: "Authentic Recipes",
    description:
      "Traditional recipes passed down through generations, prepared with expertise and love.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Flame,
    title: "Premium Spices",
    description:
      "We source the finest, authentic spices and freshest ingredients daily to ensure quality.",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Hot, fresh meals delivered to your door in 30 minutes or less, guaranteed.",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
];

export function FeatureSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_50%,_transparent_20%,_hsl(var(--primary))_21%,_hsl(var(--primary))_24%,_transparent_25%)] bg-[length:80px_80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="h-[1px] w-8 bg-primary" />
            <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
              Our Promise
            </span>
            <div className="h-[1px] w-8 bg-primary" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
            Why Choose Biryaniwala & Cafe
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-light">
            Experience the perfect blend of tradition, quality, and convenience
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="text-center border border-border/50 hover:border-primary/30 transition-all duration-500 h-full group relative overflow-hidden shadow-lg hover:shadow-2xl bg-card/80 backdrop-blur-sm">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <CardContent className="pt-10 pb-10 px-6 relative z-10">
                    {/* Animated Icon Container */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.15 + 0.3,
                        duration: 0.8,
                      }}
                      className="relative inline-block mb-6"
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative overflow-hidden`}
                      >
                        {/* Icon shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <feature.icon
                          className={`h-10 w-10 ${feature.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-300`}
                        />
                      </div>

                      {/* Decorative ring */}
                      <div
                        className={`absolute inset-0 rounded-2xl border-2 ${feature.iconColor} opacity-0 group-hover:opacity-20 scale-100 group-hover:scale-125 transition-all duration-500`}
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Decorative bottom accent */}
                    <div className="mt-6 flex justify-center">
                      <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Heart className="h-4 w-4 fill-primary text-primary" />
            <span>Crafted with passion, served with pride</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
