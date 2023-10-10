import {
  ICreateNews,
  IDeleteByIdReq,
  IDeleteByIdRes,
  IGetAllNews,
  INewsResponse,
  TUpdateNews,
} from '@/types';
import { api } from './api';

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query<IGetAllNews, void>({
      query: () => 'news',
      providesTags: () => [
        {
          type: 'News',
        },
      ],
    }),
    getNewsById: builder.query<INewsResponse, number>({
      query: (id) => `news/${id}`,
      providesTags: () => [
        {
          type: 'NewsById',
        },
      ],
    }),
    createNews: builder.mutation<INewsResponse, ICreateNews>({
      query: (news) => ({
        url: 'news/create',
        method: 'POST',
        body: news,
      }),
      invalidatesTags: () => [
        {
          type: 'News',
        },
      ],
    }),
    updateNews: builder.mutation<INewsResponse, TUpdateNews>({
      query: (updateNews) => ({
        url: 'news/update',
        method: 'POST',
        body: updateNews,
      }),
      invalidatesTags: () => [
        {
          type: 'News',
        },
      ],
    }),
    deleteNews: builder.mutation<IDeleteByIdRes, IDeleteByIdReq>({
      query: (id) => ({
        url: 'news/delete',
        method: 'POST',
        body: id,
      }),
    }),
    restoreNews: builder.mutation<IDeleteByIdRes, IDeleteByIdReq>({
      query: (id) => ({
        url: 'news/restore',
        method: 'POST',
        body: id,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllNewsQuery,
  useCreateNewsMutation,
  useGetNewsByIdQuery,
  useDeleteNewsMutation,
  useRestoreNewsMutation,
  useUpdateNewsMutation,
} = newsApi;
