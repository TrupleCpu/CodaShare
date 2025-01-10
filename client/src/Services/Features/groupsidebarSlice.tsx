import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface groupsidebarSate {
    groupsidebarLocation: string
}

const initialState: groupsidebarSate = {
    groupsidebarLocation: "Codes"
}

const groupsidebarSlice = createSlice({
    name: 'groupsideBar',
    initialState,
    reducers: {
        setGroupsidebarLocation: (state, action: PayloadAction<string>) => {
           state.groupsidebarLocation = action.payload
        }
    }
})

export const { setGroupsidebarLocation } = groupsidebarSlice.actions;
export default groupsidebarSlice.reducer;