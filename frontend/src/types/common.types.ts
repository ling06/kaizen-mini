export interface IDefaultRes {
  result: boolean;
}

export interface IDefaultResWithData<T> extends IDefaultRes {
  data: T;
}

export interface IDefaultRes {
  id: string | number;
}

export interface IDefaultReqWithId {
  id: string | number;
}

export enum ModalPosition {
  right = 'right',
  left = 'left',
}
