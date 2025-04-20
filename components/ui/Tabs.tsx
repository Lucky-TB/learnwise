import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface Tab {
  key: string;
  title: string;
  icon?: string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'primary',
  size = 'medium',
  className = '',
  layout = 'horizontal',
}) => {
  const { isDark } = useTheme();
  const indicatorPosition = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.key === activeTab);
    if (activeIndex !== -1) {
      Animated.spring(indicatorPosition, {
        toValue: activeIndex,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTab]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary-500';
      case 'secondary':
        return 'border-secondary-500';
      case 'success':
        return 'border-success-500';
      case 'error':
        return 'border-error-500';
      case 'warning':
        return 'border-warning-500';
      case 'info':
        return 'border-info-500';
      default:
        return 'border-primary-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-8';
      case 'medium':
        return 'h-10';
      case 'large':
        return 'h-12';
      default:
        return 'h-10';
    }
  };

  const baseClasses = 'border-b-2';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const tabsClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <StyledView
      className={`${
        layout === 'vertical' ? 'flex-col' : 'flex-row'
      } ${tabsClasses}`}
    >
      {tabs.map((tab, index) => (
        <StyledTouchableOpacity
          key={tab.key}
          onPress={() => !tab.disabled && onChange(tab.key)}
          disabled={tab.disabled}
          activeOpacity={0.7}
          className={`flex-1 items-center justify-center ${
            layout === 'vertical' ? 'py-2' : 'px-4'
          }`}
        >
          <Text
            variant="body"
            color={tab.disabled ? 'gray' : activeTab === tab.key ? variant : 'text'}
            className={tab.disabled ? 'opacity-50' : ''}
          >
            {tab.title}
          </Text>
          {activeTab === tab.key && (
            <Animated.View
              className={`absolute ${
                layout === 'vertical' ? 'left-0 w-1 h-full' : 'bottom-0 w-full h-1'
              } bg-${variant}-500`}
              style={{
                transform: [
                  {
                    translateX: layout === 'vertical'
                      ? 0
                      : indicatorPosition.interpolate({
                          inputRange: [0, tabs.length - 1],
                          outputRange: [0, (tabs.length - 1) * 100],
                        }),
                  },
                  {
                    translateY: layout === 'vertical'
                      ? indicatorPosition.interpolate({
                          inputRange: [0, tabs.length - 1],
                          outputRange: [0, (tabs.length - 1) * 100],
                        })
                      : 0,
                  },
                ],
              }}
            />
          )}
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
}; 