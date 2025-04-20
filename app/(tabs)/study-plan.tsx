import { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { Button, Text, Surface, TextInput, Portal, Dialog, Divider } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../../constants/theme';
import { useApiKey } from '../../context/ApiKeyContext';
import { generateStudyPlan } from '../../utils/geminiApi';
import { Ionicons } from '@expo/vector-icons';

export default function StudyPlanScreen() {
  const [topic, setTopic] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { apiKey } = useApiKey();

  const handleGenerateStudyPlan = async () => {
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    if (!topic.trim() || !learningStyle.trim() || !skillLevel.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const plan = await generateStudyPlan(apiKey, topic, learningStyle, skillLevel);
      setStudyPlan(plan);
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
      console.error('Error generating study plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyDialogDismiss = () => {
    setShowApiKeyDialog(false);
    router.push('/(screens)/api-key');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, theme.fonts.medium]}>Create Study Plan</Text>
        </View>

        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="book-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, theme.fonts.medium]}>Study Preferences</Text>
          </View>

          <Text style={[styles.description, theme.fonts.regular]}>
            Tell us about your topic, learning style and current skill level to get a personalized study plan.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, theme.fonts.medium]}>Topic</Text>
            <TextInput
              value={topic}
              onChangeText={setTopic}
              placeholder="e.g., Mathematics, History, Computer Science"
              mode="outlined"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, theme.fonts.medium]}>Learning Style</Text>
            <TextInput
              value={learningStyle}
              onChangeText={setLearningStyle}
              placeholder="e.g., Visual, Auditory, Reading/Writing, Kinesthetic"
              mode="outlined"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, theme.fonts.medium]}>Current Skill Level</Text>
            <TextInput
              value={skillLevel}
              onChangeText={setSkillLevel}
              placeholder="e.g., Beginner, Intermediate, Advanced"
              mode="outlined"
              style={styles.input}
            />
          </View>

          {error && (
            <Text style={[styles.errorText, theme.fonts.regular]}>{error}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleGenerateStudyPlan}
            loading={isLoading}
            disabled={isLoading}
            style={styles.generateButton}
            contentStyle={styles.buttonContent}
            labelStyle={theme.fonts.medium}
          >
            Generate Study Plan
          </Button>
        </Surface>

        {studyPlan && (
          <Surface style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="list-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, theme.fonts.medium]}>Your Study Plan</Text>
            </View>
            <Text style={[styles.studyPlan, theme.fonts.regular]}>{studyPlan}</Text>
          </Surface>
        )}

        <Portal>
          <Dialog
            visible={showApiKeyDialog}
            onDismiss={handleApiKeyDialogDismiss}
          >
            <Dialog.Title style={theme.fonts.medium}>API Key Required</Dialog.Title>
            <Dialog.Content>
              <Text style={theme.fonts.regular}>
                To generate a study plan, you need to set up your Gemini API key first.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleApiKeyDialogDismiss} labelStyle={theme.fonts.medium}>Set Up API Key</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    marginTop: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: theme.spacing.xs,
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
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    fontSize: 16,
    marginBottom: theme.spacing.md,
    color: theme.colors.error,
  },
  generateButton: {
    marginTop: theme.spacing.md,
    borderRadius: theme.roundness,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studyPlan: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
  },
}); 