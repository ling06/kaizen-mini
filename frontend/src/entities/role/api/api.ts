import { api } from '@/shared/api';
import { TNewRole, TRole, TRoles, TUpdateRole } from '../model/types';

export const roleApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query<TRoles, null>({
      query: () => 'roles',
      providesTags: ['Roles'],
    }),
    getRole: build.query<TRole, string>({
      query: (id) => `roles/${id}`,
      providesTags: ['Role'],
    }),
    createRole: build.mutation<TRole, TNewRole>({
      query: (role) => ({
        url: 'roles',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['Roles', 'User'],
    }),
    updateRole: build.mutation<TRole, TUpdateRole & { roleId: string }>({
      query: ({ roleId, ...role }) => ({
        url: `roles/${roleId}`,
        method: 'PATCH',
        body: role,
      }),
      invalidatesTags: ['Role', 'Roles'],
    }),
  }),
});

export const { useGetRoleQuery, useGetRolesQuery, useCreateRoleMutation, useUpdateRoleMutation } =
  roleApi;
