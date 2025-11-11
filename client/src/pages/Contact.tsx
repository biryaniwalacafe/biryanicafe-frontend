// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { MapPin, Phone, Mail, Clock } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useState } from "react";

// export default function Contact() {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Contact form submitted:", formData);
//     toast({
//       title: "Message sent!",
//       description: "We'll get back to you as soon as possible.",
//     });
//     setFormData({ name: "", email: "", phone: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <div className="bg-card border-b border-card-border">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <h1 className="font-serif text-5xl font-bold mb-6">Contact Us</h1>
//             <p className="text-xl text-muted-foreground max-w-3xl">
//               Have a question or feedback? We'd love to hear from you.
//             </p>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div>
//               <Card>
//                 <CardContent className="p-8">
//                   <h2 className="font-serif text-2xl font-bold mb-6">Send us a message</h2>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Name</Label>
//                       <Input
//                         id="name"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         required
//                         data-testid="input-name"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                         required
//                         data-testid="input-email"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="phone">Phone</Label>
//                       <Input
//                         id="phone"
//                         type="tel"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                         data-testid="input-phone"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="message">Message</Label>
//                       <Textarea
//                         id="message"
//                         rows={5}
//                         value={formData.message}
//                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                         required
//                         data-testid="input-message"
//                       />
//                     </div>

//                     <Button type="submit" className="w-full" data-testid="button-submit">
//                       Send Message
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="space-y-6">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
//                       <MapPin className="h-6 w-6 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-2">Address</h3>
//                       <p className="text-muted-foreground">
//                         123 Food Street<br />
//                         Cuisine City, CC 12345<br />
//                         United States
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
//                       <Phone className="h-6 w-6 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-2">Phone</h3>
//                       <p className="text-muted-foreground">
//                         (555) 123-4567
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
//                       <Mail className="h-6 w-6 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-2">Email</h3>
//                       <p className="text-muted-foreground">
//                         hello@biriyaniwala.com
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
//                       <Clock className="h-6 w-6 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-2">Opening Hours</h3>
//                       <div className="text-muted-foreground space-y-1">
//                         <p>Monday - Sunday</p>
//                         <p className="font-semibold text-foreground">11:00 AM - 10:00 PM</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="overflow-hidden">
//                 <div className="h-64 bg-muted flex items-center justify-center">
//                   <p className="text-muted-foreground">Map placeholder</p>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: (
        <>
          2233 W 87th St
          <br />
          Bridgeview, IL 60455
          <br />
          United States
        </>
      ),
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (708) 529-7779",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@biriyaniwala.com",
      color: "from-accent/20 to-accent/5",
      iconColor: "text-accent",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      content: (
        <div className="space-y-1">
          <p>Monday - Sunday</p>
          <p className="font-semibold text-foreground">11:00 AM - 10:00 PM</p>
        </div>
      ),
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border/50 overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_50%,_transparent_20%,_hsl(var(--primary))_21%,_hsl(var(--primary))_24%,_transparent_25%)] bg-[length:80px_80px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="h-[1px] w-8 bg-primary" />
                <span className="text-primary text-xs uppercase tracking-[0.25em] font-semibold">
                  Get In Touch
                </span>
              </motion.div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Contact Us
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden group">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <CardContent className="p-8 md:p-12 relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <h2 className="font-serif text-2xl md:text-3xl font-bold">
                      Send Us a Message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="h-12 border-border/50 focus:border-primary transition-colors duration-300"
                          placeholder="John Doe"
                          data-testid="input-name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="h-12 border-border/50 focus:border-primary transition-colors duration-300"
                          placeholder="john@example.com"
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="h-12 border-border/50 focus:border-primary transition-colors duration-300"
                        placeholder="+1 (555) 000-0000"
                        data-testid="input-phone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-sm font-semibold"
                      >
                        Your Message *
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="border-border/50 focus:border-primary transition-colors duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                        data-testid="input-message"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold group/btn relative overflow-hidden"
                        data-testid="button-submit"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Message
                          <Send className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-5"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:border-primary/30 transition-all duration-500 hover:shadow-xl border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start gap-4">
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <info.icon className={`h-6 w-6 ${info.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                            {info.title}
                          </h3>
                          <div className="text-muted-foreground text-sm leading-relaxed">
                            {info.content}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Map Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="overflow-hidden border-border/50 shadow-lg group">
                  <div className="relative h-80 bg-gradient-to-br from-muted via-muted/80 to-muted">
                    {/* Decorative overlay - fades on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* Google Maps iframe */}
                    <iframe
                      title="Biryaniwala & Cafe Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.8976!2d-87.80102!3d41.73302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQzJzU4LjkiTiA4N8KwNDgnMDMuNyJX!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    />

                    {/* Location pin overlay - floats on top */}
                    <div className="absolute top-4 left-4 z-20 bg-background/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-xl border border-border/50 group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            Biryaniwala & Cafe
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2233 W 87th St, Bridgeview
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* "Get Directions" button - appears on hover */}
                    <motion.a
                      href="https://www.google.com/maps/dir/?api=1&destination=41.73302,-87.80102"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg shadow-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                        <MapPin className="h-4 w-4" />
                        Get Directions
                      </div>
                    </motion.a>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
