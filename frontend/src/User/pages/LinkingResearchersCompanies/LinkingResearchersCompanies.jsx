// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { toast, Toaster } from 'react-hot-toast';
// import { 
//   Plus, ArrowUpRight, Zap, Globe, BarChart3, 
//   FlaskConical, Factory, Microscope,
//   User, Mail, Search, X, Send
// } from 'lucide-react';

// // --- مكون الـ Modal (التسجيل السريع) ---
// const JoinModal = ({ isOpen, onClose, isRtl }) => {
//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f172a]/95 backdrop-blur-xl"
//       >
//         <motion.div 
//           initial={{ scale: 0.9, y: 30, opacity: 0 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl relative border border-white/20"
//         >
//           <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600" />
//           <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-emerald-600 transition-all">
//             <X size={28} />
//           </button>

//           <div className="p-10 md:p-14 text-right" dir="rtl">
//             <h3 className="text-3xl font-black text-[#1a1a1a] mb-6">انضم إلى شبكة الابتكار</h3>
//             <p className="text-slate-500 mb-8 font-bold">يرجى ملء الاستمارة أدناه وسنقوم بالتواصل معك فوراً.</p>
            
//             <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-600 mr-2">الاسم الكامل</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
//                   <input type="text" className="w-full bg-slate-50 border-none rounded-2xl pr-4 pl-12 py-4 focus:ring-2 ring-emerald-500 transition-all outline-none font-bold" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-slate-600 mr-2">البريد الإلكتروني</label>
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
//                   <input type="email" className="w-full bg-slate-50 border-none rounded-2xl pr-4 pl-12 py-4 focus:ring-2 ring-emerald-500 transition-all outline-none font-bold" />
//                 </div>
//               </div>
//               <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black uppercase tracking-[2px] flex items-center justify-center gap-4 transition-all shadow-xl shadow-emerald-500/20 mt-4">
//                 تأكيد الطلب <Send size={18} />
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// const LinkingResearchers = () => {
//   const { t, i18n } = useTranslation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const isRtl = i18n.language === 'ar';

//   // --- حالات البيانات (State) ---
//   const [researcherData, setResearcherData] = useState({
//     full_name: '',
//     email: '',
//     research_field: 'تكنولوجيا المعلومات'
//   });

//   const [companyData, setCompanyData] = useState({
//     company_name: '',
//     industry_sector: '',
//     email: ''
//   });

//   // --- دالة إرسال الباحث ---
//   const handleResearcherSubmit = async (e) => {
//     e.preventDefault();
//     const loadId = toast.loading(isRtl ? 'جاري معالجة طلبك...' : 'Processing...');
//     try {
//       const res = await axios.post('http://localhost:8000/api/register-researcher', researcherData);
//       toast.success(res.data.message, { id: loadId });
//       setResearcherData({ full_name: '', email: '', research_field: 'تكنولوجيا المعلومات' });
//     } catch (err) {
//       const msg = err.response?.data?.message || (isRtl ? 'فشل التسجيل، حاول مجدداً' : 'Registration failed');
//       toast.error(msg, { id: loadId });
//     }
//   };

//   // --- دالة إرسال الشركة ---
//   const handleCompanySubmit = async (e) => {
//     e.preventDefault();
//     const loadId = toast.loading(isRtl ? 'جاري إرسال البيانات...' : 'Sending data...');
//     try {
//       const res = await axios.post('http://localhost:8000/api/register-company', companyData);
//       toast.success(res.data.message, { id: loadId });
//       setCompanyData({ company_name: '', industry_sector: '', email: '' });
//     } catch (err) {
//       const msg = err.response?.data?.message || (isRtl ? 'خطأ في العملية' : 'Process failed');
//       toast.error(msg, { id: loadId });
//     }
//   };

//   return (
//     <div className={`min-h-screen bg-white pt-24 pb-20 overflow-hidden ${isRtl ? 'rtl text-right' : 'ltr text-left'}`} dir={isRtl ? "rtl" : "ltr"}>
//       <Toaster position="top-center" />
//       <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isRtl={isRtl} />

//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
//         {/* --- Hero Section --- */}
//         <div className="relative mb-20">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//             className="flex items-center gap-4 text-emerald-600 font-black text-xs uppercase tracking-[5px] mb-6"
//           >
//             <Zap size={18} fill="currentColor" /> {isRtl ? "بوابة التعاون الصناعي" : "Industrial Collaboration Portal"}
//           </motion.div>
          
//           <div className="grid lg:grid-cols-12 gap-12 items-start">
//             <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8">
//               <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] leading-[0.9] tracking-tighter mb-8">
//                 {isRtl ? "اربط أبحاثك" : "Link Your Research"} <br/>
//                 <span className="text-emerald-600">{isRtl ? "بالصناعة العالمية" : "To Global Industry"}</span>
//               </h1>
//               <div className="flex flex-wrap gap-4">
//                 <div className="px-6 py-2 rounded-full border border-slate-200 text-slate-900 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
//                   <Globe size={14} /> 21 دولة عربية
//                 </div>
//                 <div className="px-6 py-2 rounded-full border border-emerald-100 text-emerald-600 bg-emerald-50 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
//                   <BarChart3 size={14} /> +500 مشروع تطبيقي
//                 </div>
//               </div>
//             </motion.div>
            
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-4 lg:pt-6">
//               <p className="text-slate-900 font-bold text-xl leading-relaxed mb-10 text-justify">
//                 منصة تواصل مباشر تسهل التعاون المثمر في المشاريع التطبيقية بين الباحثين والشركات الصناعية لتحقيق الابتكار.
//               </p>
//               <button onClick={() => setIsModalOpen(true)} className="group relative inline-flex items-center gap-5 bg-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[3px] overflow-hidden transition-all shadow-2xl">
//                 <div className="absolute inset-0 bg-emerald-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
//                 <span className="relative z-10">{isRtl ? "سجل الآن" : "Register Now"}</span>
//                 <ArrowUpRight size={22} className="relative z-10 group-hover:rotate-45 transition-transform" />
//               </button>
//             </motion.div>
//           </div>
//         </div>

//         {/* --- Dual Form Section --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
//           {/* Card: Researchers */}
//           <motion.div whileHover={{ y: -5 }} className="bg-[#1e293b] rounded-[50px] p-10 text-white relative overflow-hidden border-b-8 border-emerald-600 shadow-2xl">
//             <div className="absolute -top-10 -left-10 opacity-5">
//               <FlaskConical size={300} />
//             </div>
//             <div className="relative z-10">
//               <div className="flex justify-between items-center mb-10">
//                 <h2 className="text-3xl font-black text-emerald-500">للباحثين</h2>
//               </div>
//               <form className="space-y-5" onSubmit={handleResearcherSubmit}>
//                 <div>
//                   <label className="block text-emerald-500 font-bold mb-2 mr-1">الاسم الكامل</label>
//                   <input 
//                     required
//                     value={researcherData.full_name}
//                     onChange={(e) => setResearcherData({...researcherData, full_name: e.target.value})}
//                     type="text" 
//                     className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
//                     placeholder="أدخل اسمك الكامل"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-emerald-500 font-bold mb-2 mr-1">البريد الإلكتروني</label>
//                   <input 
//                     required
//                     value={researcherData.email}
//                     onChange={(e) => setResearcherData({...researcherData, email: e.target.value})}
//                     type="email" 
//                     className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
//                     placeholder="أدخل بريدك الإلكتروني" 
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-emerald-500 font-bold mb-2 mr-1">مجال البحث</label>
//                   <div className="relative">
//                     <select 
//                       value={researcherData.research_field}
//                       onChange={(e) => setResearcherData({...researcherData, research_field: e.target.value})}
//                       className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none appearance-none cursor-pointer"
//                     >
//                       <option value="تكنولوجيا المعلومات">تكنولوجيا المعلومات</option>
//                       <option value="الطاقة المتجددة">الطاقة المتجددة</option>
//                       <option value="البيوتكنولوجيا">البيوتكنولوجيا</option>
//                       <option value="الذكاء الاصطناعي">الذكاء الاصطناعي</option>
//                     </select>
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
//                   </div>
//                 </div>
//                 <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-emerald-900/40 transition-all transform active:scale-95 text-lg">
//                   تسجيل كباحث
//                 </button>
//               </form>
//             </div>
//           </motion.div>

//           {/* Card: Companies */}
//           <motion.div whileHover={{ y: -5 }} className="bg-[#2c3e50] rounded-[50px] p-10 text-white relative overflow-hidden border-b-8 border-emerald-400 shadow-2xl">
//             <div className="absolute -bottom-10 -right-10 opacity-5">
//               <Factory size={300} />
//             </div>
//             <div className="relative z-10">
//               <div className="flex justify-between items-center mb-10">
//                 <h2 className="text-3xl font-black text-emerald-400">للشركات الصناعية</h2>
//               </div>
//               <form className="space-y-5" onSubmit={handleCompanySubmit}>
//                 <div>
//                   <label className="block text-emerald-400 font-bold mb-2 mr-1">اسم الشركة</label>
//                   <input 
//                     required
//                     value={companyData.company_name}
//                     onChange={(e) => setCompanyData({...companyData, company_name: e.target.value})}
//                     type="text" 
//                     className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
//                     placeholder="أدخل اسم شركتك" 
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-emerald-400 font-bold mb-2 mr-1">قطاع الصناعة</label>
//                   <input 
//                     required
//                     value={companyData.industry_sector}
//                     onChange={(e) => setCompanyData({...companyData, industry_sector: e.target.value})}
//                     type="text" 
//                     className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
//                     placeholder="أدخل قطاع الشركة (مثلاً: التصنيع)" 
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-emerald-400 font-bold mb-2 mr-1">البريد الإلكتروني</label>
//                   <input 
//                     required
//                     value={companyData.email}
//                     onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
//                     type="email" 
//                     className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
//                     placeholder="company@org.com" 
//                   />
//                 </div>
//                 <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-emerald-900/40 transition-all transform active:scale-95 text-lg">
//                   تسجيل كشركة
//                 </button>
//               </form>
//             </div>
//           </motion.div>
//         </div>

//         {/* --- آلية العمل --- */}
//         <div className="mb-20">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
//             <div>
//               <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] tracking-tighter leading-none mb-6">آلية العمل</h2>
//               <div className="h-2 w-32 bg-emerald-600 rounded-full" />
//             </div>
//             <p className="text-slate-900 font-bold text-xl max-w-sm">نظام متكامل يضمن انتقال الفكرة من المختبر إلى السوق العالمي.</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { id: 1, title: "تقديم طلب التعاون أو عرض التخصص" },
//               { id: 2, title: "المطابقة الذكية بين الباحث والشركة" },
//               { id: 3, title: "بدء التنفيذ تحت إشراف المنظمة" }
//             ].map((step) => (
//               <div key={step.id} className="group relative p-10 rounded-[40px] border-2 border-slate-50 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
//                 <span className="text-8xl font-black text-slate-100 absolute top-4 right-8 group-hover:text-emerald-100 transition-colors -z-10">0{step.id}</span>
//                 <div className="relative z-10">
//                   <h5 className="text-emerald-600 font-black text-xs uppercase tracking-[4px] mb-4">الخطوة {step.id}</h5>
//                   <p className="text-[#1a1a1a] text-2xl font-black leading-tight">{step.title}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- النداء الأخير --- */}
//         <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-[#1a1a1a] rounded-[60px] p-12 text-center relative overflow-hidden shadow-3xl shadow-black/40">
//           <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent" />
//           <div className="relative z-10 flex flex-col items-center">
//             <Microscope className="text-emerald-500 mb-8 animate-pulse" size={64} />
//             <h2 className="text-4xl md:text-7xl font-black text-white leading-tight mb-10 tracking-tighter max-w-4xl">
//               حول أبحاثك إلى منتجات صناعية عالمية
//             </h2>
//             <button onClick={() => setIsModalOpen(true)} className="group bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black text-lg uppercase tracking-[4px] flex items-center gap-6 hover:bg-white hover:text-emerald-600 transition-all shadow-2xl">
//               <Plus size={24} /> إضافة طلب جديد
//             </button>
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default LinkingResearchers;






















import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import apiAdmin from '../../../api/apiAdmin';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Plus, ArrowUpRight, Zap, Globe, BarChart3, 
  FlaskConical, Factory, Microscope, FileText,
  X, Send, Building, DollarSign, Search
} from 'lucide-react';

// --- المكون الفرعي: المودال (نفس تصميم الصورة تماماً) ---
const ChallengeModal = ({ isOpen, onClose, companies, isRtl }) => {
  const [offerData, setOfferData] = useState({ 
    title: '', description: '', field: 'الطاقة المتجددة', idCompany: '', deadline: '', budget: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading(isRtl ? 'جاري نشر التحدي...' : 'Publishing...');
    try {
      await apiAdmin.post('/offers', offerData);
      toast.success(isRtl ? "تم نشر العرض بنجاح" : "Success!", { id: loadId });
      setOfferData({ title: '', description: '', field: 'الطاقة المتجددة', idCompany: '', deadline: '', budget: '' });
      onClose();
    } catch (err) {
      toast.error(isRtl ? "حدث خطأ أثناء النشر" : "Error", { id: loadId });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            className="bg-white rounded-[45px] w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col md:flex-row-reverse relative border border-white/20"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <button onClick={onClose} className="absolute top-8 left-8 text-slate-400 hover:text-emerald-600 transition-all z-50">
              <X size={32} />
            </button>

            <div className="md:w-[35%] bg-[#059669] p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute top-10 opacity-10 rotate-12"><FileText size={300} /></div>
                <div className="relative z-10">
                    <div className="bg-white/10 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 mx-auto backdrop-blur-sm border border-white/10">
                        <FileText size={48} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black mb-6">انشر تحدياً صناعياً</h2>
                    <p className="text-emerald-50 font-bold leading-relaxed mb-12 text-lg">
                        هل تواجه شركتك مشكلة تقنية؟ اطرحها كعرض تعاون واستقطب أفضل العقول العلمية العربية لحلها.
                    </p>
                    
                    <div className="w-full space-y-4">
                        <div className="bg-emerald-700/40 flex items-center gap-4 p-5 rounded-2xl border border-white/10">
                            <Building size={20} className="text-emerald-300" /> 
                            <span className="font-bold text-sm">خاص بالمنشآت المعتمدة</span>
                        </div>
                        <div className="bg-emerald-700/40 flex items-center gap-4 p-5 rounded-2xl border border-white/10">
                            <DollarSign size={20} className="text-emerald-300" /> 
                            <span className="font-bold text-sm">دعم تمويلي للمشاريع</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-[65%] p-10 md:p-16 bg-[#fafafa]">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="font-black text-slate-700 block mr-2 text-sm uppercase tracking-wide">عنوان العرض</label>
                            <input required type="text" className="w-full bg-white border-none rounded-2xl p-5 outline-none shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 font-bold transition-all" 
                                placeholder="مثال: تحسين كفاءة الألواح الشمسية" value={offerData.title} onChange={e => setOfferData({...offerData, title: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                            <label className="font-black text-slate-700 block mr-2 text-sm uppercase tracking-wide">الشركة المعلنة</label>
                            <select required className="w-full bg-white border-none rounded-2xl p-5 outline-none shadow-sm ring-1 ring-slate-200 font-bold cursor-pointer appearance-none"
                                value={offerData.idCompany} onChange={e => setOfferData({...offerData, idCompany: e.target.value})}>
                                <option value="">اختر الشركة...</option>
                                {companies.map(c => <option key={c.idCompany} value={c.idCompany}>{c.company_name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="font-black text-slate-700 block mr-2 text-sm uppercase tracking-wide">وصف المشكلة التقنية</label>
                        <textarea required rows="4" className="w-full bg-white border-none rounded-2xl p-5 outline-none shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 font-bold transition-all resize-none"
                            placeholder="اشرح بالتفصيل ما الذي تأمل في تحقيقه..." value={offerData.description} onChange={e => setOfferData({...offerData, description: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <label className="font-black text-slate-700 block mr-2 text-xs uppercase">التخصص</label>
                            <select className="w-full bg-white border-none rounded-2xl p-5 shadow-sm ring-1 ring-slate-200 font-bold"
                                value={offerData.field} onChange={e => setOfferData({...offerData, field: e.target.value})}>
                                <option>الطاقة المتجددة</option>
                                <option>الذكاء الاصطناعي</option>
                                <option>البيوتكنولوجيا</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="font-black text-slate-700 block mr-2 text-xs uppercase">الموعد النهائي</label>
                            <input required type="date" className="w-full bg-white border-none rounded-2xl p-5 shadow-sm ring-1 ring-slate-200 font-bold uppercase"
                                value={offerData.deadline} onChange={e => setOfferData({...offerData, deadline: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                            <label className="font-black text-slate-700 block mr-2 text-xs uppercase">الميزانية ($)</label>
                            <input type="number" className="w-full bg-white border-none rounded-2xl p-5 shadow-sm ring-1 ring-slate-200 font-bold"
                                placeholder="0.00" value={offerData.budget} onChange={e => setOfferData({...offerData, budget: e.target.value})} />
                        </div>
                    </div>

                    <button className="w-full bg-[#1a1a1a] text-white py-6 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-[0.98] mt-4">
                        <Send size={24} /> نشر التحدي الآن
                    </button>
                </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LinkingResearchers = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [researcherData, setResearcherData] = useState({ full_name: '', email: '', research_field: 'تكنولوجيا المعلومات' });
  const [companyData, setCompanyData] = useState({ company_name: '', industry_sector: '', email: '' });

  useEffect(() => {
    apiAdmin.get('/companies')
      .then(res => setCompanies(res.data.data))
      .catch(() => console.error("Error loading companies"));
  }, []);

  const handleResearcherSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading(isRtl ? 'جاري المعالجة...' : 'Processing...');
    try {
      await apiAdmin.post('/register-researcher', researcherData);
      toast.success(isRtl ? "تم التسجيل بنجاح" : "Registered!", { id: loadId });
      setResearcherData({ full_name: '', email: '', research_field: 'تكنولوجيا المعلومات' });
    } catch (err) {
      toast.error(isRtl ? "فشل التسجيل" : "Failed", { id: loadId });
    }
  };

    const handleCompanySubmit = async (e) => {
      e.preventDefault();
      const loadId = toast.loading(isRtl ? 'جاري إرسال البيانات...' : 'Sending data...');
      try {
        const res = await apiAdmin.post('/register-company', companyData);
        toast.success(res.data.message, { id: loadId });
        setCompanyData({ company_name: '', industry_sector: '', email: '' });
      } catch (err) {
        const msg = err.response?.data?.message || (isRtl ? 'خطأ في العملية' : 'Process failed');
        toast.error(msg, { id: loadId });
      }
    };


  return (
    <div className={`min-h-screen bg-white pt-24 pb-20 overflow-x-hidden ${isRtl ? 'rtl text-right font-arabic' : 'ltr text-left'}`} dir={isRtl ? "rtl" : "ltr"}>
      <Toaster position="top-center" />
      
      <ChallengeModal 
        isOpen={isChallengeModalOpen} 
        onClose={() => setIsChallengeModalOpen(false)} 
        companies={companies}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <section className="relative mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 text-emerald-600 font-black text-xs uppercase tracking-[5px] mb-8">
            <Zap size={18} fill="currentColor" /> {isRtl ? "بوابة التعاون الصناعي" : "Industrial Collaboration"}
          </motion.div>
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8">
              <h1 className="text-6xl md:text-8xl font-black text-[#1a1a1a] leading-[0.9] tracking-tighter mb-10">
                {isRtl ? "اربط أبحاثك" : "Link Research"} <br/>
                <span className="text-emerald-600">{isRtl ? "بالصناعة العالمية" : "To Global Markets"}</span>
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="px-8 py-3 rounded-full border border-slate-200 text-slate-900 font-bold text-sm flex items-center gap-3">
                  <Globe size={16} className="text-emerald-600" /> 21 دولة عربية
                </div>
                <div className="px-8 py-3 rounded-full border border-emerald-100 text-emerald-600 bg-emerald-50 font-bold text-sm flex items-center gap-3">
                  <BarChart3 size={16} /> +500 مشروع تطبيقي
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-4 lg:pt-8">
              <p className="text-slate-900 font-bold text-xl leading-relaxed mb-10">
                منصة تواصل مباشر تسهل التعاون المثمر في المشاريع التطبيقية بين الباحثين والشركات الصناعية لتحقيق الابتكار.
              </p>
              <button onClick={() => setIsChallengeModalOpen(true)} className="group relative inline-flex items-center gap-5 bg-[#1a1a1a] text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[3px] overflow-hidden transition-all shadow-2xl active:scale-95">
                <div className="absolute inset-0 bg-emerald-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">{isRtl ? "نشر تحدي جديد" : "Post a Challenge"}</span>
                <Plus size={22} className="relative z-10" />
              </button>
            </motion.div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">
          <motion.div whileHover={{ y: -10 }} className="bg-[#1e293b] rounded-[60px] p-12 text-white relative overflow-hidden border-b-[12px] border-emerald-600 shadow-3xl group">
            <div className="absolute -top-10 -left-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <FlaskConical size={350} />
            </div>
            <h2 className="text-4xl font-black text-emerald-500 mb-10 relative z-10">للباحثين</h2>
            <form className="space-y-6 relative z-10" onSubmit={handleResearcherSubmit}>
                <div className="space-y-2">
                    <label className="text-emerald-500/80 font-bold text-sm mr-2">الاسم بالكامل</label>
                    <input  
                      type="text" 
                      placeholder="مثال: د. محمد العلي" value={researcherData.full_name} 
                      onChange={e => setResearcherData({...researcherData, full_name: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-5 text-white focus:ring-2 ring-emerald-500 outline-none transition-all placeholder:text-white" />
                </div>
                <div>
                  <label className="block text-emerald-500 font-bold mb-2 mr-1">مجال البحث</label>
                  <div className="relative">
                    <select 
                      value={researcherData.research_field}
                      onChange={(e) => setResearcherData({...researcherData, research_field: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none appearance-none cursor-pointer"
                    >
                      <option value="تكنولوجيا المعلومات">تكنولوجيا المعلومات</option>
                      <option value="الطاقة المتجددة">الطاقة المتجددة</option>
                      <option value="البيوتكنولوجيا">البيوتكنولوجيا</option>
                      <option value="الذكاء الاصطناعي">الذكاء الاصطناعي</option>
                    </select>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-emerald-500/80 font-bold text-sm mr-2">البريد الجامعي/المهني</label>
                    <input 
                      type="email" 
                      placeholder="name@university.edu" value={researcherData.email} 
                      onChange={e => setResearcherData({...researcherData, email: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-5 text-white focus:ring-2 ring-emerald-500 outline-none transition-all placeholder:text-white" />
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-2xl shadow-xl transition-all transform active:scale-[0.98] text-lg">انضم كباحث معتمد</button>
            </form>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-[#2c3e50] rounded-[60px] p-12 text-white relative overflow-hidden border-b-[12px] border-emerald-400 shadow-3xl group">
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <Factory size={350} />
            </div>
            <h2 className="text-4xl font-black text-emerald-400 mb-10 relative z-10">للشركات الصناعية</h2>
            <form className="space-y-6 relative z-10" onSubmit={handleCompanySubmit}>
                <div className="space-y-2">
                    <label className="text-emerald-400/80 font-bold text-sm mr-2">اسم المنشأة الصناعية</label>
                    <input  
                      type="text" 
                      placeholder="اسم الشركة"
                      value={companyData.company_name}
                      onChange={(e) => setCompanyData({...companyData, company_name: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-5 text-white focus:ring-2 ring-emerald-400 outline-none transition-all placeholder:text-white"
                    />
                </div>
              <div>
                  <label className="block text-emerald-400 font-bold mb-2 mr-1">قطاع الصناعة</label>
                  <input 
                    value={companyData.industry_sector}
                    onChange={(e) => setCompanyData({...companyData, industry_sector: e.target.value})}
                    type="text" 
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all placeholder:text-white"
                    placeholder="أدخل قطاع الشركة (مثلاً: التصنيع)" 
                  />
                </div>
                <div className="space-y-2">
                    <label className="text-emerald-400/80 font-bold text-sm mr-2">البريد الرسمي</label>
                    <input  
                      type="email" 
                      placeholder="contact@company.com" 
                      value={companyData.email}
                      onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-5 text-white focus:ring-2 ring-emerald-400 outline-none transition-all placeholder:text-white" 
                    />
                </div>
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-6 rounded-2xl shadow-xl transition-all transform active:scale-[0.98] text-lg">سجل منشأتك الآن</button>
            </form>
          </motion.div>
        </section>

        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-6xl font-black text-[#1a1a1a] tracking-tighter">آلية العمل</h2>
              <div className="h-2 w-40 bg-emerald-600 rounded-full" />
            </div>
            <p className="text-slate-600 font-bold text-xl max-w-sm">نظام متكامل يضمن انتقال الفكرة من المختبر إلى السوق العالمي بأمان واحترافية.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { id: 1, title: "تقديم طلب التعاون أو عرض التخصص", desc: "تقوم الشركات بطرح تحدياتها أو يقوم الباحثون بعرض ابتكاراتهم." },
              { id: 2, title: "المطابقة الذكية بين الطرفين", desc: "خوارزمياتنا تربط التحدي الصناعي بالخبير الأنسب لحله." },
              { id: 3, title: "بدء التنفيذ والتمويل", desc: "إطلاق المشروع تحت إشراف AIDSMO مع توفير الدعم التقني." }
            ].map((step) => (
              <div key={step.id} className="group relative p-12 rounded-[50px] bg-slate-50 border border-transparent hover:border-emerald-200 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
                <span className="text-[120px] font-black text-slate-200 absolute -top-4 right-10 group-hover:text-emerald-50 transition-colors -z-0">0{step.id}</span>
                <div className="relative z-10">
                  <h5 className="text-emerald-600 font-black text-sm uppercase tracking-widest mb-6">الخطوة {step.id}</h5>
                  <h3 className="text-2xl font-black mb-4 leading-tight">{step.title}</h3>
                  <p className="text-slate-500 font-bold leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <motion.section initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] rounded-[70px] p-16 text-center relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-emerald-600/20 p-6 rounded-3xl mb-10 backdrop-blur-xl border border-white/5">
                <Microscope className="text-emerald-400" size={54} />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-12 tracking-tighter max-w-4xl">
              حول أبحاثك إلى <span className="text-emerald-500 text-glow">منتجات صناعية</span> عالمية
            </h2>
            <button 
              onClick={() => setIsChallengeModalOpen(true)} 
              className="group bg-white text-[#1a1a1a] px-14 py-7 rounded-2xl font-black text-xl uppercase tracking-[4px] flex items-center gap-6 hover:bg-emerald-600 hover:text-white transition-all shadow-2xl active:scale-95"
            >
              <Plus size={28} /> إضافة طلب جديد
            </button>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default LinkingResearchers;