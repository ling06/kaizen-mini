import { useActions } from '@/shared/lib/hooks/useActions';
import { AdminBtn } from '../AdminBtn';
import * as S from './styles';
import { MODAL_TYPES } from '@/shared/model/constants';
import { IChapter } from '@/shared/model/types/chapter.types';
import { FadedTitle } from '../FadedTitle';
import { SortableThemes } from './SortableThemes';
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
      <FadedTitle text="Темы главы">
        <AdminBtn
          popupName="Тема"
          type={'add'}
          onClick={openCreateThemeModal}
        />
      </FadedTitle>
      <S.Container>
        {data.themes && data.themes.length > 0 && (
          <SortableThemes data={data.themes}/>
        )}
      </S.Container>
    </S.Container>
  );
}
