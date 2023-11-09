import styled from 'styled-components';
import * as C from '@styles/components';
import addicon from '@assets/images/add-grey.svg';

export const MainContainer = styled.div`
  position: absolute;
  top: -100%;
  left: 0;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.utils.zIndex.darkOverlay};
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${(props) => props.theme.utils.zIndex.overDarkOverlay};
  width: fit-content;
  min-width: 465px;
  border: 3px solid ${(props) => props.theme.colors.realBlack};
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
`;

export const Categories = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
`;

export const Category = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.greyF1};
  }
`;

export const CategoryName = styled.p`
  font-size: 24.923px;
  font-weight: 500;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realBlack};
`;

export const BtnsGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const AddBtn = styled(C.DefaultBtn)`
  @media ${(props) => props.theme.media.desktop} {
    display: flex;
    align-items: center;
    min-height: unset;
    font-size: 24.923px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.grey93};
    background-color: transparent;
  }
`;

export const addIcon = styled(C.Icon)`
  margin-right: 13px;
  background-image: url(${addicon});
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;
