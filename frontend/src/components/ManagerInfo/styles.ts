import styled from 'styled-components';
import * as C from '@styles/components';
import star from '@assets/images/star.svg';
import activeStar from '@assets/images/active-star.svg';
import moreIcon from '@assets/images/moreIcon.svg';

export const Container = styled(C.FlexContainer)`
  flex-direction: column;
  position: relative;
  width: 49.7%;
  height: 400px;
  padding: 25px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};

  @media ${(props) => props.theme.media.mobile} {
    width: 100%;

    display: none;
  }
`;

export const InfoBlock = styled(C.FlexContainer)`
  flex-direction: column;
  gap: 23px;
  margin-bottom: 40px;
`;

export const InfoRaw = styled(C.FlexContainer)`
  align-items: center;
`;

export const InfoRawTitle = styled(C.Text)`
  min-width: fit-content;
  font-size: 20px;
`;

export const InfoRawDots = styled.div`
  width: 100%;
  height: 13px;
  margin: 0 2%;
  border-bottom: 5px dotted ${(props) => props.theme.colors.greyF1};
`;

export const InfoRawValue = styled(C.Text)`
  min-width: fit-content;
  font-size: 22px;
  @media ${(props) => props.theme.media.mobile} {
    font-size: 5vw;
  }

`;

export const Footer = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
`;

export const YamaguchiLvl = styled(C.FlexContainer)`
  flex-direction: column;
  max-width: 40%;
  row-gap: 8px;
`;

export const YamaguchiLvlTitle = styled(C.Text)`
  font-size: 15px;
`;

export const StarsContainer = styled(C.FlexContainer)`
  align-items: center;
`;

interface IStar {
  $active: boolean;
}

export const Star = styled(C.Icon)<IStar>`
  width: 33px;
  height: 33px;
  background-image: url(${(props) => (props.$active ? activeStar : star)});
`;

export const MoreLink = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  padding: 0 30px;
  border-radius: 22.689px;
  text-decoration: none !important;
  @media ${(props) => props.theme.media.mobile} {
    padding:  0 10px;
  }
`;

export const MoreIcon = styled(C.Icon)`
  margin-left: 13px;
  background-image: url(${moreIcon});
`;
