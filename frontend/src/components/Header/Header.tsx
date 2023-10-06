import * as S from './styles';
import { MainLogo } from '../MainLogo';
import { Nav } from './Nav';

export function Header() {
  // const $styles = `margin-right: auto`;

  return (
    <S.Header>
      <MainLogo />
      <Nav />
      <div>Поиск</div>
      <div>Профиль</div>
    </S.Header>
  );
}
