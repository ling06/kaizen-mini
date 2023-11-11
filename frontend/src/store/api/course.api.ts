import { IDefaultReqWithId, IDefaultRes } from '@/types/common.types';
import { api } from './api';
import { IGetCourses, IGetCourseByIdRes, ICreateCourse, IUpdateCourse, ICourseProgress, ICourseProgressCompleted, ICourseProgressError } from '@/types/course.types';

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
      invalidatesTags: ['Courses'],
    }),
    deleteCourse: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Courses'],
    }),
    restoreCourse: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'course/restore',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Courses'],
    }),
    getCourseProgress: builder.query<ICourseProgress | ICourseProgressCompleted | ICourseProgressError, { course_id: number }>({
      query: (data) => ({
        url: 'course/get-users-progress',
        method: 'POST',
        body: data,
      }),
      providesTags: () => [
        {
          type: 'CourseProgress',
        },
      ],
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
  useGetCourseProgressQuery,
} = courseApi;

export const selectCourses = courseApi.endpoints.getCourses.select();
