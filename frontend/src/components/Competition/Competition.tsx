import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { ADMIN_BTN_TYPES } from '@/constants';
import { ICompetition } from '@/types/competition.types';
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useDeleteCompetitionMutation, useRestoreCompetitionMutation } from '@/store/api/competition.api';

interface ICompetitionCard {
  data: ICompetition;
}

export function Competition({ data }: ICompetitionCard) {
  const navigate = useNavigate();
  const [deleteCompetition] = useDeleteCompetitionMutation()
  const [restoreCompetition] = useRestoreCompetitionMutation();

  const { setLoaderActive, setUpdatingCompetitionData } = useActions();
  const [isDeleted, setDeleted] = useState<boolean>(!!data?.is_deleted);

  const handleAddCompetition = () => {
    setUpdatingCompetitionData(null)
    navigate('/competition/create-competition');
  };

  const handleDeleteCompetition = () => {
    deleteCompetition({ id: data.id }).then(() => {
      setLoaderActive(false);
      setDeleted(true);
    });
    setLoaderActive(true);
  };
  const handleRestoreCompetition = () => {
    restoreCompetition({ id: data.id }).then(() => {
      setLoaderActive(false);
      setDeleted(false);
    });
    setLoaderActive(true);
  };

  const handleEditCompetition = () => {
    navigate('/competition/create-competition');
    setUpdatingCompetitionData(data);
  };

  return (
    <S.Container>
      <S.Head>
        <S.CompetitionPagination>Конкурс 1/7</S.CompetitionPagination>
        <AdminBtn
          popupName="Конкурс"
          type={ADMIN_BTN_TYPES.edit}
          onClick={() => {}}
          popupHandlers={{
            onAdd: handleAddCompetition,
            // onHide: Number(data.status) === 1 ? handleToggleCompetitionStatus : undefined,
            // onVisible: Number(data.status) === 0 ? handleToggleCompetitionStatus : undefined,
            onDelete: isDeleted ? undefined : handleDeleteCompetition,
            onRestore: isDeleted ? handleRestoreCompetition : undefined,
            onEdit: handleEditCompetition
          }}
        />
      </S.Head>
      <S.CompetitionTitle>
        {data?.title}
      </S.CompetitionTitle>
      <S.CompetitionDescr>
        {data?.text}
      </S.CompetitionDescr>
      <S.MoreBtn
        onClick={() => {
          console.log(1111);
        }}>
        Подробнее
      </S.MoreBtn>
    </S.Container>
  );
}
