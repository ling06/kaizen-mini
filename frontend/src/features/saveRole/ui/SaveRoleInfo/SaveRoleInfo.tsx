import * as S from './styles';
  
interface ISaveRoleInfoProps {
  text: string;
  children: React.ReactNode;
}

export function SaveRoleInfo({ text, children }: ISaveRoleInfoProps) {
  return (
    <S.Text>
      {text}
      {children}
    </S.Text>
  );
}
