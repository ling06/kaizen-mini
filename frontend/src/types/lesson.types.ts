import { ITest } from "./lessonTest.types";

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
  tests: Array<ITest>;
  isChecked: boolean;
}

export interface ICreateLessonData {
  title: string;
  theme_id: number;
  description: string;
  tests: Array<ITest>;
}

export interface IUpdateLessonData extends ICreateLessonData {
  id: number;
  status?: number;
  isChecked?: boolean;
}
