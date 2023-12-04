import { IDefaultResWithData, IDefaultRes, IDefaultReqWithId } from '@/shared/types/common.types';
import { ICreateThemeData, ITheme, IUpdateThemeData } from '@/shared/types/theme.types';
import { api } from './api';
import { ISetPositionsRes, ISetPositionsReq } from '@/shared/types/course.types';

type TThemeRes = IDefaultResWithData<ITheme>;

export const themeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getThemeById: builder.query<TThemeRes, number>({
      query: (id) => `theme/${id}`,
      providesTags: () => [
        {
          type: 'ThemeById',
        },
      ],
    }),
    createTheme: builder.mutation<TThemeRes, ICreateThemeData>({
      query: (data) => ({
        url: 'course/create-theme',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [
        {
          type: 'ChapterById',
        },
      ],
    }),
    updateTheme: builder.mutation<TThemeRes, IUpdateThemeData>({
      query: (data) => ({
        url: 'course/update-theme',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['ChapterById'],
    }),
    deleteTheme: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete-theme',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['ChapterById'],
    }),
    restoreTheme: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore-theme',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['ChapterById'],
    }),
    setThemesPositions: builder.mutation<ISetPositionsRes, ISetPositionsReq>({
      query: (data) => ({
        url: 'course/set-positions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ChapterById'],
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
  useSetThemesPositionsMutation,
} = themeApi;
