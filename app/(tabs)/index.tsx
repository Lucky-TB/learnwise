import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, theme.fonts.medium]}>LearnWise</Text>
          <Text style={[styles.headerSubtitle, theme.fonts.regular]}>Your AI-Powered Learning Companion</Text>
        </View>

        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="book-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, theme.fonts.medium]}>Create Study Plan</Text>
          </View>
          <Text style={[styles.cardDescription, theme.fonts.regular]}>
            Get a personalized study plan based on your learning style and preferences.
          </Text>
          <Text style={[styles.tabHint, theme.fonts.regular]}>
            Use the Study tab below to create your personalized study plan.
          </Text>
        </Surface>

        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="help-circle-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, theme.fonts.medium]}>Take a Quiz</Text>
          </View>
          <Text style={[styles.cardDescription, theme.fonts.regular]}>
            Test your knowledge with AI-generated quizzes tailored to your level.
          </Text>
          <Text style={[styles.tabHint, theme.fonts.regular]}>
            Use the Quiz tab below to start a quiz on any topic.
          </Text>
        </Surface>

        <Surface style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, theme.fonts.medium]}>Settings</Text>
          </View>
          <Text style={[styles.cardDescription, theme.fonts.regular]}>
            Customize your learning experience and manage your preferences.
          </Text>
          <Text style={[styles.tabHint, theme.fonts.regular]}>
            Use the Settings tab below to customize your experience.
          </Text>
        </Surface>

        <Text style={[styles.footerText, theme.fonts.regular]}>
          © 2024 LearnWise. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.text,
  },
  card: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    marginLeft: theme.spacing.sm,
    color: theme.colors.primary,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  tabHint: {
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
  },
  footerText: {
    textAlign: 'center',
    marginVertical: theme.spacing.xl,
    color: theme.colors.text,
  },
}); 