import { useActions } from '@/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import { CourseNavTheme } from '../CourseNavTheme';
import * as S from './styles';
import { MODAL_TYPES } from '@/constants';
import { IChapter } from '@/types/chapter.types';

interface ICourseNavBodyProps {
  data: IChapter;
}
export function CourseNavBody({ data }: ICourseNavBodyProps) {
  const { setModalType, setModalOpen } = useActions();

  const openCreateThemeModal = () => {
    setModalType(MODAL_TYPES.createTheme);
    setModalOpen(true);
  };

  return (
    <S.Container>
      <S.Title>
        Темы главы
        <AdminBtn
          popupName="Тема"
          type={'add'}
          onClick={openCreateThemeModal}
        />
      </S.Title>
      <S.Container>
        {data.themes &&
          data.themes.map((theme) => (
            <CourseNavTheme
              data={theme}
              courseId={data.course_id}
              key={theme.id}
            />
          ))}
      </S.Container>
    </S.Container>
  );
}
