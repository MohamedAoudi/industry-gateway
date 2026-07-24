import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, UserRoundPlus, X } from "lucide-react";
import { Link } from "react-router-dom";
import apiAdmin from "../api/apiAdmin";
import RegistrationProfileFields, { emptyRegistrationForm } from "./RegistrationProfileFields";

const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";

const RegistrationModal = ({ open, onClose }) => {
  const [form, setForm] = useState(emptyRegistrationForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !saving) onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open, saving]);

  useEffect(() => {
    if (!open) {
      setForm(emptyRegistrationForm);
      setError("");
      setRegistered(false);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await apiAdmin.post("/register", form);
      setRegistered(true);
      setForm(emptyRegistrationForm);
    } catch (requestError) {
      const errors = requestError.response?.data?.errors;
      setError(
        errors
          ? Object.values(errors).flat()[0]
          : requestError.response?.data?.message || "تعذر إنشاء الحساب. يرجى المحاولة مجدداً."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/70 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && !saving && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="إنشاء حساب جديد"
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl">
        <header className="relative overflow-hidden bg-gradient-to-l from-emerald-700 to-teal-600 px-6 py-7 text-white sm:px-8">
          <div className="pointer-events-none absolute -left-12 -top-20 h-48 w-48 rounded-full bg-white/10" />
          <button type="button" onClick={onClose} disabled={saving} className="absolute left-5 top-5 rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20 disabled:opacity-50" aria-label="إغلاق">
            <X size={20} />
          </button>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15"><UserRoundPlus size={23} /></span>
          <h2 className="mt-4 text-2xl font-black">إنشاء حساب جديد</h2>
          <p className="mt-2 text-sm text-emerald-50/80">اختر نوع حسابك وأدخل معلوماتك للانضمام إلى البوابة.</p>
        </header>

        {registered ? (
          <div className="p-8 text-center sm:p-12">
            <CheckCircle2 size={58} className="mx-auto text-emerald-600" />
            <h3 className="mt-5 text-2xl font-black text-slate-900">تم إنشاء الحساب بنجاح</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">يمكنك الآن تسجيل الدخول باستعمال بريدك الإلكتروني وكلمة المرور.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/login" onClick={onClose} className="rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white hover:bg-emerald-700">تسجيل الدخول</Link>
              <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">العودة إلى الصفحة الرئيسية</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 p-6 sm:p-8">
            {error && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</div>}

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-bold text-slate-700">الاسم الكامل *</span>
                <input className={inputClass} value={form.nomComplet} onChange={(event) => setForm({ ...form, nomComplet: event.target.value })} placeholder="مثال: محمد أحمد" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-slate-700">البريد الإلكتروني *</span>
                <input dir="ltr" type="email" className={inputClass} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="mail@example.com" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-bold text-slate-700">كلمة المرور *</span>
                <input dir="ltr" type="password" minLength={6} className={inputClass} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="6 أحرف على الأقل" required />
              </label>
            </div>

            <RegistrationProfileFields formData={form} setFormData={setForm} inputClass={inputClass} />

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={onClose} disabled={saving} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 disabled:opacity-50">إلغاء</button>
              <button disabled={saving} className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-black text-white hover:bg-emerald-700 disabled:opacity-60">
                {saving && <Loader2 size={17} className="animate-spin" />}
                {saving ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
