// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Trash2, Edit, Mail, Microscope, User } from 'lucide-react';

// const ResearchersList = () => {
//   const [researchers, setResearchers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // جلب البيانات من Laravel
//   useEffect(() => {
//     const fetchResearchers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/researchers');
//         setResearchers(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("خطأ في جلب البيانات", error);
//         setLoading(false);
//       }
//     };
//     fetchResearchers();
//   }, []);

//   if (loading) return <div className="p-10 text-center">جاري تحميل البيانات...</div>;

//   return (
//     <div className="p-8 bg-slate-50 min-h-screen" dir="rtl">
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-black text-slate-900">إدارة الباحثين</h2>
//           <p className="text-slate-500 text-sm">عرض وإدارة جميع الكفاءات العلمية المسجلة</p>
//         </div>
//         <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors">
//           + إضافة باحث جديد
//         </button>
//       </div>

//       <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
//         <table className="w-full text-right">
//           <thead className="bg-slate-50 border-b border-slate-100">
//             <tr>
//               <th className="px-6 py-4 text-slate-900 font-bold text-sm">الباحث</th>
//               <th className="px-6 py-4 text-slate-900 font-bold text-sm">التخصص العلمي</th>
//               <th className="px-6 py-4 text-slate-900 font-bold text-sm">البريد الإلكتروني</th>
//               <th className="px-6 py-4 text-slate-900 font-bold text-sm text-center">الإجراءات</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {researchers.map((res) => (
//               <tr key={res.idResearcher} className="hover:bg-slate-50/50 transition-colors">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
//                       <User size={18} />
//                     </div>
//                     <span className="font-bold text-slate-700">{res.full_name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-slate-600 text-sm">
//                    <div className="flex items-center gap-2">
//                      <Microscope size={14} className="text-slate-400" />
//                      {res.research_field}
//                    </div>
//                 </td>
//                 <td className="px-6 py-4 text-slate-600 text-sm">
//                    <div className="flex items-center gap-2">
//                      <Mail size={14} className="text-slate-400" />
//                      {res.email}
//                    </div>
//                 </td>
//                 <td className="px-6 py-4 text-center">
//                   <div className="flex justify-center gap-2">
//                     <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                       <Edit size={18} />
//                     </button>
//                     <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {researchers.length === 0 && (
//           <div className="p-20 text-center text-slate-400">
//             لا يوجد باحثون مسجلون حالياً
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResearchersList;





























import React, { useEffect, useState } from 'react';
import apiAdmin from '../../../api/apiAdmin';
import { Trash2, Edit, Mail, Microscope, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResearchersList = () => {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  // État pour le formulaire
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    research_field: 'تكنولوجيا المعلومات'
  });

  const fetchResearchers = async () => {
    try {
      const response = await apiAdmin.get('/researchers');
      setResearchers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("خطأ في جلب البيانات", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearchers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiAdmin.post('/register-researcher', formData);
      setIsModalOpen(false); // Fermer le modal
      setFormData({ full_name: '', email: '', research_field: 'تكنولوجيا المعلومات' }); // Reset
      fetchResearchers(); // Rafraîchir la liste
    } catch (error) {
      alert("حدث خطأ lors de l'ajout");
    }
  };

const handleImportWithAI = async () => {
  setAiLoading(true);
  setAiMessage('');

  try {
    const response = await apiAdmin.post('/researchers/import-ai');

    setAiMessage('🚀 AI scraping started in background...');

    // option: refresh après 10s
    setTimeout(() => {
      fetchResearchers();
    }, 10000);

  } catch (error) {
    setAiMessage('❌ Error starting AI scraping');
  } finally {
    setAiLoading(false);
  }
};

  if (loading) return <div className="p-10 text-center font-bold text-slate-600">جاري تحميل البيانات...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
              إدارة <span className="text-emerald-600">الباحثين</span>
          </h2>
          <p className="text-slate-900 text-md">عرض وإدارة جميع الكفاءات العلمية المسجلة</p>
          {aiMessage && (
            <p className="mt-2 text-sm text-slate-500">{aiMessage}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            + إضافة باحث جديد
          </button>
          <button
            onClick={handleImportWithAI}
            disabled={aiLoading}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {aiLoading ? 'جارٍ الإضافة بواسطة AI...' : '+ إضافة بواسطة AI'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-slate-900 font-bold text-sm">الباحث</th>
              <th className="px-6 py-4 text-slate-900 font-bold text-sm">التخصص العلمي</th>
              <th className="px-6 py-4 text-slate-900 font-bold text-sm">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-slate-900 font-bold text-sm">الدولة</th>
              <th className="px-6 py-4 text-slate-900 font-bold text-sm text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {researchers.map((res) => (
              <tr key={res.idResearcher} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      {res.full_name ? res.full_name.charAt(0) : '-'}
                    </div>
                    <span className="font-bold text-slate-700">{res.full_name || 'غير معروف'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                   <div className="flex items-center gap-2">
                     <Microscope size={14} className="text-slate-400" />
                     {res.research_field}
                   </div>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                   <div className="flex items-center gap-2">
                     <Mail size={14} className="text-slate-400" />
                     {res.email}
                   </div>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">
                   <div className="flex items-center gap-2">
                     <Globe size={14} className="text-slate-400" />
                     {res.country || 'غير محدد'}
                   </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL - Utilisation de Framer Motion pour l'animation */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Form Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">إضافة باحث جديد</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="مثال: أحمد محمد"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                  <input 
                    type="email" required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">مجال البحث</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                    value={formData.research_field}
                    onChange={(e) => setFormData({...formData, research_field: e.target.value})}
                  >
                    <option>تكنولوجيا المعلومات</option>
                    <option>الطاقة المتجددة</option>
                    <option>البيوتكنولوجيا</option>
                    <option>الذكاء الاصطناعي</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 mt-2"
                >
                  حفظ البيانات
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResearchersList;