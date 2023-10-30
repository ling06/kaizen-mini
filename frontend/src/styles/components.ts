import { DEFAULT_WIDTH } from '@/constants';
import styled, { css } from 'styled-components';
import doneIcon from '@assets/images/done.svg';
import accrodionIcon from '@assets/images/accordionIcon.svg';
import { TextStyles } from './base-styles';

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

  &:hover {
    background-color: ${(props) => props.theme.colors.darkBlue};
  }
`;

export const Text = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realBlack};
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 19px 29px;
  border: 1px solid ${(props) => props.theme.colors.greyEO};
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  color: ${(props) => props.theme.colors.realBlack};
  border-radius: ${(props) => props.theme.utils.br};

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

export const ProgressBar = styled(FlexContainer)<IProgressBar>`
  position: relative;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.greyF1};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: ${(props) => props.$progress + '%'};
    height: 100%;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.realBlack};
  }
`;

interface ICourseNavText {
  $active: boolean;
  $isDeleted?: boolean;
}

export const CourseNavText = styled.p<ICourseNavText>`
  font-size: 15px;
  font-weight: 500;
  line-height: 100%;
  color: ${(props) => (props.$active ? props.theme.colors.dark : props.theme.colors.grey93)};
  text-decoration: ${props => props.$isDeleted ? 'line-through' : 'none'};
`;


export const Icon = styled.div`
  display: block;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
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
`;

export const ProgrammCardSkeleton = styled(FlexContainer)`
  width: 310px;
  height: 400px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${props => props.theme.colors.grey93};
  animation: pulse .5s ease-in-out infinite alternate;

  @keyframes pulse {
    100% {
      background-color: ${props => props.theme.colors.greyEO};
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
`;

export const ListItem = styled.li`
  display: list-item;
  ${TextStyles}
  font-weight: 400;
`;
export const EditorImg = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;
