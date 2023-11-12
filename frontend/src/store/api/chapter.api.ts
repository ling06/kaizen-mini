import { api } from './api';
import { IChapter, ICreateChapterData, IUpdateChapterData } from '@/types/chapter.types';
import { IDefaultResWithData, IDefaultRes, IDefaultReqWithId } from '@/types/common.types';

type IChapterRes = IDefaultResWithData<IChapter>;

export const chapterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChapterById: builder.query<IChapterRes, number>({
      query: (id) => `chapter/${id}`,
      providesTags: () => [
        {
          type: 'ChapterById',
        },
      ],
    }),
    createChapter: builder.mutation<IChapterRes, ICreateChapterData>({
      query: (data) => ({
        url: 'course/create-chapter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [
        {
          type: 'Courses',
        },
      ],
    }),
    updateChapter: builder.mutation<IChapterRes, IUpdateChapterData>({
      query: (data) => ({
        url: 'course/update-chapter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Courses', 'ChapterById'],
    }),
    deleteChapter: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete-chapter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CourseById', 'ChapterById'],
    }),
    restoreChapter: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore-chapter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CourseById', 'ChapterById'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useGetChapterByIdQuery,
  useRestoreChapterMutation,
  useUpdateChapterMutation,
} = chapterApi;
