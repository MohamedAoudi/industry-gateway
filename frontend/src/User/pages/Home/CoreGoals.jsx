import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Cpu,
  Database,
  Globe2,
  Lightbulb,
  Network,
  Rocket,
  Sparkles,
} from "lucide-react";

const goalIcons = [Lightbulb, Rocket, Globe2, Network, Cpu, Database];

const CoreGoals = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const goals = goalIcons.map((icon, index) => ({
    icon,
    number: String(index + 1).padStart(2, "0"),
    title: t(`about_sections.goals.g${index + 1}`),
    description: t(`about_sections.goals.g${index + 1}_desc`),
  }));

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 py-20 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              <Sparkles size={14} />
              {t("about_sections.goals.subtitle")}
            </span>
            <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("about_sections.goals.title")}
            </h2>
          </motion.div>

        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            const isFeatured = index === 0 || index === 5;

            return (
              <motion.article
                key={goal.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className={`group relative min-h-[310px] overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8 ${
                  isFeatured
                    ? "border-emerald-400/25 bg-gradient-to-br from-emerald-600 to-teal-700 shadow-[0_22px_60px_rgba(5,150,105,0.16)]"
                    : "border-white/10 bg-white/[0.045] hover:border-emerald-400/30 hover:bg-white/[0.075]"
                }`}
              >
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full border-[35px] border-white/[0.035] transition-transform duration-700 group-hover:scale-125" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <span className={`grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl border ${
                      isFeatured
                        ? "border-white/20 bg-white/15 text-white"
                        : "border-emerald-400/15 bg-emerald-400/10 text-emerald-300"
                    }`}>
                      <Icon size={23} strokeWidth={1.8} />
                    </span>
                    <span className={`text-4xl font-black leading-none ${isFeatured ? "text-white/25" : "text-white/[0.08]"}`}>
                      {goal.number}
                    </span>
                  </div>

                  <div className="mt-8 flex-1">
                    <h3 className="text-xl font-black leading-8 text-white sm:text-2xl">
                      {goal.title}
                    </h3>
                    <p className={`mt-4 text-sm leading-7 ${isFeatured ? "text-emerald-50/80" : "text-slate-400"}`}>
                      {goal.description}
                    </p>
                  </div>

                  <div className={`mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] ${
                    isFeatured ? "text-white/70" : "text-emerald-300/70"
                  }`}>
                    <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
                    <ArrowUpRight size={14} className={isRtl ? "-rotate-90" : ""} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreGoals;
