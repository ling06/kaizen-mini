import { api } from './api';
import { ICompetition, ICreateCompetitionData, IUpdateCompetitionData } from '@/types/competition.types';
import { IDefaultResWithData, IDefaultRes, IDefaultReqWithId } from '@/types/common.types';

type ICompetitionRes = IDefaultResWithData<ICompetition>;

export const competitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompetitionById: builder.query<ICompetitionRes, number>({
      query: (id) => `competition/${id}`,
    //   providesTags: () => [
    //     {
    //       type: 'CompetitionById',
    //     },
    //   ],
    }),
    createCompetition: builder.mutation<ICompetitionRes, ICreateCompetitionData>({
      query: (data) => ({
        url: 'competition/create-competition',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: () => [
    //     {
    //       type: 'Competition',
    //     },
    //   ],
    }),
    updateCompetition: builder.mutation<ICompetitionRes, IUpdateCompetitionData>({
      query: (data) => ({
        url: 'competition/update-competition',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: ['Competitions'],
    }),
    deleteCompetition: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'competition/delete-competition',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: ['CompetitionById'],
    }),
    restoreCompetition: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'competition/restore-competition',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: ['CompetitionById'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCompetitionMutation,
  useDeleteCompetitionMutation,
  useGetCompetitionByIdQuery,
  useRestoreCompetitionMutation,
  useUpdateCompetitionMutation,
} = competitionApi;
