import styled from "styled-components";
import * as C from "@/shared/ui/assets/styles/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 15px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.realWhite};
`;

export const EditorOutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`;

export const EditorContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;

  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 400;
  line-height: 170%;
  @media ${(props) => props.theme.media.mobile} {
    margin-bottom: 3.13vw;

    font-size: 4.7vw;
  }
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
`;
