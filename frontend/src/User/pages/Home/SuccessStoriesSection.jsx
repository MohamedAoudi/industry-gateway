import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  LogIn,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";

const stepIcons = [UserRoundPlus, BadgeCheck, LogIn];

const RegistrationGuide = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const steps = stepIcons.map((icon, index) => ({
    icon,
    number: String(index + 1).padStart(2, "0"),
    title: t(`registration_guide.steps.step${index + 1}.title`),
    description: t(`registration_guide.steps.step${index + 1}.description`),
  }));

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 px-4 py-20 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm">
            <Sparkles size={14} />
            {t("registration_guide.eyebrow")}
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("registration_guide.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            {t("registration_guide.subtitle")}
          </p>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, x: isRtl ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="group relative flex gap-5 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/35 hover:bg-white/[0.09] hover:shadow-[0_20px_50px_rgba(5,150,105,0.14)] sm:items-center sm:p-6"
                >
                  <div className="relative shrink-0">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-300 transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white">
                      <Icon size={23} />
                    </span>
                    {index < steps.length - 1 && (
                      <span className="absolute left-1/2 top-[4.25rem] hidden h-8 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-300 to-transparent sm:block" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                        {t("registration_guide.step_label")} {step.number}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{step.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 p-6 text-white shadow-[0_28px_70px_rgba(5,150,105,0.22)] sm:p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[45px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10 blur-[50px]" />

            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/15">
                <ShieldCheck size={22} />
              </span>
              <h3 className="mt-6 text-2xl font-black leading-tight sm:text-3xl">
                {t("registration_guide.card.title")}
              </h3>

              <ul className="mt-8 space-y-3">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-emerald-50/90">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15">
                      <Check size={13} />
                    </span>
                    {t(`registration_guide.benefits.b${item}`)}
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 text-sm font-black text-emerald-700 shadow-lg shadow-emerald-950/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t("registration_guide.cta")}
                <ArrowLeft
                  size={17}
                  className={`transition-transform ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"}`}
                />
              </Link>
              <p className="mt-4 text-center text-xs font-medium text-emerald-50/65">
                {t("registration_guide.login_hint")}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default RegistrationGuide;
