import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Eye, EyeOff, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import apiAdmin from "../../../api/apiAdmin";

const categories = [
  { value: "news", label: "أخبار" },
  { value: "events", label: "فعاليات" },
  { value: "releases", label: "إصدارات" },
  { value: "competitions", label: "مسابقات وجوائز" },
  { value: "stories", label: "قصص نجاح" },
];
const emptyForm = { category: "news", title_ar: "", title_en: "", description_ar: "", description_en: "", event_date: "", location_ar: "", location_en: "", external_url: "", content_type: "", is_published: true, image: null };
const fieldClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

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
  const [page, setPage] = useState(1);
  const pageSize = 2;
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
  useEffect(() => { if (lockedCategory) setCategory(lockedCategory); }, [lockedCategory]);
  useEffect(() => { setPage(1); }, [category]);

  const openCreate = () => { setEditingId(null); setForm({ ...emptyForm, category: lockedCategory ?? category }); setPreview(null); setShowForm(true); };
  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ category: item.category, title_ar: item.title_ar ?? "", title_en: item.title_en ?? "", description_ar: item.description_ar ?? "", description_en: item.description_en ?? "", event_date: item.event_date ? item.event_date.slice(0, 16) : "", location_ar: item.location_ar ?? "", location_en: item.location_en ?? "", external_url: item.external_url ?? "", content_type: item.content_type ?? "", is_published: Boolean(item.is_published), image: null });
    setPreview(item.image_url ?? null); setShowForm(true);
  };
  const closeForm = () => { if (!saving) { setShowForm(false); setEditingId(null); setPreview(null); } };

  const submit = async (event) => {
    event.preventDefault(); setSaving(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (key !== "image" || value) payload.append(key, key === "is_published" ? (value ? "1" : "0") : value ?? ""); });
    try {
      if (editingId) await apiAdmin.post(`/media-items/${editingId}`, payload);
      else await apiAdmin.post("/media-items", payload);
      toast.success(editingId ? "تم تحديث المحتوى" : "تمت إضافة المحتوى"); closeForm(); await loadItems();
    } catch (error) { const errors = error.response?.data?.errors; toast.error(errors ? Object.values(errors).flat()[0] : "تعذر حفظ المحتوى"); }
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
            <div className="grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-700">{item.image_url ? <img src={item.image_url} alt="" className="h-full w-full object-cover" /> : <CalendarDays size={24} />}</div>
            <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h2 className="font-black text-slate-900">{item.title_ar}</h2><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${item.is_published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{item.is_published ? <Eye size={12} /> : <EyeOff size={12} />}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.description_ar || "بدون وصف"}</p><div className="mt-4 flex gap-2"><button onClick={() => openEdit(item)} className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:text-emerald-700"><Pencil size={15} /></button><button onClick={() => remove(item)} className="rounded-lg bg-red-50 p-2 text-red-600"><Trash2 size={15} /></button></div></div>
          </article>)}
        </div>
      )}
      {!loading && items.length > pageSize && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
      {showForm && <div onMouseDown={(e) => e.target === e.currentTarget && closeForm()} className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"><form onSubmit={submit} className="my-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-6 flex justify-between"><h2 className="text-xl font-black">{editingId ? "تعديل المحتوى" : "إضافة محتوى"}</h2><button type="button" onClick={closeForm}><X /></button></div><div className="grid gap-5 md:grid-cols-2">
        {lockedCategory ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"><span className="text-xs font-bold text-emerald-600">القسم</span><p className="mt-1 text-sm font-black text-emerald-900">{activeCategory?.label}</p></div> : <Field label="القسم *"><select className={fieldClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></Field>}
        <Field label="التاريخ"><input type="datetime-local" className={fieldClass} value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} /></Field>
        <Field label="العنوان بالعربية *"><input className={fieldClass} required value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} /></Field><Field label="العنوان بالإنجليزية"><input dir="ltr" className={fieldClass} value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></Field>
        <Field label="الوصف بالعربية"><textarea rows="4" className={fieldClass} value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} /></Field><Field label="الوصف بالإنجليزية"><textarea dir="ltr" rows="4" className={fieldClass} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></Field>
        <Field label="المكان بالعربية"><input className={fieldClass} value={form.location_ar} onChange={(e) => setForm({ ...form, location_ar: e.target.value })} /></Field><Field label="المكان بالإنجليزية"><input dir="ltr" className={fieldClass} value={form.location_en} onChange={(e) => setForm({ ...form, location_en: e.target.value })} /></Field>
        <Field label="رابط خارجي"><input dir="ltr" type="url" className={fieldClass} value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} /></Field><Field label="نوع الإصدار"><input className={fieldClass} placeholder="PDF" value={form.content_type} onChange={(e) => setForm({ ...form, content_type: e.target.value })} /></Field>
        <Field label="الصورة"><label className="flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">{preview ? <img src={preview} alt="" className="h-full w-full object-contain" /> : <span className="flex gap-2 text-sm font-bold text-slate-500"><ImagePlus size={19} /> اختر صورة</span>}<input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0] ?? null; setForm({ ...form, image: file }); setPreview(file ? URL.createObjectURL(file) : null); }} /></label></Field>
        <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-5 w-5 accent-emerald-600" /><span className="text-sm font-bold">نشر المحتوى للزوار</span></label>
      </div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={closeForm} className="rounded-xl border px-5 py-3 text-sm font-bold">إلغاء</button><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white">{saving && <Loader2 size={17} className="animate-spin" />} حفظ</button></div></form></div>}
    </div>
  );
};
const Field = ({ label, children }) => <label className="space-y-2"><span className="text-sm font-bold text-slate-700">{label}</span>{children}</label>;
const Pagination = ({ page, totalPages, onChange }) => <nav className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><button disabled={page === 1} onClick={() => onChange(page - 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronRight size={18} /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => onChange(number)} className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${page === number ? "bg-emerald-600 text-white" : "border border-slate-200 text-slate-600"}`}>{number}</button>)}<button disabled={page === totalPages} onClick={() => onChange(page + 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronLeft size={18} /></button></nav>;
export default ManageMediaCenter;
