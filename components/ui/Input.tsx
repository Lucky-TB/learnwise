import React from 'react';
import { TextInput, View, Animated } from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  icon,
  secureTextEntry,
  multiline,
  numberOfLines,
  className = '',
  inputClassName = '',
  disabled = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  returnKeyType = 'done',
  onSubmitEditing,
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getBorderColor = () => {
    if (error) return 'border-error-500';
    if (isFocused) return 'border-primary-500';
    if (disabled) return 'border-gray-300 dark:border-gray-600';
    return 'border-gray-300 dark:border-gray-600';
  };

  const getBackgroundColor = () => {
    if (disabled) return 'bg-gray-100 dark:bg-gray-800';
    return 'bg-white dark:bg-gray-900';
  };

  const baseClasses = 'rounded-lg border px-4 py-3';
  const borderClasses = getBorderColor();
  const bgClasses = getBackgroundColor();
  const inputClasses = `${baseClasses} ${borderClasses} ${bgClasses} ${inputClassName}`;

  return (
    <StyledView className={`w-full ${className}`}>
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
        <StyledView className="relative">
          {icon && (
            <StyledView className="absolute left-4 top-1/2 -translate-y-1/2">
              <Ionicons
                name={icon as any}
                size={20}
                color={isDark ? '#9CA3AF' : '#6B7280'}
              />
            </StyledView>
          )}
          <StyledTextInput
            className={`${inputClasses} ${icon ? 'pl-12' : ''}`}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={!disabled}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </StyledView>
      </Animated.View>
      {error && (
        <Text className="mt-1 text-sm text-error-500">{error}</Text>
      )}
    </StyledView>
  );
}; 