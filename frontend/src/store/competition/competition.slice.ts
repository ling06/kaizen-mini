import { ICompetition } from '@/shared/model/types/competition.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICompetitionInitialState  {
  updatingCompetitionData: ICompetition | null;
}

const competitionInitialState: ICompetitionInitialState = {
  updatingCompetitionData: null,
};

export const competitionSlice = createSlice({
  name: 'competition',
  initialState: competitionInitialState,
  reducers: {
    setUpdatingCompetitionData: (state, { payload }: PayloadAction<ICompetition | null>) => {
      state.updatingCompetitionData = payload ? { ...payload } : null;
    },
  },
});

export const { actions, reducer } = competitionSlice;
