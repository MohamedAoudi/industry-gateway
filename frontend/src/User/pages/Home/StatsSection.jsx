import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CountUpImport from "react-countup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import apiAdmin from "../../../api/apiAdmin";
import "swiper/css";
import "swiper/css/pagination";

import researchImage from "../../assets/images/stats/research.png";
import universitiesImage from "../../assets/images/stats/universities.png";
import labsImage from "../../assets/images/stats/labs.png";
import programsImage from "../../assets/images/stats/programs.png";
import patentsImage from "../../assets/images/stats/patents.png";
import expertsImage from "../../assets/images/stats/experts.png";

const CountUp = CountUpImport.default ?? CountUpImport;

const initialCounts = {
  research_innovation_ai: 0,
  universities_academic_institutions: 0,
  incubators_technology_labs: 0,
  programs_initiatives_strategies: 0,
  industrial_property_patents: 0,
  experts_specialists: 0,
  arab_countries: 0,
};

const arabCountryCodes = [
  "jo", "ae", "bh", "tn", "dz", "dj", "sa",
  "sd", "sy", "so", "iq", "om", "ps", "qa",
  "kw", "lb", "ly", "eg", "ma", "mr", "ye",
];

const officialCountryNames = {
  jo: { ar: "المملكة الأردنية الهاشمية", en: "Hashemite Kingdom of Jordan" },
  ae: { ar: "دولة الإمارات العربية المتحدة", en: "United Arab Emirates" },
  bh: { ar: "مملكة البحرين", en: "Kingdom of Bahrain" },
  tn: { ar: "الجمهورية التونسية", en: "Republic of Tunisia" },
  dz: { ar: "الجمهورية الجزائرية الديمقراطية الشعبية", en: "People's Democratic Republic of Algeria" },
  dj: { ar: "جمهورية جيبوتي", en: "Republic of Djibouti" },
  sa: { ar: "المملكة العربية السعودية", en: "Kingdom of Saudi Arabia" },
  sd: { ar: "جمهورية السودان", en: "Republic of the Sudan" },
  sy: { ar: "الجمهورية العربية السورية", en: "Syrian Arab Republic" },
  so: { ar: "جمهورية الصومال", en: "Federal Republic of Somalia" },
  iq: { ar: "جمهورية العراق", en: "Republic of Iraq" },
  om: { ar: "سلطنة عُمان", en: "Sultanate of Oman" },
  ps: { ar: "دولة فلسطين", en: "State of Palestine" },
  qa: { ar: "دولة قطر", en: "State of Qatar" },
  kw: { ar: "دولة الكويت", en: "State of Kuwait" },
  lb: { ar: "الجمهورية اللبنانية", en: "Lebanese Republic" },
  ly: { ar: "دولة ليبيا", en: "State of Libya" },
  eg: { ar: "جمهورية مصر العربية", en: "Arab Republic of Egypt" },
  ma: { ar: "المملكة المغربية", en: "Kingdom of Morocco" },
  mr: { ar: "الجمهورية الإسلامية الموريتانية", en: "Islamic Republic of Mauritania" },
  ye: { ar: "الجمهورية اليمنية", en: "Republic of Yemen" },
};

const StatsSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [counts, setCounts] = useState(initialCounts);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const countries = useMemo(() => {
    return arabCountryCodes.map((code) => ({
      code,
      name: t(`countries.${code}`, { defaultValue: officialCountryNames[code][isRtl ? "ar" : "en"] }),
    }));
  }, [isRtl, t]);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const response = await apiAdmin.get("/portal-stats");
        if (isMounted) {
          setCounts({ ...initialCounts, ...response.data });
          setHasError(false);
        }
      } catch (error) {
        console.error("Erreur chargement statistiques:", error);
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        key: "research_innovation_ai",
        label: t("submenu.database.research_innovation_ai_centers"),
        image: researchImage,
        href: "/researchDatabase?category=research-innovation-ai",
        featured: true,
      },
      {
        key: "universities_academic_institutions",
        label: t("submenu.database.universities_academic_scientific_institutions"),
        image: universitiesImage,
        href: "/researchDatabase?category=universities",
      },
      {
        key: "incubators_technology_labs",
        label: t("submenu.database.incubators_technology_poles_laboratories"),
        image: labsImage,
        href: "/researchDatabase?category=incubators-technology-labs",
      },
      {
        key: "programs_initiatives_strategies",
        label: t("submenu.database.programs_initiatives_strategies"),
        image: programsImage,
        href: "/researchDatabase?category=programs-initiatives-strategies",
      },
      {
        key: "industrial_property_patents",
        label: t("submenu.database.industrial_property_patent_offices"),
        image: patentsImage,
        href: "/researchDatabase?category=industrial-property-patents",
      },
      {
        key: "experts_specialists",
        label: t("submenu.database.experts_specialists_database"),
        image: expertsImage,
        href: "/researchDatabase?category=experts-specialists",
      },
    ],
    [t]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#ECFCFF] via-white to-cyan-100/70 py-20 md:py-28"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none absolute -right-36 -top-36 h-[430px] w-[430px] rounded-full bg-[#D0F6FF]/80 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-48 left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-100/60 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(15,23,42,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.7)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-6 flex flex-col gap-6 md:mb-7 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              {t("stats.title")}
            </h2>
          </div>

          {hasError && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-700">
              {t("stats.load_error")}
            </div>
          )}
        </motion.div>

        <Swiper
          key={i18n.language}
          modules={[Autoplay, Pagination]}
          spaceBetween={18}
          slidesPerView={1.08}
          loop
          grabCursor
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.8 },
            768: { slidesPerView: 2.35 },
            1024: { slidesPerView: 3.1 },
            1280: { slidesPerView: 3.75 },
          }}
          className="stats-swiper !overflow-visible !pb-14"
        >
          {stats.map((stat, index) => {
            const value = counts[stat.key] ?? 0;

            return (
              <SwiperSlide key={stat.key} className="!h-auto py-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                  className="h-full"
                >
                  <Link
                    to={stat.href}
                    className="group relative flex h-full flex-col items-center rounded-3xl border border-[#2AD5F5]/25 bg-gradient-to-br from-[#00C9F2] to-[#007A94] px-4 py-5 text-center shadow-[0_22px_60px_rgba(0,201,242,0.16)] transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-[#00C9F2]"
                  >
                    <img
                      src={stat.image}
                      alt=""
                      loading="lazy"
                      className="h-28 w-28 object-contain transition-transform duration-500 group-hover:scale-105 md:h-32 md:w-32"
                    />
                    <div className="flex w-full flex-1 flex-col items-center">
                    <div className="mt-7">
                      {isLoading ? (
                        <div className="mb-3 h-10 w-24 animate-pulse rounded-lg bg-white/20" />
                      ) : (
                        <div className="mb-2 flex items-end justify-center gap-2">
                          <strong className="text-4xl font-black leading-none text-white md:text-5xl">
                            {hasError ? "—" : isInView && <CountUp end={value} duration={2} separator="," />}
                          </strong>
                          {!hasError && <span className="pb-1 text-[10px] font-bold text-[#ECFCFF]/80">{t("stats.entries")}</span>}
                        </div>
                      )}
                      <p className="max-w-sm text-base font-bold leading-6 text-white">
                        {stat.label}
                      </p>
                    </div>
                  </div>

                  </Link>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-10"
        >
          <div className="mb-7">
            <Link
              to="/countryDatabase"
              className="group inline-flex items-center gap-3 text-3xl font-black tracking-tight text-slate-900 transition-colors hover:text-[#007A94] md:text-5xl"
            >
              {t("stats.coverage_title")}
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#A1EDFF] bg-[#ECFCFF] text-[#007A94] transition group-hover:border-[#00C9F2] group-hover:bg-[#00C9F2] group-hover:text-white md:h-12 md:w-12">
                <ArrowLeft size={19} className={isRtl ? "" : "rotate-180"} />
              </span>
            </Link>
          </div>

          <div className="relative overflow-hidden px-3 py-6 sm:px-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#ECFCFF]/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cyan-50/80 to-transparent" />
            <Swiper
              key={`flags-${i18n.language}`}
              modules={[Autoplay]}
              dir={isRtl ? "rtl" : "ltr"}
              loop
              loopAdditionalSlides={7}
              speed={3500}
              spaceBetween={16}
              slidesPerView="auto"
              grabCursor
              autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
              className="flags-swiper"
            >
              {countries.map((country) => (
                <SwiperSlide key={`${i18n.language}-${country.code}`} className="!w-auto">
                  <Link
                    to={`/countryDatabase?country=${country.code}`}
                    className="group flex min-h-56 w-64 flex-col items-center gap-4 px-4 py-3 text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03]"
                  >
                    <span className="relative h-32 w-48 shrink-0 overflow-hidden rounded-2xl shadow-[0_6px_20px_rgba(15,23,42,0.18)] transition-all duration-300 group-hover:shadow-[0_16px_35px_rgba(0,201,242,0.28)]">
                      <img
                        src={`https://flagcdn.com/w320/${country.code}.png`}
                        alt={country.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                    <span className="max-w-[190px] text-base font-black leading-7 text-slate-700 group-hover:text-[#007A94] sm:text-lg">
                      {country.name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
