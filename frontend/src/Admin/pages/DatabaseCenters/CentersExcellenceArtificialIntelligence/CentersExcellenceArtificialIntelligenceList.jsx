import React, { useEffect, useState } from 'react';
import apiAdmin from '../../../../api/apiAdmin'; 
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Pencil, 
  X, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import toast, { Toaster } from 'react-hot-toast';

/* --- Composant Interne: InstituteRow (Gère le Voir Plus / Voir Moins de chaque ligne) --- */
const InstituteRow = ({ inst, handleEditClick, handleDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const currentId = inst.id || inst.idCenter;

    // Seuil de caractères avant de couper la description
    const CHARACTER_LIMIT = 120; 

    const showReadMoreAr = inst.description_ar && inst.description_ar.length > CHARACTER_LIMIT;
    const showReadMoreEn = inst.description_en && inst.description_en.length > CHARACTER_LIMIT;
    const hasLongDescription = showReadMoreAr || showReadMoreEn;

    const renderDescription = (text, isAr = true) => {
        if (!text) return '';
        if (isExpanded || text.length <= CHARACTER_LIMIT) return text;
        return text.substring(0, CHARACTER_LIMIT) + '... ';
    };

    return (
        <tr className="hover:bg-[#fefae0]/40 transition-colors">
            <td className="p-5">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {inst.photo ? (
                        <img 
                            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${inst.photo}`}
                            alt="" className="w-full h-full object-cover"
                        />
                    ) : <ImageIcon className="text-[#606c38]/40" size={20} />}
                </div>
            </td>
            <td className="p-5">
                <div className="font-bold text-[#283618]">{inst.titre_ar}</div>
                <div className="text-[10px] text-[#606c38]/70 italic" dir="ltr">{inst.titre_en}</div>
            </td>
            <td className="p-5 font-bold text-slate-700">{inst.pays?.nomPays || 'N/A'}</td>
            
            {/* Colonne de description optimisée anti-overflow */}
            <td className="p-5 min-w-[320px] max-w-[500px] whitespace-normal">
                <div className="font-bold text-[#283618] break-words">
                    {renderDescription(inst.description_ar, true)}
                </div>
                <div className="text-[10px] text-[#606c38]/70 italic break-words mt-1" dir="ltr">
                    {renderDescription(inst.description_en, false)}
                </div>
                
                {hasLongDescription && (
                    <button 
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)} 
                        className="mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors block focus:outline-none"
                    >
                        {isExpanded ? 'عرض أقل' : 'عرض المزيد...'}
                    </button>
                )}
            </td>
            
            <td className="p-5 text-center">
                <div className="flex justify-center gap-2">
                    <button onClick={() => handleEditClick(inst)} className="p-2 bg-[#606c38]/10 text-[#606c38] rounded-lg hover:bg-[#606c38] hover:text-white transition-all">
                        <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(currentId)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

/* --- Composant Principal --- */
const centersExcellenceArtificialIntelligenceList = () => {
    const [institutes, setInstitutes] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    // États pour la Pagination (Laravel paginator)
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    
    // États pour le Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedInst, setSelectedInst] = useState(null);

    const fetchInstitutes = async (page = 1) => {
        try {
            setLoading(true);
            const res = await apiAdmin.get(`/centersExcellenceArtificialIntelligence?page=${page}&per_page=10`);
            
            setInstitutes(res.data.data || []);
            setCurrentPage(res.data.current_page || 1);
            setLastPage(res.data.last_page || 1);
        } catch (err) {
            console.error("Erreur API:", err);
            toast.error("خطأ أثناء تحميل البيانات");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutes(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا المركز؟")) {
            try {
                await apiAdmin.delete(`/centersExcellenceArtificialIntelligence/${id}`);
                toast.success("تم الحذف بنجاح");
                fetchInstitutes(currentPage);
            } catch (err) {
                toast.error("خطأ أثناء الحذف");
            }
        }
    };

    const handleEditClick = (inst) => {
        const normalizedInst = {
            ...inst,
            id: inst.id || inst.idCenter
        };
        setSelectedInst(normalizedInst);
        setIsEditModalOpen(true);
    };

    if (loading) return <div className="p-10 text-center font-bold text-[#606c38]">جاري تحميل البيانات...</div>;

    return (
        <div className="p-6 bg-slate-50 min-h-screen" dir="rtl">
            <Toaster position="top-center" />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-[#283618]">إدارة مراكز التميز والذكاء الإصطناعي</h1>
                </div>
                <Link to="/admin/CentersExcellenceArtificialIntelligenceForm" className="bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#283618]/10 font-bold">
                    <Plus size={20}/>
                    <span>إضافة مركز التميز والذكاء الإصطناعي جديد</span>
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right table-fixed min-w-[800px]">
                        <thead className="bg-emerald-600 text-white">
                            <tr>
                                <th className="p-5 text-sm font-bold w-[10%]">الصورة</th>
                                <th className="p-5 text-sm font-bold w-[25%]">المركز (AR/EN)</th>
                                <th className="p-5 text-sm font-bold w-[15%]">البلد</th>
                                <th className="p-5 text-sm font-bold w-[35%]">الوصف</th>
                                <th className="p-5 text-sm font-bold text-center w-[15%]">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {institutes.length > 0 ? (
                                institutes.map((inst) => (
                                    <InstituteRow 
                                        key={inst.id || inst.idCenter}
                                        inst={inst}
                                        handleEditClick={handleEditClick}
                                        handleDelete={handleDelete}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-slate-400">لا توجد بيانات.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Bloc de Pagination Synchronisé */}
                <div className="flex items-center justify-center gap-2 p-6 border-t bg-slate-50">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center bg-white disabled:opacity-50 hover:bg-[#283618] hover:text-white transition-all"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {[...Array(lastPage)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl font-bold transition-all ${
                              currentPage === page
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-white border text-slate-700 hover:bg-[#fefae0]'
                            }`}
                          >
                            {page}
                          </button>
                        );
                    })}

                    <button
                        disabled={currentPage === lastPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center bg-white disabled:opacity-50 hover:bg-[#283618] hover:text-white transition-all"
                    >
                        <ChevronLeft size={18} />
                    </button>
                </div>
            </div>

            {/* Modal de modification */}
            <AnimatePresence>
                {isEditModalOpen && selectedInst && (
                    <EditModal 
                        inst={selectedInst} 
                        onClose={() => setIsEditModalOpen(false)} 
                        onRefresh={() => fetchInstitutes(currentPage)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

/* --- Composant Interne: EditModal (Modifié pour inclure la sélection des pays) --- */
const EditModal = ({ inst, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({ ...inst });
    const [countries, setCountries] = useState([]); // État pour stocker la liste des pays
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(inst.photo ? `${import.meta.env.VITE_API_BASE_URL}/storage/${inst.photo}` : null);
    const [loading, setLoading] = useState(false);

    // Charger les pays au montage du modal
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await apiAdmin.get('/pays');
                setCountries(res.data);
            } catch (err) { 
                console.error("Erreur chargement pays", err); 
            }
        };
        fetchCountries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const data = new FormData();
        data.append('titre_ar', formData.titre_ar);
        data.append('titre_en', formData.titre_en);
        data.append('idPays', formData.idPays); // Envoi de la valeur du pays modifiée
        data.append('description_ar', formData.description_ar || '');
        data.append('description_en', formData.description_en || '');
        data.append('url', formData.url || '');

        if (image) {
            data.append('photo', image);
        }

        data.append('_method', 'PUT');

        try {
            await apiAdmin.post(`/centersExcellenceArtificialIntelligence/${inst.idCenter || inst.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            toast.success('تم التحديث بنجاح');
            onRefresh();
            onClose();
        } catch (err) {
            console.error(err.response?.data);
            toast.error('خطأ في التحقق من البيانات');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <h3 className="text-xl font-black text-[#283618]">تعديل بيانات المركز</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto">
                    {/* Rangée: Noms */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 text-[#606c38]">الاسم (AR)</label>
                            <input value={formData.titre_ar || ''} onChange={e => setFormData({...formData, titre_ar: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#606c38]" dir="rtl" required/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 text-[#606c38]">Name (EN)</label>
                            <input value={formData.titre_en || ''} onChange={e => setFormData({...formData, titre_en: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#606c38]" dir="ltr"/>
                        </div>
                    </div>

                    {/* Champ Sélection du Pays Ajouté */}
                    <div>
                        <label className="block text-xs font-bold mb-1 text-[#606c38] flex items-center gap-1">
                            <MapPin size={12}/> الدولة
                        </label>
                        <select 
                            value={formData.idPays || ''} 
                            onChange={e => setFormData({...formData, idPays: e.target.value})} 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#606c38]" 
                            required
                        >
                            <option value="">اختر دولة</option>
                            {countries.map(c => (
                                <option key={c.idPays} value={c.idPays}>
                                    {c.nomPays}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rangée: URL du site */}
                    <div>
                        <label className="block text-xs font-bold mb-1 text-[#606c38]">رابط الموقع</label>
                        <input value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#606c38]" placeholder="https://..." dir="ltr"/>
                    </div>

                    {/* Rangée: Descriptions */}
                    <div className="grid grid-cols-2 gap-4">
                        <textarea value={formData.description_ar || ''} onChange={e => setFormData({...formData, description_ar: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 text-sm focus:outline-none focus:border-[#606c38]" placeholder="الوصف بالعربية" dir="rtl"/>
                        <textarea value={formData.description_en || ''} onChange={e => setFormData({...formData, description_en: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 text-sm focus:outline-none focus:border-[#606c38]" placeholder="Description in English" dir="ltr"/>
                    </div>

                    {/* Gestion Image */}
                    <div className="flex items-center gap-4 p-4 border rounded-2xl bg-slate-50">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border bg-white">
                            {preview && <img src={preview} alt="preview" className="w-full h-full object-cover" />}
                        </div>
                        <label className="cursor-pointer bg-[#fefae0] text-[#283618] px-4 py-2 rounded-lg text-sm font-bold border border-[#606c38]/20 hover:bg-[#606c38]/10 transition-all">
                            تغيير الصورة
                            <input type="file" className="hidden" onChange={e => {
                                const file = e.target.files[0];
                                if(file) {
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }} />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button disabled={loading} type="submit" className="w-full py-4 bg-[#283618] text-[#fefae0] rounded-2xl font-bold hover:bg-[#606c38] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#283618]/10">
                        {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Send size={18}/> حفظ التغييرات</>}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default centersExcellenceArtificialIntelligenceList;