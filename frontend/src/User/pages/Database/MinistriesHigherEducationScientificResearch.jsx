import React, { useEffect, useState } from "react";
import apiAdmin from "../../../api/apiAdmin";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, ExternalLink, ChevronLeft, ChevronRight, X, Check, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

const MinistriesHigherEducationScientificResearch = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // États principaux
  const [centers, setCenters] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres & Pagination
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // État de la boîte modale des pays
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);

  // Changement à 6 ou 9 pour correspondre parfaitement à des lignes de 3 éléments
  const perPage = 6; 

  const countryFlags = {
    "المملكة الأردنية الهاشمية": "jo",
    "مملكة البحرين": "bh",
    "الجمهورية الجزائرية الديمقراطية الشعبية": "dz",
    "المملكة العربية السعودية": "sa",
    "جمهورية السودان": "sd",
    "الجمهورية التونسية": "tn",
    "دولة الامارات العربية المتحدة": "ae",
    "دولة الإمارات العربية المتحدة": "ae",
    "جمهورية جيبوتي": "dj",
    "الجمهورية العربية السورية": "sy",
    "جمهورية الصومال": "so",
    "جمهورية العراق": "iq",
    "جمهورية مصر العربية": "eg",
    "المملكة المغربية": "ma",
    "دولة قطر": "qa",
    "دولة الكويت": "kw",
    "سلطنة عمان": "om",
    "سلطنة عُمان": "om",
    "الجمهورية اللبنانية": "lb",
    "دولة فلسطين": "ps",
    "الجمهورية اليمنية": "ye",
    "دولة ليبيا": "ly",
    "الجمهورية الإسلامية الموريتانية": "mr",
  };

  const getFlagUrlByName = (countryName) => {
    if (!countryName) return null;
    const code = countryFlags[countryName.trim()];
    return code ? `https://flagcdn.com/w40/${code.toLowerCase()}.png` : null;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const resPays = await apiAdmin.get("/pays");
        setCountries(resPays.data || []);
      } catch (err) {
        console.error("Erreur chargement pays:", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setLoading(true);
        const response = await apiAdmin.get(
          `/ministriesHigherEducationScientificResearch?page=${page}&per_page=${perPage}`
        );
        setCenters(response.data.data || []);
        setTotalPages(response.data.last_page || 1);
      } catch (err) {
        console.error("Erreur chargement centres:", err);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchCenters();
  }, [page]);

  const filteredCenters = centers.filter((c) => {
    const matchSearch =
      !search ||
      c.titre_ar?.toLowerCase().includes(search.toLowerCase()) ||
      c.titre_en?.toLowerCase().includes(search.toLowerCase());

    const matchCountry =
      !selectedCountry || c.idPays === parseInt(selectedCountry);

    return matchSearch && matchCountry;
  });

  const currentCountryObj = countries.find(c => c.idPays === parseInt(selectedCountry));

  const modalFlagUrl = selectedCenter ? getFlagUrlByName(selectedCenter.pays?.nomPays || selectedCenter.nomPays) : null;

  // Skeleton adapté pour le format Grille / Colonne
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 flex flex-col gap-4 animate-pulse">
      <div className="w-full h-48 bg-slate-100 rounded-2xl" />
      <div className="h-4 bg-slate-100 rounded-full w-20" />
      <div className="h-6 bg-slate-100 rounded-xl w-5/6" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-lg" />
        <div className="h-3 bg-slate-100 rounded-lg w-2/3" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased" dir={isAr ? "rtl" : "ltr"}>
      
      {/* HERO BANNER */}
      <div className="relative bg-emerald-600 text-white overflow-hidden pt-24 pb-28 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#047857,transparent_50%)] opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-start">
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {isAr ? "وزارات التعليم العالي والبحث العلمي" : "Ministries of Higher Education and Scientific Research"}
          </motion.h1>
          <p className="mt-4 text-slate-100 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            {isAr ? "اكتشف مؤسسات التعليم العالي والبحث العلمي" : "Explore leading research and innovation institutions worldwide."}
          </p>
        </div>
      </div>

      {/* RECHERCHE & FILTRE PAYS */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/60 rounded-3xl p-4 border border-slate-100 flex flex-col md:flex-row gap-3 items-stretch">
          <div className="flex-1 relative">
            <Search className={`absolute ${isAr ? 'right-4' : 'left-4'} top-4 h-5 w-5 text-slate-400`} />
            <input
              className={`w-full ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-2xl bg-slate-50/50 border border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-sm font-medium`}
              placeholder={isAr ? "ابحث عن اسم المركز أو الكلمات المفتاحية..." : "Search centers by name..."}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-72 px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 rounded-2xl border border-slate-100/50 transition-all text-sm font-semibold text-slate-700 flex items-center justify-between shadow-sm group"
          >
            <div className="flex items-center gap-3">
              {currentCountryObj && getFlagUrlByName(currentCountryObj.nomPays) ? (
                <img src={getFlagUrlByName(currentCountryObj.nomPays)} alt="" className="w-6 h-4 object-cover rounded-sm border border-white" />
              ) : (
                <Globe size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
              )}
              <span className="truncate">{currentCountryObj ? currentCountryObj.nomPays : (isAr ? "اختر الدولة" : "Filter by Country")}</span>
            </div>
            <SlidersHorizontal size={16} className="text-slate-400 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* BOÎTE MODALE DES PAYS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }} className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-slate-100">
              <div className="p-5 flex items-center justify-between border-b border-slate-50 bg-slate-50/50">
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition"><X size={18} /></button>
                <h3 className="text-base font-bold text-slate-800">{isAr ? "اختر الدولة" : "Select Country"}</h3>
              </div>
              <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
                <button
                  onClick={() => { setSelectedCountry(""); setPage(1); setIsModalOpen(false); }}
                  className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all ${selectedCountry === "" ? "bg-emerald-50 text-emerald-950 font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🌍</span>
                    <span className="text-sm font-semibold">{isAr ? "جميع البلدان" : "All Countries"}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedCountry === "" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 bg-white"}`}>
                    {selectedCountry === "" && <Check size={11} strokeWidth={3} />}
                  </div>
                </button>

                {countries.map((c) => {
                  const isSelected = String(selectedCountry) === String(c.idPays);
                  const flagUrl = getFlagUrlByName(c.nomPays);
                  return (
                    <button
                      key={c.idPays}
                      onClick={() => { setSelectedCountry(c.idPays); setPage(1); setIsModalOpen(false); }}
                      className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all ${isSelected ? "bg-emerald-50 text-emerald-950 font-bold" : "hover:bg-slate-50 text-slate-700"}`}
                    >
                      <div className="flex items-center gap-3">
                        {flagUrl ? <img src={flagUrl} alt="" className="w-6 h-4 object-cover rounded-sm border border-slate-100" /> : <div className="w-6 h-4 bg-slate-100 rounded-sm flex items-center justify-center text-xs">🏳</div>}
                        <span className="text-sm font-semibold">{c.nomPays}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white"}`}>
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ZONE DE GRILLE À 3 COLONNES (`lg:grid-cols-3`) */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : filteredCenters.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200 shadow-xs">
              <span className="text-4xl">🔍</span>
              <h3 className="text-base font-bold text-slate-700 mt-4">{isAr ? "لا توجد نتائج مطابقة" : "No matching centers found"}</h3>
            </div>
          ) : (
            filteredCenters.map((center, index) => {
              const cardFlagUrl = getFlagUrlByName(center.pays?.nomPays || center.nomPays);
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={center.idCenter || index}
                  onClick={() => setSelectedCenter(center)}
                  className="group cursor-pointer bg-white rounded-[24px] border border-slate-100/80 shadow-xs hover:shadow-xl hover:shadow-slate-200/30 hover:border-transparent transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Image Box */}
                    <div className="w-full h-48 bg-gray-50/80 rounded-2xl flex items-center justify-center p-6 shrink-0 border border-gray-100 group-hover:bg-white transition-all duration-500 relative overflow-hidden">
                      <img
                        src={center.photo_url || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600"}
                        alt=""
                        className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-700 z-10"
                      />
                      {/* Badge pays en overlay absolu sur l'image */}
                      <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} flex items-center gap-1.5 z-10 text-[11px] font-bold text-slate-800 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/20`}>
                        {cardFlagUrl ? (
                          <img src={cardFlagUrl} alt="" className="w-3.5 h-2.5 object-cover rounded-xs" />
                        ) : (
                          <Globe size={11} className="text-emerald-600" />
                        )}
                        <span>{center.pays?.nomPays || "Global"}</span>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-5 space-y-2.5">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {isAr ? center.titre_ar : center.titre_en}
                      </h2>
                      {/* <p className="text-slate-500 text-sm font-normal leading-relaxed line-clamp-3">
                        {isAr ? center.description_ar : center.description_en}
                      </p> */}
                    </div>
                  </div>

                  {/* Bouton d'action en bas de carte */}
                  <div className="p-5 pt-0 border-t border-slate-50/50 mt-auto flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedCenter(center)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/40 hover:bg-emerald-50 w-full justify-center py-2.5 rounded-xl transition-all"
                    >
                      <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedCenter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCenter(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isAr ? "تفاصيل المركز" : "Center Details"}
                  </h3>

                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCenter(null)}
                  className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-4">
                    <div className="rounded-[28px] overflow-hidden bg-slate-100">
                      <img
                        src={selectedCenter.photo_url || selectedCenter.photo || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600"}
                        alt={isAr ? selectedCenter.titre_ar : selectedCenter.titre_en}
                        className="h-64 w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm uppercase tracking-[0.24em] text-slate-400">
                          {isAr ? "العنوان" : "Title"}
                        </h4>
                        <p className="mt-2 text-xl font-semibold text-slate-900">
                          {isAr ? (selectedCenter.titre_ar || selectedCenter.titre_en) : (selectedCenter.titre_en || selectedCenter.titre_ar)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm uppercase tracking-[0.24em] text-slate-400">
                          {isAr ? "الوصف" : "Description"}
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {isAr ? (selectedCenter.description_ar || selectedCenter.description_en) : (selectedCenter.description_en || selectedCenter.description_ar)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 rounded-[32px] border border-slate-100 bg-slate-50 p-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {modalFlagUrl ? (
                          <img src={modalFlagUrl} alt="flag" className="w-6 h-4 object-cover rounded-sm border" />
                        ) : (
                          <Globe size={14} className="text-slate-400" />
                        )}
                        <p className="text-sm font-semibold">{selectedCenter.pays?.nomPays || selectedCenter.nomPays || (isAr ? "غير معروف" : "Unknown")}</p>
                      </div>
                      {selectedCenter.url && (
                        <div>
                          <p className="text-sm text-slate-500">{isAr ? "الموقع الإلكتروني" : "Website"}</p>
                          <a
                            href={selectedCenter.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md font-semibold hover:opacity-95"
                          >
                            {isAr ? "الموقع" : "Visit Website"}
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="max-w-6xl mx-auto px-6 flex justify-center items-center gap-1.5 mt-16 mb-20">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition"
          >
            {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${page === i + 1 ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition"
          >
            {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default MinistriesHigherEducationScientificResearch;















