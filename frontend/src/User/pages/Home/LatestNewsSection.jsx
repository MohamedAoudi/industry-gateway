import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "2026-06-15T10:00:00Z",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=1000",
  },
  {
    id: 2,
    date: "2026-05-28T14:30:00Z",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=85&w=1000",
  },
  {
    id: 3,
    date: "2026-05-10T09:15:00Z",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=85&w=1000",
  },
];

const LatestNewsSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const locale = isRtl ? "ar-MA" : "en-US";

  return (
    <section dir={isRtl ? "rtl" : "ltr"} className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/70 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-teal-100/60 blur-[110px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-7 md:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
              <Newspaper size={14} />
              {t("menu.media_center")}
            </span>
            <h2 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t("latest_news.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              {t("latest_news.subtitle")}
            </p>
          </div>

          <Link
            to="/mediaCenter"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md"
          >
            {t("latest_news.view_all")}
            <ArrowLeft size={16} className={`transition-transform ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"}`} />
          </Link>
        </motion.header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.09 }}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_55px_rgba(5,150,105,0.13)]"
            >
              <Link to="/mediaCenter" className="flex h-full flex-col">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={t(`latest_news.items.n${item.id}.title`)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/25 bg-slate-950/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-white backdrop-blur-md rtl:left-4 rtl:right-auto">
                    {t("latest_news.category")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <CalendarDays size={14} className="text-emerald-600" />
                    {new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(new Date(item.date))}
                  </span>
                  <h3 className="mt-4 text-xl font-black leading-8 text-slate-900 transition-colors group-hover:text-emerald-700">
                    {t(`latest_news.items.n${item.id}.title`)}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
                    {t(`latest_news.items.n${item.id}.description`)}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
                    {t("latest_news.read_more")}
                    <ArrowLeft size={15} className={`transition-transform ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"}`} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
