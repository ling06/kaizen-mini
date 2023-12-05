import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/shared/constants';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { SortableChapters } from './SortableChapters';

export function CourseProgramm() {
  const { setModalOpen, setModalType } = useActions();
  const chaptersData = useTypedSelector((state) => state.course.data?.chapters);

  const openCreateChapterModal = () => {
    setModalType(MODAL_TYPES.createChapter);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Head>
        <S.Title as={'h4'}>Программа курса</S.Title>
        <AdminBtn
          popupName="Глава"
          type={ADMIN_BTN_TYPES.add}
          onClick={openCreateChapterModal}
        />
      </S.Head>
      <S.CardList>
      {chaptersData && (
        <SortableChapters data={chaptersData}/>
      )}
      </S.CardList>
    </S.Container>
  );
}
