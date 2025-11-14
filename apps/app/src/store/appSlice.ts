import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    searchValue: string;
    searchTrigger: boolean;
}

const initialState: AppState = {
    searchValue: "",
    searchTrigger: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setSearchTrigger: (state) => {
            state.searchTrigger = !state.searchTrigger;
        }
    },
});

export const { setSearchValue, setSearchTrigger } = appSlice.actions;
export default appSlice.reducer;