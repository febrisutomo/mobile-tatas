import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import store from '@src/redux/store';
import {
  setAccessToken,
  setLoggedIn,
  setRefreshToken,
} from '@src/redux/slice/authSlice';
import axiosInstance from '@src/api/axiosInstance';

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/check-email', data);
      return response.data;
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/register', data);
      return response.data;
    },
    onError: (error) => {
      console.log('error', error.response.data.message);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      store.dispatch(setAccessToken(data.access_token));
      store.dispatch(setRefreshToken(data.refresh_token));
      store.dispatch(setLoggedIn(JSON.stringify(true)));
    },
    onError: (error) => {
      if (error?.response?.data?.message) {
        console.log('error', error.response.data.message);
      } else {
        console.log('error', error);
      }
    },
  });
};

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/google-login', data);
      return response.data;
    },
    onSuccess: (data) => {
      store.dispatch(setAccessToken(data.access_token));
      store.dispatch(setRefreshToken(data.refresh_token));
      store.dispatch(setLoggedIn(JSON.stringify(true)));
    },
    onError: (error) => {
      if (error?.response?.data?.message) {
        console.log('error', error.response.data.message);
      } else {
        console.log('error', error);
      }
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/profile');
      return response.data;
    },
    select: (data) => data.user,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch('/auth/profile', data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch('/auth/change-password', data);
      return response.data;
    },
  });
};
