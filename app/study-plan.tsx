import { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Text, Card, RadioButton, TextInput, Portal, Dialog } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../constants/theme';
import { useApiKey } from '../context/ApiKeyContext';
import { generateStudyPlan } from '../utils/geminiApi';

type LearningStyle = 'visual' | 'text' | 'interactive';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export default function StudyPlanScreen() {
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('visual');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { apiKey } = useApiKey();

  const handleCreatePlan = async () => {
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      const plan = await generateStudyPlan(apiKey, subject, learningStyle, skillLevel);
      setStudyPlan(plan);
    } catch (error) {
      console.error('Error generating study plan:', error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyDialogDismiss = () => {
    setShowApiKeyDialog(false);
    router.push('/api-key');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Create Your Study Plan</Text>
          
          <Text style={styles.label}>What would you like to learn?</Text>
          <TextInput
            mode="outlined"
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject (e.g., Mathematics, Physics)"
            style={styles.input}
          />

          <Text style={styles.label}>Choose your learning style:</Text>
          <RadioButton.Group onValueChange={value => setLearningStyle(value as LearningStyle)} value={learningStyle}>
            <RadioButton.Item label="Visual Learning" value="visual" />
            <RadioButton.Item label="Text-based Learning" value="text" />
            <RadioButton.Item label="Interactive Learning" value="interactive" />
          </RadioButton.Group>

          <Text style={styles.label}>Select your skill level:</Text>
          <RadioButton.Group onValueChange={value => setSkillLevel(value as SkillLevel)} value={skillLevel}>
            <RadioButton.Item label="Beginner" value="beginner" />
            <RadioButton.Item label="Intermediate" value="intermediate" />
            <RadioButton.Item label="Advanced" value="advanced" />
          </RadioButton.Group>

          <Button 
            mode="contained" 
            onPress={handleCreatePlan}
            style={styles.button}
            disabled={!subject || isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Study Plan'}
          </Button>
        </Card.Content>
      </Card>

      {isLoading && (
        <Card style={styles.card}>
          <Card.Content style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Creating your personalized study plan...</Text>
          </Card.Content>
        </Card>
      )}

      {studyPlan && !isLoading && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.planTitle}>Your Study Plan</Text>
            <Text style={styles.planContent}>{studyPlan}</Text>
            
            <Button 
              mode="outlined" 
              onPress={() => setStudyPlan(null)}
              style={styles.button}
            >
              Create Another Plan
            </Button>
          </Card.Content>
        </Card>
      )}

      <Portal>
        <Dialog visible={showApiKeyDialog} onDismiss={handleApiKeyDialogDismiss}>
          <Dialog.Title>API Key Required</Dialog.Title>
          <Dialog.Content>
            <Text>You need to set up your Gemini API key to generate study plans.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleApiKeyDialogDismiss}>Set Up API Key</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  planContent: {
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
}); 