import { IChapter } from "./chapter.types";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  is_open: number;
  status: number;
  user_id: number;
  date: string;
  is_deleted: number;
  chapters?: Array<IChapter>
}

export interface IGetCourses {
  data: Array<ICourse>;
  count: number;
  page: number;
  pagesCount: number;
  prevPage?: string;
  nextPage?: string
}

export interface IGetCourseByIdRes {
  data: ICourse;
  result: boolean;
}

export type ICreateCourse = Pick<ICourse, 'title' | 'description' | 'is_open'>;
export type IUpdateCourse = Pick<ICourse, 'title' | 'description' | 'is_open' | 'status'>
