import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 50px;
  width: 100%;
  position: relative;
  margin-bottom: 30px;
`;

export const Divider = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100vw;
  max-width: 1266px;
  height: 1px;
  background-color: ${(props) => props.theme.colors.greyF1};
  transform: translateX(-50%);
`;
