import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setStatus } from '../../redux/uiSlice';

const Customer = () => {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.ui.process);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user?.email) {
            dispatch(setEmail(user?.email));
        }
    }, [dispatch, user?.email]);

    return (
        <div className='pl-12'>
            <p>{email || '#NA'}</p>
            <button
                onClick={() => dispatch(setStatus('delivery'))}
                className='bg-gray-800 hover:bg-gray-700 text-white px-14 py-2 mt-4 rounded'>
                Continue to delivery
            </button>
        </div>
    );
};

export default Customer;
