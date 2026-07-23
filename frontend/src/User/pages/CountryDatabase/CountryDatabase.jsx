import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import {
  Building2,
  Database,
  Factory,
  FlaskConical,
  GraduationCap,
  Landmark,
  Loader2,
  Microscope,
  Network,
  UsersRound,
} from "lucide-react";
import apiAdmin from "../../../api/apiAdmin";

const countries = [
  { code: "jo", ar: "الأردن", en: "Jordan", aliases: ["الأردن", "الاردن", "jordan"] },
  { code: "ae", ar: "الإمارات", en: "United Arab Emirates", aliases: ["الإمارات", "الامارات", "الإمارات العربية المتحدة", "uae", "united arab emirates", "emirates"] },
  { code: "bh", ar: "البحرين", en: "Bahrain", aliases: ["البحرين", "bahrain"] },
  { code: "tn", ar: "تونس", en: "Tunisia", aliases: ["تونس", "tunisia"] },
  { code: "dz", ar: "الجزائر", en: "Algeria", aliases: ["الجزائر", "algeria"] },
  { code: "dj", ar: "جيبوتي", en: "Djibouti", aliases: ["جيبوتي", "djibouti"] },
  { code: "sa", ar: "السعودية", en: "Saudi Arabia", aliases: ["السعودية", "المملكة العربية السعودية", "saudi arabia", "saudi"] },
  { code: "sd", ar: "السودان", en: "Sudan", aliases: ["السودان", "sudan"] },
  { code: "sy", ar: "سوريا", en: "Syria", aliases: ["سوريا", "السورية", "syria"] },
  { code: "so", ar: "الصومال", en: "Somalia", aliases: ["الصومال", "somalia"] },
  { code: "iq", ar: "العراق", en: "Iraq", aliases: ["العراق", "iraq"] },
  { code: "om", ar: "عُمان", en: "Oman", aliases: ["عمان", "عُمان", "سلطنة عمان", "oman"] },
  { code: "ps", ar: "فلسطين", en: "Palestine", aliases: ["فلسطين", "palestine"] },
  { code: "qa", ar: "قطر", en: "Qatar", aliases: ["قطر", "qatar"] },
  { code: "kw", ar: "الكويت", en: "Kuwait", aliases: ["الكويت", "kuwait"] },
  { code: "lb", ar: "لبنان", en: "Lebanon", aliases: ["لبنان", "اللبنانية", "lebanon"] },
  { code: "ly", ar: "ليبيا", en: "Libya", aliases: ["ليبيا", "libya"] },
  { code: "eg", ar: "مصر", en: "Egypt", aliases: ["مصر", "egypt"] },
  { code: "ma", ar: "المغرب", en: "Morocco", aliases: ["المغرب", "المغربية", "morocco"] },
  { code: "mr", ar: "موريتانيا", en: "Mauritania", aliases: ["موريتانيا", "الموريتانية", "mauritania"] },
  { code: "ye", ar: "اليمن", en: "Yemen", aliases: ["اليمن", "اليمنية", "yemen"] },
];

const categories = {
  "research-innovation-ai": {
    label: { ar: "مراكز البحث العلمي والإبتكار والذكاء الصناعي", en: "Research, innovation and AI centers" },
    icon: Microscope,
  },
  universities: {
    label: { ar: "الجامعات والمؤسسات الأكاديمية والعلمية", en: "Universities and academic institutions" },
    icon: GraduationCap,
  },
  "incubators-technology-labs": {
    label: { ar: "الحاضنات والأقطاب التكنولوجية والمختبرات", en: "Incubators, technology poles and laboratories" },
    icon: FlaskConical,
  },
  "programs-initiatives-strategies": {
    label: { ar: "البرامج والمبادرات والاستراتيجيات", en: "Programs, initiatives and strategies" },
    icon: Network,
  },
  "industrial-property-patents": {
    label: { ar: "مكاتب الملكية الصناعية وبراءات الإختراع", en: "Industrial property and patent offices" },
    icon: Landmark,
  },
  "experts-specialists": {
    label: { ar: "قاعدة الخبراء والمختصين", en: "Experts and specialists" },
    icon: UsersRound,
  },
  "supporting-bodies": {
    label: { ar: "الجهات الداعمة للبحث العلمي والابتكار", en: "Research and innovation supporting bodies" },
    icon: Building2,
  },
  "industrial-institutions": {
    label: { ar: "المؤسسات الصناعية", en: "Industrial institutions" },
    icon: Factory,
  },
};

const sources = [
  { endpoint: "/research-database?per_page=100", category: null },
  { endpoint: "/scientificResearchInnovationCenters?per_page=100", category: "research-innovation-ai" },
  { endpoint: "/centersExcellenceArtificialIntelligence?per_page=100", category: "research-innovation-ai" },
  { endpoint: "/ministriesHigherEducationScientificResearch?per_page=100", category: "universities" },
  { endpoint: "/industrialPropertyPatentOffices?per_page=100", category: "industrial-property-patents" },
  { endpoint: "/supportingBodiesScientificResearch?per_page=100", category: "supporting-bodies" },
  { endpoint: "/researchers", category: "experts-specialists" },
  { endpoint: "/companies", category: "industrial-institutions" },
];

const normalize = (value) =>
  String(value || "")
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

const resolveCountryCode = (value) => {
  const candidate = normalize(value);
  if (!candidate) return "";

  const match = countries.find((country) =>
    country.aliases.some((alias) => {
      const normalizedAlias = normalize(alias);
      return candidate === normalizedAlias || candidate.includes(normalizedAlias);
    })
  );

  return match?.code || "";
};

const getPayload = (response) => {
  const payload = response?.data?.data ?? response?.data ?? [];
  return Array.isArray(payload) ? payload : [];
};

const loadAllSourceRecords = async (source) => {
  const firstResponse = await apiAdmin.get(source.endpoint);
  const firstPage = getPayload(firstResponse);
  const lastPage = Number(firstResponse?.data?.last_page || 1);

  if (lastPage <= 1) return firstPage;

  const separator = source.endpoint.includes("?") ? "&" : "?";
  const remainingResponses = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      apiAdmin.get(`${source.endpoint}${separator}page=${index + 2}`)
    )
  );

  return [firstPage, ...remainingResponses.map(getPayload)].flat();
};

const CountryDatabase = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const language = isRtl ? "ar" : "en";
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCode = searchParams.get("country") || "";
  const selectedCountry = countries.find((country) => country.code === selectedCode);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadRecords = async () => {
      setLoading(true);
      const responses = await Promise.allSettled(
        sources.map(loadAllSourceRecords)
      );

      if (!mounted) return;

      const loadedRecords = responses.flatMap((response, sourceIndex) => {
        if (response.status !== "fulfilled") return [];
        const source = sources[sourceIndex];

        return response.value.map((record, recordIndex) => {
          const countryName =
            record.country?.nomPays ||
            record.pays?.nomPays ||
            record.country ||
            "";
          const category = record.category || source.category;

          return {
            id: `${sourceIndex}-${record.id || record.idCenter || record.idResearcher || record.idCompany || recordIndex}`,
            category,
            titleAr:
              record.full_name ||
              record.company_name ||
              record.title_ar ||
              record.titre_ar ||
              "",
            titleEn: record.title_en || record.titre_en || "",
            descriptionAr:
              record.research_field ||
              record.industry_sector ||
              record.description_ar ||
              "",
            descriptionEn: record.description_en || "",
            countryName,
            countryCode: resolveCountryCode(countryName),
            image: record.image_url || record.photo_url || "",
          };
        });
      });

      setRecords(loadedRecords.filter((record) => categories[record.category]));
      setHasError(responses.every((response) => response.status === "rejected"));
      setLoading(false);
    };

    loadRecords();
    return () => {
      mounted = false;
    };
  }, []);

  const countryCounts = useMemo(
    () =>
      records.reduce((counts, record) => {
        if (record.countryCode) {
          counts[record.countryCode] = (counts[record.countryCode] || 0) + 1;
        }
        return counts;
      }, {}),
    [records]
  );

  const countryRecords = useMemo(
    () => records.filter((record) => !selectedCode || record.countryCode === selectedCode),
    [records, selectedCode]
  );

  const categoryCounts = useMemo(
    () =>
      countryRecords.reduce((counts, record) => {
        counts[record.category] = (counts[record.category] || 0) + 1;
        return counts;
      }, {}),
    [countryRecords]
  );

  const selectedCountryName = useMemo(
    () =>
      records.find((record) => record.countryCode === selectedCode)?.countryName ||
      selectedCountry?.[language] ||
      "",
    [language, records, selectedCode, selectedCountry]
  );

  const selectCountry = (code) => {
    const nextParams = new URLSearchParams(searchParams);
    if (code) nextParams.set("country", code);
    else nextParams.delete("country");
    setSearchParams(nextParams);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 px-6 pb-24 pt-20 text-white sm:pb-28 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/10 text-emerald-300">
            <Database size={29} />
          </span>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            {isRtl ? "قاعدة البيانات حسب الدول العربية" : "Database by Arab country"}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-emerald-50/70 sm:text-base">
            {isRtl
              ? "استكشف أرقام ومحتويات قاعدة البيانات في 21 دولة عربية، واختر دولة لعرض سجلاتها فقط."
              : "Explore database figures and content across 21 Arab countries, then choose a country to view only its records."}
          </p>
        </div>
      </section>

      <main className="relative mx-auto -mt-12 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {selectedCountry ? (
          <section className="flex items-center gap-4 rounded-[2rem] border border-emerald-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.1)] sm:p-7">
            <img
              src={`https://flagcdn.com/w160/${selectedCountry.code}.png`}
              alt=""
              className="h-14 w-20 rounded-xl object-cover shadow-md sm:h-16 sm:w-24"
            />
            <div>
              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {selectedCountry[language]}
              </h2>
            </div>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {countries.map((country) => (
                <button
                  type="button"
                  key={country.code}
                  onClick={() => selectCountry(country.code)}
                  className="group flex min-h-[116px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-center text-slate-700 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white"
                >
                  <img
                    src={`https://flagcdn.com/w80/${country.code}.png`}
                    alt=""
                    className="h-8 w-11 rounded-md object-cover shadow-sm"
                  />
                  <span className="mt-2 text-xs font-extrabold sm:text-sm">{country[language]}</span>
                  <strong className="mt-1 text-lg font-black text-emerald-700">
                    {loading ? "—" : countryCounts[country.code] || 0}
                  </strong>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              {isRtl ? "محتويات قاعدة البيانات" : "Database content"}
            </h2>
          </div>

          {loading ? (
            <div className="flex min-h-[220px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white">
              <div className="text-center text-emerald-700">
                <Loader2 size={34} className="mx-auto animate-spin" />
                <p className="mt-4 text-sm font-bold">{isRtl ? "جاري تحميل البيانات..." : "Loading data..."}</p>
              </div>
            </div>
          ) : hasError ? (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center font-bold text-red-700">
              {isRtl ? "تعذر تحميل بيانات الدول حالياً." : "Country data could not be loaded."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(categories).map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={key}
                    to={`/researchDatabase?category=${key}${selectedCountryName ? `&country=${encodeURIComponent(selectedCountryName)}` : ""}`}
                    className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_12px_30px_rgba(5,150,105,0.1)]"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <div className="min-w-0">
                      <strong className="block text-2xl font-black text-slate-900 group-hover:text-emerald-700">{categoryCounts[key] || 0}</strong>
                      <span className="block text-xs font-bold leading-5 text-slate-500 group-hover:text-slate-700">{category.label[language]}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CountryDatabase;
