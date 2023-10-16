import styled from "styled-components";

export const CounterHeader = styled.p`
  display: flex;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.yRed};

  font-family: "Montserrat";
  font-size: 14.537px;
  font-weight: 700;
  line-height: 120%;
  color: #fff;
`;
