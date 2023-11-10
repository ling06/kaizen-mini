import { IImage } from './image.types';
import { IUser } from './user.types';

export interface ICompetition {
    id: number;
    competition_id: number;
    title: string;
    status: number;
    user_id: number;
    date: string;
    is_deleted: number;
    competitions?: Array<ICompetition>;
    image: IImage | null;
    user?: IUser;
}

export interface ICreateCompetitionData {
    title: string;
    text: string;
    link: string;
}
  

export interface IUpdateCompetitionData extends ICreateCompetitionData {
    id: number;
}
  