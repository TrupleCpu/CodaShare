import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface codeViewerState {
    viewerState: string
}

const initialState: codeViewerState = {
    viewerState: ''
}

const codeViewerSlice = createSlice({
    name: 'codeviewer',
    initialState,
    reducers: {
        setViewerState: (state, action: PayloadAction<string>) => {
            state.viewerState = action.payload;
        }
    }

})

export const { setViewerState } = codeViewerSlice.actions;

export default codeViewerSlice.reducer;