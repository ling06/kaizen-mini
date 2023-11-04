import { NAV_LINKS } from '@/constants';
import { CustomNavLink } from '../../CustomNavLink';
import * as S from './styles';

export function Nav() {
  return (
    <S.Container>
        {Object.values(NAV_LINKS).map((navLink, index) => (
          <CustomNavLink
            {...navLink}
            key={index}
          />
        ))}
    </S.Container>
  );
}
