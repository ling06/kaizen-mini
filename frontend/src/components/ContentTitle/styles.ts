import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Title = styled(C.Text)`
  margin-bottom: 23px;
  font-size: 22px;
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;
