import { IUploadedImage } from './image.types';
import { ITheme } from './theme.types';

export interface IChapter {
  id: number;
  course_id: number;
  title: string;
  user_id: number;
  date: string;
  is_deleted: number;
  themes?: Array<ITheme>;
}

export interface ICreateChapterData extends Pick<IChapter, 'title' | 'course_id'> {
  image: IUploadedImage | null;
}

export interface IUpdateChapterData extends ICreateChapterData {
  id: number;
}
