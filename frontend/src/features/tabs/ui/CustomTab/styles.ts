import styled from 'styled-components';

export const Tab = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding-bottom: 20px;
  color: ${(props) => (props.$isActive ? props.theme.colors.mainBlue : props.theme.colors.grey93)};
  font-size: 15px;
  font-weight: 700;
  line-height: 120%;
  cursor: pointer;
`;

export const UnderLine = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.$isActive ? '6px' : '0px'};
  background-color: ${(props) => props.theme.colors.mainBlue};
  transition: height .2s linear;
`;
