import { api } from '@/shared/model/api/api';
import { TCourse, TNewCourse, TNewCourseRes } from './types';

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<Array<TCourse>, null>({
      query: () => 'courses',
      providesTags: ['Courses'],
    }),
    getCourse: builder.query<TCourse, string>({
      query: (id) => `courses/${id}`,
      providesTags: ['Course'],
    }),
    createCourse: builder.mutation<TNewCourse, TNewCourseRes>({
      query: (course) => ({
        url: 'courses',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const { useGetAllCoursesQuery, useGetCourseQuery, useCreateCourseMutation } = courseApi;
