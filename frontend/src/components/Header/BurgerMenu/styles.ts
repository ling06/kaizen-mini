import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.utils.zIndex.burgerMenu};
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.realWhite};
  overflow-y: auto;
`;
