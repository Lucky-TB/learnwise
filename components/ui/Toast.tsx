import React, { useEffect, useRef } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  visible: boolean;
}

const getToastColor = (type: ToastType, theme: any) => {
  switch (type) {
    case 'success':
      return theme.colors.success.DEFAULT;
    case 'error':
      return theme.colors.error.DEFAULT;
    case 'warning':
      return theme.colors.warning.DEFAULT;
    case 'info':
    default:
      return theme.colors.info.DEFAULT;
  }
};

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'checkmark-circle';
    case 'error':
      return 'alert-circle';
    case 'warning':
      return 'warning';
    case 'info':
    default:
      return 'information-circle';
  }
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  visible,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const isDark = theme.dark;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onClose?.();
      });
    }
  }, [visible, duration]);

  if (!visible) return null;

  const toastColor = getToastColor(type, theme);
  const iconName = getToastIcon(type);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          backgroundColor: isDark ? theme.colors.surface.dark : theme.colors.surface.DEFAULT,
          borderColor: toastColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={iconName} size={24} color={toastColor} style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons
          name="close"
          size={20}
          color={isDark ? theme.colors.text.dark : theme.colors.text.DEFAULT}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
}); 