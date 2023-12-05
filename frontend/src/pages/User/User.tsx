import { Layout } from '@/layouts/Layout';
import { useTypedSelector } from '@/shared/lib/hooks/useTypedSelector';
import { Title } from '@/shared/ui/BigTitle';
import { WhiteBox } from '@/shared/ui/layouts/WhiteBox';
import { css } from 'styled-components';
import { SearchInListInput } from './ui/SearchInListInput';
// import { AddedItem } from './ui/AddedItem';

export function User() {
  const accesses = useTypedSelector((state) => state.accesses);

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
        <SearchInListInput />
      </WhiteBox>
    </Layout>
  );
}
