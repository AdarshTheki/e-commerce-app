import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebar: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebar: (state) => {
            state.isSidebar = !state.isSidebar;
        },
    },
});

export const { setSidebar } = sidebarSlice.actions;
export const getSidebarStatus = (state) => state.ui.isSidebar;

export default sidebarSlice.reducer;
