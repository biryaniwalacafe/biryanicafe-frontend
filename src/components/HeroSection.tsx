// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Star, Award, Clock } from "lucide-react";
// import { Link } from "wouter";
// import { motion } from "framer-motion";
// import heroBiryani from "@assets/generated_images/Hero_biryani_dish_61b2c449.png";

// export function HeroSection() {
//   return (
//     <div className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
//       {/* Elegant Background with Multiple Layers */}
//       <motion.div
//         initial={{ scale: 1.2, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute inset-0"
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${heroBiryani})` }}
//         />
//         {/* Sophisticated dark overlay with subtle gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/60" />
//         {/* Warm ambient glow */}
//         <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
//       </motion.div>

//       {/* Elegant grain texture overlay for premium feel */}
//       <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

//       <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//         <div className="flex flex-col justify-center h-full max-w-4xl">
//           {/* Refined Top Badges */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//             className="flex flex-wrap gap-4 mb-8"
//           >
//             <Badge className="bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-2xl">
//               <Star className="h-3.5 w-3.5 mr-2 fill-amber-400 text-amber-400" />
//               4.8 Rating • 2,000+ Reviews
//             </Badge>
//             <Badge className="bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-2xl">
//               <Award className="h-3.5 w-3.5 mr-2 text-amber-400" />
//               Premium Quality
//             </Badge>
//             <Badge className="bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-2xl">
//               <Clock className="h-3.5 w-3.5 mr-2 text-amber-400" />
//               30 Minutes
//             </Badge>
//           </motion.div>

//           {/* Elegant Brand Name */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             className="mb-6"
//           >
//             <div className="inline-flex items-center gap-4 mb-3">
//               <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/60" />
//               <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
//                 Since 2024
//               </span>
//             </div>
//             <h2 className="font-serif text-3xl md:text-4xl text-white/90 font-light tracking-wide">
//               Biryaniwala & Cafe
//             </h2>
//           </motion.div>

//           {/* Luxurious Main Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
//           >
//             Authentic
//             <br />
//             <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
//               Indian-Pakistani
//             </span>
//             <br />
//             Cuisine
//           </motion.h1>

//           {/* Refined Description */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
//             className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl font-light leading-relaxed"
//           >
//             Experience the art of traditional biryani and aromatic curries,
//             crafted with time-honored recipes and premium ingredients.
//           </motion.p>

//           {/* Premium CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
//             className="flex flex-wrap gap-5"
//           >
//             <Link href="/menu">
//               <motion.div
//                 whileHover={{ scale: 1.03, y: -3 }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               >
//                 <Button
//                   size="lg"
//                   className="text-base px-10 py-7 font-semibold shadow-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground border-0 rounded-full group relative overflow-hidden"
//                   data-testid="button-hero-order"
//                 >
//                   <span className="relative z-10 flex items-center gap-2">
//                     Order Now
//                     <motion.span
//                       initial={{ x: 0 }}
//                       whileHover={{ x: 5 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 400,
//                         damping: 10,
//                       }}
//                     >
//                       →
//                     </motion.span>
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </Button>
//               </motion.div>
//             </Link>

//             <Link href="/menu">
//               <motion.div
//                 whileHover={{ scale: 1.03, y: -3 }}
//                 whileTap={{ scale: 0.97 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               >
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="text-base px-10 py-7 font-semibold bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 hover:bg-white/10 hover:border-white/30 shadow-2xl rounded-full transition-all duration-300"
//                   data-testid="button-hero-menu"
//                 >
//                   Explore Menu
//                 </Button>
//               </motion.div>
//             </Link>
//           </motion.div>

//           {/* Elegant Feature Points */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.4 }}
//             className="mt-16 flex flex-wrap gap-8 text-white/60 text-sm font-light tracking-wide"
//           >
//             <div className="flex items-center gap-3 group cursor-default">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
//               <span className="group-hover:text-white/90 transition-colors duration-300">
//                 Signature Biryani's
//               </span>
//             </div>
//             <div className="flex items-center gap-3 group cursor-default">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
//               <span className="group-hover:text-white/90 transition-colors duration-300">
//                 Halal Certified
//               </span>
//             </div>
//             <div className="flex items-center gap-3 group cursor-default">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
//               <span className="group-hover:text-white/90 transition-colors duration-300">
//                 Family Owned
//               </span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Subtle Bottom Accent Line */}
//       <motion.div
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
//       />
//     </div>
//   );
// }
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroBiryani from "@assets/generated_images/Hero_biryani_dish_61b2c449.png";

export function HeroSection() {
  return (
    <div className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">
      {/* Elegant Background with Multiple Layers */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBiryani})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </motion.div>

      {/* Elegant grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-center h-full max-w-4xl">
          {/* Refined Top Badges */}
          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Badge className="bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-2xl">
              <Star className="h-3.5 w-3.5 mr-2 fill-amber-400 text-amber-400" />
              4.8 Rating • 2,000+ Reviews
            </Badge>
            <Badge className="bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-2xl">
              <Award className="h-3.5 w-3.5 mr-2 text-amber-400" />
              Premium Quality
            </Badge>
            <Badge className="bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-2xl">
              <Clock className="h-3.5 w-3.5 mr-2 text-amber-400" />
              30 Minutes
            </Badge>
          </motion.div> */}

          {/* Elegant Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-4 mb-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">
                Since 2024
              </span>
            </div>
            {/* <h2 className="font-serif text-3xl md:text-4xl text-white/90 font-light tracking-wide">
              Biryaniwala & Cafe
            </h2> */}
          </motion.div>

          {/* Luxurious Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
          >
            Authentic
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Indian-Pakistani
            </span>
            <br />
            Cuisine
          </motion.h1>

          {/* Refined Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl font-light leading-relaxed"
          >
            Experience the art of traditional biryani and aromatic curries,
            crafted with time-honored recipes and premium ingredients.
          </motion.p>

          {/* Premium CTA Buttons - Smaller & More Elegant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link href="/menu">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  size="default"
                  className="text-sm px-7 py-5 font-semibold shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground border-0 group relative overflow-hidden transition-all duration-300"
                  data-testid="button-hero-order"
                >
                  <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Order Now</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/menu">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  size="default"
                  variant="ghost"
                  className="text-sm px-7 py-5 font-semibold text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-300 group"
                  data-testid="button-hero-menu"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Elegant Feature Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-16 flex flex-wrap gap-8 text-white/60 text-sm font-light tracking-wide"
          >
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-white/90 transition-colors duration-300">
                Signature Biryani's
              </span>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-white/90 transition-colors duration-300">
                Halal Certified
              </span>
            </div>
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-white/90 transition-colors duration-300">
                Family Owned
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
      />
    </div>
  );
}
