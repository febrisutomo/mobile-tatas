import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const useGetNewsInfinite = () => {
  const getNews = async ({ pageParam = 1 }) => {
    const res = await axiosInstance.get(
      `posts/news?page=${pageParam}&per_page=10`,
    );
    return res.data;
  };

  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: getNews,
    getNextPageParam: (lastPage, pages) => lastPage.next_page,
  });
};

// get agenda
export const useGetAgendaInfinite = () => {
  const getAgenda = async ({ pageParam = 1 }) => {
    const res = await axiosInstance.get(
      `posts/agenda?page=${pageParam}&per_page=10`,
    );
    return res.data;
  };

  return useInfiniteQuery({
    queryKey: ['agenda'],
    queryFn: getAgenda,
    getNextPageParam: (lastPage, pages) => lastPage.next_page,
  });
};

export const useGetStaticPosts = () => {
  return useQuery({
    queryKey: ['static_post'],
    queryFn: async () => {
      const response = await axiosInstance.get('posts/static');
      return response.data;
    },
    select: (data) => data.statics,
  });
};
