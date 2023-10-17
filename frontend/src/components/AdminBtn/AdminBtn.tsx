import { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { ADMIN_BTN_TYPES, USER_ROLES } from '@/constants';
import { ControlsPopup } from '../ControlsPopup';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';

interface IAdminBtnProps {
  type: string;
  onClick: (event: React.MouseEvent) => void;
  popupHandlers?: {
    onHide?: (event?: React.MouseEvent) => void;
    onAdd?: (event?: React.MouseEvent) => void;
    onEdit?: (event?: React.MouseEvent) => void;
    onDelete?: (event?: React.MouseEvent) => void;
  };
  styles?: { [key: string]: string };
}

const body = document.body;

export function AdminBtn({ type, onClick, popupHandlers, styles = {} }: IAdminBtnProps) {
  const [isPopup, setPopup] = useState<boolean>();
  const user = useTypedSelector((state) => selectUser(state).data);
  const ref = useRef<HTMLButtonElement>(null);
  const popupInnerRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.user.role === USER_ROLES.admin) {
      setAdmin(true);
    }
  }, [user]);

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
    <>
      {isAdmin && (
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
      )}
    </>
  );
}
