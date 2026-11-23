export const normalizeSearchText = (value) => String(value ?? "")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, "")
  .replace(/[أإآٱ]/g, "ا")
  .replace(/ى/g, "ي")
  .toLocaleLowerCase();

export const matchesKeywords = (values, query) => {
  const keywords = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  const fields = values.filter(Boolean).map(normalizeSearchText);
  return keywords.every((keyword) => fields.some((field) => field.includes(keyword)));
};
