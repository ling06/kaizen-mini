import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled.div`
  font-style: normal;
  font-weight: 400;
  margin-bottom: 20px;
  .table {
    width: 100%;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol {
    margin-bottom: 20px;
  }

  li {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  td {
    padding: 5px 0;
  }
  ol {
    list-style: inside;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  ul {
    list-style: inside;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`;
