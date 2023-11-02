import styled from 'styled-components';
import * as C from '@styles/components';
import selectIcon from '@assets/images/accordionIcon.svg';

export const SelectIcon = styled(C.Icon)`
  top: 25% !important;
  width: 33px;
  height: 33px;
  background-image: url(${selectIcon});
`;
