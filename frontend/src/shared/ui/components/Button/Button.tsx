import { FC } from 'react';
import * as S from './styles';
import { RuleSet } from 'styled-components';

interface IButtonProps {
  text: string;
  onClick: () => void;
  styles?: RuleSet<object>
}

export const Button: FC<IButtonProps> = ({ text, onClick, styles }) => {
  return <S.Button $styles={styles} onClick={onClick}>{text}</S.Button>;
};
