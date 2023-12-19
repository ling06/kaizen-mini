import { api } from '@/shared/api';
import { TRole, TRoles } from '../model/types';

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
  }),
});

export const {useGetRoleQuery, useGetRolesQuery} = roleApi;
