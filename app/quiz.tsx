import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Text, Card, RadioButton, ProgressBar, Portal, Dialog } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '../constants/theme';
import { ethicalTips } from '../constants/ethicalTips';
import { useApiKey } from '../context/ApiKeyContext';
import { generateQuizQuestions, getEthicalTip } from '../utils/geminiApi';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [customTip, setCustomTip] = useState<string | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { apiKey } = useApiKey();

  // Load questions when component mounts
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      // Try to generate custom questions
      const generatedQuestions = await generateQuizQuestions(
        apiKey,
        'ethical AI in education',
        'medium',
        3
      );
      
      if (generatedQuestions && generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
      } else {
        // Fallback to sample questions if generation fails
        setQuestions(sampleQuestions);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to sample questions
      setQuestions(sampleQuestions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Try to get a custom ethical tip
    if (apiKey) {
      try {
        const tip = await getEthicalTip(apiKey);
        setCustomTip(tip);
      } catch (error) {
        console.error('Error getting ethical tip:', error);
        setCustomTip(null);
      }
    }

    setShowTip(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowTip(false);
      setCustomTip(null);
    } else {
      router.push('/');
    }
  };

  const handleApiKeyDialogDismiss = () => {
    setShowApiKeyDialog(false);
    router.push('/api-key');
  };

  // Use either custom tip or random tip from our predefined list
  const currentTip = customTip || ethicalTips[Math.floor(Math.random() * ethicalTips.length)].content;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Generating quiz questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>No Questions Available</Text>
            <Text style={styles.errorText}>
              There was an error loading the quiz questions. Please try again later.
            </Text>
            <Button 
              mode="contained" 
              onPress={loadQuestions}
              style={styles.button}
            >
              Retry
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Ethical AI Quiz</Text>
          <ProgressBar 
            progress={(currentQuestion + 1) / questions.length} 
            style={styles.progress}
          />
          <Text style={styles.score}>Score: {score}/{currentQuestion + 1}</Text>

          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>

          <RadioButton.Group 
            onValueChange={value => setSelectedAnswer(parseInt(value))} 
            value={selectedAnswer?.toString() || ''}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <RadioButton.Item 
                key={index} 
                label={option} 
                value={index.toString()} 
              />
            ))}
          </RadioButton.Group>

          {!showTip ? (
            <Button 
              mode="contained" 
              onPress={handleAnswer}
              style={styles.button}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <View>
              <Card style={styles.tipCard}>
                <Card.Content>
                  <Text style={styles.tipTitle}>Ethical AI Tip:</Text>
                  <Text style={styles.tipContent}>{currentTip}</Text>
                </Card.Content>
              </Card>
              <Button 
                mode="contained" 
                onPress={handleNext}
                style={styles.button}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={showApiKeyDialog} onDismiss={handleApiKeyDialogDismiss}>
          <Dialog.Title>API Key Required</Dialog.Title>
          <Dialog.Content>
            <Text>You need to set up your Gemini API key to generate quiz questions.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleApiKeyDialogDismiss}>Set Up API Key</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

// Sample questions as fallback
const sampleQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of ethical AI in education?",
    options: [
      "To replace human teachers",
      "To enhance learning while ensuring fairness and responsibility",
      "To automate all educational processes",
      "To reduce educational costs"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of these is NOT a best practice for using AI in learning?",
    options: [
      "Verifying information from multiple sources",
      "Using AI to generate entire essays",
      "Using AI to understand complex concepts",
      "Using AI to practice problem-solving"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "How should you approach AI-generated content?",
    options: [
      "Accept it without question",
      "Use it as a starting point for further research",
      "Ignore it completely",
      "Copy it directly"
    ],
    correctAnswer: 1
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
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
  progress: {
    marginBottom: theme.spacing.md,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
  tipCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.accent,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  tipContent: {
    fontSize: 14,
    color: theme.colors.text,
  },
  errorText: {
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
}); 