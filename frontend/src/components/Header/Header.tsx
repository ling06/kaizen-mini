import * as S from './styles';
import { MainLogo } from '../MainLogo';
import { Nav } from './Nav';
import { BoxHeaderElements } from '../BoxHeaderElement/BoxHeaderElement';
export function Header() {
  // const $styles = `margin-right: auto`;

  return (
    <S.Header>
      <MainLogo />
      <Nav />
      <BoxHeaderElements />
    </S.Header>
  );
}
