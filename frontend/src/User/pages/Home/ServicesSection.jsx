import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Database,
  Megaphone,
  Presentation,
  Sparkles,
  UsersRound,
} from "lucide-react";

const serviceConfig = [
  {
    id: "linking",
    titleKey: "submenu.services.linking_researchers_industrial_companies",
    descriptionKey: "services_section.descriptions.linking",
    to: "/linkingresearcherscompanies",
    icon: UsersRound,
    layout: "lg:col-span-7 lg:min-h-[330px]",
    featured: true,
  },
  {
    id: "database",
    titleKey: "submenu.services.database_research_technologies_available_industrial_application",
    descriptionKey: "services_section.descriptions.database",
    to: "/researchDatabase",
    icon: Database,
    layout: "lg:col-span-5 lg:min-h-[330px]",
  },
  {
    id: "workshops",
    titleKey: "submenu.services.joint_workshops_seminars",
    descriptionKey: "services_section.descriptions.workshops",
    to: "/workshopsseminars",
    icon: Presentation,
    layout: "lg:col-span-6",
  },
  {
    id: "marketing",
    titleKey: "submenu.services.supporting_marketing_investment_scientific_research_outputs",
    descriptionKey: "services_section.descriptions.marketing",
    to: "/services/marketing",
    icon: Megaphone,
    layout: "lg:col-span-6",
  },
];

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f5faf7] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-emerald-200/50 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-44 -left-28 h-96 w-96 rounded-full bg-teal-100/70 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(circle_at_center,#064e3b_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65 }}
          className="relative mb-14 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-emerald-800 px-7 py-12 text-white shadow-[0_28px_70px_rgba(6,78,59,0.22)] sm:px-10 sm:py-14 md:mb-16 lg:px-14 lg:py-16"
        >
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border-[55px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-[80px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
                <Sparkles size={18} />
                {isRtl ? "حلول متكاملة" : "Integrated solutions"}
              </span>
              <h2 className="max-w-5xl text-2xl font-black leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl xl:text-6xl">
                {t("menu.services")}
              </h2>
              <div className="mt-8 flex items-center gap-4">
                <span className="h-1.5 w-24 rounded-full bg-emerald-400 sm:w-36" />
                <span className="text-2xl font-black text-emerald-300 sm:text-4xl">
                  {t("services_section.title")}
                </span>
              </div>
            </div>

            <div className="border-emerald-300/20 lg:border-s lg:ps-8">
              <p className="text-base font-medium leading-8 text-emerald-50/75 sm:text-lg">
                {t("services_section.subtitle")}
              </p>
              <span className="mt-7 inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/30 bg-white/10 text-emerald-300 backdrop-blur-sm">
                <ArrowLeft size={21} className={isRtl ? "-rotate-90" : "rotate-90"} />
              </span>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {serviceConfig.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className={`group relative min-h-[280px] overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(5,150,105,0.13)] ${service.layout} ${
                  service.featured
                    ? "border-emerald-600 bg-gradient-to-br from-emerald-700 to-teal-600 text-white shadow-[0_22px_50px_rgba(5,150,105,0.18)]"
                    : "border-emerald-100 bg-white text-slate-900 hover:border-emerald-300"
                }`}
              >
                <Link to={service.to} className="flex h-full min-h-[inherit] flex-col p-7 sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[38px] border-emerald-500/[0.06] transition-transform duration-700 group-hover:scale-125" />
                  {service.featured && (
                    <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-[45px]" />
                  )}

                  <div className="relative flex items-start justify-between gap-5">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 ${
                      service.featured
                        ? "border-white/20 bg-white/15 text-white"
                        : "border-emerald-100 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
                    }`}>
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <span className={`text-sm font-black tracking-[0.16em] ${service.featured ? "text-white/35" : "text-emerald-700/25"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-auto pt-9">
                    <h3 className={`font-black leading-8 ${service.featured ? "max-w-xl text-2xl sm:text-3xl" : "text-xl"}`}>
                      {t(service.titleKey)}
                    </h3>
                    <p className={`mt-3 max-w-xl text-sm leading-6 ${service.featured ? "text-emerald-50/75" : "text-slate-500"}`}>
                      {t(service.descriptionKey)}
                    </p>

                    <span className={`mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.13em] ${
                      service.featured ? "text-white" : "text-emerald-700"
                    }`}>
                      {t("services_section.discover")}
                      <ArrowLeft
                        size={15}
                        className={`transition-transform group-hover:-translate-x-1 ${isRtl ? "" : "rotate-180 group-hover:translate-x-1"}`}
                      />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
