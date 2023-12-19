import {
  ICheckLessonRes,
  ICreateLessonData,
  ILesson,
  IUpdateLessonData,
} from '@/shared/model/types/lesson.types';
import { api } from '../../shared/api';
import { IDefaultReqWithId, IDefaultRes, IDefaultResWithData } from '@/shared/model/types/common.types';
import { ISetPositionsReq, ISetPositionsRes } from '@/shared/model/types/course.types';

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
      invalidatesTags: () => ['ChapterById', 'LessonById', 'Courses'],
    }),
    setLessonsPositions: builder.mutation<ISetPositionsRes, ISetPositionsReq>({
      query: (data) => ({
        url: 'course/set-positions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LessonById', 'ChapterById'],
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
  useSetLessonsPositionsMutation,
} = lessonApi;
