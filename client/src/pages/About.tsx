// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Award, Heart, Users, Sparkles, Clock, ChefHat } from "lucide-react";
// import { motion } from "framer-motion";

// export default function About() {
//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       <Navbar />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border/50 overflow-hidden">
//           {/* Decorative pattern */}
//           <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_50%,_transparent_20%,_hsl(var(--primary))_21%,_hsl(var(--primary))_24%,_transparent_25%)] bg-[length:80px_80px]" />

//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="max-w-4xl"
//             >
//               {/* Label */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="inline-flex items-center gap-3 mb-6"
//               >
//                 <div className="h-[1px] w-8 bg-primary" />
//                 <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
//                   Our Journey
//                 </span>
//               </motion.div>

//               <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
//                 About Biryaniwala & Cafe
//               </h1>

//               <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
//                 Bringing authentic Indian-Pakistani flavors to your table since
//                 2024
//               </p>
//             </motion.div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//           {/* Story Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
//                 <span className="text-primary">✦</span>
//                 Our Story
//               </h2>
//               <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
//                 <p>
//                   Founded in 2024,{" "}
//                   <span className="text-foreground font-semibold">
//                     Biryaniwala & Cafe
//                   </span>{" "}
//                   was born from a passion for authentic Indian-Pakistani cuisine
//                   and a desire to share the rich flavors of traditional biryani
//                   with food lovers everywhere.
//                 </p>
//                 <p>
//                   Our journey began in a small kitchen where our founder, a
//                   third-generation chef, perfected family recipes passed down
//                   through generations. What started as a humble endeavor has
//                   grown into a beloved restaurant known for its commitment to
//                   quality and authenticity.
//                 </p>
//                 <p>
//                   Today, we continue to honor those traditions while embracing
//                   modern convenience. Every dish is prepared with the same care
//                   and attention to detail that our founder instilled from day
//                   one, using only the finest ingredients and time-tested cooking
//                   techniques.
//                 </p>
//               </div>
//             </motion.div>

//             {/* Values Cards */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               className="grid grid-cols-1 gap-5"
//             >
//               <Card className="group hover:border-primary/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <CardContent className="p-6 relative z-10">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                       <Award className="h-7 w-7 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
//                         Quality First
//                       </h3>
//                       <p className="text-muted-foreground text-sm leading-relaxed">
//                         We source premium ingredients and never compromise on
//                         quality, ensuring every meal exceeds expectations.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="group hover:border-secondary/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <CardContent className="p-6 relative z-10">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                       <Heart className="h-7 w-7 text-secondary fill-secondary/20" />
//                     </div>
//                     <div>
//                       <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-secondary transition-colors duration-300">
//                         Made with Love
//                       </h3>
//                       <p className="text-muted-foreground text-sm leading-relaxed">
//                         Each dish is prepared with passion and care, honoring
//                         the traditions that make our food special.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="group hover:border-accent/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <CardContent className="p-6 relative z-10">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                       <Users className="h-7 w-7 text-accent" />
//                     </div>
//                     <div>
//                       <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">
//                         Community Focused
//                       </h3>
//                       <p className="text-muted-foreground text-sm leading-relaxed">
//                         We're proud to serve our community and create memorable
//                         dining experiences for families and friends.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>

//           {/* Stats Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
//           >
//             {[
//               { icon: Sparkles, value: "2024", label: "Established" },
//               { icon: ChefHat, value: "50+", label: "Dishes" },
//               { icon: Heart, value: "2,000+", label: "Happy Customers" },
//               { icon: Clock, value: "30min", label: "Avg. Delivery" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="text-center p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
//               >
//                 <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
//                 <div className="font-serif text-3xl md:text-4xl font-bold mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Mission Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             <Card className="bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-border/50 shadow-2xl overflow-hidden">
//               {/* Decorative corners */}
//               <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20" />
//               <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
//               <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
//               <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20" />

//               <CardContent className="p-10 md:p-16 relative z-10">
//                 <div className="text-center max-w-3xl mx-auto">
//                   <div className="inline-flex items-center gap-3 mb-6">
//                     <div className="h-[1px] w-12 bg-primary" />
//                     <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
//                       Our Mission
//                     </span>
//                     <div className="h-[1px] w-12 bg-primary" />
//                   </div>

//                   <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
//                     Celebrating Culture Through Cuisine
//                   </h2>

//                   <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
//                     To deliver authentic, delicious Indian-Pakistani cuisine
//                     that brings people together. We believe food is more than
//                     sustenance—it's a celebration of culture, tradition, and the
//                     joy of sharing a meal with loved ones.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users, Sparkles, Clock, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Logo Banner */}
        <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border/50 overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_50%,_transparent_20%,_hsl(var(--primary))_21%,_hsl(var(--primary))_24%,_transparent_25%)] bg-[length:80px_80px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="h-[1px] w-8 bg-primary" />
                <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
                  Our Journey
                </span>
                <div className="h-[1px] w-8 bg-primary" />
              </motion.div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                About Our Restaurant
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                Bringing authentic Indian-Pakistani flavors to your table since
                2024
              </p>
            </motion.div>
            <br />
            {/* Logo Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 md:mb-16"
            >
              <div className="relative max-w-5xl mx-auto">
                <img
                  src="/logobanner.jpg"
                  alt="Biryaniwala & Cafe - Authentic Indian-Pakistani Cuisine"
                  className="w-full h-auto object-contain"
                />
                {/* Optional subtle shadow behind banner */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-2xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                <span className="text-primary">✦</span>
                Our Story
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  Founded in 2024,{" "}
                  <span className="text-foreground font-semibold">
                    Biryaniwala & Cafe
                  </span>{" "}
                  was born from a passion for authentic Indian-Pakistani cuisine
                  and a desire to share the rich flavors of traditional biryani
                  with food lovers everywhere.
                </p>
                <p>
                  Our journey began in a small kitchen where our founder, a
                  third-generation chef, perfected family recipes passed down
                  through generations. What started as a humble endeavor has
                  grown into a beloved restaurant known for its commitment to
                  quality and authenticity.
                </p>
                <p>
                  Today, we continue to honor those traditions while embracing
                  modern convenience. Every dish is prepared with the same care
                  and attention to detail that our founder instilled from day
                  one, using only the finest ingredients and time-tested cooking
                  techniques.
                </p>
              </div>
            </motion.div>

            {/* Values Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 gap-5"
            >
              <Card className="group hover:border-primary/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                        Quality First
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        We source premium ingredients and never compromise on
                        quality, ensuring every meal exceeds expectations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-secondary/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-7 w-7 text-secondary fill-secondary/20" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-secondary transition-colors duration-300">
                        Made with Love
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Each dish is prepared with passion and care, honoring
                        the traditions that make our food special.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:border-accent/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-7 w-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">
                        Community Focused
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        We're proud to serve our community and create memorable
                        dining experiences for families and friends.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { icon: Sparkles, value: "2024", label: "Established" },
              { icon: ChefHat, value: "50+", label: "Dishes" },
              { icon: Heart, value: "2,000+", label: "Happy Customers" },
              { icon: Clock, value: "30min", label: "Avg. Delivery" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="font-serif text-3xl md:text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card className="bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-border/50 shadow-2xl overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20" />

              <CardContent className="p-10 md:p-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-12 bg-primary" />
                    <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
                      Our Mission
                    </span>
                    <div className="h-[1px] w-12 bg-primary" />
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                    Celebrating Culture Through Cuisine
                  </h2>

                  <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                    To deliver authentic, delicious Indian-Pakistani cuisine
                    that brings people together. We believe food is more than
                    sustenance—it's a celebration of culture, tradition, and the
                    joy of sharing a meal with loved ones.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
