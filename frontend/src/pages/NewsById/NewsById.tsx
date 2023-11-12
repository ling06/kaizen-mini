import { AdminBtn } from '@/components/AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { NewsByIdContent } from '@/components/NewsByIdContent';
import { useNavigate } from 'react-router-dom';

export function NewsById() {
  const navigate = useNavigate();
  const handleCreateNews = () => {
    navigate('/news/create-news');
  };
  return (
    <C.DefaultContainer>
      <S.Container>
        <AdminBtn
          popupName="Новость"
          type="add"
          styles={{ marginLeft: 'auto', display: 'block' }}
          onClick={handleCreateNews}
        />
        <NewsByIdContent />
      </S.Container>
    </C.DefaultContainer>
  );
}
