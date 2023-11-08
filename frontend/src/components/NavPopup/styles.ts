import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.utils.zIndex.overDarkOverlay};
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding: 3.125vw; 
  background-color: ${props => props.theme.colors.realWhite};
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 3.125vw;
`;

export const NavListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 7.5vw;
`;
