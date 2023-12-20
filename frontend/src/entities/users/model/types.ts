import { paths, components } from "@/shared/model/types/schema";

export type TUsers = paths['/api/users']['get']['responses']['200']['content']['application/json'];
export type TExtendedUser = components['schemas']['UserExtendedSchema'];
export type TSearchUsers = TUsers;
export type TUpdatePermissionsReq = Required<paths['/api/users/{id}/update-permissions']['patch']>['requestBody']['content']['application/json'];
export type TUpdatePermissionsRes = paths['/api/users/{id}/update-permissions']['patch']['responses']['200']['content']['application/json'];
export type TUpdateRoleReq = Required<paths['/api/users/{id}/update-role']['patch']>['requestBody']['content']['application/json'];
export type TUpdateRoleRes = paths['/api/users/{id}/update-role']['patch']['responses']['200']['content']['application/json'];
