import styled from 'styled-components';
import * as C from '@styles/components';

export const Item = styled(C.Text)`
  font-size: 22px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
