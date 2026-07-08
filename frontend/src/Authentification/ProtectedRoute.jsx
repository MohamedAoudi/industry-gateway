import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('role');

    // Si pas de token, retour au login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si rôle non autorisé (ex: un user tente d'aller en admin)
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;