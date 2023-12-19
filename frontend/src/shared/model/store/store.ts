import { combineReducers, configureStore } from '@reduxjs/toolkit';
  import {reducer as userReducer} from '@/entities/user';
import { reducer as modalReducer } from '../../../store/modal/modal.slice';
import { reducer as courseReducer } from '../../../store/course/course.slice';
import { reducer as loaderReducer } from '../../../store/loader/loader.slice';
import { reducer as lessonReducer } from '../../../store/lesson/lesson.slice';
import { reducer as competitionReducer } from '../../../store/competition/competition.slice';
import {reducer as newsReducer} from '../../../store/news/news.slice';
import {reducer as accessesReducer} from '@/pages/User/model/accesses.slice';
import { api } from '../../api';

const reducer = combineReducers({
  user: userReducer,
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
