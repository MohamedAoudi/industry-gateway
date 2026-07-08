// // import axios from 'axios';

// // const api = axios.create({
// //     baseURL: 'http://localhost:8000/api',
// // });

// // // Intercepteur pour ajouter le token automatiquement
// // api.interceptors.request.use((config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// // });

// // export default api;





// import axios from 'axios';

// const apiAdmin = axios.create({
//     baseURL: 'http://localhost:8000/api',
//     withCredentials: true, 
// });

// apiAdmin.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default apiAdmin;








import axios from 'axios';

const apiAdmin = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true, // Important pour Sanctum
});

// Ajoute automatiquement le token à chaque requête
apiAdmin.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiAdmin;