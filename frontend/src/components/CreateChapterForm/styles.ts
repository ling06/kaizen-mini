import styled from 'styled-components';
import * as C from '@styles/components';
import imagesIcon from '@assets/images/imagesIcon.svg';

export const InputName = styled(C.InputWithState)`
  margin-bottom: 20px;
`;

export const AddChapterImg = styled(C.DefaultBtn)`
  width: fit-content;
  min-height: 41px;
  padding: 0 24px 0 52px;
  margin-bottom: 20px;
  font-size: 15.397px;
  background-image: url(${imagesIcon});
  background-repeat: no-repeat;
  background-position: 17px 9px;
  background-size: 24px;
`;

export const BottomContainer = styled(C.FlexContainer)`
  justify-content: space-between;
`;
