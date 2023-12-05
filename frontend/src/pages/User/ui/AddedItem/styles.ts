import styled from 'styled-components';
import closeIcon from '@assets/images/white-close-icon.svg';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 10px 10px 10px 18px;
  border-radius: ${(props) => props.theme.utils.br};
  background-color: ${(props) => props.theme.colors.dark};

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Text = styled.p`
  margin-right: 3px;
  font-size: 18px;
  font-weight: 600;
  line-height: 100%;
  color: ${(props) => props.theme.colors.realWhite};
`;

export const CloseBtn = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  margin: 0;
  background-color: transparent;
  background-image: url(${closeIcon});
  background-repeat: no-repeat;
  background-position: center;
`;
