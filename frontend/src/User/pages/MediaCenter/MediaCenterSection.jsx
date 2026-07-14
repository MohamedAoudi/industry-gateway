// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { 
//   Newspaper, 
//   Calendar, 
//   FileText, 
//   Trophy, 
//   Sparkles,
//   ArrowUpRight,
//   Download,
//   MapPin,
//   Loader2
// } from "lucide-react";

// const TABS = [
//   { id: "news", labelKey: "submenu.media_center.news", icon: <Newspaper className="h-4 w-4 md:h-5 md:w-5" /> },
//   { id: "events", labelKey: "submenu.media_center.events", icon: <Calendar className="h-4 w-4 md:h-5 md:w-5" /> },
//   { id: "releases", labelKey: "submenu.media_center.releases", icon: <FileText className="h-4 w-4 md:h-5 md:w-5" /> },
//   { id: "competitions_prizes", labelKey: "submenu.media_center.competitions_prizes", icon: <Trophy className="h-4 w-4 md:h-5 md:w-5" /> },
//   { id: "success_stories", labelKey: "submenu.media_center.success_stories", icon: <Sparkles className="h-4 w-4 md:h-5 md:w-5" /> }
// ];

// // =========================================================================
// // DONNÉES STATIQUES (MOCK DATA)
// // =========================================================================
// const MOCK_DATA = {
//   news: [
//     {
//       idCenter: 1,
//       photo: null, // Sera remplacé par l'image Unsplash par défaut dans le code
//       titre_ar: "إطلاق المبادرة العربية لدعم ابتكارات الذكاء الاصطناعي في الصناعة",
//       titre_en: "Launch of the Arabic Initiative to Support AI Innovations in Industry",
//       description_ar: "شهدت أعمال المؤتمر اليوم إطلاق مبادرة جديدة تهدف إلى تمويل الشراكات بين مراكز الأبحاث والمصانع لتبني حلول الذكاء الاصطناعي.",
//       description_en: "Today's conference witnessed the launch of a new initiative aimed at funding partnerships between research centers and factories.",
//       created_at: "2026-06-15T10:00:00Z",
//       url: "https://example.com"
//     },
//     {
//       idCenter: 2,
//       photo: null,
//       titre_ar: "توقيع اتفاقية تعاون لنقل التكنولوجيا بين الجامعات والمنشآت الصناعية",
//       titre_en: "Signing a Technology Transfer Cooperation Agreement Between Universities and Industrial Plants",
//       description_ar: "اتفاقية جديدة تضمن حماية الملكية الفكرية وتسهيل تدفق أبحاث الحلول التقنية مباشرة إلى خطوط الإنتاج.",
//       description_en: "A new agreement ensures the protection of intellectual property and facilitates the flow of tech solution research directly to production lines.",
//       created_at: "2026-05-28T14:30:00Z",
//       url: "https://example.com"
//     },
//     {
//       idCenter: 3,
//       photo: null,
//       titre_ar: "ندوة افتراضية حول مستقبل الطاقة المستدامة في القطاع الصناعي العربي",
//       titre_en: "Virtual Webinar on the Future of Sustainable Energy in the Arab Industrial Sector",
//       description_ar: "خبراء ومستثمرون يناقشون آليات تقليل الانبعاثات الكربونية بالاعتماد على الابتكارات الهندسية المحلية.",
//       description_en: "Experts and investors discuss mechanisms to reduce carbon emissions relying on local engineering innovations.",
//       created_at: "2026-05-10T09:15:00Z",
//       url: "https://example.com"
//     }
//   ],
//   events: [
//     {
//       idCenter: 4,
//       titre_ar: "الملتقى العربي الأول للابتكار الصناعي ونقل التكنولوجيا",
//       titre_en: "The 1st Arab Forum for Industrial Innovation and Technology Transfer",
//       description_ar: "ملتقى يجمع نخبة من العلماء والمصنعين لبحث فرص الاستثمار المشترك.",
//       description_en: "A forum bringing together elite scientists and manufacturers to discuss joint investment opportunities.",
//       created_at: "2026-07-12T08:00:00Z",
//       pays: { nom_ar: "المملكة العربية السعودية", nom_en: "Saudi Arabia" },
//       url: "https://example.com"
//     },
//     {
//       idCenter: 5,
//       titre_ar: "ورشة عمل: صياغة براءات الاختراع وحماية الملكية الفكرية",
//       titre_en: "Workshop: Patent Drafting and Intellectual Property Protection",
//       description_ar: "دورة مكثفة للباحثين والمبتكرين حول الخطوات القانونية لتسجيل البراءات.",
//       description_en: "An intensive course for researchers and innovators on the legal steps for patent registration.",
//       created_at: "2026-08-05T09:00:00Z",
//       pays: { nom_ar: "جمهورية مصر العربية", nom_en: "Egypt" },
//       url: "https://example.com"
//     }
//   ],
//   releases: [
// {
//       idCenter: 6,
//       titre_ar: "التقرير السنوي لواقع البحث العلمي والابتكار في العالم العربي 2025",
//       titre_en: "Annual Report on the Reality of Scientific Research and Innovation in the Arab World 2025",
//       description_ar: "دراسة إحصائية شاملة تستعرض مؤشرات التطور وأعداد براءات الاختراع المسجلة.",
//       description_en: "A comprehensive statistical study reviewing development indicators and numbers of registered patents.",
//       url: "https://example.com/report.pdf"
//     },
//     {
//       idCenter: 7,
//       titre_ar: "دليل المصنعين للوصول إلى مراكز التميز والذكاء الاصطناعي",
//       titre_en: "Manufacturers Guide to Accessing Centers of Excellence and AI", // <-- Nettoyé ici ! La ligne span parasite a été supprimée
//       description_ar: "خطوات مبسطة لكيفية طرح المشاكل التقنية واستقبال أبحاث الحلول.",
//       description_en: "Simplified steps on how to submit technical bottlenecks and receive research solutions.",
//       url: "https://example.com/guide.pdf"
//     }
//   ],
//   competitions_prizes: [
//     {
//       idCenter: 8,
//       titre_ar: "جائزة أفضل ابتكار صناعي مستدام لعام 2026",
//       titre_en: "Best Sustainable Industrial Innovation Award 2026",
//       description_ar: "مسابقة مفتوحة لكافة الباحثين العرب لتقديم حلول مبتكرة في ترشيد استهلاك الطاقة بالمصانع.",
//       description_en: "An open competition for all Arab researchers to present innovative solutions in streamlining factory energy consumption.",
//       pays: { nom_ar: "دولة الإمارات", nom_en: "UAE" },
//       url: "https://example.com"
//     },
//     {
//       idCenter: 9,
//       titre_ar: "هاكاثون الذكاء الاصطناعي لحلول خطوط الإنتاج المعقدة",
//       titre_en: "AI Hackathon for Complex Production Line Solutions",
//       description_ar: "تحدي تقني مخصص لفرق المطورين لابتكار خوارزميات صيانة تنبؤية للآلات.",
//       description_en: "A tech challenge dedicated to developer teams to innovate predictive maintenance algorithms for machinery.",
//       pays: { nom_ar: "المملكة المغربية", nom_en: "Morocco" },
//       url: "https://example.com"
//     }
//   ],
//   success_stories: [
//     {
//       idCenter: 10,
//       description_ar: "بفضل البوابة، نجح فريقنا البحثي في تحويل براءة اختراع لتنقية المياه العادمة إلى نظام تشغيلي كامل متبنى من قبل ثلاثة مصانع كبرى.",
//       description_en: "Thanks to the portal, our research team successfully converted a wastewater purification patent into a full operational system adopted by three major factories.",
//       titre_ar: "د. أحمد السعيد - مركز أبحاث وتطوير المياه",
//       titre_en: "Dr. Ahmed Al-Saeed - Water R&D Center",
//       created_at: "2026-01-01"
//     },
//     {
//       idCenter: 11,
//       description_ar: "واجهنا مشكلة هدر حراري معقدة في خط صهر المعادن. قمنا بطرح المشكلة هنا وتلقينا 4 حلول بحثية تطبيقية من جامعات مختلفة تم تنفيذ أفضلها بنجاح.",
//       description_en: "We faced a complex thermal waste problem in the metal smelting line. We submitted it here and received 4 applied research solutions from different universities, the best of which was successfully deployed.",
//       titre_ar: "المهندس خالد منصور - الشركة العربية للصناعات المتقدمة",
//       titre_en: "Eng. Khaled Mansour - Arab Advanced Industries Co.",
//       created_at: "2025-01-01"
//     }
//   ]
// };

// export default function MediaCenterSection() {
//   const [active, setActive] = useState("news");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { t, i18n } = useTranslation();
//   const isAr = i18n.language === 'ar';
//   const currentDir = isAr ? 'rtl' : 'ltr';

//   // Simulation du chargement réseau via un setTimeout sur nos données statiques
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setData(MOCK_DATA[active] || []);
//       setLoading(false);
//     }, 400); // Délai de 400ms pour simuler le comportement réel de l'API

//     return () => clearTimeout(timer);
//   }, [active]);

//   return (
//     <section
//       dir={currentDir}
//       className={`min-h-screen bg-[#fcfdfe] pb-20 overflow-hidden relative ${isAr ? 'font-arabic' : 'font-sans'}`}
//     >
//       {/* Glows d'ambiance en arrière-plan */}
//       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
//       <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#0fa968]/5 rounded-full blur-[140px] -z-10" />

//       {/* ================= HEADER HERO ================= */}
//       <div className="relative bg-emerald-600 py-20 overflow-hidden mb-12">
//         <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2`}></div>
//         <div className={`absolute bottom-0 ${isAr ? 'right-0' : 'left-0'} w-96 h-96 bg-[#0fa968]/10 rounded-full blur-[120px] translate-y-1/2`}></div>
        
//         <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-start">
//           <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
//             {t("menu.media_center")}
//           </h1>
//         </div>
//       </div>

//       {/* ================= MAIN CONTAINER ================= */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full -mt-16 relative z-20">
//         <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(12,35,64,0.04)] p-4 sm:p-8 flex flex-col gap-10">
          
//           {/* BARRE D'ONGLETS SUPÉRIEURE */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex p-2 bg-gray-50 rounded-2xl border border-gray-200/50 gap-2 w-full">
//             {TABS.map((tab) => {
//               const isActive = tab.id === active;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActive(tab.id)}
//                   className={`lg:flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 relative overflow-hidden ${
//                     isActive ? "text-white bg-[#0fa968] shadow-lg shadow-emerald-600/10" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-white/20 text-white" : "bg-gray-200/60 text-gray-400 group-hover:text-[#0fa968]"}`}>
//                     {tab.icon}
//                   </span>
//                   <span className="truncate whitespace-nowrap">{t(tab.labelKey)}</span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* ================= ZONE DE RENDU DES CONTENUS ================= */}
//           <div className="min-h-[400px] w-full relative flex items-center justify-center">
            
//             {loading ? (
//               <div className="flex flex-col items-center gap-3 text-gray-400">
//                 <Loader2 className="h-8 w-8 animate-spin text-[#0fa968]" />
//                 <span className="text-xs font-bold">{isAr ? "جاري التحميل..." : "Loading..."}</span>
//               </div>
//             ) : data.length === 0 ? (
//               <div className="text-gray-400 text-sm font-bold">
//                 {isAr ? "لا توجد بيانات متاحة حالياً." : "No data available at the moment."}
//               </div>
//             ) : (
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={active}
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -15 }}
//                   transition={{ duration: 0.3, ease: "easeOut" }}
//                   className="w-full"
//                 >

//                   {/* 1. ONGLET : ACTUALITÉS (NEWS) */}
//                   {active === "news" && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {data.map((item) => (
//                         <article key={item.idCenter} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(12,35,64,0.02)] group hover:shadow-[0_15px_35px_rgba(12,35,64,0.06)] hover:border-emerald-500/10 transition-all duration-300 flex flex-col justify-between">
//                           <div className="relative overflow-hidden h-48 bg-gray-50">
//                             <img 
//                               src={item.photo ? `${import.meta.env.VITE_API_BASE_URL}/storage/${item.photo}` : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80'} 
//                               alt={isAr ? item.titre_ar : item.titre_en} 
//                               className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
//                             />
//                           </div>
//                           <div className="p-6 flex-1 flex flex-col justify-between gap-4">
//                             <div className="space-y-2">
//                               <span className="text-xs font-bold text-gray-400 block">
//                                 {new Date(item.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
//                               </span>
//                               <h3 className="text-base font-black text-[#0c2340] leading-snug line-clamp-2 group-hover:text-[#0fa968] transition-colors">
//                                 {isAr ? item.titre_ar : item.titre_en}
//                               </h3>
//                               <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed font-medium">
//                                 {isAr ? item.description_ar : item.description_en}
//                               </p>
//                             </div>
//                             <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
//                               <a href={item.url || "#"} target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-600 group-hover:text-[#0fa968] group-hover:underline cursor-pointer">
//                                 {t("news_section.read_more", "اقرأ المزيد")}
//                               </a>
//                               <ArrowUpRight size={16} className="text-gray-400 group-hover:text-[#0fa968] transition-colors" />
//                             </div>
//                           </div>
//                         </article>
//                       ))}
//                     </div>
//                   )}

//                   {/* 2. ONGLET : ÉVÉNEMENTS (EVENTS) */}
//                   {active === "events" && (
//                     <div className="space-y-4 max-w-4xl mx-auto">
//                       {data.map((item) => {
//                         const eventDate = new Date(item.created_at);
//                         return (
//                           <div key={item.idCenter} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-500/20 transition-colors duration-300">
//                             <div className="flex items-center gap-5">
//                               <div className="h-16 w-16 bg-emerald-50 text-[#0fa968] rounded-xl flex flex-col items-center justify-center border border-emerald-500/10 flex-shrink-0">
//                                 <span className="text-xl font-black leading-none">
//                                   {eventDate.getDate()}
//                                 </span>
//                                 <span className="text-[10px] uppercase font-bold text-emerald-700 mt-1">
//                                   {eventDate.toLocaleString(isAr ? 'ar-EG' : 'en-US', { month: 'short' })}
//                                 </span>
//                               </div>
//                               <div className="space-y-1 text-start">
//                                 <h3 className="text-base font-bold text-[#0c2340]">{isAr ? item.titre_ar : item.titre_en}</h3>
//                                 <p className="text-gray-500 text-xs line-clamp-1 font-medium">{isAr ? item.description_ar : item.description_en}</p>
//                                 <div className="flex items-center gap-3 text-xs text-gray-400 font-bold">
//                                   <span className="inline-flex items-center gap-1">
//                                     <MapPin size={12} className="text-[#0fa968]" /> {isAr ? item.pays?.nom_ar : item.pays?.nom_en}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                             {item.url && (
//                               <a href={item.url} target="_blank" rel="noreferrer" className="text-center w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-[#0fa968] hover:text-white hover:border-[#0fa968] transition-all shadow-sm">
//                                 {isAr ? "تسجيل الحضور" : "Register"}
//                               </a>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* 3. ONGLET : PUBLICATIONS (RELEASES) */}
//                   {active === "releases" && (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
//                       {data.map((item) => (
//                         <div key={item.idCenter} className="p-5 bg-white border border-gray-100 rounded-2xl flex gap-5 items-center hover:shadow-md hover:border-emerald-500/10 transition-all duration-300">
//                           <div className="h-24 w-18 bg-[#0a2540] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-inner flex-shrink-0">
//                             📚
//                           </div>
//                           <div className="space-y-3 flex-1 text-start">
//                             <div>
//                               <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-[#0fa968] rounded-md border border-emerald-500/10 inline-block mb-1">PDF</span>
//                               <h4 className="text-base font-bold text-[#0c2340] line-clamp-1">{isAr ? item.titre_ar : item.titre_en}</h4>
//                               <p className="text-xs text-gray-400 font-medium mt-0.5 line-clamp-1">{isAr ? item.description_ar : item.description_en}</p>
//                             </div>
//                             {item.url && (
//                               <a href={item.url} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0fa968] hover:underline">
//                                 <Download size={14} />
//                                 <span>{isAr ? "تحميل المستند" : "Download File"}</span>
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* 4. ONGLET : CONCOURS & PRIX (COMPETITIONS) */}
//                   {active === "competitions_prizes" && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//                       {data.map((item) => (
//                         <div key={item.idCenter} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between min-h-[180px] hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden group text-start">
//                           <div className="absolute top-0 end-0 bg-emerald-50 p-3 rounded-bl-2xl text-lg border-b border-s border-gray-50 text-[#0fa968]">🏆</div>
//                           <div className="space-y-2 max-w-[85%]">
//                             <h3 className="text-lg font-bold text-[#0c2340] tracking-tight">{isAr ? item.titre_ar : item.titre_en}</h3>
//                             <p className="text-xs font-medium text-gray-500 leading-relaxed line-clamp-3">{isAr ? item.description_ar : item.description_en}</p>
//                           </div>
//                           <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-4">
//                             <span className="text-xs font-bold text-[#0fa968] bg-emerald-50 px-2.5 py-1 rounded-md">
//                               {isAr ? item.pays?.nom_ar : item.pays?.nom_en}
//                             </span>
//                             {item.url && (
//                               <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-600 hover:text-[#0fa968] hover:underline">
//                                 {isAr ? "التفاصيل" : "Details"}
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* 5. ONGLET : HISTOIRES DE SUCCÈS (STORIES) */}
//                   {active === "success_stories" && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//                       {data.map((item) => (
//                         <div key={item.idCenter} className="p-6 bg-white border border-gray-100 rounded-2xl flex flex-col justify-between gap-4 shadow-sm hover:border-emerald-500/10 transition-all">
//                           <p className="text-gray-500 text-sm italic leading-relaxed text-justify font-medium">
//                             “ {isAr ? item.description_ar : item.description_en} ”
//                           </p>
//                           <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
//                             <div className="h-10 w-10 bg-emerald-50 text-[#0fa968] rounded-full flex items-center justify-center text-sm font-bold shadow-inner shrink-0">
//                               {(isAr ? item.titre_ar : item.titre_en)?.[0] || "S"}
//                             </div>
//                             <div className="text-start">
//                               <h4 className="text-sm font-bold text-[#0c2340]">{isAr ? item.titre_ar : item.titre_en}</h4>
//                               <span className="text-xs font-bold text-gray-400">
//                                 {new Date(item.created_at).getFullYear()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                 </motion.div>
//               </AnimatePresence>
//             )}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }














import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Newspaper, 
  Calendar, 
  FileText, 
  Trophy, 
  Sparkles,
  ArrowUpRight,
  Download,
  MapPin,
  Loader2,
  Bookmark
} from "lucide-react";

const TABS = [
  { id: "news", labelKey: "submenu.media_center.news", icon: <Newspaper className="h-4 w-4" /> },
  { id: "events", labelKey: "submenu.media_center.events", icon: <Calendar className="h-4 w-4" /> },
  { id: "releases", labelKey: "submenu.media_center.releases", icon: <FileText className="h-4 w-4" /> },
  { id: "competitions_prizes", labelKey: "submenu.media_center.competitions_prizes", icon: <Trophy className="h-4 w-4" /> },
  { id: "success_stories", labelKey: "submenu.media_center.success_stories", icon: <Sparkles className="h-4 w-4" /> }
];

const MOCK_DATA = {
  news: [
    {
      idCenter: 1,
      photo: null,
      titre_ar: "إطلاق المبادرة العربية لدعم ابتكارات الذكاء الاصطناعي في الصناعة",
      titre_en: "Launch of the Arabic Initiative to Support AI Innovations in Industry",
      description_ar: "شهدت أعمال المؤتمر اليوم إطلاق مبادرة جديدة تهدف إلى تمويل الشراكات بين مراكز الأبحاث والمصانع لتبني حلول الذكاء الاصطناعي.",
      description_en: "Today's conference witnessed the launch of a new initiative aimed at funding partnerships between research centers and factories.",
      created_at: "2026-06-15T10:00:00Z",
      url: "https://example.com"
    },
    {
      idCenter: 2,
      photo: null,
      titre_ar: "توقيع اتفاقية تعاون لنقل التكنولوجيا بين الجامعات والمنشآت الصناعية",
      titre_en: "Signing a Technology Transfer Cooperation Agreement Between Universities and Industrial Plants",
      description_ar: "اتفاقية جديدة تضمن حماية الملكية الفكرية وتسهيل تدفق أبحاث الحلول التقنية مباشرة إلى خطوط الإنتاج.",
      description_en: "A new agreement ensures the protection of intellectual property and facilitates the flow of tech solution research directly to production lines.",
      created_at: "2026-05-28T14:30:00Z",
      url: "https://example.com"
    },
    {
      idCenter: 3,
      photo: null,
      titre_ar: "ندوة افتراضية حول مستقبل الطاقة المستدامة في القطاع الصناعي العربي",
      titre_en: "Virtual Webinar on the Future of Sustainable Energy in the Arab Industrial Sector",
      description_ar: "خبراء ومستثمرون يناقشون آليات تقليل الانبعاثات الكربونية بالاعتماد على الابتكارات الهندسية المحلية.",
      description_en: "Experts and investors discuss mechanisms to reduce carbon emissions relying on local engineering innovations.",
      created_at: "2026-05-10T09:15:00Z",
      url: "https://example.com"
    }
  ],
  events: [
    {
      idCenter: 4,
      titre_ar: "الملتقى العربي الأول للابتكار الصناعي ونقل التكنولوجيا",
      titre_en: "The 1st Arab Forum for Industrial Innovation and Technology Transfer",
      description_ar: "ملتقى يجمع نخبة من العلماء والمصنعين لبحث فرص الاستثمار المشترك.",
      description_en: "A forum bringing together elite scientists and manufacturers to discuss joint investment opportunities.",
      created_at: "2026-07-12T08:00:00Z",
      pays: { nom_ar: "المملكة العربية السعودية", nom_en: "Saudi Arabia" },
      url: "https://example.com"
    },
    {
      idCenter: 5,
      titre_ar: "ورشة عمل: صياغة براءات الاختراع وحماية الملكية الفكرية",
      titre_en: "Workshop: Patent Drafting and Intellectual Property Protection",
      description_ar: "دورة مكثفة للباحثين والمبتكرين حول الخطوات القانونية لتسجيل البراءات.",
      description_en: "An intensive course for researchers and innovators on the legal steps for patent registration.",
      created_at: "2026-08-05T09:00:00Z",
      pays: { nom_ar: "جمهورية مصر العربية", nom_en: "Egypt" },
      url: "https://example.com"
    }
  ],
  releases: [
    {
      idCenter: 6,
      titre_ar: "التقرير السنوي لواقع البحث العلمي والابتكار في العالم العربي 2025",
      titre_en: "Annual Report on the Reality of Scientific Research and Innovation in the Arab World 2025",
      description_ar: "دراسة إحصائية شاملة تستعرض مؤشرات التطور وأعداد براءات الاختراع المسجلة.",
      description_en: "A comprehensive statistical study reviewing development indicators and numbers of registered patents.",
      url: "https://example.com/report.pdf"
    },
    {
      idCenter: 7,
      titre_ar: "دليل المصنعين للوصول إلى مراكز التميز والذكاء الاصطناعي",
      titre_en: "Manufacturers Guide to Accessing Centers of Excellence and AI",
      description_ar: "خطوات مبسطة لكيفية طرح المشاكل التقنية واستقبال أبحاث الحلول.",
      description_en: "Simplified steps on how to submit technical bottlenecks and receive research solutions.",
      url: "https://example.com/guide.pdf"
    }
  ],
  competitions_prizes: [
    {
      idCenter: 8,
      titre_ar: "جائزة أفضل ابتكار صناعي مستدام لعام 2026",
      titre_en: "Best Sustainable Industrial Innovation Award 2026",
      description_ar: "مسابقة مفتوحة لكافة الباحثين العرب لتقديم حلول مبتكرة في ترشيد استهلاك الطاقة بالمصانع.",
      description_en: "An open competition for all Arab researchers to present innovative solutions in streamlining factory energy consumption.",
      pays: { nom_ar: "دولة الإمارات", nom_en: "UAE" },
      url: "https://example.com"
    },
    {
      idCenter: 9,
      titre_ar: "هاكاثون الذكاء الاصطناعي لحلول خطوط الإنتاج المعقدة",
      titre_en: "AI Hackathon for Complex Production Line Solutions",
      description_ar: "تحدي تقني مخصص لفرق المطورين لابتكار خوارزميات صيانة تنبؤية للآلات.",
      description_en: "A tech challenge dedicated to developer teams to innovate predictive maintenance algorithms for machinery.",
      pays: { nom_ar: "المملكة المغربية", nom_en: "Morocco" },
      url: "https://example.com"
    }
  ],
  success_stories: [
    {
      idCenter: 10,
      description_ar: "بفضل البوابة، نجح فريقنا البحثي في تحويل براءة اختراع لتنقية المياه العادمة إلى نظام تشغيلي كامل متبنى من قبل ثلاثة مصانع كبرى.",
      description_en: "Thanks to the portal, our research team successfully converted a wastewater purification patent into a full operational system adopted by three major factories.",
      titre_ar: "د. أحمد السعيد - مركز أبحاث وتطوير المياه",
      titre_en: "Dr. Ahmed Al-Saeed - Water R&D Center",
      created_at: "2026-01-01"
    },
    {
      idCenter: 11,
      description_ar: "واجهنا مشكلة هدر حراري معقدة في خط صهر المعادن. قمنا بطرح المشكلة هنا وتلقينا 4 حلول بحثية تطبيقية من جامعات مختلفة تم تنفيذ أفضلها بنجاح.",
      description_en: "We faced a complex thermal waste problem in the metal smelting line. We submitted it here and received 4 applied research solutions from different universities, the best of which was successfully deployed.",
      titre_ar: "المهندس خالد منصور - الشركة العربية للصناعات المتقدمة",
      titre_en: "Eng. Khaled Mansour - Arab Advanced Industries Co.",
      created_at: "2025-01-01"
    }
  ]
};

export default function MediaCenterSection() {
  const [active, setActive] = useState("news");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const currentDir = isAr ? 'rtl' : 'ltr';

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(MOCK_DATA[active] || []);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section
      dir={currentDir}
      className={`min-h-screen bg-[#f8fafc] pb-24 overflow-hidden relative ${isAr ? 'font-arabic' : 'font-sans'}`}
    >
      {/* Halo de lumière stylisé en arrière-plan */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-80 left-0 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ================= HEADER HERO (Minimaliste & Moderne) ================= */}
      <div className="relative mb-12 overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-start">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            {t("menu.media_center")}
          </h1>
        </div>
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="flex flex-col gap-12">
          
          {/* BARRE D'ONGLETS SUPÉRIEURE (Style Pillule Flottante avec animation fluide) */}
          <div className="max-w-4xl mx-auto w-full bg-white/70 backdrop-blur-xl rounded-full border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-1.5 flex flex-wrap md:flex-nowrap justify-between gap-1 overflow-hidden z-20 relative">
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-xs md:text-sm transition-colors duration-200 z-10 ${
                    isActive ? "text-white" : "text-gray-500 hover:text-[#0c2340]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMediaTabIndicator"
                      className="absolute inset-0 bg-emerald-600 rounded-full -z-10 shadow-md shadow-emerald-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab.icon}
                  <span className="whitespace-nowrap">{t(tab.labelKey)}</span>
                </button>
              );
            })}
          </div>

          {/* ================= ZONE DE RENDU DES CONTENUS ================= */}
          <div className="min-h-[400px] w-full relative">
            
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                <span className="text-xs font-bold">{isAr ? "جاري التحميل..." : "Loading..."}</span>
              </div>
            ) : data.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-bold">
                {isAr ? "لا توجد بيانات متاحة حالياً." : "No data available at the moment."}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >

                  {/* 1. ONGLET : ACTUALITÉS (NEWS) */}
                  {active === "news" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {data.map((item) => (
                        <article key={item.idCenter} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] group hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between">
                          <div className="relative overflow-hidden h-52 bg-gray-50">
                            <img 
                              src={item.photo ? `${import.meta.env.VITE_API_BASE_URL}/storage/${item.photo}` : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80'} 
                              alt={isAr ? item.titre_ar : item.titre_en} 
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                            <div className="space-y-3">
                              <span className="text-xs font-bold text-gray-400 block">
                                {new Date(item.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                              </span>
                              <h3 className="text-lg font-black text-[#0c2340] leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
                                {isAr ? item.titre_ar : item.titre_en}
                              </h3>
                              <p className="text-black text-sm line-clamp-3 leading-relaxed font-medium text-justify">
                                {isAr ? item.description_ar : item.description_en}
                              </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                              <a href={item.url || "#"} target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-500 group-hover:text-emerald-600 group-hover:underline cursor-pointer transition-colors">
                                {t("news_section.read_more", "اقرأ المزيد")}
                              </a>
                              <ArrowUpRight size={16} className="text-gray-300 group-hover:text-emerald-600 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {/* 2. ONGLET : ÉVÉNEMENTS (EVENTS) */}
                  {active === "events" && (
                    <div className="space-y-4 max-w-4xl mx-auto">
                      {data.map((item) => {
                        const eventDate = new Date(item.created_at);
                        return (
                          <div key={item.idCenter} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 group">
                            <div className="flex items-center gap-6">
                              {/* Calendrier Minimaliste */}
                              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex flex-col items-center justify-center border border-emerald-100 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                <span className="text-2xl font-black leading-none">
                                  {eventDate.getDate()}
                                </span>
                                <span className="text-[10px] uppercase font-bold text-emerald-700 mt-1">
                                  {eventDate.toLocaleString(isAr ? 'ar-EG' : 'en-US', { month: 'short' })}
                                </span>
                              </div>
                              {/* Contenu */}
                              <div className="space-y-1 text-start">
                                <h3 className="text-lg font-bold text-[#0c2340] group-hover:text-emerald-600 transition-colors">{isAr ? item.titre_ar : item.titre_en}</h3>
                                <p className="text-black text-sm line-clamp-1 font-medium">{isAr ? item.description_ar : item.description_en}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400 font-bold pt-1">
                                  <span className="inline-flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                    <MapPin size={12} className="text-emerald-500" /> {isAr ? item.pays?.nom_ar || "عبر الإنترنت" : item.pays?.nom_en || "Online"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {item.url && (
                              <a href={item.url} target="_blank" rel="noreferrer" className="text-center w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm">
                                {isAr ? "تسجيل الحضور" : "Register"}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 3. ONGLET : PUBLICATIONS (RELEASES) */}
                  {active === "releases" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {data.map((item) => (
                        <div key={item.idCenter} className="p-6 bg-white border border-gray-100 rounded-3xl flex gap-6 items-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 group">
                          <div className="h-24 w-18 bg-[#0a2540] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner flex-shrink-0 group-hover:bg-emerald-600 transition-colors duration-300">
                            📚
                          </div>
                          <div className="space-y-3 flex-1 text-start">
                            <div>
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-500/10 inline-block mb-1.5">PDF</span>
                              <h4 className="text-base font-bold text-[#0c2340] line-clamp-1 group-hover:text-emerald-600 transition-colors">{isAr ? item.titre_ar : item.titre_en}</h4>
                              <p className="text-black text-xs font-medium mt-0.5 line-clamp-1">{isAr ? item.description_ar : item.description_en}</p>
                            </div>
                            {item.url && (
                              <a href={item.url} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
                                <Download size={14} />
                                <span>{isAr ? "تحميل المستند" : "Download File"}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4. ONGLET : CONCOURS & PRIX (COMPETITIONS) */}
                  {active === "competitions_prizes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {data.map((item) => (
                        <div key={item.idCenter} className="p-6 bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[190px] hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden group text-start">
                          <div className="absolute top-0 end-0 bg-emerald-50 p-3.5 rounded-bl-3xl text-lg border-b border-s border-gray-50 text-emerald-600">🏆</div>
                          <div className="space-y-2 max-w-[82%]">
                            <h3 className="text-lg font-bold text-[#0c2340] group-hover:text-emerald-600 transition-colors tracking-tight">{isAr ? item.titre_ar : item.titre_en}</h3>
                            <p className="text-black text-xs font-medium leading-relaxed line-clamp-3">{isAr ? item.description_ar : item.description_en}</p>
                          </div>
                          <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-4">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                              {isAr ? item.pays?.nom_ar || "مسابقة" : item.pays?.nom_en || "Competition"}
                            </span>
                            {item.url && (
                              <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-500 hover:text-emerald-600 hover:underline transition-colors">
                                {isAr ? "التفاصيل" : "Details"}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 5. ONGLET : HISTOIRES DE SUCCÈS (STORIES) */}
                  {active === "success_stories" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {data.map((item) => (
                        <div key={item.idCenter} className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col justify-between gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-xl hover:border-emerald-500/10 transition-all duration-300 group">
                          <p className="text-black text-sm italic leading-relaxed text-justify font-medium group-hover:text-emerald-600 transition-colors duration-300">
                            “ {isAr ? item.description_ar : item.description_en} ”
                          </p>
                          <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center text-sm font-bold shadow-sm shrink-0">
                              {(isAr ? item.titre_ar : item.titre_en)?.[0] || "S"}
                            </div>
                            <div className="text-start">
                              <h4 className="text-sm font-bold text-[#0c2340]">{isAr ? item.titre_ar : item.titre_en}</h4>
                              <span className="text-xs font-bold text-gray-400">
                                {new Date(item.created_at).getFullYear()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
