import styled from 'styled-components';

export const Title = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  color: ${(props) => props.theme.colors.grey93};

  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 3.125vw;
    font-size: 3.75vw;
  }
`;
