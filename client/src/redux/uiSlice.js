import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebar: false,
    mode: '',
    checkout: 'customer',
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebar: (state) => {
            state.isSidebar = !state.isSidebar;
        },
        setMode: (state, { payload }) => {
            state.mode = payload;
        },
        setCheckout: (state, { payload }) => {
            state.checkout = payload;
        },
    },
});

export const { setSidebar, setMode, setCheckout } = sidebarSlice.actions;

export default sidebarSlice.reducer;
