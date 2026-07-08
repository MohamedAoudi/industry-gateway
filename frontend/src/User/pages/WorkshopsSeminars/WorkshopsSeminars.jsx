import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, Filter, Calendar, User, ArrowRight, 
  Sparkles, MapPin, Clock, Users, Play, 
  Video, Laptop, Globe, ArrowUpRight, Bookmark
} from 'lucide-react';

const JointWorkshops = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [activeCategory, setActiveCategory] = useState('all');

  // Données adaptées aux Workshops et Séminaires
  const workshopData = [
    {
      id: 1,
      title: isRtl ? "ورشة عمل: تطبيقات الذكاء الاصطناعي في صيانة المصانع" : "Workshop: AI Applications in Factory Maintenance",
      type: isRtl ? "ورشة عمل تفاعلية" : "Interactive Workshop",
      instructor: "د. إبراهيم الفاسي",
      date: "15 MAR 2026",
      time: "10:00 AM",
      mode: isRtl ? "عبر الإنترنت" : "Online",
      attendees: "120",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=800",
      status: isRtl ? "متاح للتسجيل" : "Open for Registration",
      tags: ["AI", "Industry 4.0"]
    },
    {
      id: 2,
      title: isRtl ? "ندوة مشتركة: مستقبل الهيدروجين الأخضر في الشرق الأوسط" : "Joint Seminar: Future of Green Hydrogen in the ME",
      type: isRtl ? "ندوة علمية" : "Scientific Seminar",
      instructor: "م. ليلى بنعلي",
      date: "22 MAR 2026",
      time: "02:00 PM",
      mode: isRtl ? "حضوري - دبي" : "In-person - Dubai",
      attendees: "350",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      status: isRtl ? "مقاعد محدودة" : "Limited Seats",
      tags: ["Energy", "Sustainability"]
    },
    {
      id: 3,
      title: isRtl ? "دورة تدريبية: كفاءة الطاقة في الصناعات النانوية" : "Training: Energy Efficiency in Nano-Industries",
      type: isRtl ? "دورة تدريبية" : "Training Course",
      instructor: "د. يوسف القحطاني",
      date: "05 APR 2026",
      time: "09:00 AM",
      mode: isRtl ? "هجين" : "Hybrid",
      attendees: "45",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      status: isRtl ? "مكتمل" : "Sold Out",
      tags: ["Nano", "Production"]
    }
  ];

  return (
    <div className={`min-h-screen text-slate-900 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* --- Hero Section - Pure White Style --- */}
      <section className=" relative  pt-12 pb-10 px-6 bg-slate-50/50 overflow-hidden">
        <div className=" max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-amber-500 leading-[1.1] max-w-4xl">
              {isRtl ? "ورش عمل وندوات" : "Joint Workshops"}<br/>
              <span className="text-amber-500 bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                 {isRtl ? "تجمع بين العلم والصناعة" : "& Scientific Seminars"}
              </span>
            </h1>
            
            <p className="max-w-2xl text-slate-500 text-xl font-medium leading-relaxed mb-12">
              {isRtl ? "جسور معرفية تجمع بين كبار الباحثين ورواد الصناعة لتبادل الخبرات وحل التحديات التقنية المعاصرة." 
                     : "Knowledge bridges connecting top researchers and industry leaders to exchange expertise and solve contemporary technical challenges."}
            </p>
          </div>
        </div>
      </section>

      {/* --- Statistics Bento --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <span className="text-3xl font-black text-slate-900">4,500+</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{isRtl ? "مستفيد" : "Beneficiaries"}</span>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Laptop size={24} />
            </div>
            <span className="text-3xl font-black text-slate-900">120+</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{isRtl ? "ورشة عمل سنوياً" : "Annual Workshops"}</span>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Globe size={24} />
            </div>
            <span className="text-3xl font-black text-slate-900">15</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{isRtl ? "دولة مشاركة" : "Participating Countries"}</span>
          </div>
        </div>
      </section>

      {/* --- Filter Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {['all', 'workshops', 'seminars', 'training'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-wider ${activeCategory === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {isRtl ? (tab === 'all' ? 'الكل' : tab === 'workshops' ? 'ورش العمل' : tab === 'seminars' ? 'الندوات' : 'التدريب') : tab}
              </button>
            ))}
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input type="text" className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-amber-500/20 font-bold" placeholder={isRtl ? "بحث..." : "Search..."} />
             </div>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all"><Filter size={20}/></button>
          </div>
        </div>

        {/* --- Workshop Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {workshopData.map((item) => (
            <div key={item.id} className="group flex flex-col md:flex-row bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden">
              
              {/* Image with Type Tag */}
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-3/5 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase">{tag}</span>
                    ))}
                  </div>
                  <button className="text-slate-300 hover:text-amber-500 transition-colors"><Bookmark size={20}/></button>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Calendar size={16} className="text-amber-500" />
                    <span>{item.date}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <Clock size={16} className="text-amber-500" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <MapPin size={16} className="text-amber-500" />
                    <span>{item.mode}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{isRtl ? "المحاضر" : "Speaker"}</p>
                      <p className="text-xs font-black text-slate-800">{item.instructor}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest group/btn">
                    {isRtl ? "سجل الآن" : "Register"}
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Call to Action - Join as Speaker --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-[#1a1a1a] rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="relative z-10 md:w-2/3">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
              {isRtl ? "هل ترغب في تقديم ندوة مشتركة؟" : "Want to Host a Joint Seminar?"}
            </h2>
            <p className="text-slate-400 text-xl font-medium mb-10 max-w-xl">
              {isRtl ? "نحن نبحث دائماً عن خبراء لمشاركة رؤاهم الصناعية. انضم إلى شبكة المحاضرين لدينا اليوم." 
                     : "We're always looking for experts to share industrial insights. Join our network of speakers today."}
            </p>
            <button className="bg-amber-500 text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-amber-500/20">
              {isRtl ? "قدم الآن كمحاضر" : "Apply as a Speaker"}
            </button>
          </div>
          
          <div className="relative z-10 md:w-1/3 flex justify-center">
             <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center animate-pulse">
                <Play size={80} fill="white" className="text-white ml-2" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JointWorkshops;