import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './auth/auth.slice';
import { reducer as modalReducer } from './modal/modal.slice';
import { reducer as courseReducer } from './course/course.slice';
import { reducer as loaderReducer } from './loader/loader.slice';
import { reducer as lessonReducer } from './lesson/lesson.slice';
import { reducer as competitionReducer } from './competition/competition.slice';
import {reducer as newsReducer} from './news/news.slice';
import {reducer as accessesReducer} from '@/pages/User/model/accesses.slice';
import { api } from './api/api';

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  course: courseReducer,
  loader: loaderReducer,
  lesson: lessonReducer,
  competition: competitionReducer,
  news: newsReducer,
  accesses: accessesReducer, 
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
