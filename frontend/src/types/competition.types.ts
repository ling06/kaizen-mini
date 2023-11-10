import { IImage, IUploadedImage } from './image.types';
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

export interface ICreateCompetitionData extends Pick<ICompetition, 'title' | 'competition_id'> {
    image?: IUploadedImage | null | IImage;
    text?: string;
}
  

export interface IUpdateCompetitionData extends ICreateCompetitionData {
    id: number;
}
  