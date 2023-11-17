import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(190, 190, 190, 0.5);
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;

export const Text = styled.p`
  padding: 20px 25px;
  text-align: center;
  font-size: 29.051px;
  font-weight: 400;
  line-height: 100%;
  color: ${(props) => props.theme.colors.realWhite};
  background-color: ${(props) => props.theme.colors.mainBlue};
  transform: rotate(-9.76deg);
`;
