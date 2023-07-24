import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

// export default function useGetNews() {
//   const getNews = async ({ pageParam = 1 }) => {
//     const res = await api.get(`berita?page=${pageParam}&per_page=10`);
//     return res.data;
//   };

//   return useInfiniteQuery({
//     queryKey: ['news'],
//     queryFn: getNews,
//     getNextPageParam: (lastPage, pages) => lastPage.next_page,
//   });
// }

const getNews = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    'https://sehatnegeriku.kemkes.go.id/wp-json/wp/v2/posts',
    {
      params: {
        page: pageParam,
        per_page: 10,
        _embed: true,
      },
    },
  );
  const pages = response.data;

  // const total = Number(response.headers['x-wp-total']);
  // const totalPages = Number(response.headers['x-wp-totalpages']);
  // console.log('total', total);
  // console.log('totalPages', totalPages);

  const berita = pages.map((page) => {
    return {
      ID: page.id,
      JUDUL: page.title.rendered,
      ISI: page.content.rendered,
      AUTHOR: { NAMA: 'Kemenkes' },
      KATEGORI: { NAMAKATEGORI: 'Berita' },
      THUMBNAIL:
        page._embedded['wp:featuredmedia'][0]?.media_details?.sizes?.medium
          ?.source_url,
      created_at: page.date,
    };
  });

  return {
    berita,
    next_page: pageParam + 1,
  };
};

export const useGetNewsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['newsInfinite'],
    queryFn: getNews,
    getNextPageParam: (lastPage, pages) => lastPage.next_page,
  });
};

export const useGetNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    select: (data) => data.berita.slice(0, 5),
  });
};
