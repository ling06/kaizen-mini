import {
  IGetAllNewsCategory,
  INewsCategory,
  INewsCategoryMutationReq,
  INewsCategoryMutationRes,
} from '@/types/news.types';
import { api } from './api';
import { IDefaultReqWithId, IDefaultRes } from '@/types/common.types';

export const newsCategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewsCategory: builder.query<IGetAllNewsCategory, void>({
      query: () => 'news-category',
      providesTags: () => [
        {
          type: 'NewsCategory',
        },
      ],
    }),
    createNewsCategory: builder.mutation<INewsCategory, INewsCategoryMutationReq>({
      query: (data) => ({
        url: 'news-category/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [
        {
          type: 'NewsCategory',
        },
      ],
    }),
    updateNewsCategory: builder.mutation<INewsCategoryMutationRes, INewsCategoryMutationReq>({
      query: (data) => ({
        url: 'news-category/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteNewsCategory: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'news-category/delete',
        method: 'POST',
        body: data,
      }),
    }),
    restoreNewsCategory: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'news-category/restore',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateNewsCategoryMutation,
  useDeleteNewsCategoryMutation,
  useGetNewsCategoryQuery,
  useRestoreNewsCategoryMutation,
  useUpdateNewsCategoryMutation,
} = newsCategoryApi;
