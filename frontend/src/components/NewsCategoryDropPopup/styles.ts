import styled from 'styled-components';
import dropMenuIcon from "@assets/images/caret-up-mob-news.svg";
import * as C from "@/shared/ui/assets/styles/components";

export const dropMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 4.38vw;
`;

export const dropMenuImg = styled(C.Icon)`
  background-image: url(${dropMenuIcon});
`;

export const filterPopup = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  row-gap: 2vw;
  width: 90%;
  left: 50%;
  top: 100%;
  padding: 4.38vw 3.13vw;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: ${(props) => props.theme.utils.br};
  z-index: 222;
`;

export const titleFilter = styled.p`
  color: ${(props) => props.theme.colors.mainBlue};
  font-family: "Montserrat";
  font-size: 4.7vw;
  font-weight: 700;
  line-height: 149.5%;
`;
