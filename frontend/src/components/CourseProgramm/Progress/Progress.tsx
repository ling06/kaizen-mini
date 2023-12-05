import { AdminBtn } from '@/components/AdminBtn';
import { DndBtn } from '@/components/DndBtn';
import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/shared/constants';
import { css } from 'styled-components';
import * as S from './styles';
import * as C from '@styles/components';
import { useCallback } from 'react';
import dndIconWithArrows from '@assets/images/dnd-btn-arrows.svg';
import dndIconWithArrowsActive from '@assets/images/dnd-btn-arrows-active.svg';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useDeleteChapterMutation, useRestoreChapterMutation } from '@/store/api/chapter.api';
import { IChapter } from '@/shared/types/chapter.types';

interface IProgressProps {
  data: IChapter;
  setDraggable: () => void;
  setNotDraggable: () => void;
  setDeleted: (arg: boolean) => void;
  isDeleted: boolean;
}


export function Progress({ data, setDraggable, setNotDraggable, setDeleted, isDeleted }: IProgressProps) {
  const { setLoaderActive, setModalOpen, setModalType, setUpdatingChapterData } = useActions();
  const [deleteChapter] = useDeleteChapterMutation();
  const [restoreChapter] = useRestoreChapterMutation();
  const setProgressStatus = useCallback(() => {
    if (data.percentage.percentage == 100) {
      return 'Пройдено';
    } else if (data.percentage.percentage > 0) {
      return 'В процессе';
    }
    return 'Предстоит';
  }, [data.percentage.percentage]);

  const handleDeleteChapter = () => {
    deleteChapter({ id: data.id }).then(() => {
      setLoaderActive(false);
      setDeleted(true);
    });
    setLoaderActive(true);
  };

  const handleRestoreChapter = () => {
    restoreChapter({ id: data.id }).then(() => {
      setLoaderActive(false);
      setDeleted(false);
    });
    setLoaderActive(true);
  };

  const handleEditChapter = () => {
    setModalType(MODAL_TYPES.editChapter);
    setUpdatingChapterData(data);
    setModalOpen(true);
  };

  return (
    <S.ProgressContainer>
    <S.ProgressStatusWrapper>
      <S.ProgressStatus>{setProgressStatus()}</S.ProgressStatus>
      <S.BtnsGroup>
        <DndBtn
          styles={css`
            background-image: url(${dndIconWithArrows});
            &:hover {
              background-image: url(${dndIconWithArrowsActive});
            }
          `}
          onMouseEnter={setDraggable}
          onMouseLeave={setNotDraggable}
        />
        <AdminBtn
          popupName="Глава"
          type={ADMIN_BTN_TYPES.edit}
          onClick={() => {}}
          popupHandlers={{
            onDelete: isDeleted ? undefined : handleDeleteChapter,
            onRestore: isDeleted ? handleRestoreChapter : undefined,
            onEdit: handleEditChapter,
          }}
        />
      </S.BtnsGroup>
    </S.ProgressStatusWrapper>
    <C.ProgressBar $progress={String(data?.percentage.percentage) || '0'} />
  </S.ProgressContainer>
  );
}
