import { IDefaultReqWithId, IDefaultRes } from '@/shared/types/common.types';
import { api } from './api';


export const lessonTestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTest: builder.mutation<TLessonTestRes, unknown>({
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
    sendAnswer: builder.mutation<ISendAnswerResData, ISendAnswerData>({
      query: (data) => ({
        url: 'test/send-answer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => ['LessonById',],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTestMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useSendAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateTestMutation,
} = lessonTestApi;
