import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Truck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroBiryani from '@assets/generated_images/Hero_biryani_dish_61b2c449.png';

export function HeroSection() {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBiryani})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </motion.div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3 mb-6"
          >
            <Badge className="bg-background/20 backdrop-blur-md text-white border-white/20 hover:bg-background/30">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              4.8/5 from 2,000+ orders
            </Badge>
            <Badge className="bg-background/20 backdrop-blur-md text-white border-white/20 hover:bg-background/30">
              <Truck className="h-3 w-3 mr-1" />
              30-min delivery
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Authentic Biriyani,
            <br />
            Delivered Fresh
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-white/90 mb-8 max-w-lg"
          >
            Experience the rich flavors of traditional Indian cuisine crafted with authentic recipes and the finest ingredients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/menu">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-base px-8" data-testid="button-hero-order">
                  Order Now
                </Button>
              </motion.div>
            </Link>
            <Link href="/menu">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 bg-background/20 backdrop-blur-md text-white border-white/30 hover:bg-background/30"
                  data-testid="button-hero-menu"
                >
                  View Menu
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
