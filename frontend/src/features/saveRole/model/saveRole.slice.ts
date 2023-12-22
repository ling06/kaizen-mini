import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ISaveRoleInitialState {
  roleName: string;
  roleDescription: string;
  isNew: boolean;
  step: 1 | 2;
}

const initialState: ISaveRoleInitialState = {
  roleName: '',
  roleDescription: '',
  isNew: false,
  step: 1,
};

export const saveRoleSlice = createSlice({
  name: 'saveRole',
  initialState,
  reducers: {
    setRoleName: (state, {payload}: PayloadAction<string>) => {
      state.roleName = payload;
    },
    setRoleDescription: (state, {payload}: PayloadAction<string>) => {
      state.roleDescription = payload;
    },
    setStep: (state, {payload}: PayloadAction<ISaveRoleInitialState['step']>) => {
      state.step = payload;
    },
    setIsRoleNew: (state, {payload}: PayloadAction<boolean>) => {
      state.isNew = payload;
    },
  },
});

export const {actions, reducer} = saveRoleSlice;
