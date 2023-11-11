import { Nav } from '../Nav';
import * as S from './styles';

interface IBodyProps {
  onClose: () => void;
}

export function Body({ onClose }: IBodyProps) {
  return (
    <S.Container>
     <Nav onClose={onClose}/>
    </S.Container>
  );
}
