import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Bot, ExternalLink, LoaderCircle, Maximize2, Minimize2, Send, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

import apiAdmin from "../../api/apiAdmin";

const getTextDirection = (value) => (
  /\p{Script=Arabic}/u.test(String(value || "")) ? "rtl" : "ltr"
);

const copy = {
  fr: {
    title: "Assistant du portail industriel", status: "Connecté aux données du portail",
    welcome: "Bonjour ! Posez vos questions sur le portail, les chercheurs, les entreprises, les centres de recherche ou nos services.",
    placeholder: "Votre question...", send: "Envoyer", open: "Ouvrir l’assistant", close: "Fermer l’assistant",
    error: "L’assistant est temporairement indisponible. Veuillez réessayer.",
    tooShort: "Saisissez une question contenant au moins deux lettres ou chiffres.",
    source: "Voir les détails", note: "Je réponds aux questions concernant le portail et ses données publiées.",
    suggestions: ["Trouver un chercheur en intelligence artificielle", "Afficher les entreprises industrielles", "Comment créer un compte ?"]
  },
  ar: {
    title: "مساعد بوابة الصناعة",
    status: "متصل ببيانات البوابة",
    welcome: "مرحباً! اسألني عن بوابة الصناعة، الباحثين، المؤسسات، مراكز البحث أو خدمات الموقع.",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    open: "فتح المساعد",
    close: "إغلاق المساعد",
    error: "تعذر الوصول إلى المساعد حالياً. حاول مرة أخرى.",
    tooShort: "يرجى كتابة سؤال واضح يحتوي على حرفين أو رقمين على الأقل.",
    source: "عرض التفاصيل",
    note: "أجيب فقط عن البوابة وبياناتها المنشورة.",
    suggestions: ["ابحث عن باحث في الذكاء الاصطناعي", "اعرض المؤسسات الصناعية", "كيف أسجل في البوابة؟"],
  },
  en: {
    title: "Industry Gateway Assistant",
    status: "Connected to portal data",
    welcome: "Hello! Ask me about the Industry Gateway, researchers, institutions, research centers, or site services.",
    placeholder: "Type your question...",
    send: "Send",
    open: "Open assistant",
    close: "Close assistant",
    error: "The assistant is currently unavailable. Please try again.",
    tooShort: "Please enter a clear question containing at least two letters or numbers.",
    source: "View details",
    note: "I answer only questions about the portal and its published data.",
    suggestions: ["Find an AI researcher", "Show industrial institutions", "How do I create an account?"],
  },
};

const ChatbotWidget = () => {
  const reduceMotion = useReducedMotion();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const locale = ["ar", "en", "fr"].includes(i18n.language) ? i18n.language : "en";
  const text = copy[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: "welcome", role: "assistant", text: text.welcome, suggestions: text.suggestions },
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages((current) => current.length === 1 && current[0].id === "welcome"
      ? [{ id: "welcome", role: "assistant", text: text.welcome, suggestions: text.suggestions }]
      : current
    );
  }, [locale, text.suggestions, text.welcome]);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      if (window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen || window.innerWidth >= 640) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const ask = async (question) => {
    const message = question.trim();
    if (!message || isLoading) return;

    const meaningfulCharacters = message.match(/[\p{L}\p{N}]/gu) ?? [];
    if (meaningfulCharacters.length < 2) {
      setMessages((current) => [...current, {
        id: `validation-${Date.now()}`,
        role: "assistant",
        text: text.tooShort,
        validation: true,
      }]);
      setInput("");
      return;
    }

    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", text: message }]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((item) => item.id !== "welcome" && !item.error && !item.validation)
        .map((item) => ({ role: item.role, content: item.text }))
        .slice(-6);
      const { data } = await apiAdmin.post("/chatbot", { message, locale, history });
      setMessages((current) => [...current, {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.answer,
        sources: Array.isArray(data.sources) ? data.sources : [],
        suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        outOfScope: Boolean(data.out_of_scope),
      }]);
    } catch (error) {
      const isValidationError = error?.response?.status === 422;
      setMessages((current) => [...current, {
        id: `error-${Date.now()}`,
        role: "assistant",
        text: isValidationError ? text.tooShort : text.error,
        error: !isValidationError,
        validation: isValidationError,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className={`fixed bottom-6 z-[80] ${isRtl ? "right-5" : "left-5"} sm:bottom-8 ${isRtl ? "sm:right-8" : "sm:left-8"}`}>
      {isOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-label={text.title}
          className={`fixed inset-0 z-[100] flex h-screen h-[100dvh] w-screen animate-fade flex-col overflow-hidden bg-white shadow-[0_28px_90px_rgba(15,23,42,0.28)] sm:static sm:z-auto sm:mb-4 sm:rounded-[1.75rem] sm:border sm:border-slate-200 ${
            isExpanded
              ? "sm:h-[min(760px,calc(100dvh-120px))] sm:w-[min(760px,calc(100vw-64px))]"
              : "sm:h-[min(620px,calc(100dvh-120px))] sm:w-[390px]"
          }`}
        >
          <header className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#007A94] via-[#00C9F2] to-[#00C9F2] px-4 py-3.5 text-white sm:px-5 sm:py-4">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
            <div className="relative flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Bot size={23} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-black">{text.title}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#ECFCFF]/80">
                  <span className="h-2 w-2 rounded-full bg-[#63E1FA] shadow-[0_0_8px_rgba(0,201,242,0.9)]" />
                  {text.status}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                aria-label={isExpanded
                  ? (t("interface.reduce_chat", { defaultValue: isRtl ? "تصغير نافذة الشات" : "Reduce chat" }))
                  : (t("interface.enlarge_chat", { defaultValue: isRtl ? "تكبير نافذة الشات" : "Enlarge chat" }))}
                title={isExpanded
                  ? (t("interface.reduce_chat", { defaultValue: isRtl ? "تصغير نافذة الشات" : "Reduce chat" }))
                  : (t("interface.enlarge_chat", { defaultValue: isRtl ? "تكبير نافذة الشات" : "Enlarge chat" }))}
                className="hidden h-9 w-9 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 sm:grid"
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button type="button" onClick={() => setIsOpen(false)} aria-label={text.close} className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20">
                <X size={18} />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="custom-scrollbar min-h-0 flex-1 space-y-4 overflow-x-hidden overflow-y-auto overscroll-contain bg-slate-50/80 p-3 sm:p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={message.role === "assistant" ? "w-full space-y-2 sm:max-w-[88%]" : "max-w-[88%]"}>
                  <div dir={getTextDirection(message.text)} className={`whitespace-pre-line rounded-2xl px-4 py-3 text-start text-[13px] leading-6 shadow-sm ${
                    message.role === "user"
                      ? "rounded-ee-md bg-[#00C9F2] font-semibold text-white"
                      : message.error
                        ? "rounded-es-md border border-red-100 bg-red-50 text-red-700"
                        : message.validation
                          ? "rounded-es-md border border-amber-100 bg-amber-50 text-amber-900"
                        : message.outOfScope
                          ? "rounded-es-md border border-amber-100 bg-amber-50 text-amber-900"
                          : "rounded-es-md border border-slate-100 bg-white text-slate-700"
                  }`}>
                    {message.role === "assistant" && !message.error && <Sparkles size={13} className="mb-1 inline text-[#00C9F2]" />}{" "}
                    {message.text}
                  </div>

                  {message.sources?.length > 0 && (
                    <div className="space-y-2">
                      {message.sources.map((source, index) => (
                        <Link dir={getTextDirection(source.title)} key={`${source.type}-${source.title}-${index}`} to={source.path || "/"} onClick={() => setIsOpen(false)} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white p-3 text-start shadow-sm transition hover:border-[#63E1FA] hover:shadow-md">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="line-clamp-2 break-words text-xs font-black leading-5 text-slate-800">{source.title}</p>
                              {source.meta && <p className="mt-0.5 text-[10px] font-bold text-[#00C9F2]">{source.meta}</p>}
                            </div>
                            <ExternalLink size={13} className="mt-1 shrink-0 text-slate-400 transition group-hover:text-[#00C9F2]" />
                          </div>
                          {source.description && <p className="mt-1 line-clamp-1 text-[11px] leading-5 text-slate-500 sm:line-clamp-2">{source.description}</p>}
                          <span className="mt-1.5 inline-block text-[10px] font-black text-[#007A94]">{text.source}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {message.suggestions?.length > 0 && message.id === messages[messages.length - 1]?.id && (
                    <div className="custom-scrollbar flex gap-1.5 overflow-x-auto pb-1 pt-1 sm:flex-wrap sm:overflow-visible">
                      {message.suggestions.map((suggestion) => (
                        <button dir={getTextDirection(suggestion)} key={suggestion} type="button" onClick={() => ask(suggestion)} disabled={isLoading} className="shrink-0 rounded-full border border-[#A1EDFF] bg-white px-3 py-1.5 text-[10px] font-bold text-[#007A94] transition hover:border-[#00C9F2] hover:bg-[#ECFCFF] disabled:opacity-50">
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-es-md border border-slate-100 bg-white px-4 py-3 text-[#00C9F2] shadow-sm">
                  <LoaderCircle size={16} className="animate-spin" />
                  <span className="flex gap-1"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2AD5F5]" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2AD5F5] [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2AD5F5] [animation-delay:300ms]" /></span>
                </div>
              </div>
            )}
          </div>

          <footer className="shrink-0 border-t border-slate-100 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <form onSubmit={submit} className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                dir={input ? getTextDirection(input) : (isRtl ? "rtl" : "ltr")}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    ask(input);
                  }
                }}
                maxLength={500}
                placeholder={text.placeholder}
                className="max-h-24 min-h-11 min-w-0 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-base leading-5 text-slate-800 outline-none transition focus:border-[#00C9F2] focus:bg-white focus:ring-4 focus:ring-[#00C9F2]/10 sm:text-xs"
              />
              <button type="submit" disabled={!input.trim() || isLoading} aria-label={text.send} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#00C9F2] text-white shadow-lg shadow-[#00C9F2]/20 transition hover:bg-[#007A94] disabled:cursor-not-allowed disabled:opacity-40">
                {isLoading ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={17} className={isRtl ? "-scale-x-100" : ""} />}
              </button>
            </form>
            <p className="mt-2 text-center text-[9px] font-semibold text-slate-400">{text.note}</p>
          </footer>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? text.close : text.open}
        className={`group relative isolate h-14 w-14 place-items-center rounded-[1.25rem] border border-white/30 text-white shadow-[0_8px_30px_rgba(0,201,242,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,201,242,0.55)] motion-reduce:transform-none ${isRtl ? "ml-auto" : "mr-auto"} ${isOpen ? "hidden bg-slate-800 sm:grid" : "grid bg-gradient-to-br from-[#2AD5F5] via-[#00C9F2] to-[#006176]"}`}
      >
        {isOpen ? <X size={23} /> : (
          <>
            <span aria-hidden="true" className="pointer-events-none absolute inset-1 rounded-2xl border border-white/15 bg-gradient-to-b from-white/15 to-transparent" />
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? {} : { y: [0, -3, 0], rotate: [0, -5, 0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative grid h-10 w-10 place-items-center drop-shadow-md"
            >
              <Bot size={29} strokeWidth={1.8} />
            </motion.span>
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? {} : { opacity: [0.55, 1, 0.55], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full border border-white/80 bg-[#00313D] text-[#A1EDFF] shadow-sm"
            >
              <Sparkles size={12} />
            </motion.span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;
