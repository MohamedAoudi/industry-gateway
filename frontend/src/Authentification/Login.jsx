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


















import React, { useState } from 'react';
import apiAdmin from '../api/apiAdmin';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Auth = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ nomComplet: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { t } = useTranslation();

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ nomComplet: '', email: '', password: '' });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // await apiAdmin.get('http://localhost:8000/sanctum/csrf-cookie');
            await apiAdmin.get('http://127.0.0.1:8000/sanctum/csrf-cookie');


            if (isLogin) {
                const response = await apiAdmin.post('/login', {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data.token) {
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('role', response.data.user.role);
                    localStorage.setItem('prenomUtilisateur', response.data.user.prenomUtilisateur);
                    localStorage.setItem('nomUtilisateur', response.data.user.nomUtilisateur);
                    localStorage.setItem('emailUtilisateur', response.data.user.email);

                    const returnTo = typeof location.state?.from === 'string' && location.state.from.startsWith('/')
                        ? location.state.from
                        : '/';
                    window.location.href = response.data.user.role === 'superviseur' ? '/admin/dashboard' : returnTo;
                }
            } else {
                const response = await apiAdmin.post('/register', formData);
                alert(response.data.message || "تم إنشاء الحساب بنجاح");
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || t("Identifiants invalides"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-emerald-600/50">
            
            {/* --- ARRIÈRE-PLAN ANIMÉ (Background) --- */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* --- CARTE PRINCIPALE (Glassmorphism) --- */}
            <div className="relative z-10 w-full max-w-[450px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 transition-all duration-700 ease-in-out overflow-hidden">
                
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
                    
                    {/* Champ Nom Complet (Mode Register) */}
                    <div className={`transition-all duration-500 overflow-hidden ${!isLogin ? 'max-h-24 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
                        <label className="block text-sm font-bold text-slate-700 mb-2 mr-1 rtl:text-right">الاسم الكامل</label>
                        <input 
                            type="text" 
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                            placeholder="John Doe"
                            value={formData.nomComplet}
                            onChange={(e) => setFormData({...formData, nomComplet: e.target.value})}
                            required={!isLogin}
                        />
                    </div>

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
