import axios from "axios";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
  .replace(/\/+$/, "");

const authStorageKeys = [
  "auth_token",
  "role",
  "prenomUtilisateur",
  "nomUtilisateur",
  "emailUtilisateur",
];

export const clearAuthSession = () => {
  authStorageKeys.forEach((key) => localStorage.removeItem(key));
};

export const setAuthSession = ({ token, user }) => {
  clearAuthSession();
  localStorage.setItem("auth_token", token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("prenomUtilisateur", user.prenomUtilisateur ?? "");
  localStorage.setItem("nomUtilisateur", user.nomUtilisateur ?? "");
  localStorage.setItem("emailUtilisateur", user.email ?? "");
};

const apiAdmin = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: {
    Accept: "application/json",
  },
});

apiAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")?.trim();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

apiAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthSession();

      if (window.location.pathname !== "/login") {
        const returnTo = `${window.location.pathname}${window.location.search}`;
        window.location.assign(`/login?from=${encodeURIComponent(returnTo)}`);
      }
    }

    return Promise.reject(error);
  },
);

export default apiAdmin;
