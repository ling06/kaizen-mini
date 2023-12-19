import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding-bottom: 35px;
  margin-bottom: 25px;
`;

export const Divider = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  max-width: 1266px;
  height: 1px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.colors.greyF1};
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 75px;
`;
