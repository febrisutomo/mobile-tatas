import axiosInstance from '@src/api/axiosInstance';
import RNFetchBlob from 'rn-fetch-blob';
import { useQuery } from '@tanstack/react-query';
import store from '@src/redux/store';
import { API_URL } from '@env';
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

export const useGetListFiles = () => {
  return useQuery({
    queryKey: ['file'],
    queryFn: async () => {
      const res = await axiosInstance.get('model');
      console.log(res.data);
      return res.data;
    },
    select: (data) => data.files,
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
