import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 75%;
  min-height: 200px;
  padding: 15px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;
