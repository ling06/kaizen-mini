import {paths, components} from '@/shared/model/types/schema';

export type TCourse = components['schemas']['CourseSchema'];

export type TNewCourse = Required<paths['/api/courses']['post']>['requestBody']['content']['application/json'];
export type TNewCourseRes = paths['/api/courses']['post']['responses']['200']['content']['application/json'];
