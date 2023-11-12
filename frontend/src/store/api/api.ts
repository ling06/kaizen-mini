import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const API_URL = '/api/';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: [
    'News',
    'NewsById',
    'NewsCategory',
    'Courses',
    'ThemeById',
    'CourseById',
    'ChapterById',
    'LessonById',
    'User',
    'Competition',
    'CourseProgress',
    'NewsByCategory',
    'CompetitionById',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers: Headers, { getState }): Headers => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('X-CSRFToken', token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
