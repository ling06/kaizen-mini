import { IAnswer, ITest } from './lessonTest.types';

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
  position: number;
}

export interface ITestDataWithOptionalIds extends Partial<Omit<ITest, 'id' | 'answers'>> {
  id?: string;
  answers: Array<Partial<IAnswer>>;
}

export interface ICreateLessonData {
  title: string;
  theme_id: number;
  description: string;
  tests: Array<ITestDataWithOptionalIds>;
}

export interface IUpdateLessonData extends ICreateLessonData {
  id?: number;
  status?: number;
  isChecked?: boolean;
  position: number;
  newPosition?: number;
}

export interface ICheckLessonRes {
  data: {
    theme_id: number;
  };
  next_lesson: {
    lesson: number | 'end';
    theme: number | 'end';
    chapter: number | 'end';
  }
  result: boolean;
}
