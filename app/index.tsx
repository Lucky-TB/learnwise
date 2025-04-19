import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { Link } from 'expo-router';
import { theme } from '../constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LearnWise</Text>
      <Text style={styles.subtitle}>Your Ethical AI Learning Companion</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Get Started</Text>
          <Text style={styles.cardText}>
            Choose your learning style and skill level to create a personalized study plan.
          </Text>
          <Link href="/study-plan" asChild>
            <Button mode="contained" style={styles.button}>
              Create Study Plan
            </Button>
          </Link>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Take a Quiz</Text>
          <Text style={styles.cardText}>
            Test your knowledge and earn ethical AI insights.
          </Text>
          <Link href="/quiz" asChild>
            <Button mode="contained" style={styles.button}>
              Start Quiz
            </Button>
          </Link>
        </Card.Content>
      </Card>

      <Link href="/settings" asChild>
        <Button mode="outlined" style={styles.settingsButton}>
          Settings
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
  },
  card: {
    marginBottom: theme.spacing.md,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  settingsButton: {
    marginTop: theme.spacing.md,
  },
}); 