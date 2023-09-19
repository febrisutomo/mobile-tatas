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

export const useGetScreeningHistoryInfinite = () => {
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

export const useGetAllScreeningsInfinite = (confirmed = '') => {
  return useInfiniteQuery({
    queryKey: ['screenings', confirmed],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(
        `screenings?confirmed=${confirmed}&page=${pageParam}&per_page=6`,
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

export const useUpdateDNA = (screening_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(
        `screenings/${screening_id}/update-dna`,
        data,
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['screenings'],
      });
    },
  });
};

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
      const res = await axiosInstance.get('models');
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
