import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, ArrowUpRight, Sparkles, Binary, 
  Cpu, Factory, ShieldCheck, 
  ChevronRight, Fingerprint, Database, Microscope,
  X, Send, User, Mail, Building, Briefcase,
  Zap, Globe, BarChart3, FlaskConical
} from 'lucide-react';

// --- MODAL DE REJOINDRE L'ÉCOSYSTÈME ---
const JoinModal = ({ isOpen, onClose, t, isRtl }) => {
  if (!isOpen) return null;

  const expertises = isRtl 
    ? ["تكنولوجيا النانو", "الذكاء الاصطناعي", "الطاقة المتجددة", "التصنيع الغذائي", "البتروكيماويات"]
    : ["Nanotechnology", "Artificial Intelligence", "Renewable Energy", "Food Processing", "Petrochemicals"];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f172a]/90 backdrop-blur-xl"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl relative border border-white/20"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-600 to-[#1a1a1a]" />
          
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-[#1a1a1a] transition-all hover:rotate-90">
            <X size={28} />
          </button>

          <div className="p-10 md:p-14">
            <div className="mb-10">
              <span className="text-amber-600 font-black text-[10px] uppercase tracking-[4px]">{t('common.innovation_portal')}</span>
              <h3 className="text-4xl font-black text-[#1a1a1a] mt-2 mb-4 leading-none">
                {isRtl ? "انضم إلى نخبة المبتكرين" : "Join the Innovation Elite"}
              </h3>
              <p className="text-slate-500 font-medium text-lg leading-snug">
                {t('linking_researchers_page.subtitle')}
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{isRtl ? "الاسم الكامل" : "Full Name"}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 ring-amber-500 transition-all outline-none font-bold" placeholder="..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{isRtl ? "البريد الأكاديمي / المهني" : "Professional Email"}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="email" className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 focus:ring-2 ring-amber-500 transition-all outline-none font-bold" placeholder="name@org.com" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{isRtl ? "التخصص التقني" : "Technical Domain"}</label>
                  <select className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 ring-amber-500 outline-none font-bold appearance-none cursor-pointer">
                    {expertises.map(ex => <option key={ex}>{ex}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{isRtl ? "المؤسسة" : "Organization"}</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 ring-amber-500 outline-none font-bold" />
                </div>
              </div>

              <button className="w-full bg-[#1a1a1a] hover:bg-amber-600 text-white py-5 rounded-2xl font-black uppercase tracking-[3px] flex items-center justify-center gap-4 transition-all shadow-xl shadow-amber-500/10 group mt-4">
                {isRtl ? "تأكيد التسجيل" : "Confirm Registration"} 
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CardHeader = ({ icon: Icon, title, badge, colorClass = "text-amber-600" }) => (
  <div className="flex flex-col gap-5 mb-4">
    <div className="flex justify-between items-center">
      <div className={`p-4 bg-white/10 backdrop-blur-md rounded-2xl ${colorClass} border border-white/20`}>
        <Icon size={28} />
      </div>
      <span className="text-[10px] font-black tracking-[3px] uppercase py-1.5 px-4 bg-white/5 rounded-full text-white/50 border border-white/10">
        {badge}
      </span>
    </div>
    <h3 className="text-3xl font-black leading-[1.1] tracking-tight">{title}</h3>
  </div>
);

const LinkingResearchers = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isRtl = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-white pt-16 overflow-hidden ${isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} isRtl={isRtl} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="relative mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-amber-600 font-black text-xs uppercase tracking-[5px] mb-2"
          >
            <Zap size={18} fill="currentColor" /> {isRtl ? "ثورة الربط الصناعي" : "Industrial Linkage Revolution"}
          </motion.div>
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <h1 className="text-6xl md:text-[100px] font-black text-[#1a1a1a] leading-[0.85] tracking-tighter mb-8">
                {t('linking_researchers_page.title')}<span className="text-amber-500">.</span>
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-2 rounded-full border border-slate-200 text-slate-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <Globe size={14} /> 21 {t('stats.countries')}
                </div>
                <div className="px-6 py-2 rounded-full border border-slate-200 text-slate-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 size={14} /> +500 {t('stats.solutions')}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="lg:col-span-4 lg:pt-10"
            >
              <p className="text-slate-500 font-bold text-xl leading-relaxed mb-10">
                {t('linking_researchers_page.description')}
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-5 bg-[#1a1a1a] text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-[4px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-amber-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">{t('common.join_network')}</span>
                <ArrowUpRight size={22} className="relative z-10 group-hover:rotate-45 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* --- BENTO 2.0 --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          
          {/* Card Researchers */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-7 bg-[#1a1a1a] rounded-[60px] p-12 text-white relative overflow-hidden group shadow-3xl shadow-black/40"
          >
            <div className="absolute -top-20 -right-20 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
              <FlaskConical size={500} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <CardHeader icon={Binary} title={t('linking_researchers_page.sections.for_researchers.title')} />
                <div className="grid sm:grid-cols-2 gap-10 mt-16">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="group/item">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-2 w-8 bg-amber-500 rounded-full group-hover/item:w-12 transition-all" />
                        <span className="text-amber-500 font-black text-xs">0{num}</span>
                      </div>
                      <p className="text-slate-300 text-lg font-bold leading-tight group-hover/item:text-white transition-colors">
                        {t(`linking_researchers_page.sections.for_researchers.point${num}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card Industry */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-5 bg-amber-500 rounded-[60px] p-12 text-[#1a1a1a] relative overflow-hidden shadow-3xl shadow-amber-500/30"
          >
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Factory size={300} />
            </div>
            <div className="space-y-6 mt-12 relative z-10">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white/20 backdrop-blur-md p-6 rounded-[30px] border border-white/30 hover:bg-white transition-all cursor-default group/card">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#1a1a1a] rounded-full text-white group-hover/card:scale-110 transition-transform">
                      <ChevronRight size={16} />
                    </div>
                    <span className="font-black text-lg tracking-tight">{t(`linking_researchers_page.sections.for_industry.point${num}`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- PROCESS LINE --- */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] tracking-tighter leading-none mb-6">
                {t('linking_researchers_page.process_steps.title')}
              </h2>
              <div className="h-2 w-40 bg-amber-500 rounded-full" />
            </div>
            <p className="text-slate-400 font-bold text-xl max-w-md">
              {isRtl ? "نظام عمل متكامل يضمن انتقال الفكرة من المختبر إلى السوق العالمي." : "A seamless workflow ensuring ideas transition from lab to global markets."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((num) => (
              <motion.div 
                whileHover={{ y: -20 }}
                key={num} 
                className="relative p-12 rounded-[50px] border-2 border-slate-50 hover:border-amber-100 hover:bg-amber-50/30 transition-all group"
              >
                <span className="text-9xl font-black text-slate-100 absolute top-4 right-8 group-hover:text-amber-100 transition-colors -z-10">0{num}</span>
                <div className="flex flex-col h-full relative z-10">
                  <h5 className="text-amber-600 font-black text-xs uppercase tracking-[5px] mb-6">
                    {t(`linking_researchers_page.process_steps.label${num}`)}
                  </h5>
                  <p className="text-[#1a1a1a] text-3xl font-black leading-[1.1]">
                    {t(`linking_researchers_page.process_steps.step${num}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- CALL TO ACTION --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#1a1a1a] rounded-[70px] p-8 md:p-8 text-center relative overflow-hidden shadow-3xl shadow-black/40"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent" />
          <div className="relative z-10 flex flex-col items-center">
            <Microscope className="text-amber-500 mb-10 animate-bounce" size={60} />
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-12 tracking-tighter max-w-4xl">
              {isRtl ? "حول أبحاثك إلى منتجات صناعية عالمية" : "Turn Research into Global Industry"}
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group bg-amber-500 text-[#1a1a1a] px-16 py-7 rounded-[30px] font-black text-xl uppercase tracking-[5px] flex items-center gap-6 hover:bg-white transition-all shadow-2xl hover:scale-105"
            >
              <Plus size={28} />
              {t('footer.add_request')}
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LinkingResearchers;