import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
`;

export const Theme = styled(C.FlexContainer)`
  align-items: center;
  margin-bottom: 30px;
`;

export const OpenAccordion = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0;
  margin-right: 5px;
  background-color: transparent;
`;

interface IAccordionWrapper {
  $active: boolean;
  $height: string;
}

export const AccordionWrapper = styled.div<IAccordionWrapper>`
  width: 83%;
  height: 0px;
  overflow: hidden;
  margin-left: auto;
  transition: all 0.2s ease-in-out;
  animation: ${props => props.$active ? 'openAccordion' : 'closeAccrodion'} .2s ease-out forwards;

  @keyframes openAccordion {
    99% {
      height: ${props => props.$height};
      overflow: hidden;
    }
    100% {
      height: ${props => props.$height};
      overflow: visible;
    }
  }

  @keyframes closeAccrodion {
    0% {
      height: ${props => props.$height};
      overflow: hidden;
    }
    100% {
      height: 0px;
      overflow: hidden;
    }
  }
`;


export const LessonsList = styled(C.FlexContainer)`
  flex-direction: column;
  min-height: fit-content;
`;
