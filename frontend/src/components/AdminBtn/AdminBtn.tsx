import { useRef, useState } from 'react';
import * as S from './styles';
import { ADMIN_BTN_TYPES } from '@/constants';
import { ControlsPopup } from '../ControlsPopup';

interface IAdminBtnProps {
  type: string;
  onClick: (event: React.MouseEvent) => void;
  popupHandlers?: {
    onHide?: (event?: React.MouseEvent) => void;
    onAdd?: (event?: React.MouseEvent) => void;
    onEdit?: (event?: React.MouseEvent) => void;
    onDelete?: (event?: React.MouseEvent) => void;
  };
  styles?: {[key: string]: string};
}

const body = document.body;

export function AdminBtn({ type, onClick, popupHandlers, styles = {} }: IAdminBtnProps) {
  const [isPopup, setPopup] = useState<boolean>();
  const ref = useRef<HTMLButtonElement>(null);
  const popupInnerRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: MouseEvent) => {
    if (!popupInnerRef.current) return;
    if (event.target !== popupInnerRef.current && event.target !== ref.current) {
      setPopup(false);
      body.removeEventListener('click', handleOverlayClick);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick(event);
    if (type === ADMIN_BTN_TYPES.edit) {
      if (isPopup) {
        setPopup(false);
      } else {
        setPopup(true);
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
          name={'test'}
          {...popupHandlers}
        />
      )}
    </S.AdminBtn>
  );
}
