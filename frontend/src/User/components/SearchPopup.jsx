import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, MapPin, ArrowLeft, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiAdmin from "../../api/apiAdmin";

const SearchContext = createContext(null);
export const useSearchPopup = () => useContext(SearchContext);

const fallbackCountries = [
  { id: 1, name: "المملكة الأردنية الهاشمية", code: "jo", flag: "https://flagcdn.com/w40/jo.png" },
  { id: 2, name: "دولة الإمارات العربية المتحدة", code: "ae", flag: "https://flagcdn.com/w40/ae.png" },
  { id: 3, name: "مملكة البحرين", code: "bh", flag: "https://flagcdn.com/w40/bh.png" },
  { id: 4, name: "الجمهورية التونسية", code: "tn", flag: "https://flagcdn.com/w40/tn.png" },
  { id: 5, name: "الجمهورية الجزائرية الديمقراطية الشعبية", code: "dz", flag: "https://flagcdn.com/w40/dz.png" },
  { id: 6, name: "جمهورية جيبوتي", code: "dj", flag: "https://flagcdn.com/w40/dj.png" },
  { id: 7, name: "المملكة العربية السعودية", code: "sa", flag: "https://flagcdn.com/w40/sa.png" },
  { id: 8, name: "جمهورية السودان", code: "sd", flag: "https://flagcdn.com/w40/sd.png" },
  { id: 9, name: "الجمهورية العربية السورية", code: "sy", flag: "https://flagcdn.com/w40/sy.png" },
  { id: 10, name: "جمهورية الصومال", code: "so", flag: "https://flagcdn.com/w40/so.png" },
  { id: 11, name: "جمهورية العراق", code: "iq", flag: "https://flagcdn.com/w40/iq.png" },
  { id: 12, name: "سلطنة عمان", code: "om", flag: "https://flagcdn.com/w40/om.png" },
  { id: 13, name: "دولة فلسطين", code: "ps", flag: "https://flagcdn.com/w40/ps.png" },
  { id: 14, name: "دولة قطر", code: "qa", flag: "https://flagcdn.com/w40/qa.png" },
  { id: 15, name: "دولة الكويت", code: "kw", flag: "https://flagcdn.com/w40/kw.png" },
  { id: 16, name: "الجمهورية اللبنانية", code: "lb", flag: "https://flagcdn.com/w40/lb.png" },
  { id: 17, name: "دولة ليبيا", code: "ly", flag: "https://flagcdn.com/w40/ly.png" },
  { id: 18, name: "جمهورية مصر العربية", code: "eg", flag: "https://flagcdn.com/w40/eg.png" },
  { id: 19, name: "المملكة المغربية", code: "ma", flag: "https://flagcdn.com/w40/ma.png" },
  { id: 20, name: "الجمهورية الإسلامية الموريتانية", code: "mr", flag: "https://flagcdn.com/w40/mr.png" },
  { id: 21, name: "الجمهورية اليمنية", code: "ye", flag: "https://flagcdn.com/w40/ye.png" },
];

export const SearchPopupProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState(fallbackCountries);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchBarRef = useRef(null);
  const searchDialogRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!isSearchOpen) return;
    const dialog = searchDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isSearchOpen]);

  useEffect(() => {
    let isMounted = true;

    apiAdmin.get("/pays")
      .then(({ data }) => {
        const records = Array.isArray(data?.data) ? data.data : data;
        if (!isMounted || !Array.isArray(records)) return;

        const allCountries = records.map((country) => {
          const fallback = fallbackCountries.find(
            (item) => String(item.id) === String(country.idPays)
          );

          return {
            id: country.idPays,
            name: country.nomPays,
            code: fallback?.code || String(country.idPays),
            flag: fallback?.flag || null,
          };
        });

        setCountries(allCountries);
      })
      .catch(() => {
        // La liste locale reste disponible si l'API est momentanément inaccessible.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({ category: "all" });
    const query = searchQuery.trim();
    if (query) params.set("q", query);
    if (currentSelectedCountryObj) {
      params.set("country", currentSelectedCountryObj.name);
      params.set("country_id", String(currentSelectedCountryObj.id));
    }

    setActiveDropdown(null);
    setIsSearchOpen(false);
    navigate(`/researchDatabase?${params.toString()}`);
  };

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const currentSelectedCountryObj = countries.find(c => c.code === selectedCountry);
  const orderedCountries = [...countries].sort(
    (countryA, countryB) => Number(countryA.id) - Number(countryB.id)
  );


  return (
    <SearchContext.Provider value={{ openSearch: () => setIsSearchOpen(true) }}>
      {children}
          <dialog
            ref={searchDialogRef}
            aria-labelledby="hero-search-title"
            onCancel={() => setIsSearchOpen(false)}
            onClose={() => { setIsSearchOpen(false); setActiveDropdown(null); }}
            onClick={(event) => { if (event.target === event.currentTarget) setIsSearchOpen(false); }}
            className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
            dir={isRtl ? "rtl" : "ltr"}
          >
          <div
            ref={searchBarRef}
            className="p-5 sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 id="hero-search-title" className="text-lg font-bold">{t("hero.search_btn")}</h2>
              <button type="button" onClick={() => setIsSearchOpen(false)} aria-label={isRtl ? "إغلاق" : "Close"} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"><X size={20} /></button>
            </div>
            <form onSubmit={handleSearch} className="relative flex w-full flex-col items-stretch gap-3">
              
              {/* Champ 1 : Input texte */}
              <div className="group/field flex min-h-[64px] flex-grow items-center gap-3 rounded-2xl border border-transparent bg-slate-50/90 px-4 py-2.5 transition-all hover:border-slate-200 hover:bg-white focus-within:border-emerald-400/50 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(52,211,153,0.1)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-focus-within/field:bg-emerald-500 group-focus-within/field:text-white">
                  <Search size={18} />
                </span>
                <div className="flex flex-col text-start w-full min-w-[120px]">
                  <span className="mb-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">{t("hero.search_label", "ابحث عن")}</span>
                  <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("hero.search_placeholder", "اسم المؤسسة...")}
                    className="w-full border-none bg-transparent p-0 text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                  />
                </div>
              </div>

              {/* Champ 2 : Pays */}
              <div className="relative md:min-w-[160px]">
                <div 
                  onClick={() => toggleDropdown('country')}
                  className={`group/country flex min-h-[64px] h-full cursor-pointer select-none items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all ${activeDropdown === 'country' ? 'border-emerald-400/50 bg-emerald-50/70 shadow-[0_0_0_4px_rgba(52,211,153,0.08)]' : 'border-transparent bg-slate-50/90 hover:border-slate-200 hover:bg-white'}`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors ${activeDropdown === 'country' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                    <MapPin size={18} />
                  </span>
                  <div className="flex flex-col text-start w-full">
                    <span className="mb-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">{t("hero.country_label", "الدولة")}</span>
                    
                    <div className="flex items-center gap-2 max-w-full">
                      {selectedCountry && currentSelectedCountryObj?.flag && (
                        <img src={currentSelectedCountryObj.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
                      )}
                      <span className="truncate text-sm font-bold text-slate-800">
                        {selectedCountry && currentSelectedCountryObj ? currentSelectedCountryObj.name : t("hero.select_country", "اختر الدولة")}
                      </span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: activeDropdown === 'country' ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeDropdown === 'country' && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="relative z-10 mt-2 grid max-h-[30vh] w-full grid-cols-1 gap-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2"
                    >
                      <li 
                        onClick={() => { setSelectedCountry(""); setActiveDropdown(null); }}
                        className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${!selectedCountry ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        <span>{t("hero.select_country_all", "كل الدول")}</span>
                        {!selectedCountry && <Check size={16} />}
                      </li>
                      {orderedCountries.map((country) => (
                        <li 
                          key={country.code}
                          onClick={() => { setSelectedCountry(country.code); setActiveDropdown(null); }}
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${selectedCountry === country.code ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          <div className="flex items-center gap-2">
                            {country.flag ? (
                              <img src={country.flag} alt="" className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0" />
                            ) : (
                              <MapPin size={14} className="shrink-0 text-slate-400" />
                            )}
                            <span className="truncate">{country.name}</span>
                          </div>
                          {selectedCountry === country.code && <Check size={16} />}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Bouton de soumission */}
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex min-h-[64px] shrink-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-emerald-600 to-teal-500 px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(5,150,105,0.3)] transition-all hover:from-emerald-500 hover:to-teal-400 hover:shadow-[0_15px_35px_rgba(5,150,105,0.4)]"
              >
                <span>{t("hero.search_btn", "بحث")}</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15">
                  {isRtl ? <ArrowLeft size={17} /> : <ArrowLeft size={17} className="rotate-180" />}
                </span>
              </motion.button>

            </form>
          </div>
          </dialog>
    </SearchContext.Provider>
  );
};
