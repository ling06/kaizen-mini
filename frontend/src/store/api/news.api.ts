import { ICreateNews, IGetAllNews, IGetNewsById } from '@/types';
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
    getNewsById: builder.query<IGetNewsById, number>({
      query: (id) => `news/${id}`,
      providesTags: () => [
        {
          type: 'NewsById',
        },
      ],
    }),
    createNews: builder.mutation<IGetNewsById, ICreateNews>({
      query: (news) => ({
        body: news,
        url: 'news/create',
        method: 'POST',
      }),
      invalidatesTags: () => [
        {
          type: 'News',
        },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllNewsQuery, useCreateNewsMutation, useGetNewsByIdQuery } = newsApi;
