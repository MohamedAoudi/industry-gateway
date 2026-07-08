import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Factory, Microscope, Cpu, Building2, BarChart3, FlaskConical } from "lucide-react";

const SuccessStories = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const collaborations = [
    {
      id: 1,
      sector: "الطاقة المستدامة",
      title: "تحسين كفاءة الخلايا الشمسية",
      researcher: "د. أحمد سالم - معهد النانو",
      company: "شركة طاقة المستقبل الدولية",
      impact: "زيادة 15% في الإنتاجية",
      tags: ["Energy", "NanoTech"],
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
      color: "#059669"
    },
    {
      id: 2,
      sector: "التصنيع الذكي",
      title: "أتمتة خطوط الإنتاج بالذكاء الاصطناعي",
      researcher: "مختبر الروبوتات المتقدم",
      company: "المجموعة الوطنية للصناعة",
      impact: "تقليل الهدر بنسبة 30%",
      tags: ["AI", "Robotics"],
      img: "https://images.unsplash.com/photo-1565465295423-68c959a593ba?auto=format&fit=crop&q=80&w=1000",
      color: "#0284c7"
    },
    {
      id: 3,
      sector: "الصناعات الدوائية",
      title: "تطوير مركبات دوائية حيوية",
      researcher: "مركز أبحاث التقنية الحيوية",
      company: "فارما تك للصناعات",
      impact: "تقليص وقت التجارب 40%",
      tags: ["Biotech", "Pharma"],
      img: "https://images.unsplash.com/photo-1532187863486-abf51ad655ee?auto=format&fit=crop&q=80&w=1000",
      color: "#7c3aed"
    }
  ];

  return (
    <section className="bg-slate-50 py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4"
            >
              <div className="h-1 w-8 bg-emerald-600 rounded-full" />
              جسور الابتكار
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1]"
            >
              نحول الأبحاث إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">واقع صناعي</span>
            </motion.h2>
          </div>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-slate-500 text-xl max-w-sm border-r-2 border-slate-200 pr-6 hidden md:block"
          >
            نربط العقول الأكاديمية بالقدرات التصنيعية لخلق قيمة اقتصادية حقيقية.
          </motion.p>
        </div>

        {/* Main Interaction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive List */}
          <div className="lg:col-span-5 space-y-4">
            {collaborations.map((item, index) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeIndex === index 
                  ? "bg-white shadow-xl translate-x-4 border-l-4 border-emerald-500" 
                  : "hover:bg-white/50 border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors duration-500 ${
                    activeIndex === index ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                  }`}>
                    {index === 0 ? <Microscope /> : index === 1 ? <Cpu /> : <FlaskConical />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.sector}</span>
                    <h3 className={`text-xl font-bold mt-1 transition-colors ${activeIndex === index ? "text-slate-900" : "text-slate-500"}`}>
                      {item.title}
                    </h3>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-500 mt-3 text-sm leading-relaxed">{item.company}</p>
                          <div className="flex gap-2 mt-4">
                            {item.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] rounded-full border border-slate-200">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Dynamic Visual Card */}
          <div className="lg:col-span-7 relative h-[600px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  <img 
                    src={collaborations[activeIndex].img} 
                    className="w-full h-full object-cover" 
                    alt="Project" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                    <div className="flex flex-wrap gap-12 mb-8">
                      <div>
                        <p className="text-emerald-400 text-xs font-bold uppercase mb-1">الشريك الأكاديمي</p>
                        <p className="font-medium text-lg">{collaborations[activeIndex].researcher}</p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs font-bold uppercase mb-1">الأثر الصناعي</p>
                        <p className="font-medium text-lg flex items-center gap-2">
                          <BarChart3 size={18} />
                          {collaborations[activeIndex].impact}
                        </p>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all group">
                      تفاصيل الشراكة الكاملة
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
             </AnimatePresence>

             {/* Decorative Elements */}
             <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SuccessStories;