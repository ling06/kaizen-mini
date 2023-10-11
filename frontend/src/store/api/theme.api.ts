import { IDefaultResWithData, IDefaultRes, IDefaultReqWithId } from '@/types/common.types';
import { ICreateThemeData, ITheme, IUpdateThemeData } from '@/types/theme.types';
import { api } from './api';

type IThemeRes = IDefaultResWithData<ITheme>;

export const themeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getThemeById: builder.query<IThemeRes, number>({
      query: (id) => `theme/${id}`,
      providesTags: () => [
        {
          type: 'ThemeById',
        },
      ],
    }),
    createTheme: builder.mutation<IThemeRes, ICreateThemeData>({
      query: (data) => ({
        url: 'course/create-theme',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [
        {
          type: 'CourseById',
        },
      ],
    }),
    updateTheme: builder.mutation<IThemeRes, IUpdateThemeData>({
      query: (data) => ({
        url: 'course/update-theme',
        method: 'POST',
        body: data,
      }),
    }),
    deleteTheme: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete-theme',
        method: 'POST',
        body: data,
      }),
    }),
    restoreTheme: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore-theme',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateThemeMutation,
  useDeleteThemeMutation,
  useGetThemeByIdQuery,
  useRestoreThemeMutation,
  useUpdateThemeMutation,
} = themeApi;
