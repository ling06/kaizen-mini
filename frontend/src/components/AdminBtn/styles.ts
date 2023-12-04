import styled from 'styled-components';
import editIcon from '@assets/images/editIcon.svg';
import addIcon from '@assets/images/addIcon.svg';
import { ADMIN_BTN_TYPES } from '@/shared/constants';

interface IAdminBtn {
  $type: string;
}

export const AdminBtn = styled.button<IAdminBtn>`
  position: relative;
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-image: url(${(props) => (props.$type === ADMIN_BTN_TYPES.edit ? editIcon : addIcon)});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
    width: 7.5vw;
    height: 7.5vw;
  }
`;
