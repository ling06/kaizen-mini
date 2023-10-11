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

export interface ICreateChapterData extends Pick<IChapter, 'title' | 'course_id'> {}

export interface IUpdateChapterData extends Pick<IChapter, 'title' | 'id' | 'course_id'> {}
