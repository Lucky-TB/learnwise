import { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Button, Text, Surface, TextInput, Portal, Dialog, Divider } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../../constants/theme';
import { useApiKey } from '../../context/ApiKeyContext';
import { Ionicons } from '@expo/vector-icons';

export default function ApiKeyScreen() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setApiKey: updateApiKey } = useApiKey();

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateApiKey(apiKey.trim());
      router.back();
    } catch (err) {
      setError('Failed to save API key. Please try again.');
      console.error('Error saving API key:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, theme.fonts.medium]}>API Key</Text>
        </View>

        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="key-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, theme.fonts.medium]}>Gemini API Key</Text>
          </View>
          
          <Text style={[styles.description, theme.fonts.regular]}>
            To use the study plan generator, you need to provide a Gemini API key. This key allows the app to access Google's AI services.
          </Text>

          <View style={styles.stepsContainer}>
            <Text style={[styles.stepsTitle, theme.fonts.medium]}>How to get an API key:</Text>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={[styles.stepNumberText, theme.fonts.regular]}>1</Text>
              </View>
              <Text style={[styles.stepText, theme.fonts.regular]}>Go to the Google AI Studio (https://makersuite.google.com/app/apikey)</Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={[styles.stepNumberText, theme.fonts.regular]}>2</Text>
              </View>
              <Text style={[styles.stepText, theme.fonts.regular]}>Sign in with your Google account</Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={[styles.stepNumberText, theme.fonts.regular]}>3</Text>
              </View>
              <Text style={[styles.stepText, theme.fonts.regular]}>Create a new API key</Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={[styles.stepNumberText, theme.fonts.regular]}>4</Text>
              </View>
              <Text style={[styles.stepText, theme.fonts.regular]}>Copy the key and paste it below</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, theme.fonts.medium]}>API Key</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={apiKey}
                onChangeText={setApiKey}
                secureTextEntry={!showKey}
                placeholder="Enter your Gemini API key"
                mode="outlined"
                error={!!error}
                style={styles.input}
                right={
                  <TextInput.Icon
                    icon={showKey ? "eye-off" : "eye"}
                    onPress={toggleShowKey}
                    color={theme.colors.primary}
                  />
                }
              />
            </View>
            {error && (
              <Text style={[styles.errorText, theme.fonts.regular]}>{error}</Text>
            )}
            <Text style={[styles.securityNote, theme.fonts.regular]}>
              Your API key is stored securely on your device and is never shared with anyone.
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleSaveApiKey}
            loading={isLoading}
            disabled={isLoading}
            style={styles.saveButton}
            contentStyle={styles.buttonContent}
            labelStyle={theme.fonts.medium}
          >
            Save API Key
          </Button>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    color: theme.colors.primary,
  },
  card: {
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: 20,
    marginLeft: theme.spacing.sm,
    color: theme.colors.primary,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
  },
  stepsContainer: {
    marginBottom: theme.spacing.lg,
  },
  stepsTitle: {
    fontSize: 16,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    color: theme.colors.surface,
  },
  stepText: {
    fontSize: 16,
    flex: 1,
    color: theme.colors.text,
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    fontSize: 14,
  },
  securityNote: {
    fontSize: 14,
    marginTop: theme.spacing.md,
    color: theme.colors.placeholder,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: theme.spacing.md,
    borderRadius: theme.roundness,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 