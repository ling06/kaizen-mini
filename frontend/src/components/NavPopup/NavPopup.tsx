import { useParams } from 'react-router-dom';
import { Head } from './Head';
import * as S from './styles';

export function NavPopup() {
  const { chapterId, themeId } = useParams();
  return (
    <S.Container>
      <Head />
    </S.Container>
  );
}
