// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { 
//   ChevronDown, Search, Home, Menu as MenuIcon, X, 
//   Zap, Database, MessageSquare, LogIn, LogOut, User , Newspaper, Layers 
// } from "lucide-react";
// import { Link } from "react-router-dom";

// import aidsmoLogo from '../assets/images/logos/aidsmo_logo.png';
// import logo from '../assets/images/logos/logo.png';

// const SubLinkCard = ({ label, href }) => {
//   const { t } = useTranslation();
//   return (
//     <a
//       href={href}
//       className="group flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
//     >
//       <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
//         <Zap size={12} />
//       </div>
//       <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
//         {t(label)}
//       </span>
//     </a>
//   );
// };

// const MegaMenu = ({ label, icon: Icon, children, width = "w-[550px]" }) => {
//   const { t } = useTranslation();
//   return (
//     <div className="relative group">
//       <button className="flex items-center gap-1.5 px-3 py-2 text-[14px] font-semibold text-slate-700 hover:text-emerald-600 transition-all">
//         <span>{t(`menu.${label}`)}</span>
//         <Icon size={14} className="opacity-50" />
//         <ChevronDown size={10} className="opacity-30 group-hover:rotate-180 transition-transform" />
//       </button>
//       <div className={`absolute top-full ltr:left-0 rtl:right-0 ${width} opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-50`}>
//         <div className="bg-white shadow-xl rounded-xl border border-slate-100 p-4 grid grid-cols-2 gap-1 mt-1">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// const UserHeader = () => {
//   const { t, i18n } = useTranslation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState({ prenom: "", nom: "" });

//   useEffect(() => {
//     const checkAuth = () => {
//       const role = localStorage.getItem('role');
//       const prenom = localStorage.getItem('prenomUtilisateur');
//       const nom = localStorage.getItem('nomUtilisateur');
//       setIsLoggedIn(!!role);
//       setUserData({ prenom: prenom || "", nom: nom || "" });
//     };

//     checkAuth();
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     window.location.href = '/login'; 
//   };

//   const switchLang = (lng) => {
//     i18n.changeLanguage(lng);
//     document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
//   };

//   return (
//     <header className="fixed top-0 w-full z-50 flex flex-col items-center">
      
//       {/* 1. TOP HEADER - Plus mince (h-14 au lieu de h-20) */}
//       <div className="w-full bg-white border-b border-slate-100 px-6 flex justify-between items-center h-14">
//         <div className="flex-shrink-0">
//           <img src={logo} alt="Logo Left" className="h-38 w-auto object-contain" />
//         </div>
        
//         <div className="flex items-center gap-4">
//           <div className="hidden md:flex items-center bg-slate-50 border border-emerald-600 rounded-md px-2 py-1 focus-within:bg-white transition-all">
//             <input type="text" placeholder={t('search')} className="placeholder:text-slate-800 bg-transparent border-none text-[14px] ml-2 outline-none w-80 focus:w-48 transition-all" />
//             <Search size={12} className="text-emerald-600" />
//           </div>
//         </div>

//         <div className="flex items-center gap-4 flex-shrink-0">
//           <div className="flex bg-emerald-200 p-0.5 rounded border border-emerald-200/50">
//             {['ar', 'en'].map(lng => (
//               <button 
//                 key={lng} 
//                 onClick={() => switchLang(lng)} 
//                 className={`px-2 py-0.5 text-[14px] font-bold rounded transition-all ${
//                   i18n.language === lng ? "bg-white text-emerald-600 shadow-xs" : "text-slate-800"
//                 }`}
//               >
//                 {lng.toUpperCase()}
//               </button>
//             ))}
//           </div>
//           <img src={aidsmoLogo} alt="Logo Right" className="h-12 w-auto object-contain" />
//         </div>
//       </div>

//       {/* 2. MAIN HEADER - Plus compact et flottement réduit */}
//       <div className={`w-full flex justify-center transition-all duration-300 ${isScrolled ? "py-1" : "py-2"}`}>
//         <nav className={`flex items-center gap-1 px-4 py-1 rounded-full border transition-all duration-300 ${
//           isScrolled 
//           ? "bg-white shadow-md border-slate-200 scale-95" 
//           : "bg-white/90 backdrop-blur-md border-white/50 shadow-sm"
//         }`}>
          
//           <div className="flex items-center">
//             <Link to="/" className="px-3 py-1 text-emerald-600">
//               <Home size={18} />
//             </Link>
            
//             <Link to="/about" className="px-3 py-1 text-[14px] font-bold text-slate-700 hover:text-emerald-600 transition-colors">
//               {t("menu.about")}
//             </Link>

//             <MegaMenu label="services" icon={Layers}>
//               <Link to="/linkingresearcherscompanies"><SubLinkCard label="submenu.services.linking_researchers_industrial_companies" /></Link>
//               <Link to="/researchDatabase"><SubLinkCard label="submenu.services.database_research_technologies_available_industrial_application" /></Link>
//               <Link to="/workshopsseminars"><SubLinkCard label="submenu.services.joint_workshops_seminars" /></Link>
//               <SubLinkCard label="submenu.services.supporting_marketing_investment_scientific_research_outputs" href="/services/marketing" />
//               <SubLinkCard label="submenu.services.technical_details_how_use_services" href="/services/how-to" />
//               <SubLinkCard label="submenu.services.subscription_prices_terms" href="/services/pricing" />
//             </MegaMenu>

//             <MegaMenu label="database" icon={Database} width="w-[600px]">
//               <div className="space-y-0.5">
//                 <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-1 border-l-2 border-emerald-500 rtl:border-r-2 rtl:border-l-0">
//                   {t('submenu.database.scientific_research_database')}
//                 </h3>
//                 <SubLinkCard label="sub_submenu.scientific_research_database.advanced_search_engine" href="/database/research/search" />
//                 <SubLinkCard label="sub_submenu.scientific_research_database.classifying_research_industry_field" href="/database/research/fields" />
//               </div>
//               <div className="space-y-0.5 ltr:border-l rtl:border-r border-slate-100 px-3">
//                 <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 mb-1 border-l-2 border-emerald-500 rtl:border-r-2 rtl:border-l-0">
//                   {t('submenu.database.industry_database')}
//                 </h3>
//                 <SubLinkCard label="sub_submenu.industry_database.participating_companies_industrial_institutions" href="/database/industry/companies" />
//                 <SubLinkCard label="sub_submenu.industry_database.industry_needs_research_technological_solutions" href="/database/industry/needs" />
//               </div>
//             </MegaMenu>

//             <MegaMenu label="news" icon={Newspaper} width="w-[450px]">
//               <SubLinkCard label="submenu.news.regular_updates_workshops" href="/news/updates" />
//               <SubLinkCard label="submenu.news.articles_analyses" href="/news/articles" />
//             </MegaMenu>

//             <MegaMenu label="communication_cooperation" icon={MessageSquare} width="w-[380px]">
//                <SubLinkCard label="submenu.communication_cooperation.direct_communication_between_researchers_manufacturers" href="/cooperation/direct" />
//                <SubLinkCard label="submenu.communication_cooperation.joint_work_teams" href="/cooperation/teams" />
//             </MegaMenu>
//           </div>

//           {/* <div className="flex items-center gap-2 ml-1 ltr:border-l rtl:border-r rtl:mr-1 border-slate-200 pl-3 rtl:pr-3">
//             {isLoggedIn ? (
//               <div className="relative group">
//                 <button className="flex items-center gap-2 p-0.5 ltr:pr-3 rtl:pl-3 rounded-full bg-emerald-50 border border-emerald-100">
//                   <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
//                     {userData.prenom.charAt(0)}{userData.nom.charAt(0)}
//                   </div>
//                   <p className="hidden sm:block text-[11px] font-bold text-emerald-900 capitalize">
//                     {userData.prenom}
//                   </p>
//                   <ChevronDown size={12} className="text-emerald-700/40" />
//                 </button>
                
//               </div>
//             ) : (
//               <Link to="/login" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-[12px] font-bold hover:bg-emerald-800 transition-all shadow-md">
//                 <User size={14} />
//                 <span>{t("menu.login")}</span>
//               </Link>
//             )}
//           </div> */}

//           <div className="flex items-center gap-2 ml-1 ltr:border-l rtl:border-r rtl:mr-1 border-slate-200 pl-3 rtl:pr-3">
//             {isLoggedIn ? (
//               <div className="relative group">
//                 {/* Bouton Utilisateur */}
//                 <button className="flex items-center gap-2 p-0.5 ltr:pr-3 rtl:pl-3 rounded-full bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors">
//                   <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
//                     {userData.prenom.charAt(0)}{userData.nom.charAt(0)}
//                   </div>
//                   <p className="hidden sm:block text-[11px] font-bold text-emerald-900 capitalize">
//                     {userData.prenom}
//                   </p>
//                   <ChevronDown size={12} className="text-emerald-700/40 group-hover:rotate-180 transition-transform" />
//                 </button>

//                 {/* Menu Dropdown */}
//                 <div className="absolute right-0 rtl:left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                   <div className="py-2">
//                     {/* Option Profil */}
//                     <Link
//                       to="/profile"
//                       className="flex items-center gap-2 px-4 py-2 text-[13px] text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
//                     >
//                       <User size={16} />
//                       {t("menu.profile") || "Mon Profil"}
//                     </Link>

//                     {/* Séparateur */}
//                     <div className="h-px bg-slate-100 my-1 mx-2"></div>

//                     {/* Option Déconnexion */}
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-2 px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
//                     >
//                       <LogOut size={16} />
//                       {t("menu.logout") || "Déconnexion"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <Link 
//                 to="/login" 
//                 className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-[12px] font-bold hover:bg-emerald-800 transition-all shadow-md"
//               >
//                 <User size={14} />
//                 <span>{t("menu.login")}</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default UserHeader;










import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  ChevronDown, Search, Home, Menu as MenuIcon, X, 
  Zap, Database, MessageSquare, LogIn, LogOut, User, Newspaper, Layers 
} from "lucide-react";
import { Link } from "react-router-dom";

import aidsmoLogo from '../assets/images/logos/aidsmo_logo.png';
import logo from '../assets/images/logos/logo.png';

const SubLinkCard = ({ label, href }) => {
  const { t } = useTranslation();
  return (
    <a
      href={href}
      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200"
    >
      {/* <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
        <Zap size={13} />
      </div> */}
      <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
        {t(label)}
      </span>
    </a>
  );
};

const MegaMenu = ({ label, children, width = "w-[550px]" }) => {
  const { t } = useTranslation();
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-2 text-[14px] font-semibold text-slate-700 hover:text-emerald-600 transition-all duration-200">
        <span>{t(`menu.${label}`)}</span>
        <ChevronDown size={11} className="opacity-40 group-hover:rotate-180 transition-transform duration-300" />
      </button>
      <div className={`absolute top-full ltr:left-0 rtl:right-0 ${width} opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 pt-2`}>
        <div className="bg-white shadow-xl rounded-2xl border border-slate-100 p-4 grid grid-cols-2 gap-1.5">
          {children}
        </div>
      </div>
    </div>
  );
};

const NavDropdownNews = ({ label, children }) => {
  const { t } = useTranslation();
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-2 text-[14px] font-semibold text-slate-700 hover:text-emerald-600 transition-all duration-200">
        <span>{t(`menu.${label}`)}</span>
        <ChevronDown size={11} className="opacity-40 group-hover:rotate-180 transition-transform duration-300" />
      </button>
      <div className="absolute top-full ltr:left-0 rtl:right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
        <div className="w-[220px] bg-white rounded-2xl p-2 shadow-xl border border-slate-100 flex flex-col gap-0.5">
          {children}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ label }) => {
  const { t } = useTranslation();
  return (
    <div className="group flex items-center w-full p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200">
      <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
        {t(label)}
      </span>
    </div>
  );
};

const UserHeader = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ prenom: "", nom: "" });

  useEffect(() => {
    const checkAuth = () => {
      const role = localStorage.getItem('role');
      const prenom = localStorage.getItem('prenomUtilisateur');
      const nom = localStorage.getItem('nomUtilisateur');
      setIsLoggedIn(!!role);
      setUserData({ prenom: prenom || "", nom: nom || "" });
    };

    checkAuth();
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = '/login'; 
  };

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col items-center shadow-sm">
      
      {/* 1. TOP HEADER */}
      <div className="w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/70 px-6 flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo Left" className="h-12 w-auto object-contain" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 focus-within:border-emerald-500 rounded-full px-3 py-1.5 transition-all duration-200">
            <input 
              type="text" 
              placeholder={t('search')} 
              className="bg-transparent border-none text-[13px] outline-none w-64 focus:w-72 transition-all duration-300 px-1 text-slate-700 placeholder:text-slate-400" 
            />
            <Search size={14} className="text-slate-400 group-focus-within:text-emerald-600" />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            {['ar', 'en'].map(lng => (
              <button 
                key={lng} 
                onClick={() => switchLang(lng)} 
                className={`px-3 py-1 text-[12px] font-bold rounded-lg transition-all duration-200 ${
                  i18n.language === lng ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
          <img src={aidsmoLogo} alt="Logo Right" className="h-10 w-auto object-contain" />
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className={`w-full flex justify-center transition-all duration-300 ${isScrolled ? "py-1.5" : "py-3"}`}>
        <nav className={`flex items-center gap-1 px-4 py-1.5 rounded-full border transition-all duration-300 ${
          isScrolled 
          ? "bg-white shadow-lg border-slate-200/80 scale-95" 
          : "bg-white/95 backdrop-blur-md border-slate-100 shadow-md"
        }`}>
          
          <div className="flex items-center gap-0.5">
            <Link to="/" className="p-2 text-slate-500 hover:text-emerald-600 rounded-full hover:bg-slate-50 transition-colors">
              <Home size={16} />
            </Link>
            
            <Link to="/about" className="px-3 py-2 text-[14px] font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              {t("menu.about")}
            </Link>

            <MegaMenu label="services">
              <Link to="/linkingresearcherscompanies"><SubLinkCard label="submenu.services.linking_researchers_industrial_companies" /></Link>
              <Link to="/researchDatabase"><SubLinkCard label="submenu.services.database_research_technologies_available_industrial_application" /></Link>
              <Link to="/workshopsseminars"><SubLinkCard label="submenu.services.joint_workshops_seminars" /></Link>
              <SubLinkCard label="submenu.services.supporting_marketing_investment_scientific_research_outputs" href="/services/marketing" />
              <SubLinkCard label="submenu.services.technical_details_how_use_services" href="/services/how-to" />
              <SubLinkCard label="submenu.services.subscription_prices_terms" href="/services/pricing" />
            </MegaMenu>

            <MegaMenu label="database">
              <Link to="/scientificResearchInnovationCenters"><SubLinkCard label="submenu.database.scientific_research_innovation_centers" /></Link>
              <Link to="/centersExcellenceAI"><SubLinkCard label="submenu.database.centers_excellence_artificial_intelligence" /></Link>
              <Link to="/ministriesHigherEducationScientificResearch"><SubLinkCard label="submenu.database.ministries_higher_education_scientific_research" /></Link>
              <Link to="/industrialPropertyPatentOffices"><SubLinkCard label="submenu.database.industrial_property_patent_offices" /></Link>
              <Link to="/supportingBodiesScientificResearch"><SubLinkCard label="submenu.database.supporting_bodies_scientific_research" /></Link>
            </MegaMenu>

            <Link to="/mediaCenter" className="px-3 py-2 text-[14px] font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              {t("menu.media_center")}
            </Link>

            <Link to="/contact" className="px-3 py-2 text-[14px] font-semibold text-slate-700 hover:text-emerald-600 transition-colors">
              {t("menu.contact")}
            </Link>
          </div>

          {/* SÉPARATEUR DE COMPTE */}
          <div className="flex items-center gap-2 ltr:ml-1 ltr:border-l rtl:mr-1 rtl:border-r border-slate-200 ltr:pl-3 rtl:pr-3">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-0.5 ltr:pr-3 rtl:pl-3 rounded-full bg-emerald-50 border border-emerald-100/70 hover:bg-emerald-100/50 transition-colors duration-200">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0 shadow-sm">
                    {userData.prenom.charAt(0).toUpperCase()}{userData.nom.charAt(0).toUpperCase()}
                  </div>
                  <p className="hidden sm:block text-[12px] font-bold text-emerald-900 capitalize">
                    {userData.prenom}
                  </p>
                  <ChevronDown size={11} className="text-emerald-700/50 group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* MENU USER DROPDOWN */}
                <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 p-1.5">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-700 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <User size={15} />
                    {t("menu.profile") || "Mon Profil"}
                  </Link>

                  <div className="h-px bg-slate-100 my-1 mx-1.5"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    {t("menu.logout") || "Déconnexion"}
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-[13px] font-bold hover:bg-emerald-800 transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                <User size={13} />
                <span>{t("menu.login")}</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;















