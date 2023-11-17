import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INewsInitialState {
  newsCategories: INewsCategory[];
}

interface INewsCategory {
  id?: number;
  title?: string;
}

const initialState: INewsInitialState = {
  newsCategories: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsCategories: (state, { payload }: PayloadAction<INewsCategory[]>) => {
      state.newsCategories = payload;
    },
    addNewsCategory: (state, { payload }: PayloadAction<INewsCategory>) => {
      state.newsCategories.push(payload);
    },
    deleteNewsCategory: (state, { payload }: PayloadAction<INewsCategory>) => {
      const index = state.newsCategories.findIndex(
        (category) =>
          category.id === payload.id || category.title === payload.title
      );
      if (index !== -1) {
        state.newsCategories.splice(index, 1);
      }
    },
  },
});

export const { actions, reducer } = newsSlice;
