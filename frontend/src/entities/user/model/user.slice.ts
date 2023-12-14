import { createSlice } from '@reduxjs/toolkit';

export interface IUserInitialState {
  token: null | string;
}

const UserInitialState: IUserInitialState = {
  token: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.token = payload;
    },
  }
})

export const { actions, reducer } = userSlice;
