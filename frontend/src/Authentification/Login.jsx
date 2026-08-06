// import React, { useState } from 'react';
// import apiAdmin from '../api/apiAdmin';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from "react-i18next";

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const { t } = useTranslation();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
        
//         try {
//             // Initialisation CSRF pour Sanctum
//             await apiAdmin.get('http://localhost:8000/sanctum/csrf-cookie');

//             const response = await apiAdmin.post('/login', formData);
            
//             if (response.data.token) {
//                 // 1. Stockage unifié
//                 localStorage.setItem('auth_token', response.data.token);
//                 localStorage.setItem('role', response.data.user.role);
//                 localStorage.setItem('prenomUtilisateur', response.data.user.prenomUtilisateur); 
//                 localStorage.setItem('nomUtilisateur', response.data.user.nomUtilisateur); 
//                 localStorage.setItem('emailUtilisateur', response.data.user.email); 

//                 // 2. Redirection intelligente
//                 const userRole = response.data.user.role;
//                 if (userRole === 'superviseur') {
//                     window.location.href = '/admin/dashboard'; // Force le reload pour l'admin
//                 } else {
//                     window.location.href = '/'; // Force le reload pour l'user
//                 }
//             }
//         } catch (err) {
//             setError(t("Identifiants invalides ou problème de connexion"));
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//             <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-slate-900">{t("menu.login")}</h2>
//                 </div>

//                 {error && (
//                     <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="block text-sm font-bold text-slate-700 mb-1 ltr:text-left rtl:text-right">البريد الإلكتروني</label>
//                         <input 
//                             type="email" 
//                             required
//                             placeholder="example@mail.com"
//                             className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                             onChange={(e) => setFormData({...formData, email: e.target.value})}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-bold text-slate-700 mb-1 ltr:text-left rtl:text-right">كلمة المرور</label>
//                         <input 
//                             type="password" 
//                             required
//                             placeholder="••••••••"
//                             className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                             onChange={(e) => setFormData({...formData, password: e.target.value})}
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 active:scale-95">
//                         تسجيل الدخول
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;












// import React, { useState } from 'react';
// import apiAdmin from '../api/apiAdmin';
// import { useNavigate, Link } from 'react-router-dom'; // Ajout de Link ici
// import { useTranslation } from "react-i18next";

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const { t } = useTranslation();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
        
//         try {
//             await apiAdmin.get('http://localhost:8000/sanctum/csrf-cookie');
//             const response = await apiAdmin.post('/login', formData);
            
//             if (response.data.token) {
//                 localStorage.setItem('auth_token', response.data.token);
//                 localStorage.setItem('role', response.data.user.role);
//                 localStorage.setItem('prenomUtilisateur', response.data.user.prenomUtilisateur); 
//                 localStorage.setItem('nomUtilisateur', response.data.user.nomUtilisateur); 
//                 localStorage.setItem('emailUtilisateur', response.data.user.email); 

//                 const userRole = response.data.user.role;
//                 if (userRole === 'superviseur') {
//                     window.location.href = '/admin/dashboard';
//                 } else {
//                     window.location.href = '/';
//                 }
//             }
//         } catch (err) {
//             setError(t("Identifiants invalides ou problème de connexion"));
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//             <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-slate-900">{t("menu.login")}</h2>
//                 </div>

//                 {error && (
//                     <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="block text-sm font-bold text-slate-700 mb-1 ltr:text-left rtl:text-right">البريد الإلكتروني</label>
//                         <input 
//                             type="email" 
//                             required
//                             placeholder="example@mail.com"
//                             className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                             onChange={(e) => setFormData({...formData, email: e.target.value})}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-bold text-slate-700 mb-1 ltr:text-left rtl:text-right">كلمة المرور</label>
//                         <input 
//                             type="password" 
//                             required
//                             placeholder="••••••••"
//                             className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                             onChange={(e) => setFormData({...formData, password: e.target.value})}
//                         />
//                     </div>
//                     <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-100 transition-all transform hover:-translate-y-0.5 active:scale-95">
//                         تسجيل الدخول
//                     </button>
//                 </form>

//                 {/* --- Nouvelle section : Créer un compte --- */}
//                 <div className="mt-8 pt-6 border-t border-slate-100 text-center">
//                     <p className="text-slate-600 mb-2">ليس لديك حساب؟</p>
//                     <Link 
//                         to="/register" 
//                         className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline-offset-4 hover:underline"
//                     >
//                         إنشاء حساب جديد
//                     </Link>
//                 </div>
//                 {/* --------------------------------------- */}

//             </div>
//         </div>
//     );
// };

// export default Login;


















import React, { useEffect, useRef, useState } from 'react';
import apiAdmin, { setAuthSession } from '../api/apiAdmin';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import RegistrationProfileFields, { emptyRegistrationForm } from './RegistrationProfileFields';

let googleIdentityScriptPromise;

const loadGoogleIdentityScript = () => {
    if (window.google?.accounts?.id) return Promise.resolve();
    if (googleIdentityScriptPromise) return googleIdentityScriptPromise;

    googleIdentityScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Google Identity Services could not be loaded.'));
        document.head.appendChild(script);
    });

    return googleIdentityScriptPromise;
};

const Auth = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState(emptyRegistrationForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [deactivatedAccount, setDeactivatedAccount] = useState(null);
    const [reactivationMessage, setReactivationMessage] = useState('');
    const googleButtonRef = useRef(null);
    
    const { t } = useTranslation();

    useEffect(() => {
        if (deactivatedAccount) return undefined;
        let cancelled = false;

        const initializeGoogleButton = async () => {
            try {
                const [{ data }] = await Promise.all([
                    apiAdmin.get('/auth/google/config'),
                    loadGoogleIdentityScript(),
                ]);

                if (cancelled || !googleButtonRef.current) return;

                window.google.accounts.id.initialize({
                    client_id: data.client_id,
                    callback: async ({ credential }) => {
                        if (!credential) return;
                        setLoading(true);
                        setError('');

                        try {
                            const response = await apiAdmin.post('/auth/google/credential', { credential });
                            setAuthSession(response.data);
                            window.location.href = response.data.user.role === 'superviseur' ? '/admin/dashboard' : '/';
                        } catch (requestError) {
                            if (requestError.response?.data?.code === 'ACCOUNT_DEACTIVATED') {
                                setDeactivatedAccount({ email: requestError.response.data.email || '' });
                            } else {
                                setError(requestError.response?.data?.message || 'تعذر تسجيل الدخول باستخدام Google.');
                            }
                            setLoading(false);
                        }
                    },
                });

                googleButtonRef.current.replaceChildren();
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text: isLogin ? 'signin_with' : 'signup_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                    locale: 'ar',
                    width: Math.min(370, googleButtonRef.current.clientWidth || 370),
                });
            } catch (requestError) {
                if (!cancelled) setError(requestError.response?.data?.message || 'تعذر تحميل تسجيل الدخول باستخدام Google.');
            }
        };

        initializeGoogleButton();
        return () => {
            cancelled = true;
        };
    }, [deactivatedAccount, isLogin]);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData(emptyRegistrationForm);
        setDeactivatedAccount(null);
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const response = await apiAdmin.post('/login', {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data.token) {
                    setAuthSession(response.data);

                    const returnTo = typeof location.state?.from === 'string' && location.state.from.startsWith('/')
                        ? location.state.from
                        : '/';
                    window.location.href = response.data.user.role === 'superviseur' ? '/admin/dashboard' : returnTo;
                }
            } else {
                const response = await apiAdmin.post('/register', formData);
                alert(response.data.message || "تم إنشاء الحساب بنجاح");
                setIsLogin(true);
                setFormData(emptyRegistrationForm);
            }
        } catch (err) {
            if (err.response?.data?.code === 'ACCOUNT_DEACTIVATED') {
                setDeactivatedAccount({ email: formData.email });
                setError('');
            } else {
                setError(err.response?.data?.message || t("Identifiants invalides"));
            }
        } finally {
            setLoading(false);
        }
    };

    const contactAdministrator = (event) => {
        event.preventDefault();
        const subject = 'طلب إعادة تفعيل الحساب';
        const body = [
            `البريد الإلكتروني: ${deactivatedAccount.email}`,
            '',
            reactivationMessage,
        ].join('\n');
        window.location.href = `mailto:id@aidsmo.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    if (deactivatedAccount) {
        return (
            <div dir="rtl" className="relative flex min-h-screen w-full items-start justify-center overflow-x-hidden bg-emerald-600/50 px-4 py-8 sm:px-6 sm:py-12">
                <div className="absolute inset-0 z-0">
                    <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-emerald-600/20 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
                </div>
                <div className="relative z-10 w-full max-w-xl rounded-[2rem] border border-white/20 bg-white/95 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10">
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <h1 className="text-2xl font-black text-amber-900">الحساب معطل</h1>
                        <p className="mt-2 text-sm leading-7 text-amber-800/80">تم الاحتفاظ بجميع بياناتك، لكن تسجيل الدخول متوقف. أرسل طلباً إلى الإدارة لإعادة تفعيل الحساب.</p>
                    </div>

                    <form onSubmit={contactAdministrator} className="mt-6 space-y-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-bold text-slate-700">البريد الإلكتروني</span>
                            <input dir="ltr" type="email" value={deactivatedAccount.email} readOnly className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-left text-sm text-slate-500 outline-none" />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm font-bold text-slate-700">رسالتك إلى الإدارة *</span>
                            <textarea required rows="5" value={reactivationMessage} onChange={(event) => setReactivationMessage(event.target.value)} placeholder="اشرح طلبك لإعادة تفعيل الحساب..." className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                        </label>
                        <button className="w-full rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white hover:bg-emerald-700">التواصل مع الإدارة</button>
                        <button type="button" onClick={() => { setDeactivatedAccount(null); setReactivationMessage(''); }} className="w-full rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">العودة إلى تسجيل الدخول</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex items-start justify-center overflow-x-hidden bg-emerald-600/50 px-4 py-8 sm:px-6 sm:py-12">
            
            {/* --- ARRIÈRE-PLAN ANIMÉ (Background) --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* --- CARTE PRINCIPALE (Glassmorphism) --- */}
            <div className={`relative z-10 w-full ${isLogin ? "max-w-[450px]" : "max-w-[760px]"} bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 transition-all duration-700 ease-in-out`}>
                
                {/* Header avec Dégradé */}
                <div className="pt-12 pb-6 px-10 text-center">

                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
                        {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
                    </h2>
                    <p className="text-slate-500 font-medium">
                        {isLogin ? "يرجى إدخال بياناتك للمتابعة" : "ابدأ رحلتك معنا اليوم"}
                    </p>
                </div>

                {error && (
                    <div className="mx-10 bg-red-50 text-red-600 p-4 rounded-2xl mb-4 text-sm text-center border border-red-100 animate-bounce">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="px-10 pb-10 space-y-5">
                    <div ref={googleButtonRef} className="flex min-h-11 w-full items-center justify-center" />
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" />
                        <span>{isLogin ? "أو تسجيل الدخول بالبريد الإلكتروني" : "أو إنشاء حساب بالبريد الإلكتروني"}</span>
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>
                    
                    {/* Champ Nom Complet (Mode Register) */}
                    <div className={`transition-all duration-500 overflow-hidden ${!isLogin ? 'max-h-24 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
                        <label className="block text-sm font-bold text-slate-700 mb-2 mr-1 rtl:text-right">الاسم الكامل</label>
                        <input 
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                            placeholder="مثال: محمد أحمد"
                            value={formData.nomComplet}
                            onChange={(e) => setFormData({...formData, nomComplet: e.target.value})}
                            required={!isLogin}
                        />
                    </div>

                    {!isLogin && (
                        <RegistrationProfileFields formData={formData} setFormData={setFormData} />
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 mr-1 rtl:text-right">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                            placeholder="mail@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 mr-1 rtl:text-right">كلمة المرور</label>
                        <input 
                            type="password" 
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    {/* Bouton d'action */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full group relative flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 overflow-hidden"
                    >
                        <span className="relative z-10">
                            {loading ? "..." : (isLogin ? "دخول" : "تأكيد التسجيل")}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    {/* Switcher Mode */}
                    <div className="text-center pt-4">
                        <p className="text-slate-500 text-sm font-medium">
                            {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                            <button 
                                type="button"
                                onClick={toggleMode}
                                className="mr-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                            >
                                {isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول"}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
