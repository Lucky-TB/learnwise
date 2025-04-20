import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);

export interface AnimatedIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  onPress?: () => void;
  badge?: number;
  badgeColor?: string;
  animation?: 'bounce' | 'pulse' | 'rotate' | 'none';
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  name,
  size = 24,
  color = '#000000',
  className = '',
  onPress,
  badge,
  badgeColor = '#EF4444',
  animation = 'none',
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (animation === 'bounce' || animation === 'pulse') {
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animation === 'bounce' || animation === 'pulse') {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  React.useEffect(() => {
    if (animation === 'rotate') {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [animation]);

  const getTransform = () => {
    const transforms = [];

    if (animation === 'bounce' || animation === 'pulse') {
      transforms.push({ scale: scaleAnim });
    }

    if (animation === 'rotate') {
      transforms.push({
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      });
    }

    return transforms;
  };

  const renderIcon = () => {
    return (
      <Animated.View
        style={{
          transform: getTransform(),
        }}
      >
        <Ionicons name={name as any} size={size} color={color} />
      </Animated.View>
    );
  };

  const renderBadge = () => {
    if (!badge) return null;

    return (
      <Animated.View
        className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center"
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Text className="text-xs text-white font-bold px-1">
          {badge > 99 ? '99+' : badge}
        </Text>
      </Animated.View>
    );
  };

  if (onPress) {
    return (
      <StyledTouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        className={`relative ${className}`}
      >
        {renderIcon()}
        {renderBadge()}
      </StyledTouchableOpacity>
    );
  }

  return (
    <StyledView className={`relative ${className}`}>
      {renderIcon()}
      {renderBadge()}
    </StyledView>
  );
}; 