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
