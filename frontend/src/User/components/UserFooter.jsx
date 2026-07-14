import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  ExternalLink,
  Handshake,
  Home,
  Info,
  Library,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Presentation,
  UserRound,
} from "lucide-react";

import aidsmoLogo from "../assets/images/logos/aidsmo_logo.png";
import portalLogo from "../assets/images/logos/logo.png";

const UserFooter = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: "menu.home", to: "/", icon: Home },
    { label: "menu.about", to: "/about", icon: Info },
    { label: "menu.media_center", to: "/mediaCenter", icon: Newspaper },
  ];

  const serviceLinks = [
    {
      label: "submenu.services.linking_researchers_industrial_companies",
      to: "/linkingresearcherscompanies",
      icon: Handshake,
    },
    {
      label: "submenu.services.database_research_technologies_available_industrial_application",
      to: "/researchDatabase",
      icon: Library,
    },
    {
      label: "submenu.services.joint_workshops_seminars",
      to: "/workshopsseminars",
      icon: Presentation,
    },
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

  const SimpleLink = ({ item }) => {
    const Icon = item.icon;

    return (
      <li>
        <Link
          to={item.to}
          className="group flex items-start gap-3 py-2 text-sm font-medium leading-6 text-emerald-50/70 transition-colors hover:text-white"
        >
          <Icon size={15} className="mt-1 shrink-0 text-emerald-300" />
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
    <footer dir={isRtl ? "rtl" : "ltr"} className="relative mt-auto pt-16 text-white">
      <div className="absolute inset-x-0 bottom-0 top-28 overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950">
        <div className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full border-[80px] border-white/[0.025]" />
        <div className="pointer-events-none absolute -bottom-52 -left-44 h-[32rem] w-[32rem] rounded-full border-[70px] border-emerald-400/[0.04]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

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
              Rabat, Morocco
            </ContactItem>
          </div>
        </div>

        <div className="grid gap-12 pb-12 pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
              <span className="rounded-xl bg-white p-2">
                <img src={portalLogo} alt="Industry Gateway" className="h-14 w-auto object-contain" />
              </span>
              <span className="h-12 w-px bg-white/15" />
              <span className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-xl bg-white p-1.5 shadow-sm">
                <img src={aidsmoLogo} alt="AIDSMO" className="h-full w-full object-contain" />
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-7 text-emerald-50/65">
              {t("footer.description")}
            </p>
            <a
              href="https://www.aidsmo.org"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-b border-emerald-400/40 pb-1 text-sm font-bold text-emerald-300 transition-colors hover:text-white"
            >
              www.aidsmo.org
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:gap-10 lg:col-span-5">
            <div>
              <h3 className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                <span className="h-px w-8 bg-emerald-400" />
                {t("footer.sitemap")}
              </h3>
              <ul>
                {navigationLinks.map((item) => <SimpleLink key={item.to} item={item} />)}
              </ul>
            </div>

            <div className="mt-9 sm:mt-0">
              <h3 className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white">
                <span className="h-px w-8 bg-emerald-400" />
                {t("menu.services")}
              </h3>
              <ul>
                {serviceLinks.map((item) => <SimpleLink key={item.to} item={item} />)}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white">
              <span className="h-px w-8 bg-emerald-400" />
              {t("footer.actions")}
            </h3>
            <div className="space-y-3">
              <Link
                to="/researchDatabase"
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4 transition-all hover:border-emerald-400/40 hover:bg-white/[0.1]"
              >
                <span className="flex items-center gap-3 text-sm font-bold">
                  <Database size={18} className="text-emerald-300" />
                  {t("menu.database")}
                </span>
                <ArrowRight size={15} className={`text-emerald-300 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </Link>
              <Link
                to="/login"
                className="group flex items-center justify-between gap-3 rounded-xl bg-white p-4 text-emerald-900 shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="flex items-center gap-3 text-sm font-black">
                  <UserRound size={18} className="text-emerald-600" />
                  {t("common.join_network")}
                </span>
                <ArrowRight size={15} className={`text-emerald-600 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center md:flex-row md:text-start">
          <p className="text-xs font-medium text-emerald-50/50">
            © {currentYear} AIDSMO — {t("footer.rights_reserved")}
          </p>
          <div className="flex gap-6 text-xs font-semibold text-emerald-50/50">
            <span>{t("footer.privacy")}</span>
            <span>{t("footer.terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
