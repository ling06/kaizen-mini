import {paths, components} from '@/shared/model/types/schema';

export type TPermission = components['schemas']['PermissionSchema'];
export type TPermissions = paths['/api/permissions']['get']['responses']['200']['content']['application/json'];
