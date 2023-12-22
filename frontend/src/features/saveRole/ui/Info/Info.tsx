import * as S from './styles';
  
interface IInfoProps {
  text: string;
  children?: React.ReactNode;
}

export function Info({ text, children }: IInfoProps) {
  return (
    <S.Text>
      {text}
      {children}
    </S.Text>
  );
}
