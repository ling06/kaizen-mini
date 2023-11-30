import styled from "styled-components";
import * as C from "@styles/components";
import imgNotFoundDes from "@assets/images/img-404.webp";
import imgNotFoundMob from "@assets/images/img-404-mob.webp";

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 145px 0 0;
  @media ${(props) => props.theme.media.mobile} {
    padding: 40vw 0 29.1vw;
  }
`;

export const ImgContainer = styled.div`
  width: 976px;
  height: 346px;
  margin-bottom: 56px;
  background-image: url(${imgNotFoundDes});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  @media ${(props) => props.theme.media.mobile} {
    width: 100vw;
    height: 55vw;
    margin-bottom: 4.4vw;

    background-image: url(${imgNotFoundMob});
  }
`;

export const NotFoundText = styled(C.Text)`
  width: 518px;
  margin-bottom: 75px;

  text-align: center;
  color: ${(props) => props.theme.colors.dark};
  font-size: 25px;
  font-weight: 700;
  line-height: 120%;
  @media ${(props) => props.theme.media.mobile} {
    width: 95%;

    margin-bottom: 6.3vw;

    font-size: 5vw;
  }
`;

export const BtnUpdate = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 183px;
  min-height: 60px;

  color: ${(props) => props.theme.colors.realWhite};
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;

  @media ${(props) => props.theme.media.mobile} {
    width: 95%;
    min-height: 12.5vw;

    font-size: 4.7vw;
  }
`;
