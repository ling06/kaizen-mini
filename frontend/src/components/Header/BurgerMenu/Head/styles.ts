import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 3.125% 2.19%;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8%;
`;

export const Name = styled.p`
  font-size: 3.75vw;
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
`;

export const Surname = styled(Name)``;
