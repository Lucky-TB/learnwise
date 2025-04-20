import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface GradientCardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  className?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  title,
  subtitle,
  icon,
  gradientColors = ['#6366F1', '#818CF8'],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  className = '',
  onPress,
  children,
}) => {
  const { isDark } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderHeader = () => {
    if (!title && !subtitle && !icon) return null;

    return (
      <StyledView className="flex-row items-center p-4">
        {icon && (
          <Ionicons
            name={icon as any}
            size={24}
            color="#FFFFFF"
            className="mr-3"
          />
        )}
        <StyledView className="flex-1">
          {title && (
            <Text className="text-lg font-semibold text-white">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="text-sm text-white/80">
              {subtitle}
            </Text>
          )}
        </StyledView>
      </StyledView>
    );
  };

  const renderContent = () => {
    return (
      <AnimatedLinearGradient
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
        className={`rounded-xl overflow-hidden ${className}`}
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        {renderHeader()}
        <StyledView className="p-4">{children}</StyledView>
      </AnimatedLinearGradient>
    );
  };

  if (onPress) {
    return (
      <StyledTouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {renderContent()}
      </StyledTouchableOpacity>
    );
  }

  return renderContent();
}; 