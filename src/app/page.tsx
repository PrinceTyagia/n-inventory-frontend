import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import HeroSection from "@/components/home/HeroSection";
import InventoryFAQ from "@/components/home/InventoryFAQ";
import InventoryFeatureTabs from "@/components/home/InventoryFeatureTabs";
import PricingTiers from "@/components/home/PricingTiers";
import WhyStruggle from "@/components/home/whyStruggle";
import React from "react";

const page = () => {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <WhyStruggle />
      <InventoryFeatureTabs />
      <PricingTiers />
      <InventoryFAQ />
      <Footer />
    </div>
  );
};

export default page;
