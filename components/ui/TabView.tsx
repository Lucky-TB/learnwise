import React from 'react';
import { View } from 'react-native';
import { Tabs, Tab } from './Tabs';
import { TabPanel } from './TabPanel';
import { styled } from 'nativewind';

const StyledView = styled(View);

export interface TabViewProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  layout?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export const TabView: React.FC<TabViewProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'primary',
  size = 'medium',
  className = '',
  layout = 'horizontal',
  children,
}) => {
  return (
    <StyledView className={className}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={onChange}
        variant={variant}
        size={size}
        layout={layout}
      />
      <TabPanel>
        {children}
      </TabPanel>
    </StyledView>
  );
}; 