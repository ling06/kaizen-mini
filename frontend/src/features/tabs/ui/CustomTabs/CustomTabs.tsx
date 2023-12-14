import { useEffect, useState } from 'react';
import { CustomTab } from '../CustomTab';
import { CustomTabList } from '../CustomTabList';
import * as S from './styles';
import { Tab, Tabs, TabPanel, TabList } from 'react-tabs';
import { useSearchParams } from 'react-router-dom';

interface ITabName {
  name: string;
  id: string;
  queryParam: string;
}

interface ITabPanel {
  element: React.ReactNode;
  id: string;
}

interface ICustomTabsProps {
  tabNames: Array<ITabName>;
  tabPanels: Array<ITabPanel>;
}

/**
 * Renders a custom tabs component.
 *
 * @param {ICustomTabsProps} tabNames - An array of tab names.
 * @param {ICustomTabsProps} tabPanels - An array of tab panels.
 */
export function CustomTabs({ tabNames, tabPanels }: ICustomTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const activeTabQueryParam = searchParams.get('tab');
    if (activeTabQueryParam) {
      const activeTab = tabNames.find((tab) => tab.queryParam === activeTabQueryParam);
      if (activeTab) {
        setSelectedIndex(tabNames.indexOf(activeTab));
      }
      return;
    }

    setSearchParams({ tab: tabNames[0].queryParam });
  }, [searchParams, setSearchParams, tabNames]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setSearchParams({ tab: tabNames[index].queryParam });
  };

  return (
    <Tabs onSelect={handleSelect}>
      <S.Container>
        <TabList>
          <CustomTabList>
            {tabNames.map((tabName, index) => (
              <Tab key={tabName.id}>
                <CustomTab
                  name={tabName.name}
                  isActive={selectedIndex === index}
                />
              </Tab>
            ))}
          </CustomTabList>
        </TabList>
        <S.TabPanelsWrapper>
          {tabPanels.map((tabPanel) => (
            <TabPanel key={tabPanel.id}>{tabPanel.element}</TabPanel>
          ))}
        </S.TabPanelsWrapper>
      </S.Container>
    </Tabs>
  );
}
