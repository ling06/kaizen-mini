import {paths, components} from '@/shared/model';

export type TRole = components['schemas']['RoleSchema'];
export type TRoles = paths['/api/roles']['get']['responses']['200']['content']['application/json'];
export type TNewRole = Required<paths['/api/roles']['post']>['requestBody']['content']['application/json'];
export type TUpdateRole = Required<paths['/api/roles/{id}']['patch']>['requestBody']['content']['application/json'];
