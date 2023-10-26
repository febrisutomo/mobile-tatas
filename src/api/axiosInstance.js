import axios from 'axios';
import store from '@src/redux/store';
import { setAccessToken, logout } from '@src/redux/slice/authSlice';
import { API_URL } from '@src/config';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().authSlice;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.data?.msg === 'Token has expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = store.getState().authSlice;
        // Make a request to refresh the token
        const response = await axios.post(+'/auth/refresh-token', null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { access_token } = response.data;

        // Update the token and refreshToken in the Redux store
        store.dispatch(setAccessToken(access_token));

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (_error) {
        // Handle refresh token failure
        store.dispatch(logout());
        console.log('Refresh token failed', _error);
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
