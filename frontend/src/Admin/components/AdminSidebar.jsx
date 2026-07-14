import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  FlaskConical,
  Briefcase,
  ClipboardList,
  ChevronDown,
  Network,
  Database,
  Microscope,
  BrainCircuit,
  GraduationCap,
  FileBadge,
  HandHeart,
  Building2,
  BookOpen,
  UserPlus,
  CircleHelp,
} from "lucide-react";

const NavItem = ({
  icon,
  label,
  active = false,
  hasSubmenu = false,
  isOpen = false,
  onClick,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 mb-1 ${
        active
          ? "bg-emerald-50 text-emerald-700 shadow-sm"
          : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={active ? "text-emerald-600" : "text-slate-600"}>
          {React.cloneElement(icon, {
            size: 20,
            strokeWidth: active ? 2.2 : 1.8,
          })}
        </span>

        <span
          className={`text-[15px] ${
            active ? "font-bold" : "font-medium"
          }`}
        >
          {label}
        </span>
      </div>

      {hasSubmenu && (
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } ${active ? "text-emerald-500" : "text-slate-500"}`}
        />
      )}
    </motion.button>
  );
};

const AdminSidebar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard />,
      label: t("menu.home"),
      path: "/admin/dashboard",
    },

    {
      id: "researchers",
      icon: <FlaskConical />,
      label: t("stats.researchers"),
      path: "/admin/researchers",
    },

    {
      id: "database_centers",
      icon: <Database />,
      label: t("menu.database"),
      hasSubmenu: true,
      submenu: [
        {
          label: t("submenu.database.scientific_research_innovation_centers"),
          icon: <Microscope size={14} />,
          path: "/admin/scientificResearchInnovationCentersList",
        },
        {
          label: t("submenu.database.centers_excellence_artificial_intelligence"),
          icon: <BrainCircuit size={14} />,
          path: "/admin/centersExcellenceArtificialIntelligenceList",
        },
        {
          label: t("submenu.database.ministries_higher_education_scientific_research"),
          icon: <GraduationCap size={14} />,
          path: "/admin/ministriesHigherEducationScientificResearchList",
        },
        {
          label: t("submenu.database.industrial_property_patent_offices"),
          icon: <FileBadge size={14} />,
          path: "/admin/industrialPropertyPatentOfficesList",
        },
        {
          label: t("submenu.database.supporting_bodies_scientific_research"),
          icon: <HandHeart size={14} />,
          path: "/admin/supportingBodiesScientificResearchList",
        },
      ],
    },

    {
      id: "companies",
      icon: <Building2 />,
      label: t("companies.industrial_companies"),
      hasSubmenu: true,
      submenu: [
        {
          label: t("companies.business_directory"),
          icon: <BookOpen size={14} />,
          path: "/admin/companies",
        },
        {
          label: t("companies.applications_to_join"),
          icon: <UserPlus size={14} />,
          path: "/admin/companies/requests",
        },
      ],
    },

    {
      id: "offers",
      icon: <Briefcase />,
      label: t("footer.add_request"),
      path: "/admin/offers",
    },

    {
      id: "faq",
      icon: <CircleHelp />,
      label: i18n.language === "ar" ? "الأسئلة الشائعة" : "FAQ",
      path: "/admin/faq",
    },

    {
      id: "matching",
      icon: <ClipboardList />,
      label: t("linking_researchers_page.process_steps.label2"),
      path: "/admin/matching",
    },
  ];

  const isParentActive = (item) => {
    if (item.path && isActive(item.path)) return true;

    if (item.submenu) {
      return item.submenu.some(
        (sub) => sub.path && isActive(sub.path)
      );
    }

    return false;
  };

  useEffect(() => {
    const activeParent = menuItems.find((item) =>
      item.submenu?.some((sub) => isActive(sub.path))
    );

    if (activeParent) {
      setOpenSubmenu(activeParent.id);
    }
  }, [location.pathname]);

  return (
    <aside
      dir={i18n.dir()}
      className="
        hidden md:flex
        flex-col
        w-72
        xl:w-80
        bg-white
        border-e
        border-slate-100
        h-screen
        sticky
        top-0
        overflow-hidden
        shadow-sm
      "
    >
      {/* Logo */}
      <div className="px-6 py-8 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Network size={24} />
          </div>

          <div>
            <h1 className="font-black text-lg text-slate-900 leading-tight">
              {i18n.language === "ar" ? (
                <>
                  منصة الربط
                  <span className="text-emerald-600"> الصناعي</span>
                </>
              ) : (
                <>
                  Industrial
                  <span className="text-emerald-600"> Link</span>
                </>
              )}
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              {i18n.language === "ar"
                ? "لوحة الإدارة"
                : "Administration Panel"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5">
        {menuItems.map((item) => (
          <div key={item.id}>
            {!item.hasSubmenu ? (
              <Link to={item.path}>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.path)}
                />
              </Link>
            ) : (
              <>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  hasSubmenu
                  active={isParentActive(item)}
                  isOpen={openSubmenu === item.id}
                  onClick={() =>
                    setOpenSubmenu(
                      openSubmenu === item.id ? null : item.id
                    )
                  }
                />

                <AnimatePresence>
                  {openSubmenu === item.id && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="ms-4 border-s-2 border-emerald-100 ps-3 py-2 space-y-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                              isActive(sub.path)
                                ? "bg-emerald-50 text-emerald-600 font-semibold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                            }`}
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Profile Card */}
      <div className="p-4">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              AD
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-800">
                {i18n.language === "ar"
                  ? "مدير النظام"
                  : "System Administrator"}
              </span>

              <Link
                to="/admin/profile"
                className="text-xs text-slate-500 hover:text-emerald-600 transition-colors mt-1"
              >
                {i18n.language === "ar"
                  ? "تعديل الملف الشخصي"
                  : "Edit Profile"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
