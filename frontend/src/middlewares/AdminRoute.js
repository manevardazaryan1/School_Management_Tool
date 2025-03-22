import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function AdminRoute({ children }) {
    const userRole = useSelector((state) => state.auth.currentUser?.role); // Adjust to your auth state
    const location = useLocation();

    if (userRole !== 'admin') {
        // Redirect to a specific page or show an error message
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return children;
}

export default AdminRoute;