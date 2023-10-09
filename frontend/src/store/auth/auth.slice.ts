import { createSlice } from '@reduxjs/toolkit';

export interface IAuthInitialState {
  token: null | string;
}

const AuthInitialState: IAuthInitialState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.token = payload;
    },
  }
})

export const { actions, reducer } = authSlice;
