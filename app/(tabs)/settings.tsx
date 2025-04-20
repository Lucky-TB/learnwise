import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Switch, Divider } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../../constants/theme';
import { useApiKey } from '../../context/ApiKeyContext';
import { useSettings } from '../../context/SettingsContext';
import Slider from '@react-native-community/slider';
import { Text, Button, Card } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const { apiKey } = useApiKey();
  const { 
    highContrast, 
    textSize, 
    textToSpeech, 
    setHighContrast, 
    setTextSize, 
    setTextToSpeech 
  } = useSettings();
  const { theme } = useTheme();

  const handleApiKeyPress = () => {
    router.push('/(screens)/api-key');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background.DEFAULT }}>
      <View style={{ padding: 16 }}>
        <Text variant="h1">Settings</Text>
        <Card
          title="Accessibility"
          subtitle="Customize your app experience"
          icon="accessibility"
          style={{ marginTop: 16 }}
        >
          <View style={{ gap: 16 }}>
            <View>
              <Text variant="subtitle">Text Size</Text>
              <Text variant="body">Adjust the size of text throughout the app</Text>
            </View>
            <View>
              <Text variant="subtitle">High Contrast</Text>
              <Text variant="body">Increase contrast for better visibility</Text>
            </View>
            <View>
              <Text variant="subtitle">Text to Speech</Text>
              <Text variant="body">Enable voice reading of content</Text>
            </View>
          </View>
        </Card>

        <Card variant="elevated" style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>Accessibility</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text variant="body" style={styles.settingLabel}>High Contrast Mode</Text>
              <Text variant="caption" color="muted">Enhance visibility for better readability</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
              color={theme.colors.primary.DEFAULT}
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text variant="body" style={styles.settingLabel}>Text Size</Text>
              <Text variant="caption" color="muted">Adjust the size of text throughout the app</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                value={textSize}
                onValueChange={setTextSize}
                minimumValue={0.8}
                maximumValue={1.4}
                step={0.1}
                minimumTrackTintColor={theme.colors.primary.DEFAULT}
                maximumTrackTintColor={theme.colors.border}
                thumbTintColor={theme.colors.primary.DEFAULT}
                style={styles.slider}
              />
              <Text variant="caption" color="muted">{Math.round(textSize * 100)}%</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text variant="body" style={styles.settingLabel}>Text-to-Speech</Text>
              <Text variant="caption" color="muted">Have content read aloud to you</Text>
            </View>
            <Switch
              value={textToSpeech}
              onValueChange={setTextToSpeech}
              color={theme.colors.primary.DEFAULT}
            />
          </View>
        </Card>

        <Card variant="elevated" style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>AI Settings</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text variant="body" style={styles.settingLabel}>Gemini API Key</Text>
              <Text variant="caption" color="muted">
                {apiKey ? 'Your API key is set up' : 'Set up your API key to use AI features'}
              </Text>
            </View>
            <Button 
              variant="outline" 
              onPress={handleApiKeyPress}
              style={styles.apiKeyButton}
              icon={apiKey ? "key-outline" : "key"}
            >
              {apiKey ? 'Update Key' : 'Set Up Key'}
            </Button>
          </View>
        </Card>

        <Card variant="elevated" style={styles.card}>
          <Text variant="h3" style={styles.sectionTitle}>About</Text>
          <Text variant="body" style={styles.aboutText}>
            LearnWise v1.0.0
          </Text>
          <Text variant="caption" color="muted" style={styles.copyrightText}>
            © 2024 LearnWise. All rights reserved.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.DEFAULT,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  card: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
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
    marginBottom: theme.spacing.xs,
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  slider: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  apiKeyButton: {
    minWidth: 100,
  },
  aboutText: {
    marginBottom: theme.spacing.xs,
  },
  copyrightText: {
    marginTop: theme.spacing.sm,
  },
}); 