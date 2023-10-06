import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as modalReducer } from './modal/modal.slice';

const reducer = combineReducers({
  modal: modalReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
