import { IChapter } from './chapter.types';
import { IImage, IUploadedImage } from './image.types';
import { IUser } from './user.types';

export interface ICourse {
  id: number;
  title: string;
  description: string;
  is_open: number;
  status: number;
  user_id: number;
  date: string;
  is_deleted: number;
  chapters?: Array<IChapter>;
  image: IImage | null;
  user?: IUser;
  percentage?: {
    lessonCount: number;
    checkedLessonCount: number;
    percentage: number;
  }
}

export interface IGetCourses {
  data: Array<ICourse>;
  count: number;
  page: number;
  pagesCount: number;
  prevPage?: string;
  nextPage?: string;
}

export interface IGetCourseByIdRes {
  data: ICourse;
  result: boolean;
}

export interface ICreateCourse extends Pick<ICourse, 'title' | 'description' | 'is_open'> {
  image: IUploadedImage | null | IImage;
}
export interface IUpdateCourse {
  id: number;
  title?: string;
  description?: string;
  is_open?: number;
  status?: number;
  image?: IUploadedImage | null | IImage;
}
