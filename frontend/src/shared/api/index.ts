import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../model/store/store';

const API_URL = 'https://api.test.kaizen.borboza.com/api/';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: [
    'News',
    'NewsById',
    'NewsCategory',
    'Courses',
    'Course',
    'ThemeById',
    'CourseById',
    'ChapterById',
    'LessonById',
    'User',
    'Competition',
    'CourseProgress',
    'NewsByCategory',
    'CompetitionById',
    'Users',
    'SearchUsers',
    'Roles',
    'Role',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers: Headers, { getState }): Headers => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
