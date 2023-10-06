import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const LessonName = styled(C.CourseNavText)``;
