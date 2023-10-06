import { CreateLessonForm } from '@/components/CreateLessonForm';
import * as S from './styles';
import * as C from '@styles/components';

interface ICreateLessonProps {
  type: string;
}

export function CreateLesson({ type }: ICreateLessonProps) {
  return (
    <>
      <S.ChangeBodyBg />    
      <C.DefaultContainer>
        <CreateLessonForm type={type}/>
      </C.DefaultContainer>
    </>
  );
}
