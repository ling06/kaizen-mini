import { paths, components } from "@/shared/model/types/schema";

export type TUsers = paths['/api/users']['get']['responses']['200']['content']['application/json'];
export type TExtendedUser = components['schemas']['UserExtendedSchema'];
export type TSearchUsers = TUsers;
