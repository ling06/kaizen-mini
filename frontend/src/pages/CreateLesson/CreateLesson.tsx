import { CreateLessonForm } from '@/components/CreateLessonForm';
import * as S from './styles';
import * as C from '@/shared/ui/assets/styles/components';

interface ICreateLessonProps {
  type: string;
}

export function CreateLesson({ type }: ICreateLessonProps) {
  return (
    <>
      <C.DefaultContainer>
      <S.ChangeBodyBg />    
        <CreateLessonForm type={type}/>
      </C.DefaultContainer>
    </>
  );
}
