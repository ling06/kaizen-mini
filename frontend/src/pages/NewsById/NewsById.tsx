import { AdminBtn } from '@/components/AdminBtn';
import * as S from './styles';
import * as C from '@styles/components';
import { NewsByIdContent } from '@/components/NewsByIdContent';

export function NewsById() {
  return (
    <C.DefaultContainer>
      <S.Container>
        <AdminBtn
          popupName="Новость"
          type="add"
          styles={{ marginLeft: 'auto', display: 'block' }}
        />
        <NewsByIdContent />
      </S.Container>
    </C.DefaultContainer>
  );
}
