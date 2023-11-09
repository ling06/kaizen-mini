import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Date = styled.p`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 149.5%;
  color: ${(props) => props.theme.colors.grey93};
`;

export const Author = styled(Date)``;
