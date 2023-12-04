import { IImage } from './image.types';

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
  text: string;
  date: string;
  user_id: number;
  user?: {
    id: number;
    name: string;
  };
  is_deleted: number;
  categories?: Array<INewsCategory>;
  image?: IImage | null;
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

export interface ICreateNewsCategory {
  title?: string;
  id?: number;
}

export interface ICreateNews {
  title: string;
  text: string;
  NewsCategory?: Array<ICreateNewsCategory>;
}

export interface IUpdateNews {
  id: number;
  title?: string;
  text?: string;
  NewsCategory?: Array<ICreateNewsCategory | INewsCategory>;
  date?: string;
  image?: IImage | null;
  status?: number;
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
  id?: number;
  title?: string;
}
