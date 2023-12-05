import { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { ADMIN_BTN_TYPES, USER_ROLES } from '@/shared/constants';
import { ControlsPopup, IControlsPopup } from '../ControlsPopup';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { selectUser } from '@/store/api/user.api';

export interface IAdminBtnProps {
  type: string;
  onClick?: (event: React.MouseEvent) => void;
  popupName: string;
  popupHandlers?: Omit<IControlsPopup, 'name' | 'innerRef'>;
  styles?: { [key: string]: string };
}

const body = document.body;

export function AdminBtn({ type, onClick, popupName, popupHandlers, styles = {} }: IAdminBtnProps) {
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
    if (onClick) {
      onClick(event);
    }
    if (type === ADMIN_BTN_TYPES.edit) {
      if (isPopup) {
        setPopup(false);
      } else {
        setPopup(true);
        body.addEventListener('click', handleOverlayClick);
      }
    }
  };

  if(!isAdmin) return null;

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
