// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import {
//   Info,
//   Target,
//   Eye,
//   Award,
//   Mail,
//   Phone,
//   MapPin,
//   Compass,
//   Layers,
//   Globe
// } from "lucide-react";

// const AboutPage = () => {
//   const { t, i18n } = useTranslation();
//   const isAr = i18n.language === "ar";
//   const dir = isAr ? "rtl" : "ltr";
  
//   const [activeTab, setActiveTab] = useState("about");

//   const tabs = [
//     { id: "about", label: t("about_platform.about.title"), icon: <Info size={18} /> },
//     { id: "vision", label: t("about_platform.vision.title"), icon: <Eye size={18} /> },
//     { id: "mission", label: t("about_platform.mission.title"), icon: <Target size={18} /> },
//     { id: "goals", label: t("about_platform.goals.title"), icon: <Award size={18} /> },
//     { id: "contact", label: t("about_platform.contact.title"), icon: <Mail size={18} /> },
//   ];

//   return (
//     <div dir={dir} className="min-h-screen bg-[#fcfdfe] pt-16 select-none font-sans">

//       {/* ================= HERO SECTION ================= */}
//       <div className="relative py-24 bg-emerald-600 text-white overflow-hidden">
//         <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -top-40 -left-20"></div>
//         <div className="absolute w-[500px] h-[500px] bg-[#0fa968]/10 rounded-full blur-[120px] -bottom-40 -right-20"></div>

//         <div className="max-w-5xl mx-auto px-6 text-start relative z-10">
//           <motion.h1 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-3xl md:text-5xl font-black mb-4 leading-tight"
//           >
//             {t("about_platform.about.title")}
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed font-medium"
//           >
//             {t("about_platform.subtitle")}
//           </motion.p>
//         </div>
//       </div>

//       {/* ================= TABS NAVIGATION ================= */}
//       <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
//         <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(12,35,64,0.04)] p-2 flex flex-wrap justify-center gap-1.5">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all relative ${
//                 activeTab === tab.id
//                   ? "bg-[#0fa968] text-white shadow-lg shadow-emerald-600/10"
//                   : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
//               }`}
//             >
//               {tab.icon}
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ================= DYNAMIC CONTENT CONTAINER ================= */}
//       <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -15 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="w-full"
//           >
            
//             {/* 1. ONGLET: ABOUT */}
//             {activeTab === "about" && (
//               <div className="flex flex-col gap-12">
//                 <div className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm ${isAr ? "text-right" : "text-left"}`}>
//                   <h4 className="text-lg font-bold text-[#0c2340] mb-4">{t("about_platform.about.title")}</h4>
//                   <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
//                     {t("about_platform.about.description_about")}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* 2. ONGLET: VISION */}
//             {activeTab === "vision" && (
//               <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-md border border-gray-100 ${isAr ? "text-right" : "text-left"}`}>
//                 <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-[#0fa968]">
//                   <Eye size={24} />
//                 </div>
//                 <h3 className="text-2xl font-black text-[#0c2340] mb-4">
//                   {isAr ? "رؤية البوابة" : "Our Strategic Vision"}
//                 </h3>
//                 <p className="text-gray-500 text-base leading-relaxed font-medium max-w-3xl">
//                   {t("about_platform.vision.description_vision")}
//                 </p>
//               </div>
//             )}.

//             {/* 3. ONGLET: MISSION */}
//             {activeTab === "mission" && (
//               <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-md border border-gray-100 ${isAr ? "text-right" : "text-left"}`}>
//                 <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0fa968] flex items-center justify-center mb-6">
//                   <Target size={24} />
//                 </div>
//                 <h3 className="text-2xl font-black text-[#0c2340] mb-4">
//                   {isAr ? "رسالة البوابة" : "Our Core Mission"}
//                 </h3>
//                 <p className="text-gray-500 text-base leading-relaxed font-medium max-w-3xl">
//                   {t("about_platform.mission.description_mission")}
//                 </p>
//               </div>
//             )}

//             {/* 4. ONGLET: GOALS */}
//             {activeTab === "goals" && (
//               <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isAr ? "text-right" : "text-left"}`}>
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center font-bold text-sm">١</div>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">{t("about_platform.goals.g1")}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center font-bold text-sm">٢</div>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">{t("about_platform.goals.g2")}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center font-bold text-sm">٣</div>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">{t("about_platform.goals.g3")}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center font-bold text-sm">٤</div>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">{t("about_platform.goals.g4")}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center font-bold text-sm">٥</div>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">{t("about_platform.goals.g5")}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center font-bold text-sm">٦</div>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">{t("about_platform.goals.g6")}</p>
//                 </div>
//               </div>
//             )}

//             {/* 5. ONGLET: CONTACT */}
//             {activeTab === "contact" && (
//               <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-md border border-gray-100 ${isAr ? "text-right" : "text-left"}`}>
//                 <div className="max-w-3xl mx-auto">
//                   <h3 className="text-2xl font-black text-[#0c2340] mb-4">
//                     {t("about_platform.contact.title")}
//                   </h3>
//                   <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium mb-10">
//                     {t("about_platform.contact.description")}
//                   </p>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gray-50/70 p-6 rounded-xl border border-gray-100 flex items-start gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center shrink-0">
//                         <Mail size={20} />
//                       </div>
//                       <div className="flex flex-col text-start">
//                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{isAr ? "البريد الإلكتروني" : "Email Address"}</span>
//                         <a href={`mailto:${t("about_platform.contact.info.email")}`} className="font-bold text-sm text-[#0c2340] hover:text-[#0fa968] transition-colors">
//                           {t("about_platform.contact.info.email")}
//                         </a>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50/70 p-6 rounded-xl border border-gray-100 flex items-start gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center shrink-0">
//                         <Phone size={20} />
//                       </div>
//                       <div className="flex flex-col text-start">
//                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{isAr ? "الهاتف" : "Phone Number"}</span>
//                         <span className="font-bold text-sm text-[#0c2340]" dir="ltr">
//                           {t("about_platform.contact.info.phone")}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50/70 p-6 rounded-xl border border-gray-100 flex items-start gap-4 md:col-span-2">
//                       <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0fa968] flex items-center justify-center shrink-0">
//                         <MapPin size={20} />
//                       </div>
//                       <div className="flex flex-col text-start">
//                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{isAr ? "المقر والعنوان" : "Official Address"}</span>
//                         <span className="font-semibold text-xs md:text-sm text-gray-600 leading-relaxed">
//                           {t("about_platform.contact.info.adress")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </div>

//     </div>
//   );
// };

// const Card = ({ icon, title }) => (
//   <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(12,35,64,0.02)] hover:shadow-[0_15px_35px_rgba(12,35,64,0.05)] hover:border-emerald-500/10 transition-all duration-300 flex flex-col items-start gap-5 group">
//     <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-[#0fa968] rounded-xl group-hover:scale-105 transition-transform duration-300">
//       {icon}
//     </div>
//     <h3 className="text-xs md:text-sm font-bold text-[#0c2340] leading-relaxed">
//       {title}
//     </h3>
//   </div>
// );

// export default AboutPage;













// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import {
//   Info,
//   Target,
//   Eye,
//   Award,
//   Mail,
//   Phone,
//   MapPin,
//   Compass,
//   Layers,
//   Globe,
//   Sparkles,
//   ArrowUpRight
// } from "lucide-react";

// const AboutPage = () => {
//   const { t, i18n } = useTranslation();
//   const isAr = i18n.language === "ar";
//   const dir = isAr ? "rtl" : "ltr";
  
//   const [activeTab, setActiveTab] = useState("about");

//   // Définition des onglets
//   const tabs = [
//     { id: "about", label: t("about_platform.about.title"), icon: <Info size={18} /> },
//     { id: "vision", label: t("about_platform.vision.title"), icon: <Eye size={18} /> },
//     { id: "mission", label: t("about_platform.mission.title"), icon: <Target size={18} /> },
//     { id: "goals", label: t("about_platform.goals.title"), icon: <Award size={18} /> },
//     { id: "contact", label: t("about_platform.contact.title"), icon: <Mail size={18} /> },
//   ];

//   return (
//     <div dir={dir} className="min-h-screen bg-[#f8fafc] relative overflow-hidden">

//       {/* ================= BACKGROUND MESH GRADIENTS ================= */}
//       <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#e2f4eb] to-transparent opacity-60 pointer-events-none -z-10" />
//       <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0fa968]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
//       <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-[#0a2540]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

//       {/* ================= HERO SECTION (Airy & Modern) ================= */}
//       <div className="relative py-24 bg-emerald-600 text-white overflow-hidden">
//         <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -top-40 -left-20"></div>
//         <div className="absolute w-[500px] h-[500px] bg-[#0fa968]/10 rounded-full blur-[120px] -bottom-40 -right-20"></div>

//         <div className="max-w-5xl mx-auto px-6 text-start relative z-10">
//           <motion.h1 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-3xl md:text-5xl font-black mb-4 leading-tight"
//           >
//             {t("about_platform.about.title")}
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed font-medium"
//           >
//             {t("about_platform.subtitle")}
//           </motion.p>
//         </div>
//       </div>

//       {/* ================= MAGIC PILL NAVIGATION ================= */}
//       <div className="max-w-4xl mx-auto px-6 relative z-20 -mt-8 mb-16">
//         <div className="bg-white backdrop-blur-xl rounded-full border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-1.5 flex flex-wrap md:flex-nowrap justify-between gap-1 overflow-hidden">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-sm transition-colors z-10 ${
//                 activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-[#0a2540]"
//               }`}
//             >
//               {activeTab === tab.id && (
//                 <motion.div
//                   layoutId="activeTabIndicator"
//                   className="absolute inset-0 bg-[#0fa968] rounded-full -z-10 shadow-md shadow-emerald-500/20"
//                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                 />
//               )}
//               {tab.icon}
//               <span className="whitespace-nowrap">{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ================= DYNAMIC CONTENT CONTAINER ================= */}
//       <div className="max-w-5xl mx-auto px-6 relative z-10">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
//             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//             exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className="w-full"
//           >
            
//             {/* 1. ONGLET: ABOUT (Bento Grid) */}
//             {activeTab === "about" && (
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
//                 {/* Carte Principale (Fond Blanc) */}
//                 <div className={`lg:col-span-8 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden flex flex-col justify-center ${isAr ? "text-right" : "text-left"}`}>
//                   {/* Halo décoratif subtil en arrière-plan */}
//                   <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                  
//                   {/* Icône avec un fond vert clair pour contraster sur le blanc */}
//                   <div className="relative z-10 w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100">
//                     <Info size={28} className="text-[#0fa968]" />
//                   </div>
                  
//                   {/* Textes sombres pour être lisibles sur le blanc */}
//                   <h3 className="relative z-10 text-3xl font-black mb-6 text-[#0a2540]">
//                     {isAr ? "من نحن؟" : "Who are we?"}
//                   </h3>
//                   <p className="relative z-10 [#0a2540] text-justify text-lg leading-relaxed font-medium">
//                     {t("about_platform.about.description_about")}
//                   </p>
//                 </div>

//                 {/* Cartes Latérales */}
//                 <div className="lg:col-span-4 flex flex-col gap-6">
//                   <BentoCard icon={<Globe />} title={isAr ? "تعزيز التكامل الصناعي العربي" : "Enhancing Arab industrial integration"} />
//                   <BentoCard icon={<Layers />} title={isAr ? "ربط أصحاب المصلحة رقمياً" : "Digitally connecting ecosystem stakeholders"} />
//                   <BentoCard icon={<Compass />} title={isAr ? "مساحة معرفية مخصصة للتطوير" : "Dedicated knowledge space for R&D development"} />
//                 </div>
//               </div>
//             )}

//             {/* 2. ONGLET: VISION & 3. MISSION (Heroic Cards) */}
//             {(activeTab === "vision" || activeTab === "mission") && (
//               <div className={`relative bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
//                 {/* Décoration d'arrière-plan */}
//                 <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} opacity-[0.03] pointer-events-none transform ${isAr ? '-translate-x-1/4' : 'translate-x-1/4'} -translate-y-1/4`}>
//                   {activeTab === "vision" ? <Eye size={400} /> : <Target size={400} />}
//                 </div>

//                 <div className="relative z-10 max-w-3xl">
//                   <div className="w-16 h-16 bg-emerald-50 text-[#0fa968] rounded-2xl flex items-center justify-center mb-8 border border-emerald-100 shadow-sm">
//                     {activeTab === "vision" ? <Eye size={32} /> : <Target size={32} />}
//                   </div>
//                   <h2 className="text-4xl md:text-5xl font-black text-[#0a2540] mb-8">
//                     {activeTab === "vision" 
//                       ? (isAr ? "رؤيتنا الإستراتيجية" : "Our Strategic Vision")
//                       : (isAr ? "رسالتنا الأساسية" : "Our Core Mission")}
//                   </h2>
//                   <p className="[#0a2540] text-xl text-justify md:text-2xl leading-relaxed font-medium">
//                     {activeTab === "vision" 
//                       ? t("about_platform.vision.description_vision")
//                       : t("about_platform.mission.description_mission")}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* 4. ONGLET: GOALS (Grid moderne avec numéros géants) */}
//             {activeTab === "goals" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[1, 2, 3, 4, 5, 6].map((num) => (
//                   <div key={num} className={`bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#0fa968]/30 transition-all duration-300 group relative overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
//                     {/* Numéro géant en filigrane */}
//                     <span className={`absolute top-4 ${isAr ? 'left-6' : 'right-6'} text-8xl font-black text-gray-50 group-hover:text-emerald-50 transition-colors duration-300 z-0 select-none`}>
//                       {num}
//                     </span>
                    
//                     <div className="relative z-10">
//                       <div className="w-12 h-12 bg-gray-50 text-[#0a2540] group-hover:bg-[#0fa968] group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
//                         <Award size={20} />
//                       </div>
//                       <p className="text-[#0a2540] font-bold text-justify text-lg leading-relaxed">
//                         {t(`about_platform.goals.g${num}`)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* 5. ONGLET: CONTACT (Split Layout Glassmorphism) */}
//             {activeTab === "contact" && (
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
//                 {/* Texte d'intro à gauche */}
//                 <div className={`lg:col-span-5 ${isAr ? "text-right" : "text-left"}`}>
//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold text-sm mb-6">
//                     <Mail size={16} />
//                     {isAr ? "تواصل معنا" : "Get in touch"}
//                   </div>
//                   <h2 className="text-4xl md:text-5xl font-black text-[#0a2540] mb-6 leading-tight">
//                     {t("about_platform.contact.title")}
//                   </h2>
//                   <p className="text-[#0a2540] text-lg  leading-relaxed">
//                     {t("about_platform.contact.description")}
//                   </p>
//                 </div>

//                 {/* Cartes de contact interactives à droite */}
//                 <div className="lg:col-span-7 flex flex-col gap-4">
                  
//                   <a href={`mailto:${t("about_platform.contact.info.email")}`} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
//                     <div className="flex items-center gap-6">
//                       <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0fa968] transition-colors">
//                         <Mail size={24} />
//                       </div>
//                       <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
//                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{isAr ? "البريد الإلكتروني" : "Email Address"}</span>
//                         <span className="text-xl font-bold text-[#0a2540]">{t("about_platform.contact.info.email")}</span>
//                       </div>
//                     </div>
//                     <ArrowUpRight size={24} className="text-gray-300 group-hover:text-[#0fa968] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
//                   </a>

//                   <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
//                     <div className="flex items-center gap-6">
//                       <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0fa968] transition-colors">
//                         <Phone size={24} />
//                       </div>
//                       <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
//                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{isAr ? "الهاتف" : "Phone Number"}</span>
//                         <span className="text-xl font-bold text-[#0a2540]" dir="ltr">{t("about_platform.contact.info.phone")}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-6 group cursor-default">
//                     <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0fa968] transition-colors mt-1">
//                       <MapPin size={24} />
//                     </div>
//                     <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
//                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{isAr ? "المقر والعنوان" : "Official Address"}</span>
//                       <span className="text-base font-semibold text-[#0a2540] leading-relaxed">
//                         {t("about_platform.contact.info.adress")}
//                       </span>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </div>

//     </div>
//   );
// };

// // Composant réutilisable pour la "Bento Grid" (Onglet About)
// const BentoCard = ({ icon, title }) => (
//   <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 flex items-center gap-5 flex-1 group">
//     <div className="w-14 h-14 bg-emerald-50 text-[#0fa968] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0fa968] group-hover:text-white transition-all duration-300">
//       {icon}
//     </div>
//     <h3 className="text-base font-bold text-[#0a2540] leading-snug">
//       {title}
//     </h3>
//   </div>
// );

// export default AboutPage;












import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Info,
  Target,
  Eye,
  Award,
  Mail,
  Phone,
  MapPin,
  Compass,
  Layers,
  Globe,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const dir = isAr ? "rtl" : "ltr";
  
  const [activeTab, setActiveTab] = useState("about");

  // Définition des onglets
  const tabs = [
    { id: "about", label: t("about_platform.about.title"), icon: <Info size={16} /> },
    { id: "vision", label: t("about_platform.vision.title"), icon: <Eye size={16} /> },
    { id: "mission", label: t("about_platform.mission.title"), icon: <Target size={16} /> },
    { id: "goals", label: t("about_platform.goals.title"), icon: <Award size={16} /> },
    { id: "contact", label: t("about_platform.contact.title"), icon: <Mail size={16} /> },
  ];

  return (
    <div dir={dir} className="min-h-screen bg-[#f8fafc] relative overflow-hidden pb-20">

      {/* ================= BACKGROUND MESH GRADIENTS ================= */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#e2f4eb] to-transparent opacity-60 pointer-events-none -z-10" />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-20 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ================= HERO SECTION (Airy & Modern) ================= */}
      <div className="relative py-24 bg-emerald-600 text-white overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -top-40 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#0fa968]/10 rounded-full blur-[120px] -bottom-40 -right-20"></div>

        <div className="max-w-5xl mx-auto px-6 text-start relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-4 leading-tight"
          >
            {t("about_platform.about.title")}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed font-medium"
          >
            {t("about_platform.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* ================= MAGIC PILL NAVIGATION ================= */}
      <div className="max-w-4xl mx-auto px-6 relative -mt-8 z-20 mb-16">
        <div className="bg-white/80 backdrop-blur-xl rounded-full border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-1.5 flex flex-wrap md:flex-nowrap justify-between gap-1 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-bold text-sm transition-colors z-10 ${
                activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-emerald-600"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-emerald-600 rounded-full -z-10 shadow-lg shadow-emerald-500/25"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= DYNAMIC CONTENT CONTAINER ================= */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            
            {/* 1. ONGLET: ABOUT (Bento Grid) */}
            {activeTab === "about" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Carte Principale */}
                <div className={`lg:col-span-12 bg-white p-1 md:px-14 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden flex flex-col justify-center group ${isAr ? "text-right" : "text-left"}`}>
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                  
                  <div className="relative z-10 w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Info size={32} className="text-emerald-600" />
                  </div>
                  
                  <h3 className="relative z-10 text-3xl md:text-4xl font-black mb-6 text-emerald-600">
                    {t("about_platform.about.title")}
                  </h3>
                  <p className="relative z-10 text-black text-xl leading-relaxed text-justify">
                    <span className="font-medium">{t("about_platform.about.description_about")}</span>
                    {t("about_platform.about.description_about1")}
                    <span className="font-medium">{t("about_platform.about.description_about2")}</span>
                    {t("about_platform.about.description_about3")}
                  </p>
                </div>

                {/* Cartes Latérales */}
                {/* <div className="lg:col-span-4 flex flex-col gap-6 ">
                  <BentoCard icon={<Globe />} className="text-black" title={isAr ? "تعزيز التكامل الصناعي العربي" : "Enhancing Arab industrial integration"} />
                  <BentoCard icon={<Layers />} title={isAr ? "ربط أصحاب المصلحة رقمياً" : "Digitally connecting ecosystem stakeholders"} />
                  <BentoCard icon={<Compass />} title={isAr ? "مساحة معرفية مخصصة للتطوير" : "Dedicated knowledge space for R&D development"} />
                </div> */}
              </div>
            )}

            {/* 2. ONGLET: VISION & 3. MISSION (Heroic Cards) */}
            {(activeTab === "vision" || activeTab === "mission") && (
              <div className={`relative bg-white p-10 md:px-14 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
                <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} opacity-[0.02] pointer-events-none transform ${isAr ? '-translate-x-1/4' : 'translate-x-1/4'} -translate-y-1/4 text-emerald-600`}>
                  {activeTab === "vision" ? <Eye size={500} /> : <Target size={500} />}
                </div>

                <div className="relative z-10 max-w-4xl">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100 shadow-sm">
                    {activeTab === "vision" ? <Eye size={32} /> : <Target size={32} />}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-emerald-600 mb-8">
                    {activeTab === "vision" 
                      ? t("about_platform.vision.title")
                      : t("about_platform.mission.title")}
                  </h2>
                  <p className="text-black text-xl text-justify">
                    {activeTab === "vision" 
                      ? t("about_platform.vision.description_vision")
                      : t("about_platform.mission.description_mission")}
                  </p>
                </div>
              </div>
            )}

            {/* 4. ONGLET: GOALS */}
            {activeTab === "goals" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className={`bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden ${isAr ? "text-right" : "text-left"}`}>
                    <span className={`absolute top-4 ${isAr ? 'left-6' : 'right-6'} text-8xl font-black text-gray-50 group-hover:text-emerald-50 transition-colors duration-300 z-0 select-none`}>
                      {num}
                    </span>
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm">
                        <Award size={24} />
                      </div>
                      {/* Description qui devient émeraude au hover */}
                      <p className="text-black group-hover:text-emerald-600 text-justify text-xl  transition-colors duration-300">
                        {t(`about_platform.goals.g${num}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. ONGLET: CONTACT */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Intro à gauche */}
                <div className={`lg:col-span-5 ${isAr ? "text-right" : "text-left"}`}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-sm mb-6 shadow-sm">
                    <Mail size={16} />
                    {isAr ? "تواصل معنا" : "Get in touch"}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-emerald-600 mb-6 leading-tight">
                    {t("about_platform.contact.title")}
                  </h2>
                  <p className="text-black text-xl leading-relaxed">
                    {t("about_platform.contact.description")}
                  </p>
                </div>

                {/* Cartes contact à droite */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  
                  {/* Email */}
                  <a href={`mailto:${t("about_platform.contact.info.email")}`} className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <Mail size={28} />
                      </div>
                      <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{isAr ? "البريد الإلكتروني" : "Email Address"}</span>
                        <span className="text-xl md:text-2xl font-black text-black group-hover:text-emerald-600 transition-colors">{t("about_platform.contact.info.email")}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={28} className="text-gray-300 group-hover:text-emerald-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>

                  {/* Phone */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <Phone size={28} />
                      </div>
                      <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{isAr ? "الهاتف" : "Phone Number"}</span>
                        <span className="text-xl md:text-2xl font-black text-black group-hover:text-emerald-600 transition-colors" dir="ltr">{t("about_platform.contact.info.phone")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex items-start gap-6 group cursor-default">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 mt-1">
                      <MapPin size={28} />
                    </div>
                    <div className={`flex flex-col ${isAr ? "text-right" : "text-left"}`}>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{isAr ? "المقر والعنوان" : "Official Address"}</span>
                      <span className="text-lg md:text-xl font-bold text-black group-hover:text-emerald-600 transition-colors leading-relaxed">
                        {t("about_platform.contact.info.adress")}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

// Composant réutilisable pour la "Bento Grid" (Onglet About)
const BentoCard = ({ icon, title }) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex items-center gap-6 flex-1 group">
    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-lg font-bold text-emerald-600 group-hover:text-emerald-700 leading-snug transition-colors">
      {title}
    </h3>
  </div>
);

export default AboutPage;