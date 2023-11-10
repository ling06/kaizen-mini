import styled from 'styled-components';
import * as C from '@styles/components';

export const Title = styled(C.Text)`
  margin-bottom: 20px;
  font-size: 92.5px;
`;


export const CompetitionNameInput = styled(C.InputWithState)`
  margin-bottom: 15px;
`;

export const EditorJsWrapper = styled.div`
  width: 100%;
  min-height: 472px;
  padding: 25px;
  padding-left: 75px;
  margin-bottom: 25px;
  border: 1px solid ${props => props.theme.colors.greyEO};
  border-radius: ${props => props.theme.utils.br};
`;

export const TestWrapper = styled.div`
margin-bottom: 60px;
`;

export const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 100vw;
    height: 100%;
    background-color: ${props => props.theme.colors.greyF1};
    transform: translateX(-50%);
  }
`;

export const OpenSelectWrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
`; 
