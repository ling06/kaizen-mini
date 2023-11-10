import { IUser } from './user.types';

export interface ICompetition {
    id: number;
    status: number;
    title: string;
    text: string;
    link: string;
    date: Date;
    user_id: number;
    is_deleted: number;
    user?: Pick<IUser, 'id' | 'name'>;
}

export interface IGetAllCompetitions {
    data: Array<ICompetition>;
    count: number;
    page: number;
    pagesCount: number;
    prevPage?: string;
    nextPage?: string;
  }

export interface ICreateCompetitionData {
    text: string;
    title: string;
    link: string;
}


export interface IUpdateCompetitionData extends Partial<ICreateCompetitionData> {
    id: number;
    status?: number;
    date?: string;
}
