import ReactDOM from 'react-dom';
import * as S from './styles';
import { useActions } from '@/shared/lib/hooks/useActions';
import { useEffect, useState } from 'react';
import { MODAL_TYPES } from '@/shared/model/constants';

interface IModalLayout {
  children: React.ReactNode;
  modalType: string;
}

export function ModalLayout({ children, modalType: type }: IModalLayout) {
  const { setModalOpen } = useActions();
  const [modalName, setModalName] = useState<string>();

  useEffect(() => {
    let name = '';
    switch (type) {
      case MODAL_TYPES.createCourse:
        name = 'Создание курса';
        break;
      case MODAL_TYPES.editCourse:
        name = 'Изменение курса';
        break;
      case MODAL_TYPES.createChapter:
        name = 'Создание главы';
        break;
      case MODAL_TYPES.editChapter:
        name = 'Изменение главы';
        break;
      case MODAL_TYPES.createTheme:
        name = 'Создание Темы';
        break;
      case MODAL_TYPES.editTheme:
        name = 'Изменение Темы';
        break;
      case MODAL_TYPES.newsCategory: 
        name = "Категории";
        break;  
      default:
        console.error(`Unknown modal type: ${type}`);
    }

    setModalName(name);
  }, [type]);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return ReactDOM.createPortal(
    <S.ModalLayout onClick={handleOverlayClick}>
      <S.Window>
        <S.ModalName>{modalName}
          <S.CloseBtn onClick={handleCloseModal}/>
        </S.ModalName>
        {children}
      </S.Window>
    </S.ModalLayout>,
    modalRoot
  );
}
