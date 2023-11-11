import styled from 'styled-components';
import * as C from '@styles/components';
import externalLinkIcon from '@assets/images/external-link.svg';

export const BottomContainer = styled(C.FlexContainer)`
  align-items: center;
  justify-content: space-between;
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
`;

export const LinkIcon = styled(C.Icon)`
  margin-left: 10px;
  background-image: url(${externalLinkIcon});
`;
