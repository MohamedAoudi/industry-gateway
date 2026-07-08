import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, Filter, BookOpen, Download, Cpu, Microscope, 
  ArrowLeft, ArrowRight, Zap, ShieldCheck 
} from 'lucide-react';

const ResearchDatabase = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // بيانات تجريبية
  const researchData = [
    {
      id: 1,
      title: "تطوير أغشية نانوية لتحلية المياه",
      category: "تكنولوجيا النانو",
      author: "د. أحمد المنصوري",
      year: "2024",
      status: "قابلة للتطبيق الصناعي"
    },
    {
      id: 2,
      title: "استخدام الذكاء الاصطناعي في صيانة الآلات",
      category: "الذكاء الاصطناعي",
      author: "م. سارة حسن",
      year: "2023",
      status: "نموذج أولي"
    },
    {
      id: 3,
      title: "تحسين كفاءة الألواح الشمسية في المناطق الصحراوية",
      category: "الطاقة المتجددة",
      author: "د. خالد القاسمي",
      year: "2024",
      status: "بحث مكتمل"
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Header Section - Inspired by Top Header (#1a1a1a) */}
      <section className="bg-[#1a1a1a] text-white pt-20 pb-20 px-6 relative overflow-hidden">
        {/* Amber Glow Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600 opacity-5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-600/10 border border-amber-600/20 text-amber-500 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-6">
            <Zap size={14} />
            {t('hero.badge')}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            {t('submenu.services.database_research_technologies_available_industrial_application')}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            {t('linking_researchers_page.extra.db_desc')}
          </p>
        </div>
      </section>

      {/* Search Bar - White with Slate borders and Amber focus */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-2 flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-slate-400`} size={18} />
            <input 
              type="text" 
              placeholder={t('sub_submenu.scientific_research_database.advanced_search_engine')}
              className={`w-full py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-slate-700 bg-transparent border-none focus:ring-0 outline-none font-bold text-sm`}
            />
          </div>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-black py-4 px-10 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-95 text-xs uppercase tracking-widest">
            <Filter size={16} />
            {isRtl ? 'تصفية النتائج' : 'Filter Results'}
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Filters - Using Slate and Amber accents */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[2px] mb-6 flex items-center gap-2 border-l-4 border-amber-600 rtl:border-r-4 rtl:border-l-0 px-3">
                {t('sub_submenu.scientific_research_database.classifying_research_industry_field')}
              </h3>
              <div className="space-y-4">
                {['تكنولوجيا المعلومات', 'الطاقة', 'الصناعات الكيميائية', 'البيئة'].map((cat, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-amber-600 checked:border-amber-600 transition-all" />
                        <ShieldCheck size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 left-1" />
                    </div>
                    <span className="text-slate-600 font-bold text-[13px] group-hover:text-amber-600 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Research Results - Cards styled like SubLinkCard */}
          <div className="lg:col-span-3 space-y-6">
            {researchData.map((item) => (
              <div key={item.id} className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 ltr:right-0 rtl:left-0 p-4">
                     <span className="text-[11px] font-black text-slate-300 uppercase">{item.year}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:bg-amber-600 group-hover:text-white transition-all">
                        <Microscope size={18} />
                    </div>
                    <span className="text-[12px] font-black text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md">
                        {item.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm font-medium">
                    <span className="text-slate-400">{isRtl ? 'الباحث:' : 'Researcher:'}</span> {item.author}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-50 pt-6 mt-2">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-tight">
                      <Cpu size={14} className="text-amber-600" />
                      {item.status}
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 text-[12px] font-black uppercase text-slate-700 hover:text-amber-600 transition-colors py-2">
                        <BookOpen size={16} />
                        {isRtl ? 'التفاصيل' : 'Details'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination - Matching Top Header style */}
            <div className="flex justify-center items-center gap-4 pt-12">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">
                {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              </button>
              <div className="flex gap-2">
                 <span className="w-8 h-8 flex items-center justify-center rounded bg-amber-600 text-white text-xs font-black shadow-lg shadow-amber-600/20">1</span>
                 <span className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 text-xs font-black transition-colors cursor-pointer">2</span>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* IP Protection - Matching UserHeader's border and Amber accents */}
      <section className="bg-slate-100/50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border-l-4 border-amber-600 rtl:border-r-4 rtl:border-l-0 p-10 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="bg-[#1a1a1a] p-5 rounded-2xl text-amber-500 shadow-xl">
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
                {t('linking_researchers_page.extra.secure_title')}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed max-w-3xl">
                {t('linking_researchers_page.extra.secure_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchDatabase;