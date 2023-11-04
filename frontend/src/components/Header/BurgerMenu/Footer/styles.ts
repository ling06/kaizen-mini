import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3.125% 2.1875vw;
  margin-top: auto;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Logo = styled.img`
  display: block;
  width: 20.25vw;
`;

export const Copyright = styled.p`
  color: ${(props) => props.theme.colors.dark};
  font-size: 3.125vw;
  font-weight: 400;
  line-height: 148%;
`;
