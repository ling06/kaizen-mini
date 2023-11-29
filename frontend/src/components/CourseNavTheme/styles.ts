import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
`;

export const Theme = styled(C.FlexContainer)`
  align-items: center;
  margin-bottom: 30px;
`;

export const Inner = styled(C.FlexContainer)<{$isDeleted: boolean}>`
  width: fit-content;
  opacity: ${props => props.$isDeleted ? .5 : 1};
`;

export const AccSum = styled(C.FlexContainer)`
  align-items: center;
`;

export const OpenAccordion = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0;
  margin-right: 5px;
  background-color: transparent;
`;

export const LessonsList = styled(C.FlexContainer)`
  flex-direction: column;
  min-height: fit-content;
`;
