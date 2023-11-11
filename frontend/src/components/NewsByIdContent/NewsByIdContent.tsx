import { useNavigate } from 'react-router-dom';
import { NewsCategoryWrapper } from '../NewsCategoryWrapper';
import { BackBtn } from '../BackBtn';
import * as S from './styles';
import { NewsContent } from './NewsContent';

export function NewsByIdContent() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/news');
  };

  return (
    <S.Container>
      <NewsCategoryWrapper>
        <BackBtn onClick={handleGoBack} />
      </NewsCategoryWrapper>
      <NewsContent />
    </S.Container>
  );
}
