import React, { useState, useEffect } from 'react';
import apiAdmin from '../../../api/apiAdmin';
import { toast, Toaster } from 'react-hot-toast';
import { Send, FileText, Calendar, Building, DollarSign } from 'lucide-react';

const AddOffer = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', field: 'الطاقة المتجددة', idCompany: '', deadline: '', budget: ''
  });

  useEffect(() => {
    // جلب الشركات لكي نختار منها في القائمة المنسدلة
    apiAdmin.get('/companies').then(res => setCompanies(res.data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiAdmin.post('/offers', formData);
      toast.success("تم نشر العرض الجديد بنجاح");
      setFormData({ title: '', description: '', field: 'الطاقة المتجددة', idCompany: '', deadline: '', budget: '' });
    } catch (err) { toast.error("خطأ في الإدخال"); }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen" dir="rtl">
      <Toaster />
      <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8">إضافة عرض تعاون جديد</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold mb-2 mr-2">عنوان العرض</label>
            <input required type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500" 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2 mr-2">الشركة صاحبة العرض</label>
              <select required className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none ring-1 ring-slate-200"
                value={formData.idCompany} onChange={e => setFormData({...formData, idCompany: e.target.value})}>
                <option value="">اختر الشركة...</option>
                {companies.map(c => <option key={c.idCompany} value={c.idCompany}>{c.company_name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2 mr-2">التخصص المطلوب</label>
              <select className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none ring-1 ring-slate-200"
                value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})}>
                <option>الطاقة المتجددة</option>
                <option>الذكاء الاصطناعي</option>
                <option>البيوتكنولوجيا</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2 mr-2">وصف التحدي التقني</label>
            <textarea required rows="4" className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2 mr-2">الموعد النهائي</label>
              <input required type="date" className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none ring-1 ring-slate-200"
                value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-2 mr-2">الميزانية التقديرية ($)</label>
              <input type="number" className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none ring-1 ring-slate-200"
                value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
            </div>
          </div>

          <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl">
            <Send size={20} /> نشر العرض الآن
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddOffer;