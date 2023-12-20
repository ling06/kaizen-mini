import { RuleSet } from 'styled-components';
import * as S from './styles';

interface INoBgButtonProps {
  text: string;
  onClick: () => void;
  styles?: RuleSet<object>;
  children?: React.ReactNode;
}

export function NoBgButton({ text, onClick=() => {}, styles, children}: INoBgButtonProps) {
  return (
    <S.Button $styles={styles} onClick={onClick}>
      {children}
      <S.Text>{text}</S.Text>
    </S.Button>
  );
}
