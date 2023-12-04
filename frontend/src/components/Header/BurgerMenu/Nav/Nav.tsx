import { NAV_LINKS } from '@/shared/constants';
import { CustomNavLink } from '../../CustomNavLink';
import * as S from './styles';

interface INavProps {
  onClose: () => void;
}

export function Nav({onClose}: INavProps) {

  return (
    <S.Container>
        {Object.values(NAV_LINKS).map((navLink, index) => (
          <CustomNavLink
            {...navLink}
            key={index}
            onClick={onClose}
          />
        ))}
    </S.Container>
  );
}
