import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    return user?.email ? children : <Navigate to='/login' replace />;
};

export default PrivateRoute;
