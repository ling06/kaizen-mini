import { api } from '@/shared/api';
import { LoginErrorRes, LoginReq, LoginRes, LogoutRes, User } from '../model/types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRes | LoginErrorRes, LoginReq>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, LogoutRes>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      })
    }),
    getMe: builder.query<User, null>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    })
  }),
});

export const {useLoginMutation, useLogoutMutation, useGetMeQuery} = userApi;
export const selectUser = userApi.endpoints.getMe.select(null);
