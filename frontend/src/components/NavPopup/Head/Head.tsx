import { CloseBtn } from '@/components/CloseBtn';
import { NavBar } from '../NavBar';
import * as S from './styles';
import { Steps } from '@/shared/constants';

interface IHeadProps {
  activeStep: Steps;
  onClose: () => void;
}

export function Head({ activeStep, onClose=()=>{} }: IHeadProps) {

  return (
     <S.Container>
        <NavBar activeStep={activeStep}/>
        <CloseBtn onClick={onClose}/>
     </S.Container>
  );
}
