import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 15px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const EditorOutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
