import ReactDOM from 'react-dom';
import * as S from './styles';
import { useActions } from '@/hooks/useActions';
import { useEffect, useState } from 'react';
import { MODAL_TYPES, IS_MOBILE } from '@/constants';
import { ModalPosition } from '@/types/common.types';

interface IModalLayout {
  children: React.ReactNode;
  modalType: string;
  modalPosition: ModalPosition;
}

export function ModalLayout({ children, modalType, modalPosition }: IModalLayout) {
  const { setModalOpen } = useActions();
  const [modalName, setModalName] = useState<string>();

  useEffect(() => {
    let name = '';
    switch (modalType) {
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
      case MODAL_TYPES.selectCourse:
        (name = "Курсы") && IS_MOBILE && (name = "Выбор курса");
        break;  
      default:
        console.error(`Unknown modal type: ${modalType}`);
    }

    setModalName(name);
  }, [modalType]);

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
    <S.ModalLayout onClick={handleOverlayClick} modalPosition={modalPosition}>
      <S.Window modalPosition={modalPosition}>
        <S.ModalName modalPosition={modalPosition}>{modalName}
          <S.CloseBtn onClick={handleCloseModal}/>
        </S.ModalName>
        {children}
      </S.Window>
    </S.ModalLayout>,
    modalRoot
  );
}
