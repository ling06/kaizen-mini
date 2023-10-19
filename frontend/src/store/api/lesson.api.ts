import { ICreateLessonData, ILesson, IUpdateLessonData } from '@/types/lesson.types';
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
    }),
    deleteLesson: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete-Lesson',
        method: 'POST',
        body: data,
      }),
    }),
    restoreLesson: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore-Lesson',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
  useRestoreLessonMutation,
  useUpdateLessonMutation,
} = lessonApi;
