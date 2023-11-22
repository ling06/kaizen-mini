import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INewsInitialState {
  newsCategories: INewsCategory[];
  isUpdate: boolean,
}

interface INewsCategory {
  id?: number;
  title?: string;
  isUpdate?: boolean;
}

const initialState: INewsInitialState = {
  newsCategories: [],
  isUpdate: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateNewsCategory: (state, { payload }: PayloadAction<boolean>) => {
      state.isUpdate = payload;
    },

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
