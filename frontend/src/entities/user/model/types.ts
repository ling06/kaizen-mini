import {paths, components} from '@/shared/model/types/schema';

export type LoginReq = Required<paths['/api/auth/login']['post']>['requestBody']['content']['application/json'];
export type LoginRes = paths['/api/auth/login']['post']['responses']['200']['content']['application/json'];
