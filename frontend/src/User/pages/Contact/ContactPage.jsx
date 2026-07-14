import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const DirectionIcon = isRtl ? ArrowLeft : ArrowRight;
  const [isPrepared, setIsPrepared] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setIsPrepared(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subjectLabel = t(`contact_page.form.subjects.${formData.subject}`);
    const body = [
      `${t("contact_page.form.name")}: ${formData.name}`,
      `${t("contact_page.form.email")}: ${formData.email}`,
      `${t("contact_page.form.phone")}: ${formData.phone || "-"}`,
      "",
      formData.message,
    ].join("\n");

    setIsPrepared(true);
    window.location.href = `mailto:id@aidsmo.org?subject=${encodeURIComponent(subjectLabel)}&body=${encodeURIComponent(body)}`;
  };

  const contactCards = [
    {
      icon: Mail,
      title: t("contact_page.email_title"),
      value: t("about_platform.contact.info.email"),
      href: `mailto:${t("about_platform.contact.info.email")}`,
    },
    {
      icon: Phone,
      title: t("contact_page.phone_title"),
      value: t("about_platform.contact.info.phone"),
      href: `tel:${t("about_platform.contact.info.phone").replace(/\s/g, "")}`,
      ltr: true,
    },
    {
      icon: Globe2,
      title: t("contact_page.website_title"),
      value: "www.aidsmo.org",
      href: "https://www.aidsmo.org",
      external: true,
    },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 pb-28 pt-20 text-white sm:pb-36 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2 text-xs font-bold text-emerald-100/70">
            <Link to="/" className="transition-colors hover:text-white">{t("menu.home")}</Link>
            <DirectionIcon size={13} />
            <span className="text-white">{t("menu.contact")}</span>
          </div>

          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-100 backdrop-blur-sm">
              <Sparkles size={14} />
              {t("contact_page.eyebrow")}
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {t("contact_page.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-50/75 sm:text-lg">
              {t("contact_page.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <main className="relative mx-auto -mt-16 max-w-7xl px-4 pb-20 sm:-mt-20 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] lg:grid-cols-12">
          <aside className="relative overflow-hidden bg-emerald-50 p-6 sm:p-9 lg:col-span-5 lg:p-10">
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-[42px] border-emerald-100" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                <MessageSquareText size={22} />
              </span>
              <h2 className="mt-6 text-2xl font-black text-slate-900 sm:text-3xl">
                {t("contact_page.info_title")}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {t("about_platform.contact.description")}
              </p>

              <div className="mt-8 space-y-3">
                {contactCards.map(({ icon: Icon, title, value, href, external, ltr }) => (
                  <a
                    key={title}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{title}</span>
                      <span dir={ltr ? "ltr" : undefined} className="mt-1 block truncate text-sm font-bold text-slate-800">{value}</span>
                    </span>
                    {external && <ExternalLink size={15} className="text-slate-300 group-hover:text-emerald-600" />}
                  </a>
                ))}
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-100/70 p-4 text-emerald-900">
                <Clock3 size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em]">{t("contact_page.hours_title")}</p>
                  <p className="mt-1 text-sm font-semibold">{t("contact_page.hours_value")}</p>
                </div>
              </div>

              <div className="mt-7 flex items-start gap-4 border-t border-emerald-200 pt-7">
                <MapPin size={20} className="mt-1 shrink-0 text-emerald-700" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">{t("contact_page.address_title")}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                    {t("about_platform.contact.info.adress")}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="p-6 sm:p-9 lg:col-span-7 lg:p-10 xl:p-12">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-600">
                <Send size={14} />
                {t("contact_page.form.eyebrow")}
              </span>
              <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                {t("contact_page.form.title")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{t("contact_page.form.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black text-slate-700">{t("contact_page.form.name")} *</span>
                  <span className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <UserRound size={17} className="shrink-0 text-slate-400 group-focus-within:text-emerald-600" />
                    <input required name="name" value={formData.name} onChange={handleChange} placeholder={t("contact_page.form.name_placeholder")} className="w-full border-0 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black text-slate-700">{t("contact_page.form.email")} *</span>
                  <span className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <Mail size={17} className="shrink-0 text-slate-400 group-focus-within:text-emerald-600" />
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="w-full border-0 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                  </span>
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black text-slate-700">{t("contact_page.form.phone")}</span>
                  <span className="group flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <Phone size={17} className="shrink-0 text-slate-400 group-focus-within:text-emerald-600" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+212 ..." className="w-full border-0 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black text-slate-700">{t("contact_page.form.subject")} *</span>
                  <select required name="subject" value={formData.subject} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10">
                    <option value="general">{t("contact_page.form.subjects.general")}</option>
                    <option value="partnership">{t("contact_page.form.subjects.partnership")}</option>
                    <option value="technical">{t("contact_page.form.subjects.technical")}</option>
                    <option value="media">{t("contact_page.form.subjects.media")}</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-black text-slate-700">{t("contact_page.form.message")} *</span>
                <textarea required rows="6" name="message" value={formData.message} onChange={handleChange} placeholder={t("contact_page.form.message_placeholder")} className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />
              </label>

              {isPrepared && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
                  <CheckCircle2 size={19} className="shrink-0" />
                  {t("contact_page.form.prepared")}
                </div>
              )}

              <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-slate-400">{t("contact_page.form.notice")}</p>
                <button type="submit" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  {t("contact_page.form.send")}
                  <Send size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </button>
              </div>
            </form>
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_20px_60px_rgba(15,23,42,0.09)] sm:p-4">
          <div className="flex flex-col gap-4 px-3 pb-5 pt-3 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:pb-6 sm:pt-4">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-600">
                <MapPin size={15} />
                {t("contact_page.map.eyebrow")}
              </span>
              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {t("contact_page.map.title")}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              {t("contact_page.map.subtitle")}
            </p>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] bg-slate-100 sm:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4358.762740052641!2d-6.8529211878093665!3d33.99675227306604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76dd32500881d%3A0xd989cfa8a28391fe!2sOrganisation%20arabe%20pour%20le%20d%C3%A9veloppement%20industriel%2C%20de%20normalisation%20et%20des%20mines!5e1!3m2!1sfr!2sma!4v1784017645808!5m2!1sfr!2sma"
              title={t("contact_page.map.iframe_title")}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
