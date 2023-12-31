import { ILesson } from "./lesson.types";


export interface ITheme {
  id: number;
  chapter_id: number;
  title: string;
  user_id: number;
  date: string;
  is_deleted: number;
  lessons?: Array<ILesson>;
  position: number;
}

export interface ICreateThemeData {
  title: string;
  chapter_id: number;
}

export interface IUpdateThemeData {
  id: number;
  position: number;
  title?: string;
  newPosition?: number;
}
