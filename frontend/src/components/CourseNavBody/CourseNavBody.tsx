import { useActions } from '@/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { CourseNavTheme } from '../CourseNavTheme';
import * as S from './styles';
import { MODAL_TYPES } from '@/constants';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export function CourseNavBody() {
  const { setModalType, setModalOpen } = useActions();
  const { activeChapterId, chapters } = useTypedSelector((state) => state.course);
  const chapterData = chapters?.find((chapter) => chapter.id === activeChapterId);

  const openCreateThemeModal = () => {
    setModalType(MODAL_TYPES.createTheme);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Title>
        Темы главы
        <AdminBtn
          type={'add'}
          onClick={openCreateThemeModal}
        />
      </S.Title>
      <S.Container>
        {chapterData?.themes &&
          chapterData.themes.map((theme) => (
            <CourseNavTheme
              data={theme}
              key={theme.id}
            />
          ))}
      </S.Container>
    </S.Container>
  );
}
