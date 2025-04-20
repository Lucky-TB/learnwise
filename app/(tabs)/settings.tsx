import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Button, Text, Surface, Switch, Divider } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../../constants/theme';
import { useApiKey } from '../../context/ApiKeyContext';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  HIGH_CONTRAST: '@settings_high_contrast',
  TEXT_SIZE: '@settings_text_size',
  TEXT_TO_SPEECH: '@settings_text_to_speech',
};

export default function SettingsScreen() {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(1.0);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const { apiKey } = useApiKey();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [highContrastValue, textSizeValue, textToSpeechValue] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HIGH_CONTRAST),
        AsyncStorage.getItem(STORAGE_KEYS.TEXT_SIZE),
        AsyncStorage.getItem(STORAGE_KEYS.TEXT_TO_SPEECH),
      ]);

      if (highContrastValue !== null) {
        setHighContrast(JSON.parse(highContrastValue));
      }
      if (textSizeValue !== null) {
        setTextSize(JSON.parse(textSizeValue));
      }
      if (textToSpeechValue !== null) {
        setTextToSpeech(JSON.parse(textToSpeechValue));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleHighContrastChange = async (value: boolean) => {
    setHighContrast(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HIGH_CONTRAST, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving high contrast setting:', error);
    }
  };

  const handleTextSizeChange = async (value: number) => {
    setTextSize(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TEXT_SIZE, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving text size setting:', error);
    }
  };

  const handleTextToSpeechChange = async (value: boolean) => {
    setTextToSpeech(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TEXT_TO_SPEECH, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving text-to-speech setting:', error);
    }
  };

  const handleApiKeyPress = () => {
    router.push('/(screens)/api-key');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, theme.fonts.titleLarge]}>Settings</Text>
          <Text style={[styles.headerSubtitle, theme.fonts.bodyMedium]}>Customize your learning experience</Text>
        </View>

        <Surface style={styles.card}>
          <Text style={[styles.sectionTitle, theme.fonts.titleMedium]}>Accessibility</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, theme.fonts.titleSmall]}>High Contrast Mode</Text>
              <Text style={[styles.settingDescription, theme.fonts.bodySmall]}>Enhance visibility for better readability</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={handleHighContrastChange}
              color={theme.colors.primary}
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, theme.fonts.titleSmall]}>Text Size</Text>
              <Text style={[styles.settingDescription, theme.fonts.bodySmall]}>Adjust the size of text throughout the app</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                value={textSize}
                onValueChange={handleTextSizeChange}
                minimumValue={0.8}
                maximumValue={1.4}
                step={0.1}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.border}
                thumbTintColor={theme.colors.primary}
                style={styles.slider}
              />
              <Text style={[styles.sliderValue, theme.fonts.bodySmall]}>{Math.round(textSize * 100)}%</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, theme.fonts.titleSmall]}>Text-to-Speech</Text>
              <Text style={[styles.settingDescription, theme.fonts.bodySmall]}>Have content read aloud to you</Text>
            </View>
            <Switch
              value={textToSpeech}
              onValueChange={handleTextToSpeechChange}
              color={theme.colors.primary}
            />
          </View>
        </Surface>

        <Surface style={styles.card}>
          <Text style={[styles.sectionTitle, theme.fonts.titleMedium]}>AI Settings</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, theme.fonts.titleSmall]}>Gemini API Key</Text>
              <Text style={[styles.settingDescription, theme.fonts.bodySmall]}>
                {apiKey ? 'Your API key is set up' : 'Set up your API key to use AI features'}
              </Text>
            </View>
            <Button 
              mode="outlined" 
              onPress={handleApiKeyPress}
              style={styles.apiKeyButton}
              contentStyle={styles.buttonContent}
            >
              {apiKey ? 'Update Key' : 'Set Up Key'}
            </Button>
          </View>
        </Surface>

        <Surface style={styles.card}>
          <Text style={[styles.sectionTitle, theme.fonts.titleMedium]}>About</Text>
          <Text style={[styles.aboutText, theme.fonts.bodyMedium]}>
            LearnWise v1.0.0
          </Text>
          <Text style={[styles.copyrightText, theme.fonts.bodySmall]}>
            © 2024 LearnWise. All rights reserved.
          </Text>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  card: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  settingInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  settingDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    width: 40,
    textAlign: 'right',
    color: theme.colors.text,
  },
  apiKeyButton: {
    borderRadius: theme.roundness,
  },
  aboutText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  copyrightText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: theme.spacing.xl,
    color: theme.colors.placeholder,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 