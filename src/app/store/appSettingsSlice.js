import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
};

const appSettingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        toggleDarkMode(state, action) {
            if (action.payload) {
                const theme = action.payload;
                state.theme = theme;
                const root = window.document.documentElement;
                root.classList.remove(theme === 'light' ? 'dark' : 'light');
                root.classList.add(theme);
            }
        },
    },
});

export default appSettingsSlice.reducer;

export const { toggleDarkMode } = appSettingsSlice.actions;

export const selectAppTheme = (state) => state.settings.theme;
