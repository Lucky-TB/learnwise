import React from 'react';
import { View, TouchableOpacity, Modal, Animated } from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  onChange,
  error,
  disabled = false,
  className = '',
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;
    setIsOpen(true);
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    setIsOpen(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    handleClose();
  };

  const selectedOption = options.find(option => option.value === value);

  const getBorderColor = () => {
    if (error) return 'border-error-500';
    if (isOpen) return 'border-primary-500';
    if (disabled) return 'border-gray-300 dark:border-gray-600';
    return 'border-gray-300 dark:border-gray-600';
  };

  const getBackgroundColor = () => {
    if (disabled) return 'bg-gray-100 dark:bg-gray-800';
    return 'bg-white dark:bg-gray-900';
  };

  const baseClasses = 'rounded-lg border px-4 py-3 flex-row items-center justify-between';
  const borderClasses = getBorderColor();
  const bgClasses = getBackgroundColor();

  const selectClasses = `${baseClasses} ${borderClasses} ${bgClasses} ${className}`;

  return (
    <StyledView className="w-full">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <StyledTouchableOpacity
          className={selectClasses}
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text
            className={`flex-1 ${
              selectedOption
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </StyledTouchableOpacity>
      </Animated.View>
      {error && (
        <Text className="mt-1 text-sm text-error-500">{error}</Text>
      )}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <StyledTouchableOpacity
          className="flex-1 bg-black/50"
          onPress={handleClose}
          activeOpacity={1}
        >
          <StyledView className="flex-1 justify-end">
            <StyledView className="bg-white dark:bg-gray-900 rounded-t-xl overflow-hidden">
              <StyledView className="p-4 border-b border-gray-200 dark:border-gray-700">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  {label || 'Select an option'}
                </Text>
              </StyledView>
              <StyledView className="max-h-80">
                {options.map((option) => (
                  <StyledTouchableOpacity
                    key={option.value}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                      option.value === value
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : ''
                    }`}
                    onPress={() => handleSelect(option.value)}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`${
                        option.value === value
                          ? 'text-primary-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledTouchableOpacity>
      </Modal>
    </StyledView>
  );
}; 