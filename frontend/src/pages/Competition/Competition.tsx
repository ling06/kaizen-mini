import { CompetitionAside } from '@/components/CompetitionAside';
import * as S from './styles';
import { AsideBar } from '@/layouts/AsideBar';
import { Content } from '@/layouts/Content';
import * as C from '@styles/components';
import { CompetitionContent } from '@/components/CompetitionContent';

export function Competition() {
  return (
    <C.DefaultContainer>
      <S.Container>
        <AsideBar>
          <CompetitionAside />
        </AsideBar>
        <Content>
          <CompetitionContent />
        </Content>
      </S.Container>
    </C.DefaultContainer>
  );
}
