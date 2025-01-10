import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SidebarState {
    locationState: string
}

const initialState: SidebarState = {
    locationState: 'dashboard'
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setLocationState: (state, action: PayloadAction<string>) => {
            state.locationState = action.payload;
        }
    }
})

export const { setLocationState } = sidebarSlice.actions;

export default sidebarSlice.reducer;