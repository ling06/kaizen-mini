import { IImage, IUploadedImage } from "./image.types";
import { ITheme } from "./theme.types";

export interface IChapter {
  id: number;
  course_id: number;
  title: string;
  user_id: number;
  date: string;
  is_deleted: number;
  themes?: Array<ITheme>;
  image: IImage | null;
  percentage: {
    percentage: number;
  };
  position: number;
}

export interface ICreateChapterData
  extends Pick<IChapter, "title" | "course_id"> {
  image: IUploadedImage | null | IImage;
}

export interface IUpdateChapterData extends ICreateChapterData {
  id: number;
  position: number;
}
