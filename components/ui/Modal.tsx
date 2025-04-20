import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, Animated } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  const { isDark } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return isDark ? 'bg-surface-dark-elevated' : 'bg-surface-elevated';
      case 'outlined':
        return 'bg-transparent border border-gray-200 dark:border-gray-700';
      case 'glass':
        return isDark 
          ? 'bg-gray-900/70 backdrop-blur-md' 
          : 'bg-white/70 backdrop-blur-md';
      default:
        return isDark ? 'bg-surface-dark' : 'bg-surface';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-80';
      case 'medium':
        return 'w-96';
      case 'large':
        return 'w-[32rem]';
      default:
        return 'w-96';
    }
  };

  const baseClasses = 'rounded-lg overflow-hidden';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const modalClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <StyledTouchableOpacity
        className="flex-1 bg-black/50 items-center justify-center"
        onPress={onClose}
        activeOpacity={1}
      >
        <Animated.View
          className={modalClasses}
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          {title && (
            <StyledView className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </Text>
            </StyledView>
          )}
          <StyledView className="p-4">{children}</StyledView>
        </Animated.View>
      </StyledTouchableOpacity>
    </RNModal>
  );
}; 