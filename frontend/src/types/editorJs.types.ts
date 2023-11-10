export interface IEditorJsData {
  data: {
    url?: string;
    text?: string;
    items?: string[];
    // table?: HTMLElement;
    style?: string;
    file?: {
      url: string;
    };
  };
  id: string;
  type: string;
}
