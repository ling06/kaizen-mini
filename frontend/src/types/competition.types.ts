import { IImage, IUploadedImage } from './image.types';
import { ITheme } from './theme.types';

export interface ICompetition {
    id: number;
    competition_id: number;
    title: string;
    user_id: number;
    date: string;
    is_deleted: number;
    themes?: Array<ITheme>;
    image: IImage | null;
}

export interface ICreateCompetitionData extends Pick<ICompetition, 'title' | 'competition_id'> {
    image: IUploadedImage | null | IImage;
}
  

export interface IUpdateCompetitionData extends ICreateCompetitionData {
    id: number;
}
  