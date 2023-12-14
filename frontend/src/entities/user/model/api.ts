import { api } from '@/shared/model/api/api';
import { LoginReq, LoginRes } from './types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRes, LoginReq>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useLoginMutation} = userApi;
