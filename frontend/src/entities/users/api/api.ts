import { api } from '@/shared/api';
import {
  TExtendedUser,
  TSearchUsers,
  TUpdatePermissionsReq,
  TUpdatePermissionsRes,
  TUsers,
} from '../model/types';

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
    updateUserPermissions: builder.mutation<
      TUpdatePermissionsRes,
      TUpdatePermissionsReq & { userId: number }
    >({
      query: ({ userId, role_id, permissions }) => ({
        url: `users/${userId}/update-permissions`,
        method: 'PATCH',
        body: {
          role_id,
          permissions,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery, useSearchUsersQuery, useUpdateUserPermissionsMutation } = usersApi;
