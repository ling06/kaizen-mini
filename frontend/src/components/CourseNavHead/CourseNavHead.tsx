import { useMemo } from 'react';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { IChapter } from '@/shared/types/chapter.types';
import { useDeleteChapterMutation, useRestoreChapterMutation } from '@/store/api/chapter.api';
import { useActions } from '@/shared/lib/hooks/useActions';
import { MODAL_TYPES } from '@/shared/constants';

interface ICourseNavHeadProps {
  data: IChapter;
}

export function CourseNavHead({ data }: ICourseNavHeadProps) {
  const [deleteChapter] = useDeleteChapterMutation();
  const [restoreChapter] = useRestoreChapterMutation();
  const { setLoaderActive, setModalType, setUpdatingChapterData, setModalOpen } = useActions();
  const chapterProgress = useMemo(() => {
    if (data) {
      let lessons = 0;
      let checkedlessons = 0;
      data.themes?.forEach((theme) => {
        theme.lessons?.forEach((lesson) => {
          if (lesson.isChecked) {
            checkedlessons++;
          }
          lessons++;
        });
      });
      return (checkedlessons / lessons) * 100;
    }
  }, [data]);

  const handleDeleteChapter = () => {
    deleteChapter({ id: data.id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleRestoreChapter = () => {
    restoreChapter({ id: data.id }).then(() => {
      setLoaderActive(false);
    });
    setLoaderActive(true);
  };

  const handleEditChapter = () => {
    setUpdatingChapterData(data);
    setModalType(MODAL_TYPES.editChapter);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title
          $isDeleted={!!data.is_deleted}
          as={'h3'}>
          {data.title}
        </S.Title>
        <AdminBtn
          popupName="Глава"
          type={'edit'}
          onClick={() => {}}
          popupHandlers={{
            onDelete: !data.is_deleted ? handleDeleteChapter : undefined,
            onRestore: data.is_deleted ? handleRestoreChapter : undefined,
            onEdit: handleEditChapter,
          }}
        />
      </S.TitleWrapper>
      <S.ProgressBar $progress={`${chapterProgress}`} />
    </S.Container>
  );
}
