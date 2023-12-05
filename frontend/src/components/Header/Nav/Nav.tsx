import { NAV_LINKS } from '@/shared/model/constants';
import { CustomNavLink } from '../CustomNavLink';
import * as S from './styles';

export function Nav() {
  return (
    <S.Container>
      <S.NavBar>
        {Object.values(NAV_LINKS).map((navLink, index) => (
          <CustomNavLink
            {...navLink}
            key={index}
          />
        ))}
      </S.NavBar>
    </S.Container>
  );
}
