import { IDefaultReqWithId, IDefaultRes, IDefaultResWithData } from '@/types/common.types';
import { api } from './api';
import {
  IAddTestData,
  ICreateQuestionData,
  IQuestion,
  ISendAnswerData,
  ISendAnswerResData,
  ITest,
  IUpdateQuestionData,
  IUpdateTestData,
} from '@/types/lessonTest.types';

type TLessonTestRes = IDefaultResWithData<ITest>;
type TTestQuestion = IDefaultResWithData<IQuestion>;

export const lessonTestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTest: builder.mutation<TLessonTestRes, IAddTestData>({
      query: (data) => ({
        url: 'test/add-test',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'LessonById' }],
    }),
    updateTest: builder.mutation<TLessonTestRes, IUpdateTestData>({
      query: (data) => ({
        url: 'test/update-test',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'LessonById' }],
    }),
    createQuestion: builder.mutation<TTestQuestion, ICreateQuestionData>({
      query: (data) => ({
        url: 'test/create-question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'LessonById' }],
    }),
    updateQuestion: builder.mutation<TTestQuestion, IUpdateQuestionData>({
      query: (data) => ({
        url: 'test/update-question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'LessonById' }],
    }),
    deleteQuestion: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'test/delete-question',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['LessonById', 'LessonById'],
    }),
    checkLesson: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'test/check-lesson',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [{ type: 'ChapterById' }],
    }),
    sendAnswer: builder.mutation<ISendAnswerResData, ISendAnswerData>({
      query: (data) => ({
        url: 'test/send-answer',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTestMutation,
  useCheckLessonMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useSendAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateTestMutation,
} = lessonTestApi;
