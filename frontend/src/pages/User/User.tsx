import { Layout } from '@/layouts/Layout';
import { useTypedSelector } from '@/shared/hooks/useTypedSelector';
import { Title } from '@/shared/ui/Title';
import { WhiteBox } from '@/shared/ui/layouts/WhiteBox';
import { css } from 'styled-components';

export function User() {
  const accesses = useTypedSelector((state) => state.accesses);

  const layoutStyles = css`
    max-width: 1266px;
    padding-top: 68px;
  `;

  const titleStyles = css`
    margin-bottom: 25px;
  `;

  const renderAccesses = () => {
    return accesses.map((access) => {
      if (access.sub.length > 0) {
        return (
          <>
            <div>{access.type}</div>
            <div>
              {access.sub.map((sub) => {
                return <div>{sub.type}</div>;
              })}
            </div>
          </>
        );
      }
      return (
        <div>
          <div>{access.type}</div>
        </div>
      );
    });
  };

  return (
    <Layout styles={layoutStyles}>
      <Title
        title={'Петров Иван'}
        styles={titleStyles}
      />
      <WhiteBox>{renderAccesses()}</WhiteBox>
    </Layout>
  );
}
