import { api } from '@/shared/api/api';
import { TExtendedUser, TSearchUsers, TUsers } from '../model/types';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<TUsers, null>({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    getUser: builder.query<TExtendedUser, string>({
      query: (id) => `users/${id}`,
      providesTags: ['User'],
    }),
    searchUsers: builder.query<TSearchUsers, string>({
      query: (term) => `users/search/${term}`,
      providesTags: ['SearchUsers'],
    }),
  }),
});

export const {useGetUserQuery, useGetUsersQuery, useSearchUsersQuery} = usersApi;
