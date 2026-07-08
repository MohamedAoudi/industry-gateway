import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Factory, Users, Globe2, Lightbulb } from "lucide-react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

const StatsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = useMemo(() => [
    { label: t("stats.factories"), value: 1250, icon: Factory, suffix: "+" },
    { label: t("stats.researchers"), value: 850, icon: Users, suffix: "+" },
    { label: t("stats.countries"), value: 22, icon: Globe2, suffix: "" },
    { label: t("stats.solutions"), value: 340, icon: Lightbulb, suffix: "+" },
  ], [t]);

  return (
    <section className="relative bg-[#fcfcfc] py-24 overflow-hidden" ref={ref}>
      
      {/* تأثير ضوئي ذهبي ناعم */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* عنوان القسم الجديد */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {t("stats.title")}
          </h2>
          <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-white border border-emerald-600 rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(217,119,6,0.15)] hover:border-emerald-600 transition-all duration-500">
                
                <div className="w-16 h-16 rounded-2xl bg-emerald-60 flex items-center justify-center mb-6 group-hover:bg-emerald-600/30 transition-all duration-500">
                  <stat.icon className="text-emerald-600 group-hover:text-emerald-600" size={30} />
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tighter">
                    {isInView && <CountUp end={stat.value} duration={2.5} separator="," />}
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">{stat.suffix}</span>
                </div>

                <p className="text-emerald-60 text-[13px] font-bold uppercase tracking-[1.5px] mt-2 group-hover:text-emerald-600 transition-colors">
                  {stat.label}
                </p>

                <div className="mt-6 w-12 h-[3px] bg-emerald-600 group-hover:w-full group-hover:bg-emerald-600 transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;