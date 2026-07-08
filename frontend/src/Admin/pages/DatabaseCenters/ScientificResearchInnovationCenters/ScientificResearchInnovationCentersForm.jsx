import React, { useState, useEffect } from 'react';
import apiAdmin from '../../../../api/apiAdmin'; 
import { motion } from 'framer-motion';
import { Upload, Globe, Shield, MapPin, AlignLeft, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ScientificResearchInnovationCentersForm = () => {
    const navigate = useNavigate();    
    const initialFormState = {
        titre_ar: '', titre_en: '', idPays: '',
        description_ar: '', description_en: '', url: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [countries, setCountries] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await apiAdmin.get('/pays');
                setCountries(res.data);
            } catch (err) { console.error("Erreur pays", err); }
        };
        fetchCountries();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loadToast = toast.loading('جاري حفظ البيانات...');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('photo', image);

        try {
            await apiAdmin.post('/scientificResearchInnovationCenters', data); 
            
            toast.success('تم إضافة المركز بنجاح', { id: loadToast });
            
            setTimeout(() => {
                navigate('/admin/ScientificResearchInnovationCentersList');
            }, 1500);
            
        } catch (error) {
            toast.error('حدث خطأ أثناء إرسال البيانات', { id: loadToast });
            console.error(error);
            setLoading(false);
        }
    };

    // Ajustement des styles de focus avec la couleur Olive (#606c38)
    const inputStyle = "w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#606c38]/40 focus:border-[#606c38] transition-all outline-none placeholder:text-gray-400 text-slate-800 font-medium";
    const labelStyle = "block text-sm font-bold text-[#283618] mb-2 flex items-center gap-2";

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <Toaster position="top-center" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-[#283618]/5 border border-white overflow-hidden"
            >
                {/* Header : Dégradé du Vert Forêt au Vert Olive */}
                <div className="bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 p-10 text-white relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">إضافة مركز بحث علمي</h2>
                        </div>
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                            <Shield className="text-[#fefae0]" size={32} />
                        </div>
                    </div>
                    {/* Halo de lumière décoratif subtil couleur Crème */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#fefae0]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8" dir="rtl">
                    
                    {/* Section: Informations Générales */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                            <div className="w-2 h-8 bg-[#606c38] rounded-full"></div>
                            <h3 className="font-black text-[#283618] text-lg">معلومات عامة</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}><AlignLeft size={16}/> الاسم (بالعربية)</label>
                                <input name="titre_ar" value={formData.titre_ar} onChange={handleChange} className={inputStyle} dir="rtl" required />
                            </div>
                            <div>
                                <label className={labelStyle}><AlignLeft size={16}/>الاسم (بالانجليزية)</label>
                                <input name="titre_en" value={formData.titre_en} onChange={handleChange} className={inputStyle} dir="ltr" />
                            </div>
                        </div>

                        <div>
                            <label className={labelStyle}><MapPin size={16}/> الدولة</label>
                            <select name="idPays" value={formData.idPays} onChange={handleChange} className={inputStyle} required>
                                <option value="">اختر دولة</option>
                                {countries.map(c => <option key={c.idPays} value={c.idPays}>{c.nomPays}</option>)}
                            </select>
                        </div>
                    </section>

                    {/* Section: Descriptions */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyle}>الوصف (بالعربية)</label>
                            <textarea name="description_ar" value={formData.description_ar} onChange={handleChange} className={`${inputStyle} h-40 resize-none`} dir="rtl"></textarea>
                        </div>
                        <div>
                            <label className={labelStyle}>الوصف (بالانجليزية)</label>
                            <textarea name="description_en" value={formData.description_en} onChange={handleChange} className={`${inputStyle} h-40 resize-none`} dir="ltr"></textarea>
                        </div>
                    </section>

                    {/* Section: Média & Liens */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <div className="space-y-4">
                            <label className={labelStyle}><Globe size={16}/> رابط الموقع الإلكتروني</label>
                            <div className="relative group">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#606c38] transition-colors" size={18} />
                                <input name="url" value={formData.url} onChange={handleChange} className={`${inputStyle} pl-12`} dir="ltr" />
                            </div>
                        </div>

                        <div className="relative">
                            <label className={labelStyle}><Upload size={16}/>صورة المركز</label>
                            {/* Zone d'upload passant au fond Crème (#fefae0) au survol */}
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-[#fefae0]/60 hover:border-[#606c38] transition-all overflow-hidden group">
                                {preview ? (
                                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 group-hover:text-[#283618]">
                                        <Upload size={24} className="mb-2 text-[#606c38]" />
                                        <p className="text-xs font-bold">اضغط لرفع الصورة</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={handleImageChange} />
                            </label>
                        </div>
                    </section>

                    {/* Button Submit en Vert Forêt (#283618) et texte Crème (#fefae0) */}
                    <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit" 
                        className={`w-full relative overflow-hidden group py-5 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-3 
                            ${loading ? 'bg-emerald-600 cursor-not-allowed text-[#fefae0]/80' : 'bg-emerald-500 hover:bg-emerald-600 text-[#fefae0] shadow-emerald-500/10'}`}
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Send size={20} className="group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-lg">تسجيل البيانات في النظام</span>
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ScientificResearchInnovationCentersForm;