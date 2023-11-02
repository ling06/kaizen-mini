import * as S from './styles';
import { MainLogo } from './MainLogo';
import { Nav } from './Nav';
import { ProfileBlock } from './ProfileBlock';

export function Header() {
  return (
    <S.Header>
        <MainLogo />
        <Nav />
        <ProfileBlock />
    </S.Header>
  );
}
