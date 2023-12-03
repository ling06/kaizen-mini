import { ILayout } from '@/types';
import * as S from './styles';

interface IContentProps extends ILayout {
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
