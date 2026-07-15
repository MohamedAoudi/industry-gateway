import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const getVisiblePages = (page, totalPages) => {
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({ page, totalPages, onPageChange, className = "" }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  if (totalPages <= 1) return null;

  const goTo = (nextPage) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    if (safePage !== page) onPageChange(safePage);
  };

  return (
    <nav aria-label={isRtl ? "التنقل بين الصفحات" : "Pagination"} className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} aria-label={isRtl ? "الصفحة السابقة" : "Previous page"} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40">
        {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
      {getVisiblePages(page, totalPages).map((pageNumber) => (
        <button key={pageNumber} type="button" onClick={() => goTo(pageNumber)} aria-current={pageNumber === page ? "page" : undefined} className={`h-10 min-w-10 rounded-xl px-3 text-sm font-black transition ${pageNumber === page ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"}`}>
          {pageNumber}
        </button>
      ))}
      <button type="button" onClick={() => goTo(page + 1)} disabled={page === totalPages} aria-label={isRtl ? "الصفحة التالية" : "Next page"} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40">
        {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>
    </nav>
  );
};

export default Pagination;
