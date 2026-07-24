import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiAdmin from '../api/apiAdmin';
import { useTranslation } from "react-i18next";
import RegistrationProfileFields, { emptyRegistrationForm } from './RegistrationProfileFields';


const Register = () => {
    const [formData, setFormData] = useState(emptyRegistrationForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t} = useTranslation();
    

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Optionnel : Appel au cookie CSRF si tu utilises Sanctum pour le register aussi
            // await apiAdmin.get('http://localhost:8000/sanctum/csrf-cookie');

            const response = await apiAdmin.post('/register', formData);
            alert(response.data.message); // Affiche le message de succès du serveur
            navigate('/login'); // Redirige vers la connexion
        } catch (err) {
            // Affiche l'erreur spécifique du serveur
            setError(err.response?.data?.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-10">
                <h2 className="text-3xl font-bold text-center mb-8">{t("menu.register")}</h2>
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <input 
                        type="text" 
                        placeholder="الاسم الكامل"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, nomComplet: e.target.value})}
                    />
                    <RegistrationProfileFields formData={formData} setFormData={setFormData} />
                    <input 
                        type="email" 
                        placeholder="بريد إلكتروني"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="كلمة المرور"
                        required
                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                        disabled={loading}
                        className={`w-full bg-emerald-600 hover:bg-emerald-700 font-bold py-3 rounded-xl transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                    >
                        {loading ? "Chargement..." : "سجل الآن"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
