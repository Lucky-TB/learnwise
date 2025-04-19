import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, TextInput, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../constants/theme';
import { useApiKey } from '../context/ApiKeyContext';

export default function ApiKeyScreen() {
  const { apiKey, setApiKey, saveApiKey, isLoading } = useApiKey();
  const [inputKey, setInputKey] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (apiKey) {
      setInputKey(apiKey);
    }
  }, [apiKey]);

  const handleSave = async () => {
    if (!inputKey.trim()) {
      setIsValid(false);
      setErrorMessage('API key cannot be empty');
      return;
    }

    try {
      await saveApiKey(inputKey.trim());
      router.back();
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Failed to save API key. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Gemini API Key</Text>
          
          <Text style={styles.description}>
            LearnWise uses Google's Gemini AI to generate personalized study plans and quiz questions.
            You need to provide your own API key to use these features.
          </Text>
          
          <Text style={styles.steps}>
            How to get an API key:
          </Text>
          <Text style={styles.step}>1. Go to the Google AI Studio (https://makersuite.google.com/app/apikey)</Text>
          <Text style={styles.step}>2. Sign in with your Google account</Text>
          <Text style={styles.step}>3. Create a new API key</Text>
          <Text style={styles.step}>4. Copy the key and paste it below</Text>
          
          <TextInput
            mode="outlined"
            label="API Key"
            value={inputKey}
            onChangeText={(text) => {
              setInputKey(text);
              setIsValid(true);
              setErrorMessage('');
            }}
            secureTextEntry
            style={styles.input}
            error={!isValid}
          />
          
          <HelperText type="error" visible={!isValid}>
            {errorMessage}
          </HelperText>
          
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={styles.button}
          >
            Save API Key
          </Button>
          
          <Text style={styles.note}>
            Note: Your API key is stored securely on your device and is never shared with anyone.
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
  description: {
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  steps: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  step: {
    marginBottom: theme.spacing.xs,
    lineHeight: 20,
  },
  input: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  note: {
    marginTop: theme.spacing.lg,
    fontSize: 12,
    fontStyle: 'italic',
    color: theme.colors.disabled,
  },
}); 