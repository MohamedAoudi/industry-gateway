// import React from "react";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { 
//   Users, 
//   Database, 
//   Presentation, 
//   TrendingUp, 
//   Settings, 
//   ShieldCheck,
//   ArrowUpRight
// } from "lucide-react";

// const ServicesSection = () => {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === "ar";

//   // تعريف الخدمات وتوزيعها في الشبكة
//   const services = [
//     {
//       id: "linking",
//       title: t("submenu.services.linking_researchers_industrial_companies"),
//       icon: <Users size={32} />,
//       gridClass: "md:col-span-2 md:row-span-2", // خلية كبيرة
//       bg: "bg-gradient-to-br from-amber-500/20 to-orange-600/5",
//       iconColor: "text-amber-500"
//     },
//     {
//       id: "database",
//       title: t("submenu.services.database_research_technologies_available_industrial_application"),
//       icon: <Database size={24} />,
//       gridClass: "md:col-span-2 md:row-span-1", // خلية عريضة
//       bg: "bg-gradient-to-br from-blue-500/20 to-cyan-600/5",
//       iconColor: "text-blue-400"
//     },
//     {
//       id: "workshops",
//       title: t("submenu.services.joint_workshops_seminars"),
//       icon: <Presentation size={24} />,
//       gridClass: "md:col-span-1 md:row-span-1",
//       bg: "bg-gradient-to-br from-purple-500/20 to-pink-600/5",
//       iconColor: "text-purple-400"
//     },
//     {
//       id: "marketing",
//       title: t("submenu.services.supporting_marketing_investment_scientific_research_outputs"),
//       icon: <TrendingUp size={24} />,
//       gridClass: "md:col-span-1 md:row-span-2", // خلية طويلة
//       bg: "bg-gradient-to-br from-emerald-500/20 to-teal-600/5",
//       iconColor: "text-emerald-400"
//     },
//     {
//       id: "technical",
//       title: t("submenu.services.technical_details_how_use_services"),
//       icon: <Settings size={24} />,
//       gridClass: "md:col-span-1 md:row-span-1",
//       bg: "bg-slate-800/40",
//       iconColor: "text-slate-300"
//     },
//     {
//       id: "pricing",
//       title: t("submenu.services.subscription_prices_terms"),
//       icon: <ShieldCheck size={24} />,
//       gridClass: "md:col-span-2 md:row-span-1",
//       bg: "bg-gradient-to-br from-rose-500/20 to-red-600/5",
//       iconColor: "text-rose-400"
//     }
//   ];

//   return (
//     <section className="py-24 bg-[#020202] relative overflow-hidden">
//       {/* عناصر ديكورية للخلفية */}
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="mb-16">
//           <motion.span 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="text-amber-500 font-mono tracking-widest text-sm uppercase block mb-4"
//           >
//             {t("menu.services")}
//           </motion.span>
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-6xl font-black text-white"
//           >
//             {isRtl ? "حلول ذكية لنمو صناعي" : "Smart Solutions for Industrial Growth"}
//           </motion.h2>
//         </div>

//         {/* Bento Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-4 h-auto md:h-[800px]">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className={`group relative overflow-hidden rounded-[2.5rem] p-8 border border-white/5 backdrop-blur-3xl ${service.bg} ${service.gridClass}`}
//             >
//               {/* تأثير الضوء عند الحوم */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
//               <div className="relative z-10 h-full flex flex-col justify-between">
//                 <div className={`${service.iconColor} p-3 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
//                   {service.icon}
//                 </div>

//                 <div>
//                   <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
//                     {service.title}
//                   </h3>
//                   <button className="flex items-center gap-2 text-white/40 group-hover:text-amber-500 transition-colors text-sm font-bold uppercase tracking-wider">
//                     {isRtl ? "اكتشف المزيد" : "Learn More"}
//                     <ArrowUpRight size={16} />
//                   </button>
//                 </div>
//               </div>

//               {/* زخرفة بصرية في زاوية كل بطاقة */}
//               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;






























import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Users, Database, Presentation, TrendingUp, 
  Settings, ShieldCheck, ArrowUpRight 
} from "lucide-react";

const ServiceCard = ({ service, index, isRtl }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-emerald-500/50"
    >
      {/* Halo lumineux qui suit la souris */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(5, 150, 105, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="rounded-2xl bg-emerald-600/10 p-3 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(5,150,105,0.2)]">
            {service.icon}
          </div>
          <ArrowUpRight className="text-white/20 group-hover:text-emerald-500 transition-colors duration-500" size={20} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
            {service.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {isRtl ? "حلول متقدمة مصممة خصيصاً لتلبية احتياجاتك." : "Solutions avancées conçues pour vos besoins."}
          </p>
        </div>
      </div>

      {/* Ligne émeraude discrète en bas */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-600 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const services = [
    { id: "linking", title: t("submenu.services.linking_researchers_industrial_companies"), icon: <Users size={22} /> },
    { id: "database", title: t("submenu.services.database_research_technologies_available_industrial_application"), icon: <Database size={22} /> },
    { id: "workshops", title: t("submenu.services.joint_workshops_seminars"), icon: <Presentation size={22} /> },
    { id: "marketing", title: t("submenu.services.supporting_marketing_investment_scientific_research_outputs"), icon: <TrendingUp size={22} /> },
    { id: "technical", title: t("submenu.services.technical_details_how_use_services"), icon: <Settings size={22} /> },
    { id: "pricing", title: t("submenu.services.subscription_prices_terms"), icon: <ShieldCheck size={22} /> },
  ];

  return (
    <section className="bg-[#050505] py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-emerald-600/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-500 mb-4"
            >
              <div className="h-px w-8 bg-emerald-500" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">{t("menu.services")}</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white leading-tight"
            >
              {isRtl ? "ابتكار صناعي" : "Innovation"} <br />
              {/* <span className="text-emerald-600 italic font-serif font-light lowercase opacity-80">sans limites.</span> */}
            </motion.h2>
          </div>
        </div>

        {/* Grid compacte et propre */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} isRtl={isRtl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;