import styled from "styled-components";
import * as C from "@/shared/ui/assets/styles/components";

export const NoAvailableCourses = styled(C.FlexContainer)`
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: ${(props) => props.theme.colors.realWhite};
  border-radius: ${(props) => props.theme.utils.br};
  @media ${(props) => props.theme.media.mobile} {
    min-height: unset;
    height: 43.75vw;
  }
`;

export const NoAvailableCoursesText = styled(C.Text)`
  margin-right: 10px;
  font-size: 22px;
  @media ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin: 0;
    text-align: center;

    font-size: 6.08vw;
  }
`;
