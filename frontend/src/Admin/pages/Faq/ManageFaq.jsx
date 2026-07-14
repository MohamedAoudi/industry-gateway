import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  HelpCircle,
  LoaderCircle,
  Mail,
  MessageSquareReply,
  RefreshCw,
  Save,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";

import apiAdmin from "../../../api/apiAdmin";

const translations = {
  ar: {
    title: "إدارة الأسئلة الشائعة",
    subtitle: "راجع أسئلة المستخدمين، أضف الإجابات وحدد ما يظهر في صفحة الأسئلة الشائعة.",
    total: "جميع الأسئلة", pending: "في انتظار الإجابة", answered: "تمت الإجابة", hidden: "مخفي",
    search: "ابحث في الأسئلة أو أسماء المستخدمين...", refresh: "تحديث",
    loading: "جارٍ تحميل الأسئلة...", empty: "لا توجد أسئلة ضمن هذا التصنيف.",
    loadError: "تعذر تحميل الأسئلة.", answer: "إجابة الإدارة", answerPlaceholder: "اكتب الإجابة هنا...",
    publish: "نشر السؤال والإجابة للمستخدمين", save: "حفظ الإجابة", saving: "جارٍ الحفظ...",
    hide: "إخفاء", show: "عرض ونشر", delete: "حذف", anonymous: "مستخدم غير معروف",
    noEmail: "لم يُدخل بريداً إلكترونياً", received: "تاريخ الإرسال", answeredAt: "تاريخ الإجابة",
    saved: "تم حفظ الإجابة بنجاح.", hiddenSuccess: "تم إخفاء السؤال.", publishedSuccess: "تم نشر السؤال.",
    deleted: "تم حذف السؤال.", saveError: "تعذر حفظ التغييرات.", deleteError: "تعذر حذف السؤال.",
    deleteConfirm: "هل أنت متأكد من حذف هذا السؤال نهائياً؟", answerRequired: "اكتب إجابة قبل النشر.",
  },
  en: {
    title: "Manage frequently asked questions",
    subtitle: "Review user questions, add answers and choose what appears on the public FAQ page.",
    total: "All questions", pending: "Awaiting answer", answered: "Answered", hidden: "Hidden",
    search: "Search questions or user names...", refresh: "Refresh",
    loading: "Loading questions...", empty: "There are no questions in this category.",
    loadError: "Questions could not be loaded.", answer: "Administration answer", answerPlaceholder: "Write the answer here...",
    publish: "Publish the question and answer", save: "Save answer", saving: "Saving...",
    hide: "Hide", show: "Publish", delete: "Delete", anonymous: "Anonymous user",
    noEmail: "No email provided", received: "Received", answeredAt: "Answered",
    saved: "The answer was saved successfully.", hiddenSuccess: "The question was hidden.", publishedSuccess: "The question was published.",
    deleted: "The question was deleted.", saveError: "The changes could not be saved.", deleteError: "The question could not be deleted.",
    deleteConfirm: "Permanently delete this question?", answerRequired: "Write an answer before publishing.",
  },
};

const statusStyle = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  answered: "border-emerald-200 bg-emerald-50 text-emerald-700",
  hidden: "border-slate-200 bg-slate-100 text-slate-600",
};

const ManageFaq = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const text = translations[isRtl ? "ar" : "en"];
  const [questions, setQuestions] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiAdmin.get("/faqs/admin", { params: { per_page: 100 } });
      const items = Array.isArray(data?.data) ? data.data : [];
      setQuestions(items);
      setDrafts(Object.fromEntries(items.map((item) => [item.id, {
        answer: item.answer ?? "",
        isPublished: Boolean(item.is_published),
      }])));
    } catch {
      toast.error(text.loadError);
    } finally {
      setLoading(false);
    }
  }, [text.loadError]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);

  const counts = useMemo(() => ({
    all: questions.length,
    pending: questions.filter((item) => item.status === "pending").length,
    answered: questions.filter((item) => item.status === "answered").length,
    hidden: questions.filter((item) => item.status === "hidden").length,
  }), [questions]);

  const visibleQuestions = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return questions.filter((item) => {
      const matchesFilter = filter === "all" || item.status === filter;
      const matchesSearch = !term || `${item.question ?? ""} ${item.name ?? ""} ${item.email ?? ""}`.toLocaleLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [filter, query, questions]);

  const updateDraft = (id, changes) => {
    setDrafts((current) => ({ ...current, [id]: { ...current[id], ...changes } }));
  };

  const applyUpdate = async (item, overrides = {}) => {
    const draft = drafts[item.id] ?? { answer: "", isPublished: false };
    const answer = (overrides.answer ?? draft.answer).trim();
    const isPublished = overrides.isPublished ?? draft.isPublished;
    const status = overrides.status ?? (item.status === "hidden" ? "hidden" : answer ? "answered" : "pending");

    if (isPublished && !answer) {
      toast.error(text.answerRequired);
      return;
    }

    setSavingId(item.id);
    try {
      const { data } = await apiAdmin.patch(`/faqs/${item.id}`, {
        answer: answer || null,
        status,
        is_published: Boolean(isPublished),
      });
      const updated = data.data;
      setQuestions((current) => current.map((question) => question.id === item.id ? updated : question));
      setDrafts((current) => ({ ...current, [item.id]: { answer: updated.answer ?? "", isPublished: Boolean(updated.is_published) } }));
      toast.success(overrides.status === "hidden" ? text.hiddenSuccess : isPublished ? text.publishedSuccess : text.saved);
    } catch {
      toast.error(text.saveError);
    } finally {
      setSavingId(null);
    }
  };

  const deleteQuestion = async (item) => {
    if (!window.confirm(text.deleteConfirm)) return;
    setDeletingId(item.id);
    try {
      await apiAdmin.delete(`/faqs/${item.id}`);
      setQuestions((current) => current.filter((question) => question.id !== item.id));
      setDrafts((current) => {
        const next = { ...current };
        delete next[item.id];
        return next;
      });
      toast.success(text.deleted);
    } catch {
      toast.error(text.deleteError);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (value) => value
    ? new Intl.DateTimeFormat(isRtl ? "ar-MA" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
    : "—";

  const filters = [
    { id: "all", label: text.total, icon: HelpCircle },
    { id: "pending", label: text.pending, icon: Clock3 },
    { id: "answered", label: text.answered, icon: CheckCircle2 },
    { id: "hidden", label: text.hidden, icon: EyeOff },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-full bg-slate-50 p-1 sm:p-4">
      <Toaster position={isRtl ? "top-left" : "top-right"} />
      <header className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-600"><MessageSquareReply size={15} />FAQ</span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">{text.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">{text.subtitle}</p>
        </div>
        <button onClick={loadQuestions} disabled={loading} className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 disabled:opacity-60">
          <RefreshCw size={17} className={loading ? "animate-spin" : ""} />{text.refresh}
        </button>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {filters.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setFilter(id)} className={`flex items-center justify-between rounded-2xl border p-4 text-start transition-all ${filter === id ? "border-emerald-300 bg-emerald-600 text-white shadow-lg shadow-emerald-600/15" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200"}`}>
            <span className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${filter === id ? "bg-white/15" : "bg-emerald-50 text-emerald-700"}`}><Icon size={18} /></span><span className="text-sm font-black">{label}</span></span>
            <span className={`rounded-lg px-2.5 py-1 text-sm font-black ${filter === id ? "bg-white/15" : "bg-slate-100"}`}>{counts[id]}</span>
          </button>
        ))}
      </div>

      <label className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10">
        <Search size={19} className="text-slate-400" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} className="w-full border-0 bg-transparent py-4 text-sm outline-none placeholder:text-slate-400" />
      </label>

      {loading ? (
        <div className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-white py-28 text-sm font-bold text-slate-500"><LoaderCircle size={23} className="animate-spin text-emerald-600" />{text.loading}</div>
      ) : visibleQuestions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white py-28 text-center text-sm font-bold text-slate-500"><HelpCircle size={32} className="mx-auto mb-3 text-emerald-500" />{text.empty}</div>
      ) : (
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {visibleQuestions.map((item) => {
              const draft = drafts[item.id] ?? { answer: "", isPublished: false };
              const isSaving = savingId === item.id;
              const isDeleting = deletingId === item.id;
              return (
                <motion.article layout key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
                    <div className="p-5 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${statusStyle[item.status] ?? statusStyle.pending}`}>{item.status === "pending" ? text.pending : item.status === "answered" ? text.answered : text.hidden}</span>
                        {item.is_published && <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-black text-sky-700"><Eye size={12} />{text.show}</span>}
                      </div>
                      <h2 className="mt-5 text-lg font-black leading-8 text-slate-900 sm:text-xl">{item.question}</h2>
                      <div className="mt-6 grid gap-3 text-xs text-slate-500 sm:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><UserRound size={15} className="text-emerald-600" /><span className="font-bold text-slate-700">{item.name || text.anonymous}</span></div>
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><Mail size={15} className="text-emerald-600" /><span className="truncate" dir="ltr">{item.email || text.noEmail}</span></div>
                        <div className="flex items-center gap-2 px-1"><Clock3 size={14} /><span>{text.received}: {formatDate(item.created_at)}</span></div>
                        {item.answered_at && <div className="flex items-center gap-2 px-1"><CheckCircle2 size={14} /><span>{text.answeredAt}: {formatDate(item.answered_at)}</span></div>}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/70 p-5 sm:p-7 xl:border-s xl:border-t-0">
                      <label className="mb-2 block text-xs font-black text-slate-700">{text.answer}</label>
                      <textarea rows={5} value={draft.answer} onChange={(event) => updateDraft(item.id, { answer: event.target.value })} placeholder={text.answerPlaceholder} className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                      <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-700">
                        <input type="checkbox" checked={draft.isPublished} onChange={(event) => updateDraft(item.id, { isPublished: event.target.checked })} className="h-4 w-4 accent-emerald-600" />{text.publish}
                      </label>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button onClick={() => applyUpdate(item)} disabled={isSaving || isDeleting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white transition hover:bg-emerald-700 disabled:opacity-60">{isSaving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}{isSaving ? text.saving : text.save}</button>
                        {item.status === "hidden" ? (
                          <button onClick={() => applyUpdate(item, { status: "answered", isPublished: true })} disabled={isSaving || isDeleting} className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs font-black text-sky-700 hover:bg-sky-100 disabled:opacity-60"><Eye size={16} />{text.show}</button>
                        ) : (
                          <button onClick={() => applyUpdate(item, { status: "hidden", isPublished: false })} disabled={isSaving || isDeleting} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-100 disabled:opacity-60"><EyeOff size={16} />{text.hide}</button>
                        )}
                        <button onClick={() => deleteQuestion(item)} disabled={isSaving || isDeleting} title={text.delete} className="grid h-11 w-11 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-60">{isDeleting ? <LoaderCircle size={17} className="animate-spin" /> : <Trash2 size={17} />}</button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ManageFaq;
