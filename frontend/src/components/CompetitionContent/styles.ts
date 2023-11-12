import styled from 'styled-components';
import * as C from '@styles/components';
import externalLinkIcon from '@assets/images/external-link.svg';

export const BottomContainer = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
  @media ${(props) => props.theme.media.mobile} {
    flex-direction: column-reverse;
    align-items: flex-start;
    row-gap: 9.375vw;
  }
`;

export const EditorOutputContainer = styled(C.FlexContainer)`
  flex-direction: column;
  margin-bottom: 50px;
`;

export const Link = styled(C.DefaultBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 44px;
  padding: 0 20px 0 23px;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    min-height: 12.5vw;
  }
`;

export const LinkIcon = styled(C.Icon)`
  margin-left: 10px;
  background-image: url(${externalLinkIcon});
`;
