import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import CoreGoals from "./CoreGoals";
import ServicesSection from "./ServicesSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import LatestNewsSection from "./LatestNewsSection";





const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <section>
        <HeroSection />
        <StatsSection />
        <CoreGoals />
        <ServicesSection />
        <SuccessStoriesSection />
        <LatestNewsSection />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 18, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.85 }}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className={`group fixed bottom-6 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-[0_12px_35px_rgba(5,150,105,0.38)] backdrop-blur-md sm:bottom-8 sm:h-14 sm:w-14 ${
                isRtl ? "left-5 sm:left-8" : "right-5 sm:right-8"
              }`}
              aria-label="العودة إلى أعلى الصفحة"
              title="العودة إلى الأعلى"
            >
              <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
              <ArrowUp
                size={22}
                strokeWidth={2.4}
                className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </motion.button>
          )}
        </AnimatePresence>
    </section>
  );
};

export default Home;
