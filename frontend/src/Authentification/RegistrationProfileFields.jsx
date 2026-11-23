import { useTranslation } from 'react-i18next';
import { arabCountries } from '../data/arabCountries';
import { localizedLabel, registrationLabels, registrationProfiles, registrationTypes } from '../data/registrationProfiles';

export const emptyRegistrationForm = {
  nomComplet: '', email: '', password: '', password_confirmation: '', account_type: '', profile_data: {},
  cv_file: null, organization_logo: null, organization_attachment: null,
};
const defaultInputClass = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition-all focus:border-[#00C9F2] focus:bg-white focus:ring-4 focus:ring-[#00C9F2]/10';

const RegistrationProfileFields = ({ formData, setFormData, inputClass = defaultInputClass, required = true, allowUploads = true }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language?.split('-')[0];
  const copy = (ar, en, fr) => ({ ar, en, fr }[language] || ar);
  const fields = registrationProfiles[formData.account_type] || [];
  const change = (name, value) => setFormData(current => ({ ...current, profile_data: { ...current.profile_data, [name]: value } }));
  const upload = (name, accept, ar, en, fr) => (
    <label className="block space-y-2" key={name}>
      <span className="block text-sm font-bold text-slate-700">{copy(ar, en, fr)}</span>
      <input key={`${formData.account_type}-${name}`} type="file" accept={accept} className={inputClass} onChange={event => {
        const file = event.target.files?.[0] || null;
        const limit = name === 'organization_logo' ? 4 : 5;
        event.target.setCustomValidity(file && (file.size > limit * 1024 * 1024 || (accept === 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')))
          ? copy(`الملف غير صالح أو يتجاوز ${limit} MB`, `Invalid file or larger than ${limit} MB`, `Fichier invalide ou supérieur à ${limit} Mo`) : '');
        setFormData(current => ({ ...current, [name]: file }));
      }} />
      <span className="block text-xs text-slate-500">{accept === 'application/pdf' ? 'PDF · 5 MB' : 'PNG / JPG / WebP · 4 MB'}</span>
    </label>
  );
  return (
    <div dir={i18n.dir()} className="space-y-5 rounded-2xl border border-[#D0F6FF] bg-[#ECFCFF]/50 p-4">
      <label className="block space-y-2">
        <span className="block text-sm font-bold text-slate-700">{copy('نوع التسجيل', 'Registration type', 'Type d’inscription')} *</span>
        <select className={inputClass} value={formData.account_type} required={required} onChange={event => setFormData(current => ({ ...current, account_type: event.target.value, profile_data: {}, cv_file: null, organization_logo: null, organization_attachment: null }))}>
          <option value="">{copy('اختر نوع التسجيل', 'Select registration type', 'Choisir le type d’inscription')}</option>
          {formData.account_type && !registrationTypes.some(type => type.value === formData.account_type) && <option value={formData.account_type}>{formData.account_type}</option>}
          {registrationTypes.map(type => <option key={type.value} value={type.value}>{localizedLabel(type.label, language)}</option>)}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(field => {
          const props = { className: inputClass, required: required && field.required, value: formData.profile_data?.[field.name] ?? '', onChange: event => change(field.name, event.target.value) };
          return <label key={`${formData.account_type}-${field.name}`} className={`block space-y-2 ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}>
            <span className="block text-sm font-bold text-slate-700">{localizedLabel(field.label || registrationLabels[field.name], language)}{field.required ? ' *' : ''}</span>
            {field.name === 'country' ? <select {...props}>
              <option value="">{copy('اختر الدولة', 'Select a country', 'Choisir un pays')}</option>
              {props.value && !arabCountries.some(country => country.nomPays === props.value) && <option value={props.value}>{props.value}</option>}
              {arabCountries.map(country => <option key={country.code} value={country.nomPays}>{t(`countries.${country.code}`, { defaultValue: language === 'en' ? country.nameEn : country.nomPays })}</option>)}
            </select> : field.type === 'scope' ? <select {...props}>
              <option value="">{copy('اختر نطاق العمل', 'Select scope', 'Choisir le périmètre')}</option>
              {[
                ['national', 'وطني', 'National', 'National'], ['regional', 'إقليمي', 'Regional', 'Régional'], ['arab', 'عربي', 'Arab', 'Arabe'], ['international', 'دولي', 'International', 'International'],
              ].map(([value, ar, en, fr]) => <option key={value} value={value}>{copy(ar, en, fr)}</option>)}
            </select> : field.type === 'textarea' ? <textarea {...props} rows={3} maxLength={2000} /> : <input {...props} type={field.type} min={field.type === 'number' ? 0 : undefined} max={field.type === 'number' ? 100 : undefined} step={field.type === 'number' ? 1 : undefined} maxLength={2000} dir={['url', 'tel'].includes(field.type) ? 'ltr' : undefined} placeholder={field.type === 'url' ? 'https://example.com' : undefined} list={field.suggestions ? `suggestions-${formData.account_type}-${field.name}` : undefined} />}
            {field.suggestions && <datalist id={`suggestions-${formData.account_type}-${field.name}`}>{field.suggestions.map(value => <option key={value} value={value} />)}</datalist>}
          </label>;
        })}
        {allowUploads && formData.account_type === 'expert' && upload('cv_file', 'application/pdf', 'السيرة الذاتية — تحميل PDF', 'CV — Upload PDF', 'CV — Télécharger PDF')}
        {allowUploads && formData.account_type === 'industrial_company' && <>
          {upload('organization_logo', 'image/png,image/jpeg,image/webp', 'تحميل الشعار', 'Upload logo', 'Télécharger le logo')}
          {upload('organization_attachment', 'application/pdf', 'المرفقات (PDF)', 'Attachments (PDF)', 'Pièces jointes (PDF)')}
        </>}
      </div>
    </div>
  );
};
export default RegistrationProfileFields;
