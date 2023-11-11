import { ILayoutProps } from '@/types';
import * as S from './styles';

interface IContentProps extends ILayoutProps {}

export function Content({children}: IContentProps) {
  return (
    <S.Content>
      {children}
    </S.Content>
  );
}