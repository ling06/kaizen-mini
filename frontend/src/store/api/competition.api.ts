import { api } from '../../shared/api/api';
import { ICompetition, ICreateCompetitionData, IGetAllCompetitions, IUpdateCompetitionData } from '@/shared/model/types/competition.types';
import { IDefaultResWithData, IDefaultRes, IDefaultReqWithId } from '@/shared/model/types/common.types';

type ICompetitionRes = IDefaultResWithData<ICompetition>;

export const competitionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompetitions: builder.query<IGetAllCompetitions, void>({
      query: () => 'competition',
      providesTags: () => [
        {
          type: 'Competition',
        },
      ],
    }),
    getCompetitionById: builder.query<ICompetitionRes, number>({
      query: (id) => `competition/${id}`,
      providesTags: () => [
        {
          type: 'CompetitionById',
        },
      ],
    }),
    createCompetition: builder.mutation<ICompetitionRes, ICreateCompetitionData>({
      query: (data) => ({
        url: 'competition/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Competition'],
    }),
    updateCompetition: builder.mutation<ICompetitionRes, IUpdateCompetitionData>({
      query: (data) => ({
        url: 'competition/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Competition', 'CompetitionById'],
    }),
    deleteCompetition: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'competition/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Competition', 'CompetitionById'],
    }),
    restoreCompetition: builder.mutation<IDefaultRes, IDefaultReqWithId>({
      query: (data) => ({
        url: 'competition/restore',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Competition', 'CompetitionById'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCompetitionMutation,
  useDeleteCompetitionMutation,
  useGetCompetitionByIdQuery,
  useGetAllCompetitionsQuery,
  useRestoreCompetitionMutation,
  useUpdateCompetitionMutation,
} = competitionApi;
