import { ICheckLessonRes, ICreateLessonData, ILesson, IUpdateLessonData } from '@/types/lesson.types';
import { api } from './api';
import { IDefaultReqWithId, IDefaultRes, IDefaultResWithData } from '@/types/common.types';

type ILessonRes = IDefaultResWithData<ILesson>;

export const lessonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLessonById: builder.query<ILessonRes, string>({
      query: (id) => `lesson/${id}`,
      providesTags: () => [
        {
          type: 'LessonById',
        },
      ],
    }),
    createLesson: builder.mutation<ILessonRes, ICreateLessonData>({
      query: (data) => ({
        url: 'course/create-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [
        {
          type: 'ChapterById',
        },
      ],
    }),
    updateLesson: builder.mutation<ILessonRes, IUpdateLessonData>({
      query: (data) => ({
        url: 'course/update-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LessonById', 'ChapterById'],
    }),
    deleteLesson: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LessonById', 'ChapterById'],
    }),
    restoreLesson: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LessonById', 'ChapterById'],
    }),
    checkLesson: builder.mutation<ICheckLessonRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/check-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['ChapterById', 'LessonById'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCheckLessonMutation,
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
  useRestoreLessonMutation,
  useUpdateLessonMutation,
} = lessonApi;
