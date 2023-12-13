import { Layout, WhiteBox } from '@/shared/ui/layouts';
import { Title } from '@/shared/ui/components';
import { css } from 'styled-components';
import { CustomTabs } from '@/feature/tabs';
import { nanoid } from '@reduxjs/toolkit';

const tabs = [
  { name: 'Обучение', queryParam: 'education' },
  { name: 'Права доступа', queryParam: 'access' },
].map((tab) => {
  return {
    ...tab,
    id: nanoid(),
  };
});
const panels = [{ element: <div>Обучение</div> }, { element: <div>Права доступа</div> }].map(
  (panel) => {
    return {
      ...panel,
      id: nanoid(),
    };
  }
);
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
        <CustomTabs
          tabNames={tabs}
          tabPanels={panels}
        />
      </WhiteBox>
    </Layout>
  );
}
