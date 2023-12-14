import * as C from '@/shared/ui/assets/styles/components';
import styled from 'styled-components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  padding: 60px 0 150px 0;
  @media ${(props) => props.theme.media.mobile} {
    padding: 2% 0 15%;
  }
`;

export const NotSelectedCourse = styled(C.FlexContainer)`
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: ${props => props.theme.colors.realWhite};
  border-radius: ${props => props.theme.utils.br};
`;
