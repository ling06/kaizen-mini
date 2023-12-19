import { IGetAllNews, INewsResponse, ICreateNews, IUpdateNews } from '@/shared/model/types/news.types';
import { api } from '../../shared/api';
import { IDefaultReqWithId, IDefaultRes } from '@/shared/model/types/common.types';

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
    getNewsByCategory: builder.query<IGetAllNews, number>({
      query: (id) => `news?category=${id}`,
      providesTags: () => [
        {
          type: 'NewsByCategory',
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
    updateNews: builder.mutation<INewsResponse, IUpdateNews>({
      query: (updateNews) => ({
        url: 'news/update',
        method: 'POST',
        body: updateNews,
      }),
      invalidatesTags: ['News', 'NewsByCategory', 'NewsById'],
    }),
    deleteNews: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (id) => ({
        url: 'news/delete',
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['News', 'NewsByCategory', 'NewsById'],
    }),
    restoreNews: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (id) => ({
        url: 'news/restore',
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['News', 'NewsByCategory', 'NewsById'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllNewsQuery, useCreateNewsMutation, useGetNewsByIdQuery, useDeleteNewsMutation, useRestoreNewsMutation, useUpdateNewsMutation, useGetNewsByCategoryQuery } = newsApi;
