import { OutputData } from "@editorjs/editorjs";

export interface IBaseTheme {
  colors: {
    realWhite: string;
    realBlack: string;
    dark: string;

    mainBlue: string;
    darkBlue: string;
    lightBlue: string;

    greyF1: string;
    greyF5: string;
    greyEO: string;
    grey93: string;
    grey57: string;

    yRed: string;

    mainGreen: string;

    mainYellow: string;
  };

  utils: {
    transition: string;
    br: string;
    zIndex: {
      popup: string;
      modalControls: string;
      darkOverlay: string;
      overDarkOverlay: string;
    };
  };

  media: {
    mobile: string;
  };
}

export interface ILayoutProps {
  children: React.ReactNode;
}

export interface INewsCategory {
  id: number;
  title: string;
  user_id: string;
  is_deleted: number;
}

export interface INews {
  id: number;
  status: number;
  title: string;
  text: OutputData['blocks'];
  date: string;
  user_id: number;
  is_deleted: number;
  categories?: Array<INewsCategory>;
}

export interface IGetAllNews {
  data: Array<INews>;
  count: number;
  page: number;
  pagesCount: number;
  prevPage?: string;
  nextPage?: string;
}

export interface INewsResponse {
  data: INews;
  result: boolean;
}

export interface ICreateNews {
  title: string;
  text: string;
  NewsCategory?: [];
}

export type TUpdateNews = Omit<INews, 'user_id' | 'is_deleted'>;

export interface IDeleteByIdRes {
  id: number;
}

export interface IDeleteByIdReq {
  result: boolean;
}

export interface IGetAllNewsCategory {
  data: Array<INewsCategory>;
  count: number;
  page: number;
  pagesCount: number;
  prevPage?: string;
  nextPage?: string;
}

export interface INewsCategoryMutationRes {
  data: INewsCategory;
  result: boolean;
}

export interface INewsCategoryMutationReq {
  title: string;
}

export interface ILesson {
  id: number;
  theme_id: number;
  title: string;
  description: string;
  description_autosave: string;
  status: number;
  user_id: number;
  date: string;
  is_deleted: number;
}

export interface ITheme {
  id: number;
  chapter_id: number;
  title: string;
  user_id: number;
  date: string;
  is_deleted: number;
  lessons?: Array<ILesson>;
}

export interface IChapter {
  id: number;
  course_id: number;
  title: string;
  user_id: number;
  date: string;
  is_deleted: number;
  themes?: Array<ITheme>;
}

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
