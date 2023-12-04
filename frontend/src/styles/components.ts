import { DEFAULT_WIDTH } from '@/shared/constants';
import styled, { css } from 'styled-components';
import doneIcon from '@assets/images/done.svg';
import accrodionIcon from '@assets/images/accordionIcon.svg';
import { TextStyles } from './base-styles';

export const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface IBackDropBlurredProps {
  $maxWidth: string;
  $blurValue: string;
}

export const BackDropBlurred = styled.div<IBackDropBlurredProps>`
  width: 100%;
  max-width: ${(props) => props.$maxWidth};
  height: 100%;
  backdrop-filter: blur(${(props) => props.$blurValue});
`;

export const DefaultBtn = styled.button`
  min-height: 60px;
  padding: 0 3%;
  font-size: 18px;
  font-weight: 700;
  line-height: 100%;
  color: ${(props) => props.theme.colors.realWhite};
  background-color: ${(props) => props.theme.colors.mainBlue};
  border-radius: ${(props) => props.theme.utils.br};
  transition: ${(props) => props.theme.utils.transition};
  @media ${(props) => props.theme.media.mobile} {
    font-size: 4.6875vw;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.darkBlue};
  }
`;

export const EditorTabel = styled.table``;

export const Text = styled.p<{ $isDeleted?: boolean }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realBlack};
  text-decoration: ${(props) => (props.$isDeleted ? 'line-through' : 'none')};

  @media ${(props) => props.theme.media.mobile} {
    font-size: 5.625vw;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 60px;
  padding: 19px 29px;
  border: 1px solid ${(props) => props.theme.colors.greyEO};
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realBlack};
  border-radius: ${(props) => props.theme.utils.br};
  @media ${(props) => props.theme.media.mobile} {
    min-height: 12.5vw;
    padding: 4.0625vw 5.3125vw;
    font-size: 3.75vw;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey93};
  }

  &:focus {
    color: ${(props) => props.theme.colors.realBlack};
    background-color: transparent;
  }
`;

export const SvgIcon = styled.svg.attrs({
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
})`
  path {
    transition: ${(props) => props.theme.utils.transition};
  }
`;

interface IInputWithStateProps {
  $isChanged?: boolean;
  $isValid?: boolean;
}

export const InputWithState = styled(Input)<IInputWithStateProps>`
  ${(props) => {
    if (props.$isChanged && props.$isValid) {
      return css`
        color: ${props.theme.colors.grey93};
        background-color: ${props.theme.colors.greyF1};
      `;
    } else if (props.$isChanged) {
      return css`
        border-color: ${props.theme.colors.yRed};
      `;
    }
  }}
`;

export const UnderlineBtn = styled.button`
  font-size: 18px;
  font-weight: 400;
  line-height: 120%;
  color: ${(props) => props.theme.colors.mainBlue};
  text-decoration: underline;
  background-color: transparent;
  transition: ${(props) => props.theme.utils.transition};

  &:hover {
    text-decoration: unset;
    color: ${(props) => props.theme.colors.darkBlue};
  }
`;

export const DefaultContainer = styled.div`
  width: 100%;
  max-width: ${DEFAULT_WIDTH};
  margin: 0 auto;
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
`;

interface IProgressBar {
  $progress: string;
}

export const ProgressBar = styled.div<IProgressBar>`
  display: flex;
  width: 100%;
  position: relative;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.greyF1};
  @media ${(props) => props.theme.media.mobile} {
    height: 1.5625vw;
    border-radius: 2.532px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: ${(props) => props.$progress + '%'};
    height: 100%;
    border-radius: inherit;
    background-color: ${(props) => props.theme.colors.realBlack};
    transition: width 0.2s linear;
  }
`;

export const Icon = styled.div`
  display: block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  @media ${(props) => props.theme.media.mobile} {
    width: 7.5vw;
    height: 7.5vw;
  }
`;

export const DoneIcon = styled(Icon)`
  margin-right: 26px;
  /* margin-left: auto; */
  background-image: url(${doneIcon});
`;

interface IAccordionIcon {
  $active: boolean;
}

export const AccordionIcon = styled(Icon)<IAccordionIcon>`
  display: block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  transition: ${(props) => props.theme.utils.transition};
  transform: ${(props) => (props.$active ? 'rotate(-180deg)' : 'none')};
  background-image: url(${accrodionIcon});
`;

export const EditorParagraph = styled(Text)`
  margin-bottom: 30px;
  font-weight: 400;
  line-height: 150%;
  @media ${(props) => props.theme.media.mobile} {
    font-size: 4.6875vw;
    padding: 0 3.125vw;
    margin-bottom: 10%;
  }
`;

export const ProgrammCardSkeleton = styled(FlexContainer)`
  width: 310px;
  height: 400px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.grey93};
  animation: pulse 0.5s ease-in-out infinite alternate;

  @keyframes pulse {
    100% {
      background-color: ${(props) => props.theme.colors.greyEO};
    }
  }
`;

export const OrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  list-style: decimal inside;
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  list-style: disc inside;
  @media ${(props) => props.theme.media.mobile} {
    gap: 6.25vw;
    padding: 0 3.125vw;
    margin-bottom: 10%;
  }
`;

export const ListItem = styled.li`
  display: list-item;
  ${TextStyles}
  font-weight: 400;
  @media ${(props) => props.theme.media.mobile} {
    font-size: 4.6875vw;
  }
`;
export const EditorImg = styled.img`
  width: 100%;
  margin-bottom: 30px;
  border-radius: ${(props) => props.theme.utils.br};
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 10%;
    border-radius: unset;
  }
`;

export const FlexColumn = styled(FlexContainer)`
  flex-direction: column;
`;
