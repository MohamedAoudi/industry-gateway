import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Eye,
  Factory,
  Globe2,
  Lightbulb,
  Mail,
  Microscope,
  Network,
  Sparkles,
  Target,
} from "lucide-react";

const goalIcons = [Lightbulb, Network, Globe2, Microscope, Building2, Factory];

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const pillars = [
    { icon: Microscope, label: t("about_page.pillars.research") },
    { icon: Lightbulb, label: t("about_page.pillars.innovation") },
    { icon: Factory, label: t("about_page.pillars.industry") },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 pb-24 pt-20 text-white sm:pb-32 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm">
              <Sparkles size={14} />
              {t("about_page.eyebrow")}
            </span>
            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              {t("about_platform.about.title")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-9 text-emerald-50/70 sm:text-xl">
              {t("about_platform.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {pillars.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white/85 backdrop-blur-sm">
                <Icon size={17} className="text-emerald-300" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <main>
        <section className="relative mx-auto -mt-12 max-w-7xl px-6 pb-16 sm:-mt-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-10"
          >
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_14%_16%,rgba(16,185,129,0.14),transparent_36%),radial-gradient(circle_at_86%_78%,rgba(20,184,166,0.12),transparent_36%)]" />

            <div className="relative grid gap-7 lg:grid-cols-12 lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: isRtl ? 28 : -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-emerald-700 to-teal-600 p-7 text-white shadow-[0_20px_46px_rgba(5,150,105,0.24)] sm:p-9 lg:col-span-4"
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.32, 0.18] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full border-[34px] border-white/20"
                />
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-100 backdrop-blur-sm">
                  {t("about_page.eyebrow")}
                </span>
                <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl">
                  {t("about_page.identity_title")}
                </h2>
                <p className="mt-5 text-base leading-8 text-emerald-50/85">
                  {t("about_page.identity_subtitle")}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  <span className="h-1 rounded-full bg-white/70" />
                  <span className="h-1 rounded-full bg-white/40" />
                  <span className="h-1 rounded-full bg-white/25" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRtl ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="lg:col-span-8"
              >
                <div className="group relative overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.1)] sm:p-10">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_85%_12%,rgba(16,185,129,0.16),transparent_34%)]" />
                  <div className={`mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-600 ${isRtl ? "justify-end" : "justify-start"}`}>
                    <span className="h-px w-10 bg-emerald-500" />
                    <span>{t("about_platform.about.title")}</span>
                  </div>
                  <p className="relative text-lg font-medium leading-9 text-slate-700 sm:text-xl">
                    <strong className="font-black text-emerald-700">{t("about_platform.about.description_about")}</strong>
                    {t("about_platform.about.description_about1")}
                    <strong className="font-black text-slate-950">{t("about_platform.about.description_about2")}</strong>
                    {t("about_platform.about.description_about3")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="relative bg-slate-50 py-16 md:py-20">
          <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-10 max-w-3xl md:mb-12">
              <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                {t("about_page.direction_eyebrow")}
              </span>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                {t("about_page.direction_title")}
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.article
                initial={{ opacity: 0, x: isRtl ? 28 : -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65 }}
                className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 to-teal-600 p-8 text-white shadow-[0_24px_60px_rgba(5,150,105,0.18)] sm:p-10"
              >
                <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full border-[50px] border-white/[0.07] transition-transform duration-700 group-hover:scale-110" />
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/15">
                  <Eye size={25} />
                </span>
                <h3 className="mt-8 text-3xl font-black">{t("about_platform.vision.title")}</h3>
                <p className="relative mt-5 text-base leading-8 text-emerald-50/80">
                  {t("about_platform.vision.description_vision")}
                </p>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, x: isRtl ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-10"
              >
                <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full border-[50px] border-emerald-500/[0.04] transition-transform duration-700 group-hover:scale-110" />
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <Target size={25} />
                </span>
                <h3 className="mt-8 text-3xl font-black text-slate-950">{t("about_platform.mission.title")}</h3>
                <p className="relative mt-5 text-base leading-8 text-slate-600">
                  {t("about_platform.mission.description_mission")}
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-50 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t("about_page.goals_eyebrow")}
                </span>
                <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  {t("about_platform.goals.title")}
                </h2>
              </div>
              <div className={`lg:col-span-5 ${isRtl ? "lg:justify-self-end" : "lg:justify-self-start"}`}>
                <div className="h-1 w-32 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {goalIcons.map((Icon, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_45px_rgba(5,150,105,0.12)]"
                >
                  <div className={`absolute top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-500 ${isRtl ? "right-0" : "left-0"}`} />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-100/70 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-slate-200 px-3 py-1 text-sm font-black text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-6 text-base font-bold leading-8 text-slate-700">
                    {t(`about_platform.goals.g${index + 1}`)}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-700 to-teal-500 p-8 text-white shadow-[0_24px_65px_rgba(5,150,105,0.2)] sm:p-10 lg:flex-row lg:items-center lg:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[45px] border-white/10" />
            <div className="relative max-w-3xl">
              <h2 className="text-3xl font-black leading-tight sm:text-4xl">{t("about_page.cta.title")}</h2>
              <p className="mt-3 text-sm leading-7 text-emerald-50/80 sm:text-base">{t("about_page.cta.subtitle")}</p>
            </div>
            <Link to="/contact" className="group relative inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-black text-emerald-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
              <Mail size={17} />
              {t("about_page.cta.action")}
              <ArrowLeft size={16} className={`transition-transform ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"}`} />
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
