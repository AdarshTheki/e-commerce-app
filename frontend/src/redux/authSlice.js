import { createSlice } from '@reduxjs/toolkit';
import { toasts } from '../utils';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            toasts({ message: 'User Login successful' });
        },
        setLogout: (state) => {
            state.user = null;
            toasts({ message: 'User Logout successful' });
        },
    },
});
export const { setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;

export const getUser = (state) => state.auth.user;
