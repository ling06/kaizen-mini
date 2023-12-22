import styled from 'styled-components';

export const Container = styled.div<{ $isAvatar: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  position: relative;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.greyF1};
  overflow: hidden;
  @media ${(props) => props.theme.media.mobile} {
    width: 8.75vw;
    height: 8.75vw;
  }
`;

export const Initials = styled.p`
  width: fit-content;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 148%;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.mainBlue};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 3.125vw;
  }
`;

export const Avatar = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: 50% 25%;
`;
