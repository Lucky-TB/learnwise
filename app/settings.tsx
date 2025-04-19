import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Switch, Slider, Divider } from 'react-native-paper';
import { Link } from 'expo-router';
import { theme } from '../constants/theme';
import { useApiKey } from '../context/ApiKeyContext';

export default function Settings() {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const { apiKey } = useApiKey();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Accessibility Settings</Text>

          <View style={styles.setting}>
            <Text style={styles.settingLabel}>High Contrast Mode</Text>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
            />
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Text Size</Text>
            <Slider
              value={textSize}
              onValueChange={setTextSize}
              minimumValue={0.8}
              maximumValue={1.4}
              step={0.1}
              style={styles.slider}
            />
            <Text style={styles.sliderValue}>{Math.round(textSize * 100)}%</Text>
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Text-to-Speech</Text>
            <Switch
              value={textToSpeech}
              onValueChange={setTextToSpeech}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>AI Settings</Text>
          
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Gemini API Key</Text>
            <Text style={styles.apiKeyStatus}>
              {apiKey ? '✓ Configured' : 'Not configured'}
            </Text>
          </View>
          
          <Link href="/api-key" asChild>
            <Button mode="outlined" style={styles.button}>
              {apiKey ? 'Update API Key' : 'Add API Key'}
            </Button>
          </Link>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.infoTitle}>About LearnWise</Text>
          <Text style={styles.infoText}>
            LearnWise is an ethical AI learning companion that helps students learn more effectively while promoting responsible AI use in education.
          </Text>
          <Text style={styles.infoText}>
            Version: 1.0.0
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: theme.spacing.md,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  slider: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
  sliderValue: {
    width: 50,
    textAlign: 'right',
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  apiKeyStatus: {
    fontSize: 14,
    color: theme.colors.success,
  },
  infoCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.accent,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    marginBottom: theme.spacing.sm,
  },
}); 