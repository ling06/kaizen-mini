import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  margin-bottom: 20px;
`;

export const Select = styled(C.FlexContainer)`
  align-items: center;
  margin-right: auto;
  max-width: 40%;
`;


export const Progress = styled.div`
  padding: 3px 15px;
  margin-right: 20px;
  font-weight: 700;
  font-size: 24.923px;
  line-height: 120%;
  color: ${props => props.theme.colors.realWhite};
  background-color: ${props => props.theme.colors.mainBlue};
  border-radius: 18px;
`;

export const CourseName = styled(C.Text)`
  font-weight: 24.923px;
`;
