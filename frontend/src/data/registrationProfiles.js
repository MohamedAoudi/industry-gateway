const label = (ar, en, fr) => ({ ar, en, fr });
export const registrationTypes = [
  { value: 'research_center', label: label('مراكز البحث والابتكار والذكاء الاصطناعي', 'Research, innovation and AI centers', 'Centres de recherche, d’innovation et d’IA') },
  { value: 'patent_office', label: label('الملكية الصناعية وبراءات الاختراع', 'Industrial property and patent offices', 'Propriété industrielle et brevets') },
  { value: 'industrial_company', label: label('مؤسسة صناعية', 'Industrial institution', 'Établissement industriel') },
  { value: 'academic_institution', label: label('مؤسسة أكاديمية', 'Academic institution', 'Établissement académique') },
  { value: 'organization', label: label('منظمات واتحادات وجمعيات', 'Organizations, federations and associations', 'Organisations, fédérations et associations') },
  { value: 'supporting_entity', label: label('جهات داعمة', 'Supporting bodies', 'Organismes de soutien') },
  { value: 'expert', label: label('خبير ومختص', 'Expert or specialist', 'Expert ou spécialiste') },
  { value: 'visitor', label: label('زائر', 'Visitor', 'Visiteur') },
  { value: 'other', label: label('آخر (يرجى التحديد)', 'Other (please specify)', 'Autre (à préciser)') },
];
export const registrationLabels = {
  organization_name: label('الاسم الرسمي للمؤسسة / الجهة', 'Official institution / organization name', 'Nom officiel de l’établissement / organisme'),
  country: label('الدولة', 'Country', 'Pays'), address: label('العنوان', 'Address', 'Adresse'),
  research_fields: label('مجالات البحث والتخصصات العلمية', 'Research fields and scientific specializations', 'Domaines de recherche et spécialités scientifiques'),
  website: label('الموقع الإلكتروني', 'Website', 'Site web'), phone: label('رقم الهاتف / الجوال', 'Phone / mobile number', 'Téléphone / mobile'),
  authorized_person: label('اسم المسؤول أو الشخص المفوض بالتسجيل', 'Responsible person / authorized representative', 'Responsable / personne habilitée à s’inscrire'),
  entity_type: label('نوع الجهة', 'Organization type', 'Type d’organisme'), activity_field: label('مجال النشاط والاختصاص', 'Activity and specialization', 'Domaine d’activité et spécialisation'),
  academic_fields: label('مجالات التخصص والتكوين الأكاديمي', 'Academic specializations and training', 'Spécialités et formations académiques'),
  work_scope: label('نطاق العمل', 'Scope of work', 'Périmètre d’intervention'), sectors: label('القطاعات الصناعية أو البحثية التي تهتم بها', 'Industrial or research sectors of interest', 'Secteurs industriels ou de recherche concernés'),
  full_name: label('الاسم الكامل', 'Full name', 'Nom complet'), specialty: label('التخصص / مجال الخبرة', 'Specialty / expertise', 'Spécialité / expertise'),
  years_experience: label('سنوات الخبرة', 'Years of experience', 'Années d’expérience'), current_position: label('المنصب الحالي', 'Current position', 'Poste actuel'),
  other_type: label('تحديد نوع المستخدم أو الجهة', 'Specify user or organization type', 'Préciser le type d’utilisateur ou d’organisme'),
  legal_form: label('الإطار القانوني (السبب الاجتماعي)', 'Legal form', 'Forme juridique'), registration_number: label('رقم الترخيص / السجل', 'License / registration number', 'Numéro de licence / registre'),
  branch: label('الفرع الصناعي', 'Industrial branch', 'Branche industrielle'), classification: label('التصنيف الصناعي', 'Industrial classification', 'Classification industrielle'), service_type: label('نوع الخدمات', 'Service type', 'Type de services'), provided_services: label('الخدمات المقدمة', 'Services provided', 'Services proposés'),
  license_number: label('رقم الرخصة', 'License number', 'Numéro d’autorisation'), license_type: label('نوع الرخصة', 'License type', 'Type d’autorisation'), license_expiry: label('تاريخ انتهاء الرخصة', 'License expiry date', 'Date d’expiration de l’autorisation'),
  responsible_position: label('صفة المسؤول', 'Representative’s position', 'Fonction du responsable'), city: label('المدينة', 'City', 'Ville'), landline: label('الهاتف الثابت', 'Landline', 'Téléphone fixe'), fax: label('فاكس', 'Fax', 'Fax'),
  facebook: label('فيسبوك', 'Facebook', 'Facebook'), linkedin: label('لينكدإن', 'LinkedIn', 'LinkedIn'), twitter: label('تويتر / إكس', 'Twitter / X', 'Twitter / X'), instagram: label('إنستغرام', 'Instagram', 'Instagram'),
  referral_source: label('كيف تعرفت على المنصة؟', 'How did you hear about the portal?', 'Comment avez-vous connu le portail ?'), user_category: label('تصنيف المستخدم', 'User classification', 'Catégorie d’utilisateur'),
  products: label('المنتجات / نشاط المنشأة', 'Products / establishment activity', 'Produits / activité de l’établissement'), production_capacity: label('الطاقة الإنتاجية', 'Production capacity', 'Capacité de production'),
  funding_scope: label('نطاق التمويل', 'Funding scope', 'Domaines de financement'), funding_programs: label('برامج التمويل', 'Funding programs', 'Programmes de financement'),
};
const field = (name, required = false, type = 'text', extra = {}) => ({ name, required, type, label: registrationLabels[name], ...extra });
const contact = () => [field('website', false, 'url'), field('phone', false, 'tel')];
const social = () => ['facebook', 'linkedin', 'twitter', 'instagram'].map(name => field(name, false, 'url'));
export const registrationProfiles = {
  research_center: [field('organization_name', true), field('country', true), field('address'), field('research_fields', true, 'textarea'), field('website', false, 'url'), field('phone', true, 'tel'), field('authorized_person')],
  patent_office: [field('organization_name', true), field('entity_type', true, 'text', { suggestions: ['مكتب براءات الاختراع', 'مكتب الملكية الصناعية'] }), field('country'), field('address'), field('website', false, 'url'), field('phone', true, 'tel'), field('authorized_person')],
  industrial_company: [field('organization_name', true), field('branch'), field('classification'), field('activity_field', true, 'textarea'), field('service_type'), field('provided_services', false, 'textarea'), field('legal_form', true), field('registration_number', true), field('license_number'), field('license_type'), field('license_expiry', false, 'date'), field('authorized_person', true), field('responsible_position', true), field('address', true), field('country', true), field('city', true), field('phone', true, 'tel'), field('landline', false, 'tel'), field('fax', false, 'tel'), field('website', false, 'url'), ...social(), field('referral_source')],
  academic_institution: [field('organization_name', true), field('country', true), field('address'), field('academic_fields', true, 'textarea'), field('website', false, 'url'), field('phone', true, 'tel'), field('authorized_person')],
  organization: [field('organization_name', true), field('entity_type', true, 'text', { suggestions: ['جمعية مهنية', 'منظمة غير حكومية', 'اتحاد صناعي', 'اتحاد مهني', 'منظمة علمية أو بحثية'] }), field('activity_field', true, 'textarea'), field('country', true), field('address'), field('work_scope', false, 'scope'), field('sectors', false, 'textarea'), ...contact(), field('authorized_person', true)],
  supporting_entity: [field('organization_name', true), field('entity_type', false, 'text', { suggestions: ['مؤسسة تمويلية', 'حاضنة ومسرعة أعمال', 'هيئة وطنية'] }), field('country', true), field('address'), ...contact(), field('authorized_person', true)],
  expert: [field('full_name', true), field('phone', true, 'tel'), field('specialty'), field('years_experience', false, 'number'), field('country', true), field('organization_name'), field('current_position')],
  visitor: [field('full_name', true), field('phone', true, 'tel'), field('user_category', true), field('address', true), field('country', true), field('city', true), field('landline', false, 'tel'), field('fax', false, 'tel'), field('website', false, 'url'), ...social(), field('referral_source')],
  other: [field('organization_name', false, 'text', { label: label('الاسم الكامل أو اسم الجهة', 'Full name or organization name', 'Nom complet ou nom de l’organisme') }), field('other_type'), field('country'), field('activity_field'), field('phone', false, 'tel')],
  regular: [], factory: [field('organization_name', true), field('activity_field', true), field('products', true), field('country', true)],
  production_company: [field('organization_name', true), field('products', true), field('production_capacity', true), field('country', true)],
  funding_entity: [field('organization_name', true), field('funding_scope', true), field('funding_programs', true), field('country', true)],
};
const institutionNames = {
  research_center: label('الاسم الرسمي للمؤسسة / المركز', 'Official institution / center name', 'Nom officiel de l’établissement / centre'),
  patent_office: label('الاسم الرسمي للمؤسسة / الهيئة', 'Official institution / authority name', 'Nom officiel de l’établissement / autorité'),
  academic_institution: label('الاسم الرسمي للمؤسسة الأكاديمية', 'Official academic institution name', 'Nom officiel de l’établissement académique'),
  organization: label('الاسم الرسمي للمنظمة / الاتحاد / الجمعية', 'Official organization / federation / association name', 'Nom officiel de l’organisation / fédération / association'),
  supporting_entity: label('الاسم الرسمي للجهة', 'Official supporting body name', 'Nom officiel de l’organisme'),
  expert: label('المؤسسة / جهة العمل', 'Institution / employer', 'Établissement / employeur'),
};
for (const [type, name] of Object.entries(institutionNames)) {
  registrationProfiles[type].find(field => field.name === 'organization_name').label = name;
}
export const localizedLabel = (labels, language) => labels?.[language?.split('-')[0]] || labels?.ar || '';
export const buildRegistrationPayload = (form) => {
  const payload = new FormData();
  const profile = Object.fromEntries(Object.entries(form.profile_data || {}).filter(([key]) => !['cv_path', 'cv_name', 'logo_path', 'logo_name', 'attachment_path', 'attachment_name'].includes(key)));
  payload.append('profile_data', JSON.stringify(profile));
  for (const key of ['email', 'password', 'password_confirmation', 'account_type']) payload.append(key, form[key] || '');
  for (const key of ['cv_file', 'organization_logo', 'organization_attachment']) if (form[key] instanceof File) payload.append(key, form[key]);
  return payload;
};

export const buildAdminUserPayload = (form) => {
  const payload = buildRegistrationPayload(form);
  for (const key of ['prenomUtilisateur', 'nomUtilisateur', 'role', 'telephone']) payload.append(key, form[key] || '');
  payload.append('is_active', form.is_active ? '1' : '0');
  return payload;
};

export const pendingRegistrationMessage = (language) => ({
  ar: 'تم استلام طلب التسجيل. حسابك بانتظار موافقة الإدارة قبل تسجيل الدخول.',
  en: 'Your registration request has been received. Please wait for administrator approval before signing in.',
  fr: 'Votre demande d’inscription a été reçue. Votre compte doit être approuvé par l’administration avant de pouvoir vous connecter.',
}[language?.split('-')[0]] || 'تم استلام طلب التسجيل. حسابك بانتظار موافقة الإدارة قبل تسجيل الدخول.');
