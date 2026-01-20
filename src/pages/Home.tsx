import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { FeatureSection } from "@/components/FeatureSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
