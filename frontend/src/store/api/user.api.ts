import { IUserWhoamiRes } from '@/types/user.types';
import { api } from './api';

//TODO: add user api

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkUser: builder.query<IUserWhoamiRes, void>({
      query: () => 'whoami',
      providesTags: () => [
        {
          type: 'User',
        },
      ],
    }),
  }),
  overrideExisting: false,
});

export const selectUser = userApi.endpoints.checkUser.select();
export const { useCheckUserQuery } = userApi;
