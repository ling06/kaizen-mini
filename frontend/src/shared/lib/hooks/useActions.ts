import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as modalActions } from '@/store/modal/modal.slice';
import { actions as authActions } from '@/entities/auth';
import { actions as courseActions } from '@/store/course/course.slice';
import { actions as loaderActions } from '@/store/loader/loader.slice';
import { actions as lessonActions } from '@/store/lesson/lesson.slice';
import { actions as competitionActions } from '@/store/competition/competition.slice';
import {actions as accessesActions} from '@/pages/User/model/accesses.slice';
import {actions as newsActions} from '@/store/news/news.slice';
import {actions as saveRoleActions} from '@/features/saveRole';

const rootActions = {
  ...authActions,
  ...modalActions,
  ...courseActions,
  ...loaderActions,
  ...lessonActions,
  ...competitionActions,
  ...newsActions,
  ...accessesActions,
  ...saveRoleActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
