import { ADMIN_BTN_TYPES, MODAL_TYPES } from '@/constants';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { CourseProgrammCard } from './CourseProgrammCard';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export function CourseProgramm() {
  const { setModalOpen, setModalType } = useActions();
  const chaptersData = useTypedSelector(state => state.course.chapters);

  const openCreateChapterModal = () => {
    setModalType(MODAL_TYPES.createChapter)
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Head>
        <S.Title as={'h4'}>Программа курса</S.Title>
        <AdminBtn type={ADMIN_BTN_TYPES.add} onClick={openCreateChapterModal}/>
      </S.Head>
      <S.CardList>
        {chaptersData && chaptersData.length > 0 && (
          chaptersData.map((chapter) => <CourseProgrammCard data={chapter} key={chapter.id}/>)
        )}
      </S.CardList>
    </S.Container>
  );
}
