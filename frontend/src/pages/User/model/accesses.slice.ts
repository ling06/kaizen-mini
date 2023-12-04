import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accesses: [
    {
      type: 'see',
      access: false,
      sub: [
        {
          type: 'news',
          access: false,
        },
        {
          type: 'courses',
          access: false,
        },
      ],
    },
  ],
};

export const accessesSlice = createSlice({
  name: 'accesses',
  initialState,
  reducers: {},
});

export const { reducer, actions } = accessesSlice;
