import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  flex-direction: column;
  padding: 0 3.125%;
  margin-bottom: 5%;
  @media ${props => props.theme.media.mobile} {
    display: flex;
  }
`;
