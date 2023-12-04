import { ISetPositionsRes } from '@/shared/types/course.types';
import { arrayMove } from '@dnd-kit/sortable';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ISetPositionsErrorsHandler<T extends object> {
  setter: (data: Array<T>) => void;
  res:
    | {
        data: ISetPositionsRes;
      }
    | {
        error: FetchBaseQueryError | SerializedError;
      };
  arr: Array<T>;
  oldIndex: number;
  newIndex: number;
}

export const setPositionsErrorsHandler = <T extends object>({ setter, res, arr, oldIndex, newIndex }: ISetPositionsErrorsHandler<T>): boolean => {
  if ('data' in res && res.data.status === 'success') {
    return false;
  }
  if ('error' in res) {
    console.error(`Error in setPositions: ${res.error}`);
  }
  if ('data' in res && res.data.status !== 'success') {
    console.error(`Error in setPositions: ${res.data.message}`);
  }
  const reversed = arrayMove<T>(arr, oldIndex, newIndex);
  setter(reversed);
  return true;
};
