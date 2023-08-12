import axiosInstance from '@src/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await axiosInstance.get('/provinces');
      return response.data;
    },
    select: (data) =>
      data.provinces.map((p) => ({
        label: p.name,
        value: p.id,
      })),
  });
};

export const useGetRegenciesByProvinceId = (provinceId) => {
  return useQuery({
    queryKey: ['regencies', { provinceId }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `regencies?province_id=${provinceId}`,
      );
      return response.data;
    },

    enabled: !!provinceId,
    select: (data) =>
      data.regencies.map((k) => ({
        label: k.name,
        value: k.id,
      })),
  });
};

export const useGetDistrictsByRegencyId = (regencyId) => {
  return useQuery({
    queryKey: ['districts', { regencyId }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `districts?regency_id=${regencyId}`,
      );
      return response.data;
    },

    enabled: !!regencyId,
    select: (data) =>
      data.districts.map((k) => ({
        label: k.name,
        value: k.id,
      })),
  });
};
