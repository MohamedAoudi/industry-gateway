import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Facebook,
  Handshake,
  Home,
  Info,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  CircleHelp,
  Youtube,
  X,
  Microscope,
  Library,
  UsersRound,
  Presentation,
  Zap,
  GraduationCap,
  FlaskConical,
  Workflow,
  FileBadge,
  Factory,
  HandCoins,
} from "lucide-react";

import aidsmoLogo from "../assets/images/logos/aidsmo_logo.png";
import portalLogo from "../assets/images/logos/logo.png";

const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
    />
  </svg>
);

const portalServices = [
  { icon: Handshake, to: '/linkingresearcherscompanies', title: 'Connecting researchers, industry, support and funding' },
  { icon: Library, to: '/researchDatabase', title: 'Industry, research and innovation stakeholders database' },
  { icon: UsersRound, to: '/linkingresearchersindustrial', title: 'Cooperation, partnership and integration' },
  { icon: Presentation, to: '/researchDatabase?category=programs-initiatives-strategies', title: 'Joint programs and initiatives' },
  { icon: Zap, to: '/centersExcellenceAI', title: 'Digital transformation, innovation and technological development' },
  { icon: Microscope, to: '/researchDatabase', title: 'Scientific research outputs relevant to industry' },
];

const UserFooter = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const currentYear = new Date().getFullYear();
  const [activeGroup, setActiveGroup] = useState(null);
  const linksDialogRef = useRef(null);

  useEffect(() => {
    if (!activeGroup) return;
    const dialog = linksDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [activeGroup]);

  const navigationLinks = [
    { label: "menu.home", to: "/", icon: Home },
    { label: "menu.about", to: "/about", icon: Info },
    { label: "menu.media_center", to: "/mediaCenter", icon: Newspaper },
    { label: "footer.faq", to: "/faq", icon: CircleHelp },
    { label: "menu.contact", to: "/contact", icon: Mail },
  ];

  const serviceLinks = portalServices.map((service, index) => ({
    ...service,
    label: `services_section.items.${index}.title`,
  }));

  const databaseLinks = [
    { label: "submenu.database.research_innovation_ai_centers", to: "/researchDatabase?category=research-innovation-ai", icon: Microscope },
    { label: "submenu.database.universities_academic_scientific_institutions", to: "/researchDatabase?category=universities", icon: GraduationCap },
    { label: "submenu.database.incubators_technology_poles_laboratories", to: "/researchDatabase?category=incubators-technology-labs", icon: FlaskConical },
    { label: "submenu.database.programs_initiatives_strategies", to: "/researchDatabase?category=programs-initiatives-strategies", icon: Workflow },
    { label: "submenu.database.industrial_property_patent_offices", to: "/researchDatabase?category=industrial-property-patents", icon: FileBadge },
    { label: "submenu.database.industrial_institutions", to: "/researchDatabase?category=industrial-institutions", icon: Factory },
    { label: "submenu.database.supporting_bodies_scientific_research", to: "/researchDatabase?category=supporting-bodies", icon: HandCoins },
    { label: "submenu.database.experts_specialists_database", to: "/researchDatabase?category=experts-specialists", icon: UsersRound },
  ];

  const socialLinks = [
    { label: "Facebook", icon: Facebook },
    { label: "LinkedIn", icon: Linkedin },
    { label: "Instagram", icon: Instagram },
    { label: "YouTube", icon: Youtube },
    { label: "X", icon: XIcon },
  ];

  const ContactItem = ({ icon: Icon, label, children, href }) => {
    const content = (
      <>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <Icon size={18} />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</span>
          <span className="mt-1 block text-sm font-bold text-slate-800">{children}</span>
        </span>
      </>
    );

    return href ? (
      <a href={href} className="group flex min-w-0 items-center gap-3 px-5 py-4 transition-colors hover:bg-emerald-50/60">
        {content}
      </a>
    ) : (
      <div className="flex min-w-0 items-center gap-3 px-5 py-4">{content}</div>
    );
  };

  const SimpleLink = ({ item, inPopup = false }) => {
    const Icon = item.icon;

    return (
      <li>
        <Link
          to={item.to}
          onClick={inPopup ? () => setActiveGroup(null) : undefined}
          className={`group flex items-start gap-3 py-2 text-sm font-medium leading-6 transition-colors ${inPopup ? "rounded-xl px-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800" : "text-emerald-50/70 hover:text-white"}`}
        >
          <Icon size={15} className={`mt-1 shrink-0 ${inPopup ? "text-emerald-600" : "text-emerald-300"}`} />
          <span>{t(item.label)}</span>
          <ArrowRight
            size={13}
            className={`mt-1.5 shrink-0 opacity-0 transition-all group-hover:opacity-100 ${
              isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
          />
        </Link>
      </li>
    );
  };

  return (
    <footer dir={isRtl ? "rtl" : "ltr"} className="relative mt-auto overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 pt-16 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/15 blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[80px] border-white/[0.015]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.14)]">
          <div className="grid divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
            <ContactItem icon={Mail} label={t("footer.email_us")} href="mailto:id@aidsmo.org">
              id@aidsmo.org
            </ContactItem>
            <ContactItem icon={Phone} label={t("footer.call_us")} href="tel:+212537274500">
              <span dir="ltr">+212 537 274 500</span>
            </ContactItem>
            <ContactItem icon={MapPin} label={t("footer.location")}>
              {t("footer.location_value")}
            </ContactItem>
          </div>
        </div>

        <div className="grid gap-12 pb-12 pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
              <Link to="/" aria-label={t("menu.home")} className="rounded-xl bg-white p-2 transition-transform hover:scale-105">
                <img src={portalLogo} alt="Industry Gateway" className="h-14 w-auto object-contain" />
              </Link>
              <span className="h-12 w-px bg-white/15" />
              <a href="https://www.aidsmo.org" target="_blank" rel="noreferrer" aria-label="AIDSMO" className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-xl bg-white p-1.5 shadow-sm transition-transform hover:scale-105">
                <img src={aidsmoLogo} alt="AIDSMO" className="h-full w-full object-contain" />
              </a>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-emerald-50/65">
              {t("footer.description")}
            </p>
            <div className="mt-6">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-50/50">
                {t("footer.social_media")}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {socialLinks.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    aria-label={label}
                    title={label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-emerald-200"
                  >
                    <Icon size={18} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:ps-12">
            <div>
              <h3 className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                <span className="h-px w-8 bg-emerald-400" />
                {t("footer.sitemap")}
              </h3>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {navigationLinks.map((item) => <SimpleLink key={item.to} item={item} />)}
              </ul>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {[
                  { title: "menu.services", icon: Handshake, links: serviceLinks },
                  { title: "menu.database", icon: Database, links: databaseLinks },
                ].map(({ title, icon: Icon }) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setActiveGroup(title)}
                    aria-haspopup="dialog"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-start text-sm font-bold text-white transition-colors hover:border-emerald-400/50 hover:bg-white/10"
                  >
                    <Icon size={16} className="shrink-0 text-emerald-300" />
                    {t(title)}
                    <ArrowRight size={15} className={`ms-auto shrink-0 text-emerald-300 ${isRtl ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center md:flex-row md:text-start">
          <p className="text-xs font-medium text-emerald-50/50">
            {currentYear} AIDSMO — {t("footer.rights_reserved")}
          </p>
        </div>
      </div>
      <dialog
        ref={linksDialogRef}
        aria-labelledby="footer-links-title"
        onCancel={() => setActiveGroup(null)}
        onClose={() => setActiveGroup(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setActiveGroup(null); }}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 id="footer-links-title" className="text-lg font-bold">{activeGroup ? t(activeGroup) : ""}</h2>
            <button type="button" onClick={() => setActiveGroup(null)} aria-label={isRtl ? "?????" : "Close"} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"><X size={20} /></button>
          </div>
          <ul className="space-y-2">
            {(activeGroup === "menu.services" ? serviceLinks : activeGroup === "menu.database" ? databaseLinks : []).map((item, index) => (
              <SimpleLink key={`${item.to}-${index}`} item={item} inPopup />
            ))}
          </ul>
        </div>
      </dialog>
    </footer>
  );
};

export default UserFooter;
