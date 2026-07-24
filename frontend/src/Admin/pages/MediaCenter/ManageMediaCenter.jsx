import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Eye, EyeOff, FileUp, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import apiAdmin from "../../../api/apiAdmin";

const categories = [
  { value: "news", label: "أخبار" },
  { value: "events", label: "فعاليات" },
  { value: "releases", label: "إصدارات" },
  { value: "competitions", label: "مسابقات وجوائز" },
  { value: "stories", label: "قصص نجاح" },
];
const emptyForm = { category: "news", title_ar: "", title_en: "", description_ar: "", description_en: "", event_date: "", location_ar: "", location_en: "", organization_ar: "", organization_en: "", external_url: "", is_published: true, image: null, pdf: null, pdf_thumbnail: null };
const fieldClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";
const maxPdfSize = 20 * 1024 * 1024;

const createPdfThumbnail = async (file) => {
  const [{ getDocument, GlobalWorkerOptions }, { default: pdfWorker }] = await Promise.all([
    import("pdfjs-dist"),
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]);
  GlobalWorkerOptions.workerSrc = pdfWorker;
  const pdfDocument = await getDocument({ data: await file.arrayBuffer() }).promise;
  const page = await pdfDocument.getPage(1);
  const viewport = page.getViewport({ scale: 1.4 });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  const blob = await new Promise((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Thumbnail generation failed")), "image/jpeg", 0.86));
  await pdfDocument.destroy();
  return new File([blob], `${file.name.replace(/\.pdf$/i, "")}-cover.jpg`, { type: "image/jpeg" });
};

const AdminPdfCover = ({ item }) => {
  const [coverUrl, setCoverUrl] = useState(null);

  useEffect(() => {
    if (!item.pdf_thumbnail) return undefined;
    let active = true;
    let objectUrl;
    apiAdmin.get(`/media-items/${item.id}/pdf-thumbnail/admin`, { responseType: "blob" })
      .then(({ data }) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(data);
        setCoverUrl(objectUrl);
      })
      .catch(() => { if (active) setCoverUrl(null); });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [item.id, item.pdf_thumbnail]);

  if (!coverUrl) {
    return <div className="grid h-28 w-20 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><FileUp size={24} /></div>;
  }

  return (
    <div className="relative h-28 w-20 shrink-0 [perspective:700px]">
      <span className="absolute bottom-0 left-2 right-0 h-3 rounded-[50%] bg-slate-950/25 blur-sm" />
      <span className="absolute inset-y-1 -left-1 w-2 rounded-l bg-gradient-to-r from-emerald-950 to-emerald-700" />
      <span className="absolute inset-0 overflow-hidden rounded-r-md border border-slate-200 bg-white shadow-[7px_9px_16px_rgba(15,23,42,0.24)] [transform:rotateY(-10deg)] [transform-origin:left_center]">
        <img src={coverUrl} alt="" className="h-full w-full object-contain object-top" />
        <span className="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-transparent to-white/10" />
      </span>
    </div>
  );
};

const ManageMediaCenter = ({ lockedCategory }) => {
  const activeCategory = categories.find((item) => item.value === lockedCategory);
  const [category, setCategory] = useState(lockedCategory ?? "news");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = category === "news" ? 6 : 2;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);

  const loadItems = async () => {
    setLoading(true);
    try {
      const { data } = await apiAdmin.get("/media-items/admin", { params: { category } });
      setItems(data.data ?? []);
    } catch { toast.error("تعذر تحميل محتوى المركز الإعلامي"); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadItems(); }, [category]);
  useEffect(() => {
    apiAdmin.get("/pays")
      .then(({ data }) => setCountries(Array.isArray(data) ? data : (data.data ?? [])))
      .catch(() => setCountries([]));
  }, []);
  useEffect(() => { if (lockedCategory) setCategory(lockedCategory); }, [lockedCategory]);
  useEffect(() => { setPage(1); }, [category]);

  const openCreate = () => { setEditingId(null); setForm({ ...emptyForm, category: lockedCategory ?? category }); setPreview(null); setPdfName(""); setShowForm(true); };
  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ category: item.category, title_ar: item.title_ar ?? "", title_en: item.title_en ?? "", description_ar: item.description_ar ?? "", description_en: item.description_en ?? "", event_date: item.event_date ? item.event_date.slice(0, 16) : "", location_ar: item.location_ar ?? "", location_en: item.location_en ?? "", organization_ar: item.organization_ar ?? "", organization_en: item.organization_en ?? "", external_url: item.external_url ?? "", is_published: Boolean(item.is_published), image: null, pdf: null, pdf_thumbnail: null });
    setPreview(item.image_url ?? null); setPdfName(item.pdf_url ? "PDF محفوظ حالياً" : ""); setShowForm(true);
  };
  const closeForm = () => { if (!saving) { setShowForm(false); setEditingId(null); setPreview(null); } };
  const viewPdf = async (item) => {
    const pdfWindow = window.open("", "_blank");
    try {
      const { data } = await apiAdmin.get(`/media-items/${item.id}/pdf/admin`, { responseType: "blob" });
      const pdfUrl = URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
      if (pdfWindow) pdfWindow.location.href = pdfUrl;
      else window.open(pdfUrl, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } catch {
      pdfWindow?.close();
      toast.error("تعذر فتح ملف PDF");
    }
  };

  const submit = async (event) => {
    event.preventDefault(); setSaving(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (["image", "pdf", "pdf_thumbnail"].includes(key) && !value) return;
      payload.append(key, key === "is_published" ? (value ? "1" : "0") : value ?? "");
    });
    try {
      if (editingId) await apiAdmin.post(`/media-items/${editingId}`, payload);
      else await apiAdmin.post("/media-items", payload);
      toast.success(editingId ? "تم تحديث المحتوى" : "تمت إضافة المحتوى"); closeForm(); await loadItems();
    } catch (error) {
      const errors = error.response?.data?.errors;
      const message = errors ? Object.values(errors).flat()[0] : error.response?.data?.message;
      toast.error(message || "تعذر حفظ المحتوى", { duration: 6000 });
    }
    finally { setSaving(false); }
  };
  const remove = async (item) => {
    if (!window.confirm(`هل تريد حذف «${item.title_ar}»؟`)) return;
    try { await apiAdmin.delete(`/media-items/${item.id}`); setItems((current) => current.filter((entry) => entry.id !== item.id)); toast.success("تم حذف المحتوى"); }
    catch { toast.error("تعذر حذف المحتوى"); }
  };

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-6">
      <Toaster position="top-center" />
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div><p className="text-sm font-bold text-emerald-700">المركز الإعلامي</p><h1 className="mt-2 text-2xl font-black text-slate-900">{activeCategory ? `إدارة ${activeCategory.label}` : "إدارة المركز الإعلامي"}</h1><p className="mt-2 text-sm text-slate-500">إضافة وتعديل ونشر محتوى هذا القسم بشكل مستقل.</p></div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"><Plus size={18} /> إضافة محتوى</button>
      </header>
      {!lockedCategory && <nav className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((item) => <button key={item.value} onClick={() => setCategory(item.value)} className={`rounded-xl px-4 py-3 text-sm font-black ${category === item.value ? "bg-emerald-600 text-white" : "text-slate-500 hover:bg-emerald-50"}`}>{item.label}</button>)}
      </nav>}
      {loading ? <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white text-emerald-700"><Loader2 className="animate-spin" size={30} /></div> : items.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">لا يوجد محتوى في هذا القسم.</div> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {paginatedItems.map((item) => <article key={item.id} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {item.category === "releases" ? <AdminPdfCover item={item} /> : <div className="grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-700">{item.image_url ? <img src={item.image_url} alt="" className="h-full w-full object-cover" /> : <CalendarDays size={24} />}</div>}
            <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h2 className="font-black text-slate-900">{item.title_ar}</h2><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${item.is_published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{item.is_published ? <Eye size={12} /> : <EyeOff size={12} />}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.description_ar || "بدون وصف"}</p><div className="mt-4 flex flex-wrap gap-2">{item.category === "releases" && item.pdf && <button type="button" onClick={() => viewPdf(item)} className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 hover:bg-emerald-100"><Eye size={15} /> عرض PDF</button>}<button onClick={() => openEdit(item)} className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:text-emerald-700"><Pencil size={15} /></button><button onClick={() => remove(item)} className="rounded-lg bg-red-50 p-2 text-red-600"><Trash2 size={15} /></button></div></div>
          </article>)}
        </div>
      )}
      {!loading && items.length > pageSize && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
      {showForm && <div onMouseDown={(e) => e.target === e.currentTarget && closeForm()} className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"><form onSubmit={submit} className="my-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-6 flex justify-between"><h2 className="text-xl font-black">{editingId ? "تعديل المحتوى" : "إضافة محتوى"}</h2><button type="button" onClick={closeForm}><X /></button></div><div className="grid gap-5 md:grid-cols-2">
        {lockedCategory ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"><span className="text-xs font-bold text-emerald-600">القسم</span><p className="mt-1 text-sm font-black text-emerald-900">{activeCategory?.label}</p></div> : <Field label="القسم *"><select className={fieldClass} value={form.category} onChange={(e) => { setForm({ ...form, category: e.target.value, organization_ar: "", organization_en: "", image: null, pdf: null, pdf_thumbnail: null }); setPreview(null); setPdfName(""); }}>{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></Field>}
        <Field label="التاريخ"><input type="datetime-local" className={fieldClass} value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} /></Field>
        <Field label="العنوان بالعربية *"><input className={fieldClass} required value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} /></Field><Field label="العنوان بالإنجليزية"><input dir="ltr" className={fieldClass} value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></Field>
        <Field label="الوصف بالعربية"><textarea rows="4" className={fieldClass} value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} /></Field><Field label="الوصف بالإنجليزية"><textarea dir="ltr" rows="4" className={fieldClass} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></Field>
        {form.category === "competitions" ? <Field label="الدولة"><select className={fieldClass} value={form.location_ar} onChange={(e) => setForm({ ...form, location_ar: e.target.value, location_en: e.target.value })}><option value="">بدون دولة</option>{form.location_ar && !countries.some((country) => country.nomPays === form.location_ar) && <option value={form.location_ar}>{form.location_ar}</option>}{countries.map((country) => <option key={country.idPays} value={country.nomPays}>{country.nomPays}</option>)}</select></Field> : <><Field label="المكان بالعربية"><input className={fieldClass} value={form.location_ar} onChange={(e) => setForm({ ...form, location_ar: e.target.value })} /></Field><Field label="المكان بالإنجليزية"><input dir="ltr" className={fieldClass} value={form.location_en} onChange={(e) => setForm({ ...form, location_en: e.target.value })} /></Field></>}
        {form.category === "competitions" && <><Field label="المنظمة بالعربية"><input className={fieldClass} placeholder="يمكن إضافتها مع الدولة أو بدونها" value={form.organization_ar} onChange={(e) => setForm({ ...form, organization_ar: e.target.value })} /></Field><Field label="المنظمة بالإنجليزية"><input dir="ltr" className={fieldClass} placeholder="Organization name" value={form.organization_en} onChange={(e) => setForm({ ...form, organization_en: e.target.value })} /></Field></>}
        <Field label="رابط خارجي"><input dir="ltr" type="url" className={fieldClass} value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} /></Field>
        {form.category === "releases" ? (
          <Field label={`ملف PDF ${editingId ? "" : "*"}`}>
            <label className="flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
              <span className="flex gap-2 text-sm font-bold text-slate-500"><FileUp size={19} /> {pdfName || "اختر ملف PDF"}</span>
              <input type="file" accept=".pdf,application/pdf" required={!editingId} className="hidden" onChange={async (e) => { const file = e.target.files?.[0] ?? null; if (file && file.size > maxPdfSize) { toast.error("حجم ملف PDF يجب ألا يتجاوز 20 ميغابايت"); e.target.value = ""; setForm({ ...form, pdf: null, pdf_thumbnail: null }); setPdfName(""); return; } if (!file) { setForm({ ...form, pdf: null, pdf_thumbnail: null }); setPdfName(""); return; } setPdfName("جاري تجهيز الغلاف..."); try { const thumbnail = await createPdfThumbnail(file); setForm({ ...form, pdf: file, pdf_thumbnail: thumbnail }); setPdfName(file.name); } catch { e.target.value = ""; setForm({ ...form, pdf: null, pdf_thumbnail: null }); setPdfName(""); toast.error("تعذر استخراج الصفحة الأولى من ملف PDF"); } }} />
            </label>
            {editingId && pdfName && items.find((item) => item.id === editingId)?.pdf && <button type="button" onClick={() => viewPdf(items.find((item) => item.id === editingId))} className="mt-2 inline-flex items-center gap-2 text-xs font-black text-emerald-700 hover:text-emerald-900"><Eye size={15} /> عرض ملف PDF المحفوظ</button>}
          </Field>
        ) : (
          <Field label={form.category === "competitions" ? "شعار المسابقة أو الجائزة" : "الصورة"}><label className="flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">{preview ? <img src={preview} alt="" className="h-full w-full object-contain" /> : <span className="flex gap-2 text-sm font-bold text-slate-500"><ImagePlus size={19} /> {form.category === "competitions" ? "اختر شعاراً" : "اختر صورة"}</span>}<input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0] ?? null; setForm({ ...form, image: file }); setPreview(file ? URL.createObjectURL(file) : null); }} /></label></Field>
        )}
        <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-5 w-5 accent-emerald-600" /><span className="text-sm font-bold">نشر المحتوى للزوار</span></label>
      </div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={closeForm} className="rounded-xl border px-5 py-3 text-sm font-bold">إلغاء</button><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white">{saving && <Loader2 size={17} className="animate-spin" />} حفظ</button></div></form></div>}
    </div>
  );
};
const Field = ({ label, children }) => <label className="space-y-2"><span className="text-sm font-bold text-slate-700">{label}</span>{children}</label>;
const Pagination = ({ page, totalPages, onChange }) => <nav className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><button disabled={page === 1} onClick={() => onChange(page - 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronRight size={18} /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => onChange(number)} className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${page === number ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-600"}`}>{number}</button>)}<button disabled={page === totalPages} onClick={() => onChange(page + 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronLeft size={18} /></button></nav>;
export default ManageMediaCenter;
