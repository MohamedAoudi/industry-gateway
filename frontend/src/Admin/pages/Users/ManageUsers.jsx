import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Loader2,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import apiAdmin from "../../../api/apiAdmin";
import RegistrationProfileFields from "../../../Authentification/RegistrationProfileFields";
import { buildAdminUserPayload, registrationLabels, registrationTypes } from "../../../data/registrationProfiles";

const accountTypeLabels = {
  ...Object.fromEntries(registrationTypes.map(type => [type.value, type.label.ar])),
  regular: "حساب عادي",
  factory: "مصنع",
  industrial_company: "مؤسسة صناعية",
  production_company: "شركة إنتاجية",
  expert: "خبير ومختص",
  funding_entity: "جهة تمويلية",
  other: "آخر",
};

const profileFieldLabels = {
  ...Object.fromEntries(Object.entries(registrationLabels).map(([key, value]) => [key, value.ar])),
  organization_name: "اسم الجهة",
  activity_field: "مجال النشاط",
  products: "المنتجات",
  country: "الدولة",
  registration_number: "رقم التسجيل",
  production_capacity: "الطاقة الإنتاجية",
  specialty: "التخصص",
  years_experience: "سنوات الخبرة",
  funding_scope: "نطاق التمويل",
  funding_programs: "برامج التمويل",
  other_type: "الصفة",
};

const emptyForm = {
  prenomUtilisateur: "",
  nomUtilisateur: "",
  email: "",
  password: "",
  role: "user",
  is_active: true,
  registration_status: 'approved',
  telephone: "",
  account_type: "",
  profile_data: {},
};

const fieldClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00C9F2] focus:ring-4 focus:ring-[#00C9F2]/10";

const downloadUserFile = async (user, kind) => {
  try {
    const { data } = await apiAdmin.get(`/users/${user.idUtilisateur}/files/${kind}`, { responseType: 'blob' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = user.profile_data[`${kind}_name`] || `${kind}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch { toast.error('تعذر تنزيل الملف'); }
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState({ total: 0, users: 0, supervisors: 0 });
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [approvingId, setApprovingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data } = await apiAdmin.get("/admin/users", {
        params: { page, per_page: 10, search: debouncedSearch || undefined, role: role || undefined, status: status || undefined },
      });
      setUsers(data.data ?? []);
      setMeta(data.meta ?? { current_page: 1, last_page: 1, total: 0 });
      setSummary(data.summary ?? { total: 0, users: 0, supervisors: 0 });
    } catch (error) {
      toast.error("تعذر تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, debouncedSearch, role, status]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role, status]);

  const pageNumbers = useMemo(() => Array.from(
    { length: Math.min(5, meta.last_page) },
    (_, index) => Math.min(Math.max(1, page - 2), Math.max(1, meta.last_page - 4)) + index
  ), [meta.last_page, page]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (user) => {
    setEditingId(user.idUtilisateur);
    setForm({
      prenomUtilisateur: user.prenomUtilisateur ?? "",
      nomUtilisateur: user.nomUtilisateur ?? "",
      email: user.email ?? "",
      password: "",
      role: user.role ?? "user",
      is_active: user.is_active !== false,
      registration_status: user.registration_status || 'approved',
      telephone: user.telephone ?? "",
      account_type: user.account_type ?? "",
      profile_data: user.profile_data ?? {},
    });
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  useEffect(() => {
    if (!showForm) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeForm();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [showForm, saving]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = buildAdminUserPayload(form);

    try {
      if (editingId) {
        payload.append('_method', 'PUT');
        await apiAdmin.post(`/admin/users/${editingId}`, payload);
        toast.success("تم تحديث المستخدم بنجاح");
      } else {
        await apiAdmin.post("/admin/users", payload);
        toast.success("تمت إضافة المستخدم بنجاح");
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadUsers();
    } catch (error) {
      const errors = error.response?.data?.errors;
      toast.error(errors ? Object.values(errors).flat()[0] : error.response?.data?.message || "تعذر حفظ المستخدم");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (user) => {
    if (!window.confirm(`هل تريد حذف المستخدم «${user.prenomUtilisateur} ${user.nomUtilisateur}»؟`)) return;
    try {
      await apiAdmin.delete(`/admin/users/${user.idUtilisateur}`);
      toast.success("تم حذف المستخدم");
      if (users.length === 1 && page > 1) setPage((current) => current - 1);
      else await loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "تعذر حذف المستخدم");
    }
  };

  const approveUser = async (user) => {
    setApprovingId(user.idUtilisateur);
    try {
      await apiAdmin.patch(`/admin/users/${user.idUtilisateur}/approve`);
      toast.success('تم قبول طلب التسجيل وتفعيل الحساب');
      if (status === 'pending' && users.length === 1 && page > 1) setPage(current => current - 1);
      else await loadUsers();
    } catch (error) { toast.error(error.response?.data?.message || 'تعذر قبول طلب التسجيل'); }
    finally { setApprovingId(null); }
  };

  return (
    <div dir="rtl" className="mx-auto max-w-7xl space-y-6">
      <Toaster position="top-center" />

      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#007A94]"><UsersRound size={18} /> إدارة النظام</div>
          <h1 className="text-2xl font-black text-slate-900">إدارة المستخدمين</h1>
          <p className="mt-2 text-sm text-slate-500">إضافة المستخدمين وتعديل بياناتهم وصلاحياتهم.</p>
        </div>
        <button type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C9F2] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#00C9F2]/20 hover:bg-[#007A94]"><Plus size={18} /> إضافة مستخدم</button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={UsersRound} label="جميع الحسابات" value={summary.total} />
        <SummaryCard icon={UserRound} label="المستخدمون" value={summary.users} />
        <SummaryCard icon={ShieldCheck} label="المديرون" value={summary.supervisors} />
        <SummaryCard icon={UserRound} label="طلبات بانتظار الموافقة" value={summary.pending || 0} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_200px_200px]">
          <label className="relative">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className={`${fieldClass} pr-11`} placeholder="البحث بالاسم أو البريد أو بيانات الحساب..." />
          </label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className={fieldClass}>
            <option value="">جميع الصلاحيات</option>
            <option value="user">مستخدم</option>
            <option value="superviseur">مدير</option>
          </select>
          <select aria-label="حالة طلب التسجيل" value={status} onChange={event => setStatus(event.target.value)} className={fieldClass}>
            <option value="">جميع الحالات</option>
            <option value="pending">بانتظار الموافقة</option>
            <option value="approved">مقبول ونشط</option>
            <option value="inactive">معطل</option>
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-64 items-center justify-center text-[#007A94]"><Loader2 size={30} className="animate-spin" /></div>
        ) : users.length === 0 ? (
          <div className="p-14 text-center text-slate-500">لا يوجد مستخدمون مطابقون للبحث.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-right text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                <tr><th className="p-4">المستخدم</th><th className="p-4">بيانات الحساب</th><th className="p-4">الهاتف</th><th className="p-4">الصلاحية</th><th className="p-4 text-center">الإجراءات</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.idUtilisateur} className="hover:bg-slate-50/70">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ECFCFF] font-black text-[#007A94]">{user.prenomUtilisateur?.[0]}{user.nomUtilisateur?.[0]}</span>
                        <div><p className="font-black text-slate-900">{user.prenomUtilisateur} {user.nomUtilisateur}</p><p className="mt-1 text-xs text-slate-500" dir="ltr">{user.email}</p></div>
                      </div>
                    </td>
                    <td className="max-w-sm p-4 align-top">
                      <span className="inline-flex rounded-full bg-sky-50 px-3 py-1.5 text-xs font-black text-sky-700">
                        {accountTypeLabels[user.account_type] || "غير محدد"}
                      </span>
                      {Object.keys(user.profile_data || {}).length > 0 && (
                        <dl className="mt-3 grid gap-1.5 text-xs">
                          {Object.entries(user.profile_data).filter(([key]) => !['cv_path', 'cv_name', 'logo_path', 'logo_name', 'attachment_path', 'attachment_name'].includes(key)).map(([key, value]) => (
                            <div key={key} className="flex gap-2">
                              <dt className="shrink-0 font-bold text-slate-500">{profileFieldLabels[key] || key}:</dt>
                              <dd className="text-slate-700">{value || "—"}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {['cv', 'logo', 'attachment'].filter(kind => user.profile_data?.[`${kind}_path`]).map(kind => (
                        <button key={kind} type="button" onClick={() => downloadUserFile(user, kind)} className="mt-3 block text-xs font-bold text-[#007A94] hover:underline">
                          {kind === 'cv' ? 'Télécharger PDF — السيرة الذاتية' : kind === 'logo' ? 'تنزيل الشعار' : 'تنزيل المرفقات (PDF)'}
                        </button>
                      ))}
                    </td>
                    <td className="p-4 text-slate-600" dir="ltr">{user.telephone || "—"}</td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${user.role === "superviseur" ? "bg-amber-50 text-amber-700" : "bg-[#ECFCFF] text-[#007A94]"}`}>{user.role === "superviseur" ? <ShieldCheck size={13} /> : <UserRound size={13} />}{user.role === "superviseur" ? "مدير" : "مستخدم"}</span>
                        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${user.registration_status === 'pending' ? 'bg-amber-50 text-amber-800' : user.is_active !== false ? "bg-[#ECFCFF] text-[#007A94]" : "bg-red-50 text-red-700"}`}>{user.registration_status === 'pending' ? 'بانتظار الموافقة' : user.is_active !== false ? "نشط" : "معطل"}</span>
                        {user.registration_status === 'pending' && <button type="button" disabled={approvingId !== null} onClick={() => approveUser(user)} className="inline-flex items-center gap-2 rounded-xl bg-[#007A94] px-3 py-2 text-xs font-bold text-white hover:bg-[#006176] disabled:opacity-50">
                          {approvingId === user.idUtilisateur ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />} قبول التسجيل
                        </button>}
                      </div>
                    </td>
                    <td className="p-4"><div className="flex justify-center gap-2"><button type="button" onClick={() => openEdit(user)} className="rounded-lg bg-slate-100 p-2.5 text-slate-600 hover:bg-[#ECFCFF] hover:text-[#007A94]" title="تعديل"><Pencil size={16} /></button><button type="button" onClick={() => remove(user)} className="rounded-lg bg-red-50 p-2.5 text-red-600 hover:bg-red-100" title="حذف"><Trash2 size={16} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {!loading && meta.last_page > 1 && (
        <nav className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <button disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronRight size={18} /></button>
          {pageNumbers.map((number) => <button key={number} onClick={() => setPage(number)} className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black ${page === number ? "bg-[#00C9F2] text-white" : "border border-slate-200 text-slate-600"}`}>{number}</button>)}
          <button disabled={page === meta.last_page} onClick={() => setPage((current) => current + 1)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 disabled:opacity-40"><ChevronLeft size={18} /></button>
        </nav>
      )}

      {showForm && (
        <div onMouseDown={(e) => e.target === e.currentTarget && closeForm()} className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form onSubmit={submit} className="my-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-black text-slate-900">{editingId ? "تعديل المستخدم" : "إضافة مستخدم"}</h2><p className="mt-1 text-xs text-slate-500">الحقول التي تحمل علامة * مطلوبة.</p></div><button type="button" onClick={closeForm} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button></div>
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="الاسم الأول *"><input className={fieldClass} required value={form.prenomUtilisateur} onChange={(e) => setForm({ ...form, prenomUtilisateur: e.target.value })} /></FormField>
              <FormField label="اسم العائلة *"><input className={fieldClass} required value={form.nomUtilisateur} onChange={(e) => setForm({ ...form, nomUtilisateur: e.target.value })} /></FormField>
              <FormField label="البريد الإلكتروني *"><input dir="ltr" type="email" className={fieldClass} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></FormField>
              <FormField label={editingId ? "كلمة مرور جديدة" : "كلمة المرور *"}><div className="relative"><KeyRound size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" /><input dir="ltr" type="password" minLength="8" className={`${fieldClass} pr-11`} required={!editingId} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editingId ? "اتركها فارغة دون تغيير" : "8 أحرف على الأقل"} /></div></FormField>
              <FormField label="الصلاحية *"><select className={fieldClass} required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="user">مستخدم</option><option value="superviseur">مدير</option></select></FormField>
              <FormField label="حالة الحساب *"><select className={fieldClass} value={form.is_active ? "1" : "0"} onChange={(e) => setForm({ ...form, is_active: e.target.value === "1" })}><option value="1">مقبول ونشط</option><option value="0">{form.registration_status === 'pending' ? 'بانتظار الموافقة' : 'معطل'}</option></select></FormField>
              <FormField label="رقم الهاتف"><input dir="ltr" className={fieldClass} value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} /></FormField>
              <div className="md:col-span-2">
                <RegistrationProfileFields
                  formData={form}
                  setFormData={setForm}
                  inputClass={fieldClass}
                  required={form.role === "user"}
                />
              </div>
            </div>
            <div className="mt-7 flex justify-end gap-3 border-t border-slate-100 pt-6"><button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">إلغاء</button><button disabled={saving} className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-[#00C9F2] px-5 py-3 text-sm font-black text-white disabled:opacity-60">{saving && <Loader2 size={17} className="animate-spin" />}{editingId ? "حفظ التعديلات" : "إضافة المستخدم"}</button></div>
          </form>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({ icon: Icon, label, value }) => <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ECFCFF] text-[#007A94]"><Icon size={22} /></span><div><p className="text-2xl font-black text-slate-900">{value}</p><p className="mt-1 text-xs font-bold text-slate-500">{label}</p></div></article>;
const FormField = ({ label, children }) => <label className="space-y-2"><span className="text-sm font-bold text-slate-700">{label}</span>{children}</label>;

export default ManageUsers;
