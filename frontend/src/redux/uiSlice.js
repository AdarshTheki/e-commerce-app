import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebar: false,
    mode: '',
    process: { status: 'customer', defaultEmail: '', email: '', shipping: {}, billing: {} },
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
        setStatus: (state, { payload }) => {
            state.process.status = payload;
        },
        setDefaultEmail: (state, { payload }) => {
            state.process.defaultEmail = payload;
        },
        setEmail: (state, { payload }) => {
            state.process.email = payload;
        },
        setShipping: (state, { payload }) => {
            state.process.shipping = payload;
        },
        setBilling: (state, { payload }) => {
            state.process.status = payload;
        },
    },
});

export const {
    setSidebar,
    setMode,
    setStatus,
    setDefaultEmail,
    setEmail,
    setBilling,
    setShipping,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
