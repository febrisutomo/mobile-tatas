import axiosInstance from '@src/api/axiosInstance';
import RNFetchBlob from 'rn-fetch-blob';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import store from '@src/redux/store';
import { API_URL } from '@env';
import { ToastAndroid } from 'react-native';

export const useGetScreeningsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['screening_history'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(
        `screenings/me/history?page=${pageParam}&per_page=6`,
      );
      console.log(res.data);
      return res.data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.next_page,
  });
};

export const useGetScreeningResult = () => {
  return useQuery({
    queryKey: ['screening_result'],
    queryFn: async () => {
      const res = await axiosInstance.get('screenings/me');
      console.log(res.data);
      return res.data;
    },
    select: (data) => data.screening,
  });
};

export const useAddScreening = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('screenings/me', data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['screening_result'],
      });
      queryClient.invalidateQueries({
        queryKey: ['screening_history'],
      });
    },
  });
};

export const useGetEvaluateModel = () => {
  return useQuery({
    queryKey: ['evaluate_model'],
    queryFn: async () => {
      const res = await axiosInstance.get('screenings/evaluate-model');
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
      const res = await axiosInstance.get('screenings/list-files');
      console.log(res.data);
      return res.data;
    },
    select: (data) => data.files,
  });
};

export const downloadDataset = async () => {
  const filename = 'dataset.xls';
  const { accessToken } = store.getState().authSlice;
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await RNFetchBlob.config({
      fileCache: true,
      appendExt: filename.split('.').pop(),
    }).fetch('GET', `${API_URL}/screenings/download-dataset`, headers);

    // Get the path of the downloaded file
    const filePath = response.path();

    // Move the downloaded file to the Download directory
    const downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    const newFilePath = `${downloadDir}/${filename}`;
    await RNFetchBlob.fs.mv(filePath, newFilePath);

    ToastAndroid.show(
      `File downloaded and saved at: ${newFilePath}`,
      ToastAndroid.SHORT,
    );
    console.log('File downloaded and saved at:', newFilePath);
  } catch (error) {
    ToastAndroid.show(`Error downloading file: ${error}`, ToastAndroid.SHORT);
    console.error('Error downloading file:', error);
  }
};
