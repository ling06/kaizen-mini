import { useRef, useState } from 'react';
import * as S from './styles';
import { ADMIN_BTN_TYPES } from '@/shared/model/constants';
import { ControlsPopup, IControlsPopup } from '../ControlsPopup';

export interface IAdminBtnProps {
  type: string;
  onClick?: (event: React.MouseEvent) => void;
  popupName: string;
  popupHandlers?: Omit<IControlsPopup, 'name' | 'innerRef'>;
  styles?: { [key: string]: string };
}

const body = document.body;

export function AdminBtn({ type, onClick, popupName, popupHandlers, styles = {} }: Readonly<IAdminBtnProps>) {
  const [isPopup, setIsPopup] = useState<boolean>();
  const ref = useRef<HTMLButtonElement>(null);
  const popupInnerRef = useRef<HTMLDivElement>(null);


  const handleOverlayClick = (event: MouseEvent) => {
    if (!popupInnerRef.current) return;
    if (event.target !== popupInnerRef.current && event.target !== ref.current) {
      setIsPopup(false);
      body.removeEventListener('click', handleOverlayClick);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
    if (type === ADMIN_BTN_TYPES.edit) {
      if (isPopup) {
        setIsPopup(false);
      } else {
        setIsPopup(true);
        body.addEventListener('click', handleOverlayClick);
      }
    }
  };


  return (
    <S.AdminBtn
      style={styles}
      ref={ref}
      $type={type}
      onClick={handleClick}>
      {isPopup && (
        <ControlsPopup
          innerRef={popupInnerRef}
          name={popupName}
          {...popupHandlers}
        />
      )}
    </S.AdminBtn>
  );
}
