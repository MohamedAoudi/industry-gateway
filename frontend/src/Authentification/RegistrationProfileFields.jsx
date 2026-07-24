const accountTypes = [
  { value: "factory", label: "مصنع" },
  { value: "industrial_company", label: "شركة صناعية" },
  { value: "production_company", label: "شركة إنتاجية" },
  { value: "expert", label: "خبير ومختص" },
  { value: "funding_entity", label: "جهة تمويلية" },
  { value: "other", label: "آخر" },
];

const fieldsByType = {
  factory: [
    { name: "organization_name", label: "اسم المصنع", placeholder: "اسم المصنع" },
    { name: "activity_field", label: "المجال الصناعي", placeholder: "مثال: الصناعات الغذائية" },
    { name: "products", label: "أهم المنتجات", placeholder: "المنتجات الرئيسية" },
    { name: "country", label: "الدولة", placeholder: "الدولة" },
  ],
  industrial_company: [
    { name: "organization_name", label: "اسم الشركة الصناعية", placeholder: "اسم الشركة" },
    { name: "activity_field", label: "القطاع الصناعي", placeholder: "مثال: صناعة السيارات" },
    { name: "registration_number", label: "رقم التسجيل التجاري", placeholder: "رقم التسجيل" },
    { name: "country", label: "الدولة", placeholder: "الدولة" },
  ],
  production_company: [
    { name: "organization_name", label: "اسم الشركة الإنتاجية", placeholder: "اسم الشركة" },
    { name: "products", label: "المنتجات", placeholder: "المنتجات الرئيسية" },
    { name: "production_capacity", label: "الطاقة الإنتاجية", placeholder: "مثال: 10,000 وحدة سنوياً" },
    { name: "country", label: "الدولة", placeholder: "الدولة" },
  ],
  expert: [
    { name: "specialty", label: "التخصص", placeholder: "مجال الخبرة والتخصص" },
    { name: "years_experience", label: "سنوات الخبرة", placeholder: "عدد السنوات", type: "number", min: 0 },
    { name: "organization_name", label: "جهة العمل", placeholder: "اسم جهة العمل" },
    { name: "country", label: "الدولة", placeholder: "الدولة" },
  ],
  funding_entity: [
    { name: "organization_name", label: "اسم الجهة التمويلية", placeholder: "اسم الجهة" },
    { name: "funding_scope", label: "نطاق التمويل", placeholder: "المجالات أو القطاعات المستهدفة" },
    { name: "funding_programs", label: "برامج التمويل", placeholder: "أهم برامج التمويل" },
    { name: "country", label: "الدولة", placeholder: "الدولة" },
  ],
  other: [
    { name: "other_type", label: "الصفة أو نوع الحساب", placeholder: "حدد صفتك" },
    { name: "organization_name", label: "اسم الجهة", placeholder: "اسم الجهة أو المؤسسة" },
    { name: "activity_field", label: "مجال النشاط", placeholder: "مجال النشاط" },
    { name: "country", label: "الدولة", placeholder: "الدولة" },
  ],
};

const defaultInputClass = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";

export const emptyRegistrationForm = {
  nomComplet: "",
  email: "",
  password: "",
  account_type: "",
  profile_data: {},
};

const RegistrationProfileFields = ({ formData, setFormData, inputClass = defaultInputClass, required = true }) => {
  const selectedFields = fieldsByType[formData.account_type] || [];

  const changeProfileField = (name, value) => {
    setFormData({
      ...formData,
      profile_data: { ...formData.profile_data, [name]: value },
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-slate-700">نوع الحساب *</span>
        <select
          className={inputClass}
          value={formData.account_type}
          onChange={(event) => setFormData({ ...formData, account_type: event.target.value, profile_data: {} })}
          required={required}
        >
          <option value="">اختر نوع الحساب</option>
          {accountTypes.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </label>

      {selectedFields.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {selectedFields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">{field.label} *</span>
              <input
                type={field.type || "text"}
                min={field.min}
                className={inputClass}
                placeholder={field.placeholder}
                value={formData.profile_data?.[field.name] || ""}
                onChange={(event) => changeProfileField(field.name, event.target.value)}
                required
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegistrationProfileFields;
