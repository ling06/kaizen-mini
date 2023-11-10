export interface IEditorJsData {
  data: {
    url?: string;
    text?: string;
    items?: string[];
    content?: any;
    style?: string;
    file?: {
      url: string;
    };
  };
  id: string;
  type: string;
}
