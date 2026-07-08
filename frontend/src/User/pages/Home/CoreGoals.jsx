import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Lightbulb, BarChart, Globe, Plus } from "lucide-react";

const CoreGoals = () => {
  const { t } = useTranslation();

  const goals = [
    { 
      title: t("about_sections.goals.g1"), 
      desc: "توطين المعرفة التقنية لبناء قاعدة صناعية صلبة.",
      icon: <Lightbulb size={28} strokeWidth={1} />,
      accent: "from-emerald-800 to-vert-600"
    },
    { 
      title: t("about_sections.goals.g2"), 
      desc: "تحويل الأفكار البحثية إلى منتجات تجارية منافسة.",
      icon: <BarChart size={28} strokeWidth={1} />,
      accent: "from-emerald-700 to-vert-500"
    },
    { 
      title: t("about_sections.goals.g3"), 
      desc: "تعزيز التعاون العابر للحدود لتحقيق تكامل اقتصادي.",
      icon: <Globe size={28} strokeWidth={1} />,
      accent: "from-emerald-600 to-vert-600"
    },
  ];

  return (
    <section className="py-12 bg-[#fafafa] relative overflow-hidden">
      {/* عناصر فنية في الخلفية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-emerald-600 font-mono text-[18px] tracking-widest uppercase mb-4"
            >
              <span className="w-8 h-px bg-emerald-600" />
              {t("about_sections.goals.subtitle")}
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none tracking-tight">
              {t("about_sections.goals.title")}            
            </h2>
          </div>
        </div>

        {/* شبكة الأهداف بأسلوب الـ Glass Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              whileHover="hover"
              className="relative bg-white p-12 h-[450px] flex flex-col justify-between group overflow-hidden"
            >
              {/* خلفية تفاعلية تظهر عند الحوم */}
              <motion.div 
                variants={{ hover: { scale: 1.5, opacity: 1 } }}
                className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${goal.accent} opacity-0 blur-[80px] transition-all duration-700`}
              />

              <div className="relative z-10">
                <div className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
                  {goal.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {goal.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                  {goal.desc}
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <span className="text-7xl font-black text-slate-50 group-hover:text-white/20 transition-colors">
                  0{i + 1}
                </span>
                <motion.div 
                  variants={{ hover: { rotate: 90 } }}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-white group-hover:text-white transition-all"
                >
                  <Plus size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreGoals;