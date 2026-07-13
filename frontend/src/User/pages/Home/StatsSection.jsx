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

const StatsSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [counts, setCounts] = useState(initialCounts);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
        label: t("stats.research_innovation_ai"),
        icon: Microscope,
        href: "/researchDatabase?category=research-innovation-ai",
        featured: true,
      },
      {
        key: "universities_academic_institutions",
        label: t("stats.universities_academic_institutions"),
        icon: GraduationCap,
        href: "/researchDatabase?category=universities",
      },
      {
        key: "incubators_technology_labs",
        label: t("stats.incubators_technology_labs"),
        icon: FlaskConical,
        href: "/researchDatabase?category=incubators-technology-labs",
      },
      {
        key: "programs_initiatives_strategies",
        label: t("stats.programs_initiatives_strategies"),
        icon: Network,
        href: "/researchDatabase?category=programs-initiatives-strategies",
      },
      {
        key: "industrial_property_patents",
        label: t("stats.industrial_property_patents"),
        icon: Landmark,
        href: "/researchDatabase?category=industrial-property-patents",
      },
      {
        key: "experts_specialists",
        label: t("stats.experts_specialists"),
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
          className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-bold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t("stats.live_data")}
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              {t("stats.title")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              {t("stats.subtitle")}
            </p>
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
      </div>
    </section>
  );
};

export default StatsSection;
