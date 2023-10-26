import axiosInstance from '@src/api/axiosInstance';
import RNFetchBlob from 'rn-fetch-blob';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import store from '@src/redux/store';
import { API_URL } from '@src/config';
import { ToastAndroid } from 'react-native';

export const useGetEvaluateModel = () => {
  return useQuery({
    queryKey: ['evaluate_model'],
    queryFn: async () => {
      const res = await axiosInstance.get('models/evaluate');
      console.log(res.data);
      return res.data;
    },
    select: (data) => data.result,
  });
};

export const useGetListModel = () => {
  return useQuery({
    queryKey: ['model'],
    queryFn: async () => {
      const res = await axiosInstance.get('models');
      console.log(res.data);
      return res.data;
    },
    select: (data) => data.models,
  });
};

export const downloadDataset = async () => {
  const timestamp = new Date().getTime();
  const filename = `dataset_tatas_${timestamp}.xlsx`;
  const { accessToken } = store.getState().authSlice;
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await RNFetchBlob.config({
      fileCache: true,
      path: `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`,
    }).fetch('GET', `${API_URL}/models/download-dataset`, headers);

    const contentType = response.info().headers['Content-Type'];
    console.log('downloadDataset ~ contentType:', contentType);
    // Get the path of the downloaded file
    const filePath = response.path();
    console.log('downloadDataset ~ filePath:', filePath);

    ToastAndroid.show(
      `File downloaded and saved at: ${filePath}`,
      ToastAndroid.SHORT,
    );
  } catch (error) {
    ToastAndroid.show(`Error downloading file: ${error}`, ToastAndroid.SHORT);
    console.error('Error downloading file:', error);
  }
};

export const useActivateModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(`models/activate/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['model'],
      });
      queryClient.invalidateQueries({
        queryKey: ['evaluate_model'],
      });
    },
  });
};

export const useGenerateModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('models/generate', data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['model'],
      });
    },
  });
};
