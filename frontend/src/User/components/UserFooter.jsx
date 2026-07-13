import { useTranslation } from "react-i18next";
import { 
  Phone, Mail, Globe, Facebook, Instagram, Linkedin, Twitter, 
  MapPin, ShieldCheck, Home, Info, LogIn, Send, Factory, Megaphone
} from "lucide-react";
import aidsmo from '../assets/images/logos/aidsmo_logo.png'; 

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const FooterLink = ({ label, icon: Icon }) => (
    <li>
      <a href="#" className="flex items-center gap-2 text-white hover:text-white transition-all duration-300 group">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-white transition-all group-hover:bg-white group-hover:text-emerald-700">
          <Icon size={14} />
        </span>
        <span className={`text-[14px] font-medium transition-transform duration-300 ${
          isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}>
          {t(label)}
        </span>
      </a>
    </li>
  );

  return (
    <footer className="relative bg-emerald-600 text-white pt-24 overflow-hidden border-t border-white/5">
      {/* تأثير الإضاءة الذهبية الخلفية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16">
          
          {/* العمود الأول: الهوية والوصف */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <img src={aidsmo} alt="AIDSMO" className="h-16 w-auto brightness-110 contrast-125" />
              <p className="text-white text-[15px] leading-relaxed max-w-sm">
                {t("footer.description")}
              </p>
            </div>
            
            {/* أزرار التواصل الاجتماعي */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, link: "#" },
                { Icon: Twitter, link: "#" },
                { Icon: Linkedin, link: "#" },
                { Icon: Instagram, link: "#" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-800 hover:border-emerald-800 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <social.Icon size={18} className="text-white group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* أعمدة الروابط والدعم */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-white text-[13px] font-black uppercase tracking-[2px] flex items-center gap-2">
                <span className="w-6 h-[1px] bg-emerald-900"></span>
                {t("footer.sitemap")}
              </h4>
              <ul className="space-y-4">
                <FooterLink icon={Home} label="menu.home" />
                <FooterLink icon={Info} label="menu.about" />
                <FooterLink icon={LogIn} label="footer.login" />
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white text-[13px] font-black uppercase tracking-[2px] flex items-center gap-2">
                <span className="w-6 h-[1px] bg-emerald-900"></span>
                {t("footer.actions")}
              </h4>
              <ul className="space-y-4">
                <FooterLink icon={Send} label="footer.add_request" />
                <FooterLink icon={Factory} label="footer.add_factory" />
                <FooterLink icon={Megaphone} label="footer.add_ad" />
              </ul>
            </div>

            {/* بطاقة الدعم الفني الزجاجية */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md self-start shadow-2xl">
              <h4 className="text-white font-bold text-sm mb-4 tracking-tight">
                {t("footer.need_help")}
              </h4>
              <div className="space-y-4">
                <a href="mailto:support@aidsmo.org" className="flex items-center gap-3 text-[13px] text-slate-300 hover:text-white transition-colors">
                  <Mail size={14} className="text-emerald-900" />
                  support@aidsmo.org
                </a>
                <div className="pt-4 border-t border-white/5">
                  <button className="w-full bg-emerald-900 hover:bg-emerald-600 text-white py-3 rounded-xl text-[12px] font-bold transition-all active:scale-95 shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2">
                    <ShieldCheck size={14} />
                    {t("footer.open_ticket")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* شريط معلومات الاتصال (التواصل السريع) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5 my-4">
          <div className="flex items-center justify-center md:justify-start gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all">
              <Phone size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-bold uppercase">{t("footer.call_us")}</span>
              <span className="text-sm font-medium tracking-wider" dir="ltr">+212 06 06 06 06</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all">
              <Globe size={18} />
            </div>
            <div className="flex flex-col ">
              <span className="text-[10px] text-white font-bold uppercase">{t("footer.site")}</span>
              <span className="text-sm font-medium tracking-wider uppercase">www.aidsmo.org</span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-white font-bold uppercase">{t("footer.location")}</span>
              <span className="text-sm font-medium">Rabat, Morocco</span>
            </div>
          </div>
        </div>

        {/* الحقوق والسياسات */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white text-[11px] font-medium tracking-widest uppercase text-center md:text-left">
            © 2026 AIDSMO — {t("footer.rights_reserved")}
          </p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[2px]">
            <a href="#" className="text-white hover:text-amber-500 transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-white hover:text-amber-500 transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
