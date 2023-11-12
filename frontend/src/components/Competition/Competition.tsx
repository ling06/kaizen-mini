import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { ADMIN_BTN_TYPES } from '@/constants';
import { ICompetition } from '@/types/competition.types';
import { useNavigate } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useDeleteCompetitionMutation, useRestoreCompetitionMutation, useUpdateCompetitionMutation } from '@/store/api/competition.api';
import { IEditorJsData } from '@/types/editorJs.types';

interface ICompetitionCard {
  data: ICompetition;
  totalCount: number;
  index: number;
}

export function Competition({ data, totalCount, index }: ICompetitionCard) {
  const navigate = useNavigate();
  const [deleteCompetition] = useDeleteCompetitionMutation()
  const [restoreCompetition] = useRestoreCompetitionMutation();
  const [updateCompetition] = useUpdateCompetitionMutation();
  const [competitionDescr, setCompetitionDescr] = useState<string>('');

  useEffect(() => {
    if(data.text) {
      const editorData: Array<IEditorJsData> = JSON.parse(data.text);
      const firstTextBlock = editorData.find((block) => block.type === 'paragraph');
      if(firstTextBlock && firstTextBlock.data.text) {
        setCompetitionDescr(firstTextBlock.data.text);
      }
    }
  }, [data.text])

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
    navigate(`/news/competition/edit-competition/${data.id}`);
  };

  const handleClickMore = (id:number) => {
    navigate(`/news/competitions/${id}`);
  };

  const handleVisibleCompetition = () => {
    updateCompetition({
      id: data.id,
      status: Number(data.status) === 0 ? 1 : 0
    }).then((res) => {
      if ('data' in res && !res.data.result) {
        alert('При редактировании конкурса произошла ошибка');
      }
      setLoaderActive(false);
    }).catch((err) => {
      console.error(err);
      alert('При редактировании конкурса произошла ошибка');
      setLoaderActive(false);
    })
    setLoaderActive(true)
  }

  return (
    <S.Container $isDeleted={isDeleted} $isVisible={Number(data.status) === 1}>
      <S.Head>
        <S.CompetitionPagination>Конкурс {index + 1 + '/' + totalCount}</S.CompetitionPagination>
        <AdminBtn
          popupName="Конкурс"
          type={ADMIN_BTN_TYPES.edit}
          popupHandlers={{
            onAdd: handleAddCompetition,
            onDelete: isDeleted ? undefined : handleDeleteCompetition,
            onRestore: isDeleted ? handleRestoreCompetition : undefined,
            onEdit: handleEditCompetition,
            onHide: Number(data.status) === 1 ? handleVisibleCompetition : undefined,
            onVisible: Number(data.status) === 0 ? handleVisibleCompetition : undefined
          }}
        />
      </S.Head>
      <S.CompetitionTitle>
        {data?.title}
      </S.CompetitionTitle>
      <S.CompetitionDescr>
        {competitionDescr}
      </S.CompetitionDescr>
      <S.MoreBtn
        onClick={() => handleClickMore(data?.id)}>
        Подробнее
      </S.MoreBtn>
    </S.Container>
  );
}
