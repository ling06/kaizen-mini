import ReactDOM from 'react-dom';
import { Head } from './Head';
import * as S from './styles';

export interface IBurgerMenuProps {
  onClose: () => void;
}
export function BurgerMenu({ onClose }: IBurgerMenuProps) {
  const modalRoot = document.querySelector('#modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <S.Container>
      <Head onClose={onClose}/>
    </S.Container>,
    modalRoot
  );
}
