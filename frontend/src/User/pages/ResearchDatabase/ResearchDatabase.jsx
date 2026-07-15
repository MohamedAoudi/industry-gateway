import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  FileBadge,
  FlaskConical,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Microscope,
  Search,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import apiAdmin from "../../../api/apiAdmin";

const categoryConfig = [
  {
    key: "research-innovation-ai",
    labelKey: "submenu.database.research_innovation_ai_centers",
    descriptionKey: "database_pages.descriptions.research",
    endpoints: [
      "/research-database?category=research-innovation-ai&per_page=100",
      "/scientificResearchInnovationCenters?per_page=100",
      "/centersExcellenceArtificialIntelligence?per_page=100",
    ],
    icon: Microscope,
  },
  {
    key: "universities",
    labelKey: "submenu.database.universities_academic_scientific_institutions",
    descriptionKey: "database_pages.descriptions.universities",
    endpoints: [
      "/research-database?category=universities&per_page=100",
      "/ministriesHigherEducationScientificResearch?per_page=100",
    ],
    icon: GraduationCap,
  },
  {
    key: "incubators-technology-labs",
    labelKey: "submenu.database.incubators_technology_poles_laboratories",
    descriptionKey: "database_pages.descriptions.incubators",
    endpoints: ["/research-database?category=incubators-technology-labs&per_page=100"],
    icon: FlaskConical,
  },
  {
    key: "programs-initiatives-strategies",
    labelKey: "submenu.database.programs_initiatives_strategies",
    descriptionKey: "database_pages.descriptions.programs",
    endpoints: ["/research-database?category=programs-initiatives-strategies&per_page=100"],
    icon: Workflow,
  },
  {
    key: "industrial-property-patents",
    labelKey: "submenu.database.industrial_property_patent_offices",
    descriptionKey: "database_pages.descriptions.patents",
    endpoints: [
      "/research-database?category=industrial-property-patents&per_page=100",
      "/industrialPropertyPatentOffices?per_page=100",
    ],
    icon: FileBadge,
  },
  {
    key: "experts-specialists",
    labelKey: "submenu.database.experts_specialists_database",
    descriptionKey: "database_pages.descriptions.experts",
    endpoints: [
      "/research-database?category=experts-specialists&per_page=100",
      "/researchers",
    ],
    icon: UsersRound,
  },
];

const ResearchDatabase = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedCategory = searchParams.get("category");
  const activeCategory = categoryConfig.find((item) => item.key === requestedCategory) || categoryConfig[0];
  const ActiveIcon = activeCategory.icon;

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const pageSize = 9;

  useEffect(() => {
    let isMounted = true;
    setSearch("");
    setHasError(false);

    const loadRecords = async () => {
      setLoading(true);
      try {
        const responses = await Promise.allSettled(
          activeCategory.endpoints.map((endpoint) => apiAdmin.get(endpoint))
        );
        const payload = responses.flatMap((result, sourceIndex) => {
          if (result.status !== "fulfilled") return [];
          const data = result.value.data?.data ?? result.value.data ?? [];
          return Array.isArray(data)
            ? data.map((record) => ({ ...record, __source: sourceIndex }))
            : [];
        });

        if (isMounted) {
          setRecords(payload);
          setHasError(responses.every((result) => result.status === "rejected"));
        }
      } catch (error) {
        console.error(`Failed loading database category ${activeCategory.key}:`, error);
        if (isMounted) {
          setRecords([]);
          setHasError(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRecords();
    return () => {
      isMounted = false;
    };
  }, [activeCategory.key]);

  const normalizedRecords = useMemo(
    () => records.map((record, index) => {
      const titleAr = record.full_name || record.title_ar || record.titre_ar || "";
      const titleEn = record.title_en || record.titre_en || "";
      const descriptionAr = record.research_field || record.description_ar || "";
      const descriptionEn = record.description_en || "";

      return {
        id: `${record.__source}-${record.id || record.idCenter || record.idResearcher || index}`,
        title: isRtl ? titleAr || titleEn : titleEn || titleAr,
        titleAr,
        titleEn,
        description: isRtl ? descriptionAr || descriptionEn : descriptionEn || descriptionAr,
        descriptionAr,
        descriptionEn,
        country: record.country?.nomPays || record.pays?.nomPays || record.country || "",
        image: record.image_url || record.photo_url,
        email: record.email || "",
        website: record.url || "",
      };
    }),
    [activeCategory.key, isRtl, records]
  );

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return normalizedRecords;

    return normalizedRecords.filter((record) =>
      [record.title, record.description, record.country]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase().includes(query))
    );
  }, [normalizedRecords, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory.key, search]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!selectedRecord) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedRecord(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedRecord]);

  const openDetails = (record) => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/login", {
        state: { from: `${location.pathname}${location.search}` },
      });
      return;
    }
    setSelectedRecord(record);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 px-6 pb-28 pt-20 text-white sm:pb-36 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
            <Database size={15} />
            {t("menu.database")}
          </span>
          <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/[0.08] text-emerald-300 backdrop-blur-sm">
            <ActiveIcon size={28} />
          </span>
          <h1 className="mx-auto max-w-5xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {t(activeCategory.labelKey)}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-emerald-50/70">
            {t(activeCategory.descriptionKey)}
          </p>
        </div>
      </section>

      <main className="relative mx-auto -mt-16 max-w-7xl px-4 pb-24 sm:-mt-20 sm:px-6 lg:px-8">
        <section>
          <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block flex-1">
              <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? "right-4" : "left-4"}`} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("database_pages.search")}
                className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 ${isRtl ? "pl-4 pr-12" : "pl-12 pr-4"}`}
              />
            </label>
            <span className="shrink-0 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700">
              {filteredRecords.length} {t("database_pages.results")}
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white">
              <div className="text-center text-emerald-700">
                <Loader2 size={34} className="mx-auto animate-spin" />
                <p className="mt-4 text-sm font-bold">{t("database_pages.loading")}</p>
              </div>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ActiveIcon size={28} />
              </span>
              <h2 className="mt-5 text-xl font-black text-slate-900">
                {hasError ? t("database_pages.error") : t("database_pages.empty")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
                {t("database_pages.empty_description")}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {paginatedRecords.map((record) => (
                <article key={record.id} className="group flex min-h-[260px] flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(5,150,105,0.1)]">
                  <div className="flex items-start justify-between gap-4">
                    {record.image && !record.image.endsWith("/null") ? (
                      <img src={record.image} alt="" className="h-14 w-14 rounded-xl border border-slate-100 object-contain p-1" />
                    ) : (
                      <span className="grid h-14 w-14 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                        <ActiveIcon size={23} />
                      </span>
                    )}
                    {record.country && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                        <MapPin size={11} />
                        {record.country}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-6 text-xl font-black leading-8 text-slate-900 group-hover:text-emerald-700">
                    {record.title || t("database_pages.untitled")}
                  </h2>
                  {record.description && <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">{record.description}</p>}
                  <button
                    type="button"
                    onClick={() => openDetails(record)}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.13em] text-emerald-700"
                  >
                    {t("database_pages.view")}
                    <ArrowLeft size={14} className={isRtl ? "" : "rotate-180"} />
                  </button>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredRecords.length > pageSize && (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} /> {isRtl ? "السابق" : "Previous"}
              </button>
              {Array.from(
                { length: Math.min(5, totalPages) },
                (_, index) => Math.min(Math.max(1, currentPage - 2), Math.max(1, totalPages - 4)) + index
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${page === currentPage ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300"}`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isRtl ? "التالي" : "Next"} <ChevronLeft size={17} />
              </button>
            </nav>
          )}
        </section>
      </main>

      {selectedRecord && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedRecord(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedRecord.title}
        >
          <article className="my-auto w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl">
            <header className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
              <div className="flex min-w-0 items-start gap-4">
                {selectedRecord.image ? (
                  <img src={selectedRecord.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl border border-emerald-100 bg-white object-contain p-2" />
                ) : (
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ActiveIcon size={30} /></span>
                )}
                <div>
                  <p className="mb-2 text-xs font-black text-emerald-700">{t(activeCategory.labelKey)}</p>
                  <h2 className="text-xl font-black leading-8 text-slate-900 sm:text-2xl">{selectedRecord.title}</h2>
                  {selectedRecord.country && <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500"><MapPin size={15} />{selectedRecord.country}</p>}
                </div>
              </div>
              <button type="button" onClick={() => setSelectedRecord(null)} className="shrink-0 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:text-slate-900" aria-label={isRtl ? "إغلاق" : "Close"}><X size={20} /></button>
            </header>

            <div className="space-y-6 p-6 sm:p-8">
              {selectedRecord.titleAr && selectedRecord.titleEn && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4"><span className="text-xs font-bold text-slate-400">الاسم بالعربية</span><p className="mt-2 font-bold text-slate-800" dir="rtl">{selectedRecord.titleAr}</p></div>
                  <div className="rounded-xl bg-slate-50 p-4"><span className="text-xs font-bold text-slate-400">English name</span><p className="mt-2 font-bold text-slate-800" dir="ltr">{selectedRecord.titleEn}</p></div>
                </div>
              )}
              {selectedRecord.descriptionAr && <div><h3 className="mb-2 text-sm font-black text-slate-900">الوصف بالعربية</h3><p className="whitespace-pre-line text-sm leading-8 text-slate-600" dir="rtl">{selectedRecord.descriptionAr}</p></div>}
              {selectedRecord.descriptionEn && <div><h3 className="mb-2 text-sm font-black text-slate-900">English description</h3><p className="whitespace-pre-line text-sm leading-8 text-slate-600" dir="ltr">{selectedRecord.descriptionEn}</p></div>}

              {(selectedRecord.email || selectedRecord.website) && (
                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                  {selectedRecord.email && <a href={`mailto:${selectedRecord.email}`} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700"><Mail size={17} />{selectedRecord.email}</a>}
                  {selectedRecord.website && <a href={selectedRecord.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white"><ExternalLink size={17} />{isRtl ? "زيارة الموقع" : "Visit website"}</a>}
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default ResearchDatabase;
