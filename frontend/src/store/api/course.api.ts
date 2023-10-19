import { IDefaultReqWithId, IDefaultRes } from '@/types/common.types';
import { api } from './api';
import { IGetCourses, IGetCourseByIdRes, ICreateCourse, IUpdateCourse } from '@/types/course.types';

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<IGetCourses, void>({
      query: () => 'course',
      providesTags: () => [
        {
          type: 'Courses',
        },
      ],
    }),
    getCourseById: builder.query<IGetCourseByIdRes, number>({
      query: (id) => `course/${id}`,
      providesTags: () => [
        {
          type: 'CourseById',
        },
      ],
    }),
    createCourse: builder.mutation<IGetCourseByIdRes, ICreateCourse>({
      query: (data) => ({
        url: 'course/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: () => [
        {
          type: 'Courses',
        },
      ],
    }),
    updateCourse: builder.mutation<IGetCourseByIdRes, IUpdateCourse>({
      query: (data) => ({
        url: 'course/update',
        method: 'POST',
        body: data,
      }),
    }),
    deleteCourse: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete',
        method: 'POST',
        body: data,
      }),
    }),
    restoreCourse: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useRestoreCourseMutation,
  useUpdateCourseMutation,
} = courseApi;

export const selectCourses = courseApi.endpoints.getCourses.select();
