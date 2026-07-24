import { useEffect, useMemo, useState } from "react";
import {
  Database,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import apiAdmin from "../../../api/apiAdmin";

const categories = [
  { value: "research-innovation-ai", label: "مراكز البحث العلمي والابتكار والذكاء الصناعي" },
  { value: "universities", label: "الجامعات والمؤسسات الأكاديمية والعلمية" },
  { value: "incubators-technology-labs", label: "الحاضنات والأقطاب التكنولوجية والمختبرات" },
  { value: "programs-initiatives-strategies", label: "البرامج والمبادرات والاستراتيجيات" },
  { value: "industrial-property-patents", label: "مكاتب الملكية الصناعية وبراءات الاختراع" },
  { value: "experts-specialists", label: "قاعدة الخبراء والمختصين" },
  { value: "supporting-bodies", label: "الجهات الداعمة للبحث العلمي والابتكار" },
  { value: "industrial-institutions", label: "المؤسسات الصناعية" },
];

const countryFlagCodes = {
  "المملكة الأردنية الهاشمية": "jo",
  "دولة الامارات العربية المتحدة": "ae",
  "مملكة البحرين": "bh",
  "الجمهورية التونسية": "tn",
  "الجمهورية الجزائرية الديمقراطية الشعبية": "dz",
  "جمهورية جيبوتي": "dj",
  "المملكة العربية السعودية": "sa",
  "جمهورية السودان": "sd",
  "الجمهورية العربية السورية": "sy",
  "جمهورية الصومال": "so",
  "جمهورية العراق": "iq",
  "سلطنة عمان": "om",
  "دولة فلسطين": "ps",
  "دولة قطر": "qa",
  "دولة الكويت": "kw",
  "الجمهورية اللبنانية": "lb",
  "دولة ﻟﻴﺒﻴﺎ": "ly",
  "جمهورية مصر العربية": "eg",
  "المملكة المغربية": "ma",
  "الجمهورية الإسلامية الموريتانية": "mr",
  "الجمهورية اليمنية": "ye",
};

const getCountryFlagUrl = (countryName) => {
  const code = countryFlagCodes[countryName];
  return code ? `https://flagcdn.com/w40/${code}.png` : null;
};

const legacySources = {
  "research-innovation-ai": [
    { list: "/scientificResearchInnovationCenters?per_page=100", resource: "/scientificResearchInnovationCenters", type: "center" },
    { list: "/centersExcellenceArtificialIntelligence?per_page=100", resource: "/centersExcellenceArtificialIntelligence", type: "center" },
  ],
  universities: [
    { list: "/ministriesHigherEducationScientificResearch?per_page=100", resource: "/ministriesHigherEducationScientificResearch", type: "center" },
  ],
  "incubators-technology-labs": [],
  "programs-initiatives-strategies": [],
  "industrial-property-patents": [
    { list: "/industrialPropertyPatentOffices?per_page=100", resource: "/industrialPropertyPatentOffices", type: "center" },
  ],
  "experts-specialists": [
    { list: "/researchers", resource: "/researchers", type: "researcher" },
  ],
  "supporting-bodies": [
    { list: "/supportingBodiesScientificResearch?per_page=100", resource: "/supportingBodiesScientificResearch", type: "center" },
  ],
  "industrial-institutions": [
    { list: "/companies", resource: "/companies", type: "company" },
  ],
};

const normalizeEntry = (record, source, category) => {
  if (source.type === "new") return { ...record, display_order: Number(record.display_order ?? 1000), __source: source };

  const isResearcher = source.type === "researcher";
  const isCompany = source.type === "company";
  return {
    ...record,
    id: isResearcher ? record.idResearcher : isCompany ? record.idCompany : record.idCenter,
    category,
    title_ar: isResearcher ? record.full_name : isCompany ? record.company_name : record.titre_ar,
    title_en: isResearcher || isCompany ? "" : record.titre_en,
    description_ar: isResearcher ? record.research_field : isCompany ? record.industry_sector : record.description_ar,
    description_en: isResearcher || isCompany ? "" : record.description_en,
    country_id: isResearcher || isCompany ? "" : record.idPays,
    country: isResearcher || isCompany ? { nomPays: record.country } : record.pays,
    image_url: isResearcher || isCompany ? null : record.photo_url,
    display_order: Number(record.display_order ?? 1000),
    is_published: true,
    __source: source,
  };
};

const emptyForm = {
  category: categories[0].value,
  title_ar: "",
  title_en: "",
  description_ar: "",
  description_en: "",
  email: "",
  url: "",
  country_id: "",
  is_published: true,
  display_order: 1000,
  image: null,
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

const ManageResearchDatabase = ({ lockedCategory }) => {
  const activeCategory = categories.find((item) => item.value === lockedCategory);
  const [entries, setEntries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [category, setCategory] = useState(lockedCategory ?? "all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingSource, setEditingSource] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const loadEntries = async () => {
    setLoading(true);
    try {
      const params = { per_page: 100 };
      if (category !== "all") params.category = category;
      const sources = [
        { list: "/research-database/admin", type: "new" },
        ...(legacySources[category] ?? []),
      ];
      const responses = await Promise.allSettled(
        sources.map((source) => apiAdmin.get(source.list, source.type === "new" ? { params } : undefined))
      );
      const records = responses.flatMap((result, index) => {
        if (result.status !== "fulfilled") return [];
        const data = result.value.data?.data ?? result.value.data ?? [];
        return Array.isArray(data)
          ? data.map((record) => normalizeEntry(record, sources[index], category))
          : [];
      });
      setEntries(records.sort((first, second) =>
        (first.display_order - second.display_order)
        || String(first.title_ar || "").localeCompare(String(second.title_ar || ""), "ar")
      ));
    } catch (error) {
      toast.error("تعذر تحميل سجلات قاعدة البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCategory(lockedCategory ?? "all");
  }, [lockedCategory]);

  useEffect(() => {
    loadEntries();
  }, [category]);

  useEffect(() => {
    apiAdmin
      .get("/pays")
      .then(({ data }) => setCountries(Array.isArray(data) ? data : []))
      .catch(() => toast.error("تعذر تحميل قائمة الدول"));
  }, []);

  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const visibleEntries = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return entries;
    return entries.filter((entry) =>
      [entry.title_ar, entry.title_en, entry.description_ar, entry.country?.nomPays]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase().includes(query))
    );
  }, [entries, search]);

  const totalPages = Math.max(1, Math.ceil(visibleEntries.length / pageSize));
  const paginatedEntries = visibleEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const openCreate = () => {
    setEditingId(null);
    setEditingSource(null);
    setForm({ ...emptyForm, category: lockedCategory ?? (category === "all" ? categories[0].value : category) });
    setPreview(null);
    setShowForm(true);
  };

  const openEdit = (entry) => {
    setEditingId(entry.id);
    setEditingSource(entry.__source);
    setForm({
      category: entry.category,
      title_ar: entry.title_ar ?? "",
      title_en: entry.title_en ?? "",
      description_ar: entry.description_ar ?? "",
      description_en: entry.description_en ?? "",
      email: entry.email ?? "",
      url: entry.url ?? "",
      country_id: entry.country_id || countries.find((item) => item.nomPays === entry.country?.nomPays)?.idPays || "",
      is_published: Boolean(entry.is_published),
      display_order: Number(entry.display_order ?? 1000),
      image: null,
    });
    setPreview(entry.image_url ?? null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingSource(null);
    setForm(emptyForm);
    setPreview(null);
  };

  useEffect(() => {
    if (!showForm) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !saving) closeForm();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [showForm, saving]);

  const handleImage = (event) => {
    const file = event.target.files?.[0] ?? null;
    setForm((current) => ({ ...current, image: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const submit = async (event) => {
    event.preventDefault();
    const normalizeName = (value) => String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
    const submittedNames = [form.title_ar, form.title_en].map(normalizeName).filter(Boolean);
    const duplicateEntry = entries.find((entry) => {
      const isCurrentEntry = editingId
        && entry.id === editingId
        && entry.__source?.type === editingSource?.type
        && entry.__source?.resource === editingSource?.resource;
      if (isCurrentEntry || entry.category !== form.category) return false;
      const existingNames = [entry.title_ar, entry.title_en].map(normalizeName).filter(Boolean);
      return submittedNames.some((name) => existingNames.includes(name));
    });
    if (duplicateEntry) {
      toast.error("يوجد مركز أو سجل بنفس الاسم داخل هذه الفئة");
      return;
    }

    setSaving(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && !value) return;
      payload.append(key, key === "is_published" ? (value ? "1" : "0") : value ?? "");
    });

    try {
      if (editingId) {
        if (editingSource?.type === "researcher") {
          const selectedCountry = countries.find((item) => String(item.idPays) === String(form.country_id));
          await apiAdmin.put(`${editingSource.resource}/${editingId}`, {
            full_name: form.title_ar || form.title_en,
            email: form.email || null,
            research_field: form.description_ar || form.description_en || "",
            country: selectedCountry?.nomPays || null,
            display_order: form.display_order,
          });
        } else if (editingSource?.type === "company") {
          const selectedCountry = countries.find((item) => String(item.idPays) === String(form.country_id));
          await apiAdmin.put(`${editingSource.resource}/${editingId}`, {
            company_name: form.title_ar || form.title_en,
            industry_sector: form.description_ar || form.description_en || null,
            email: form.email || null,
            country: selectedCountry?.nomPays || null,
            display_order: form.display_order,
          });
        } else if (editingSource?.type === "center") {
          const legacyPayload = new FormData();
          legacyPayload.append("titre_ar", form.title_ar);
          legacyPayload.append("titre_en", form.title_en);
          legacyPayload.append("description_ar", form.description_ar);
          legacyPayload.append("description_en", form.description_en);
          legacyPayload.append("url", form.url);
          legacyPayload.append("idPays", form.country_id);
          legacyPayload.append("display_order", form.display_order);
          if (form.image) legacyPayload.append("photo", form.image);
          await apiAdmin.post(`${editingSource.resource}/${editingId}`, legacyPayload);
        } else {
          await apiAdmin.post(`/research-database/${editingId}`, payload);
        }
        toast.success("تم تحديث السجل بنجاح");
      } else {
        await apiAdmin.post("/research-database", payload);
        toast.success("تمت إضافة السجل بنجاح");
      }
      closeForm();
      await loadEntries();
    } catch (error) {
      const errors = error.response?.data?.errors;
      const message = errors ? Object.values(errors).flat()[0] : "تعذر حفظ السجل";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (entry) => {
    if (!window.confirm(`هل تريد حذف «${entry.title_ar}»؟`)) return;
    try {
      const endpoint = entry.__source?.type === "new"
        ? `/research-database/${entry.id}`
        : `${entry.__source.resource}/${entry.id}`;
      await apiAdmin.delete(endpoint);
      setEntries((current) => current.filter((item) => item !== entry));
      toast.success("تم حذف السجل");
    } catch (error) {
      toast.error("تعذر حذف السجل");
    }
  };

  const categoryLabel = (value) => categories.find((item) => item.value === value)?.label ?? value;

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-6">
      <Toaster position="top-center" />

      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-700">
            <Database size={18} /> قاعدة بيانات البحث العلمي
          </div>
          <h1 className="text-2xl font-black text-slate-900">{activeCategory ? activeCategory.label : "إدارة قاعدة البيانات"}</h1>
          <p className="mt-2 text-sm text-slate-500">إضافة وتعديل ونشر سجلات هذه الفئة بشكل مستقل.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
          <Plus size={18} /> إضافة سجل جديد
        </button>
      </header>

      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) closeForm();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={editingId ? "تعديل السجل" : "إضافة سجل جديد"}
        >
        <form onSubmit={submit} className="my-auto w-full max-w-4xl rounded-2xl border border-emerald-200 bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">{editingId ? "تعديل السجل" : "إضافة سجل جديد"}</h2>
            <button type="button" onClick={closeForm} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {lockedCategory ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 md:col-span-2">
                <span className="text-xs font-bold text-emerald-600">الفئة</span>
                <p className="mt-1 text-sm font-black text-emerald-900">{activeCategory?.label}</p>
              </div>
            ) : (
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-bold text-slate-700">الفئة *</span>
                <select className={fieldClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                  {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
            )}
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">الاسم بالعربية *</span>
              <input className={fieldClass} value={form.title_ar} onChange={(e) => setForm({ ...form, title_ar: e.target.value })} required />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">الاسم بالإنجليزية</span>
              <input dir="ltr" className={fieldClass} value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">الوصف بالعربية</span>
              <textarea rows="4" className={fieldClass} value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">الوصف بالإنجليزية</span>
              <textarea dir="ltr" rows="4" className={fieldClass} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">الدولة</span>
              <select className={fieldClass} value={form.country_id} onChange={(e) => setForm({ ...form, country_id: e.target.value })}>
                <option value="">بدون دولة</option>
                {countries.map((item) => <option key={item.idPays} value={item.idPays}>{item.nomPays}</option>)}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">ترتيب الظهور *</span>
              <input
                type="number"
                min="1"
                max="999999"
                className={fieldClass}
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                required
              />
              <span className="block text-xs text-slate-500">الرقم الأصغر يظهر أولاً للمستخدم.</span>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">البريد الإلكتروني</span>
              <input dir="ltr" type="email" className={fieldClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">رابط الموقع</span>
              <input dir="ltr" type="url" className={fieldClass} value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://example.org" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">الصورة أو الشعار</span>
              <span className="flex min-h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-500 hover:border-emerald-400">
                {preview ? <img src={preview} alt="معاينة" className="h-28 w-full object-contain p-2" /> : <span className="flex items-center gap-2 text-sm font-bold"><ImagePlus size={20} /> اختر صورة</span>}
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </span>
            </label>
            {(!editingSource || editingSource.type === "new") && (
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-5 w-5 accent-emerald-600" />
                <span className="text-sm font-bold text-slate-700">نشر السجل وإظهاره للزوار</span>
              </label>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">إلغاء</button>
            <button disabled={saving} className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white disabled:opacity-60">
              {saving && <Loader2 size={17} className="animate-spin" />}{editingId ? "حفظ التعديلات" : "إضافة السجل"}
            </button>
          </div>
        </form>
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className={`grid gap-4 ${lockedCategory ? "" : "lg:grid-cols-[1fr_320px]"}`}>
          <label className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className={`${fieldClass} pr-11`} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث بالاسم أو الوصف أو الدولة..." />
          </label>
          {!lockedCategory && (
            <select className={fieldClass} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">جميع الفئات</option>
              {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          )}
        </div>
      </section>

      {loading ? (
        <div className="flex min-h-56 items-center justify-center rounded-2xl border bg-white text-emerald-700"><Loader2 className="animate-spin" size={30} /></div>
      ) : visibleEntries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">لا توجد سجلات في هذه الفئة.</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {paginatedEntries.map((entry) => (
            <article key={`${entry.__source?.resource || "new"}-${entry.id}`} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-700">
                {entry.image_url ? <img src={entry.image_url} alt="" className="h-full w-full object-contain p-1" /> : <Database size={24} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="font-black text-slate-900">{entry.title_ar}</h2>
                    <p className="mt-1 text-xs font-bold text-emerald-700">{categoryLabel(entry.category)}</p>
                    <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
                      الترتيب: {entry.display_order}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${entry.is_published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {entry.is_published ? <Eye size={12} /> : <EyeOff size={12} />}{entry.is_published ? "منشور" : "مسودة"}
                  </span>
                </div>
                {entry.country?.nomPays && <div className="mt-3"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">{getCountryFlagUrl(entry.country.nomPays) ? <img src={getCountryFlagUrl(entry.country.nomPays)} alt="" className="h-4 w-6 rounded-sm border border-slate-200 object-cover shadow-sm" /> : <MapPin size={13} />}{entry.country.nomPays}</span></div>}
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{entry.description_ar || "لا يوجد وصف"}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => openEdit(entry)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"><Pencil size={14} /> تعديل</button>
                  <button onClick={() => remove(entry)} className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"><Trash2 size={14} /> حذف</button>
                  {entry.url && <a href={entry.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-500"><ExternalLink size={14} /> الموقع</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && visibleEntries.length > pageSize && (
        <nav className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={17} /> السابق
          </button>
          {Array.from(
            { length: Math.min(5, totalPages) },
            (_, index) => Math.min(Math.max(1, currentPage - 2), Math.max(1, totalPages - 4)) + index
          ).map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${page === currentPage ? "bg-emerald-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300"}`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            التالي <ChevronLeft size={17} />
          </button>
        </nav>
      )}
    </div>
  );
};

export default ManageResearchDatabase;
