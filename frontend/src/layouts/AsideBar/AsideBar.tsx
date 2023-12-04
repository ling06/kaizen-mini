import { ILayout } from '@/shared/types';
import * as S from './styles';

interface IAsideBarProps extends ILayout {
}

export function AsideBar({ children }: IAsideBarProps) {
  return <S.Container>{children}</S.Container>;
}
