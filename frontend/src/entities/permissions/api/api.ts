import { api } from '@/shared/api';
import { TPermission, TPermissions } from '../model/types';

export const permissionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPermissions: build.query<TPermissions, null>({
      query: () => 'permissions',
    }),
    getPermission: build.query<TPermission, string>({
      query: (id) => `permissions/${id}`,
    }),
  }),
});

export const {useGetPermissionQuery, useGetPermissionsQuery} = permissionsApi;
