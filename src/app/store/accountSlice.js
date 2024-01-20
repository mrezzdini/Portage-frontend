import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AuthService from '../services/authService';
import TokenService from '../services/tokenService';

/**
 * Async action to register the user
 *
 * @param {object} user : the user to register
 *
 * @author Peter Mollet
 */
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const response = await AuthService.register(user);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

export const authenticate = createAsyncThunk(
    'keycloak/auth/login',
    async (values, thunkAPI) => {
        try {
            const data = await AuthService.authenticate(values);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    },
);

/**
 * Async action to logout the user
 * @author Peter Mollet
 *
 */
export const logout = createAsyncThunk('keycloak/auth/logout', (tokenRefrech) => {
    AuthService.logout(tokenRefrech);
});

/**
 * Slice to handle the authentication. With extraReducers to handle the async actions.
 * @author Peter Mollet
 */
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isAuthenticated: false, username: null },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.username = '';
            })
            .addCase(register.rejected, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.username = '';
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                if (!action) {
                    return state; // No action, return current state
                }

                const token = action.payload.access_token;
                const RefrechToken = action.payload.refresh_token;
                console.log(RefrechToken);
                if (token) {
                    if (RefrechToken) {
                        state.refresh_token = RefrechToken;
                    }
                    const isValid = TokenService.isTokenValid(token);
                    if (isValid) {
                        state.isAuthenticated = true;
                        state.token = token;
                        state.userId = TokenService.getUserId(token);
                        state.email = TokenService.getMail(token);
                        TokenService.getRoles(token).map((role) => {
                            if (role == 'ADMIN' || role == 'CONSULTANT') {
                                state.profile = role;
                            }
                        });
                        state.username = TokenService.getTokenSubject(token);
                        return;
                    }
                }
                state.isAuthenticated = false;
                state.token = null;
                state.username = '';
            })
            .addCase(authenticate.rejected, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.username = '';
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.username = '';
            });
    },
});

export default authSlice.reducer;
