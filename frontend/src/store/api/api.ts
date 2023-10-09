import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://kaizen.borboza.com/api/';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['News', 'NewsById'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers: Headers, api): Headers => {
      const token = api.getState().auth.token;
      console.log(token);
      headers.set('Content-Type', "application/x-www-form-urlencoded; charset=UTF-8");
      if(token) {
        headers.set('X-CSRFToken', token);
      }
      return headers;
    }
  }),
  endpoints: () => ({}),
});

