import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Database,
  FileText,
  Globe2,
  Loader2,
  MapPin,
  Newspaper,
  Search,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiAdmin from "../../../api/apiAdmin";

const resultTypes = {
  page: { icon: FileText, ar: "صفحات الموقع", en: "Site pages" },
  database: { icon: Database, ar: "قاعدة البيانات", en: "Database" },
  researcher: { icon: UsersRound, ar: "الباحثون والخبراء", en: "Researchers" },
  company: { icon: Building2, ar: "المؤسسات الصناعية", en: "Industrial institutions" },
  media: { icon: Newspaper, ar: "المركز الإعلامي", en: "Media center" },
};

const SiteSearchPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [input, setInput] = useState(query);
  const [remoteResults, setRemoteResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeType, setActiveType] = useState("all");

  const staticPages = useMemo(() => [
    { id: "home", type: "page", title_ar: "الرئيسية", title_en: "Home", description_ar: t("hero.description"), description_en: t("hero.description"), path: "/" },
    { id: "about", type: "page", title_ar: "من نحن", title_en: "About us", description_ar: t("about_platform.description_platform"), description_en: t("about_platform.description_platform"), path: "/about" },
    { id: "database", type: "page", title_ar: "قاعدة البيانات", title_en: "Database", description_ar: t("database_pages.descriptions.all"), description_en: t("database_pages.descriptions.all"), path: "/researchDatabase?category=all" },
    { id: "linking", type: "page", title_ar: "ربط الباحثين بالمؤسسات الصناعية", title_en: "Linking researchers with industry", description_ar: t("submenu.services.linking_researchers_industrial_companies"), description_en: t("submenu.services.linking_researchers_industrial_companies"), path: "/linkingresearcherscompanies" },
    { id: "workshops", type: "page", title_ar: "ورش العمل والندوات", title_en: "Workshops and seminars", description_ar: t("submenu.services.joint_workshops_seminars"), description_en: t("submenu.services.joint_workshops_seminars"), path: "/workshopsseminars" },
    { id: "media", type: "page", title_ar: "المركز الإعلامي", title_en: "Media center", description_ar: t("media_page.subtitle"), description_en: t("media_page.subtitle"), path: "/mediaCenter" },
    { id: "faq", type: "page", title_ar: "الأسئلة الشائعة", title_en: "Frequently asked questions", description_ar: t("footer.faq"), description_en: t("footer.faq"), path: "/faq" },
    { id: "contact", type: "page", title_ar: "اتصل بنا", title_en: "Contact us", description_ar: t("contact_page.subtitle"), description_en: t("contact_page.subtitle"), path: "/contact" },
  ], [t]);

  const matchingPages = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();
    if (normalizedQuery.length < 2) return [];
    return staticPages.filter((page) => [page.title_ar, page.title_en, page.description_ar, page.description_en]
      .filter(Boolean)
      .some((value) => String(value).toLocaleLowerCase().includes(normalizedQuery)));
  }, [query, staticPages]);

  useEffect(() => {
    setInput(query);
    setActiveType("all");
    if (query.length < 2) {
      setRemoteResults([]);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(false);
    apiAdmin.get("/site-search", { params: { q: query } })
      .then(({ data }) => {
        if (mounted) setRemoteResults(Array.isArray(data.data) ? data.data : []);
      })
      .catch(() => {
        if (mounted) {
          setRemoteResults([]);
          setError(true);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [query]);

  const results = useMemo(() => [...matchingPages, ...remoteResults], [matchingPages, remoteResults]);
  const filteredResults = activeType === "all" ? results : results.filter((result) => result.type === activeType);
  const availableTypes = Object.keys(resultTypes).filter((type) => results.some((result) => result.type === type));

  const submit = (event) => {
    event.preventDefault();
    const value = input.trim();
    if (value.length < 2) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-slate-50 pb-24 pt-28">
      <section className="bg-gradient-to-br from-slate-950 via-[#00313D] to-slate-900 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[#63E1FA]"><Globe2 size={27} /></span>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">{t("interface.search_the_entire_site", { defaultValue: isRtl ? "البحث الشامل في الموقع" : "Search the entire site" })}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#ECFCFF]/70">
            {t("interface.search_site_pages_the_database_researchers_industrial_institutions_and_media_content", { defaultValue: isRtl ? "ابحث في صفحات الموقع وقاعدة البيانات والباحثين والمؤسسات الصناعية والمركز الإعلامي." : "Search site pages, the database, researchers, industrial institutions and media content." })}
          </p>
          <form onSubmit={submit} className="mx-auto mt-8 flex max-w-3xl gap-2 rounded-2xl bg-white p-2 shadow-2xl">
            <Search size={20} className="mx-3 self-center shrink-0 text-[#00C9F2]" />
            <input autoFocus value={input} onChange={(event) => setInput(event.target.value)} placeholder={t("interface.enter_at_least_two_characters", { defaultValue: isRtl ? "اكتب كلمتين على الأقل..." : "Enter at least two characters..." })} className="min-w-0 flex-1 border-none bg-transparent px-1 text-sm font-bold text-slate-800 outline-none" />
            <button disabled={input.trim().length < 2} className="rounded-xl bg-[#00C9F2] px-5 py-3 text-sm font-black text-white disabled:opacity-40">{t("interface.search", { defaultValue: isRtl ? "بحث" : "Search" })}</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-9 sm:px-6">
        {query.length >= 2 && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">{t("interface.search_results_for", { defaultValue: isRtl ? "نتائج البحث عن" : "Search results for" })}</p>
              <h2 className="mt-1 text-2xl font-black text-slate-900">“{query}”</h2>
            </div>
            {!loading && <span className="rounded-xl bg-[#ECFCFF] px-4 py-2 text-sm font-black text-[#007A94]">{results.length} {t("interface.results", { defaultValue: isRtl ? "نتيجة" : "results" })}</span>}
          </div>
        )}

        {results.length > 0 && (
          <nav className="mb-7 flex flex-wrap gap-2">
            <FilterButton active={activeType === "all"} onClick={() => setActiveType("all")} label={t("interface.all", { defaultValue: isRtl ? "الكل" : "All" })} />
            {availableTypes.map((type) => <FilterButton key={type} active={activeType === type} onClick={() => setActiveType(type)} label={isRtl ? resultTypes[type].ar : resultTypes[type].en} />)}
          </nav>
        )}

        {loading ? (
          <div className="flex min-h-72 items-center justify-center text-[#007A94]"><Loader2 size={36} className="animate-spin" /></div>
        ) : error ? (
          <EmptyState title={t("interface.search_failed", { defaultValue: isRtl ? "تعذر إكمال البحث" : "Search failed" })} description={t("interface.check_that_the_server_is_running_and_try_again", { defaultValue: isRtl ? "تأكد من تشغيل الخادم ثم أعد المحاولة." : "Check that the server is running and try again." })} />
        ) : query.length < 2 ? (
          <EmptyState title={t("interface.enter_a_search_term", { defaultValue: isRtl ? "ابدأ بكتابة كلمة البحث" : "Enter a search term" })} description={t("interface.enter_at_least_two_characters", { defaultValue: isRtl ? "يجب إدخال حرفين على الأقل." : "Enter at least two characters." })} />
        ) : filteredResults.length === 0 ? (
          <EmptyState title={t("interface.no_matching_results", { defaultValue: isRtl ? "لا توجد نتائج مطابقة" : "No matching results" })} description={t("interface.try_another_or_shorter_phrase", { defaultValue: isRtl ? "جرّب كلمة أخرى أو عبارة أقصر." : "Try another or shorter phrase." })} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResults.map((result) => <SearchResultCard key={`${result.type}-${result.id}`} result={result} isRtl={isRtl} />)}
          </div>
        )}
      </section>
    </main>
  );
};

const SearchResultCard = ({ result, isRtl }) => {
  const config = resultTypes[result.type] || resultTypes.page;
  const Icon = config.icon;
  const title = isRtl ? result.title_ar || result.title_en : result.title_en || result.title_ar;
  const description = isRtl ? result.description_ar || result.description_en : result.description_en || result.description_ar;

  return (
    <Link to={result.path} className="group flex min-h-48 gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#63E1FA] hover:shadow-lg">
      {result.image_url && !result.image_url.endsWith("/null") ? (
        <img src={result.image_url} alt="" className="h-20 w-20 shrink-0 rounded-2xl border border-slate-100 object-contain p-1" />
      ) : (
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#ECFCFF] text-[#007A94]"><Icon size={23} /></span>
      )}
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#00C9F2]">{isRtl ? config.ar : config.en}</span>
        <h3 className="mt-2 text-lg font-black leading-7 text-slate-900 group-hover:text-[#007A94]">{title}</h3>
        {description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{description}</p>}
        <div className="mt-4 flex items-center justify-between gap-3">
          {result.country ? <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400"><MapPin size={13} />{result.country}</span> : <span />}
          <ArrowLeft size={17} className={`text-[#00C9F2] transition group-hover:-translate-x-1 ${isRtl ? "" : "rotate-180"}`} />
        </div>
      </div>
    </Link>
  );
};

const FilterButton = ({ active, onClick, label }) => (
  <button type="button" onClick={onClick} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${active ? "bg-[#00C9F2] text-white shadow-md" : "border border-slate-200 bg-white text-slate-600 hover:border-[#63E1FA]"}`}>{label}</button>
);

const EmptyState = ({ title, description }) => (
  <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 text-center">
    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#ECFCFF] text-[#007A94]"><Search size={28} /></span>
    <h2 className="mt-5 text-xl font-black text-slate-900">{title}</h2>
    <p className="mt-2 text-sm text-slate-500">{description}</p>
  </div>
);

export default SiteSearchPage;
