import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Database,
  ExternalLink,
  FileBadge,
  FlaskConical,
  GraduationCap,
  Loader2,
  MapPin,
  Microscope,
  Search,
  UsersRound,
  Workflow,
} from "lucide-react";
import apiAdmin from "../../../api/apiAdmin";

const categoryConfig = [
  {
    key: "research-innovation-ai",
    labelKey: "submenu.database.research_innovation_ai_centers",
    descriptionKey: "database_pages.descriptions.research",
    endpoint: "/scientificResearchInnovationCenters?per_page=100",
    icon: Microscope,
  },
  {
    key: "universities",
    labelKey: "submenu.database.universities_academic_scientific_institutions",
    descriptionKey: "database_pages.descriptions.universities",
    endpoint: "/ministriesHigherEducationScientificResearch?per_page=100",
    icon: GraduationCap,
  },
  {
    key: "incubators-technology-labs",
    labelKey: "submenu.database.incubators_technology_poles_laboratories",
    descriptionKey: "database_pages.descriptions.incubators",
    endpoint: null,
    icon: FlaskConical,
  },
  {
    key: "programs-initiatives-strategies",
    labelKey: "submenu.database.programs_initiatives_strategies",
    descriptionKey: "database_pages.descriptions.programs",
    endpoint: null,
    icon: Workflow,
  },
  {
    key: "industrial-property-patents",
    labelKey: "submenu.database.industrial_property_patent_offices",
    descriptionKey: "database_pages.descriptions.patents",
    endpoint: "/industrialPropertyPatentOffices?per_page=100",
    icon: FileBadge,
  },
  {
    key: "experts-specialists",
    labelKey: "submenu.database.experts_specialists_database",
    descriptionKey: "database_pages.descriptions.experts",
    endpoint: "/researchers",
    icon: UsersRound,
  },
];

const ResearchDatabase = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const activeCategory = categoryConfig.find((item) => item.key === requestedCategory) || categoryConfig[0];
  const ActiveIcon = activeCategory.icon;

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setSearch("");
    setHasError(false);

    if (!activeCategory.endpoint) {
      setRecords([]);
      setLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const loadRecords = async () => {
      setLoading(true);
      try {
        const response = await apiAdmin.get(activeCategory.endpoint);
        const payload = response.data?.data ?? response.data ?? [];
        if (isMounted) setRecords(Array.isArray(payload) ? payload : []);
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
  }, [activeCategory.endpoint, activeCategory.key]);

  const normalizedRecords = useMemo(
    () => records.map((record, index) => {
      const isResearcher = activeCategory.key === "experts-specialists";
      return {
        id: record.idCenter || record.idResearcher || index,
        title: isResearcher
          ? record.full_name
          : (isRtl ? record.titre_ar || record.titre_en : record.titre_en || record.titre_ar),
        description: isResearcher
          ? record.research_field
          : (isRtl ? record.description_ar || record.description_en : record.description_en || record.description_ar),
        country: record.pays?.nomPays || record.country || "",
        image: isResearcher ? null : record.photo_url,
        url: record.url || (isResearcher ? `mailto:${record.email}` : null),
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
              {filteredRecords.map((record) => (
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
                  {record.url && (
                    <a href={record.url} target={record.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.13em] text-emerald-700">
                      {t("database_pages.view")}
                      {record.url.startsWith("mailto:") ? <ArrowLeft size={14} className={isRtl ? "" : "rotate-180"} /> : <ExternalLink size={14} />}
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ResearchDatabase;
