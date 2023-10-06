import { ILayoutProps } from '@/types';
import * as S from './styles';

export function Layout({ children }: ILayoutProps) {
  return <S.Layout>{children}</S.Layout>;
}
