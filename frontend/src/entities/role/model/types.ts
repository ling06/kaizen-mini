import {paths, components} from '@/shared/model';

export type TRole = components['schemas']['RoleSchema'];
export type TRoles = paths['/api/roles']['get']['responses']['200']['content']['application/json'];
