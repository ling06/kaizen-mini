import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ILoaderInitialState {
  active: boolean;
}

const loaderInitialState = {
  active: false,
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState: loaderInitialState,
  reducers: {
    setLoaderActive(state, { payload }: PayloadAction<boolean>) {
      state.active = payload;
    },
  },
});

export const { reducer, actions } = loaderSlice;
