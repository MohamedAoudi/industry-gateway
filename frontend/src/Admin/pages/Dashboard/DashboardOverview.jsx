import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Database,
  Factory,
  FileBadge,
  FlaskConical,
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  RefreshCw,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import apiAdmin from "../../../api/apiAdmin";

const chartColors = ["#059669", "#2563eb", "#7c3aed", "#d97706", "#e11d48", "#0891b2"];

const emptyStats = {
  research_innovation_ai: 0,
  universities_academic_institutions: 0,
  incubators_technology_labs: 0,
  programs_initiatives_strategies: 0,
  industrial_property_patents: 0,
  experts_specialists: 0,
  supporting_bodies: 0,
  industrial_institutions: 0,
  arab_countries: 0,
};

const DashboardOverview = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await apiAdmin.get("/portal-stats");
      setStats({ ...emptyStats, ...data });
    } catch (requestError) {
      console.error("Unable to load dashboard statistics:", requestError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = useMemo(() => [
    {
      key: "research_innovation_ai",
      label: t("submenu.database.research_innovation_ai_centers"),
      icon: FlaskConical,
      href: "/admin/research-database/research-innovation-ai",
      style: "bg-emerald-50 text-emerald-700",
    },
    {
      key: "universities_academic_institutions",
      label: t("submenu.database.universities_academic_scientific_institutions"),
      icon: GraduationCap,
      href: "/admin/research-database/universities",
      style: "bg-blue-50 text-blue-700",
    },
    {
      key: "industrial_property_patents",
      label: t("submenu.database.industrial_property_patent_offices"),
      icon: FileBadge,
      href: "/admin/research-database/industrial-property-patents",
      style: "bg-violet-50 text-violet-700",
    },
    {
      key: "experts_specialists",
      label: t("submenu.database.experts_specialists_database"),
      icon: UsersRound,
      href: "/admin/research-database/experts-specialists",
      style: "bg-amber-50 text-amber-700",
    },
    {
      key: "supporting_bodies",
      label: t("submenu.database.supporting_bodies_scientific_research"),
      icon: HandCoins,
      href: "/admin/research-database/supporting-bodies",
      style: "bg-rose-50 text-rose-700",
    },
    {
      key: "industrial_institutions",
      label: t("submenu.database.industrial_institutions"),
      icon: Factory,
      href: "/admin/research-database/industrial-institutions",
      style: "bg-cyan-50 text-cyan-700",
    },
  ], [t]);

  const maxValue = Math.max(1, ...cards.map((card) => Number(stats[card.key]) || 0));
  const totalRecords = cards.reduce((total, card) => total + (Number(stats[card.key]) || 0), 0);
  const chartData = useMemo(() => {
    const shortLabels = isRtl
      ? ["البحث والابتكار", "الجامعات", "الملكية الصناعية", "الخبراء", "الجهات الداعمة", "المؤسسات الصناعية"]
      : ["Research", "Universities", "Patents", "Experts", "Support bodies", "Industry"];

    return cards.map((card, index) => ({
      name: shortLabels[index],
      fullName: card.label,
      value: Number(stats[card.key]) || 0,
      color: chartColors[index],
    }));
  }, [cards, isRtl, stats]);

  const pieData = chartData.filter((item) => item.value > 0);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="mx-auto max-w-[1500px] space-y-7 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-7 text-white shadow-xl sm:p-9">
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-200">
              <LayoutDashboard size={15} />
              {isRtl ? "لوحة الإدارة" : "Admin dashboard"}
            </span>
            <h1 className="text-3xl font-black sm:text-4xl">
              {isRtl ? "نظرة عامة على البوابة" : "Portal overview"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/70">
              {isRtl
                ? "إحصائيات حقيقية ومحدثة لمحتوى قاعدة البيانات والجهات المشاركة في المنصة."
                : "Live statistics for database content and organizations participating in the platform."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SummaryBadge value={totalRecords} label={isRtl ? "إجمالي السجلات" : "Total records"} />
            <SummaryBadge value={stats.arab_countries} label={isRtl ? "الدول العربية" : "Arab countries"} />
            <button
              type="button"
              onClick={loadStats}
              disabled={loading}
              className="inline-flex min-h-16 items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black transition hover:bg-white/20 disabled:opacity-60"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              {isRtl ? "تحديث" : "Refresh"}
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          <span>{isRtl ? "تعذر تحميل الإحصائيات حاليًا." : "Statistics could not be loaded."}</span>
          <button type="button" onClick={loadStats} className="rounded-xl bg-red-600 px-4 py-2 text-white">
            {isRtl ? "إعادة المحاولة" : "Try again"}
          </button>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ key, label, icon: Icon, href, style }) => (
          <Link
            key={key}
            to={href}
            className="group flex min-h-40 flex-col justify-between rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${style}`}><Icon size={23} /></span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-500">
                {isRtl ? "فتح القسم" : "Open section"}
              </span>
            </div>
            <div className="mt-5">
              <strong className="block text-3xl font-black text-slate-900">
                {loading ? <span className="inline-block h-8 w-16 animate-pulse rounded-lg bg-slate-100" /> : Number(stats[key] || 0).toLocaleString()}
              </strong>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500 group-hover:text-emerald-700">{label}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <ChartCard
          title={isRtl ? "مقارنة سجلات قاعدة البيانات" : "Database records comparison"}
          subtitle={isRtl ? "عدد السجلات المتاحة في كل قسم" : "Available records in each category"}
        >
          {loading ? (
            <ChartLoader />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 5, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={65} tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }} />
                <YAxis orientation={isRtl ? "right" : "left"} allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<DashboardTooltip />} cursor={{ fill: "#f1f5f9", radius: 12 }} />
                <Bar dataKey="value" radius={[10, 10, 3, 3]} maxBarSize={56}>
                  {chartData.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title={isRtl ? "توزيع محتوى المنصة" : "Platform content distribution"}
          subtitle={isRtl ? "النسبة التي يمثلها كل قسم من الإجمالي" : "Share represented by each category"}
        >
          {loading ? (
            <ChartLoader />
          ) : pieData.length > 0 ? (
            <div className="grid h-full min-h-80 items-center gap-3 sm:grid-cols-[1.2fr_1fr]">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={3} stroke="white" strokeWidth={3}>
                    {pieData.map((item) => <Cell key={item.name} fill={item.color} />)}
                  </Pie>
                  <Tooltip content={<DashboardTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 text-xs font-bold">
                    <span className="flex min-w-0 items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="text-slate-900">{Math.round((item.value / totalRecords) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-80 items-center justify-center text-sm font-bold text-slate-400">
              {isRtl ? "لا توجد بيانات لعرض الرسم" : "No chart data available"}
            </div>
          )}
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="mb-7 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Database size={21} /></span>
            <div>
              <h2 className="text-xl font-black text-slate-900">{isRtl ? "توزيع محتوى قاعدة البيانات" : "Database content distribution"}</h2>
              <p className="mt-1 text-xs text-slate-500">{isRtl ? "مقارنة مباشرة بين الأقسام" : "Direct comparison between sections"}</p>
            </div>
          </div>
          <div className="space-y-5">
            {cards.map((card) => {
              const value = Number(stats[card.key]) || 0;
              return (
                <div key={card.key}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold">
                    <span className="truncate text-slate-600">{card.label}</span>
                    <span className="text-slate-900">{loading ? "—" : value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700" style={{ width: loading ? "0%" : `${Math.max(value ? 4 : 0, (value / maxValue) * 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-xl font-black text-slate-900">{isRtl ? "وصول سريع" : "Quick access"}</h2>
          <p className="mt-2 text-sm text-slate-500">{isRtl ? "أكثر صفحات الإدارة استخدامًا" : "Frequently used administration pages"}</p>
          <nav className="mt-6 space-y-3">
            <QuickLink to="/admin/research-database/research-innovation-ai" icon={Database} label={isRtl ? "إدارة قاعدة البيانات" : "Manage database"} />
            <QuickLink to="/admin/companies" icon={Building2} label={isRtl ? "دليل الشركات الصناعية" : "Industrial companies"} />
            <QuickLink to="/admin/researchers" icon={UsersRound} label={isRtl ? "الباحثون والمبتكرون" : "Researchers and innovators"} />
            <QuickLink to="/admin/profile" icon={LayoutDashboard} label={isRtl ? "تعديل الملف الشخصي" : "Edit profile"} />
          </nav>
        </div>
      </section>
    </div>
  );
};

const SummaryBadge = ({ value, label }) => (
  <div className="min-w-32 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
    <strong className="block text-2xl font-black">{Number(value || 0).toLocaleString()}</strong>
    <span className="text-[10px] font-bold text-emerald-100/70">{label}</span>
  </div>
);

const QuickLink = ({ to, icon: Icon, label }) => (
  <Link to={to} className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-600 shadow-sm"><Icon size={19} /></span>
    <span>{label}</span>
  </Link>
);

const ChartCard = ({ title, subtitle, children }) => (
  <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
    <div className="mb-5">
      <h2 className="text-xl font-black text-slate-900">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
    <div className="h-[360px]">{children}</div>
  </div>
);

const ChartLoader = () => (
  <div className="flex h-full items-end gap-4 px-4 pb-8">
    {[45, 70, 52, 88, 62, 76].map((height, index) => (
      <span key={index} className="flex-1 animate-pulse rounded-t-xl bg-slate-100" style={{ height: `${height}%` }} />
    ))}
  </div>
);

const DashboardTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="max-w-64 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
      <p className="text-xs font-bold text-slate-500">{item.fullName || item.name}</p>
      <strong className="mt-1 block text-xl font-black text-slate-900">{Number(item.value).toLocaleString()}</strong>
    </div>
  );
};

export default DashboardOverview;
