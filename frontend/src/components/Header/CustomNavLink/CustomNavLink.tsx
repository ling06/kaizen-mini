import { NavLink } from 'react-router-dom';
import * as S from './styles';

export interface ICustomNavLinkProps {
  url: string;
  name: string;
  icon: {
    withIcon: boolean;
    iconUrl: string;
  };
  onClick?: () => void;
}

export function CustomNavLink({ url, name, icon, onClick=() => {} }: ICustomNavLinkProps) {
  return (
    <NavLink
      to={url}
      style={() => {
        return { textDecoration: 'unset', height: '100%' };
      }}>
      {({ isActive }) => (
        <S.LinkContent $isActive={isActive} onClick={onClick}>
          {icon.withIcon && (
            <S.Icon $isActive={isActive}></S.Icon>
          )}
        {name}
      </S.LinkContent>
      )}
      </NavLink>
  );
}
