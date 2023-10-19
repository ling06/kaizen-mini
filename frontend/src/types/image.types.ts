export interface IUploadedImage {
  data: string;
  extension: string;
}

export interface Image {
  id: number;
  server: string;
  directory: string;
  name: string;
  original_name: string;
  user_id: number;
  date: string;
  model_name: string;
  model_pk: string;
  type: string;
  is_deleted: number;
}
