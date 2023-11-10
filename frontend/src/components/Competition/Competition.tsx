import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import { ICompetition } from '@/types/competition.types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useActions } from '@/hooks/useActions';

interface ICompetitionCard {
  data: ICompetition;
};

export function Competition({ data }: ICompetitionCard) {
  const navigation = useNavigate();
  const { setLoaderActive, setModalOpen, setModalType, setUpdatingChapterData } = useActions();
  const [isDeleted, setDeleted] = useState<boolean>(false);

  const handleAddCompetition = () => {
    setModalType(MODAL_TYPES.createCompetition);
    setModalOpen(true);
  };

  const handleToggleCompetitionStatus = () => {
    // if (!courseData.id) {
    //   console.error(`No course with id: ${courseData.id}!`);
    //   return;
    // }
    // updateCourse({
    //   id: courseData.id,
    //   status: Number(courseData.status) === 0 ? 1 : 0,
    // }).then((res) => {
    //   if ('data' in res) {
    //     setCourseData(res.data.data);
    //   }
    // });
    // setLoaderActive(true);
  };

  const handleDeleteCompetition = () => {
    // deleteChapter({ id: data.id }).then(() => {
    //   setLoaderActive(false);
    //   setDeleted(true);
    // });
    // setLoaderActive(true);
  };
  const handleRestoreCompetition = () => {
    // restoreChapter({ id: data.id }).then(() => {
    //   setLoaderActive(false);
    //   setDeleted(false);
    // });
    // setLoaderActive(true);
  };

  const handleEditCompetition = () => {
    // setModalType(MODAL_TYPES.editChapter);
    // setUpdatingChapterData(data);
    // setModalOpen(true);
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
        Продай 36 кресел серии X, получи кресло Yamaguchi Osaka в качестве премии
      </S.CompetitionTitle>
      <S.CompetitionDescr>
        Здоровый праздничный ужин вовсе не обязательно должен состоять из шпината, гречки и вареной
        куриной грудки. Самыми лучшими способами приготовления...
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
