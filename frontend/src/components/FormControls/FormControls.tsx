import * as S from './styles';

export interface IFormControlsProps {
  handlers: {
    cancel: () => void;
    confirm: () => void;
  };
  names: {
    cancel: string;
    confirm: string;
  };
  containerStyles?: { [key: string]: string };
}

export function FormControls({ handlers, names, containerStyles }: IFormControlsProps) {
  return (
    <S.Container style={containerStyles}>
      <S.CancelBtn onClick={handlers.cancel}>{names.cancel}</S.CancelBtn>
      <S.ConfirmBtn onClick={handlers.confirm}>{names.confirm}</S.ConfirmBtn>
    </S.Container>
  );
}
