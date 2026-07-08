import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const CountrySlider = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // Liste complète des pays avec les codes ISO correspondant à i18n.js
  const countries = [
    { name: t("countries.jo"), code: "jo" },
    { name: t("countries.ae"), code: "ae" },
    { name: t("countries.bh"), code: "bh" },
    { name: t("countries.tn"), code: "tn" },
    { name: t("countries.dz"), code: "dz" },
    { name: t("countries.dj"), code: "dj" },
    { name: t("countries.sa"), code: "sa" },
    { name: t("countries.sd"), code: "sd" },
    { name: t("countries.sy"), code: "sy" },
    { name: t("countries.so"), code: "so" },
    { name: t("countries.iq"), code: "iq" },
    { name: t("countries.om"), code: "om" },
    { name: t("countries.ps"), code: "ps" },
    { name: t("countries.qa"), code: "qa" },
    { name: t("countries.kw"), code: "kw" },
    { name: t("countries.lb"), code: "lb" },
    { name: t("countries.ly"), code: "ly" },
    { name: t("countries.eg"), code: "eg" },
    { name: t("countries.ma"), code: "ma" },
    { name: t("countries.mr"), code: "mr" },
    { name: t("countries.ye"), code: "ye" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Header de la section */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <span className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold mb-4 border border-emerald-100">
            {t("home.network_coverage")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {t("home.countries_title")}
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mt-6 rounded-full"></div>
        </motion.div>
      </div>

      {/* Slider des pays */}
      <div className="relative px-4">
        <Swiper
          // La clé force Swiper à se reconstruire proprement lors du changement de langue
          key={i18n.language} 
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={2}
          loop={true}
          speed={4000}
          dir={isRtl ? "rtl" : "ltr"} // Gère la direction du flux de slides
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="swiper-linear"
        >
          {countries.map((country, index) => (
            <SwiperSlide key={`${i18n.language}-${country.code}`}>
              <div className="py-4"> 
                <motion.div 
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-slate-50 flex flex-col items-center text-center transition-all duration-300 group cursor-default"
                >
                  {/* Container du drapeau */}
                  <div className="relative w-24 h-24 mb-6 transition-transform duration-500 group-hover:rotate-6">
                    <div className="absolute inset-0 bg-blue-600/5 rounded-full scale-110 blur-md group-hover:bg-blue-600/10 transition-colors"></div>
                    <img 
                      src={`https://flagcdn.com/w160/${country.code}.png`} 
                      alt={country.name}
                      loading="lazy"
                      className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  
                  {/* Nom du pays */}
                  <span className="text-slate-800 font-bold text-sm md:text-base group-hover:text-blue-600 transition-colors">
                    {country.name}
                  </span>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CSS pour l'animation linéaire sans saccades */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-linear .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />
    </section>
  );
};

export default CountrySlider;