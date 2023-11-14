import styled from 'styled-components';
import * as C from '@styles/components';

export const Container = styled.div`
    font-style: normal;
    font-weight: 400;
    margin-bottom: 20px;
    .table{
        width: 100%;
    }
    td{
        padding: 5px 0;
    }
    ol{
        margin: 49px 0;
        list-style: auto;
        list-style-position: inside;
        &:last-of-type{
            margin-bottom: 0px;
        }
    }
    ul{
        margin: 49px 0;
        list-style: auto;
        list-style-position: inside;
        &:last-of-type{
            margin-bottom: 0px;
        }
    }
`;