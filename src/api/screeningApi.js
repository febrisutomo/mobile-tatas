import axiosInstance from '@src/utils/axiosInstance';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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
