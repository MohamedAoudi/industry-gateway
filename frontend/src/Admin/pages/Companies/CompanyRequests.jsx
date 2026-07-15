import React, { useEffect, useState } from 'react';
import apiAdmin from '../../../api/apiAdmin';
import { Check, X, Building2, Clock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Pagination from '../../../components/Pagination';

const PAGE_SIZE = 9;

const CompanyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(requests.length / PAGE_SIZE));
  const paginatedRequests = requests.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await apiAdmin.get('/companies/pending');
      setRequests(res.data.data);
    } catch (error) {
      toast.error("فشل جلب البيانات");
    }
  };

  const handleAction = async (idCompany, newStatus) => {
    try {
      // ✅ التعديل هنا: نستخدم idCompany الذي نمرره للدالة
      await apiAdmin.put(`/companies/${idCompany}/status`, { status: newStatus });
      
      toast.success(newStatus === 'approved' ? 'تم قبول الشركة' : 'تم رفض الطلب');
      
      // ✅ التعديل هنا: نحدث القائمة باستخدام idCompany
      setRequests(requests.filter(req => req.idCompany !== idCompany));
    } catch (error) {
      console.error(error);
      toast.error("فشلت العملية");
    }
  };

  const handleImportWithAI = async () => {
  setAiLoading(true);
  setAiMessage('');

  try {
    const response = await apiAdmin.post('/companies/import-ai');

    setAiMessage('🚀 AI scraping started in background...');

    // option: refresh après 10s
    setTimeout(() => {
      fetchRequests();
    }, 10000);

  } catch (error) {
    setAiMessage('❌ Error starting AI scraping');
  } finally {
    setAiLoading(false);
  }
};

  return (
    <div className="p-8 bg-slate-50 min-h-screen" dir="rtl">
      <Toaster />
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
              طلبات <span className="text-emerald-600">الانضمام</span>
          </h2>

          <p className="text-slate-900 mt-2 font-medium">الشركات الصناعية بانتظار المراجعة والتحقق</p>
          {aiMessage && (
            <p className="mt-2 text-sm text-slate-500">{aiMessage}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button
            onClick={handleImportWithAI}
            disabled={aiLoading}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {aiLoading ? 'جارٍ الإضافة بواسطة AI...' : '+ إضافة بواسطة AI'}
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedRequests.map((req) => (
            <motion.div
              key={req.idCompany} // ✅ التعديل هنا: استخدام idCompany كمفتاح
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[30px] p-6 shadow-sm border border-slate-100 relative overflow-hidden"
            >
              {/* التصميم ... */}
              <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-800 mb-1">{req.company_name}</h3>
                <p className="text-emerald-600 font-bold text-sm mb-4">{req.industry_sector}</p>

                <div className="space-y-2 mb-8 text-slate-500 text-sm italic">
                  {req.email}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAction(req.idCompany, 'approved')} // ✅ تمرير idCompany
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Check size={18} /> قبول
                  </button>
                  <button 
                    onClick={() => handleAction(req.idCompany, 'rejected')} // ✅ تمرير idCompany
                    className="flex-1 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <X size={18} /> رفض
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Pagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-8" />

      {requests.length === 0 && (
        <div className="text-center py-40">
           <p className="text-emerald-600 font-bold">لا توجد طلبات معلقة حالياً</p>
        </div>
      )}
    </div>
  );
};

export default CompanyRequests;
