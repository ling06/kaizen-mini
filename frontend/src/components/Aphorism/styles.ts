import styled from 'styled-components';


export const Container = styled.div`
  display: none;
  @media ${(props) => props.theme.media.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 18.75vw;
  }
`;

export const Title = styled.h3`
  margin-bottom: 3.125vw;
  font-size: 3.125vw;
  font-weight: 700;
  line-height: 148%;
  color: ${(props) => props.theme.colors.grey93};
  text-align: center;
`;

export const Aphorism = styled.p`
  margin-bottom: 9.375vw;
  font-size: 3.75vw;
  font-weight: 500;
  line-height: 148%;
  color: ${props => props.theme.colors.realBlack};
  text-align: center;
`;

export const Author = styled(Aphorism)`
  margin-bottom: 0;
  font-weight: 400;
`;
