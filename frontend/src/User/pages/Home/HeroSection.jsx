// import React from "react";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { Play, Search } from "lucide-react";
// import heroVideo from '../../assets/videos/Hero.mp4'; 

// const HeroSection = () => {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === "ar";

//   return (
//     <section className="relative h-screen w-full bg-[#050505] overflow-hidden">
      
//       {/* Background Video */}
//       <div className="absolute inset-0 z-0">
//         {/* Overlay pour la lisibilité du texte */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
        
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="h-full w-full object-cover grayscale opacity-40"
//           src={heroVideo}
//         />
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-6 md:px-12 relative z-20 h-full flex items-center">
//         <div className="max-w-3xl">
          
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <span className="inline-block py-1.5 px-4 rounded-full border border-emerald-600/30 bg-emerald-600/10 text-emerald-600 text-[10px] md:text-xs font-bold uppercase tracking-[3px] mb-6">
//               {t("hero.badge")}
//             </span>
//           </motion.div>

//           {/* Title */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1]"
//           >
//             {t("hero.slides.one.title")} <span className="text-emerald-600">.</span>
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="text-emerald-600 text-base md:text-xl mb-10 leading-relaxed max-w-xl"
//           >
//             {t("hero.slides.one.subtitle")}
//           </motion.p>

//           {/* Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="flex flex-wrap gap-4"
//           >
//             <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/20">
//               <Search size={20} />
//               {t("hero.slides.one.action")}
//             </button>
            
//             <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold flex items-center gap-3 transition-all backdrop-blur-md group">
//               <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <Play size={14} fill="white" className={isRtl ? "rotate-180" : ""} />
//               </div>
//               {t("hero.watch_video")}
//             </button>
//           </motion.div>
          
//         </div>
//       </div>

//     </section>
//   );
// };

// export default HeroSection;















// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { Search, ChevronDown, MapPin, Building2, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

// import platformMockup from '../../assets/images/bg/hero.jpeg'; 

// const countries = [
//   { name: "المملكة الأردنية الهاشمية", code: "jo" },
//   { name: "دولة الامارات العربية المتحدة", code: "ae" },
//   { name: "مملكة البحرين", code: "bh" },
//   { name: "الجمهورية التونسية", code: "tn" },
//   { name: "الجمهورية الجزائرية", code: "dz" },
//   { name: "المملكة العربية السعودية", code: "sa" },
//   { name: "جمهورية مصر العربية", code: "eg" },
//   { name: "المملكة المغربية", code: "ma" },
//   { name: "دولة قطر", code: "qa" },
// ];

// const HeroSection = () => {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === "ar";

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedDatabase, setSelectedDatabase] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log({ searchQuery, selectedCountry, selectedDatabase });
//   };

//   return (
//     <section className="relative min-h-screen w-full bg-[#fcfdfe] overflow-hidden flex items-center pt-24 pb-12 select-none font-sans">
      
//       {/* ========================================================================= */}
//       {/* PARTIE DROITE : L'IMAGE AVEC LA DÉCOUPE EN VAGUE (Style 288b37e3e39e78dd57c5f720b2889a84.jpg) */}
//       {/* ========================================================================= */}
//       <div className="absolute top-0 right-0 w-full lg:w-[52%] h-full z-10 pointer-events-none hidden lg:block">
        
//         {/* Bordure Turquoise Arrière Externe */}
//         <div 
//           className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-500 opacity-15"
//           style={{
//             clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 15% 50%)',
//             borderRadius: '0 0 0 120px'
//           }}
//         />

//         {/* Forme Principale Contenant l'Image + Bordure Épaisse Intégrée */}
//         <div 
//           className="absolute inset-0 bg-[#0fa968] p-[8px] pl-0 shadow-2xl"
//           style={{
//             clipPath: 'ellipse(90% 100% at 95% 50%)',
//           }}
//         >
//           {/* Conteneur Interne masquant l'image */}
//           <div className="w-full h-full relative overflow-hidden bg-slate-900">
//             {/* Overlay sombre discret pour faire ressortir les éléments de l'image */}
//             <div className="absolute inset-0 bg-slate-950/10 z-10" />
            
//             <img 
//               src={platformMockup} 
//               alt="Ecosystem Showcase" 
//               className="w-full h-full object-cover object-center scale-105"
//             />
//           </div>
//         </div>

//         {/* Ligne Blanche de Séparation Fluide Graphique */}
//         <div 
//           className="absolute inset-0 bg-white w-2 opacity-80 blur-[1px]"
//           style={{
//             clipPath: 'ellipse(90% 100% at 94.6% 50%)',
//           }}
//         />
//       </div>

//       {/* Mini vagues d'accent en bas à gauche de l'écran pour équilibrer le design */}
//       <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-teal-600/10 rounded-full blur-2xl pointer-events-none" />

//       {/* ========================================================================= */}
//       {/* PARTIE GAUCHE : TEXTE TEXTURÉ ET BARRE DE RECHERCHE ULTRA-ACCESSIBLE */}
//       {/* ========================================================================= */}
//       <div className="container mx-auto px-6 md:px-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
//         <div className="lg:col-span-7 flex flex-col justify-center text-right items-start order-2 lg:order-1 w-full">

//           {/* Titre Calibré Style Éditorial */}
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0c2340] mb-6 leading-[1.25]"
//           >
//             {t("hero.title")} <br />
//             <span className="text-[#0fa968]">
//               {t("hero.title1")}
//             </span>
//           </motion.h1>

//           {/* Sous-titre texturé */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-black text-md md:text-base mb-10 leading-relaxed max-w-xl font-medium"
//           >
//             {t("hero.description")}
//             {t("hero.description1")}
//           </motion.p>

//           {/* BARRE DE RECHERCHE INTELLIGENTE INTÉGRÉE SOUS LE TEXTE */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="w-full bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(12,35,64,0.05)] p-3"
//             dir={isRtl ? "rtl" : "ltr"}
//           >
//             <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center w-full">
              
//               {/* Champ 1 : Input texte */}
//               <div className="md:col-span-4 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-transparent focus-within:border-emerald-500/30 transition-all">
//                 <Search size={18} className="text-[#0fa968] shrink-0" />
//                 <div className="flex flex-col text-start w-full">
//                   <span className="text-[9px] text-gray-400 font-bold uppercase">{t("hero.search_label", "ابحث عن")}</span>
//                   <input 
//                     type="text" 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder={t("hero.search_placeholder", "اسم المؤسسة...")}
//                     className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-800 text-xs font-bold p-0 placeholder-gray-400"
//                   />
//                 </div>
//               </div>

//               {/* Champ 2 : Secteurs d'activité */}
//               <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl relative group cursor-pointer">
//                 <Building2 size={18} className="text-[#0fa968] shrink-0" />
//                 <div className="flex flex-col text-start w-full">
//                   <span className="text-[9px] text-gray-400 font-bold uppercase">{t("hero.type_label", "نوع المؤسسة")}</span>
//                   <select
//                     value={selectedDatabase}
//                     onChange={(e) => setSelectedDatabase(e.target.value)}
//                     className="w-full bg-transparent border-none text-xs text-gray-800 font-bold outline-none focus:ring-0 cursor-pointer p-0 appearance-none"
//                   >
//                     <option value="">{t("hero.all", "اختر النوع")}</option>
//                     <option value="scientific_research">مراكز البحث العلمي</option>
//                     <option value="ai_centers">مراكز الذكاء الإصطناعي</option>
//                     <option value="ministries">وزارات التعليم العالي</option>
//                     <option value="patents">مكاتب براءات الإختراع</option>
//                   </select>
//                 </div>
//                 <ChevronDown size={14} className="text-gray-400 absolute left-3 pointer-events-none" />
//               </div>

//               {/* Champ 3 : Pays */}
//               <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl relative group cursor-pointer">
//                 <MapPin size={18} className="text-[#0fa968] shrink-0" />
//                 <div className="flex flex-col text-start w-full">
//                   <span className="text-[9px] text-gray-400 font-bold uppercase">{t("hero.country_label", "الدولة")}</span>
//                   <select
//                     value={selectedCountry}
//                     onChange={(e) => setSelectedCountry(e.target.value)}
//                     className="w-full bg-transparent border-none text-xs text-gray-800 font-bold outline-none focus:ring-0 cursor-pointer p-0 appearance-none"
//                   >
//                     <option value="">{t("hero.select_country", "اختر الدولة")}</option>
//                     {countries.map((country) => (
//                       <option key={country.code} value={country.code}>{country.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <ChevronDown size={14} className="text-gray-400 absolute left-3 pointer-events-none" />
//               </div>

//               {/* Bouton de soumission */}
//               <div className="md:col-span-2 w-full">
//                 <button 
//                   type="submit" 
//                   className="w-full py-3.5 bg-[#0fa968] hover:bg-[#0d925b] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/10 active:scale-95"
//                 >
//                   <span>{t("hero.search_btn", "بحث")}</span>
//                   {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
//                 </button>
//               </div>

//             </form>
//           </motion.div>

//         </div>

//         {/* Espace tampon à droite pour laisser respirer l'image sur les grands écrans */}
//         <div className="lg:col-span-5 hidden lg:block" />

//       </div>
//     </section>
//   );
// };

// export default HeroSection;









// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { Search, ChevronDown, MapPin, Building2, ArrowLeft, Check, Sparkles, TrendingUp } from "lucide-react";

// import platformMockup from '../../assets/images/bg/hero.jpeg'; 

// const countries = [
//   { name: "المملكة الأردنية الهاشمية", code: "jo", flag: "https://flagcdn.com/w40/jo.png" },
//   { name: "دولة الإمارات العربية المتحدة", code: "ae", flag: "https://flagcdn.com/w40/ae.png" },
//   { name: "مملكة البحرين", code: "bh", flag: "https://flagcdn.com/w40/bh.png" },
//   { name: "الجمهورية التونسية", code: "tn", flag: "https://flagcdn.com/w40/tn.png" },
//   { name: "الجمهورية الجزائرية الديمقراطية الشعبية", code: "dz", flag: "https://flagcdn.com/w40/dz.png" },
//   { name: "جمهورية جيبوتي", code: "dj", flag: "https://flagcdn.com/w40/dj.png" },
//   { name: "المملكة العربية السعودية", code: "sa", flag: "https://flagcdn.com/w40/sa.png" },
//   { name: "جمهورية السودان", code: "sd", flag: "https://flagcdn.com/w40/sd.png" },
//   { name: "الجمهورية العربية السورية", code: "sy", flag: "https://flagcdn.com/w40/sy.png" },
//   { name: "جمهورية الصومال", code: "so", flag: "https://flagcdn.com/w40/so.png" },
//   { name: "جمهورية العراق", code: "iq", flag: "https://flagcdn.com/w40/iq.png" },
//   { name: "سلطنة عمان", code: "om", flag: "https://flagcdn.com/w40/om.png" },
//   { name: "دولة فلسطين", code: "ps", flag: "https://flagcdn.com/w40/ps.png" },
//   { name: "دولة قطر", code: "qa", flag: "https://flagcdn.com/w40/qa.png" },
//   { name: "دولة الكويت", code: "kw", flag: "https://flagcdn.com/w40/kw.png" },
//   { name: "الجمهورية اللبنانية", code: "lb", flag: "https://flagcdn.com/w40/lb.png" },
//   { name: "دولة ليبيا", code: "ly", flag: "https://flagcdn.com/w40/ly.png" },
//   { name: "جمهورية مصر العربية", code: "eg", flag: "https://flagcdn.com/w40/eg.png" },
//   { name: "المملكة المغربية", code: "ma", flag: "https://flagcdn.com/w40/ma.png" },
//   { name: "الجمهورية الإسلامية الموريتانية", code: "mr", flag: "https://flagcdn.com/w40/mr.png" },
//   { name: "الجمهورية اليمنية", code: "ye", flag: "https://flagcdn.com/w40/ye.png" },
// ];

// const databases = [
//   { id: "scientific_research", name: "مراكز البحث العلمي" },
//   { id: "ai_centers", name: "مراكز الذكاء الإصطناعي" },
//   { id: "ministries", name: "وزارات التعليم العالي" },
//   { id: "patents", name: "مكاتب براءات الإختراع" },
// ];

// const HeroSection = () => {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === "ar";

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedDatabase, setSelectedDatabase] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const searchBarRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log({ searchQuery, selectedCountry, selectedDatabase });
//     setActiveDropdown(null);
//   };

//   const toggleDropdown = (type) => {
//     setActiveDropdown(activeDropdown === type ? null : type);
//   };

//   const currentSelectedCountryObj = countries.find(c => c.code === selectedCountry);

//   // Variants pour les animations séquencées
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
//   };

//   return (
//     <section className="relative min-h-screen w-full bg-[#f8fafc] overflow-hidden flex items-center pt-28 pb-16 select-none font-sans">
      
//       {/* Motif de fond (Grille de points subtile) */}
//       <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
      
//       {/* Halos lumineux en arrière-plan */}
//       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>

//       <div className="container mx-auto px-6 md:px-12 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
//         {/* ========================================================================= */}
//         {/* PARTIE GAUCHE : TEXTE ET BARRE DE RECHERCHE PREMIUM */}
//         {/* ========================================================================= */}
//         <motion.div 
//           className="flex flex-col justify-center text-right items-start w-full"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
//             <Sparkles size={14} className="text-emerald-600" />
//             <span className="text-xs font-bold text-emerald-700">منصة عربية موحدة للابتكار</span>
//           </motion.div>

//           <motion.h1 
//             variants={itemVariants}
//             className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.15] tracking-tight"
//           >
//             {t("hero.title")} <br />
//             <span className="bg-gradient-to-l from-emerald-600 to-teal-500 bg-clip-text text-transparent">
//               {t("hero.title1")}
//             </span>
//           </motion.h1>

//           <motion.p 
//             variants={itemVariants}
//             className="text-slate-500 text-md md:text-lg mb-10 leading-relaxed max-w-xl font-medium"
//           >
//             {t("hero.description")}
//             {t("hero.description1")}
//           </motion.p>

//           {/* BARRE DE RECHERCHE : CARTE FLOTTANTE MODERNE */}
//           <motion.div
//             ref={searchBarRef}
//             variants={itemVariants}
//             className="w-full bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-3 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(16,185,129,0.1)]"
//             dir={isRtl ? "rtl" : "ltr"}
//           >
//             <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center justify-between w-full relative gap-2">
              
//               {/* Champ 1 : Input texte */}
//               <div className="flex-grow flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors group/field">
//                 <Search size={20} className="text-slate-300 group-focus-within/field:text-emerald-500 transition-colors shrink-0" />
//                 <div className="flex flex-col text-start w-full min-w-[120px]">
//                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("hero.search_label", "ابحث عن")}</span>
//                   <input 
//                     type="text" 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder={t("hero.search_placeholder", "اسم المؤسسة...")}
//                     className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-800 font-bold text-sm p-0 placeholder:text-slate-300"
//                   />
//                 </div>
//               </div>

//               <div className="hidden md:block h-10 w-px bg-slate-100 shrink-0"></div>

//               {/* Champ 2 : Secteurs d'activité */}
//               <div className="relative md:min-w-[180px]">
//                 <div 
//                   onClick={() => toggleDropdown('database')}
//                   className="flex items-center gap-3 px-4 py-2 cursor-pointer group/select select-none rounded-xl hover:bg-slate-50 transition-colors h-full"
//                 >
//                   <Building2 size={18} className={`transition-colors duration-300 shrink-0 ${activeDropdown === 'database' ? 'text-emerald-500' : 'text-slate-300 group-hover/select:text-emerald-500'}`} />
//                   <div className="flex flex-col text-start w-full">
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("hero.type_label", "نوع المؤسسة")}</span>
//                     <span className="text-sm text-slate-800 font-bold truncate">
//                       {selectedDatabase ? databases.find(d => d.id === selectedDatabase)?.name : t("hero.all", "اختر النوع")}
//                     </span>
//                   </div>
//                   <motion.div animate={{ rotate: activeDropdown === 'database' ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
//                     <ChevronDown size={16} className="text-slate-300" />
//                   </motion.div>
//                 </div>

//                 <AnimatePresence>
//                   {activeDropdown === 'database' && (
//                     <motion.ul
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                       className="absolute top-[110%] left-0 right-0 md:right-auto md:min-w-full bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 max-h-60 overflow-y-auto backdrop-blur-xl"
//                     >
//                       <li 
//                         onClick={() => { setSelectedDatabase(""); setActiveDropdown(null); }}
//                         className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg cursor-pointer transition-colors ${!selectedDatabase ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                       >
//                         <span>{t("hero.all", "كل الأنواع")}</span>
//                         {!selectedDatabase && <Check size={16} />}
//                       </li>
//                       {databases.map((db) => (
//                         <li 
//                           key={db.id}
//                           onClick={() => { setSelectedDatabase(db.id); setActiveDropdown(null); }}
//                           className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg cursor-pointer transition-colors ${selectedDatabase === db.id ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                         >
//                           <span>{db.name}</span>
//                           {selectedDatabase === db.id && <Check size={16} />}
//                         </li>
//                       ))}
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <div className="hidden md:block h-10 w-px bg-slate-100 shrink-0"></div>

//               {/* Champ 3 : Pays */}
//               <div className="relative md:min-w-[160px]">
//                 <div 
//                   onClick={() => toggleDropdown('country')}
//                   className="flex items-center gap-3 px-4 py-2 cursor-pointer group/country select-none rounded-xl hover:bg-slate-50 transition-colors h-full"
//                 >
//                   <MapPin size={18} className={`transition-colors duration-300 shrink-0 ${activeDropdown === 'country' ? 'text-emerald-500' : 'text-slate-300 group-hover/country:text-emerald-500'}`} />
//                   <div className="flex flex-col text-start w-full">
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("hero.country_label", "الدولة")}</span>
                    
//                     <div className="flex items-center gap-2 max-w-full">
//                       {selectedCountry && currentSelectedCountryObj && (
//                         <img src={currentSelectedCountryObj.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
//                       )}
//                       <span className="text-sm text-slate-800 font-bold truncate">
//                         {selectedCountry && currentSelectedCountryObj ? currentSelectedCountryObj.name : t("hero.select_country", "اختر الدولة")}
//                       </span>
//                     </div>
//                   </div>
//                   <motion.div animate={{ rotate: activeDropdown === 'country' ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
//                     <ChevronDown size={16} className="text-slate-300" />
//                   </motion.div>
//                 </div>

//                 <AnimatePresence>
//                   {activeDropdown === 'country' && (
//                     <motion.ul
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                       className="absolute top-[110%] left-0 right-0 md:right-auto md:min-w-full bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 max-h-56 overflow-y-auto backdrop-blur-xl"
//                     >
//                       <li 
//                         onClick={() => { setSelectedCountry(""); setActiveDropdown(null); }}
//                         className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg cursor-pointer transition-colors ${!selectedCountry ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                       >
//                         <span>{t("hero.select_country_all", "كل الدول")}</span>
//                         {!selectedCountry && <Check size={16} />}
//                       </li>
//                       {countries.map((country) => (
//                         <li 
//                           key={country.code}
//                           onClick={() => { setSelectedCountry(country.code); setActiveDropdown(null); }}
//                           className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg cursor-pointer transition-colors ${selectedCountry === country.code ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <img src={country.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
//                             <span className="truncate">{country.name}</span>
//                           </div>
//                           {selectedCountry === country.code && <Check size={16} />}
//                         </li>
//                       ))}
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Bouton de soumission */}
//               <motion.button 
//                 type="submit" 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3.5 bg-gradient-to-l from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 shrink-0"
//               >
//                 <span>{t("hero.search_btn", "بحث")}</span>
//                 {isRtl ? <ArrowLeft size={18} /> : <ArrowLeft size={18} className="rotate-180" />}
//               </motion.button>

//             </form>
//           </motion.div>

//           {/* Petit texte de confiance sous la barre de recherche */}
//           <motion.div variants={itemVariants} className="flex items-center gap-4 mt-6 text-slate-400 text-xs font-medium">
//             <div className="flex items-center gap-1.5">
//               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//               <span>تحديث فوري للبيانات</span>
//             </div>
//             <div className="w-px h-3 bg-slate-200"></div>
//             <span>أكثر من 5000 مؤسسة مسجلة</span>
//           </motion.div>

//         </motion.div>

//         {/* ========================================================================= */}
//         {/* PARTIE DROITE : MOCKUP AVEC EFFET BENTO & CARDS FLOTTANTES */}
//         {/* ========================================================================= */}
//         <motion.div 
//           className="hidden lg:block relative"
//           initial={{ opacity: 0, scale: 0.9, x: 50 }}
//           animate={{ opacity: 1, scale: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {/* Conteneur principal de l'image */}
//           <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white rotate-2 transition-transform duration-500 hover:rotate-0">
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10"></div>
//             <img 
//               src={platformMockup} 
//               alt="Platform Showcase" 
//               className="w-full h-[550px] object-cover"
//             />
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;




// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { Search, ChevronDown, MapPin, Building2, ArrowLeft, Check, Sparkles, Cpu, Globe2 } from "lucide-react";

// import platformMockup from '../../assets/images/bg/hero.jpeg'; 

// const countries = [
//   { name: "المملكة الأردنية الهاشمية", code: "jo", flag: "https://flagcdn.com/w40/jo.png" },
//   { name: "دولة الإمارات العربية المتحدة", code: "ae", flag: "https://flagcdn.com/w40/ae.png" },
//   { name: "مملكة البحرين", code: "bh", flag: "https://flagcdn.com/w40/bh.png" },
//   { name: "الجمهورية التونسية", code: "tn", flag: "https://flagcdn.com/w40/tn.png" },
//   { name: "الجمهورية الجزائرية الديمقراطية الشعبية", code: "dz", flag: "https://flagcdn.com/w40/dz.png" },
//   { name: "جمهورية جيبوتي", code: "dj", flag: "https://flagcdn.com/w40/dj.png" },
//   { name: "المملكة العربية السعودية", code: "sa", flag: "https://flagcdn.com/w40/sa.png" },
//   { name: "جمهورية السودان", code: "sd", flag: "https://flagcdn.com/w40/sd.png" },
//   { name: "الجمهورية العربية السورية", code: "sy", flag: "https://flagcdn.com/w40/sy.png" },
//   { name: "جمهورية الصومال", code: "so", flag: "https://flagcdn.com/w40/so.png" },
//   { name: "جمهورية العراق", code: "iq", flag: "https://flagcdn.com/w40/iq.png" },
//   { name: "سلطنة عمان", code: "om", flag: "https://flagcdn.com/w40/om.png" },
//   { name: "دولة فلسطين", code: "ps", flag: "https://flagcdn.com/w40/ps.png" },
//   { name: "دولة قطر", code: "qa", flag: "https://flagcdn.com/w40/qa.png" },
//   { name: "دولة الكويت", code: "kw", flag: "https://flagcdn.com/w40/kw.png" },
//   { name: "الجمهورية اللبنانية", code: "lb", flag: "https://flagcdn.com/w40/lb.png" },
//   { name: "دولة ليبيا", code: "ly", flag: "https://flagcdn.com/w40/ly.png" },
//   { name: "جمهورية مصر العربية", code: "eg", flag: "https://flagcdn.com/w40/eg.png" },
//   { name: "المملكة المغربية", code: "ma", flag: "https://flagcdn.com/w40/ma.png" },
//   { name: "الجمهورية الإسلامية الموريتانية", code: "mr", flag: "https://flagcdn.com/w40/mr.png" },
//   { name: "الجمهورية اليمنية", code: "ye", flag: "https://flagcdn.com/w40/ye.png" },
// ];

// const databases = [
//   { id: "scientific_research", name: "مراكز البحث العلمي" },
//   { id: "ai_centers", name: "مراكز الذكاء الإصطناعي" },
//   { id: "ministries", name: "وزارات التعليم العالي" },
//   { id: "patents", name: "مكاتب براءات الإختراع" },
// ];

// const HeroSection = () => {
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === "ar";

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedDatabase, setSelectedDatabase] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const searchBarRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log({ searchQuery, selectedCountry, selectedDatabase });
//     setActiveDropdown(null);
//   };

//   const toggleDropdown = (type) => {
//     setActiveDropdown(activeDropdown === type ? null : type);
//   };

//   const currentSelectedCountryObj = countries.find(c => c.code === selectedCountry);

//   // Animations séquencées
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
//   };

//   return (
//     <section className="relative min-h-screen w-full bg-[#f8fafc] overflow-hidden flex items-center pt-28 pb-20 select-none font-sans">
      
//       {/* ======================= EFFETS DE FOND IMMERSIFS ======================= */}
//       {/* Grille de points subtile */}
//       <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
//       {/* Halos lumineux (Aurora Effect) */}
//       <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none animate-pulse-slow"></div>
//       <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-[130px] pointer-events-none"></div>
//       <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-cyan-300/10 rounded-full blur-[100px] pointer-events-none"></div>

//       <div className="container mx-auto px-6 md:px-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
//         {/* ======================= COLONNE GAUCHE : TEXTE & RECHERCHE ======================= */}
//         <motion.div 
//           className="lg:col-span-6 flex flex-col justify-center text-right items-start w-full"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Badge Premium */}
//           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-full mb-8 backdrop-blur-sm">
//             <span className="flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//             </span>
//             <span className="text-xs font-bold text-slate-700 tracking-wide">المنصة العربية الأولى للابتكار والبحث العلمي</span>
//           </motion.div>

//           {/* Titre Masse et Élégant */}
//           <motion.h1 
//             variants={itemVariants}
//             className="text-4xl md:text-5xl lg:text-[4.5rem] font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tighter"
//           >
//             {t("hero.title")} <br />
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-l from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
//                 {t("hero.title1")}
//               </span>
//               {/* Soulignement dessiné */}
//               <svg className="absolute -bottom-2 right-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M2 10C50 4 150 2 198 8" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
//               </svg>
//             </span>
//           </motion.h1>

//           <motion.p 
//             variants={itemVariants}
//             className="text-slate-500 text-md md:text-lg mb-10 leading-relaxed max-w-xl font-medium"
//           >
//             {t("hero.description")}
//             {t("hero.description1")}
//           </motion.p>

//           {/* BARRE DE RECHERCHE : GLASSMORPHISM CARD */}
//           <motion.div
//             ref={searchBarRef}
//             variants={itemVariants}
//             className="w-full bg-white/70 backdrop-blur-xl rounded-[1.5rem] shadow-[0_10px_50px_rgba(16,185,129,0.08)] border border-white/80 p-3 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]"
//             dir={isRtl ? "rtl" : "ltr"}
//           >
//             <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center justify-between w-full relative gap-2">
              
//               {/* Champ 1 : Input texte */}
//               <div className="flex-grow flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white transition-colors group/field">
//                 <Search size={20} className="text-slate-300 group-focus-within/field:text-emerald-500 transition-colors shrink-0" />
//                 <div className="flex flex-col text-start w-full min-w-[120px]">
//                   <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("hero.search_label", "ابحث عن")}</span>
//                   <input 
//                     type="text" 
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder={t("hero.search_placeholder", "اسم المؤسسة...")}
//                     className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-800 font-bold text-sm p-0 placeholder:text-slate-300"
//                   />
//                 </div>
//               </div>

//               <div className="hidden md:block h-10 w-px bg-slate-200/50 shrink-0"></div>

//               {/* Champ 2 : Type d'institution */}
//               <div className="relative md:min-w-[180px]">
//                 <div 
//                   onClick={() => toggleDropdown('database')}
//                   className="flex items-center gap-3 px-4 py-2.5 cursor-pointer group/select select-none rounded-xl hover:bg-white transition-colors h-full"
//                 >
//                   <Building2 size={18} className={`transition-colors duration-300 shrink-0 ${activeDropdown === 'database' ? 'text-emerald-500' : 'text-slate-300 group-hover/select:text-emerald-500'}`} />
//                   <div className="flex flex-col text-start w-full">
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("hero.type_label", "نوع المؤسسة")}</span>
//                     <span className="text-sm text-slate-800 font-bold truncate">
//                       {selectedDatabase ? databases.find(d => d.id === selectedDatabase)?.name : t("hero.all", "اختر النوع")}
//                     </span>
//                   </div>
//                   <motion.div animate={{ rotate: activeDropdown === 'database' ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
//                     <ChevronDown size={16} className="text-slate-300" />
//                   </motion.div>
//                 </div>

//                 <AnimatePresence>
//                   {activeDropdown === 'database' && (
//                     <motion.ul
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                       className="absolute top-[110%] left-0 right-0 md:right-auto md:min-w-full bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 max-h-60 overflow-y-auto"
//                     >
//                       <li 
//                         onClick={() => { setSelectedDatabase(""); setActiveDropdown(null); }}
//                         className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl cursor-pointer transition-colors ${!selectedDatabase ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                       >
//                         <span>{t("hero.all", "كل الأنواع")}</span>
//                         {!selectedDatabase && <Check size={16} />}
//                       </li>
//                       {databases.map((db) => (
//                         <li 
//                           key={db.id}
//                           onClick={() => { setSelectedDatabase(db.id); setActiveDropdown(null); }}
//                           className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl cursor-pointer transition-colors ${selectedDatabase === db.id ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                         >
//                           <span>{db.name}</span>
//                           {selectedDatabase === db.id && <Check size={16} />}
//                         </li>
//                       ))}
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <div className="hidden md:block h-10 w-px bg-slate-200/50 shrink-0"></div>

//               {/* Champ 3 : Pays */}
//               <div className="relative md:min-w-[160px]">
//                 <div 
//                   onClick={() => toggleDropdown('country')}
//                   className="flex items-center gap-3 px-4 py-2.5 cursor-pointer group/country select-none rounded-xl hover:bg-white transition-colors h-full"
//                 >
//                   <MapPin size={18} className={`transition-colors duration-300 shrink-0 ${activeDropdown === 'country' ? 'text-emerald-500' : 'text-slate-300 group-hover/country:text-emerald-500'}`} />
//                   <div className="flex flex-col text-start w-full">
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t("hero.country_label", "الدولة")}</span>
                    
//                     <div className="flex items-center gap-2 max-w-full">
//                       {selectedCountry && currentSelectedCountryObj && (
//                         <img src={currentSelectedCountryObj.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
//                       )}
//                       <span className="text-sm text-slate-800 font-bold truncate">
//                         {selectedCountry && currentSelectedCountryObj ? currentSelectedCountryObj.name : t("hero.select_country", "اختر الدولة")}
//                       </span>
//                     </div>
//                   </div>
//                   <motion.div animate={{ rotate: activeDropdown === 'country' ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
//                     <ChevronDown size={16} className="text-slate-300" />
//                   </motion.div>
//                 </div>

//                 <AnimatePresence>
//                   {activeDropdown === 'country' && (
//                     <motion.ul
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                       className="absolute top-[110%] left-0 right-0 md:right-auto md:min-w-full bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-50 max-h-56 overflow-y-auto"
//                     >
//                       <li 
//                         onClick={() => { setSelectedCountry(""); setActiveDropdown(null); }}
//                         className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl cursor-pointer transition-colors ${!selectedCountry ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                       >
//                         <span>{t("hero.select_country_all", "كل الدول")}</span>
//                         {!selectedCountry && <Check size={16} />}
//                       </li>
//                       {countries.map((country) => (
//                         <li 
//                           key={country.code}
//                           onClick={() => { setSelectedCountry(country.code); setActiveDropdown(null); }}
//                           className={`flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl cursor-pointer transition-colors ${selectedCountry === country.code ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <img src={country.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
//                             <span className="truncate">{country.name}</span>
//                           </div>
//                           {selectedCountry === country.code && <Check size={16} />}
//                         </li>
//                       ))}
//                     </motion.ul>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Bouton de soumission - Effet Glow */}
//               <motion.button 
//                 type="submit" 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3.5 mt-2 md:mt-0 bg-gradient-to-l from-emerald-600 to-teal-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 shrink-0"
//               >
//                 <span>{t("hero.search_btn", "بحث")}</span>
//                 {isRtl ? <ArrowLeft size={18} /> : <ArrowLeft size={18} className="rotate-180" />}
//               </motion.button>

//             </form>
//           </motion.div>

//         </motion.div>

//         {/* ======================= COLONNE DROITE : VISUEL 3D & CARDS ======================= */}
//         <motion.div 
//           className="lg:col-span-6 hidden lg:flex justify-center items-center relative w-full h-[600px]"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {/* Cercles lumineux décoratifs en fond de l'image */}
//           <div className="absolute w-[500px] h-[500px] border border-emerald-500/10 rounded-full"></div>
//           <div className="absolute w-[650px] h-[650px] border border-emerald-500/5 rounded-full"></div>
          
//           {/* Conteneur 3D Principal */}
//           <div className="relative w-full max-w-[550px]" style={{ perspective: '1000px' }}>
            
//             {/* Image inclinée avec effet de survol */}
//             <motion.div 
//               className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white"
//               style={{ transformStyle: 'preserve-3d' }}
//               whileHover={{ rotateY: -5, rotateX: 5, transition: { duration: 0.4 } }}
//             >
//                 <img 
//                   src={platformMockup} 
//                   alt="Platform Showcase" 
//                   className="w-full h-[450px] object-cover"
//                 />
//                 {/* Dégradé sombre en bas de l'image */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
//             </motion.div>

//             {/* Carte Flottante 1 : Statistique AI (En haut à droite) */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20, x: -20 }}
//               animate={{ opacity: 1, y: 0, x: 0 }}
//               transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
//               className="absolute -top-8 -left-8 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3"
//               style={{ transform: 'translateZ(60px)' }}
//             >
//               <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
//                 <Cpu size={24} />
//               </div>
//               <div>
//                 <p className="text-lg font-black text-slate-800 leading-none">+450</p>
//                 <p className="text-xs text-slate-500 font-medium mt-1">مركز ذكاء اصطناعي</p>
//               </div>
//             </motion.div>

//             {/* Carte Flottante 2 : Drapeaux Arabes (En bas à gauche) */}
//             <motion.div 
//               initial={{ opacity: 0, y: -20, x: 20 }}
//               animate={{ opacity: 1, y: 0, x: 0 }}
//               transition={{ delay: 1, duration: 0.6, type: "spring" }}
//               className="absolute -bottom-8 -right-8 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/80 w-[260px]"
//               style={{ transform: 'translateZ(80px)' }}
//             >
//               <div className="flex items-center gap-2 mb-3">
//                 <Globe2 size={18} className="text-emerald-600" />
//                 <p className="text-sm font-bold text-slate-800">تغطية عربية شاملة</p>
//               </div>
//               <div className="flex -space-x-2.5 rtl:space-x-reverse">
//                 <img src="https://flagcdn.com/w40/sa.png" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" alt="Saudi Arabia" />
//                 <img src="https://flagcdn.com/w40/ae.png" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" alt="UAE" />
//                 <img src="https://flagcdn.com/w40/eg.png" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" alt="Egypt" />
//                 <img src="https://flagcdn.com/w40/ma.png" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" alt="Morocco" />
//                 <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">+17</div>
//               </div>
//             </motion.div>

//             {/* Ligne décorative animée */}
//             <motion.div 
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ pathLength: 1, opacity: 1 }}
//               transition={{ duration: 1.5, delay: 0.5 }}
//               className="absolute top-1/2 -right-20 w-20 h-1 bg-gradient-to-l from-emerald-500 to-transparent hidden xl:block"
//             ></motion.div>

//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;




import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, MapPin, ArrowLeft, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiAdmin from "../../../api/apiAdmin";

import backgroundVideo from '../../assets/videos/bg home.mp4';

const fallbackCountries = [
  { id: 1, name: "المملكة الأردنية الهاشمية", code: "jo", flag: "https://flagcdn.com/w40/jo.png" },
  { id: 2, name: "دولة الإمارات العربية المتحدة", code: "ae", flag: "https://flagcdn.com/w40/ae.png" },
  { id: 3, name: "مملكة البحرين", code: "bh", flag: "https://flagcdn.com/w40/bh.png" },
  { id: 4, name: "الجمهورية التونسية", code: "tn", flag: "https://flagcdn.com/w40/tn.png" },
  { id: 5, name: "الجمهورية الجزائرية الديمقراطية الشعبية", code: "dz", flag: "https://flagcdn.com/w40/dz.png" },
  { id: 6, name: "جمهورية جيبوتي", code: "dj", flag: "https://flagcdn.com/w40/dj.png" },
  { id: 7, name: "المملكة العربية السعودية", code: "sa", flag: "https://flagcdn.com/w40/sa.png" },
  { id: 8, name: "جمهورية السودان", code: "sd", flag: "https://flagcdn.com/w40/sd.png" },
  { id: 9, name: "الجمهورية العربية السورية", code: "sy", flag: "https://flagcdn.com/w40/sy.png" },
  { id: 10, name: "جمهورية الصومال", code: "so", flag: "https://flagcdn.com/w40/so.png" },
  { id: 11, name: "جمهورية العراق", code: "iq", flag: "https://flagcdn.com/w40/iq.png" },
  { id: 12, name: "سلطنة عمان", code: "om", flag: "https://flagcdn.com/w40/om.png" },
  { id: 13, name: "دولة فلسطين", code: "ps", flag: "https://flagcdn.com/w40/ps.png" },
  { id: 14, name: "دولة قطر", code: "qa", flag: "https://flagcdn.com/w40/qa.png" },
  { id: 15, name: "دولة الكويت", code: "kw", flag: "https://flagcdn.com/w40/kw.png" },
  { id: 16, name: "الجمهورية اللبنانية", code: "lb", flag: "https://flagcdn.com/w40/lb.png" },
  { id: 17, name: "دولة ليبيا", code: "ly", flag: "https://flagcdn.com/w40/ly.png" },
  { id: 18, name: "جمهورية مصر العربية", code: "eg", flag: "https://flagcdn.com/w40/eg.png" },
  { id: 19, name: "المملكة المغربية", code: "ma", flag: "https://flagcdn.com/w40/ma.png" },
  { id: 20, name: "الجمهورية الإسلامية الموريتانية", code: "mr", flag: "https://flagcdn.com/w40/mr.png" },
  { id: 21, name: "الجمهورية اليمنية", code: "ye", flag: "https://flagcdn.com/w40/ye.png" },
];

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState(fallbackCountries);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    apiAdmin.get("/pays")
      .then(({ data }) => {
        const records = Array.isArray(data?.data) ? data.data : data;
        if (!isMounted || !Array.isArray(records)) return;

        const allCountries = records.map((country) => {
          const fallback = fallbackCountries.find(
            (item) => String(item.id) === String(country.idPays)
          );

          return {
            id: country.idPays,
            name: country.nomPays,
            code: fallback?.code || String(country.idPays),
            flag: fallback?.flag || null,
          };
        });

        setCountries(allCountries);
      })
      .catch(() => {
        // La liste locale reste disponible si l'API est momentanément inaccessible.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ category: "all" });
    const query = searchQuery.trim();
    if (query) params.set("q", query);
    if (currentSelectedCountryObj) {
      params.set("country", currentSelectedCountryObj.name);
      params.set("country_id", String(currentSelectedCountryObj.id));
    }

    setActiveDropdown(null);
    navigate(`/researchDatabase?${params.toString()}`);
  };

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const currentSelectedCountryObj = countries.find(c => c.code === selectedCountry);
  const orderedCountries = [...countries].sort(
    (countryA, countryB) => Number(countryA.id) - Number(countryB.id)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center select-none font-sans">
      
      {/* ======================= VIDÉO EN PLEIN ÉCRAN ======================= */}
      <div className="absolute inset-0 z-0">
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        {/* Overlay sombre cinématique pour forcer le contraste du texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-500/20 to-slate-400/30"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950/80 to-transparent"></div>
      </div>

      {/* Conteneur de contenu principal */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full pt-28 pb-20">
        
        {/* ======================= COLONNE GAUCHE : TEXTE & RECHERCHE ======================= */}
        <motion.div 
          className={`lg:col-span-8 flex flex-col justify-center items-start w-full mx-auto ${isRtl ? "text-right" : "text-left"}`}
          dir={isRtl ? "rtl" : "ltr"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-4 py-2.5 mb-7 rounded-full border border-emerald-300/25 bg-slate-950/35 shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-300/25">
              <Sparkles size={14} className="text-emerald-300" />
            </span>
            <span className={`text-[10px] md:text-[11px] font-bold text-white/90 ${isRtl ? "tracking-normal" : "uppercase tracking-[0.16em]"}`}>
              المنصة العربية الأولى للابتكار والبحث العلمي
            </span>
          </motion.div>

          {/* Titre éditorial */}
          <motion.h1 
            variants={itemVariants}
            className="max-w-4xl mb-6 text-[clamp(2.1rem,4.8vw,4.5rem)] font-black leading-[1.08] tracking-[-0.03em] [text-shadow:0_8px_35px_rgba(0,0,0,0.55)]"
          >
            <span className="block text-white/95">{t("hero.title")}</span>
            <span className="relative mt-2 inline-block pb-3">
              <span className="relative z-10 bg-gradient-to-l from-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                {t("hero.title1")}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-gradient-to-l from-emerald-400 via-teal-300 to-transparent opacity-80" />
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mb-9 text-sm md:text-base font-normal leading-[1.8] text-slate-100/80 [text-shadow:0_2px_15px_rgba(0,0,0,0.45)]"
          >
            {t("hero.description")}
            {t("hero.description1")}
          </motion.p>

          {/* BARRE DE RECHERCHE : CARTE CLAIRE FLOTTANTE */}
          <motion.div
            ref={searchBarRef}
            variants={itemVariants}
            className="w-full rounded-[1.75rem] border border-white/70 bg-white/90 p-2.5 shadow-[0_24px_70px_rgba(2,12,27,0.28)] backdrop-blur-2xl"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <form onSubmit={handleSearch} className="relative flex w-full flex-col items-stretch gap-2 md:flex-row md:items-center">
              
              {/* Champ 1 : Input texte */}
              <div className="group/field flex min-h-[64px] flex-grow items-center gap-3 rounded-2xl border border-transparent bg-slate-50/90 px-4 py-2.5 transition-all hover:border-slate-200 hover:bg-white focus-within:border-emerald-400/50 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(52,211,153,0.1)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-focus-within/field:bg-emerald-500 group-focus-within/field:text-white">
                  <Search size={18} />
                </span>
                <div className="flex flex-col text-start w-full min-w-[120px]">
                  <span className="mb-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">{t("hero.search_label", "ابحث عن")}</span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("hero.search_placeholder", "اسم المؤسسة...")}
                    className="w-full border-none bg-transparent p-0 text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                  />
                </div>
              </div>

              {/* Champ 2 : Pays */}
              <div className="relative md:min-w-[160px]">
                <div 
                  onClick={() => toggleDropdown('country')}
                  className={`group/country flex min-h-[64px] h-full cursor-pointer select-none items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all ${activeDropdown === 'country' ? 'border-emerald-400/50 bg-emerald-50/70 shadow-[0_0_0_4px_rgba(52,211,153,0.08)]' : 'border-transparent bg-slate-50/90 hover:border-slate-200 hover:bg-white'}`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${activeDropdown === 'country' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                    <MapPin size={18} />
                  </span>
                  <div className="flex flex-col text-start w-full">
                    <span className="mb-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">{t("hero.country_label", "الدولة")}</span>
                    
                    <div className="flex items-center gap-2 max-w-full">
                      {selectedCountry && currentSelectedCountryObj?.flag && (
                        <img src={currentSelectedCountryObj.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
                      )}
                      <span className="truncate text-sm font-bold text-slate-800">
                        {selectedCountry && currentSelectedCountryObj ? currentSelectedCountryObj.name : t("hero.select_country", "اختر الدولة")}
                      </span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: activeDropdown === 'country' ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeDropdown === 'country' && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`absolute top-[112%] z-50 grid max-h-[55vh] w-[min(360px,calc(100vw-3rem))] grid-cols-1 gap-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_20px_55px_rgba(15,23,42,0.22)] backdrop-blur-xl ${isRtl ? "right-0" : "left-0"}`}
                    >
                      <li 
                        onClick={() => { setSelectedCountry(""); setActiveDropdown(null); }}
                        className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${!selectedCountry ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        <span>{t("hero.select_country_all", "كل الدول")}</span>
                        {!selectedCountry && <Check size={16} />}
                      </li>
                      {orderedCountries.map((country) => (
                        <li 
                          key={country.code}
                          onClick={() => { setSelectedCountry(country.code); setActiveDropdown(null); }}
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${selectedCountry === country.code ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          <div className="flex items-center gap-2">
                            {country.flag ? (
                              <img src={country.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
                            ) : (
                              <MapPin size={14} className="shrink-0 text-slate-400" />
                            )}
                            <span className="truncate">{country.name}</span>
                          </div>
                          {selectedCountry === country.code && <Check size={16} />}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Bouton de soumission */}
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex min-h-[64px] shrink-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-emerald-600 to-teal-500 px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(5,150,105,0.3)] transition-all hover:from-emerald-500 hover:to-teal-400 hover:shadow-[0_15px_35px_rgba(5,150,105,0.4)]"
              >
                <span>{t("hero.search_btn", "بحث")}</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15">
                  {isRtl ? <ArrowLeft size={17} /> : <ArrowLeft size={17} className="rotate-180" />}
                </span>
              </motion.button>

            </form>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
