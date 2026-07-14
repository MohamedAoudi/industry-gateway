import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import CoreGoals from "./CoreGoals";
import ServicesSection from "./ServicesSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import LatestNewsSection from "./LatestNewsSection";





const Home = () => {
  
  return (
    <section >
        <HeroSection />
        <StatsSection />
        <CoreGoals />
        <ServicesSection />
        <LatestNewsSection />
        <SuccessStoriesSection />
    </section>
  );
};

export default Home;
