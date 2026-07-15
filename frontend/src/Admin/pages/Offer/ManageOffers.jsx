// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   Trash2, Calendar, Building2, Tag, 
//   ChevronRight, CheckCircle2, Clock, AlertCircle, 
//   Loader2, ChevronDown, LayoutGrid
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- مكون إدارة الحالة التفاعلي ---
// const StatusDropdown = ({ currentStatus, offerId, onStatusUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [updating, setUpdating] = useState(false);

//   const statuses = {
//     open: { label: "مفتوح", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={14} /> },
//     closed: { label: "مغلق", color: "text-slate-500", bg: "bg-slate-50", icon: <Clock size={14} /> },
//     pending: { label: "معلق", color: "text-amber-600", bg: "bg-amber-50", icon: <AlertCircle size={14} /> }
//   };

//   const active = statuses[currentStatus] || statuses.open;

//   const handleUpdate = async (newStatus) => {
//     setUpdating(true);
//     try {
//       await axios.patch(`http://localhost:8000/api/offers/${offerId}/status`, { status: newStatus });
//       onStatusUpdate(offerId, newStatus);
//       setIsOpen(false);
//     } catch (error) {
//       console.error("Update failed");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex items-center gap-2 px-4 py-2 rounded-2xl border border-transparent transition-all font-bold text-[11px] uppercase tracking-wider ${active.bg} ${active.color} hover:shadow-md`}
//       >
//         {updating ? <Loader2 size={14} className="animate-spin" /> : active.icon}
//         {active.label}
//         <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
//             className="absolute left-0 mt-2 w-40 bg-white/80 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl p-1.5 z-50"
//           >
//             {Object.entries(statuses).map(([key, val]) => (
//               <button
//                 key={key}
//                 onClick={() => handleUpdate(key)}
//                 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
//               >
//                 {val.icon} {val.label}
//               </button>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // --- المكون الرئيسي ---
// const ManageOffers = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = () => {
//     axios.get('http://localhost:8000/api/offers').then(res => {
//       setOffers(res.data.data);
//       setLoading(false);
//     });
//   };

//   const handleStatusUpdate = (id, newStatus) => {
//     setOffers(prev => prev.map(o => o.idCollaborationOffer === id ? { ...o, status: newStatus } : o));
//   };

//   const deleteOffer = (id) => {
//     if(window.confirm("هل تريد حذف هذا العرض نهائياً؟")) {
//       axios.delete(`http://localhost:8000/api/offers/${id}`).then(() => {
//         setOffers(offers.filter(o => o.idCollaborationOffer !== id));
//       });
//     }
//   };

//   return (
//     <div className="p-8 bg-[#FDFDFF] min-h-screen" dir="rtl">
//       {/* Header WOW Area */}
//       <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
//         <div>
//           <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-2">
//             <LayoutGrid size={18} /> لوحة التحكم الإدارية
//           </div>
//           <h2 className="text-5xl font-black text-slate-900 tracking-tighter">إدارة <span className="text-emerald-600">العروض</span></h2>
//         </div>
//         <div className="bg-white px-6 py-4 rounded-[24px] border border-slate-100 shadow-sm text-center">
//           <span className="block text-3xl font-black text-slate-900">{offers.length}</span>
//           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">إجمالي الطلبات</span>
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <AnimatePresence>
//           {offers.map((offer) => (
//             <motion.div
//               layout
//               key={offer.idCollaborationOffer}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/40 transition-all duration-500"
//             >
//               <div className="flex justify-between items-start mb-8">
//                 <div className="flex items-center gap-5">
//                   <div className="w-16 h-16 bg-slate-900 rounded-[22px] flex items-center justify-center text-white text-2xl font-black shadow-lg group-hover:bg-emerald-600 transition-colors">
//                     {offer.company?.company_name?.charAt(0)}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-black text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{offer.title}</h3>
//                     <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
//                       <Building2 size={14} /> {offer.company?.company_name}
//                     </div>
//                   </div>
//                 </div>
//                 <StatusDropdown 
//                   currentStatus={offer.status} 
//                   offerId={offer.idCollaborationOffer} 
//                   onStatusUpdate={handleStatusUpdate} 
//                 />
//               </div>

//               <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium line-clamp-2">
//                 {offer.description}
//               </p>

//               <div className="flex flex-wrap gap-3 mb-8">
//                 <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 font-bold text-xs">
//                   <Tag size={14} className="text-emerald-600" /> {offer.field}
//                 </div>
//                 <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-600 font-bold text-xs">
//                   <Calendar size={14} className="text-emerald-600" /> {offer.deadline}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-6 border-t border-slate-50">
//                 <button className="flex items-center gap-2 text-emerald-600 font-black text-sm group-hover:mr-2 transition-all">
//                   عرض التفاصيل <ChevronRight size={20} />
//                 </button>
//                 <button 
//                   onClick={() => deleteOffer(offer.idCollaborationOffer)}
//                   className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ManageOffers;





















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   Trash2, Calendar, Building2, Tag, 
//   ChevronRight, CheckCircle2, Clock, AlertCircle, 
//   Loader2, ChevronDown, LayoutGrid, Plus
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const StatusDropdown = ({ currentStatus, offerId, onStatusUpdate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [updating, setUpdating] = useState(false);

//   const statuses = {
//     open: { label: "مفتوح", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={14} /> },
//     closed: { label: "مغلق", color: "text-rose-600", bg: "bg-rose-50", icon: <Clock size={14} /> },
//     pending: { label: "معلق", color: "text-amber-600", bg: "bg-amber-50", icon: <AlertCircle size={14} /> }
//   };

//   const active = statuses[currentStatus] || statuses.open;

//   const handleUpdate = async (newStatus) => {
//     setUpdating(true);
//     try {
//       await axios.patch(`http://localhost:8000/api/offers/${offerId}/status`, { status: newStatus });
//       onStatusUpdate(offerId, newStatus);
//       setIsOpen(false);
//     } catch (error) {
//       console.error("Update failed");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border border-transparent transition-all duration-300 font-bold text-[12px] shadow-sm hover:shadow-md ${active.bg} ${active.color}`}
//       >
//         {updating ? <Loader2 size={14} className="animate-spin" /> : active.icon}
//         <span className="tracking-wide">{active.label}</span>
//         <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: 8, scale: 0.95 }} 
//             animate={{ opacity: 1, y: 0, scale: 1 }} 
//             exit={{ opacity: 0, y: 8, scale: 0.95 }}
//             className="absolute left-0 mt-3 w-44 bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[24px] p-2 z-50 overflow-hidden"
//           >
//             {Object.entries(statuses).map(([key, val]) => (
//               <button
//                 key={key}
//                 onClick={() => handleUpdate(key)}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 ${
//                   currentStatus === key ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
//                 }`}
//               >
//                 {val.icon} {val.label}
//               </button>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const ManageOffers = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   const fetchOffers = () => {
//     axios.get('http://localhost:8000/api/offers').then(res => {
//       setOffers(res.data.data);
//       setLoading(false);
//     });
//   };

//   const handleStatusUpdate = (id, newStatus) => {
//     setOffers(prev => prev.map(o => o.idCollaborationOffer === id ? { ...o, status: newStatus } : o));
//   };

//   const deleteOffer = (id) => {
//     if(window.confirm("هل تريد حذف هذا العرض نهائياً؟")) {
//       axios.delete(`http://localhost:8000/api/offers/${id}`).then(() => {
//         setOffers(offers.filter(o => o.idCollaborationOffer !== id));
//       });
//     }
//   };

//   return (
//     <div className="p-6 md:p-12 bg-[#F8FAFC] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
//       {/* Navbar Style Header */}
//       <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
//         <div className="text-center md:text-right">
//           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-emerald-100/50">
//             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
//             لوحة التحكم المركزية
//           </div>
//           <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-[ -0.04em] leading-[1.1]">
//             إدارة <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-600 to-emerald-400">العروض</span>
//           </h2>
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="hidden md:block h-12 w-[1px] bg-slate-200" />
//           <div className="flex flex-col items-center md:items-end">
//             <span className="text-4xl font-black text-slate-900 leading-none">{offers.length}</span>
//             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">عرض نشط</span>
//           </div>
//           <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all transform hover:-translate-y-1">
//             <Plus size={18} /> عرض جديد
//           </button>
//         </div>
//       </div>

//       {/* Modern Bento Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <AnimatePresence mode='popLayout'>
//           {offers.map((offer, index) => (
//             <motion.div
//               layout
//               key={offer.idCollaborationOffer}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.4, delay: index * 0.05 }}
//               className="group relative bg-white rounded-[48px] border border-slate-200/60 p-1 hover:border-emerald-200 transition-all duration-500 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.12)]"
//             >
//               <div className="p-8 md:p-10">
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
//                   <div className="flex items-center gap-6">
//                     <div className="relative w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:scale-105 transition-all duration-500 overflow-hidden shadow-inner">
//                       <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
//                       <span className="text-3xl font-black text-slate-900 relative z-10">{offer.company?.company_name?.charAt(0)}</span>
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{offer.title}</h3>
//                       <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
//                         <Building2 size={16} className="text-slate-300" />
//                         <span>{offer.company?.company_name}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <StatusDropdown 
//                     currentStatus={offer.status} 
//                     offerId={offer.idCollaborationOffer} 
//                     onStatusUpdate={handleStatusUpdate} 
//                   />
//                 </div>

//                 <p className="text-slate-500 text-[17px] leading-[1.8] mb-10 font-medium line-clamp-3">
//                   {offer.description}
//                 </p>

//                 <div className="grid grid-cols-2 gap-4 mb-10">
//                   <div className="flex items-center gap-3 px-5 py-4 bg-slate-50/80 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:border-emerald-100 transition-all">
//                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600"><Tag size={18} /></div>
//                     <span className="text-sm font-bold text-slate-700">{offer.field}</span>
//                   </div>
//                   <div className="flex items-center gap-3 px-5 py-4 bg-slate-50/80 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:border-emerald-100 transition-all">
//                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600"><Calendar size={18} /></div>
//                     <span className="text-sm font-bold text-slate-700">{offer.deadline}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-8 border-t border-slate-100">
//                   <button className="group/btn flex items-center gap-2 text-slate-900 font-black text-sm transition-all">
//                     <span className="group-hover/btn:ml-2 transition-all">التفاصيل الكاملة</span>
//                     <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover/btn:bg-emerald-600 transition-all">
//                       <ChevronRight size={18} />
//                     </div>
//                   </button>
//                   <button 
//                     onClick={() => deleteOffer(offer.idCollaborationOffer)}
//                     className="w-14 h-14 flex items-center justify-center rounded-[20px] bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ManageOffers;



























import React, { useEffect, useState } from 'react';
import apiAdmin from '../../../api/apiAdmin';
import { 
  Trash2, Calendar, Building2, Tag, 
  ChevronRight, CheckCircle2, Clock, AlertCircle, 
  Loader2, ChevronDown, LayoutGrid 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../../../components/Pagination';

const PAGE_SIZE = 8;

// إعدادات الثيم لكل حالة
const statusThemes = {
  open: {
    bg: "#ffffff",
    border: "border-emerald-100",
    accent: "bg-emerald-600",
    text: "text-emerald-600",
    lightBg: "bg-emerald-50/50",
    label: "مفتوح"
  },
  closed: {
    bg: "#fff1f2", // Rose 50
    border: "border-rose-200",
    accent: "bg-rose-600",
    text: "text-rose-600",
    lightBg: "bg-rose-100/50",
    label: "مغلق"
  },
  pending: {
    bg: "#fffbeb", // Amber 50
    border: "border-amber-200",
    accent: "bg-amber-600",
    text: "text-amber-600",
    lightBg: "bg-amber-100/50",
    label: "قيد الانتظار"
  }
};

const StatusDropdown = ({ currentStatus, offerId, onStatusUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await apiAdmin.patch(`/offers/${offerId}/status`, { status: newStatus });
      onStatusUpdate(offerId, newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setUpdating(false);
    }
  };

  const active = statusThemes[currentStatus] || statusThemes.open;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all font-bold text-[11px] uppercase tracking-wider shadow-sm ${active.lightBg} ${active.text}`}
      >
        {updating ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
        {active.label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 mt-2 w-40 bg-white shadow-2xl rounded-2xl p-1.5 z-50 border border-slate-100"
          >
            {Object.keys(statusThemes).map((status) => (
              <button
                key={status}
                onClick={() => handleUpdate(status)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {statusThemes[status].label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(offers.length / PAGE_SIZE));
  const paginatedOffers = offers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    apiAdmin.get('/offers').then(res => setOffers(res.data.data));
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setOffers(prev => prev.map(o => o.idCollaborationOffer === id ? { ...o, status: newStatus } : o));
  };

  const deleteOffer = (id) => {
    if(window.confirm("حذف هذا العرض؟")) {
      apiAdmin.delete(`/offers/${id}`).then(() => {
        setOffers(offers.filter(o => o.idCollaborationOffer !== id));
      });
    }
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans" dir="rtl">
      <div className=" mx-auto mb-16 flex justify-between items-center">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">إدارة <span className="text-emerald-600">العروض</span></h2>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 px-8 text-center">
          <span className="block text-2xl font-black text-slate-900">{offers.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">عرض متاح</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <AnimatePresence mode='popLayout'>
          {paginatedOffers.map((offer) => {
            const theme = statusThemes[offer.status] || statusThemes.open;
            return (
              <motion.div
                layout
                key={offer.idCollaborationOffer}
                animate={{ backgroundColor: theme.bg }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`group relative rounded-[48px] p-1 border transition-all duration-500 shadow-sm hover:shadow-xl ${theme.border}`}
              >
                <div className="p-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-6">
                      <motion.div 
                        animate={{ backgroundColor: theme.accent.replace('bg-', '') }}
                        className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white text-2xl font-black shadow-lg ${theme.accent}`}
                      >
                        {offer.company?.company_name?.charAt(0)}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-800 mb-1">{offer.title}</h3>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                          <Building2 size={14} /> {offer.company?.company_name}
                        </div>
                      </div>
                    </div>
                    <StatusDropdown 
                      currentStatus={offer.status} 
                      offerId={offer.idCollaborationOffer} 
                      onStatusUpdate={handleStatusUpdate} 
                    />
                  </div>

                  <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium line-clamp-2">
                    {offer.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    <div className={`px-4 py-2 rounded-xl text-[12px] font-bold ${theme.lightBg} ${theme.text}`}>
                      <Tag size={14} className="inline ml-2" /> {offer.field}
                    </div>
                    <div className="px-4 py-2 rounded-xl text-[12px] font-bold bg-white/50 text-slate-500 border border-slate-100">
                      <Calendar size={14} className="inline ml-2" /> ينتهي: {offer.deadline}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-black/5">
                    <button className="flex items-center gap-2 text-slate-900 font-black text-sm hover:gap-4 transition-all">
                      عرض التفاصيل <ChevronRight size={20} className={theme.text} />
                    </button>
                    <button 
                      onClick={() => deleteOffer(offer.idCollaborationOffer)}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-slate-300 hover:text-rose-600 transition-all shadow-sm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <Pagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-10" />
    </div>
  );
};

export default ManageOffers;
