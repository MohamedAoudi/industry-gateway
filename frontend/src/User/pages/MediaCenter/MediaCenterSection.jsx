import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Newspaper,
  Quote,
  Sparkles,
  Trophy,
  Loader2,
} from "lucide-react";
import apiAdmin from "../../../api/apiAdmin";

const tabs = [
  { id: "news", labelKey: "submenu.media_center.news", icon: Newspaper },
  { id: "events", labelKey: "submenu.media_center.events", icon: CalendarDays },
  { id: "releases", labelKey: "submenu.media_center.releases", icon: FileText },
  { id: "competitions", labelKey: "submenu.media_center.competitions_prizes", icon: Trophy },
  { id: "stories", labelKey: "submenu.media_center.success_stories", icon: Sparkles },
];

const countryAliases = [
  { code: "ae", names: ["united arab emirates", "uae", "الإمارات"] },
  { code: "sa", names: ["saudi arabia", "السعودية"] },
  { code: "eg", names: ["egypt", "مصر"] },
  { code: "ma", names: ["morocco", "المغرب"] },
  { code: "jo", names: ["jordan", "الأردن"] },
  { code: "bh", names: ["bahrain", "البحرين"] },
  { code: "tn", names: ["tunisia", "تونس", "التونسية"] },
  { code: "dz", names: ["algeria", "الجزائر"] },
  { code: "dj", names: ["djibouti", "جيبوتي"] },
  { code: "sd", names: ["sudan", "السودان"] },
  { code: "sy", names: ["syria", "سوريا", "السورية"] },
  { code: "so", names: ["somalia", "الصومال"] },
  { code: "iq", names: ["iraq", "العراق"] },
  { code: "om", names: ["oman", "عمان", "عُمان"] },
  { code: "ps", names: ["palestine", "فلسطين"] },
  { code: "qa", names: ["qatar", "قطر"] },
  { code: "kw", names: ["kuwait", "الكويت"] },
  { code: "lb", names: ["lebanon", "لبنان", "اللبنانية"] },
  { code: "ly", names: ["libya", "ليبيا"] },
  { code: "mr", names: ["mauritania", "موريتانيا", "الموريتانية"] },
  { code: "ye", names: ["yemen", "اليمن", "اليمنية"] },
];

const getCountryFlagUrl = (item) => {
  const location = `${item.locationEn ?? ""} ${item.locationAr ?? ""}`.toLocaleLowerCase();
  const country = countryAliases.find(({ names }) => names.some((name) => location.includes(name)));
  return country ? `https://flagcdn.com/w40/${country.code}.png` : null;
};

const LocationLabel = ({ item, location }) => {
  const flagUrl = getCountryFlagUrl(item);

  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
      <MapPin size={14} />
      {flagUrl && (
        <img
          src={flagUrl}
          alt=""
          className="h-4 w-6 rounded-sm border border-slate-200 object-cover shadow-sm"
        />
      )}
      <span>{location}</span>
    </span>
  );
};

const PdfCover3D = ({ url, thumbnailUrl, title }) => {
  if (!url || !thumbnailUrl) {
    return (
      <span className="grid h-44 w-32 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
        <FileText size={32} />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
      className="group/cover relative mx-auto block h-48 w-36 shrink-0 sm:mx-2 [perspective:900px]"
    >
      <span className="absolute bottom-0 left-3 right-0 h-5 rounded-[50%] bg-slate-950/25 blur-md transition-all duration-500 group-hover/cover:scale-110" />
      <span className="absolute inset-y-2 -left-1 w-4 rounded-l-md bg-gradient-to-r from-emerald-950 to-emerald-700 shadow-lg [transform:rotateY(-18deg)]" />
      <span className="absolute inset-0 overflow-hidden rounded-r-lg border border-slate-200 bg-white shadow-[12px_16px_28px_rgba(15,23,42,0.24)] transition-all duration-500 [transform:rotateY(-12deg)_rotateX(2deg)] [transform-origin:left_center] group-hover/cover:[transform:rotateY(-4deg)_rotateX(0deg)_translateY(-4px)]">
        <img src={thumbnailUrl} alt="" className="pointer-events-none h-full w-full object-contain object-top" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/10 via-transparent to-white/10" />
      </span>
    </a>
  );
};

const mediaContent = {
  news: [
    {
      id: 1,
      titleAr: "إطلاق المبادرة العربية لدعم ابتكارات الذكاء الاصطناعي في الصناعة",
      titleEn: "Launch of the Arab Initiative to Support AI Innovations in Industry",
      descriptionAr: "مبادرة جديدة تهدف إلى تمويل الشراكات بين مراكز الأبحاث والمصانع لتبني حلول الذكاء الاصطناعي.",
      descriptionEn: "A new initiative aims to fund partnerships between research centers and factories adopting AI solutions.",
      date: "2026-06-15T10:00:00Z",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=1200",
    },
    {
      id: 2,
      titleAr: "توقيع اتفاقية تعاون لنقل التكنولوجيا بين الجامعات والمنشآت الصناعية",
      titleEn: "Technology Transfer Agreement Between Universities and Industrial Plants",
      descriptionAr: "اتفاقية تضمن حماية الملكية الفكرية وتسهيل انتقال أبحاث الحلول التقنية إلى خطوط الإنتاج.",
      descriptionEn: "An agreement protecting intellectual property and moving technical research to production lines.",
      date: "2026-05-28T14:30:00Z",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=85&w=1200",
    },
    {
      id: 3,
      titleAr: "ندوة افتراضية حول مستقبل الطاقة المستدامة في القطاع الصناعي العربي",
      titleEn: "Virtual Webinar on Sustainable Energy in the Arab Industrial Sector",
      descriptionAr: "خبراء ومستثمرون يناقشون تقليل الانبعاثات الكربونية بالاعتماد على الابتكارات الهندسية المحلية.",
      descriptionEn: "Experts discuss reducing carbon emissions through locally developed engineering innovations.",
      date: "2026-05-10T09:15:00Z",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=85&w=1200",
    },
  ],
  events: [
    {
      id: 4,
      titleAr: "الملتقى العربي الأول للابتكار الصناعي ونقل التكنولوجيا",
      titleEn: "The 1st Arab Forum for Industrial Innovation and Technology Transfer",
      descriptionAr: "ملتقى يجمع نخبة من العلماء والمصنعين لبحث فرص الاستثمار والتعاون المشترك.",
      descriptionEn: "A forum bringing together scientists and manufacturers to discuss joint investment opportunities.",
      date: "2026-07-12T08:00:00Z",
      locationAr: "المملكة العربية السعودية",
      locationEn: "Saudi Arabia",
    },
    {
      id: 5,
      titleAr: "ورشة عمل: صياغة براءات الاختراع وحماية الملكية الفكرية",
      titleEn: "Workshop: Patent Drafting and Intellectual Property Protection",
      descriptionAr: "دورة مكثفة للباحثين والمبتكرين حول الخطوات القانونية لتسجيل براءات الاختراع.",
      descriptionEn: "An intensive course for researchers on the legal steps for patent registration.",
      date: "2026-08-05T09:00:00Z",
      locationAr: "جمهورية مصر العربية",
      locationEn: "Egypt",
    },
  ],
  releases: [
    {
      id: 6,
      titleAr: "التقرير السنوي لواقع البحث العلمي والابتكار في العالم العربي 2025",
      titleEn: "Annual Report on Scientific Research and Innovation in the Arab World 2025",
      descriptionAr: "دراسة إحصائية شاملة تستعرض مؤشرات التطور وأعداد براءات الاختراع المسجلة.",
      descriptionEn: "A comprehensive statistical study of development indicators and registered patents.",
      type: "PDF",
    },
    {
      id: 7,
      titleAr: "دليل المصنعين للوصول إلى مراكز التميز والذكاء الاصطناعي",
      titleEn: "Manufacturers Guide to Centers of Excellence and AI",
      descriptionAr: "خطوات مبسطة لكيفية طرح المشكلات التقنية والوصول إلى الحلول البحثية المناسبة.",
      descriptionEn: "Simplified steps for submitting technical challenges and accessing research solutions.",
      type: "PDF",
    },
  ],
  competitions: [
    {
      id: 8,
      titleAr: "جائزة أفضل ابتكار صناعي مستدام لعام 2026",
      titleEn: "Best Sustainable Industrial Innovation Award 2026",
      descriptionAr: "مسابقة مفتوحة للباحثين العرب لتقديم حلول مبتكرة في ترشيد استهلاك الطاقة بالمصانع.",
      descriptionEn: "An open competition for Arab researchers presenting innovative factory energy solutions.",
      locationAr: "دولة الإمارات العربية المتحدة",
      locationEn: "United Arab Emirates",
    },
    {
      id: 9,
      titleAr: "هاكاثون الذكاء الاصطناعي لحلول خطوط الإنتاج المعقدة",
      titleEn: "AI Hackathon for Complex Production Line Solutions",
      descriptionAr: "تحدٍ تقني لفرق المطورين لابتكار خوارزميات الصيانة التنبؤية للآلات.",
      descriptionEn: "A technical challenge to create predictive maintenance algorithms for machinery.",
      locationAr: "المملكة المغربية",
      locationEn: "Morocco",
    },
  ],
  stories: [
    {
      id: 10,
      titleAr: "د. أحمد السعيد — مركز أبحاث وتطوير المياه",
      titleEn: "Dr. Ahmed Al-Saeed — Water R&D Center",
      descriptionAr: "نجح فريقنا في تحويل براءة اختراع لتنقية المياه العادمة إلى نظام تشغيلي تبنته ثلاثة مصانع كبرى.",
      descriptionEn: "Our team converted a wastewater purification patent into an operational system adopted by three factories.",
    },
    {
      id: 11,
      titleAr: "المهندس خالد منصور — الشركة العربية للصناعات المتقدمة",
      titleEn: "Eng. Khaled Mansour — Arab Advanced Industries Co.",
      descriptionAr: "طرحنا مشكلة الهدر الحراري وتلقينا أربعة حلول بحثية من جامعات مختلفة، ثم نفذنا أفضلها بنجاح.",
      descriptionEn: "We submitted a thermal waste challenge, received four university solutions and deployed the best one.",
    },
  ],
};

const MediaCenterSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const locale = isRtl ? "ar-MA" : "en-US";
  const [activeTab, setActiveTab] = useState("news");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const currentTab = tabs.find((tab) => tab.id === activeTab);
  const CurrentIcon = currentTab.icon;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiAdmin.get("/media-items", { params: { category: activeTab } })
      .then(({ data }) => {
        if (!mounted) return;
        setItems((data.data ?? []).map((item) => ({
          ...item,
          titleAr: item.title_ar,
          titleEn: item.title_en,
          descriptionAr: item.description_ar,
          descriptionEn: item.description_en,
          date: item.event_date,
          locationAr: item.location_ar,
          locationEn: item.location_en,
          image: item.image_url,
          pdf: item.pdf_url,
          pdfThumbnail: item.pdf_thumbnail_url,
        })));
      })
      .catch(() => { if (mounted) setItems([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [activeTab]);

  useEffect(() => { setPage(1); }, [activeTab]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);

  const getTitle = (item) => isRtl ? item.titleAr : item.titleEn;
  const getDescription = (item) => isRtl ? item.descriptionAr : item.descriptionEn;
  const getLocation = (item) => isRtl ? item.locationAr : item.locationEn;
  const formatDate = (date) => new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#f7faf8]">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 pb-32 pt-20 text-white sm:pb-40 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl px-6"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm">
            <Newspaper size={14} />
            {t("media_page.eyebrow")}
          </span>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {t("menu.media_center")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-emerald-50/70">
            {t("media_page.subtitle")}
          </p>
        </motion.div>
      </section>

      <main className="relative mx-auto -mt-20 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <nav className="grid gap-2 rounded-[1.75rem] border border-slate-200 bg-white/95 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-5">
          {tabs.map(({ id, labelKey, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-sm font-black transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/20"
                    : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <Icon size={17} />
                {t(labelKey)}
              </button>
            );
          })}
        </nav>

        <div className="mb-9 mt-14 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <CurrentIcon size={21} />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">{t("media_page.browse")}</span>
            <h2 className="mt-1 text-3xl font-black text-slate-950">{t(currentTab.labelKey)}</h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {loading && <div className="flex min-h-64 items-center justify-center text-emerald-700"><Loader2 size={32} className="animate-spin" /></div>}
            {!loading && items.length === 0 && <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">{isRtl ? "لا يوجد محتوى منشور في هذا القسم." : "No published content in this section."}</div>}
            {!loading && items.length > 0 && activeTab === "news" && (
              <div className="grid gap-6 lg:grid-cols-3">
                {paginatedItems.map((item, index) => (
                  <article key={item.id} className={`group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_55px_rgba(5,150,105,0.13)] ${index === 0 ? "lg:col-span-2" : ""}`}>
                    <div className={`relative overflow-hidden bg-slate-200 ${index === 0 ? "h-72 sm:h-96" : "h-64"}`}>
                      <img src={item.image} alt={getTitle(item)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                        <span className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                          <CalendarDays size={14} />
                          {item.date && formatDate(item.date)}
                        </span>
                        <h3 className={`mt-3 font-black leading-tight ${index === 0 ? "text-2xl sm:text-3xl" : "text-xl"}`}>{getTitle(item)}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm leading-7 text-slate-500">{getDescription(item)}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.13em] text-emerald-700">
                        {t("media_page.read_more")}
                        <ArrowLeft size={14} className={isRtl ? "" : "rotate-180"} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && items.length > 0 && activeTab === "events" && (
              <div className="grid gap-6 lg:grid-cols-2">
                {paginatedItems.map((item) => {
                  const date = new Date(item.date);
                  return (
                    <article key={item.id} className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_50px_rgba(5,150,105,0.1)] sm:flex-row">
                      <div className="flex min-w-[150px] flex-col items-center justify-center bg-gradient-to-br from-emerald-700 to-teal-500 p-7 text-white">
                        <strong className="text-5xl font-black">{date.getDate()}</strong>
                        <span className="mt-1 text-xs font-black uppercase tracking-[0.16em]">{new Intl.DateTimeFormat(locale, { month: "long" }).format(date)}</span>
                        <span className="mt-1 text-sm text-white/70">{date.getFullYear()}</span>
                      </div>
                      <div className="p-7">
                        <LocationLabel item={item} location={getLocation(item)} />
                        <h3 className="mt-4 text-2xl font-black leading-9 text-slate-900">{getTitle(item)}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-500">{getDescription(item)}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading && items.length > 0 && activeTab === "releases" && (
              <div className="space-y-4">
                {paginatedItems.map((item) => (
                  <article key={item.id} className="group flex flex-col gap-7 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-6 transition-all hover:border-emerald-300 hover:shadow-[0_18px_45px_rgba(5,150,105,0.09)] sm:flex-row sm:items-center sm:p-7">
                    <PdfCover3D url={item.pdf} thumbnailUrl={item.pdfThumbnail} title={getTitle(item)} />
                    <div className="flex-1">
                      <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">{getTitle(item)}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-500">{getDescription(item)}</p>
                    </div>
                    {item.pdf && <a href={item.pdf} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-black text-emerald-700">{isRtl ? "تحميل PDF" : "Download PDF"}<ArrowLeft size={14} className={isRtl ? "" : "rotate-180"} /></a>}
                  </article>
                ))}
              </div>
            )}

            {!loading && items.length > 0 && activeTab === "competitions" && (
              <div className="grid gap-6 lg:grid-cols-2">
                {paginatedItems.map((item, index) => (
                  <article key={item.id} className="group relative overflow-hidden rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(217,119,6,0.12)]">
                    <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[38px] border-amber-500/[0.06]" />
                    <div className="flex items-start justify-between">
                      {item.image ? (
                        <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-amber-200 bg-white p-1.5 shadow-lg shadow-amber-500/15">
                          <img src={item.image} alt="" className="h-full w-full object-contain" />
                        </span>
                      ) : (
                        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20"><Trophy size={25} /></span>
                      )}
                      <span className="text-4xl font-black text-amber-500/15">0{index + 1}</span>
                    </div>
                    <div className="mt-8"><LocationLabel item={item} location={getLocation(item)} /></div>
                    <h3 className="mt-4 text-2xl font-black leading-9 text-slate-900">{getTitle(item)}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">{getDescription(item)}</p>
                  </article>
                ))}
              </div>
            )}

            {!loading && items.length > 0 && activeTab === "stories" && (
              <div className="grid gap-6 lg:grid-cols-2">
                {paginatedItems.map((item) => (
                  <article key={item.id} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 to-teal-700 p-8 text-white shadow-[0_24px_60px_rgba(5,150,105,0.16)] sm:p-10">
                    <Quote size={48} className="text-white/15" />
                    <blockquote className="mt-6 text-xl font-semibold leading-10 text-emerald-50/90">“{getDescription(item)}”</blockquote>
                    <div className="mt-8 border-t border-white/15 pt-6 text-sm font-black text-white">{getTitle(item)}</div>
                  </article>
                ))}
              </div>
            )}
          </motion.section>
        </AnimatePresence>
        {!loading && items.length > pageSize && (
          <nav className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <button disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronRight size={18} /></button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${page === number ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-600"}`}>{number}</button>)}
            <button disabled={page === totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronLeft size={18} /></button>
          </nav>
        )}
      </main>
    </div>
  );
};

export default MediaCenterSection;
