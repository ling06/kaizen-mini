import ReactDOM from 'react-dom';
import * as S from './styles';
import loadingLogo from '@assets/images/loadingLogo.svg';

interface ILoadingProps {
  styles?: {
    [key: string]: string;
  }
}

export function Loading({ styles={} }: ILoadingProps) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return;

  return ReactDOM.createPortal(
    <S.Overlay style={styles}>
      <S.Container>
        <S.Logo src={loadingLogo} />
        <S.Text>Загрузка...</S.Text>
      </S.Container>
    </S.Overlay>,
    modalRoot
  );
}
