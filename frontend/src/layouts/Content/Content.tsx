import { ILayoutProps } from '@/types';
import * as S from './styles';

interface IContentProps extends ILayoutProps {
  isDeleted?: boolean;
  isVisible?: boolean;
}

export function Content({children, isDeleted, isVisible}: IContentProps) {
  return (
    <S.Content $isDeleted={isDeleted} $isVisible={isVisible}>
      {children}
    </S.Content>
  );
}