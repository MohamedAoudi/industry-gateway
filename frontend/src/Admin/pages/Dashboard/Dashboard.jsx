// import React from 'react';
// import { Users, TrendingUp, Globe, HandCoins, ArrowUpRight, Zap } from 'lucide-react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'المغرب', pme: 400, invest: 240 },
//   { name: 'مصر', pme: 700, invest: 450 },
//   { name: 'السعودية', pme: 600, invest: 580 },
//   { name: 'تونس', pme: 300, invest: 190 },
//   { name: 'الأردن', pme: 200, invest: 150 },
// ];

// // Palette de couleurs : Indigo-900 (Principal), Amber-500 (Accent), Emerald-500 (Succès)

// const StatCard = ({ title, value, icon, trend, colorClass, iconColor }) => (
//   <div className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-200 transition-all duration-300">
//     <div className="flex justify-between items-start mb-6">
//       <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 text-xl`}>
//         {React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}`, strokeWidth: 2.5 })}
//       </div>
//       <span className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-black">
//         <ArrowUpRight size={14} className="ml-1" />
//         {trend}
//       </span>
//     </div>
//     <div>
//       <p className="text-slate-500 text-sm font-bold mb-1 uppercase tracking-wider">{title}</p>
//       <h2 className="text-3xl font-black text-indigo-950 leading-none">{value}</h2>
//     </div>
//   </div>
// );

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-8 space-y-10 font-sans" dir="rtl">
//       {/* Header Stylisé */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
//             <span className="text-indigo-600 font-black text-sm tracking-widest uppercase">التقرير الاستراتيجي 2026</span>
//           </div>
//           <h1 className="text-4xl font-black text-slate-900">لوحة المتابعة التحليلية</h1>
//         </div>
//         <div className="flex gap-3">
//           <button className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
//             إعدادات
//           </button>
//           <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
//             <span>تصدير البيانات</span>
//           </button>
//         </div>
//       </div>

//       {/* Grid des Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard title="إجمالي المؤسسات" value="1,240" icon={<Users />} trend="+12٪" colorClass="bg-indigo-500" iconColor="text-indigo-600" />
//         <StatCard title="رأس المال المستثمر" value="M$ 85.4" icon={<HandCoins />} trend="+8٪" colorClass="bg-amber-500" iconColor="text-amber-600" />
//         <StatCard title="المشاريع المنفذة" value="912" icon={<Zap />} trend="+24٪" colorClass="bg-emerald-500" iconColor="text-emerald-600" />
//         <StatCard title="التغطية الجغرافية" value="24" icon={<Globe />} trend="مستقر" colorClass="bg-rose-500" iconColor="text-rose-600" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Graphique avec dégradé Indigo */}
//         <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
//           <div className="flex justify-between items-center mb-10">
//             <div>
//               <h3 className="text-xl font-black text-slate-800">تحليل الأداء الإقليمي</h3>
//               <p className="text-slate-400 text-sm">مقارنة بين المؤسسات والاستثمارات</p>
//             </div>
//             <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
//               <button className="bg-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm">شهري</button>
//               <button className="px-4 py-1.5 rounded-lg text-sm font-bold text-slate-500">سنوي</button>
//             </div>
//           </div>
          
//           <div className="h-[350px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={data}>
//                 <defs>
//                   <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
//                     <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} />
//                 <YAxis orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} />
//                 <Tooltip 
//                   cursor={{stroke: '#4f46e5', strokeWidth: 2}}
//                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '15px'}}
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="pme" 
//                   stroke="#4f46e5" 
//                   strokeWidth={4} 
//                   fillOpacity={1} 
//                   fill="url(#indigoGradient)" 
//                   animationDuration={2000}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Sidebar avec design "Glassmorphism" sombre */}
//         <div className="bg-indigo-950 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
//           <div className="relative z-10">
//             <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">مؤشرات الإنجاز</h3>
//             <div className="space-y-8">
//               <ProgressItem label="التوسع في الخليج" percent={82} color="bg-amber-400" />
//               <ProgressItem label="التحول الرقمي" percent={56} color="bg-emerald-400" />
//               <ProgressItem label="استقطاب الشركاء" percent={94} color="bg-indigo-400" />
//             </div>
//           </div>
          
//           <div className="relative z-10 mt-10 p-6 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur-md">
//             <p className="text-indigo-200 text-sm font-medium">إجمالي التطور السنوي</p>
//             <div className="flex items-end gap-2">
//               <h4 className="text-4xl font-black text-amber-400">92.8٪</h4>
//               <TrendingUp className="text-emerald-400 mb-2" size={20} />
//             </div>
//           </div>

//           {/* Décorations abstraites */}
//           <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px]"></div>
//           <div className="absolute bottom-[-5%] right-[-5%] w-32 h-32 bg-amber-500/10 rounded-full blur-[50px]"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProgressItem = ({ label, percent, color }) => (
//   <div className="space-y-3">
//     <div className="flex justify-between items-center">
//       <span className="text-indigo-100 font-medium">{label}</span>
//       <span className={`text-xs font-black px-2 py-0.5 rounded-md bg-white/10 ${color.replace('bg-', 'text-')}`}>
//         {percent}%
//       </span>
//     </div>
//     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
//       <div 
//         className={`h-full ${color} rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)]`} 
//         style={{ width: `${percent}%` }}
//       ></div>
//     </div>
//   </div>
// );

// export default Dashboard;
















import React from 'react';
import { 
  Beaker, 
  Factory, 
  Lightbulb, 
  Network, 
  ArrowUpRight, 
  Zap, 
  Database,
  ArrowLeftRight,
  Microscope
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

const data = [
  { name: 'البحث العلمي', active: 400, completed: 240 },
  { name: 'تطوير النماذج', active: 700, completed: 450 },
  { name: 'نقل التكنولوجيا', active: 600, completed: 580 },
  { name: 'التصنيع التجاري', active: 300, completed: 190 },
  { name: 'براءات الاختراع', active: 500, completed: 350 },
];

const InnovationCard = ({ title, value, subtext, icon: Icon, trend, colorClass }) => (
  <div className="relative overflow-hidden group bg-white rounded-[2.5rem] p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
    <div className="relative z-10 flex justify-between items-start">
      <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10`}>
        <Icon className={`w-7 h-7 ${colorClass.replace('bg-', 'text-')}`} strokeWidth={2} />
      </div>
      {trend && (
        <span className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter">
          <ArrowUpRight size={12} className="ml-1" />
          {trend}
        </span>
      )}
    </div>
    <div className="relative z-10 mt-6">
      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-1">{title}</p>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h2>
      <p className="text-slate-400 text-xs mt-2 font-medium">{subtext}</p>
    </div>
    {/* تأثير خلفية خفيف */}
    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
  </div>
);

const ScientificDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDFEFF] p-8 space-y-10 font-sans" dir="rtl">
      
      {/* Header الاستراتيجي */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
            <Zap size={14} className="text-emerald-600 fill-emerald-600" />
            <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">منصة الربط الصناعي</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">
            مؤشرات التحول نحو <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">اقتصاد المعرفة</span>
          </h1>
          <p className="text-slate-500 leading-relaxed font-medium text-sm">
            نتابع هنا رحلة تحويل الاكتشافات البحثية إلى منتجات صناعية قابلة للاستثمار لتعزيز التنمية الصناعية العربية المستدامة.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-indigo-600 shadow-2xl shadow-indigo-200 transition-all flex items-center gap-3 group">
            <Database size={18} className="group-hover:rotate-12 transition-transform" />
            <span>قاعدة بيانات الابتكارات</span>
          </button>
        </div>
      </div>

      {/* Stats المنظومة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InnovationCard 
          title="مراكز البحث النشطة" 
          value="482" 
          subtext="جامعات ومراكز بحثية عربية"
          icon={Microscope} 
          trend="+5.2%" 
          colorClass="bg-indigo-600" 
        />
        <InnovationCard 
          title="حلول تقنية جاهزة" 
          value="1,290" 
          subtext="فرص لنقل التكنولوجيا"
          icon={Lightbulb} 
          trend="+18%" 
          colorClass="bg-amber-500" 
        />
        <InnovationCard 
          title="الشراكات الصناعية" 
          value="85" 
          subtext="اتفاقيات تعاون (R&D)"
          icon={ArrowLeftRight} 
          trend="+12%" 
          colorClass="bg-emerald-500" 
        />
        <InnovationCard 
          title="الاستثمار المعرفي" 
          value="$2.4B" 
          subtext="إجمالي قيمة الابتكارات"
          icon={Factory} 
          colorClass="bg-rose-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* التحليل البياني لنقل التكنولوجيا */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900">دورة حياة الابتكار</h3>
              <p className="text-slate-400 text-sm mt-1 font-medium">متابعة تحويل الأفكار إلى منتجات تجارية</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg text-indigo-600 text-[10px] font-bold">
                 <span className="w-2 h-2 rounded-full bg-indigo-600"></span> الأبحاث النشطة
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-slate-500 text-[10px] font-bold">
                 <span className="w-2 h-2 rounded-full bg-slate-300"></span> النماذج المكتملة
               </div>
            </div>
          </div>
          
          <div className="h-[400px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} dy={20} />
                <YAxis orientation="right" axisLine={false} tickLine={false} tick={{fill: '#cbd5e1', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '20px'}}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="active" 
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  fill="url(#mainGrad)" 
                />
                <Area 
                  type="stepAfter" 
                  dataKey="completed" 
                  stroke="#cbd5e1" 
                  strokeWidth={2} 
                  fill="transparent" 
                  strokeDasharray="10 10"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* بطاقة "الترابط" الذكية */}
        <div className="flex flex-col gap-6">
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <Network size={40} className="mb-6 opacity-80 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-black mb-2">تعزيز الترابط</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-8 opacity-80">
                أقمنا جسور تواصل بين 120 مصنعاً و30 مركز بحث علمي هذا الشهر.
              </p>
              <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm hover:shadow-xl transition-all">
                استعراض خارطة الشركاء
              </button>
            </div>
            {/* الدوائر التزيينية */}
            <div className="absolute top-[-20%] left-[-20%] w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex-1 relative overflow-hidden">
            <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-6">أعلى القطاعات تفاعلاً</h4>
            <div className="space-y-6 relative z-10">
              <IndustryProgress label="الصناعات الدوائية" percent={88} />
              <IndustryProgress label="الطاقة المتجددة" percent={74} />
              <IndustryProgress label="تكنولوجيا الغذاء" percent={61} />
              <IndustryProgress label="الذكاء الاصطناعي" percent={92} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IndustryProgress = ({ label, percent }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-bold">
      <span className="text-slate-300">{label}</span>
      <span className="text-white">{percent}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-amber-500 rounded-full transition-all duration-1000" 
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  </div>
);

export default ScientificDashboard;