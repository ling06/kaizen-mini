import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';
import * as S from './styles';
import { RuleSet } from 'styled-components';

interface IDndBtn {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  styles?: RuleSet<object>;
}

export function DndBtn({ onClick=()=>{}, onMouseEnter=()=>{}, onMouseLeave=()=>{}, styles }: IDndBtn) {
  const userRole = useTypedSelector((state) => selectUser(state).data?.user.role);
  if(userRole !== 'admin') return null;
  return (
    <S.DndBtn
      $style={styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
