import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { setMode } from '../redux/uiSlice';

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.auth.user);

    const handlePopup = () => {
        dispatch(setMode('login'));
    };

    return currUser ? <Outlet /> : handlePopup();
};

export default ProtectedRoute;
