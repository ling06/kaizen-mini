import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

export const Wrapper = styled(C.FlexContainer)`
  flex-direction: column;
  row-gap: 22px;
  width: 25%;
  @media ${props => props.theme.media.mobile} {
    display: none;
  }
`;
