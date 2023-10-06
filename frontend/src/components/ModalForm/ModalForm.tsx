import { FormControls, IFormControlsProps } from '../FormControls';
import * as S from './styles';

interface IFormProps extends IFormControlsProps {
  children: React.ReactNode;
  width: string;
  onSubmit?: () => void;
  styles?: { [key: string]: string };
}

export function ModalForm({
  children,
  handlers,
  names,
  width,
  onSubmit = () => {},
  styles,
}: IFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <S.Container
      $width={width}
      style={styles}>
      <S.Form onSubmit={handleSubmit}>{children}</S.Form>
      <FormControls
        handlers={handlers}
        names={names}
      />
    </S.Container>
  );
}
