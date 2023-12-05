import { Layout } from '@/layouts/Layout';
import { Title } from '@/shared/ui/components/BigTitle';
import { WhiteBox } from '@/shared/ui/layouts/WhiteBox';
import { css } from 'styled-components';
import { SearchInListInput } from './ui/SearchInListInput';

export function User() {

  const layoutStyles = css`
    max-width: 1266px;
    padding-top: 68px;
  `;

  const titleStyles = css`
    margin-bottom: 25px;
  `;

  return (
    <Layout styles={layoutStyles}>
      <Title
        title={'Петров Иван'}
        styles={titleStyles} 
      />
      <WhiteBox>
        <SearchInListInput onChange={(value) => console.log(value)}/>
      </WhiteBox>
    </Layout>
  );
}
