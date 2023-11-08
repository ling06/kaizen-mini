import { useActions } from '@/hooks/useActions';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { setNavPopup } = useActions();
  const navigate = useNavigate();

  const handleOpenNavPopup = () => {
    setNavPopup(true);
  };

  const handleGoHome = () => {
    navigate('/courses');
  };

  return (
    <S.Header>
      <S.OpenNavBtn
        onClick={handleOpenNavPopup}
        as="button"
      />
      <S.HomeLink onClick={handleGoHome} as="a"/>
    </S.Header>
  );
}
