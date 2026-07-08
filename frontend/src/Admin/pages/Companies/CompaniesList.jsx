import React, { useEffect, useState } from 'react';
import apiAdmin from '../../../api/apiAdmin';
import { Trash2, Edit, Mail, Factory, Search, Building2, ExternalLink } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiAdmin.get('/companies');
        setCompanies(response.data.data);
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب الشركات");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // تصفية الشركات حسب البحث
  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen" dir="rtl">
      <Toaster />
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
            دليل <span className="text-emerald-600">الشركات الصناعية</span>
        </h2>
          <p className="text-slate-900 text-md">إدارة المؤسسات الشريكة في نظام الابتكار</p>
        </div>

        {/* شريط البحث */}
        <div className="relative w-full md:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="ابحث عن شركة..."
            className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 ring-emerald-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-5 text-slate-900 font-bold text-sm">الشركة</th>
              <th className="px-6 py-5 text-slate-900 font-bold text-sm">القطاع الصناعي</th>
              <th className="px-6 py-5 text-slate-900 font-bold text-sm">التواصل</th>
              <th className="px-6 py-5 text-slate-900 font-bold text-sm text-center">العمليات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <Building2 size={20} />
                    </div>
                    <span className="font-bold text-slate-700">{company.company_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                    {company.industry_sector}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Mail size={14} />
                    {company.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="عرض العروض">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCompanies.length === 0 && !loading && (
          <div className="p-20 text-center text-emerald-600">
            لا توجد شركات تطابق بحثك
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesList;