import * as S from './styles';

interface ICloseBtn {
  onClick: () => void;
  styles?: {
    [key: string]: string;
  };
}

export function CloseBtn({ onClick = () => {}, styles = {} }: ICloseBtn) {
  return (
    <S.Button
      onClick={onClick}
      style={styles}
    />
  );
}
