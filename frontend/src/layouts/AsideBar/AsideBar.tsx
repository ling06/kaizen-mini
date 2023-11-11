import { ILayoutProps } from '@/types';
import * as S from './styles';

interface IAsideBarProps extends ILayoutProps {
}

export function AsideBar({ children }: IAsideBarProps) {
  return <S.Container>{children}</S.Container>;
}
