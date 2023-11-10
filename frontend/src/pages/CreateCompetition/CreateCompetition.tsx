import * as S from './styles';
import * as C from '@styles/components';
import { CreateCompetitionForm } from '@/components/CreateCompetitionForm';

interface ICreateNewsProps {
  type: string;
}

export function CreateCompetition({ type }: ICreateNewsProps) {
  return (
    <C.DefaultContainer>
      <S.ChangeBodyBg />
      <CreateCompetitionForm type={type} />
    </C.DefaultContainer>
  );
}
