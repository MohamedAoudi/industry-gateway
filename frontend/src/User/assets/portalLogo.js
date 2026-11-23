import arabicLogo from "./images/logos/logo 1.png";
import compactArabicLogo from "./images/logos/logo.png";
import englishLogo from "./images/logos/logo-en.png";
import frenchLogo from "./images/logos/logo-fr.png";

export const getPortalLogo = (language, compact = false) => {
  const locale = language?.split("-")[0];
  if (locale === "fr") return frenchLogo;
  if (locale === "en") return englishLogo;
  return compact ? compactArabicLogo : arabicLogo;
};

export const getPortalLogoAlt = (language) => {
  const locale = language?.split("-")[0];
  if (locale === "fr") return "Portail de liaison industrielle avec les établissements de recherche scientifique et d’innovation";
  if (locale === "en") return "Industry Linkage Portal — Connecting Industry with Research and Innovation Institutions";
  return "بوابة ربط الصناعة بمؤسسات البحث العلمي والابتكار";
};
