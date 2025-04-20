import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text, Surface, RadioButton, ProgressBar, Portal, Dialog, TextInput } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { theme } from '../../constants/theme';
import { ethicalTips } from '../../constants/ethicalTips';
import { useApiKey } from '../../context/ApiKeyContext';
import { generateQuizQuestions, getEthicalTip } from '../../utils/geminiApi';
import { Ionicons } from '@expo/vector-icons';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [customTip, setCustomTip] = useState<string | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showQuizSetup, setShowQuizSetup] = useState(true);
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [optionCount, setOptionCount] = useState(4);
  const { apiKey } = useApiKey();

  const loadQuestions = async () => {
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    if (!topic.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const generatedQuestions = await generateQuizQuestions(apiKey, topic, 'medium', questionCount, optionCount);
      if (generatedQuestions && generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
        setShowQuizSetup(false);
      } else {
        setQuestions(sampleQuestions);
        setShowQuizSetup(false);
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      setQuestions(sampleQuestions);
      setShowQuizSetup(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

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
    router.push('/(screens)/api-key');
  };

  const handleStartQuiz = () => {
    if (!topic.trim()) {
      return;
    }
    loadQuestions();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, theme.fonts.regular]}>Loading quiz questions...</Text>
      </View>
    );
  }

  if (showQuizSetup) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, theme.fonts.medium]}>Quiz Setup</Text>
          </View>

          <Surface style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.cardTitle, theme.fonts.medium]}>Quiz Configuration</Text>
            </View>

            <Text style={[styles.description, theme.fonts.regular]}>
              Customize your quiz by selecting a topic, number of questions, and answer choices.
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
              <Text style={[styles.inputLabel, theme.fonts.medium]}>Number of Questions: {questionCount}</Text>
              <Slider
                value={questionCount}
                onValueChange={setQuestionCount}
                minimumValue={3}
                maximumValue={10}
                step={1}
                style={styles.slider}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, theme.fonts.medium]}>Answer Choices: {optionCount}</Text>
              <Slider
                value={optionCount}
                onValueChange={setOptionCount}
                minimumValue={2}
                maximumValue={6}
                step={1}
                style={styles.slider}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleStartQuiz}
              disabled={!topic.trim()}
              style={styles.button}
              labelStyle={theme.fonts.medium}
            >
              Start Quiz
            </Button>
          </Surface>
        </ScrollView>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[styles.loadingText, theme.fonts.regular]}>No questions available. Please try again.</Text>
        <Button
          mode="contained"
          onPress={() => setShowQuizSetup(true)}
          style={styles.button}
          labelStyle={theme.fonts.medium}
        >
          Back to Setup
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, theme.fonts.medium]}>Quiz: {topic}</Text>
        </View>

        <Surface style={styles.card}>
          <View style={styles.progressContainer}>
            <Text style={[styles.progressText, theme.fonts.regular]}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            <ProgressBar
              progress={(currentQuestion + 1) / questions.length}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
          </View>

          <Text style={[styles.question, theme.fonts.medium]}>
            {questions[currentQuestion].question}
          </Text>

          <RadioButton.Group
            onValueChange={value => setSelectedAnswer(Number(value))}
            value={selectedAnswer?.toString() || ''}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => setSelectedAnswer(index)}
              >
                <RadioButton.Android
                  value={index.toString()}
                  color={theme.colors.primary}
                />
                <Text style={[styles.optionText, theme.fonts.regular]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </RadioButton.Group>

          <Button
            mode="contained"
            onPress={handleAnswer}
            disabled={selectedAnswer === null}
            style={styles.button}
            labelStyle={theme.fonts.medium}
          >
            Check Answer
          </Button>
        </Surface>

        {showTip && (
          <Surface style={styles.card}>
            <View style={styles.tipHeader}>
              <Ionicons 
                name={selectedAnswer === questions[currentQuestion].correctAnswer ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={selectedAnswer === questions[currentQuestion].correctAnswer ? theme.colors.success : theme.colors.error} 
              />
              <Text style={[styles.tipTitle, theme.fonts.medium]}>
                {selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect"}
              </Text>
            </View>
            
            <Text style={[styles.answerFeedback, theme.fonts.regular]}>
              {selectedAnswer === questions[currentQuestion].correctAnswer 
                ? "Great job! You got it right." 
                : `The correct answer is: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
            </Text>
            
            <Text style={[styles.tipText, theme.fonts.regular]}>
              {customTip || ethicalTips[Math.floor(Math.random() * ethicalTips.length)]}
            </Text>
            <Button
              mode="contained"
              onPress={handleNext}
              style={styles.button}
              labelStyle={theme.fonts.medium}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
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
                To take the quiz, you need to set up your Gemini API key first.
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: theme.spacing.md,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
  description: {
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    marginHorizontal: theme.spacing.md,
  },
  slider: {
    marginHorizontal: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
  tipText: {
    marginBottom: theme.spacing.md,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  optionText: {
    marginLeft: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
  question: {
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  answerFeedback: {
    fontSize: 16,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
}); 