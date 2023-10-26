import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const useGetFaskes = () => {
  return useQuery({
    queryKey: ['faskes'],
    queryFn: async () => {
      const response = await axiosInstance.get('faskes');
      console.log('faskes', response.data);
      return response.data;
    },
  });
};
