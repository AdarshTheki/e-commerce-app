import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            state.user = null;
        },
    },
});
export const { setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;
