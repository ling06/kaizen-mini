import styled from 'styled-components';
import * as C from '@styles/components';

export const NoAvailableCourses = styled(C.FlexContainer)`
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
`;

export const NoAvailableCoursesText = styled(C.Text)`
  margin-right: 10px;
  font-size: 22px;
`;
