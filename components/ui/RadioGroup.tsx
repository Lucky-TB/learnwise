import React from 'react';
import { View } from 'react-native';
import { Radio } from './Radio';
import { styled } from 'nativewind';

const StyledView = styled(View);

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  variant = 'primary',
  size = 'medium',
  className = '',
  layout = 'vertical',
}) => {
  const handleChange = (optionValue: string) => {
    onChange?.(optionValue);
  };

  return (
    <StyledView
      className={`${
        layout === 'vertical' ? 'space-y-2' : 'flex-row space-x-4'
      } ${className}`}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          value={value === option.value}
          onChange={() => handleChange(option.value)}
          disabled={option.disabled}
          variant={variant}
          size={size}
          label={option.label}
        />
      ))}
    </StyledView>
  );
}; 