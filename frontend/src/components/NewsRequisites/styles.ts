import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media ${(props) => props.theme.media.mobile} {
    justify-content: flex-start;
  }
`;

export const Date = styled.p`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.grey93};
  @media ${(props) => props.theme.media.mobile} {
    margin-right: 6.25vw;
    font-size: 3.75vw;
  }
`;

export const Author = styled(Date)``;
