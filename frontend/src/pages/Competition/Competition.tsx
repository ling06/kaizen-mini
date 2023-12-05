import { CompetitionAside } from '@/components/CompetitionAside';
import * as S from './styles';
import { AsideBar } from '@/shared/ui/layouts';
import * as C from '@/shared/ui/assets/styles/components';
import { CompetitionContent } from '@/components/CompetitionContent';

export function Competition() {
  return (
    <C.DefaultContainer>
      <S.Container>
        <AsideBar>
          <CompetitionAside />
        </AsideBar>
        <CompetitionContent />
      </S.Container>
    </C.DefaultContainer>
  );
}
