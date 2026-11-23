import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import RegistrationProfileFields from './RegistrationProfileFields';

const PublicRegistrationFields = ({ formData, setFormData, inputClass }) => {
  const { i18n } = useTranslation();
  const confirmationRef = useRef(null);
  const copy = (ar, en, fr) => ({ ar, en, fr }[i18n.language] || ar);
  const mismatch = copy('كلمتا المرور غير متطابقتين', 'Passwords do not match', 'Les mots de passe ne correspondent pas');
  useEffect(() => {
    confirmationRef.current?.setCustomValidity(formData.password_confirmation && formData.password !== formData.password_confirmation ? mismatch : '');
  }, [formData.password, formData.password_confirmation, mismatch]);
  const institution = !['expert', 'visitor', 'other'].includes(formData.account_type);
  return <>
    <RegistrationProfileFields formData={formData} setFormData={setFormData} inputClass={inputClass} />
    {formData.account_type && <div dir={i18n.dir()} className="grid gap-5 sm:grid-cols-2">
      <label className="block space-y-2 sm:col-span-2"><span className="block text-sm font-bold text-slate-700">{institution ? copy('البريد الإلكتروني الرسمي', 'Official email address', 'Adresse e-mail officielle') : copy('البريد الإلكتروني', 'Email address', 'Adresse e-mail')} *</span><input type="email" dir="ltr" className={inputClass} required maxLength={100} autoComplete="email" value={formData.email} onChange={event => setFormData(current => ({ ...current, email: event.target.value }))} /></label>
      <label className="block space-y-2"><span className="block text-sm font-bold text-slate-700">{copy('كلمة المرور', 'Password', 'Mot de passe')} *</span><input type="password" dir="ltr" minLength={8} autoComplete="new-password" className={inputClass} required value={formData.password} onChange={event => setFormData(current => ({ ...current, password: event.target.value }))} /></label>
      <label className="block space-y-2"><span className="block text-sm font-bold text-slate-700">{copy('تأكيد كلمة المرور', 'Confirm password', 'Confirmer le mot de passe')} *</span><input ref={confirmationRef} type="password" dir="ltr" minLength={8} autoComplete="new-password" className={inputClass} required value={formData.password_confirmation} onChange={event => setFormData(current => ({ ...current, password_confirmation: event.target.value }))} /></label>
    </div>}
  </>;
};
export default PublicRegistrationFields;
