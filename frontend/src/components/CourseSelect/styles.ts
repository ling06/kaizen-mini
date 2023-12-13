import styled from 'styled-components';
import * as C from '@styles/components';
import selectIcon from '@assets/images/accordionIcon.svg';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  margin-bottom: 20px;
`;

export const CourseName = styled(C.FlexContainer)`
  align-items: center;
  width: fit-content;
  margin-right: auto;
  cursor: pointer;
`;

export const SelectIcon = styled(C.Icon)`
  width: 33px;
  height: 33px;
  background-image: url(${selectIcon});
`;
