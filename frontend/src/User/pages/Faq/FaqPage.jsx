import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, ChevronDown,
  HelpCircle, LoaderCircle, Mail, Search, Send, Sparkles, UserRound,
} from "lucide-react";

import apiAdmin from "../../../api/apiAdmin";
import Pagination from "../../../components/Pagination";

const PAGE_SIZE = 8;

const copy = {
  ar: {
    breadcrumb: "الأسئلة الشائعة",
    eyebrow: "مركز المساعدة",
    title: "الأسئلة الشائعة",
    subtitle: "إجابات واضحة عن أكثر الأسئلة تداولاً حول بوابة الصناعة وخدماتها.",
    search: "ابحث في الأسئلة الشائعة...",
    loading: "جارٍ تحميل الأسئلة...",
    loadError: "تعذر تحميل الأسئلة الشائعة حالياً. يرجى المحاولة مرة أخرى.",
    empty: "لا توجد أسئلة منشورة حالياً.",
    noResults: "لا توجد نتائج مطابقة لبحثك.",
    formEyebrow: "لم تجد إجابتك؟",
    formTitle: "أرسل سؤالك",
    formSubtitle: "سيراجع فريق البوابة سؤالك، وسيُنشر مع الإجابة بعد اعتماده.",
    name: "الاسم (اختياري)", email: "البريد الإلكتروني (اختياري)",
    question: "اكتب سؤالك هنا", send: "إرسال السؤال", sending: "جارٍ الإرسال...",
    success: "تم إرسال سؤالك بنجاح، شكراً لمساهمتك.",
    submitError: "تعذر إرسال السؤال. تحقق من المعلومات وحاول مرة أخرى.",
  },
  en: {
    breadcrumb: "Frequently Asked Questions", eyebrow: "Help center",
    title: "Frequently Asked Questions",
    subtitle: "Clear answers to the most common questions about the Industry Gateway and its services.",
    search: "Search frequently asked questions...", loading: "Loading questions...",
    loadError: "The frequently asked questions could not be loaded. Please try again.",
    empty: "There are no published questions yet.", noResults: "No questions match your search.",
    formEyebrow: "Still need help?", formTitle: "Send your question",
    formSubtitle: "The portal team will review your question and publish it with an answer once approved.",
    name: "Name (optional)", email: "Email address (optional)", question: "Write your question here",
    send: "Send question", sending: "Sending...",
    success: "Your question was sent successfully. Thank you for contributing.",
    submitError: "The question could not be sent. Check the information and try again.",
  },
};

const FaqPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const text = copy[isRtl ? "ar" : "en"];
  const DirectionIcon = isRtl ? ArrowLeft : ArrowRight;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", question: "" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    apiAdmin.get("/faqs", { params: { per_page: 100 } })
      .then(({ data }) => {
        if (!isMounted) return;
        const items = Array.isArray(data?.data) ? data.data : [];
        setQuestions(items);
        setOpenId(items[0]?.id ?? null);
      })
      .catch(() => isMounted && setLoadError(true))
      .finally(() => isMounted && setIsLoading(false));
    return () => { isMounted = false; };
  }, []);

  const filteredQuestions = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return questions;
    return questions.filter((item) =>
      `${item.question ?? ""} ${item.answer ?? ""}`.toLocaleLowerCase().includes(term),
    );
  }, [query, questions]);
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
    setOpenId(null);
  }, [query]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const updateForm = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    setNotice(null);
  };

  const submitQuestion = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice(null);
    try {
      await apiAdmin.post("/faqs", {
        name: form.name.trim() || null,
        email: form.email.trim() || null,
        question: form.question.trim(),
      });
      setForm({ name: "", email: "", question: "" });
      setNotice({ type: "success", message: text.success });
    } catch {
      setNotice({ type: "error", message: text.submitError });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 pb-28 pt-20 text-white sm:pb-36 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2 text-xs font-bold text-emerald-100/70">
            <Link to="/" className="transition-colors hover:text-white">{t("menu.home")}</Link>
            <DirectionIcon size={13} /><span className="text-white">{text.breadcrumb}</span>
          </div>
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-100 backdrop-blur-sm">
              <Sparkles size={14} />{text.eyebrow}
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{text.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-50/75 sm:text-lg">{text.subtitle}</p>
          </div>
        </div>
      </section>

      <main className="relative mx-auto -mt-16 max-w-7xl px-4 pb-20 sm:-mt-20 sm:px-6 lg:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] sm:p-8">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
              <Search size={19} className="shrink-0 text-slate-400" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} className="w-full border-0 bg-transparent py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
            </label>
            <div className="mt-6 space-y-3">
              {isLoading && <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 py-16 text-sm font-semibold text-slate-500"><LoaderCircle size={20} className="animate-spin text-emerald-600" />{text.loading}</div>}
              {!isLoading && loadError && <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm font-semibold text-red-700"><AlertCircle size={19} className="shrink-0" />{text.loadError}</div>}
              {!isLoading && !loadError && filteredQuestions.length === 0 && <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm font-semibold text-slate-500"><HelpCircle size={28} className="mx-auto mb-3 text-emerald-500" />{questions.length === 0 ? text.empty : text.noResults}</div>}
              {!isLoading && !loadError && paginatedQuestions.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <article key={item.id} className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200 bg-white hover:border-emerald-200"}`}>
                    <button type="button" onClick={() => setOpenId(isOpen ? null : item.id)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-4 p-5 text-start sm:p-6">
                      <span className="flex items-start gap-4"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black ${isOpen ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}>?</span><span className="pt-1 text-sm font-black leading-7 text-slate-900 sm:text-base">{item.question}</span></span>
                      <ChevronDown size={19} className={`mt-2 shrink-0 text-emerald-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="whitespace-pre-line border-t border-emerald-100 px-5 py-5 text-sm leading-8 text-slate-600 sm:px-[5.75rem] sm:py-6">{item.answer}</p></div></div>
                  </article>
                );
              })}
              {!isLoading && !loadError && <Pagination page={currentPage} totalPages={totalPages} onPageChange={(page) => { setCurrentPage(page); setOpenId(null); }} className="pt-4" />}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.1)] sm:p-8 lg:sticky lg:top-28">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"><Send size={21} /></span>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-emerald-600">{text.formEyebrow}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">{text.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">{text.formSubtitle}</p>
            <form onSubmit={submitQuestion} className="mt-7 space-y-4">
              <label className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10"><UserRound size={17} className="shrink-0 text-slate-400" /><input name="name" value={form.name} onChange={updateForm} maxLength={255} placeholder={text.name} className="w-full border-0 bg-transparent px-3 py-3.5 text-sm outline-none" /></label>
              <label className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10"><Mail size={17} className="shrink-0 text-slate-400" /><input type="email" name="email" value={form.email} onChange={updateForm} maxLength={255} placeholder={text.email} className="w-full border-0 bg-transparent px-3 py-3.5 text-sm outline-none" /></label>
              <textarea required name="question" value={form.question} onChange={updateForm} maxLength={1000} rows={5} placeholder={text.question} className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />
              <button disabled={isSubmitting || !form.question.trim()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-600 to-teal-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">{isSubmitting ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={17} />}{isSubmitting ? text.sending : text.send}</button>
            </form>
            {notice && <div className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-xs font-semibold leading-5 ${notice.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{notice.type === "success" ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertCircle size={16} className="mt-0.5 shrink-0" />}{notice.message}</div>}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default FaqPage;
