import { ICustomNavLinkProps } from "@/components/Header/CustomNavLink";
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
    darkRed: string;

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
      loading: string;
      burgerMenu: string;
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


export interface INavLinks {
  [key: string]: ICustomNavLinkProps;
}

export interface IAphorism {
  text: string;
  author: string;
}


