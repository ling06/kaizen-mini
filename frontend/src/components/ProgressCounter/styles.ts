import styled from "styled-components";

interface IProgressContainer {
    $isStart: boolean;
}

export const ProgressContainer = styled.h4<IProgressContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  height: 36px;
  border-radius: 18px;
  background-color: ${props => props.$isStart ? props.theme.colors.mainBlue : props.theme.colors.dark};
  margin-right: 20px;

  color: #fff;
  font-family: "Montserrat";
  font-size: 24.923px;
  font-weight: 700;
  line-height: 120%;
`;
