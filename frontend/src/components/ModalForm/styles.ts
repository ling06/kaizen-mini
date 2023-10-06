import styled from 'styled-components';
import * as C from '@styles/components';

interface IFormContainer {
  $width: string;
}

export const Container = styled(C.FlexContainer)<IFormContainer>`
  flex-direction: column;
  width: ${(props) => props.$width};
  height: 100%;
  padding-top: 25px;
`;

export const Form = styled.form`
  padding: 0 25px 5vh;
`;

