import { useEffect, useMemo, useState } from "react";
import {
  AtSign,
  AlertTriangle,
  BadgeCheck,
  Eye,
  EyeOff,
  Loader2,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  UserRound,
  UserX,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import apiAdmin, { clearAuthSession } from "../../../api/apiAdmin";

const emptyProfile = {
  prenomUtilisateur: "",
  nomUtilisateur: "",
  email: "",
  position: "",
  entite: "",
  telephone: "",
  role: "user",
};

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

const ProfilePage = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const [profile, setProfile] = useState(emptyProfile);
  const [passwords, setPasswords] = useState({ password: "", password_confirmation: "" });
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    let mounted = true;
    apiAdmin
      .get("/me")
      .then(({ data }) => {
        if (mounted) setProfile({ ...emptyProfile, ...(data.user ?? {}) });
      })
      .catch(() => toast.error(isRtl ? "تعذر تحميل الملف الشخصي" : "Unable to load your profile"))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [isRtl]);

  const initials = useMemo(() => {
    const first = profile.prenomUtilisateur?.trim()?.[0] ?? "";
    const last = profile.nomUtilisateur?.trim()?.[0] ?? "";
    return `${first}${last}`.toUpperCase() || "U";
  }, [profile.nomUtilisateur, profile.prenomUtilisateur]);

  const updateField = (field, value) => setProfile((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = {
        prenomUtilisateur: profile.prenomUtilisateur,
        nomUtilisateur: profile.nomUtilisateur,
        telephone: profile.telephone || null,
      };
      if (passwords.password) {
        payload.password = passwords.password;
        payload.password_confirmation = passwords.password_confirmation;
      }
      const { data } = await apiAdmin.put("/me", payload);
      setProfile({ ...emptyProfile, ...data.user });
      setPasswords({ password: "", password_confirmation: "" });
      localStorage.setItem("prenomUtilisateur", data.user.prenomUtilisateur);
      localStorage.setItem("nomUtilisateur", data.user.nomUtilisateur);
      localStorage.setItem("emailUtilisateur", data.user.email);
      toast.success(isRtl ? "تم تحديث الملف الشخصي" : "Profile updated successfully");
    } catch (error) {
      const errors = error.response?.data?.errors;
      toast.error(errors ? Object.values(errors).flat()[0] : isRtl ? "تعذر حفظ التغييرات" : "Unable to save changes");
    } finally {
      setSaving(false);
    }
  };

  const deactivateAccount = async (event) => {
    event.preventDefault();
    const expectedConfirmation = isRtl ? "حذف" : "DELETE";
    if (deleteConfirmation.trim() !== expectedConfirmation) return;
    setDeactivating(true);
    try {
      await apiAdmin.delete("/me");
      clearAuthSession();
      window.location.assign("/login?account_deactivated=1");
    } catch (error) {
      toast.error(error.response?.data?.message || (isRtl ? "تعذر تعطيل الحساب" : "Unable to deactivate the account"));
      setDeactivating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center text-emerald-700">
        <Loader2 size={34} className="animate-spin" />
      </div>
    );
  }

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-slate-50 px-4 pb-20 pt-28 sm:px-6">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-7 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl border border-white/20 bg-white/10 text-3xl font-black text-emerald-200 backdrop-blur-sm">
                {initials}
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-200"><BadgeCheck size={14} />{profile.role === "superviseur" ? (isRtl ? "مدير" : "Administrator") : (isRtl ? "مستخدم" : "User")}</span>
                </div>
                <h1 className="text-3xl font-black sm:text-4xl">{profile.prenomUtilisateur} {profile.nomUtilisateur}</h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-emerald-50/70"><Mail size={15} />{profile.email}</p>
              </div>
            </div>
            {profile.role === "superviseur" && (
              <Link to="/admin/dashboard" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-emerald-900">
                <LayoutDashboard size={18} />
                {isRtl ? "لوحة الإدارة" : "Admin dashboard"}
              </Link>
            )}
          </div>
        </section>

        <form onSubmit={submit} className="relative mx-auto -mt-4 max-w-5xl rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-wider text-emerald-600">{isRtl ? "إعدادات الحساب" : "Account settings"}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">{isRtl ? "الملف الشخصي" : "My profile"}</h2>
            <p className="mt-2 text-sm text-slate-500">{isRtl ? "حدّث اسمك وهاتفك وكلمة المرور." : "Update your name, phone, and password."}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ProfileField icon={UserRound} label={isRtl ? "الاسم الأول" : "First name"}>
              <input className={fieldClass} value={profile.prenomUtilisateur} onChange={(e) => updateField("prenomUtilisateur", e.target.value)} required />
            </ProfileField>
            <ProfileField icon={UserRound} label={isRtl ? "اسم العائلة" : "Last name"}>
              <input className={fieldClass} value={profile.nomUtilisateur} onChange={(e) => updateField("nomUtilisateur", e.target.value)} required />
            </ProfileField>
            <ProfileField icon={AtSign} label={isRtl ? "البريد الإلكتروني" : "Email address"}>
              <input
                dir="ltr"
                type="email"
                className={`${fieldClass} cursor-not-allowed bg-slate-100 text-slate-500 focus:border-slate-200 focus:ring-0 ${isRtl ? "text-right" : "text-left"}`}
                value={profile.email}
                readOnly
                aria-readonly="true"
              />
            </ProfileField>
            <ProfileField icon={Phone} label={isRtl ? "رقم الهاتف" : "Phone number"}>
              <input dir="ltr" type="tel" className={`${fieldClass} ${isRtl ? "text-right" : "text-left"}`} value={profile.telephone ?? ""} onChange={(e) => updateField("telephone", e.target.value)} />
            </ProfileField>
            <ProfileField icon={LockKeyhole} label={isRtl ? "كلمة المرور الجديدة" : "New password"}>
              <div className="relative">
                <input
                  dir={isRtl ? "rtl" : "ltr"}
                  type={showPasswords ? "text" : "password"}
                  className={`${fieldClass} ${isRtl ? "pl-12" : "pr-12"}`}
                  value={passwords.password}
                  onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                  placeholder={isRtl ? "اتركها فارغة للاحتفاظ بكلمة المرور الحالية" : "Leave blank to keep your current password"}
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPasswords((visible) => !visible)} className="absolute end-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-emerald-600" aria-label={isRtl ? "إظهار أو إخفاء كلمة المرور" : "Show or hide password"}>
                  {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </ProfileField>
            <ProfileField icon={LockKeyhole} label={isRtl ? "تأكيد كلمة المرور الجديدة" : "Confirm new password"}>
              <input
                dir="ltr"
                type={showPasswords ? "text" : "password"}
                className={fieldClass}
                value={passwords.password_confirmation}
                onChange={(e) => setPasswords({ ...passwords, password_confirmation: e.target.value })}
                required={Boolean(passwords.password)}
                minLength={6}
              />
            </ProfileField>
          </div>

          <div className={`mt-8 flex border-t border-slate-100 pt-6 ${isRtl ? "justify-start" : "justify-end"}`}>
            <button disabled={saving} className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isRtl ? "حفظ التغييرات" : "Save changes"}
            </button>
          </div>
        </form>

        {profile.role !== "superviseur" && (
          <section className="mx-auto mt-6 max-w-5xl rounded-[1.5rem] border border-red-200 bg-red-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-100 text-red-600">
                <AlertTriangle size={20} />
              </span>
              <div>
                <h2 className="font-black text-red-900">{isRtl ? "حذف الحساب" : "Delete account"}</h2>
                <p className="mt-1 text-sm leading-6 text-red-700/80">
                  {isRtl
                    ? "سيؤدي حذف الحساب إلى إيقاف الوصول وتسجيل الدخول إلى البوابة."
                    : "Deleting the account will stop access and sign-in to the portal."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={deactivating}
              className="mt-5 inline-flex min-w-44 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-60 sm:mt-0"
            >
              {deactivating ? <Loader2 size={17} className="animate-spin" /> : <UserX size={17} />}
              {isRtl ? "حذف حسابي" : "Delete my account"}
            </button>
          </section>
        )}

        {showDeleteConfirmation && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !deactivating) {
                setShowDeleteConfirmation(false);
                setDeleteConfirmation("");
              }
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          >
            <form onSubmit={deactivateAccount} className="w-full max-w-lg rounded-[1.75rem] border border-red-100 bg-white p-6 shadow-2xl sm:p-8">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-100 text-red-600">
                <AlertTriangle size={25} />
              </span>
              <h2 id="delete-account-title" className="mt-5 text-2xl font-black text-slate-900">
                {isRtl ? "تأكيد حذف الحساب" : "Confirm account deletion"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isRtl
                  ? "سيتم تسجيل خروجك وإيقاف وصولك إلى الحساب. اكتب كلمة «حذف» في الحقل أدناه للتأكيد."
                  : "You will be signed out and lose access to the account. Type “DELETE” below to confirm."}
              </p>
              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  {isRtl ? "كلمة التأكيد" : "Confirmation word"}
                </span>
                <input
                  autoFocus
                  value={deleteConfirmation}
                  onChange={(event) => setDeleteConfirmation(event.target.value)}
                  placeholder={isRtl ? "اكتب حذف" : "Type DELETE"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-900 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
                />
              </label>
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={deactivating}
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    setDeleteConfirmation("");
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  {isRtl ? "إلغاء" : "Cancel"}
                </button>
                <button
                  disabled={deactivating || deleteConfirmation.trim() !== (isRtl ? "حذف" : "DELETE")}
                  className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deactivating ? <Loader2 size={17} className="animate-spin" /> : <UserX size={17} />}
                  {isRtl ? "تأكيد الحذف" : "Confirm deletion"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

const ProfileField = ({ icon: Icon, label, children }) => (
  <label className="space-y-2">
    <span className="flex items-center gap-2 text-sm font-bold text-slate-700"><Icon size={16} className="text-emerald-600" />{label}</span>
    {children}
  </label>
);

export default ProfilePage;
