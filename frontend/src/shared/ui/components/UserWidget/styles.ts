import styled from 'styled-components';
// import * as C from '@/shared/ui/assets/styles/components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.mainBlue};
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;
  right: 0;
  @media ${(props) => props.theme.media.mobile} {
  }
`;