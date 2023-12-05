import styled from "styled-components";
import * as C from "@/shared/ui/assets/styles/components";
import backIcon from "@assets/images/arrow-left-blue.svg";
import backIconMob from "@/assets/images/angle-right-mob.svg";

export const Button = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: transparent;
  padding: 0;
  margin: 0;
  margin-bottom: 18px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 5vw;
  }
`;

export const Icon = styled(C.Icon)`
  margin-right: 8px;
  background-image: url(${backIcon});
  @media ${(props) => props.theme.media.mobile} {
    background-image: url(${backIconMob});
    margin-right: 2.81vw;
  }
`;

export const Text = styled.span`
  font-size: 22px;
  font-weight: 500;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.mainBlue};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 3.75vw;
    font-weight: 700;
  }
`;
