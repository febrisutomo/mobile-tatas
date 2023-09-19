import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logout: () => initialState,
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice;

export const { logout, setAccessToken, setRefreshToken, setLoggedIn, setUser } =
  authSlice.actions;
