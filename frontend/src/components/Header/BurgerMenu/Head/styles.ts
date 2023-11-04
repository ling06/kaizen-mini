import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 3.125%;
  margin-bottom: 5%;
  border-bottom: 1px solid ${props => props.theme.colors.greyF1};
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 3vw;
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.p`
  font-size: 3.75vw;
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
`;

export const Surname = styled(Name)``;
