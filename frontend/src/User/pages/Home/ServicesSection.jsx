import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Database,
  Network,
  Cpu,
  Handshake,
  ClipboardList,
  FlaskConical,
  Megaphone,
  Presentation,
  UsersRound,
} from "lucide-react";

const legacyServiceConfig = [
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

const serviceConfig = [
  { id: 'linking', to: '/linkingresearcherscompanies', icon: Network, layout: 'lg:col-span-7 lg:min-h-[330px]', featured: true },
  { id: 'database', to: '/researchDatabase', icon: Database, layout: 'lg:col-span-5 lg:min-h-[330px]' },
  { id: 'cooperation', to: '/linkingresearchersindustrial', icon: Handshake, layout: 'lg:col-span-6' },
  { id: 'programs', to: '/countryDatabase', icon: ClipboardList, layout: 'lg:col-span-6' },
  { id: 'digital', to: '/centersExcellenceAI', icon: Cpu, layout: 'lg:col-span-6' },
  { id: 'outputs', to: '/researchDatabase', icon: FlaskConical, layout: 'lg:col-span-6' },
];

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const reduceMotion = useReducedMotion();
  const services = isRtl ? serviceConfig : legacyServiceConfig;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      aria-labelledby="home-services-title"
      className="relative overflow-hidden bg-[#f7f9f8] py-20 md:py-28"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      <div className="container relative mx-auto px-6">
        <div className="flex flex-col gap-10 md:gap-12">
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-3xl text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-800">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              {t("services_section.title")}
            </span>
            <h2 id="home-services-title" className="text-4xl font-black leading-[1.4] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              {t("menu.services")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {t("services_section.subtitle")}
            </p>
            <div aria-hidden="true" className="mt-7 flex items-center justify-center gap-3">
              <span className="h-1 w-12 rounded-full bg-emerald-600" />
              <span className="h-1 w-3 rounded-full bg-emerald-300" />
              <span className="h-1 w-3 rounded-full bg-emerald-200" />
            </div>
          </motion.header>

          <div className="grid w-full gap-4 md:grid-cols-2 xl:gap-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.04 }}
                  className="h-full"
                >
                  <Link
                    to={service.to}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500 via-emerald-700 to-teal-950 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:border-emerald-300 hover:shadow-[0_16px_40px_-16px_rgba(6,78,59,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 motion-safe:hover:-translate-y-1 sm:p-7"
                  >
                    <span aria-hidden="true" className="absolute inset-x-7 top-0 h-0.5 origin-center scale-x-0 bg-white/60 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/15 text-white">
                        <Icon aria-hidden="true" size={25} strokeWidth={1.6} />
                      </span>
                      <span aria-hidden="true" className="font-sans text-sm font-semibold tabular-nums tracking-widest text-white/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-8 text-white">
                      {t(isRtl ? `services_section.items.${index}.title` : service.titleKey)}
                    </h3>
                    <p className="mb-7 mt-3 text-sm leading-7 text-emerald-50/90">
                      {t(isRtl ? `services_section.items.${index}.description` : service.descriptionKey)}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/20 pt-5 text-sm font-bold text-white">
                      <span>{t("services_section.discover")}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-emerald-800 group-hover:text-white group-focus-visible:bg-emerald-800 group-focus-visible:text-white">
                        <ArrowLeft aria-hidden="true" size={17} className={isRtl ? "" : "rotate-180"} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
