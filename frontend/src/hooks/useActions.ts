import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as modalActions } from '@/store/modal/modal.slice';
import { actions as authActions } from '@/store/auth/auth.slice';
import { actions as courseActions } from '@/store/course/course.slice';
import { actions as loaderActions } from '@/store/loader/loader.slice';
import { actions as lessonActions } from '@/store/lesson/lesson.slice';
import { actions as competitionActions } from '@/store/competition/competition.slice';

const rootActions = {
  ...authActions,
  ...modalActions,
  ...courseActions,
  ...loaderActions,
  ...lessonActions,
  ...competitionActions
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
