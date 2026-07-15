// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Bell, User, LogOut, ChevronDown, Settings, ShieldCheck } from 'lucide-react';

// const AdminHeader = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [adminData, setAdminData] = useState({ prenom: "", nom: "", email: "" });

//   useEffect(() => {
//     // Récupération des données stockées lors du login
//     const prenom = localStorage.getItem('prenomUtilisateur');
//     const nom = localStorage.getItem('nomUtilisateur');
//     // Si tu stockes l'email au login, récupère-le, sinon garde une valeur par défaut
//     const email = localStorage.getItem('emailUtilisateur') || "admin@aidmo.org";

//     setAdminData({
//       prenom: prenom || "المدير", // Valeur de repli si vide
//       nom: nom || "",
//       email: email
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear(); // Nettoie tout d'un coup
//     window.location.href = '/login';
//   };

//   return (
//     <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-40 w-full border-b border-slate-100 px-10 py-4">
//       <div className="flex justify-between items-center max-w-[1600px] mx-auto">
        
//         {/* Barre de recherche Minimaliste */}
//         <div className="relative group flex-1 max-w-md">
//           <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 group-focus-within:text-amber-500 transition-colors">
//             <Search size={16} strokeWidth={1.5} />
//           </span>
//           <input 
//             className="block w-full pr-12 pl-4 py-2.5 bg-slate-50/50 border border-transparent rounded-full focus:bg-white focus:border-slate-200 focus:ring-8 focus:ring-slate-50 transition-all outline-none text-xs font-light tracking-wide" 
//             placeholder="ابحث عن تقارير، باحثين، أو مصانع..." 
//             type="search" 
//           />
//         </div>

//         {/* Actions à droite */}
//         <div className="flex items-center gap-8">
          
//           {/* Notifications avec style Dot Minimal */}
//           <div className="relative p-2 text-slate-400 hover:text-slate-900 transition-all cursor-pointer group">
//             <Bell size={20} strokeWidth={1.2} />
//             <span className="absolute top-2 right-2.5 bg-amber-500 w-1.5 h-1.5 rounded-full border-2 border-white group-hover:scale-150 transition-transform"></span>
//           </div>

//           {/* Profil Section */}
//           <div className="relative">
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="flex items-center gap-4 group transition-all"
//             >
//               <div className="text-right hidden sm:block">
//                 <p className="text-[13px] font-black text-slate-900 tracking-tight leading-none uppercase">أحمد المدير</p>
//                 <div className="flex items-center justify-end gap-1 mt-1.5">
//                    <span className="text-[9px] text-amber-600 font-mono tracking-widest uppercase">Root Admin</span>
//                    <ShieldCheck size={10} className="text-amber-600" />
//                 </div>
//               </div>
              
//               <div className="relative">
//                 <div className={`h-11 w-11 rounded-2xl rotate-3 group-hover:rotate-0 bg-slate-900 transition-all duration-500 flex items-center justify-center text-white text-xs font-black shadow-2xl shadow-slate-200 overflow-hidden`}>
//                   <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent" />
//                   AD
//                 </div>
//               </div>
              
//               <ChevronDown size={14} className={`text-slate-300 transition-transform duration-500 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
//             </button>

//             {/* Menu Déroulant (Dropdown) avec Framer Motion */}
//             <AnimatePresence>
//             {isOpen && (
//               <>
//                 <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
//                 <div className="absolute left-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-left">
//                   <div className="px-4 py-2 border-b border-gray-50 mb-1">
//                     <p className="text-xs text-gray-400">مرحباً بك</p>
//                     <p className="text-sm font-bold text-slate-800">{adminData.email}</p>
//                   </div>

//                   <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
//                     <User size={18} />
//                     <span>الملف الشخصي</span>
//                   </button>

//                   <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
//                     <Settings size={18} />
//                     <span>الإعدادات</span>
//                   </button>

//                   <div className="h-px bg-gray-50 my-1"></div>

//                   <button 
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
//                   >
//                     <LogOut size={18} />
//                     <span>تسجيل الخروج</span>
//                   </button>
//                 </div>
//               </>
//             )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Sub-component for clean code
// const HeaderAction = ({ Icon, label, color }) => (
//   <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold text-slate-600 transition-all duration-300 ${color}`}>
//     <div className="flex items-center gap-3">
//       <Icon size={16} strokeWidth={1.5} />
//       <span>{label}</span>
//     </div>
//   </button>
// );

// export default AdminHeader;










import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  UserCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const adminMenuItems = [
  { ar: 'الرئيسية', en: 'Dashboard', path: '/admin/dashboard' },
  { ar: 'إدارة المستخدمين', en: 'User management', path: '/admin/users' },
  { ar: 'الباحثون والمبتكرون', en: 'Researchers and innovators', path: '/admin/researchers' },
  { ar: 'مراكز البحث العلمي والإبتكار والذكاء الصناعي', en: 'Scientific Research, Innovation and AI Centers', path: '/admin/research-database/research-innovation-ai' },
  { ar: 'الجامعات والمؤسسات الأكاديمية والعلمية', en: 'Universities and academic institutions', path: '/admin/research-database/universities' },
  { ar: 'الحاضنات والأقطاب التكنولوجية والمختبرات', en: 'Incubators, technology poles and laboratories', path: '/admin/research-database/incubators-technology-labs' },
  { ar: 'البرامج والمبادرات والاستراتيجيات', en: 'Programs, initiatives and strategies', path: '/admin/research-database/programs-initiatives-strategies' },
  { ar: 'مكاتب الملكية الصناعية وبراءات الإختراع', en: 'Industrial property and patent offices', path: '/admin/research-database/industrial-property-patents' },
  { ar: 'قاعدة الخبراء والمختصين', en: 'Experts and specialists', path: '/admin/research-database/experts-specialists' },
  { ar: 'دليل الشركات الصناعية', en: 'Industrial companies directory', path: '/admin/companies' },
  { ar: 'طلبات انضمام الشركات', en: 'Company applications', path: '/admin/companies/requests' },
  { ar: 'عروض التعاون', en: 'Collaboration offers', path: '/admin/offers' },
  { ar: 'الأسئلة الشائعة', en: 'FAQ', path: '/admin/faq' },
  { ar: 'أخبار المركز الإعلامي', en: 'Media center news', path: '/admin/media-center/news' },
  { ar: 'فعاليات المركز الإعلامي', en: 'Media center events', path: '/admin/media-center/events' },
  { ar: 'إصدارات المركز الإعلامي', en: 'Media center releases', path: '/admin/media-center/releases' },
  { ar: 'مسابقات وجوائز', en: 'Competitions and awards', path: '/admin/media-center/competitions' },
  { ar: 'قصص نجاح', en: 'Success stories', path: '/admin/media-center/stories' },
  { ar: 'الملف الشخصي', en: 'Profile', path: '/profile' },
];

const AdminHeader = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminData, setAdminData] = useState({ prenom: "", nom: "", email: "" });
  const [menuSearch, setMenuSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredMenuItems = menuSearch.trim()
    ? adminMenuItems.filter((item) => `${item.ar} ${item.en}`.toLocaleLowerCase().includes(menuSearch.trim().toLocaleLowerCase()))
    : [];

  const goToMenu = (item) => {
    setMenuSearch("");
    setSearchFocused(false);
    navigate(item.path);
  };

  // تأثير عند التمرير لتغيير شفافية الخلفية
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const prenom = localStorage.getItem('prenomUtilisateur') || "المدير";
    const nom = localStorage.getItem('nomUtilisateur') || "";
    const email = localStorage.getItem('emailUtilisateur') || "admin@aidmo.org";

    setAdminData({ prenom, nom, email });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 px-8 py-3 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* 1. نظام البحث المتطور */}
        <form
          className="relative group w-52 sm:w-64"
          onSubmit={(event) => {
            event.preventDefault();
            if (filteredMenuItems[0]) goToMenu(filteredMenuItems[0]);
          }}
        >
          <div className="absolute inset-y-0 left-1.5 pr-3 flex items-center pointer-events-none">
            <Search size={15} className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <input 
            type="text" 
            value={menuSearch}
            onChange={(event) => setMenuSearch(event.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
            placeholder={i18n.language === 'ar' ? 'ابحث في قائمة الإدارة...' : 'Search admin menu...'}
            className="w-full bg-slate-100/50 border-none rounded-xl pr-4 pl-9 py-2 text-[11px] font-medium focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all outline-none"
          />
          {searchFocused && menuSearch.trim() && (
            <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
              {filteredMenuItems.length > 0 ? filteredMenuItems.map((item) => (
                <button
                  type="button"
                  key={item.path}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    goToMenu(item);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-start text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Search size={15} className="shrink-0 text-emerald-600" />
                  <span>{i18n.language === 'ar' ? item.ar : item.en}</span>
                </button>
              )) : (
                <p className="px-4 py-5 text-center text-sm font-bold text-slate-400">
                  {i18n.language === 'ar' ? 'لا توجد صفحة بهذا الاسم' : 'No matching menu item'}
                </p>
              )}
            </div>
          )}
        </form>

        {/* 2. منطقة الملف الشخصي */}
        <div className="flex items-center gap-4">
          
          {/* قائمة المستخدم */}
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-emerald-600 transition-all border border-transparent hover:border-slate-200"
            >
              <div className="text-right flex flex-col justify-center">
                <span className="text-[12px] font-black text-emerald-600 leading-none">
                  {adminData.prenom} {adminData.nom}
                </span>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  <span className="text-[9px] font-bold text-slate-900 uppercase tracking-tighter">المشرف الرئيسي</span>
                </div>
              </div>

              {/* الصورة الرمزية بتصميم هندسي */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-500 font-black shadow-lg overflow-hidden ring-2 ring-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                  {adminData.prenom[0]}{adminData.nom[0] || 'A'}
                </div>
                <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* القائمة المنسدلة الاحترافية */}
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} 
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute left-0 mt-4 w-64 bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 z-20 origin-top-left"
                  >
                    {/* ترويسة القائمة */}
                    <div className="p-4 bg-slate-50 rounded-[18px] mb-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">البريد الإلكتروني</p>
                       <p className="text-xs font-bold text-slate-800 truncate">{adminData.email}</p>
                    </div>

                    <div className="space-y-1">
                      <MenuButton Icon={UserCircle} label="الملف الشخصي" to="/profile" />
                    </div>

                    <div className="h-px bg-slate-100 my-2 mx-2" />

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-black">تسجيل الخروج</span>
                      </div>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

// مكون زر القائمة الفرعي لسهولة التعديل
const MenuButton = ({ Icon, label, tag, to }) => {
  const Component = to ? Link : 'button';

  return (
  <Component {...(to ? { to } : { type: 'button' })} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all group">
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
      <span className="text-sm font-bold">{label}</span>
    </div>
    {tag && (
      <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
        {tag}
      </span>
    )}
  </Component>
  );
};

export default AdminHeader;
