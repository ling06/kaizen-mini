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
  test?: string;
  isChecked: boolean;
}

export interface ICreateLessonData {
  title: string;
  theme_id: number;
  description: string;
}

export interface IUpdateLessonData extends ICreateLessonData {
  id: number;
  status?: number;
  isChecked?: boolean;
}
