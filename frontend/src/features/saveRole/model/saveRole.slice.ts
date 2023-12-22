import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISaveRoleInitialState {
  roleName: string;
  roleDescription: string;
  isNew: boolean;
  step: 1 | 2;
  isOriginal: boolean;
  roleId: number | null;
}

const initialState: ISaveRoleInitialState = {
  roleName: '',
  roleDescription: '',
  isNew: false,
  step: 1,
  isOriginal: false,
  roleId: null,
};

export const saveRoleSlice = createSlice({
  name: 'saveRole',
  initialState,
  reducers: {
    setRoleName: (state, { payload }: PayloadAction<string>) => {
      state.roleName = payload;
    },
    setRoleDescription: (state, { payload }: PayloadAction<string>) => {
      state.roleDescription = payload;
    },
    setStep: (state, { payload }: PayloadAction<ISaveRoleInitialState['step']>) => {
      state.step = payload;
    },
    setIsRoleNew: (state, { payload }: PayloadAction<boolean>) => {
      state.isNew = payload;
    },
    setRoleOriginal: (state, { payload }: PayloadAction<boolean>) => {
      state.isOriginal = payload;
    },
    setRoleId: (state, { payload }: PayloadAction<number | null>) => {
      state.roleId = payload;
    },
  },
});

export const { actions, reducer } = saveRoleSlice;
