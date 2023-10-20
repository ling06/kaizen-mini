import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as modalActions } from '@/store/modal/modal.slice';
import { actions as authActions } from '@/store/auth/auth.slice';
import { actions as courseActions } from '@/store/course/course.slice';
import { actions as loaderActions } from '@/store/loader/loader.slice';
import { actions as lessonActions } from '@/store/lesson/lesson.slice';

const rootActions = {
  ...authActions,
  ...modalActions,
  ...courseActions,
  ...loaderActions,
  ...lessonActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
