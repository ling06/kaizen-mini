import styled from 'styled-components';
import * as C from '@/shared/ui/assets/styles/components';

interface IFormContainer {
  $width: string;
}

export const Container = styled(C.FlexContainer)<IFormContainer>`
  flex-direction: column;
  width: ${(props) => props.$width};
  height: 100%;
  padding-top: 25px;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    padding-top: 0;
  }
`;

export const Form = styled.form`
  padding: 0 25px 5vh;
  @media ${(props) => props.theme.media.mobile} {
    padding: 0 3.125vw 15%;
  }
`;

