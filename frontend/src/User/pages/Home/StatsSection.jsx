import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  FlaskConical,
  Globe2,
  GraduationCap,
  Landmark,
  Microscope,
  Network,
  UsersRound,
} from "lucide-react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import apiAdmin from "../../../api/apiAdmin";
import "swiper/css";
import "swiper/css/pagination";

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

const StatsSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [counts, setCounts] = useState(initialCounts);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const countries = useMemo(() => {
    const displayNames = new Intl.DisplayNames([isRtl ? "ar" : "en"], { type: "region" });

    return arabCountryCodes.map((code) => ({
      code,
      name: displayNames.of(code.toUpperCase()),
    }));
  }, [isRtl]);

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
        icon: Microscope,
        href: "/researchDatabase?category=research-innovation-ai",
        featured: true,
      },
      {
        key: "universities_academic_institutions",
        label: t("submenu.database.universities_academic_scientific_institutions"),
        icon: GraduationCap,
        href: "/researchDatabase?category=universities",
      },
      {
        key: "incubators_technology_labs",
        label: t("submenu.database.incubators_technology_poles_laboratories"),
        icon: FlaskConical,
        href: "/researchDatabase?category=incubators-technology-labs",
      },
      {
        key: "programs_initiatives_strategies",
        label: t("submenu.database.programs_initiatives_strategies"),
        icon: Network,
        href: "/researchDatabase?category=programs-initiatives-strategies",
      },
      {
        key: "industrial_property_patents",
        label: t("submenu.database.industrial_property_patent_offices"),
        icon: Landmark,
        href: "/researchDatabase?category=industrial-property-patents",
      },
      {
        key: "experts_specialists",
        label: t("submenu.database.experts_specialists_database"),
        icon: UsersRound,
        href: "/researchDatabase?category=experts-specialists",
      },
      {
        key: "arab_countries",
        label: t("stats.countries"),
        icon: Globe2,
        href: "/researchDatabase?category=countries",
      },
    ],
    [t]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-20 md:py-28"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none absolute -right-36 -top-36 h-[430px] w-[430px] rounded-full bg-emerald-100/80 blur-[110px]" />
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
            const Icon = stat.icon;
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
                    className={`group relative flex h-full min-h-[220px] overflow-hidden rounded-[1.6rem] border p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(5,150,105,0.14)] ${
                      stat.featured
                        ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 hover:border-emerald-400"
                        : "border-slate-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                  <div className="flex w-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${
                        stat.featured
                          ? "border-emerald-200 bg-emerald-600 text-white"
                          : "border-emerald-100 bg-emerald-50 text-emerald-600"
                      }`}>
                        <Icon size={22} />
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-400 transition-all group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                        <ArrowLeft size={16} className={isRtl ? "" : "rotate-180"} />
                      </span>
                    </div>

                    <div className="mt-7">
                      {isLoading ? (
                        <div className="mb-3 h-10 w-24 animate-pulse rounded-lg bg-slate-100" />
                      ) : (
                        <div className="mb-2 flex items-end gap-2">
                          <strong className="text-4xl font-black leading-none text-slate-900 md:text-5xl">
                            {hasError ? "—" : isInView && <CountUp end={value} duration={2} separator="," />}
                          </strong>
                          {!hasError && <span className="pb-1 text-[10px] font-bold text-emerald-600/70">{t("stats.entries")}</span>}
                        </div>
                      )}
                      <p className={`max-w-sm font-bold leading-6 ${stat.featured ? "text-base text-slate-900" : "text-sm text-slate-600"}`}>
                        {stat.label}
                      </p>
                    </div>
                  </div>

                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-400/0 blur-3xl transition-colors duration-500 group-hover:bg-emerald-400/15" />
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
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              {t("stats.coverage_title")}
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/70 px-3 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.05)] sm:px-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white/90 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white/90 to-transparent" />
            <Swiper
              key={`flags-${i18n.language}`}
              modules={[Autoplay]}
              dir={isRtl ? "rtl" : "ltr"}
              loop
              loopAdditionalSlides={7}
              speed={3500}
              spaceBetween={12}
              slidesPerView={2.15}
              grabCursor
              autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{
                480: { slidesPerView: 3.2 },
                640: { slidesPerView: 4.2 },
                768: { slidesPerView: 5.3 },
                1024: { slidesPerView: 7.2 },
                1280: { slidesPerView: 8.2 },
              }}
              className="flags-swiper"
            >
              {countries.map((country) => (
                <SwiperSlide key={`${i18n.language}-${country.code}`}>
                  <div className="group flex h-16 items-center gap-3 rounded-2xl border border-white bg-white/90 px-3 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-[0_3px_10px_rgba(15,23,42,0.15)] ring-1 ring-slate-200">
                      <img
                        src={`https://flagcdn.com/w80/${country.code}.png`}
                        alt={country.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                    <span className="truncate text-xs font-extrabold text-slate-700 group-hover:text-emerald-700">
                      {country.name}
                    </span>
                  </div>
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
