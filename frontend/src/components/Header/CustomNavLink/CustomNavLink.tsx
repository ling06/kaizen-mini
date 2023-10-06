import { NavLink } from 'react-router-dom';
import * as S from './styles';

export interface ICustomNavLinkProps {
  url: string;
  name: string;
  icon: {
    withIcon: boolean;
    iconUrl: string;
  }
}

export function CustomNavLink({ url, name, icon }: ICustomNavLinkProps) {
  return (
    <NavLink
      to={url}
      style={() => {
        return { textDecoration: 'unset' };
      }}>
      {({ isActive }) => (
        <S.LinkContent $isActive={isActive}>
          {icon.withIcon && (
            <S.Icon $isActive={isActive}></S.Icon>
          )}
        {name}
      </S.LinkContent>
      )}
      </NavLink>
  );
}
