import styled from 'styled-components';
import * as C from '@styles/components';
import deleteIcon from '@assets/images/deleteIcon.svg';

export const DeleteBtn = styled.button`
  background-color: transparent;
  padding: 0;
  margin: 0;
  margin-left: auto;
`;

export const DeleteBtnIcon = styled(C.Icon)`
  background-image: url(${deleteIcon});
`;
