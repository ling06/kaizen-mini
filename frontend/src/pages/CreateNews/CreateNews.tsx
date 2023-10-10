import { CreateNewsForm } from '@/components/CreateNewsForm';
import * as S from './styles';
import * as C from '@styles/components';

interface ICreateNewsProps {
  type: string;
}

export function CreateNews({ type }: ICreateNewsProps) {
  return (
    <C.DefaultContainer>
      <S.ChangeBodyBg />
      <CreateNewsForm type={type} />
    </C.DefaultContainer>
  );
}
