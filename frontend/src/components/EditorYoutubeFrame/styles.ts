import styled from 'styled-components';


export const Container = styled.div`
  margin-bottom: 30px;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 6.25vw;
  }
`;

export const YoutubeFrame = styled.iframe`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: ${(props) => props.theme.utils.br};
  @media ${(props) => props.theme.media.mobile} {
    border-radius: 0;
  }
`;
